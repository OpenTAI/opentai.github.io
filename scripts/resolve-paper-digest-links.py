"""Resolve missing arXiv IDs with exact-title evidence only.

The output is an auditable cache. Prefix, fuzzy, or duplicate exact matches are
rejected instead of being silently attached to a paper.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import ssl
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from typing import Any


HERE = pathlib.Path(__file__).parent
DEFAULT_MANIFEST = HERE.parent / "tmp" / "paper-digest-manifest.json"
DEFAULT_OUTPUT = HERE.parent / "tmp" / "paper-title-resolutions.json"
ATOM = {"atom": "http://www.w3.org/2005/Atom"}
USER_AGENT = {"User-Agent": "OpenTAI-paper-audit/1.0"}


def normalize_title(value: str | None) -> str:
    return re.sub(r"[^a-z0-9]", "", (value or "").casefold())


def canonical_arxiv_id(value: str) -> str:
    return re.sub(r"v\d+$", "", value.rsplit("/", 1)[-1])


def select_exact_match(title: str, entries: list[dict[str, str]]) -> dict[str, str] | None:
    wanted = normalize_title(title)
    matches = [entry for entry in entries if normalize_title(entry.get("title")) == wanted]
    ids = {canonical_arxiv_id(entry["arxivId"]) for entry in matches}
    if len(ids) != 1:
        return None
    match = matches[0]
    return {
        "title": " ".join(match["title"].split()),
        "arxivId": canonical_arxiv_id(match["arxivId"]),
    }


def ssl_context() -> ssl.SSLContext:
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def query_arxiv(title: str) -> tuple[str, list[dict[str, str]]]:
    query = urllib.parse.quote(f'ti:"{title[:180]}"')
    url = f"https://export.arxiv.org/api/query?search_query={query}&max_results=6"
    request = urllib.request.Request(url, headers=USER_AGENT)
    raw = urllib.request.urlopen(request, timeout=45, context=ssl_context()).read()
    root = ET.fromstring(raw)
    entries = []
    for entry in root.findall("atom:entry", ATOM):
        entries.append(
            {
                "title": entry.findtext("atom:title", "", ATOM),
                "arxivId": entry.findtext("atom:id", "", ATOM),
            }
        )
    return url, entries


def resolve_manifest(
    manifest: dict[str, Any],
    previous: dict[str, Any],
    *,
    delay: float = 3.1,
) -> dict[str, Any]:
    resolutions = dict(previous.get("resolutions", {}))
    unresolved = manifest.get("unresolved", [])
    for index, paper in enumerate(unresolved, 1):
        title = paper["title"]
        if title in resolutions:
            continue
        try:
            query_url, entries = query_arxiv(title)
            match = select_exact_match(title, entries)
            resolutions[title] = {
                "status": "resolved" if match else "no_exact_match",
                "domain": paper.get("domain"),
                "sourceUrl": paper.get("url"),
                "queryUrl": query_url,
                "matchedTitle": match.get("title") if match else None,
                "arxivId": match.get("arxivId") if match else None,
            }
        except Exception as error:  # network errors must be visible and retryable
            resolutions[title] = {
                "status": "lookup_error",
                "domain": paper.get("domain"),
                "sourceUrl": paper.get("url"),
                "error": str(error),
            }
        if index < len(unresolved):
            time.sleep(delay)

    resolved_count = sum(item.get("status") == "resolved" for item in resolutions.values())
    return {
        "scope": "Exact normalized arXiv title matches only.",
        "paperCount": len(unresolved),
        "resolvedCount": resolved_count,
        "resolutions": resolutions,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=pathlib.Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--output", type=pathlib.Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--delay", type=float, default=3.1)
    args = parser.parse_args()

    manifest = json.loads(args.manifest.read_text())
    previous = json.loads(args.output.read_text()) if args.output.exists() else {}

    # Save after every lookup so interruption does not discard evidence.
    result = {"scope": "Exact normalized arXiv title matches only.", "resolutions": dict(previous.get("resolutions", {}))}
    for paper in manifest.get("unresolved", []):
        title = paper["title"]
        if title in result["resolutions"] and result["resolutions"][title].get("status") != "lookup_error":
            continue
        partial_manifest = {"unresolved": [paper]}
        partial = resolve_manifest(partial_manifest, result, delay=0)
        result["resolutions"] = partial["resolutions"]
        result["paperCount"] = len(manifest.get("unresolved", []))
        result["resolvedCount"] = sum(
            item.get("status") == "resolved" for item in result["resolutions"].values()
        )
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
        print(
            f"{len(result['resolutions'])}/{result['paperCount']} "
            f"resolved {result['resolvedCount']}",
            flush=True,
        )
        time.sleep(args.delay)


if __name__ == "__main__":
    main()
