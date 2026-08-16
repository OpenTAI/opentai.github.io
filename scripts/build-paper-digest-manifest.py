"""Build the auditable arXiv digest manifest for the approved paper library.

This script only accepts identifiers already recorded in the source data or
embedded in an arXiv URL. It never resolves a title by guessing.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
from typing import Any


HERE = pathlib.Path(__file__).parent
DEFAULT_INPUT = HERE / "data" / "paper-library.json"
DEFAULT_RESOLUTIONS = HERE / "data" / "paper-dataset-audits" / "paper-title-resolutions.json"
DEFAULT_OUTPUT = HERE.parent / "tmp" / "paper-digest-manifest.json"
ARXIV_URL_RE = re.compile(r"https?://(?:www\.)?arxiv\.org/(?:abs|pdf)/([^/?#]+)", re.I)
ARXIV_ID_RE = re.compile(r"^(\d{4}\.\d{4,5}|[a-z-]+/\d{7})(?:v\d+)?$", re.I)


def canonical_arxiv_id(value: str | None) -> str | None:
    if not value:
        return None
    candidate = value.strip().removesuffix(".pdf")
    match = ARXIV_ID_RE.fullmatch(candidate)
    return match.group(1) if match else None


def paper_arxiv_id(paper: dict[str, Any]) -> str | None:
    direct = canonical_arxiv_id(paper.get("arxivId"))
    if direct:
        return direct
    url = paper.get("url") or ""
    match = ARXIV_URL_RE.match(url)
    return canonical_arxiv_id(match.group(1)) if match else None


def normalize_title(value: str | None) -> str:
    return re.sub(r"[^a-z0-9]", "", (value or "").casefold())


def verified_title_resolution(
    title: str | None,
    resolutions: dict[str, Any],
) -> tuple[str, str | None] | None:
    """Return an arXiv ID only from the persisted exact-title audit cache."""

    if not title:
        return None
    resolution = resolutions.get(title)
    if not isinstance(resolution, dict) or resolution.get("status") != "resolved":
        return None
    if normalize_title(resolution.get("matchedTitle")) != normalize_title(title):
        return None
    arxiv_id = canonical_arxiv_id(resolution.get("arxivId"))
    if not arxiv_id:
        return None
    return arxiv_id, resolution.get("queryUrl")


def build_manifest(
    papers: list[dict[str, Any]],
    resolutions: dict[str, Any] | None = None,
) -> dict[str, Any]:
    resolutions = resolutions or {}
    if isinstance(resolutions.get("resolutions"), dict):
        resolutions = resolutions["resolutions"]
    ids: list[str] = []
    seen: set[str] = set()
    resolved: list[dict[str, Any]] = []
    unresolved: list[dict[str, Any]] = []

    for paper in papers:
        arxiv_id = paper_arxiv_id(paper)
        resolution_source_url = None
        if not arxiv_id:
            verified = verified_title_resolution(paper.get("title"), resolutions)
            if verified:
                arxiv_id, resolution_source_url = verified
        if not arxiv_id:
            unresolved.append(
                {
                    "title": paper.get("title"),
                    "domain": paper.get("domain"),
                    "url": paper.get("url"),
                }
            )
            continue
        if arxiv_id not in seen:
            seen.add(arxiv_id)
            ids.append(arxiv_id)
        resolved_paper = {
            "title": paper.get("title"),
            "domain": paper.get("domain"),
            "group": paper.get("group"),
            "section": paper.get("section"),
            "source": paper.get("source"),
            "arxivId": arxiv_id,
        }
        if resolution_source_url:
            resolved_paper["resolutionSourceUrl"] = resolution_source_url
        resolved.append(resolved_paper)

    return {
        "paperCount": len(papers),
        "resolvedPaperCount": len(resolved),
        "uniqueArxivCount": len(ids),
        "unresolvedPaperCount": len(unresolved),
        "arxivIds": ids,
        "papers": resolved,
        "unresolved": unresolved,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=pathlib.Path, default=DEFAULT_INPUT)
    parser.add_argument("--resolutions", type=pathlib.Path, default=DEFAULT_RESOLUTIONS)
    parser.add_argument("--output", type=pathlib.Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    papers = json.loads(args.input.read_text())
    resolutions = json.loads(args.resolutions.read_text()) if args.resolutions.exists() else {}
    manifest = build_manifest(papers, resolutions)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(
        f"wrote {args.output}: {manifest['uniqueArxivCount']} unique arXiv IDs, "
        f"{manifest['unresolvedPaperCount']} unresolved papers"
    )


if __name__ == "__main__":
    main()
