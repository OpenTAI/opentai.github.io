"""Build the publishable dataset catalog from audited paper mentions.

Only records explicitly approved as training data can enter the output. The
canonical metadata file remains the authority for public names and links; an
approved mention without matching verified metadata is a hard error.
"""

from __future__ import annotations

import argparse
import copy
import json
import pathlib
import re
from typing import Any


HERE = pathlib.Path(__file__).parent
DEFAULT_METADATA = HERE / "data" / "training-datasets.json"
DEFAULT_MENTIONS = HERE / "data" / "paper-dataset-mentions.json"
DEFAULT_ALIASES = HERE / "data" / "dataset-alias-overrides.json"
DEFAULT_OUTPUT = HERE.parent / "tmp" / "paper-dataset-catalog.json"
DOMAIN_ORDER = {"LLMs": 0, "Agents": 1, "Embodied AI": 2}


def canonical_name(name: str, aliases: dict[str, str]) -> str:
    """Resolve an explicit alias chain; never infer similarity from spelling."""

    current = name
    seen: set[str] = set()
    while current in aliases:
        if current in seen:
            raise ValueError(f"Alias cycle involving {current}")
        seen.add(current)
        current = aliases[current]
    return current


def paper_key(paper: dict[str, Any]) -> tuple[str, str, str]:
    return (
        paper.get("arxivId") or "",
        paper.get("openAlexId") or "",
        paper.get("title") or "",
    )


def build_catalog(
    metadata: list[dict[str, Any]],
    mentions: list[dict[str, Any]],
    aliases: dict[str, str],
    *,
    include_metadata_fallbacks: bool = False,
) -> list[dict[str, Any]]:
    metadata_by_name = {item["name"]: item for item in metadata}
    grouped: dict[str, list[dict[str, Any]]] = {}

    for mention in mentions:
        if mention.get("status") != "approved" or mention.get("role") != "training":
            continue
        name = canonical_name(mention["datasetName"], aliases)
        if name not in metadata_by_name:
            raise ValueError(f"Approved dataset {name} has no verified metadata")
        grouped.setdefault(name, []).append(mention)

    if include_metadata_fallbacks:
        for item in metadata:
            name = item["name"]
            if name in grouped:
                continue
            evidence = item.get("trainingEvidence")
            paper_url = item.get("paperUrl")
            if not evidence or not paper_url:
                raise ValueError(
                    f"Verified dataset {name} needs trainingEvidence and paperUrl "
                    "before it can receive a source disclosure"
                )
            arxiv_match = re.search(r"arxiv\.org/abs/([^/?#]+)", paper_url, re.I)
            grouped[name] = [
                {
                    "datasetName": name,
                    "status": "approved",
                    "role": "training",
                    "paper": {
                        "arxivId": (
                            re.sub(r"v\d+$", "", arxiv_match.group(1))
                            if arxiv_match
                            else None
                        ),
                        "title": item.get("sourcePaperTitle"),
                        "domain": item.get("domain"),
                    },
                    "evidence": evidence,
                    "source": {"type": "primary-paper", "url": paper_url},
                }
            ]

    rows: list[dict[str, Any]] = []
    for name, dataset_mentions in grouped.items():
        row = copy.deepcopy(metadata_by_name[name])
        papers: dict[tuple[str, str, str], dict[str, Any]] = {}
        domains: set[str] = set()
        for mention in dataset_mentions:
            paper = mention["paper"]
            key = paper_key(paper)
            if key not in papers:
                papers[key] = {
                    "arxivId": paper.get("arxivId"),
                    "openAlexId": paper.get("openAlexId"),
                    "title": paper.get("title"),
                    "domain": paper.get("domain"),
                    "evidence": mention.get("evidence"),
                    "source": mention.get("source"),
                }
            if paper.get("domain"):
                domains.add(paper["domain"])
        source_papers = list(papers.values())
        source_papers.sort(key=lambda paper: paper_key(paper))
        row["domains"] = sorted(domains, key=lambda value: (DOMAIN_ORDER.get(value, 99), value))
        row["domain"] = row["domains"][0] if row["domains"] else row.get("domain")
        row["usageCount"] = len(source_papers)
        row["sourcePapers"] = source_papers
        rows.append(row)

    rows.sort(key=lambda item: item["name"].casefold())
    return rows


def load_aliases(payload: Any) -> dict[str, str]:
    if isinstance(payload, dict) and "aliases" in payload:
        payload = payload["aliases"]
    if isinstance(payload, dict):
        return {str(key): str(value) for key, value in payload.items() if not str(key).startswith("_")}
    aliases: dict[str, str] = {}
    for item in payload:
        aliases[item["alias"]] = item["canonicalName"]
    return aliases


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--metadata", type=pathlib.Path, default=DEFAULT_METADATA)
    parser.add_argument("--mentions", type=pathlib.Path, default=DEFAULT_MENTIONS)
    parser.add_argument("--aliases", type=pathlib.Path, default=DEFAULT_ALIASES)
    parser.add_argument("--output", type=pathlib.Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    metadata_payload = json.loads(args.metadata.read_text())
    metadata = metadata_payload.get("items", metadata_payload)
    mentions_payload = json.loads(args.mentions.read_text())
    mentions = mentions_payload.get("mentions", mentions_payload)
    aliases = load_aliases(json.loads(args.aliases.read_text()))
    rows = build_catalog(metadata, mentions, aliases)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps({"items": rows}, ensure_ascii=False, indent=2) + "\n")
    print(f"wrote {args.output}: {len(rows)} verified training datasets")


if __name__ == "__main__":
    main()
