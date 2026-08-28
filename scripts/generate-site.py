"""Generate src/data/site.ts, merging OpenTAI content with fetched public metadata."""
import copy
import importlib.util
import json, pathlib, re
from urllib.parse import urlparse

HERE = pathlib.Path(__file__).parent
DATA = HERE / "data"

ECOSYSTEM_CATALOG = json.load(open(DATA / "ecosystem-catalog.json"))
ecosystem_validator_spec = importlib.util.spec_from_file_location(
    "ecosystem_catalog_validator", HERE / "validate-ecosystem-catalog.py"
)
ecosystem_validator = importlib.util.module_from_spec(ecosystem_validator_spec)
assert ecosystem_validator_spec.loader is not None
ecosystem_validator_spec.loader.exec_module(ecosystem_validator)
ecosystem_errors = ecosystem_validator.validate_catalog(ECOSYSTEM_CATALOG)
if ecosystem_errors:
    raise ValueError("Invalid ecosystem catalog:\n" + "\n".join(ecosystem_errors))

HOME = json.load(open(DATA / "home.json"))
LEADERBOARDS = json.load(open(DATA / "leaderboards.json"))
LEADERBOARD_DIRECTORY = json.load(open(DATA / "leaderboard-directory.json"))
ARENA_DIRECTORY = json.load(open(DATA / "arena-directory.json"))
ARENA_RESULTS = json.load(open(DATA / "arena-results.json"))
TEXT_ARENA_OVERVIEW = json.load(open(DATA / "text-arena-overview.json"))
CODE_ARENA_OVERVIEW = json.load(open(DATA / "code-arena-overview.json"))
CURATION = json.load(open(DATA / "benchmark-curation.json"))
LIBRARY = json.load(open(DATA / "paper-library.json"))
DATASET_CANDIDATES = json.load(open(DATA / "dataset-candidates.json"))
LLM_SAFETY_RESOURCES = json.load(open(DATA / "llm-safety-resources.json"))
AGENT_BENCHMARK_RECORDS = json.load(open(DATA / "agent-benchmark-records.json"))
SAFETY_BENCHMARK_AUDIT = json.load(open(DATA / "safety-at-scale-benchmark-audit.json"))
BENCHMARK_RESOLVED = json.load(open(DATA / "benchmark-resolved.json"))
BENCHMARK_DATASETS = json.load(open(DATA / "benchmark-datasets.json"))
SURVEY_DATASET_RECORDS = json.load(open(DATA / "survey-dataset-records.json"))
TRAINING_DATASET_METADATA = json.load(open(DATA / "training-datasets.json"))["items"]
PAPER_DATASET_MENTIONS = json.load(open(DATA / "paper-dataset-mentions.json"))["mentions"]
DATASET_ALIAS_PAYLOAD = json.load(open(DATA / "dataset-alias-overrides.json"))
INTERACTION_TAG_PAYLOAD = json.load(open(DATA / "interaction-tags.json"))

catalog_spec = importlib.util.spec_from_file_location(
    "paper_dataset_catalog", HERE / "build-paper-dataset-catalog.py"
)
catalog_module = importlib.util.module_from_spec(catalog_spec)
assert catalog_spec.loader is not None
catalog_spec.loader.exec_module(catalog_module)
TRAINING_DATASETS = catalog_module.build_catalog(
    TRAINING_DATASET_METADATA,
    PAPER_DATASET_MENTIONS,
    catalog_module.load_aliases(DATASET_ALIAS_PAYLOAD),
    include_metadata_fallbacks=True,
)
IMG = json.load(open(DATA / "img_map.json"))
META = json.load(open(DATA / "metadata.json"))
GH = dict(META["github"])
GH.update(json.load(open(DATA / "metadata_extra.json")))
GH.pop("VLBreakBench", None)  # name mismatch, not confident it is the right repo
GH["Universal Master Key (UMK)"] = GH.pop("UMK")
if "BlackdoorLLM" in GH:
    GH["BackdoorLLM"] = GH.pop("BlackdoorLLM")
AX = META["arxiv"]
HF = META["huggingface"]

OUT = HERE.parent / "src" / "data" / "site.ts"
B = HOME["blocks"]

VENUE_RE = re.compile(
    r"\b(CVPR|ICLR|NeurIPS|NIPS|ICML|ACL|EMNLP|NAACL|AAAI|IJCAI|ICCV|ECCV|ACM MM|MM)\s*'?(\d{2,4})\b",
    re.I,
)
CANON = {"nips": "NeurIPS", "mm": "ACM MM"}


def img(p):
    return IMG.get(p, "")


def clean(s):
    return re.sub(r"\s+", " ", (s or "").strip())


def resource_key(s):
    return re.sub(r"[^a-z0-9]", "", clean(s).lower())


ALLOWED_INTERACTION_TAGS = set(INTERACTION_TAG_PAYLOAD["taxonomy"])
INTERACTION_TAGS_BY_RESOURCE = {}
for record in INTERACTION_TAG_PAYLOAD["records"]:
    tags = record.get("tags") or []
    unknown = set(tags) - ALLOWED_INTERACTION_TAGS
    if unknown:
        raise ValueError(
            f"unknown interaction tags for {record.get('name')}: {sorted(unknown)}"
        )
    if not record.get("source") or not record.get("evidence"):
        raise ValueError(f"interaction tags need source evidence: {record.get('name')}")
    key = resource_key(record.get("name"))
    if key in INTERACTION_TAGS_BY_RESOURCE:
        raise ValueError(f"duplicate interaction-tag record: {record.get('name')}")
    INTERACTION_TAGS_BY_RESOURCE[key] = tags


def apply_catalog_tags(row):
    """Promote verified navigation tags and remove internal provenance labels."""
    interaction_tags = INTERACTION_TAGS_BY_RESOURCE.get(resource_key(row["name"]), [])
    public_tags = [
        tag for tag in row.get("tags", [])
        if not tag.lower().startswith("source:")
    ]
    row["tags"] = list(dict.fromkeys(interaction_tags + public_tags))[:6]


VERIFIED_BENCHMARK_GITHUB = {}
for resolved in BENCHMARK_RESOLVED.values():
    github = resolved.get("github")
    if not github:
        continue
    key = resource_key(resolved.get("name"))
    previous = VERIFIED_BENCHMARK_GITHUB.get(key)
    if previous and previous.get("repo") != github.get("repo"):
        raise ValueError(f"conflicting verified repositories for {resolved.get('name')}")
    VERIFIED_BENCHMARK_GITHUB[key] = github


def verified_benchmark_github(name):
    """Return metadata only from the README-verified benchmark resolution file."""
    return VERIFIED_BENCHMARK_GITHUB.get(resource_key(name))


def venue_from(text):
    if not text:
        return None
    m = VENUE_RE.search(text)
    if not m:
        return None
    name = CANON.get(m.group(1).lower(), m.group(1))
    year = m.group(2)
    if len(year) == 2:
        year = "20" + year
    return f"{name} {year}"


def js_key(k):
    """Quote object keys that are not valid JS identifiers."""
    return k if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", k) else f'"{k}"'


