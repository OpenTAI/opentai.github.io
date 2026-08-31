"""Merge the two survey lists into one library, tagged by domain.

Domain is the primary axis the OpenTAI team asked for. Only the explicitly
approved LLMs, Agents and Embodied AI domains are published. Vision, VLP, VLM
and diffusion chapters from the large-model survey remain in the source
snapshot but are outside the approved site scope.

Benchmark entries are pulled out of the paper stream here and handed to
fetch-benchmark-candidates.py, which tries to resolve each to a real
repository so it can be published as a resource rather than a citation.
"""
import json, pathlib, re

from paper_author_metadata import with_verified_authors

DATA = pathlib.Path(__file__).parent / "data"

LMS = json.load(open(DATA / "awesome-papers.json"))
LMS_LINKS = json.loads((DATA / "paper-links.json").read_text()) if (DATA / "paper-links.json").exists() else {}
EMB = json.load(open(DATA / "embodied-papers.json"))
PAPER_METADATA_OVERRIDES = json.load(open(DATA / "paper-metadata-overrides.json"))
PAPER_AUTHOR_METADATA = (
    json.load(open(DATA / "paper-author-metadata.json")).get("records", {})
    if (DATA / "paper-author-metadata.json").exists()
    else {}
)
EXISTING_DATASET_CANDIDATES = {
    re.sub(r"[^a-z0-9]", "", row["title"].lower()): row
    for row in (
        json.load(open(DATA / "dataset-candidates.json"))
        if (DATA / "dataset-candidates.json").exists()
        else []
    )
}
DOMAIN_BY_CHAPTER = {
    "Large Language Model Safety": "LLMs",
    "Agent Safety": "Agents",
}

# The large-model-safety list has no survey section, so surveys are identified
# from the title. Precision matters more than recall here: a paper titled
# "... : A Survey" is one; a paper merely discussing surveys is not.
SURVEY_TITLE = re.compile(
    r"\b(a survey|survey of|survey on|systematic review|literature review|"
    r"a review of|systematization of knowledge|\bsok\b)\b",
    re.I,
)
BENCHMARK_SECTION = "Agent Safety Benchmarks"


def norm(title):
    return re.sub(r"[^a-z0-9]", "", (title or "").lower())


def split_authors(value):
    if isinstance(value, list):
        return value
    return [a.strip() for a in re.split(r",| and ", value or "") if a.strip()]


def normalize_venue(value):
    """Keep publication venues separate from URLs and arXiv identifiers."""
    venue = (value or "").strip()
    if not venue or re.match(r"https?://", venue, re.I):
        return None
    if re.fullmatch(r"arXiv(?:\s+preprint)?(?:\s+arXiv)?[.: ]*\d[\d.]*", venue, re.I):
        return "arXiv"
    return venue


papers, benchmark_candidates, dataset_candidates = [], [], []
search_supplement_candidates = []

for e in LMS:
    domain = DOMAIN_BY_CHAPTER.get(e["chapter"])
    if not domain:
        # The four browsing tabs intentionally cover only the approved LLM,
        # Agent, Embodied AI and Survey scope.  The OpenTAI team separately
        # requested complete author search coverage for Xingjun Ma across the
        # two cited source bibliographies.  Keep those source-backed records
        # searchable without relabelling vision or diffusion papers as LLMs.
        if "Xingjun Ma" in e.get("authors", []):
            search_supplement_candidates.append({
                "title": e["title"],
                "authors": e["authors"],
                "authorCount": len(e["authors"]),
                "venue": normalize_venue(e.get("venue")),
                "year": e.get("year"),
                "arxivId": e.get("arxivId") or LMS_LINKS.get(e["title"]),
                "url": None,
                "domain": e["chapter"],
                "group": e["chapter"],
                "section": e.get("section"),
                "kind": "survey" if SURVEY_TITLE.search(e["title"]) else "research",
                "source": "large-model-safety",
            })
        continue
    entry = {
        "title": e["title"],
        "authors": e["authors"],
        "authorCount": len(e["authors"]),
        "venue": e.get("venue"),
        "year": e.get("year"),
        "arxivId": e.get("arxivId") or LMS_LINKS.get(e["title"]),
        "url": None,
        "domain": domain,
        "group": e["chapter"],
        "section": e.get("section"),
        "kind": "survey" if SURVEY_TITLE.search(e["title"]) else "research",
        "source": "large-model-safety",
    }
    if e.get("section") == BENCHMARK_SECTION:
        benchmark_candidates.append(entry)
    else:
        papers.append(entry)

for e in EMB:
    if e["kind"] == "background":
        continue
    entry = {
        "title": e["title"],
        "authors": split_authors(e["authors"]),
        "authorCount": len(split_authors(e["authors"])),
        "venue": e.get("venue"),
        "year": e.get("year"),
        "arxivId": e.get("arxivId"),
        "url": e.get("url"),
        "domain": "Embodied AI",
        "group": e.get("layer") or "Related work",
        "section": e.get("subsection"),
        "kind": e["kind"] if e["kind"] in {"research", "survey"} else e["kind"],
        "source": "embodied-ai-safety",
    }
    if e["kind"] == "benchmark":
        # The embodied source calls this mixed section "Benchmarks &
        # Datasets". Its two entries are capability datasets/benchmarks, not
        # safety benchmark implementations. The OpenTAI team explicitly asked
        # for the source's dataset material to be moved to Datasets, so retain
        # them as citation-backed dataset candidates instead of guessing repos.
        # Official resource URLs and the classification verdict are manually
        # verified. Preserve those fields when the bibliography is reparsed;
        # otherwise a merge would silently replace them with Scholar links.
        prior = EXISTING_DATASET_CANDIDATES.get(norm(entry["title"]))
        if prior and prior.get("classificationEvidence"):
            for field in ("arxivId", "url", "classificationEvidence"):
                if prior.get(field):
                    entry[field] = prior[field]
        dataset_candidates.append(entry)
    elif e["kind"] == "model":
        continue  # models here are capability models, not safety resources
    else:
        papers.append(entry)

