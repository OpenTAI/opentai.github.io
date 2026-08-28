"""Validation and presentation rules for the source-backed dataset catalog."""

from __future__ import annotations

from urllib.parse import urlparse


MISSING_DESCRIPTION = "Description not recorded yet."


def is_http_url(value: object) -> bool:
    if not isinstance(value, str):
        return False
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def validate_dataset_summaries(records: list[dict]) -> None:
    for record in records:
        name = record.get("name") or "<unnamed dataset>"
        summary = (record.get("summary") or "").strip()
        source_url = (record.get("summarySourceUrl") or "").strip()

        if bool(summary) != bool(source_url):
            raise ValueError(f"{name}: summary and summarySourceUrl must be provided together")
        if source_url and not is_http_url(source_url):
            raise ValueError(f"{name}: summarySourceUrl must be an HTTP(S) URL")
        if summary and summary == (record.get("trainingEvidence") or "").strip():
            raise ValueError(f"{name}: training evidence cannot be reused as the public summary")
        if summary and ("Training-use context:" in summary or "[@" in summary):
            raise ValueError(f"{name}: public summary contains internal evidence prose")


def dataset_summary(record: dict) -> str:
    summary = (record.get("summary") or "").strip()
    return summary or MISSING_DESCRIPTION


def validate_dataset_scope_audit(records: list[dict], audit: list[dict]) -> None:
    record_names = [record.get("name") for record in records]
    audit_names = [entry.get("name") for entry in audit]
    duplicate_names = sorted({name for name in audit_names if audit_names.count(name) > 1})
    if duplicate_names:
        raise ValueError(f"duplicate dataset scope records: {duplicate_names}")

    missing = sorted(set(record_names) - set(audit_names))
    unknown = sorted(set(audit_names) - set(record_names))
    if missing or unknown:
        raise ValueError(f"dataset scope mismatch; missing={missing}, unknown={unknown}")

    for entry in audit:
        name = entry.get("name") or "<unnamed dataset>"
        if entry.get("status") not in {"keep", "exclude"}:
            raise ValueError(f"{name}: invalid dataset scope status")
        if not (entry.get("reason") or "").strip():
            raise ValueError(f"{name}: dataset scope reason is required")
        if not is_http_url(entry.get("sourceUrl")):
            raise ValueError(f"{name}: dataset scope sourceUrl must be an HTTP(S) URL")


def filter_scoped_datasets(records: list[dict], audit: list[dict]) -> list[dict]:
    validate_dataset_scope_audit(records, audit)
    status_by_name = {entry["name"]: entry["status"] for entry in audit}
    return [record for record in records if status_by_name[record["name"]] == "keep"]