def ts(v, indent=0):
    pad = "  " * indent
    if isinstance(v, str):
        return json.dumps(v, ensure_ascii=False).replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    if isinstance(v, bool):  # must precede int — bool is a subclass of int
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    if v is None:
        return "undefined"
    if isinstance(v, list):
        if not v:
            return "[]"
        return "[\n" + ",\n".join(f"{pad}  {ts(i, indent + 1)}" for i in v) + f",\n{pad}]"
    if isinstance(v, dict):
        body = ",\n".join(
            f"{pad}  {js_key(k)}: {ts(val, indent + 1)}" for k, val in v.items() if val is not None
        )
        return "{\n" + body + f",\n{pad}}}"
    raise TypeError(v)


HOSTS = [
    ("arxiv.org", "arXiv"),
    ("github.com", "GitHub"),
    ("huggingface.co", "Hugging Face"),
    ("opentai.org", "Platform"),
]


# Links verified as dead by scripts/check-links.py — kept out of the build so the
# site never ships a 404. Reported to the OpenTAI team instead.
BROKEN_LINKS = {
    "https://roywang021.github.io/VLBreakBench/": "project page returns 404",
}


def link(url):
    host = urlparse(url).netloc.lower()
    return {"label": next((l for f, l in HOSTS if f in host), "Project page"), "href": url}


def compact_date(d):
    return d[:7] if d else None


def enrich(name, base_link):
    """Return (resources, stats, meta, venue, extra_tags, sortable) for one entry."""
    dead = base_link.rstrip("/") + "/" in BROKEN_LINKS or base_link in BROKEN_LINKS
    resources = [link(base_link)] if base_link and not dead else []
    stats, meta_bits, venue, tags = [], [], None, []
    sortable = {}
    if dead:
        meta_bits.append(f"upstream link unavailable ({BROKEN_LINKS.get(base_link) or BROKEN_LINKS[base_link.rstrip('/') + '/']})")

    g = GH.get(name)
    if g:
        url = f"https://github.com/{g['repo']}"
        if not any(r["href"].rstrip("/") == url for r in resources):
            resources.append({"label": "GitHub", "href": url})
        stats.append({"label": "Stars", "value": f"{g['stars']:,}"})
        sortable["stars"] = g["stars"]
        sortable["updated"] = g.get("pushedAt")
        if g.get("language"):
            stats.append({"label": "Language", "value": g["language"]})
        if g.get("pushedAt"):
            stats.append({"label": "Updated", "value": compact_date(g["pushedAt"])})
        meta_bits.append(g["repo"])
        if g.get("license"):
            meta_bits.append(g["license"])
        if g.get("forks"):
            meta_bits.append(f"{g['forks']} fork" + ("s" if g["forks"] != 1 else ""))
        if g.get("createdAt"):
            meta_bits.append(f"since {g['createdAt'][:4]}")
        if g.get("archived"):
            meta_bits.append("archived")
        venue = venue or venue_from(g.get("description"))
        tags += [t for t in g.get("topics", [])]

    a = AX.get(name)
    if a:
        shown = ", ".join(a["authors"][:3])
        more = a["authorCount"] - 3
        meta_bits.insert(0, f"{shown}{f' +{more} more' if more > 0 else ''}")
        stats.append({"label": "Posted", "value": a["published"]})
        sortable["posted"] = a["published"]
        if a.get("primaryCategory"):
            meta_bits.append(a["primaryCategory"])
        venue = venue or venue_from(a.get("comment"))

    h = HF.get(name)
    if h:
        stats.append({"label": "Downloads", "value": f"{h['downloads']:,}"})
        sortable["downloads"] = h["downloads"]
        sortable["updated"] = sortable.get("updated") or h.get("lastModified")
        stats.append({"label": "Likes", "value": str(h["likes"])})
        if h.get("lastModified"):
            stats.append({"label": "Updated", "value": compact_date(h["lastModified"])})
        meta_bits.append(h["dataset"])
        for t in h.get("tags", []):
            if t.startswith("license:"):
                meta_bits.append(t.split(":", 1)[1].upper())
            elif t.startswith("size_categories:"):
                meta_bits.append(t.split(":", 1)[1] + " samples")

    return resources, stats, (" · ".join(meta_bits) or None), venue, tags, sortable


# ---------------------------------------------------------------- homepage
news = [
    {
        "title": clean(u["titleen"]),
        "tag": clean(u["subtitleen"]).lstrip("#"),
        "body": clean(u["contenten"]),
        "date": clean(u["timeen"]),
        "href": clean(u["href"]),
        "image": img(u["img"]),
    }
    for u in B[0]["updates"]
]


def model_entry(m):
    name = clean(m["datasetsName"])
    a, g = AX.get(name), GH.get(name)
    bits = []
    if a:
        shown = ", ".join(a["authors"][:2])
        more = a["authorCount"] - 2
        bits.append(f"{shown}{f' +{more}' if more > 0 else ''}")
        bits.append(a["published"])
    if g:
        bits.append(f"★ {g['stars']:,}")
    return {
        "name": name,
        "subtitle": clean(m["subTitle"]),
        "description": clean(m["desc"]),
        "href": clean(m["link"]),
        "image": img(m["datasetsBackground"]),
        "venue": (venue_from(a.get("comment")) if a else None)
        or (venue_from(g.get("description")) if g else None),
        "meta": " · ".join(bits) or None,
    }


models = [model_entry(m) for m in B[2]["items"]]
models_gh = {"OmniSVG": "OmniSVG-2M"}  # OmniSVG model shares the OmniSVG-2M repo
for m in models:
    if m["name"] in models_gh and not m["meta"]:
        g = GH[models_gh[m["name"]]]
        m["meta"] = f"★ {g['stars']:,}"
        m["venue"] = m["venue"] or venue_from(g.get("description"))

partners = [{"name": clean(p["name"]), "logo": img(p["img"])} for p in B[7]["items"]]
mission = {"title": clean(B[1]["title"]), "body": clean(B[1]["body"])}

# ---------------------------------------------------------------- paper library
def build_paper_library():
    return [
        {
            "title": e["title"],
            "authors": e["authors"][:4],
            "authorCount": e["authorCount"],
            "venue": e.get("venue"),
            "year": e.get("year"),
            "domain": e["domain"],
            "group": e["group"],
            "section": e.get("section"),
            "kind": e["kind"],
            "arxivId": e.get("arxivId"),
            "url": e.get("url"),
        }
        for e in LIBRARY
    ]


paper_library = build_paper_library()

# These are the three domains explicitly approved by the OpenTAI team.
PAPER_DOMAINS = ["LLMs", "Agents", "Embodied AI"]
paper_domains = [d for d in PAPER_DOMAINS if any(p["domain"] == d for p in paper_library)]

paper_groups = {}
for e in paper_library:
    paper_groups.setdefault(e["domain"], [])
    if e["group"] not in paper_groups[e["domain"]]:
        paper_groups[e["domain"]].append(e["group"])

# ---------------------------------------------------------------- leaderboards
def num(v):
    try:
        return int(v)
    except (TypeError, ValueError):
        return None


def build_ranking_directory(payload):
    return [
        {
            "name": clean(record["name"]),
            "type": clean(record["type"]),
            "focus": clean(record["focus"]),
            "focusZh": clean(record["focusZh"]),
            "metric": clean(record["metric"]),
            "metricZh": clean(record["metricZh"]),
            "snapshotDate": clean(record["snapshotDate"]),
            "results": [
                {
                    key: value
                    for key, value in {
                        "rank": result["rank"],
                        "name": clean(result["name"]),
                        "detail": clean(result.get("detail")),
                        "value": clean(result["value"]),
                    }.items()
                    if value not in (None, "")
                }
                for result in record["results"]
            ],
            "emptyState": clean(record.get("emptyState")) or None,
            "emptyStateZh": clean(record.get("emptyStateZh")) or None,
            "url": clean(record["url"]),
            "source": clean(record["source"]),
            "links": [
                {
                    "label": clean(link["label"]),
                    "labelZh": clean(link.get("labelZh")) or None,
                    "url": clean(link["url"]),
                }
                for link in record.get("links") or []
            ],
            "verificationNote": clean(record["verificationNote"]),
        }
        for record in payload["records"]
    ]


