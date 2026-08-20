#!/usr/bin/env python3
"""Validate the hand-reviewed OpenTAI ecosystem catalog."""

from __future__ import annotations

import json
import pathlib
import re
import sys
from typing import Any


ROOT = pathlib.Path(__file__).parents[1]
DEFAULT_CATALOG = ROOT / "scripts" / "data" / "ecosystem-catalog.json"

SECTION_CATEGORIES = {
    "models": {"Guard Models", "Security Models", "Aligned Models"},
    "frameworks": {"Attack", "Defense", "Red Teaming", "Evaluation"},
    "arenas": {"Live Arena", "Research Arena"},
    "companies": {"AI Safety", "Agent Safety", "AI Security", "Evaluation"},
}
REQUIRED_RECORD_FIELDS = {
    "id",
    "name",
    "category",
    "description",
    "descriptionZh",
    "links",
    "sources",
    "verificationNote",
}
ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def _is_https(value: Any) -> bool:
    return isinstance(value, str) and value.startswith("https://")


def validate_catalog(catalog: Any) -> list[str]:
    errors: list[str] = []
    if not isinstance(catalog, dict):
        return ["catalog must be a JSON object"]
    if catalog.get("schemaVersion") != 1:
        errors.append("schemaVersion must be 1")

    seen_ids: set[str] = set()
    for section, allowed_categories in SECTION_CATEGORIES.items():
        records = catalog.get(section)
        if not isinstance(records, list):
            errors.append(f"{section} must be an array")
            continue

        for index, record in enumerate(records):
            location = f"{section}[{index}]"
            if not isinstance(record, dict):
                errors.append(f"{location} must be an object")
                continue

            missing = sorted(REQUIRED_RECORD_FIELDS - record.keys())
            if missing:
                errors.append(f"{location} missing required fields: {', '.join(missing)}")

            record_id = record.get("id")
            if not isinstance(record_id, str) or not ID_PATTERN.fullmatch(record_id):
                errors.append(f"{location}.id must be a lowercase kebab-case string")
            elif record_id in seen_ids:
                errors.append(f"{location} has duplicate id: {record_id}")
            else:
                seen_ids.add(record_id)

            category = record.get("category")
            if category not in allowed_categories:
                errors.append(
                    f"{location}.category has unsupported category {category!r}; "
                    f"expected one of {sorted(allowed_categories)}"
                )

            for field in ("name", "description", "descriptionZh", "verificationNote"):
                value = record.get(field)
                if not isinstance(value, str) or not value.strip():
                    errors.append(f"{location}.{field} must be a non-empty string")

            year = record.get("year")
            if year is not None and (
                not isinstance(year, int) or isinstance(year, bool) or not 1900 <= year <= 2100
            ):
                errors.append(f"{location}.year must be an integer from 1900 to 2100")

            stars = record.get("stars")
            if stars is not None and (
                not isinstance(stars, int) or isinstance(stars, bool) or stars < 0
            ):
                errors.append(f"{location}.stars must be a non-negative integer")
            if stars is not None and not _is_https(record.get("github")):
                errors.append(f"{location}.github must be HTTPS when stars are recorded")
            if stars is not None and not re.fullmatch(
                r"\d{4}-\d{2}-\d{2}", str(record.get("starsUpdated", ""))
            ):
                errors.append(f"{location}.starsUpdated is required when stars are recorded")

            links = record.get("links")
            if not isinstance(links, list) or not links:
                errors.append(f"{location}.links must contain at least one public link")
            else:
                for link_index, link in enumerate(links):
                    link_location = f"{location}.links[{link_index}]"
                    if not isinstance(link, dict):
                        errors.append(f"{link_location} must be an object")
                        continue
                    if not isinstance(link.get("label"), str) or not link["label"].strip():
                        errors.append(f"{link_location}.label must be a non-empty string")
                    if not _is_https(link.get("url")):
                        errors.append(f"{link_location}.url must use HTTPS")

            sources = record.get("sources")
            if not isinstance(sources, list) or not sources:
                errors.append(f"{location}.sources must contain at least one source")
            elif any(not _is_https(source) for source in sources):
                errors.append(f"{location}.sources must contain only HTTPS URLs")

            logo = record.get("logo")
            if logo is not None and not (
                isinstance(logo, str)
                and (logo.startswith("/") or logo.startswith("https://"))
            ):
                errors.append(f"{location}.logo must be a root-relative path or HTTPS URL")

            if section == "companies":
                for field in ("direction", "directionZh"):
                    value = record.get(field)
                    if not isinstance(value, str) or not value.strip():
                        errors.append(f"{location}.{field} must be a non-empty string")
                if not isinstance(logo, str) or not logo.startswith("/"):
                    errors.append(f"{location}.logo must be a root-relative path")
                if not _is_https(record.get("logoSource")):
                    errors.append(f"{location}.logoSource must use HTTPS")

    return errors


def main(argv: list[str] | None = None) -> int:
    path = pathlib.Path(argv[0]) if argv else DEFAULT_CATALOG
    try:
        catalog = json.loads(path.read_text())
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Unable to read {path}: {exc}", file=sys.stderr)
        return 1

    errors = validate_catalog(catalog)
    if errors:
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    total = sum(len(catalog[section]) for section in SECTION_CATEGORIES)
    print(f"Validated {total} ecosystem catalog entries from {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
