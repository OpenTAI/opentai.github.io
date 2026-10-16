"""Source-reviewed benchmark and dataset eligibility for homepage Trending only."""
from __future__ import annotations

from datetime import date
import re
from urllib.parse import urlparse


def validate_trending_audit(rows: list[dict], audit: list[dict], kind: str = 'benchmark') -> None:
    """Reject malformed reviews; absent reviews intentionally remain allowed."""
    if not isinstance(rows, list) or not isinstance(audit, list):
        raise ValueError(f'{kind} rows and trending audit must be lists')
    by_slug = {}
    for row in rows:
        if not isinstance(row, dict) or not isinstance(row.get('slug'), str) or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', row['slug']):
            raise ValueError(f'{kind} row requires a stable slug')
        if row['slug'] in by_slug:
            raise ValueError(f"duplicate {kind} slug: {row['slug']}")
        by_slug[row['slug']] = row
    seen = set()
    for entry in audit:
        if not isinstance(entry, dict):
            raise ValueError('trending audit record must be an object')
        slug = entry.get('slug')
        if not isinstance(slug, str) or slug not in by_slug:
            raise ValueError(f'unknown {kind} slug: {slug!r}')
        if slug in seen:
            raise ValueError(f'duplicate trending audit slug: {slug}')
        seen.add(slug)
        if entry.get('name') != by_slug[slug].get('name'):
            raise ValueError(f'{slug}: name must match the {kind} catalog')
        if entry.get('status') not in ('keep', 'exclude'):
            raise ValueError(f'{slug}: status must be keep or exclude')
        reason = entry.get('reason')
        if not isinstance(reason, str) or not reason.strip():
            raise ValueError(f'{slug}: item-specific reason is required')
        stars_source = entry.get('starsSource')
        if stars_source is not None and not (isinstance(stars_source, str) and stars_source.startswith('https://')):
            raise ValueError(f'{slug}: starsSource must be an HTTPS URL when present')
        urls = entry.get('sourceUrls')
        if not isinstance(urls, list) or not urls:
            raise ValueError(f'{slug}: sourceUrls must be a nonempty list')
        for url in urls:
            try:
                parsed = urlparse(url) if isinstance(url, str) else None
                valid = parsed and parsed.scheme in ('https', 'http') and parsed.hostname and not re.search(r'\s', url) and not parsed.username and not parsed.password
                if parsed:
                    parsed.port  # Reject malformed ports too.
            except ValueError:
                valid = False
            if not valid:
                raise ValueError(f'{slug}: sourceUrls must contain HTTP(S) URLs')
        reviewed = entry.get('reviewedAt')
        try:
            if not isinstance(reviewed, str) or date.fromisoformat(reviewed).isoformat() != reviewed:
                raise ValueError
        except ValueError:
            raise ValueError(f'{slug}: reviewedAt must be a valid YYYY-MM-DD date') from None


def missing_trending_reviews(rows: list[dict], audit: list[dict], kind: str = 'benchmark') -> list[str]:
    validate_trending_audit(rows, audit, kind)
    reviewed = {entry['slug'] for entry in audit}
    return sorted(f"{row['name']} ({row['slug']})" for row in rows if row['slug'] not in reviewed)


def trending_benchmark_slugs(rows: list[dict], audit: list[dict]) -> list[str]:
    validate_trending_audit(rows, audit)
    kept = {entry['slug'] for entry in audit if entry['status'] == 'keep'}
    return [row['slug'] for row in rows if row['slug'] in kept]


def trending_dataset_slugs(rows: list[dict], audit: list[dict]) -> list[str]:
    """Datasets use the same ledger shape; unreviewed datasets fail closed."""
    validate_trending_audit(rows, audit, 'dataset')
    kept = {entry['slug'] for entry in audit if entry['status'] == 'keep'}
    return [row['slug'] for row in rows if row['slug'] in kept]