def build_leaderboards():
    block = LEADERBOARDS["blocks"][0]
    tables = []
    for tkey, rkey, labkey in (("table1", "modelsRanking1", "tab1en"),
                               ("table2", "modelsRanking2", "tab2en")):
        t = block[tkey]
        boards = []
        for group in t[rkey]:
            rows = []
            for r in group.get("rankings") or []:
                paper = r.get("paper") or {}
                rows.append({
                    "rank": str(r.get("ranking") or ""),
                    "model": clean(r.get("nameen")),
                    "link": clean(paper.get("link")) or None,
                    "count": num(r.get("download")),
                    "scoreA": clean(r.get("datasetA")) or None,
                    "scoreB": clean(r.get("datasetB")) or None,
                })
            if rows:
                boards.append({"title": clean(group["titleen"]), "rows": rows})
        tables.append({
            "id": clean(t[labkey]).lower().replace(" ", "-"),
            "label": clean(t[labkey]),
            "columns": {
                "model": clean(t["columnName1"]), "link": clean(t["columnName2"]),
                "count": clean(t["columnName3"]), "scoreGroup": clean(t["columnName4"]),
                "scoreA": clean(t["columnName4A"]), "scoreB": clean(t["columnName4B"]),
                "rank": clean(t["columnName5"]),
            },
            "boards": boards,
        })
    return {
        "title": clean(block["titleen"]),
        "subtitle": clean(block["subtitleen"]),
        "directory": build_ranking_directory(LEADERBOARD_DIRECTORY),
        "tables": tables,
    }


leaderboards = build_leaderboards()
arena_directory = build_ranking_directory(ARENA_DIRECTORY)
arena_results = {
    "title": clean(ARENA_RESULTS["title"]),
    "titleZh": clean(ARENA_RESULTS["titleZh"]),
    "snapshotDate": clean(ARENA_RESULTS["snapshotDate"]),
    "source": clean(ARENA_RESULTS["source"]),
    "sourceLabel": clean(ARENA_RESULTS["sourceLabel"]),
    "sourceLabelZh": clean(ARENA_RESULTS["sourceLabelZh"]),
    "note": clean(ARENA_RESULTS["note"]),
    "noteZh": clean(ARENA_RESULTS["noteZh"]),
    "benchmarks": [
        {
            "name": clean(benchmark["name"]),
            "metric": clean(benchmark["metric"]),
            "metricZh": clean(benchmark["metricZh"]),
        }
        for benchmark in ARENA_RESULTS["benchmarks"]
    ],
    "series": [
        {
            "name": clean(series["name"]),
            "nameZh": clean(series["nameZh"]),
            "color": clean(series["color"]),
            "values": series["values"],
        }
        for series in ARENA_RESULTS["series"]
    ],
}
text_arena_overview = {
    "title": clean(TEXT_ARENA_OVERVIEW["title"]),
    "titleZh": clean(TEXT_ARENA_OVERVIEW["titleZh"]),
    "snapshotDate": clean(TEXT_ARENA_OVERVIEW["snapshotDate"]),
    "source": clean(TEXT_ARENA_OVERVIEW["source"]),
    "sourceLabel": clean(TEXT_ARENA_OVERVIEW["sourceLabel"]),
    "sourceLabelZh": clean(TEXT_ARENA_OVERVIEW["sourceLabelZh"]),
    "note": clean(TEXT_ARENA_OVERVIEW["note"]),
    "noteZh": clean(TEXT_ARENA_OVERVIEW["noteZh"]),
    "columns": [
        {
            "key": clean(column["key"]),
            "label": clean(column["label"]),
            "labelZh": clean(column["labelZh"]),
        }
        for column in TEXT_ARENA_OVERVIEW["columns"]
    ],
    "rows": [
        {
            "model": clean(row["model"]),
            "ranks": row["ranks"],
        }
        for row in TEXT_ARENA_OVERVIEW["rows"]
    ],
}

# ---------------------------------------------------------------- taxonomy
RESEARCH_TYPE = {
    "IDEATOR": "Red Teaming",
    "Universal Master Key (UMK)": "Jailbreak Attack",
    "AnyAttack": "Adversarial Attack",
    "BlueSuffix": "Jailbreak Defense",
    "CALM": "Model Auditing",
    "DAO": "Backdoor Detection",
}
BENCH_TYPE = {
    "VisionSafety Bench": "Robustness",
    "RewardModel Bench": "Alignment",
    "VLBreakBench": "Multimodal Safety",
    "HarmBench": "LLM Safety",
    "JailbreakBench": "LLM Safety",
    "SafetyBench": "LLM Safety",
    "AgentDojo": "Agent Safety",
    "MM-SafetyBench": "Multimodal Safety",
}

# Domain is the primary axis the team asked for. Property is secondary and is
# only set when the benchmark's own name or description states it — the source
# list files all 24 new entries under one heading and carries no property
# information, so guessing would invent a taxonomy the data does not support.
BENCH_DOMAIN = {
    "HarmBench": "LLMs", "JailbreakBench": "LLMs", "SafetyBench": "LLMs",
    "RewardModel Bench": "LLMs", "h4rm3l": "LLMs", "AgentDojo": "Agents",
    "MM-SafetyBench": "Vision & Multimodal", "VLBreakBench": "Vision & Multimodal",
    "VisionSafety Bench": "Vision & Multimodal",
}

PROPERTY_RULES = [
    ("Prompt Injection", r"prompt injection|indirect prompt"),
    ("Jailbreak", r"jailbreak|refusal|red[- ]?team"),
    ("Harmful Content", r"harmful|harm\b|toxic|malicious|illegal"),
    ("Privacy", r"privacy|leakage|personal data"),
    ("Robustness", r"robust|adversarial|perturbation"),
    ("Alignment", r"alignment|reward model|preference"),
    ("Cybersecurity", r"cyber|exploit|vulnerabilit|code execution"),
    ("Fairness", r"fairness|bias\b|disparate"),
    ("Explainability", r"explainab|interpretab|faithfulness"),
    ("AI Ethics", r"ethic|moral|value alignment"),
]


def safety_property(*texts):
    blob = " ".join(t for t in texts if t).lower()
    for label, pattern in PROPERTY_RULES:
        if re.search(pattern, blob):
            return label
    return None


BENCH_TAXONOMY = [
    ("LLM Safety", "Harmful-behaviour, jailbreak, and safety-knowledge evaluation for language models.", "pink"),
    ("Agent Safety", "Prompt injection, tool misuse, and environment safety for LLM agents.", "orange"),
    ("Multimodal Safety", "Jailbreak and safety evaluation for vision-language models.", "violet"),
    ("Robustness", "Adversarial and distribution-shift robustness for vision models.", "blue"),
    ("Privacy", "Memorisation, extraction, and privacy-leakage evaluation.", "green"),
    ("Fairness", "Bias and disparate-impact evaluation across groups.", "violet"),
    ("Explainability", "Faithfulness and interpretability of model explanations.", "blue"),
    ("Alignment", "Reward models, preference data quality, and alignment evaluation.", "green"),
    ("AI Ethics", "Value alignment, moral reasoning, and policy compliance.", "orange"),
    ("Cybersecurity", "Offensive and defensive security capability evaluation.", "pink"),
]


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
# The current OpenTAI site misspells this toolkit; the repository is
# bboylyg/BackdoorLLM. Confirmed with the team on 2026-08-11 to use the
# repository's actual name.
NAME_CORRECTIONS = {"BlackdoorLLM": "BackdoorLLM"}

