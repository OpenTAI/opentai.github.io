"""Consolidate human-audited paper dataset decisions into source data.

The extractor is intentionally not an authority. Only entries placed in an
audit's ``approved`` collection may pass this stage, and a public dataset URL
must be present in either the audit or a separately verified enrichment file.
The default command writes reviewable files under ``tmp``; source files are
changed only with ``--write-sources``.
"""

from __future__ import annotations

import argparse
import copy
import json
import pathlib
from typing import Any


HERE = pathlib.Path(__file__).parent
DATA_DIR = HERE / "data"
DEFAULT_OUTPUT_DIR = HERE.parent / "tmp" / "consolidated-dataset-data"
DEFAULT_QUALITY_OVERRIDES = DATA_DIR / "paper-dataset-quality-overrides.json"


def approved_items(audit: dict[str, Any]) -> list[dict[str, Any]]:
    coverage = audit.get("coverage") or {}
    items = coverage.get("approved") if isinstance(coverage, dict) else None
    if items is None:
        items = audit.get("approved", [])
    if not isinstance(items, list):
        raise ValueError("Audit approved collection must be a list")
    return items


def load_enrichment(payloads: list[Any]) -> dict[str, dict[str, Any]]:
    result: dict[str, dict[str, Any]] = {}
    for payload in payloads:
        if isinstance(payload, dict) and "items" in payload:
            payload = payload["items"]
        if isinstance(payload, dict) and "datasets" in payload:
            payload = payload["datasets"]
        if isinstance(payload, dict):
            iterable = []
            for name, value in payload.items():
                if str(name).startswith("_"):
                    continue
                item = dict(value)
                item.setdefault("canonicalName", name)
                iterable.append(item)
        else:
            iterable = payload
        for item in iterable:
            name = item["canonicalName"]
            if name in result:
                merged = dict(result[name])
                for field, value in item.items():
                    if field == "canonicalName" or value in (None, "", []):
                        continue
                    existing = merged.get(field)
                    if (
                        field
                        in {"status", "dataUrl", "paperUrl", "githubUrl", "huggingFaceUrl"}
                        and existing not in (None, "", [])
                        and existing != value
                    ):
                        raise ValueError(
                            f"Conflicting enrichment for {name}.{field}: "
                            f"{existing!r} versus {value!r}"
                        )
                    if existing in (None, "", []):
                        merged[field] = value
                result[name] = merged
            else:
                result[name] = item
    return result


def first_nonempty(*values: Any) -> Any:
    return next((value for value in values if value not in (None, "", [])), None)


def mention_key(mention: dict[str, Any]) -> tuple[str, str, str, str, str]:
    paper = mention.get("paper") or {}
    return (
        mention.get("datasetName") or "",
        paper.get("arxivId") or "",
        paper.get("openAlexId") or "",
        paper.get("title") or "",
        mention.get("evidence") or "",
    )


def audited_paper(mention: dict[str, Any], audit_domain: str | None) -> dict[str, Any]:
    """Normalize both nested arXiv and flat OpenAlex audit records."""

    paper = copy.deepcopy(mention.get("paper") or {})
    if not paper:
        paper = {
            "arxivId": mention.get("arxivId"),
            "openAlexId": mention.get("openAlexId"),
            "title": mention.get("paperTitle"),
            "domain": mention.get("domain"),
        }
    if not paper.get("domain") and audit_domain:
        paper["domain"] = audit_domain
    return {key: value for key, value in paper.items() if value not in (None, "")}


def has_paper_identity(paper: dict[str, Any]) -> bool:
    return bool(
        paper.get("arxivId") or paper.get("openAlexId") or paper.get("title")
    )


def resolve_alias(name: str, aliases: dict[str, str]) -> str:
    current = name
    seen: set[str] = set()
    while current in aliases:
        if current in seen:
            raise ValueError(f"Alias cycle involving {current}")
        seen.add(current)
        current = aliases[current]
    return current


