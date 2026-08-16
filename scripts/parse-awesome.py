"""Parse xingjunm/Awesome-Large-Model-Safety into structured paper entries.

The upstream list is a bibliography: title / authors / venue-and-year, grouped
into <details> chapters and ##### sections. No links are present, so none are
invented here — link resolution is a separate, verifiable step.
"""
import json, pathlib, re, urllib.request

UA = {"User-Agent": "opentai-web-metadata/1.0"}
DATA = pathlib.Path(__file__).parent / "data"
SRC = "https://raw.githubusercontent.com/xingjunm/Awesome-Large-Model-Safety/main/README.md"

raw = DATA / "awesome.md"
if not raw.exists():
    raw.write_bytes(
        urllib.request.urlopen(urllib.request.Request(SRC, headers=UA), timeout=60).read()
    )
text = raw.read_text()
# papers only — everything after "Open Challenges" is prose
cut = text.find("Open Challenges")
if cut > 0:
    text = text[:cut]

VENUE_LINE = re.compile(r"^\s+-\s+\*(?P<venue>[^*]+)\*(?P<rest>.*)$")
YEAR = re.compile(r"(19|20)\d{2}")

entries = []
chapter = section = None
current = None

for line in text.splitlines():
    m = re.match(r"\s*<summary>(?:<span[^>]*>)?(?P<t>[^<]+)", line)
    if m:
        chapter = m.group("t").strip()
        section = None
        continue

    if line.startswith("##### "):
        section = line[6:].strip()
        continue

    # Titles are normally capitalized, but h4rm3l intentionally starts with a
    # lowercase product name. Match any ASCII letter so it is not silently
    # dropped from the Agent Safety Benchmarks section.
    m = re.match(r"^- (?P<title>[A-Za-z0-9].*?)\.?\s*$", line)
    if m and chapter:
        current = {
            "title": m.group("title").strip().rstrip("."),
            "chapter": chapter,
            "section": section,
            "authors": [],
            "venue": None,
            "year": None,
        }
        entries.append(current)
        continue

    if current is None:
        continue

    # authors line: "  - A, B, **and** C"
    if re.match(r"^\s+- (?!\*)", line) and not current["authors"]:
        people = re.sub(r"\*\*and\*\*", ",", line.strip()[2:])
        names = [p.strip() for p in people.split(",") if p.strip()]
        # the list is "Last, First, Last, First" — pair them back up
        if len(names) >= 2:
            current["authors"] = [
                f"{names[i + 1]} {names[i]}" for i in range(0, len(names) - 1, 2)
            ]
        continue

    vm = VENUE_LINE.match(line)
    if vm:
        venue = vm.group("venue").strip().rstrip(",")
        tail = vm.group("rest")
        year = YEAR.search(tail) or YEAR.search(venue)
        current["year"] = year.group(0) if year else None
        aid = re.search(r"(\d{4}\.\d{4,5})", venue + tail)
        if aid:
            current["arxivId"] = aid.group(1)
        if re.search(r"arxiv", venue, re.I):
            venue = "arXiv"
        current["venue"] = venue
        current = None

entries = [e for e in entries if e["title"] and len(e["title"]) > 12]
json.dump(entries, open(DATA / "awesome-papers.json", "w"), ensure_ascii=False, indent=2)

chapters = {}
for e in entries:
    chapters.setdefault(e["chapter"], 0)
    chapters[e["chapter"]] += 1

print(f"parsed {len(entries)} papers")
print(f"  with authors: {sum(1 for e in entries if e['authors'])}")
print(f"  with venue:   {sum(1 for e in entries if e['venue'])}")
print(f"  with year:    {sum(1 for e in entries if e['year'])}")
print(f"  with arXiv id:{sum(1 for e in entries if e.get('arxivId'))}")
print("\nchapters:")
for name, count in chapters.items():
    print(f"  {count:4}  {name}")