TOOL_TYPE = {
    "BackdoorLLM": "Backdoor",
    "taiadv.vision": "Adversarial",
    "TextFlint": "Robustness Evaluation",
}
TOOL_TAGS = {
    "BackdoorLLM": ["backdoor", "LLM"],
    "taiadv.vision": ["adversarial", "vision"],
    "TextFlint": ["NLP", "robustness"],
}


def build_row(name, subtitle, note, rtype, base_link, base_tags, image=None):
    resources, stats, meta, venue, gh_tags, sortable = enrich(name, base_link)
    tags = list(dict.fromkeys([t.lower() for t in base_tags + gh_tags]))[:6]
    year_match = re.search(r"\b(?:19|20)\d{2}\b", venue or "")
    year = year_match.group(0) if year_match else (sortable.get("posted") or "")[:4] or None
    return {
        "name": name,
        "subtitle": subtitle or None,
        "note": note,
        "type": rtype,
        "venue": venue,
        "year": year,
        "downloads": sortable.get("downloads"),
        "stars": sortable.get("stars"),
        "updated": sortable.get("updated"),
        "posted": sortable.get("posted"),
        "tags": tags,
        "stats": stats,
        "meta": meta,
        "resources": resources,
        "image": image or None,
    }


paper_rows = []
for p in B[3]["items"]:
    full = clean(p["projectName"])
    short = full.split(":")[0]
    sub = full.split(":", 1)[1].strip() if ":" in full else ""
    paper_rows.append(
        build_row(short, sub, clean(p["projectDescription"]), RESEARCH_TYPE[short],
                  clean(p["link"]), [RESEARCH_TYPE[short].lower()])
    )

# Dataset means training data in this catalog. Public benchmark questions,
# test cases and evaluation environments remain in Benchmarks even when their
# repositories call the files a dataset. The audited inclusion decisions and
# their primary-source evidence live in training-datasets.json.
dataset_rows = []
LLM_SURVEY_URL = "https://arxiv.org/abs/2502.05206"


def add_llm_source_evidence(row, rec):
    recorded_scale = next(
        (
            stat
            for stat in row.get("stats", [])
            if stat["label"] in {"Recorded scale", "Recorded size"}
        ),
        {"label": "Recorded size", "value": rec["size"]},
    )
    row["note"] = (
        f"Listed in Safety at Scale Table 6 under {rec['section']}. "
        f"{rec['classificationEvidence']}"
    )
    row["venue"] = rec.get("venue")
    row["stats"] = [
        {"label": "Table year", "value": rec["year"]},
        recorded_scale,
    ]
    if rec.get("times"):
        row["stats"].append({"label": "Table #Times", "value": rec["times"]})
    if not any(resource["href"] == LLM_SURVEY_URL for resource in row["resources"]):
        row["resources"].append({"label": "Source survey", "href": LLM_SURVEY_URL})


AGENT_SURVEY_URL = "https://arxiv.org/abs/2502.05206"
for rec in TRAINING_DATASETS:
    row = build_row(
        rec["name"],
        None,
        rec["trainingEvidence"],
        rec["domain"],
        rec["dataUrl"],
        ["training data", "source: approved survey"],
    )
    row["year"] = rec.get("year")
    row["venue"] = rec.get("venue")
    row["primaryUrl"] = rec["dataUrl"]
    if rec.get("size"):
        row["stats"] = [
            {"label": "Recorded size", "value": rec["size"]}
        ] + row["stats"]
    row["domains"] = rec.get("domains") or [rec["domain"]]
    row["usageCount"] = rec.get("usageCount")
    row["sourcePapers"] = rec.get("sourcePapers") or []
    for label, field in (
        ("Paper", "paperUrl"),
        ("GitHub", "githubUrl"),
        ("Hugging Face", "huggingFaceUrl"),
        ("Source survey", "sourceUrl"),
    ):
        href = rec.get(field)
        if href and not any(resource["href"] == href for resource in row["resources"]):
            row["resources"].append({"label": label, "href": href})
    dataset_rows.append(row)

# Benchmark scope was reset with the Dataset collection. Do not seed from the
# legacy OpenTAI home page. Safety at Scale Table 14 is the authoritative Agent
# list; its exact labels, scale and focus are recorded in
# agent-benchmark-records.json. Three labels in the table resolve to the same
# arXiv paper and are deliberately represented by one evidence-bearing card.
bench_rows = []
for rec in AGENT_BENCHMARK_RECORDS:
    paper_url = f"https://arxiv.org/abs/{rec['arxivId']}"
    if rec.get("sourceEvidence"):
        note = rec["sourceEvidence"]
    else:
        note = (
            f"Safety at Scale Table 14 lists this resource under {rec['section']}. "
            f"Evaluation focus: {rec['focus']}."
        )
    if rec.get("note"):
        note += " " + rec["note"]
    row = build_row(
        rec["name"], None, note, rec.get("domain", "Agents"), paper_url,
        [rec.get("sourceTag", "source: safety-at-scale"), rec["section"].lower()]
        + [alias.lower() for alias in rec.get("aliases", [])],
    )
    row["year"] = rec["year"]
    row["stats"] = [
        {"label": "Table year", "value": rec["year"]},
        {"label": "Recorded scale", "value": rec["size"]},
    ]
    row["resources"].append({
        "label": rec.get("sourceLabel", "Source survey"),
        "href": rec.get("sourceUrl", AGENT_SURVEY_URL),
    })
    row["citationOnly"] = True
    bench_rows.append(row)

existing = {clean(r["name"]).lower() for r in bench_rows}

# The Embodied AI survey has a dedicated Benchmarks subsection. Keep every
# named entry from that subsection, including the continuation on the next PDF
# page. Only verified paper, repository and survey links from the source JSON
# are exposed; a missing project link stays missing.
for rec in SURVEY_DATASET_RECORDS:
    if rec["domain"] != "Embodied AI":
        continue
    key = rec.get("slug") or clean(rec["name"]).lower()
    if key in existing:
        continue
    existing.add(key)
    row = build_row(
        rec["name"], None, rec["sourceEvidence"], "Embodied AI",
        rec.get("dataUrl") or rec.get("paperUrl") or "",
        ["source: embodied-ai-safety"],
    )
    row["year"] = rec["year"]
    row["stats"] = [{"label": "Recorded scale", "value": rec["size"]}]
    if rec.get("paperUrl") and not any(
        resource["href"] == rec["paperUrl"] for resource in row["resources"]
    ):
        row["resources"].append({"label": "arXiv", "href": rec["paperUrl"]})
    row["resources"].append({"label": "Source survey", "href": rec["sourceUrl"]})
    row["citationOnly"] = not bool(rec.get("dataUrl"))
    row["sourceSlug"] = rec.get("slug")
    bench_rows.append(row)