def apply_url_replacements(
    metadata_by_name: dict[str, dict[str, Any]],
    mentions_by_key: dict[tuple[str, str, str, str, str], dict[str, Any]],
    replacements: list[dict[str, Any]],
) -> None:
    """Apply exact, evidence-backed URL migrations after all audits are merged."""

    metadata_url_fields = {
        "paperUrl",
        "githubUrl",
        "huggingFaceUrl",
        "dataUrl",
        "sourceUrl",
        "linkVerificationEvidenceUrl",
    }
    seen_from: set[str] = set()
    for replacement in replacements:
        old_url = replacement.get("from")
        new_url = replacement.get("to")
        reason = replacement.get("reason")
        evidence_url = replacement.get("evidenceUrl")
        if not old_url or old_url in seen_from:
            raise ValueError("URL replacements require unique, non-empty 'from' values")
        if not reason or not evidence_url:
            raise ValueError(
                f"URL replacement for {old_url} requires reason and evidenceUrl"
            )
        seen_from.add(old_url)
        matches = 0

        for metadata in metadata_by_name.values():
            changed = False
            for field in metadata_url_fields:
                if metadata.get(field) != old_url:
                    continue
                matches += 1
                changed = True
                if new_url:
                    metadata[field] = new_url
                else:
                    metadata.pop(field, None)
            if changed:
                metadata["linkVerificationReason"] = reason
                metadata["linkVerificationEvidenceUrl"] = evidence_url

        for mention in mentions_by_key.values():
            if mention.get("source") != old_url:
                continue
            matches += 1
            if new_url:
                mention["source"] = new_url
            else:
                mention.pop("source", None)

        already_applied = False
        if new_url:
            already_applied = any(
                metadata.get(field) == new_url
                for metadata in metadata_by_name.values()
                for field in metadata_url_fields
            ) or any(
                mention.get("source") == new_url
                for mention in mentions_by_key.values()
            )
        else:
            already_applied = any(
                metadata.get("linkVerificationReason") == reason
                and metadata.get("linkVerificationEvidenceUrl") == evidence_url
                for metadata in metadata_by_name.values()
            )
        if not matches and not already_applied:
            raise ValueError(f"URL replacement did not match merged data: {old_url}")

    for metadata in metadata_by_name.values():
        if not metadata.get("dataUrl"):
            raise ValueError(
                f"URL replacements removed the public data URL for {metadata['name']}"
            )


