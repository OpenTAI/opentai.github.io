"""Fetch complete, verified author lists for arXiv-linked catalog papers.

The two bibliography snapshots often use citation shorthand such as
``Feng et al.``. This script keeps a separate official-arXiv metadata cache so
the public catalog can abbreviate the display without losing coauthors from
search. Records are applied only when the arXiv title matches the catalog title.
"""

from datetime import datetime, timezone
import json
import pathlib
import time
import urllib.parse
import urllib.request

from paper_author_metadata import normalize_arxiv_id, parse_arxiv_author_feed


DATA = pathlib.Path(__file__).parent / "data"
OUT = DATA / "paper-author-metadata.json"
API = "https://export.arxiv.org/api/query"
UA = {"User-Agent": "opentai-web-paper-authors/1.0 (https://opentai.org)"}
BATCH_SIZE = 50


def catalog_targets():
    library = json.load(open(DATA / "paper-library.json"))
    return sorted(
        {
            normalize_arxiv_id(paper.get("arxivId"))
            for paper in library
            if normalize_arxiv_id(paper.get("arxivId"))
        }
    )


def fetch_batch(arxiv_ids):
    query = urllib.parse.urlencode(
        {"id_list": ",".join(arxiv_ids), "max_results": len(arxiv_ids)}
    )
    request = urllib.request.Request(f"{API}?{query}", headers=UA)
    with urllib.request.urlopen(request, timeout=90) as response:
        return parse_arxiv_author_feed(response.read())


def main():
    targets = catalog_targets()
    existing = json.loads(OUT.read_text()) if OUT.exists() else {"records": {}}
    records = existing.get("records", {})
    pending = [arxiv_id for arxiv_id in targets if arxiv_id not in records]
    print(f"{len(targets)} arXiv-linked papers; {len(pending)} author records to fetch")

    for start in range(0, len(pending), BATCH_SIZE):
        batch = pending[start : start + BATCH_SIZE]
        for attempt in range(3):
            try:
                records.update(fetch_batch(batch))
                break
            except Exception as error:
                if attempt == 2:
                    raise
                print(f"  retrying batch after {error}")
                time.sleep(5 * (attempt + 1))

        OUT.write_text(
            json.dumps(
                {
                    "source": API,
                    "retrievedAt": datetime.now(timezone.utc).isoformat(),
                    "records": dict(sorted(records.items())),
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n"
        )
        print(f"  {min(start + len(batch), len(pending))}/{len(pending)} fetched")
        if start + BATCH_SIZE < len(pending):
            time.sleep(3.1)

    missing = sorted(set(targets) - set(records))
    print(f"wrote {OUT}: {len(records)} records; {len(missing)} unresolved")
    if missing:
        print("unresolved arXiv IDs: " + ", ".join(missing))


if __name__ == "__main__":
    main()