# HASARD is named in the same dedicated subsection and has a separately
# verified official environment release.
for rec in BENCHMARK_DATASETS:
    key = clean(rec["name"]).lower()
    if key in existing:
        continue
    existing.add(key)
    row = build_row(
        rec["name"], None, rec["description"], rec["domain"], rec["url"],
        ["source: embodied-ai-safety"],
    )
    row["year"] = rec["year"]
    row["stats"] = [{"label": "Recorded scale", "value": rec["size"]}]
    paper_url = f"https://arxiv.org/abs/{rec['arxivId']}"
    if not any(resource["href"] == paper_url for resource in row["resources"]):
        row["resources"].append({"label": "arXiv", "href": paper_url})
    row["resources"].append(
        {"label": "Source survey", "href": "https://arxiv.org/abs/2605.02900"}
    )
    bench_rows.append(row)

# The two entries in the embodied list's mixed section are explicitly benchmark
# datasets in their primary sources, so they belong in both site collections.
for cand in DATASET_CANDIDATES:
    if cand.get("kind") != "benchmark":
        continue
    name = clean(cand["title"])
    if name.lower() in existing:
        continue
    existing.add(name.lower())
    row = build_row(
        name,
        None,
        "Listed in the source survey's Benchmarks & Datasets section. "
        + cand["classificationEvidence"],
        cand["domain"],
        cand.get("url") or "",
        ["source: embodied-ai-safety"],
    )
    row["venue"] = f"{cand['venue']} {cand['year']}"
    row["year"] = cand["year"]
    row["stats"] = [{"label": "Published", "value": cand["year"]}]
    if cand.get("arxivId"):
        row["resources"].append(
            {"label": "arXiv", "href": f"https://arxiv.org/abs/{cand['arxivId']}"}
        )
    row["citationOnly"] = True
    bench_rows.append(row)

# Add the benchmark half of Safety at Scale Table 6. Existing rows are enriched
# in place so SafetyBench and SALAD-Bench are not duplicated. The latter is
# moved from the broad agent-list heading to LLMs because its own title and
# primary paper explicitly define it as an LLM benchmark.
bench_by_name = {clean(row["name"]).lower(): row for row in bench_rows}
for rec in LLM_SAFETY_RESOURCES:
    if rec["target"] != "benchmarks":
        continue
    key = clean(rec["name"]).lower()
    row = bench_by_name.get(key)
    if row is None:
        row = build_row(
            rec["name"],
            None,
            "",
            "LLMs",
            f"https://arxiv.org/abs/{rec['arxivId']}",
            ["source: safety-at-scale", rec["section"].lower()],
        )
        row["citationOnly"] = True
        bench_rows.append(row)
        bench_by_name[key] = row
    else:
        paper_url = f"https://arxiv.org/abs/{rec['arxivId']}"
        if not any(resource["href"] == paper_url for resource in row["resources"]):
            row["resources"].insert(0, {"label": "arXiv", "href": paper_url})
    row["name"] = rec["name"]
    row["type"] = "LLMs"
    row["year"] = rec["year"]
    add_llm_source_evidence(row, rec)

# Chapter-wide LaTeX auditing finds many dataset names that are merely used by
# a method paper. Publish only the small reviewed subset whose primary source
# and official repository explicitly identify it as a safety benchmark. The
# exclusions and their reasons live beside these records in the audit JSON.
for rec in SAFETY_BENCHMARK_AUDIT["approved"]:
    key = clean(rec["name"]).lower()
    if key in bench_by_name:
        continue
    row = build_row(
        rec["name"],
        None,
        rec["sourceEvidence"],
        rec["domain"],
        rec["githubUrl"],
        rec["tags"],
    )
    row["year"] = rec["year"]
    row["venue"] = rec["venue"]
    row["stats"] = [{"label": "Recorded scale", "value": rec["size"]}]
    paper_url = f"https://arxiv.org/abs/{rec['arxivId']}"
    if not any(resource["href"] == paper_url for resource in row["resources"]):
        row["resources"].append({"label": "arXiv", "href": paper_url})
    if rec.get("huggingFaceUrl") and not any(
        resource["href"] == rec["huggingFaceUrl"] for resource in row["resources"]
    ):
        row["resources"].append(
            {"label": "Hugging Face", "href": rec["huggingFaceUrl"]}
        )
    row["resources"].append(
        {"label": "Source survey", "href": SAFETY_BENCHMARK_AUDIT["source"]["url"]}
    )
    bench_rows.append(row)
    bench_by_name[key] = row

# Dataset records often expose a verified code repository or Hugging Face
# release that the matching benchmark row did not originally carry. Reuse
# those exact, already-verified links for the benchmark cards; never search by
# name here or manufacture a repository URL.
dataset_row_by_name = {clean(row["name"]).lower(): row for row in dataset_rows}
for row in bench_rows:
    dataset_row = dataset_row_by_name.get(clean(row["name"]).lower())
    if not dataset_row:
        continue
    for resource in dataset_row["resources"]:
        if resource["label"] not in {"GitHub", "Hugging Face"}:
            continue
        if not any(existing["href"] == resource["href"] for existing in row["resources"]):
            row["resources"].append(resource)
    row["downloads"] = row.get("downloads") or dataset_row.get("downloads")
    row["stars"] = row.get("stars") or dataset_row.get("stars")

# benchmark-resolved.json contains the hand/README-verified repository verdicts
# for the survey's benchmark citations. Exact punctuation-insensitive canonical
# names may reuse those stored API stars and repository URLs; unresolved rows
# deliberately remain blank rather than falling back to GitHub name search.
for row in bench_rows:
    github = verified_benchmark_github(row["name"])
    if not github:
        continue
    github_url = f"https://github.com/{github['repo']}"
    if not any(resource["href"].rstrip("/") == github_url for resource in row["resources"]):
        row["resources"].append({"label": "GitHub", "href": github_url})
    if isinstance(github.get("stars"), int):
        row["stars"] = github["stars"]

for row in bench_rows:
    row["slug"] = row.pop("sourceSlug", None) or slugify(row["name"])
    row["domain"] = BENCH_DOMAIN.get(row["name"], row["type"])
    # Domain is what the page filters on now; the old safety label becomes a tag.
    prop = safety_property(row["name"], row["note"], " ".join(row["tags"]))
    row["type"] = row["domain"]
    row["property"] = prop
    if prop:
        row["tags"] = list(dict.fromkeys([prop.lower()] + list(row["tags"])))[:6]

for row in dataset_rows:
    row["domain"] = row["type"]
    row["type"] = row["domain"]

for row in bench_rows + dataset_rows:
    apply_catalog_tags(row)

tool_rows = []
for t in B[6]["items"]:
    name = NAME_CORRECTIONS.get(clean(t["name"]), clean(t["name"]))
    tool_rows.append(
        build_row(name, None, clean(t["description"]), TOOL_TYPE[name],
                  clean(t["link"]), TOOL_TAGS[name], img(t["img"]))
    )

MODEL_TYPE = {
    "DAVID XR1": "Detection",
    "SafeVid": "Safety Alignment",
    "OmniSVG": "Generative",
    "SAMA": "Video Understanding",
}
MODEL_GH = {"OmniSVG": "OmniSVG-2M"}

