"""Extract auditable dataset *candidates* from cached paper digests.

This is deliberately a triage tool, not a publication pipeline. A regex match
never proves that a resource is a trainable dataset, so every record keeps the
exact sentence/table text and is labelled training, evaluation, or ambiguous
for a later source audit.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
from typing import Any, Iterable


HERE = pathlib.Path(__file__).parent
DEFAULT_MANIFEST = HERE.parent / "tmp" / "paper-digest-manifest.json"
DEFAULT_CORPUS = HERE.parent / "tmp" / "paper-corpus"
DEFAULT_OUTPUT = HERE.parent / "tmp" / "paper-dataset-candidates.json"

TRAINING_PATTERNS = (
    r"\b(?:pre[- ]?train(?:ed|ing)?|fine[- ]?tun(?:e|ed|ing)|train(?:ed|ing)?)\b",
    r"\b(?:imitation learning|behavior cloning|reinforcement learning)\b",
    r"\b(?:training (?:set|split|data|dataset)|train split)\b",
    r"\b(?:train(?:ing)? and (?:validation|val) splits?)\b",
    r"\b(?:demonstrations?|trajectories?)\b.*\b(?:learn|train|policy)\b",
)
EVALUATION_PATTERNS = (
    r"\b(?:evaluat(?:e|ed|es|ing|ion)|assess(?:ed|ment)?|test(?:ed|ing)?)\b",
    r"\b(?:held[- ]out|test (?:set|split|data)|benchmark(?:ed|ing)?)\b",
    r"\b(?:metric|score|performance|accuracy|success rate)\b",
)

# High-recall name discovery is acceptable here because the output is only an
# audit queue. These forms still require a dataset/corpus marker or an explicit
# training/evaluation preposition; no candidate is auto-published.
MARKED_NAME_RE = re.compile(
    r"\b(?:the\s+)?([A-Z][A-Za-z0-9][A-Za-z0-9+._/\-]*"
    r"(?:\s+(?:[A-Z0-9][A-Za-z0-9+._/\-]*|of|and|for|in|the)){0,5})"
    r"\s+(?:dataset|corpus)\b"
)
USAGE_NAME_RE = re.compile(
    r"\b(?:train(?:ed|ing)?|fine[- ]?tun(?:e|ed|ing)|pre[- ]?train(?:ed|ing)?|"
    r"evaluat(?:e|ed|es|ing)|test(?:ed|ing)?)\s+"
    r"(?:our\s+\w+\s+)?(?:on|using|with)\s+(?:the\s+)?"
    r"([A-Z][A-Za-z0-9+._/\-]{2,}(?:\s+[A-Z][A-Za-z0-9+._/\-]{2,}){0,3})"
)
SENTENCE_RE = re.compile(r"(?<=[.!?])\s+(?=[A-Z0-9])|\n+")
CITATION_KEY_RE = re.compile(r"@([A-Za-z0-9_:.+\-]+)")


def classify_usage(evidence: str) -> str:
    """Return a conservative role label for one evidence fragment."""

    if any(re.search(pattern, evidence, re.I) for pattern in TRAINING_PATTERNS):
        return "training"
    if any(re.search(pattern, evidence, re.I) for pattern in EVALUATION_PATTERNS):
        return "evaluation"
    return "ambiguous"


def candidate_names(evidence: str) -> list[str]:
    names: list[str] = []
    for pattern in (MARKED_NAME_RE, USAGE_NAME_RE):
        for match in pattern.finditer(evidence):
            name = match.group(1).strip(" ,.;:()[]{}")
            # Avoid turning generic prose into named resources.
            if name.lower() in {"training", "test", "validation", "public", "large"}:
                continue
            if name not in names:
                names.append(name)
    return names


def evidence_fragments(text: str) -> Iterable[str]:
    for fragment in SENTENCE_RE.split(text or ""):
        fragment = " ".join(fragment.split())
        if fragment:
            yield fragment


def extract_candidates_from_text(
    text: str,
    *,
    paper: dict[str, Any],
    source_type: str,
    source_id: str | None,
) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for evidence in evidence_fragments(text):
        for name in candidate_names(evidence):
            records.append(
                {
                    "candidateName": name,
                    "role": classify_usage(evidence),
                    "paper": {
                        "arxivId": paper.get("arxivId"),
                        "title": paper.get("title"),
                        "domain": paper.get("domain"),
                    },
                    "source": {"type": source_type, "id": source_id},
                    "evidence": evidence,
                    "auditStatus": "pending",
                }
            )
    return records


def extract_digest(digest: dict[str, Any], paper: dict[str, Any]) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for section in digest.get("sections", []):
        records.extend(
            extract_candidates_from_text(
                section.get("text", ""),
                paper=paper,
                source_type="section",
                source_id=section.get("id"),
            )
        )
    for table in digest.get("tables", []):
        records.extend(
            extract_candidates_from_text(
                table.get("text") or table.get("raw_tex") or "",
                paper=paper,
                source_type="table",
                source_id=table.get("id"),
            )
        )

    citations_by_key = {
        citation.get("key"): citation
        for citation in digest.get("citations", [])
        if citation.get("key")
    }
    for record in records:
        keys = list(dict.fromkeys(CITATION_KEY_RE.findall(record["evidence"])))
        record["citationKeys"] = keys
        record["citations"] = [citations_by_key[key] for key in keys if key in citations_by_key]
    return records


def extract_corpus(manifest: dict[str, Any], corpus: pathlib.Path) -> dict[str, Any]:
    papers_by_id: dict[str, list[dict[str, Any]]] = {}
    for paper in manifest.get("papers", []):
        papers_by_id.setdefault(paper["arxivId"], []).append(paper)

    candidates: list[dict[str, Any]] = []
    missing: list[str] = []
    for arxiv_id in manifest.get("arxivIds", []):
        digest_path = corpus / arxiv_id / "paper.json"
        if not digest_path.exists():
            missing.append(arxiv_id)
            continue
        digest = json.loads(digest_path.read_text())
        for paper in papers_by_id.get(arxiv_id, []):
            candidates.extend(extract_digest(digest, paper))

    # Identical evidence can appear in both parsed prose and a rendered table.
    # Keep the first exact source record, but never merge across papers.
    unique: list[dict[str, Any]] = []
    seen: set[tuple[str | None, str, str, str]] = set()
    for item in candidates:
        key = (
            item["paper"].get("arxivId"),
            item["candidateName"].casefold(),
            item["role"],
            item["evidence"],
        )
        if key not in seen:
            seen.add(key)
            unique.append(item)

    role_counts = {role: sum(item["role"] == role for item in unique) for role in ("training", "evaluation", "ambiguous")}
    return {
        "scope": "Audit candidates only; inclusion requires source verification.",
        "digestedPaperCount": len(manifest.get("arxivIds", [])) - len(missing),
        "missingDigestCount": len(missing),
        "candidateCount": len(unique),
        "roleCounts": role_counts,
        "missingDigests": missing,
        "candidates": unique,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=pathlib.Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--corpus", type=pathlib.Path, default=DEFAULT_CORPUS)
    parser.add_argument("--output", type=pathlib.Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    report = extract_corpus(json.loads(args.manifest.read_text()), args.corpus)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(
        f"wrote {args.output}: {report['candidateCount']} candidates from "
        f"{report['digestedPaperCount']} digests; {report['missingDigestCount']} missing"
    )


if __name__ == "__main__":
    main()
