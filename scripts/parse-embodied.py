"""Parse x-zheng16/Awesome-Embodied-AI-Safety into structured entries.

Unlike the large-model-safety list, this one is properly linked markdown:
`- [Title](url). Authors. *Venue*, Year.` grouped into two levels of <details>.
Links come from the source, so none have to be resolved.
"""
import json, pathlib, re, urllib.request

UA = {"User-Agent": "opentai-web-metadata/1.0"}
DATA = pathlib.Path(__file__).parent / "data"
SRC = "https://raw.githubusercontent.com/x-zheng16/Awesome-Embodied-AI-Safety/main/README.md"

raw = DATA / "embodied.md"
if not raw.exists():
    raw.write_bytes(
        urllib.request.urlopen(urllib.request.Request(SRC, headers=UA), timeout=60).read()
    )
lines = raw.read_text().splitlines()

# Top-level sections that hold reviewed attack/defense literature; everything
# else in "Other Related Works" is background material or a different kind.
LAYERS = {"Perception", "Cognition", "Planning", "Action and Interaction", "Agentic"}
KIND_BY_SECTION = {
    "Surveys & Reviews": "survey",
    "Benchmarks & Datasets": "benchmark",
    "Foundation, World, World-Action & VLA Models": "model",
    "Other & Foundational": "background",
}

ENTRY = re.compile(r"^- \[(?P<title>[^\]]+)\]\((?P<url>[^)]+)\)\.?\s*(?P<rest>.*)$")

entries = []
depth = 0
section = subsection = None

for line in lines:
    if "<details" in line:
        depth += 1
    m = re.search(r"<summary>(.*?)</summary>", line)
    if m:
        label = re.sub(r"<[^>]+>", "", m.group(1))
        label = re.sub(r"\s*\(\d+[^)]*\)\s*$", "", label)
        label = "".join(c for c in label if ord(c) < 128).strip()
        if depth == 1:
            section, subsection = label, None
        elif depth == 2:
            subsection = label
    if "</details>" in line:
        depth -= 1
        if depth <= 1:
            subsection = None
        if depth == 0:
            section = None
        continue

    em = ENTRY.match(line.strip())
    if not em or not section:
        continue

    rest = em.group("rest")
    venue = None
    vm = re.search(r"\*([^*]+)\*", rest)
    if vm:
        venue = re.sub(r"^In\s+", "", vm.group(1)).strip().rstrip(",")
    year = None
    ym = re.search(r"(20\d{2})\s*\.?\s*$", rest)
    if ym:
        year = ym.group(1)

    authors = rest.split(".")[0].strip() if rest else ""
    authors = re.sub(r"\s*\*.*$", "", authors).strip()

    arxiv = re.search(r"arxiv\.org/abs/([\d.]+)", em.group("url"))
    if not arxiv and venue:
        arxiv = re.search(r"arXiv\s+([\d.]+)", venue)
    if venue and re.match(r"arXiv\s+[\d.]+", venue):
        venue = "arXiv"

    entries.append({
        "title": em.group("title").strip(),
        "url": em.group("url").strip(),
        "authors": authors or None,
        "venue": venue,
        "year": year,
        "layer": section if section in LAYERS else None,
        "subsection": subsection,
        "kind": "research" if section in LAYERS else KIND_BY_SECTION.get(section, "background"),
        "arxivId": arxiv.group(1) if arxiv else None,
    })

json.dump(entries, open(DATA / "embodied-papers.json", "w"), ensure_ascii=False, indent=2)

by_kind, by_layer = {}, {}
for e in entries:
    by_kind[e["kind"]] = by_kind.get(e["kind"], 0) + 1
    if e["layer"]:
        by_layer[e["layer"]] = by_layer.get(e["layer"], 0) + 1

print(f"parsed {len(entries)} entries")
print(f"  with arXiv id: {sum(1 for e in entries if e['arxivId'])}")
print(f"  with venue:    {sum(1 for e in entries if e['venue'])}")
print(f"  with authors:  {sum(1 for e in entries if e['authors'])}")
print("\nby kind:")
for k, n in sorted(by_kind.items(), key=lambda x: -x[1]):
    print(f"  {n:4}  {k}")
print("\nresearch by layer:")
for k, n in by_layer.items():
    print(f"  {n:4}  {k}")