model_rows = []
for m in B[2]["items"]:
    name = clean(m["datasetsName"])
    key = MODEL_GH.get(name, name)
    if key != name:
        GH[name] = GH[key]
    model_rows.append(
        build_row(name, clean(m["subTitle"]), clean(m["desc"]), MODEL_TYPE[name],
                  clean(m["link"]), [MODEL_TYPE[name].lower()], img(m["datasetsBackground"]))
    )

def bench_description(row, paper):
    """Prefer a real summary over a description that merely repeats the title."""
    note = row["note"]
    title = (paper or {}).get("title") or ""
    abstract = (paper or {}).get("abstract") or ""
    if note and title and norm_text(note) == norm_text(title) and abstract:
        first = re.split(r"(?<=[.!?])\s+", abstract)
        summary = " ".join(first[:2]).strip()
        return summary or note
    return note


def norm_text(t):
    return re.sub(r"[^a-z0-9]", "", (t or "").lower())


def build_bench_details():
    details = {}
    for row in bench_rows:
        name = row["name"]
        g, a = verified_benchmark_github(name) or GH.get(name), AX.get(name)
        resource_arxiv = next(
            (
                resource["href"].removeprefix("https://arxiv.org/abs/")
                for resource in row["resources"]
                if resource["href"].startswith("https://arxiv.org/abs/")
            ),
            None,
        )
        pending = []
        details[row["slug"]] = {
            "slug": row["slug"],
            "name": name,
            "category": row["type"],
            "subtitle": row.get("subtitle"),
            "description": bench_description(row, a),
            "abstract": (a or {}).get("abstract"),
            "venue": row.get("venue"),
            "resources": row["resources"],
            "stats": row["stats"],
            "tags": row["tags"],
            "authors": (a or {}).get("authors", [])[:6] or None,
            "authorCount": (a or {}).get("authorCount"),
            "posted": (a or {}).get("published"),
            "arxivId": (a or {}).get("arxivId") or resource_arxiv,
            "repo": (g or {}).get("repo"),
            "license": (g or {}).get("license"),
            "language": (g or {}).get("language"),
            "stars": (g or {}).get("stars"),
            "forks": (g or {}).get("forks"),
            "updated": (g or {}).get("pushedAt"),
            "homepage": (g or {}).get("homepage"),
            "pending": pending,
        }

        cur = CURATION.get(row["slug"], {})
        detail = details[row["slug"]]
        detail["dataset"] = cur.get("dataset")
        detail["metrics"] = cur.get("metrics")
        detail["baselines"] = cur.get("baselines")
        detail["externalLeaderboard"] = cur.get("leaderboard")
        detail["note"] = cur.get("note")
        # Only list what is genuinely still missing after curation.
        cur = CURATION.get(row["slug"], {})
        for field, key in (("Dataset", "dataset"), ("Metrics", "metrics"),
                           ("Baselines", "baselines"), ("Leaderboard", "leaderboard")):
            if not cur.get(key):
                pending.append(field)
    return details


benchmark_details = build_bench_details()

CATEGORIES = {
    "papers": [
        ("Attack & Red Teaming", "Probing frontier models for exploitable failure modes.", "pink",
         ["Red Teaming", "Jailbreak Attack", "Adversarial Attack"]),
        ("Defense", "Hardening multimodal models against jailbreak prompts.", "green",
         ["Jailbreak Defense"]),
        ("Auditing", "Systematic auditing of large language model behaviour.", "blue",
         ["Model Auditing"]),
        ("Detection", "Finding poisoned or backdoored samples in training data.", "violet",
         ["Backdoor Detection"]),
    ],
    "datasets": [
        ("LLMs", "Datasets explicitly associated with large-language-model safety.", "pink",
         ["LLMs"]),
        ("Agents", "Datasets explicitly associated with agent safety.", "orange",
         ["Agents"]),
        ("Embodied AI", "Datasets for embodied perception, planning and interaction.", "green",
         ["Embodied AI"]),
    ],
    "benchmarks": [
        ("LLMs", "Safety, jailbreak and alignment evaluation for language models.", "pink",
         ["LLMs"]),
        ("Agents", "Prompt injection, tool misuse and environment safety for LLM agents.", "orange",
         ["Agents"]),
        ("Embodied AI", "Safety evaluation for perception, planning and robot control.", "green",
         ["Embodied AI"]),
    ],
    "models": [
        ("Guard Models", "Input/output classifiers that screen unsafe content.", "pink",
         ["Guard Model"]),
        ("Safety Alignment", "Models trained on safety preference data.", "green",
         ["Safety Alignment"]),
        ("Agents", "Agentic systems released with safety tooling.", "orange", ["Agent"]),
        ("Detection", "Models that detect AI-generated or manipulated media.", "blue",
         ["Detection"]),
        ("Generative", "Open generative models released with the platform.", "violet",
         ["Generative"]),
        ("Video Understanding", "Grounded and multi-turn video understanding models.", "orange",
         ["Video Understanding"]),
    ],
}


def cats(key):
    return [
        {"title": t, "detail": d, "accent": a, "filters": f}
        for t, d, a, f in CATEGORIES[key]
    ]


CONFIGS = {
    "benchmarks": {
        "slug": "benchmarks", "breadcrumb": ["Home", "Resources", "Benchmarks"], "title": "Benchmarks",
        "heroIcon": "◎",
        "description": "Open-source safety benchmarks for evaluating LLMs, Agents, and Embodied AI.",
        "overview": "Legacy OpenTAI benchmark rows are excluded. Names, years, recorded scale, "
                    "papers, and release links are shown only when the approved sources support them.",
        "tableTitle": "Benchmark platforms", "sectionTitle": "Benchmark categories",
        "categories": cats("benchmarks"), "tableRows": bench_rows,
    },
    "models": {
        "slug": "models", "breadcrumb": ["Home", "Resources", "Models"], "title": "Models",
        "heroIcon": "◆",
        "description": "Open-source trustworthy AI models — guard models, safety-aligned models, "
                       "detectors, and agents.",
        "overview": "Author lists and posting dates come from the arXiv API; repository activity "
                    "from the GitHub API.",
        "tableTitle": "Open models", "sectionTitle": "Model categories",
        "categories": cats("models"), "tableRows": model_rows,
    },
    "datasets": {
        "slug": "datasets", "breadcrumb": ["Home", "Resources", "Datasets"], "title": "Datasets",
        "heroIcon": "◱",
        "description": "Open-source safety datasets for training safer LLMs, Agents, and "
                       "Embodied AI models.",
        "overview": "An entry appears here only when its paper or official repository explicitly "
                    "supports training, fine-tuning, alignment, or classifier training. Public "
                    "test data stays in Benchmarks.",
        "tableTitle": "Dataset collection", "sectionTitle": "Dataset categories",
        "categories": cats("datasets"), "tableRows": dataset_rows,
    },
}

HOME_CARDS = [
    {"title": "Papers", "description": "Trustworthy AI research across LLMs, Agents, and Embodied AI.",
     "href": "/papers", "accent": "pink", "icon": "○"},
    {"title": "Benchmarks", "description": "Evaluation benchmarks, tasks, and metrics.",
     "href": "/benchmarks", "accent": "violet", "icon": "◎"},
    {"title": "Models", "description": "Guard models, safety-aligned models, detectors, agents.",
     "href": "/models", "accent": "blue", "icon": "◆"},
    {"title": "Datasets", "description": "Verified data for training, fine-tuning, and safety alignment.",
     "href": "/datasets", "accent": "green", "icon": "◱"},
    {"title": "Leaderboards", "description": "Source-backed trustworthiness and safety rankings.",
     "href": "/leaderboard", "accent": "blue", "icon": "L"},
    {"title": "Arenas", "description": "Open arenas for testing model and agent safety.",
     "href": "/arenas", "accent": "orange", "icon": "A"},
    {"title": "Startups", "description": "Source-backed startups building trustworthy AI products.",
     "href": "/companies", "accent": "pink", "icon": "S"},
    {"title": "Community", "description": "Researchers, builders, and institutions contributing to OpenTAI.",
     "href": "/community", "accent": "violet", "icon": "C"},
]

