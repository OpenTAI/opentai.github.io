"""Resolve arXiv IDs for parsed papers that do not carry one.

Only near-exact title matches are accepted, so a wrong paper is never linked.
Progress is written incrementally — the job can be interrupted and resumed.
"""
import json, pathlib, re, time, urllib.parse, urllib.request
import xml.etree.ElementTree as ET

UA = {"User-Agent": "opentai-web-metadata/1.0"}
DATA = pathlib.Path(__file__).parent / "data"
OUT = DATA / "paper-links.json"
NS = {"a": "http://www.w3.org/2005/Atom"}

papers = json.load(open(DATA / "awesome-papers.json"))
found = json.loads(OUT.read_text()) if OUT.exists() else {}

todo = [p for p in papers if not p.get("arxivId") and p["title"] not in found]
print(f"{len(papers)} papers, {len(found)} already resolved, {len(todo)} to look up")


def norm(t):
    return re.sub(r"[^a-z0-9]", "", (t or "").lower())


def lookup(title):
    q = urllib.parse.quote(f'ti:"{title[:120]}"')
    url = f"https://export.arxiv.org/api/query?search_query={q}&max_results=4"
    for attempt in range(3):
        try:
            raw = urllib.request.urlopen(
                urllib.request.Request(url, headers=UA), timeout=45
            ).read()
            break
        except Exception:
            time.sleep(5 * (attempt + 1))
    else:
        return None

    want = norm(title)
    for entry in ET.fromstring(raw).findall("a:entry", NS):
        got = re.sub(r"\s+", " ", entry.findtext("a:title", "", NS)).strip()
        if norm(got) == want or (len(want) > 40 and norm(got).startswith(want[:40])):
            return entry.findtext("a:id", "", NS).rsplit("/", 1)[-1].split("v")[0]
    return None


hits = 0
for i, paper in enumerate(todo, 1):
    aid = lookup(paper["title"])
    found[paper["title"]] = aid
    if aid:
        hits += 1
    if i % 10 == 0 or i == len(todo):
        OUT.write_text(json.dumps(found, ensure_ascii=False, indent=2))
        print(f"  {i}/{len(todo)}  resolved {hits}", flush=True)
    time.sleep(3.1)

OUT.write_text(json.dumps(found, ensure_ascii=False, indent=2))
print(f"done — {hits} new arXiv links out of {len(todo)} lookups")