def consolidate(
    existing_metadata: list[dict[str, Any]],
    existing_mentions: list[dict[str, Any]],
    existing_aliases: list[dict[str, Any]],
    audits: list[dict[str, Any]],
    enrichment: dict[str, dict[str, Any]],
    *,
    quality_overrides: dict[str, Any] | None = None,
) -> dict[str, list[dict[str, Any]]]:
    quality_overrides = quality_overrides or {}
    excluded_names = set(quality_overrides.get("excludeCanonicalNames") or [])
    suppressed_mentions = {
        (item["datasetName"], item.get("arxivId") or "", item.get("title") or "")
        for item in quality_overrides.get("suppressMentions") or []
    }

    def is_suppressed(dataset_name: str, paper: dict[str, Any]) -> bool:
        arxiv_id = paper.get("arxivId") or ""
        title = paper.get("title") or ""
        return any(
            dataset_name == name
            and (not expected_arxiv or expected_arxiv == arxiv_id)
            and (not expected_title or expected_title == title)
            for name, expected_arxiv, expected_title in suppressed_mentions
        )

    aliases_by_name = {
        item["alias"]: copy.deepcopy(item)
        for item in existing_aliases
        if item["alias"] not in excluded_names
        and item["canonicalName"] not in excluded_names
    }
    alias_targets = {
        alias: item["canonicalName"] for alias, item in aliases_by_name.items()
    }
    metadata_by_name: dict[str, dict[str, Any]] = {}
    for item in existing_metadata:
        name = resolve_alias(item["name"], alias_targets)
        if item["name"] in excluded_names or name in excluded_names:
            continue
        incoming = copy.deepcopy(item)
        incoming["name"] = name
        existing = metadata_by_name.get(name, {})
        for field in {"dataUrl", "githubUrl", "huggingFaceUrl"}:
            if (
                existing.get(field) not in (None, "", [])
                and incoming.get(field) not in (None, "", [])
                and existing[field] != incoming[field]
            ):
                raise ValueError(
                    f"Alias-folded metadata conflict for {name}.{field}: "
                    f"{existing[field]!r} versus {incoming[field]!r}"
                )
        metadata_by_name[name] = {
            **incoming,
            **{field: value for field, value in existing.items() if value not in (None, "", [])},
        }

    mentions_by_key: dict[tuple[str, str, str, str, str], dict[str, Any]] = {}
    for item in existing_mentions:
        mention = copy.deepcopy(item)
        if not has_paper_identity(mention.get("paper") or {}):
            continue
        mention["datasetName"] = resolve_alias(mention.get("datasetName") or "", alias_targets)
        if mention["datasetName"] in excluded_names or is_suppressed(
            mention["datasetName"], mention.get("paper") or {}
        ):
            continue
        mentions_by_key[mention_key(mention)] = mention
    unresolved: list[dict[str, Any]] = []
    ambiguous_aliases: dict[str, set[str]] = {}

    for audit in audits:
        audit_domain = audit.get("domain")
        for item in approved_items(audit):
            audited_name = item.get("canonicalName")
            if not audited_name:
                raise ValueError("Approved item is missing canonicalName")
            name = resolve_alias(audited_name, alias_targets)
            if audited_name in excluded_names or name in excluded_names:
                continue

            link_record = enrichment.get(audited_name, enrichment.get(name, {}))
            if link_record and link_record.get("status") == "reject":
                unresolved.append(
                    {
                        "canonicalName": name,
                        "reason": link_record.get("reason") or "Link verification rejected the item",
                        "status": "rejected-by-link-audit",
                    }
                )
                continue
            verified_enrichment = (
                link_record if link_record.get("status") == "verified" else {}
            )
            existing = (
                {}
                if item.get("replacesExisting")
                else metadata_by_name.get(name, {})
            )
            paper_url = first_nonempty(
                verified_enrichment.get("paperUrl"),
                existing.get("paperUrl"),
                item.get("paperUrl"),
            )
            github_url = first_nonempty(
                verified_enrichment.get("githubUrl"),
                existing.get("githubUrl"),
                item.get("githubUrl"),
            )
            hugging_face_url = first_nonempty(
                verified_enrichment.get("huggingFaceUrl"),
                existing.get("huggingFaceUrl"),
                item.get("huggingFaceUrl"),
            )
            data_url = first_nonempty(
                verified_enrichment.get("dataUrl"),
                existing.get("dataUrl"),
                item.get("dataUrl"),
                hugging_face_url,
                github_url,
            )
            if not data_url:
                unresolved.append(
                    {
                        "canonicalName": name,
                        "reason": "No verified public dataset URL",
                        "status": "unresolved",
                    }
                )
                continue

            audit_mentions = item.get("mentions") or []
            if not audit_mentions and not paper_url:
                unresolved.append(
                    {
                        "canonicalName": name,
                        "reason": "No audited citing-paper record or primary paper URL",
                        "status": "unresolved",
                    }
                )
                continue

            metadata = copy.deepcopy(existing)
            metadata["name"] = name
            field_values = {
                "domain": first_nonempty(existing.get("domain"), audit_domain),
                "year": first_nonempty(existing.get("year"), item.get("year")),
                "venue": first_nonempty(existing.get("venue"), item.get("venue")),
                "size": first_nonempty(
                    existing.get("size"), item.get("size"), item.get("recordedScale")
                ),
                "paperUrl": paper_url,
                "githubUrl": github_url,
                "huggingFaceUrl": hugging_face_url,
                "dataUrl": data_url,
                "sourceUrl": first_nonempty(
                    verified_enrichment.get("evidenceUrl"),
                    existing.get("sourceUrl"),
                    paper_url,
                ),
                "trainingEvidence": first_nonempty(
                    existing.get("trainingEvidence"), item.get("trainingEvidence")
                ),
                "linkVerificationEvidenceUrl": first_nonempty(
                    verified_enrichment.get("evidenceUrl"),
                    existing.get("linkVerificationEvidenceUrl"),
                ),
                "linkVerificationReason": first_nonempty(
                    verified_enrichment.get("reason"),
                    existing.get("linkVerificationReason"),
                ),
            }
            for field, value in field_values.items():
                if value not in (None, "", []):
                    metadata[field] = str(value) if field in {"year"} else value
            if not metadata.get("trainingEvidence"):
                raise ValueError(f"Approved dataset {name} has no training evidence")
            metadata_by_name[name] = metadata

            for audited_mention in audit_mentions:
                paper = audited_paper(audited_mention, audit_domain)
                if not has_paper_identity(paper):
                    raise ValueError(
                        f"Approved mention for {name} has no citing-paper identity"
                    )
                if not item.get("replacesExisting") and is_suppressed(name, paper):
                    continue
                mention = {
                    "datasetName": name,
                    "status": "approved",
                    "role": "training",
                    "paper": paper,
                    "evidence": audited_mention.get("evidence")
                    or item.get("trainingEvidence"),
                    "source": audited_mention.get("source"),
                }
                if not mention["evidence"]:
                    raise ValueError(f"Approved mention for {name} has no exact evidence")
                mentions_by_key[mention_key(mention)] = mention

            for alias in item.get("aliases") or []:
                if not alias or alias == name:
                    continue
                if alias in ambiguous_aliases:
                    ambiguous_aliases[alias].add(name)
                    continue
                existing_alias = aliases_by_name.get(alias)
                if existing_alias and existing_alias.get("canonicalName") != name:
                    ambiguous_aliases[alias] = {
                        existing_alias.get("canonicalName"),
                        name,
                    }
                    aliases_by_name.pop(alias, None)
                    alias_targets.pop(alias, None)
                    continue
                aliases_by_name[alias] = {
                    "alias": alias,
                    "canonicalName": name,
                    "reason": item.get("nameMatchReason")
                    or "The paper audit explicitly verified this alias.",
                }
                alias_targets[alias] = name

    apply_url_replacements(
        metadata_by_name,
        mentions_by_key,
        quality_overrides.get("urlReplacements") or [],
    )

    return {
        "metadata": sorted(metadata_by_name.values(), key=lambda item: item["name"].casefold()),
        "mentions": sorted(mentions_by_key.values(), key=mention_key),
        "aliases": sorted(aliases_by_name.values(), key=lambda item: item["alias"].casefold()),
        "aliasConflicts": [
            {
                "alias": alias,
                "canonicalNames": sorted(names, key=str.casefold),
                "reason": "The same short name was explicitly used for multiple datasets, so no global alias is published.",
            }
            for alias, names in sorted(ambiguous_aliases.items())
        ],
        "unresolved": sorted(unresolved, key=lambda item: item["canonicalName"].casefold()),
    }