HEADER = '''// Content derived from the OpenTAI TinaCMS site
// (github.com/OpenTAI/opentai.github.io -> content/pages/home.md):
// entry names, descriptions, links, tags, and images.
//
// Stars / language / last-push / license / forks come from the GitHub REST API,
// author lists and posting dates from the arXiv API, and download counts from
// the Hugging Face API. Re-run scripts/fetch-metadata to refresh them.
//
// Category groupings and page copy are authored for this rebuild.

export type ResourceLink = { label: string; href: string };
export type Pill = { label: string; href: string };
export type RowStat = { label: string; value: string };
export type DatasetEvidenceSource = string | {
  type?: string | null;
  url?: string | null;
  path?: string | null;
};
export type DatasetSourcePaper = {
  arxivId?: string | null;
  openAlexId?: string | null;
  title?: string | null;
  domain?: string | null;
  evidence?: string | null;
  source?: DatasetEvidenceSource | null;
};

export type NewsItem = {
  title: string;
  tag: string;
  body: string;
  date: string;
  href: string;
  image: string;
};

export type ModelCard = {
  name: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  venue?: string;
  meta?: string;
};

export type Partner = { name: string; logo: string };

export type SubpageCategoryCard = {
  title: string;
  detail: string;
  accent: string;
  filters?: readonly string[];
};

export type SubpageTableRow = {
  name: string;
  slug?: string;
  domain?: string;
  domains?: readonly string[];
  usageCount?: number;
  sourcePapers?: readonly DatasetSourcePaper[];
  primaryUrl?: string;
  property?: string;
  citationOnly?: boolean;
  subtitle?: string;
  note: string;
  type: string;
  venue?: string;
  year?: string;
  downloads?: number;
  stars?: number;
  updated?: string;
  posted?: string;
  tags?: readonly string[];
  stats?: readonly RowStat[];
  meta?: string;
  resources: readonly ResourceLink[];
  image?: string;
};

export type SubpageConfig = {
  slug: string;
  breadcrumb: readonly string[];
  title: string;
  heroIcon: string;
  description: string;
  overview: string;
  tableTitle: string;
  sectionTitle: string;
  categories: readonly SubpageCategoryCard[];
  tableRows: readonly SubpageTableRow[];
};

export type CuratedText = { text: string; source: string };
export type CuratedList = { items: readonly string[]; source: string };

export type BenchmarkDetail = {
  slug: string;
  name: string;
  category: string;
  subtitle?: string;
  description: string;
  abstract?: string;
  venue?: string;
  resources: readonly ResourceLink[];
  stats: readonly RowStat[];
  tags: readonly string[];
  authors?: readonly string[];
  authorCount?: number;
  posted?: string;
  arxivId?: string;
  repo?: string;
  license?: string;
  language?: string;
  stars?: number;
  forks?: number;
  updated?: string;
  homepage?: string;
  dataset?: CuratedText;
  metrics?: CuratedList;
  baselines?: CuratedText;
  externalLeaderboard?: { url: string; label: string; source: string };
  note?: string;
  pending: readonly string[];
};

export type LeaderboardRow = {
  rank: string;
  model: string;
  link?: string;
  count?: number;
  scoreA?: string;
  scoreB?: string;
};

export type LeaderboardBoard = {
  title: string;
  rows: readonly LeaderboardRow[];
};

export type LeaderboardTable = {
  id: string;
  label: string;
  columns: {
    model: string;
    link: string;
    count: string;
    scoreGroup: string;
    scoreA: string;
    scoreB: string;
    rank: string;
  };
  boards: readonly LeaderboardBoard[];
};

export type RankingResult = {
  rank: number;
  name: string;
  detail?: string;
  value: string;
};

export type RankingLink = {
  label: string;
  labelZh?: string;
  url: string;
};

export type RankingDirectoryRecord = {
  name: string;
  type: string;
  focus: string;
  focusZh: string;
  metric: string;
  metricZh: string;
  snapshotDate: string;
  results: readonly RankingResult[];
  emptyState?: string;
  emptyStateZh?: string;
  url: string;
  source: string;
  links: readonly RankingLink[];
  verificationNote: string;
};

export type ArenaResultSnapshot = {
  title: string;
  titleZh: string;
  snapshotDate: string;
  source: string;
  sourceLabel: string;
  sourceLabelZh: string;
  note: string;
  noteZh: string;
  benchmarks: readonly {
    name: string;
    metric: string;
    metricZh: string;
  }[];
  series: readonly {
    name: string;
    nameZh: string;
    color: string;
    values: readonly (number | null | undefined)[];
  }[];
};

export type TextArenaOverview = {
  title: string;
  titleZh: string;
  snapshotDate: string;
  source: string;
  sourceLabel: string;
  sourceLabelZh: string;
  note: string;
  noteZh: string;
  columns: readonly {
    key: string;
    label: string;
    labelZh: string;
  }[];
  rows: readonly {
    model: string;
    ranks: readonly (number | null | undefined)[];
  }[];
};

export type CodeArenaOverview = {
  schemaVersion: number;
  title: string;
  titleZh: string;
  category: string;
  categoryZh: string;
  description: string;
  descriptionZh: string;
  snapshotDate: string;
  source: string;
  sourceLabel: string;
  sourceLabelZh: string;
  priceNote: string;
  priceNoteZh: string;
  note: string;
  noteZh: string;
  models: readonly {
    rank: number;
    name: string;
    lab: string;
    score: number;
    inputPrice: number;
    outputPrice: number;
    preliminary?: boolean;
  }[];
};

export type HomeCategoryCard = {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: string;
};

export const newsletter = {
  // The static site opens the visitor's email app and stores no subscriber data.
  recipientEmail: "danxjma@gmail.com",
};

export const siteBrand = {
  name: "OpenTAI",
  tagline: "The Open Hub for Trustworthy AI",
  headline: "An open ecosystem connecting trustworthy AI research, innovation, and startups.",
  contactEmail: "danxjma@gmail.com",
  upstream: "https://opentai.org",
};

'''


def block(name, typ, v):
    return f"export const {name}: {typ} = {ts(v)};\n\n"


parts = [HEADER]
parts.append(block("navItems", "Pill[]", [
    {"label": "Home", "href": "/"},
    {"label": "Papers", "href": "/papers"},
    {"label": "Benchmarks", "href": "/benchmarks"},
    {"label": "Models", "href": "/models"},
    {"label": "Datasets", "href": "/datasets"},
    {"label": "Leaderboard", "href": "/leaderboard"},
    {"label": "Community", "href": "/community"},
]))
parts.append(block("mission", "{ title: string; body: string }", mission))
parts.append(
    "// Retained but not rendered: the News section was dropped from Discover on\n"
    "// 2026-08-11 at the OpenTAI team's request — 'Latest releases' already covers\n"
    "// new papers and model releases. Re-add <DiscoverNews /> to bring it back.\n"
    + block("newsItems", "NewsItem[]", news)
)
parts.append(block("largeModels", "ModelCard[]", models))
parts.append(block("partners", "Partner[]", partners))
parts.append(block("homeCategoryCards", "HomeCategoryCard[]", HOME_CARDS))
parts.append(block("benchmarkDetails", "Record<string, BenchmarkDetail>", benchmark_details))
parts.append(block("leaderboards",
                   "{ title: string; subtitle: string; directory: RankingDirectoryRecord[]; tables: LeaderboardTable[] }",
                   leaderboards))
