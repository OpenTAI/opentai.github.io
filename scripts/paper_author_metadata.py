"""Parse and apply source-verified paper author metadata."""

from copy import deepcopy
import re
import xml.etree.ElementTree as ET


ATOM = {"atom": "http://www.w3.org/2005/Atom"}


def normalize_arxiv_id(value):
    return re.sub(r"v\d+$", "", (value or "").strip().rsplit("/", 1)[-1])


def normalize_title(value):
    return re.sub(r"[^a-z0-9]", "", (value or "").lower())


def titles_match(left, right):
    left = normalize_title(left)
    right = normalize_title(right)
    if left == right:
        return True
    return len(left) > 40 and len(right) > 40 and (
        left.startswith(right[:40]) or right.startswith(left[:40])
    )


def parse_arxiv_author_feed(raw):
    records = {}
    for entry in ET.fromstring(raw).findall("atom:entry", ATOM):
        arxiv_id = normalize_arxiv_id(entry.findtext("atom:id", "", ATOM))
        title = re.sub(r"\s+", " ", entry.findtext("atom:title", "", ATOM)).strip()
        authors = [
            re.sub(r"\s+", " ", author.findtext("atom:name", "", ATOM)).strip()
            for author in entry.findall("atom:author", ATOM)
        ]
        authors = [author for author in authors if author]
        updated = (entry.findtext("atom:updated", "", ATOM) or "")[:10] or None
        if arxiv_id and title and authors:
            records[arxiv_id] = {
                "arxivId": arxiv_id,
                "authors": authors,
                "title": title,
                "updated": updated,
            }
    return records


def with_verified_authors(paper, metadata):
    result = deepcopy(paper)
    arxiv_id = normalize_arxiv_id(paper.get("arxivId"))
    verified = metadata.get(arxiv_id)
    if not verified or not titles_match(verified.get("title"), paper.get("title")):
        return result

    authors = [name.strip() for name in verified.get("authors", []) if name.strip()]
    if not authors:
        return result
    result["authors"] = authors
    result["authorCount"] = len(authors)
    return result
