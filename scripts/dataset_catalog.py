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