parts.append(block("arenaDirectory", "RankingDirectoryRecord[]", arena_directory))
parts.append(block("arenaResults", "ArenaResultSnapshot", arena_results))
parts.append(block("textArenaOverview", "TextArenaOverview", text_arena_overview))
parts.append(block("codeArenaOverview", "CodeArenaOverview", CODE_ARENA_OVERVIEW))
dataset_summary_config = copy.deepcopy(CONFIGS["datasets"])
dataset_summary_config["tableRows"] = [
    {
        key: value
        for key, value in {
            "name": row["name"],
            "note": (
                row["note"]
                if len(row["note"]) <= 240
                else row["note"][:237].rstrip() + "…"
            ),
            "type": row["type"],
            "venue": row.get("venue"),
            "year": row.get("year"),
            "downloads": row.get("downloads"),
            "stars": row.get("stars"),
            "updated": row.get("updated"),
            "posted": row.get("posted"),
            "tags": row.get("tags"),
            "resources": [],
            "primaryUrl": row.get("primaryUrl"),
            "domains": row.get("domains"),
            "domain": row.get("domain"),
        }.items()
        if value is not None
    }
    for row in CONFIGS["datasets"]["tableRows"]
]
site_configs = {
    key: dataset_summary_config if key == "datasets" else value
    for key, value in CONFIGS.items()
}
parts.append("export const subpageConfigs: Record<string, SubpageConfig> = " + ts(site_configs) + ";\n\n")
# Papers is no longer a curated collection — it is the merged research library,
# which lives in its own module and is counted separately on Discover.
parts.append('export const collectionOrder = [\n  "benchmarks",\n  "models",\n  "datasets",\n] as const;\n')

OUT.write_text("".join(parts))

# Ecosystem records are a separate, hand-reviewed catalog. Keep them outside
# site.ts so the home page and unrelated resource routes do not ship the data.
ECOSYSTEM_OUT = OUT.parent / "ecosystem.ts"
ECOSYSTEM_HEADER = """// Generated ecosystem catalog. Edit scripts/data/ecosystem-catalog.json and regenerate.

export type EcosystemLink = {
  label: string;
  url: string;
};

export type EcosystemRecord = {
  id: string;
  name: string;
  category: string;
  description: string;
  descriptionZh: string;
  year?: number;
  founded?: number;
  publisher?: string;
  country?: string;
  countryZh?: string;
  valuation?: string;
  valuationZh?: string;
  affiliation?: string;
  direction?: string;
  directionZh?: string;
  academicOrigin?: string;
  academicOriginZh?: string;
  status?: string;
  statusZh?: string;
  license?: string;
  stars?: number;
  github?: string;
  starsUpdated?: string;
  logo?: string;
  logoSource?: string;
  publicResults?: boolean;
  links: EcosystemLink[];
  sources: string[];
  verificationNote: string;
};

"""
ECOSYSTEM_OUT.write_text(
    ECOSYSTEM_HEADER
    + block("ecosystemModels", "EcosystemRecord[]", ECOSYSTEM_CATALOG["models"])
    + block("ecosystemFrameworks", "EcosystemRecord[]", ECOSYSTEM_CATALOG["frameworks"])
    + block("ecosystemArenas", "EcosystemRecord[]", ECOSYSTEM_CATALOG["arenas"])
    + block("ecosystemCompanies", "EcosystemRecord[]", ECOSYSTEM_CATALOG["companies"])
)
print(f"wrote {ECOSYSTEM_OUT}  {ECOSYSTEM_OUT.stat().st_size} bytes")

# Dataset evidence grows with every audited paper mention. Keep the full
# catalog out of the shared site module so the home page and unrelated
# collection routes do not carry its citing-paper payload.
DATASETS_OUT = OUT.parent / "datasets.ts"
DATASETS_OUT.write_text(
    "// Generated dataset catalog. Edit scripts/data sources and regenerate.\n\n"
    'import type { SubpageConfig } from "./site";\n\n'
    "export const datasetConfig: SubpageConfig = "
    + ts(CONFIGS["datasets"])
    + ";\n"
)

PAPERS_OUT = OUT.parent / "papers.ts"
PAPERS_HEADER = """// Research library, merged from two survey lists:
//   xingjunm/Awesome-Large-Model-Safety      -> LLMs, Agents
//   x-zheng16/Awesome-Embodied-AI-Safety     -> Embodied AI
// Kept in its own module so pages that do not use it never ship it.

export type LibraryPaper = {
  title: string;
  authors: readonly string[];
  authorCount: number;
  venue?: string;
  year?: string;
  domain: string;
  group: string;
  section?: string;
  kind: "research" | "survey";
  arxivId?: string;
  url?: string;
};

"""
# Discover only needs enough to render a search hit, so it gets a slim index
# instead of the full library — the landing page should not carry 330 KB of
# sections and author lists it never shows.
SEARCH_OUT = OUT.parent / "paper-search.ts"
search_index = [
    {
        "t": p["title"],
        "a": (p["authors"][0] if p["authors"] else None),
        "n": p["authorCount"],
        "v": p.get("venue"),
        "y": p.get("year"),
        "d": p["domain"],
        "x": bool(p.get("arxivId") or p.get("url")),
    }
    for p in paper_library
]
SEARCH_OUT.write_text(
    "// Slim search index for Discover. The full library lives in papers.ts.\n\n"
    "export type PaperHit = {\n"
    "  /** title */ t: string;\n"
    "  /** first author */ a?: string;\n"
    "  /** author count */ n: number;\n"
    "  /** venue */ v?: string;\n"
    "  /** year */ y?: string;\n"
    "  /** domain */ d: string;\n"
    "  /** has a link */ x: boolean;\n"
    "};\n\n"
    + block("paperSearchIndex", "PaperHit[]", search_index)
)
print(f"wrote {SEARCH_OUT}  {SEARCH_OUT.stat().st_size} bytes")

PAPERS_OUT.write_text(
    PAPERS_HEADER
    + block("paperLibrary", "LibraryPaper[]", paper_library)
    + block("paperDomains", "string[]", paper_domains)
    + block("paperGroups", "Record<string, string[]>", paper_groups)
)
print(f"wrote {PAPERS_OUT}  {PAPERS_OUT.stat().st_size} bytes")

rows = [r for c in CONFIGS.values() for r in c["tableRows"]]
print(f"wrote {OUT}  {OUT.stat().st_size} bytes")
print(f"  rows={len(rows)}  with stats={sum(1 for r in rows if r['stats'])}"
      f"  with meta={sum(1 for r in rows if r['meta'])}"
      f"  with venue={sum(1 for r in rows if r['venue'])}")
print(f"  total resource links={sum(len(r['resources']) for r in rows)}")
print("  no metadata:", [r["name"] for r in rows if not r["stats"]])
print("  venues:", {r["name"]: r["venue"] for r in rows if r["venue"]})