# Dedupe by title. The first list processed (large-model-safety) is the more
# topic-specific one, so its domain wins — a paper must not drift between
# domains just because the other copy happened to carry a link. Metadata is
# merged in from the duplicate regardless, and "survey" is sticky: if either
# list files it as a survey, it is one.
merged = {}
duplicates = 0
for p in papers:
    p["venue"] = normalize_venue(p.get("venue"))
    key = norm(p["title"])
    kept = merged.get(key)
    if kept is None:
        merged[key] = p
        continue

    duplicates += 1
    for field in ("arxivId", "url", "venue", "year"):
        if not kept.get(field) and p.get(field):
            kept[field] = p[field]
    if p["authorCount"] > kept["authorCount"]:
        kept["authors"], kept["authorCount"] = p["authors"], p["authorCount"]
    if p["kind"] == "survey":
        kept["kind"] = "survey"
    kept["alsoIn"] = p["source"]

# Titles that explicitly identify themselves as surveys are surveys regardless
# of where the upstream bibliography files them in its subject taxonomy.
for paper in merged.values():
    if SURVEY_TITLE.search(paper["title"]):
        paper["kind"] = "survey"

# Corrections are separate from the downloaded bibliography snapshots so a
# future reparse cannot silently restore a known upstream metadata error.
for override in PAPER_METADATA_OVERRIDES["records"]:
    if not override.get("source") or not override.get("evidence"):
        raise ValueError(f"paper metadata override needs source evidence: {override.get('title')}")
    paper = merged.get(norm(override.get("title")))
    if paper is None:
        raise ValueError(f"paper metadata override does not match the library: {override.get('title')}")
    for field in ("venue", "year", "url", "arxivId"):
        if field in override:
            paper[field] = override[field]

# Citation lists often abbreviate authors as "Surname et al.". Replace that
# shorthand only with official arXiv metadata whose normalized title matches
# the catalog record; a shared numeric identifier alone is not enough. Apply
# this after source-backed link overrides so newly resolved arXiv records are
# eligible for the same verification path.
for key, paper in list(merged.items()):
    merged[key] = with_verified_authors(paper, PAPER_AUTHOR_METADATA)

library = sorted(
    merged.values(),
    key=lambda p: (p["domain"], p["group"], p["section"] or "", -(int(p["year"] or 0))),
)

# Search-only records are de-duplicated against the approved library and one
# another by the same normalized-title rule used above.  AnyAttack is already
# present through the embodied source and BlueSuffix is already present in the
# Agent tab, so neither appears twice in an author search.
search_supplement = []
search_seen = set(merged)
search_seen_arxiv = {
    paper.get("arxivId") for paper in merged.values() if paper.get("arxivId")
}
for paper in search_supplement_candidates:
    key = norm(paper["title"])
    arxiv_id = paper.get("arxivId")
    if key in search_seen or (arxiv_id and arxiv_id in search_seen_arxiv):
        continue
    search_seen.add(key)
    if arxiv_id:
        search_seen_arxiv.add(arxiv_id)
    search_supplement.append(paper)
search_supplement.sort(
    key=lambda p: (p["domain"], p["section"] or "", -(int(p["year"] or 0)), p["title"]),
)

json.dump(library, open(DATA / "paper-library.json", "w"), ensure_ascii=False, indent=2)
json.dump(search_supplement, open(DATA / "paper-search-supplement.json", "w"),
          ensure_ascii=False, indent=2)
json.dump(benchmark_candidates, open(DATA / "benchmark-candidates.json", "w"),
          ensure_ascii=False, indent=2)
json.dump(dataset_candidates, open(DATA / "dataset-candidates.json", "w"),
          ensure_ascii=False, indent=2)

by_domain, by_kind = {}, {}
for p in library:
    by_domain[p["domain"]] = by_domain.get(p["domain"], 0) + 1
    by_kind[p["kind"]] = by_kind.get(p["kind"], 0) + 1

print(f"merged {len(library)} papers ({duplicates} duplicates collapsed)")
print(f"  with a link: {sum(1 for p in library if p['arxivId'] or p['url'])}"
      f" ({100 * sum(1 for p in library if p['arxivId'] or p['url']) // len(library)}%)")
print("\nby domain:")
for d, n in sorted(by_domain.items(), key=lambda x: -x[1]):
    print(f"  {n:5}  {d}")
print("\nby kind:")
for k, n in sorted(by_kind.items(), key=lambda x: -x[1]):
    print(f"  {n:5}  {k}")
print(f"\nbenchmark candidates pulled out: {len(benchmark_candidates)}")
print(f"dataset candidates pulled out: {len(dataset_candidates)}")
print(f"search-only author records: {len(search_supplement)}")