def load_collection(path: pathlib.Path, key: str) -> list[dict[str, Any]]:
    payload = json.loads(path.read_text())
    return payload.get(key, payload)


def write_payloads(result: dict[str, list[dict[str, Any]]], output_dir: pathlib.Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    payloads = {
        "training-datasets.json": {
            "_comment": (
                "Dataset means a publicly released resource whose primary paper or official "
                "repository supports model or classifier training, fine-tuning, alignment, "
                "imitation learning, offline reinforcement learning, or provides an explicit "
                "train/validation split. Test-only questions, task suites, evaluation "
                "environments, and benchmark-only data remain in Benchmarks. Every inclusion "
                "records exact training-use evidence and a verified public data URL."
            ),
            "items": result["metadata"],
        },
        "paper-dataset-mentions.json": {
            "_comment": "Audited paper-level uses of trainable datasets with exact evidence.",
            "mentions": result["mentions"],
        },
        "dataset-alias-overrides.json": {
            "_comment": "Aliases explicitly verified during paper audits; no fuzzy matching.",
            "aliases": result["aliases"],
        },
        "dataset-alias-conflicts.json": {
            "_comment": "Ambiguous short names intentionally excluded from global alias matching.",
            "items": result["aliasConflicts"],
        },
        "unresolved-paper-datasets.json": {
            "_comment": "Approved training-data mentions not published because a required public source is unresolved.",
            "items": result["unresolved"],
        },
    }
    for filename, payload in payloads.items():
        (output_dir / filename).write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--audit", action="append", type=pathlib.Path, default=[])
    parser.add_argument("--enrichment", action="append", type=pathlib.Path, default=[])
    parser.add_argument("--output-dir", type=pathlib.Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument(
        "--quality-overrides",
        type=pathlib.Path,
        default=DEFAULT_QUALITY_OVERRIDES,
    )
    parser.add_argument("--write-sources", action="store_true")
    parser.add_argument(
        "--apply-quality-overrides-only",
        action="store_true",
        help=(
            "Apply documented quality overrides to the existing consolidated source "
            "without replaying audits; unresolved and alias-conflict records are preserved."
        ),
    )
    args = parser.parse_args()
    if not args.audit and not args.apply_quality_overrides_only:
        parser.error("provide at least one --audit or use --apply-quality-overrides-only")
    if args.audit and args.apply_quality_overrides_only:
        parser.error("--apply-quality-overrides-only cannot be combined with --audit")

    metadata = load_collection(DATA_DIR / "training-datasets.json", "items")
    mentions = load_collection(DATA_DIR / "paper-dataset-mentions.json", "mentions")
    aliases = load_collection(DATA_DIR / "dataset-alias-overrides.json", "aliases")
    audits = [json.loads(path.read_text()) for path in args.audit]
    enrichment = load_enrichment(
        [json.loads(path.read_text()) for path in args.enrichment]
    )
    quality_overrides = (
        json.loads(args.quality_overrides.read_text())
        if args.quality_overrides.exists()
        else {}
    )
    result = consolidate(
        metadata,
        mentions,
        aliases,
        audits,
        enrichment,
        quality_overrides=quality_overrides,
    )
    if args.apply_quality_overrides_only:
        result["aliasConflicts"] = load_collection(
            DATA_DIR / "dataset-alias-conflicts.json", "items"
        )
        result["unresolved"] = load_collection(
            DATA_DIR / "unresolved-paper-datasets.json", "items"
        )
    output_dir = DATA_DIR if args.write_sources else args.output_dir
    write_payloads(result, output_dir)
    print(
        f"wrote {output_dir}: {len(result['metadata'])} datasets, "
        f"{len(result['mentions'])} mentions, {len(result['unresolved'])} unresolved"
    )


if __name__ == "__main__":
    main()
