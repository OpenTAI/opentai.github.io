"""Resolve non-arXiv papers to public full text with exact-title evidence.

OpenAlex is used only as a discovery index. A result is accepted only when
exactly one work has the same normalized title and OpenAlex records an open
PDF URL. Fuzzy and landing-page-only results remain unresolved.
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
from typing import Any


HERE = pathlib.Path(__file__).parent
DEFAULT_MANIFEST = HERE.parent / "tmp" / "paper-digest-manifest.json"
DEFAULT_OUTPUT = HERE / "data" / "paper-dataset-audits" / "paper-fulltext-resolutions.json"
DEFAULT_DOWNLOAD_AUDIT = HERE.parent / "tmp" / "pdfs" / "openalex-exact" / "download-audit.json"
USER_AGENT = {"User-Agent": "OpenTAI-paper-audit/1.0 (https://opentai.org)"}


def normalize_title(value: str | None) -> str:
    return re.sub(r"[^a-z0-9]", "", (value or "").casefold())


def select_exact_public_fulltext(
    title: str,
    works: list[dict[str, Any]],
) -> dict[str, Any] | None:
    matches = [work for work in works if normalize_title(work.get("title")) == normalize_title(title)]
    unique = {work.get("id"): work for work in matches if work.get("id")}
    if len(unique) != 1:
        return None
    work = next(iter(unique.values()))
    location = work.get("best_oa_location") or {}
    locations = [location, *(work.get("locations") or [])]
    pdf_candidates: list[str] = []
    for candidate in locations:
        pdf_url = candidate.get("pdf_url") if candidate.get("is_oa") else None
        if (
            pdf_url
            and str(pdf_url).startswith(("http://", "https://"))
            and pdf_url not in pdf_candidates
        ):
            pdf_candidates.append(pdf_url)
    if not pdf_candidates:
        return None
    return {
        "matchedTitle": " ".join((work.get("title") or "").split()),
        "openAlexId": work["id"],
        "doi": work.get("doi"),
        "landingPageUrl": location.get("landing_page_url"),
        "pdfUrl": pdf_candidates[0],
        "pdfCandidates": pdf_candidates,
    }


def ssl_context() -> ssl.SSLContext:
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def query_openalex(title: str) -> tuple[str, list[dict[str, Any]]]:
    params = urllib.parse.urlencode({"search": title, "per-page": 25})
    url = f"https://api.openalex.org/works?{params}"
    request = urllib.request.Request(url, headers=USER_AGENT)
    payload = json.loads(
        urllib.request.urlopen(request, timeout=45, context=ssl_context()).read()
    )
    return url, payload.get("results", [])


def recover_from_download_audit(
    resolutions: dict[str, Any],
    download_audit: dict[str, Any],
) -> dict[str, Any]:
    """Restore exact resolutions already consumed by the PDF downloader."""

    recovered = dict(resolutions)
    for title, record in download_audit.items():
        openalex_id = record.get("openAlexId")
        pdf_url = record.get("sourcePdfUrl")
        if not openalex_id or not pdf_url:
            continue
        recovered[title] = {
            "status": "resolved",
            "domain": record.get("domain"),
            "sourceUrl": recovered.get(title, {}).get("sourceUrl"),
            "queryUrl": (
                "https://api.openalex.org/works?"
                + urllib.parse.urlencode({"search": title, "per-page": 25})
            ),
            "matchedTitle": title,
            "openAlexId": openalex_id,
            "pdfUrl": pdf_url,
            "pdfCandidates": [pdf_url],
            "recoveredFrom": str(DEFAULT_DOWNLOAD_AUDIT.relative_to(HERE.parent)),
        }
    return recovered


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=pathlib.Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--output", type=pathlib.Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--download-audit", type=pathlib.Path, default=DEFAULT_DOWNLOAD_AUDIT)
    parser.add_argument("--delay", type=float, default=0.15)
    parser.add_argument("--refresh-resolved", action="store_true")
    parser.add_argument("--recover-only", action="store_true")
    args = parser.parse_args()

    manifest = json.loads(args.manifest.read_text())
    previous = json.loads(args.output.read_text()) if args.output.exists() else {}
    resolutions = dict(previous.get("resolutions", {}))
    if args.download_audit.exists():
        resolutions = recover_from_download_audit(
            resolutions,
            json.loads(args.download_audit.read_text()),
        )
    unresolved = manifest.get("unresolved", [])

    if args.recover_only:
        result = {
            "scope": "Unique exact normalized OpenAlex title matches with an indexed public PDF only.",
            "paperCount": len(unresolved),
            "resolvedCount": sum(item.get("status") == "resolved" for item in resolutions.values()),
            "resolutions": resolutions,
        }
        args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
        print(f"recovered {result['resolvedCount']} exact public-PDF resolutions")
        return

    for index, paper in enumerate(unresolved, 1):
        title = paper.get("title")
        cached = resolutions.get(title, {})
        if not title or (
            cached
            and cached.get("status") != "lookup_error"
            and not (args.refresh_resolved and cached.get("status") == "resolved")
        ):
            continue
        try:
            query_url, works = query_openalex(title)
            selected = select_exact_public_fulltext(title, works)
            if selected:
                resolutions[title] = {
                    "status": "resolved",
                    "domain": paper.get("domain"),
                    "sourceUrl": paper.get("url"),
                    "queryUrl": query_url,
                    **selected,
                }
            elif cached.get("status") != "resolved":
                resolutions[title] = {
                    "status": "no_exact_public_pdf",
                    "domain": paper.get("domain"),
                    "sourceUrl": paper.get("url"),
                    "queryUrl": query_url,
                }
        except Exception as error:
            if cached.get("status") == "resolved":
                resolutions[title] = {**cached, "refreshError": str(error)}
            else:
                resolutions[title] = {
                    "status": "lookup_error",
                    "domain": paper.get("domain"),
                    "sourceUrl": paper.get("url"),
                    "error": str(error),
                }

        result = {
            "scope": "Unique exact normalized OpenAlex title matches with an indexed public PDF only.",
            "paperCount": len(unresolved),
            "resolvedCount": sum(item.get("status") == "resolved" for item in resolutions.values()),
            "resolutions": resolutions,
        }
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
        print(f"{len(resolutions)}/{len(unresolved)} resolved {result['resolvedCount']}", flush=True)
        if index < len(unresolved):
            time.sleep(args.delay)


if __name__ == "__main__":
    main()
