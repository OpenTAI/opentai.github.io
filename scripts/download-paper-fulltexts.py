"""Download only preverified public PDFs from the full-text resolution cache."""

from __future__ import annotations

import argparse
import json
import pathlib
import ssl
import time
import urllib.request
from typing import Any


HERE = pathlib.Path(__file__).parent
DEFAULT_INPUT = HERE / "data" / "paper-dataset-audits" / "paper-fulltext-resolutions.json"
DEFAULT_OUTPUT_DIR = HERE.parent / "tmp" / "pdfs" / "openalex-exact"
USER_AGENT = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"
    ),
    "Accept": "application/pdf,application/octet-stream;q=0.9,*/*;q=0.1",
}


def is_pdf(payload: bytes) -> bool:
    return payload.lstrip().startswith(b"%PDF-")


def safe_filename(openalex_id: str) -> str:
    identifier = openalex_id.rstrip("/").rsplit("/", 1)[-1]
    if not identifier.startswith("W") or not identifier[1:].isdigit():
        raise ValueError(f"Unexpected OpenAlex ID: {openalex_id}")
    return f"{identifier}.pdf"


def ssl_context() -> ssl.SSLContext:
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def download(url: str) -> tuple[bytes, str]:
    request = urllib.request.Request(url, headers=USER_AGENT)
    with urllib.request.urlopen(request, timeout=60, context=ssl_context()) as response:
        return response.read(), response.geturl()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=pathlib.Path, default=DEFAULT_INPUT)
    parser.add_argument("--output-dir", type=pathlib.Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--delay", type=float, default=0.4)
    args = parser.parse_args()

    source = json.loads(args.input.read_text())
    args.output_dir.mkdir(parents=True, exist_ok=True)
    audit_path = args.output_dir / "download-audit.json"
    audit: dict[str, Any] = json.loads(audit_path.read_text()) if audit_path.exists() else {}

    resolved = [
        (title, record)
        for title, record in source.get("resolutions", {}).items()
        if record.get("status") == "resolved"
    ]
    for index, (title, record) in enumerate(resolved, 1):
        if audit.get(title, {}).get("status") == "downloaded":
            continue
        output = args.output_dir / safe_filename(record["openAlexId"])
        try:
            errors = []
            payload = b""
            final_url = ""
            source_pdf_url = ""
            for candidate in record.get("pdfCandidates") or [record["pdfUrl"]]:
                try:
                    payload, final_url = download(candidate)
                    if not is_pdf(payload):
                        raise ValueError("Endpoint did not return PDF bytes")
                    source_pdf_url = candidate
                    break
                except Exception as error:
                    errors.append(f"{candidate}: {error}")
            if not source_pdf_url:
                raise ValueError("; ".join(errors))
            output.write_bytes(payload)
            audit[title] = {
                "status": "downloaded",
                "domain": record.get("domain"),
                "openAlexId": record["openAlexId"],
                "sourcePdfUrl": source_pdf_url,
                "finalPdfUrl": final_url,
                "path": str(output.relative_to(HERE.parent)),
                "bytes": len(payload),
            }
        except Exception as error:
            audit[title] = {
                "status": "download_error",
                "domain": record.get("domain"),
                "openAlexId": record.get("openAlexId"),
                "sourcePdfUrl": record.get("pdfUrl"),
                "error": str(error),
            }
        audit_path.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n")
        downloaded = sum(item.get("status") == "downloaded" for item in audit.values())
        print(f"{index}/{len(resolved)} downloaded {downloaded}", flush=True)
        if index < len(resolved):
            time.sleep(args.delay)


if __name__ == "__main__":
    main()
