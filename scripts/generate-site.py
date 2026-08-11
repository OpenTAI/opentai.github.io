"""Generate src/data/site.ts, merging OpenTAI content with fetched public metadata."""
import json, pathlib, re
from urllib.parse import urlparse

HERE = pathlib.Path(__file__).parent
DATA = HERE / "data"

HOME = json.load(open(DATA / "home.json"))
LEADERBOARDS = json.load(open(DATA / "leaderboards.json"))
NAMED_BENCH = json.load(open(DATA / "benchmarks.json"))
CURATION = json.load(open(DATA / "benchmark-curation.json"))
LIBRARY = json.load(open(DATA / "paper-library.json"))
BENCH_CANDIDATES = json.load(open(DATA / "benchmark-candidates.json"))
BENCH_RESOLVED = json.load(open(DATA / "benchmark-resolved.json"))
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
        return '"' + v.replace("\\", "\\\\").replace('"', '\\"') + '"'
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

# Domain is the primary axis. The team named LLMs, Agents and Embodied AI;
# Vision & Multimodal was added because half of the large-model-safety list
# (vision, VLP, VLM, diffusion) belongs to none of the other three.
PAPER_DOMAINS = ["LLMs", "Agents", "Embodied AI", "Vision & Multimodal"]
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
        "tables": tables,
    }


leaderboards = build_leaderboards()

# ---------------------------------------------------------------- taxonomy
RESEARCH_TYPE = {
    "IDEATOR": "Red Teaming",
    "Universal Master Key (UMK)": "Jailbreak Attack",
    "AnyAttack": "Adversarial Attack",
    "BlueSuffix": "Jailbreak Defense",
    "CALM": "Model Auditing",
    "DAO": "Backdoor Detection",
}
DATASET_TYPE = {
    "SafeVid-350k": "Preference Data",
    "DAVID-X": "Detection & Forensics",
    "OmniSVG-2M": "Generative Data",
    "Human2Robot": "Agent Trajectory Data",
    "AdvT-shirt-1K": "Adversarial Data",
    "VLBreakBench": "Red Team Data",
    "CC1M-Adv-C/F": "Adversarial Data",
    "WildDeepfake": "Detection & Forensics",
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
    "RewardModel Bench": "LLMs", "AgentDojo": "Agents",
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
    return {
        "name": name,
        "subtitle": subtitle or None,
        "note": note,
        "type": rtype,
        "venue": venue,
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

dataset_rows = [
    build_row(
        clean(d["datasetsName"]), clean(d["subTitle"]), clean(d["desc"]),
        DATASET_TYPE[clean(d["datasetsName"])], clean(d["link"]),
        [t.strip().lower() for t in clean(d["subTitle"]).split("|") if t.strip()],
        img(d["datasetsBackground"]),
    )
    for d in B[4]["items"]
]

bench_rows = [
    build_row(
        clean(b["benchMarkName"]), clean(b["subTitle"]), clean(b["description"]),
        BENCH_TYPE[clean(b["benchMarkName"])], clean(b["link"]),
        [clean(t["tagName"]) for t in b.get("tags", [])], img(b["benchMarksImg"]),
    )
    for b in B[5]["items"]
]

VERIFIED_FROM_README = {
    # name -> (arXiv id, venue), both quoted verbatim in the project's own README
    "RewardModel Bench": ("2410.09893", "ICLR 2025"),
}

# Benchmarks named in the OpenTAI spec, resolved to verified public sources.
for name, rec in NAMED_BENCH.items():
    g, a = rec.get("github"), rec.get("arxiv")
    if g:
        GH[name] = g
    if a:
        AX[name] = a
    note = (g or {}).get("description") or (a or {}).get("title") or ""
    note = re.sub(r"^\s*\[[^\]]+\]\s*", "", note)
    note = re.sub(r"^\s*(CVPR|ICLR|NeurIPS|ICML|ACL|EMNLP|AAAI|ICCV|ECCV)\s*\d{4}\s*[-–—:]\s*", "",
                  note, flags=re.I)
    row = build_row(name, None, clean(note),
                    BENCH_TYPE[name],
                    (g or {}).get("homepage") or "", [])
    bench_rows.append(row)

# Benchmarks named in the two survey lists, resolved to repositories where one
# could be verified. Entries that resolved stay as full cards; the rest are
# published as citations so the coverage gap is visible rather than hidden.
EXCLUDED_CANDIDATES = {
    t for t, r in BENCH_RESOLVED.items() if r.get("excluded")
}
existing = {clean(r["name"]).lower() for r in bench_rows}

for cand in BENCH_CANDIDATES:
    title = cand["title"]
    if title in EXCLUDED_CANDIDATES:
        continue
    rec = BENCH_RESOLVED.get(title) or {}
    name = clean(rec.get("name") or title.split(":")[0])
    if name.lower() in existing:
        continue
    existing.add(name.lower())

    g = rec.get("github")
    if g:
        GH[name] = g
    note = (g or {}).get("description") or title
    if ":" in title:
        note = title.split(":", 1)[1].strip().capitalize()

    row = build_row(name, None, note, cand["domain"],
                    f"https://github.com/{g['repo']}" if g else "", [])
    if not g and cand.get("arxivId"):
        row["resources"].append(
            {"label": "arXiv", "href": f"https://arxiv.org/abs/{cand['arxivId']}"}
        )
    row["citationOnly"] = True if not g else None
    bench_rows.append(row)

for row in bench_rows:
    row["slug"] = slugify(row["name"])
    row["domain"] = BENCH_DOMAIN.get(row["name"], row["type"])
    # Domain is what the page filters on now; the old safety label becomes a tag.
    prop = safety_property(row["name"], row["note"], " ".join(row["tags"]))
    row["type"] = row["domain"]
    row["property"] = prop
    if prop:
        row["tags"] = list(dict.fromkeys([prop.lower()] + list(row["tags"])))[:6]
    extra = VERIFIED_FROM_README.get(row["name"])
    if extra:
        aid, venue = extra
        row["venue"] = row["venue"] or venue
        url = f"https://arxiv.org/abs/{aid}"
        if not any(r["href"] == url for r in row["resources"]):
            row["resources"].insert(0, {"label": "arXiv", "href": url})

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
        g, a = GH.get(name), AX.get(name)
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
            "arxivId": (a or {}).get("arxivId"),
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
        ("Safety Instruction Data", "Instruction corpora for safety-tuned training.", "green",
         ["Safety Instruction Data"]),
        ("Preference Data", "Preference pairs for alignment and safety tuning.", "green",
         ["Preference Data"]),
        ("Red Team Data", "Jailbreak prompts and adversarial red-team probes.", "pink",
         ["Red Team Data"]),
        ("Agent Trajectory Data", "Demonstration and interaction traces for embodied agents.", "orange",
         ["Agent Trajectory Data"]),
        ("Multimodal Safety Data", "Paired image-text corpora for multimodal safety.", "violet",
         ["Multimodal Safety Data"]),
        ("Adversarial Data", "Digital and physical-world adversarial example sets.", "pink",
         ["Adversarial Data"]),
        ("Detection & Forensics", "Deepfake and AI-generated media detection corpora.", "blue",
         ["Detection & Forensics"]),
        ("Generative Data", "Large-scale corpora for generative model research.", "violet",
         ["Generative Data"]),
    ],
    "benchmarks": [
        ("LLMs", "Safety, jailbreak and alignment evaluation for language models.", "pink",
         ["LLMs"]),
        ("Agents", "Prompt injection, tool misuse and environment safety for LLM agents.", "orange",
         ["Agents"]),
        ("Embodied AI", "Safety evaluation for perception, planning and robot control.", "green",
         ["Embodied AI"]),
        ("Vision & Multimodal", "Jailbreak and robustness evaluation for vision-language models.",
         "violet", ["Vision & Multimodal"]),
    ],
    "tools": [
        ("Backdoor", "Backdoor attack and defense toolkits.", "pink", ["Backdoor"]),
        ("Adversarial", "Attack and defense libraries for vision models.", "blue", ["Adversarial"]),
        ("Robustness Evaluation", "Robustness testing across NLP tasks.", "green",
         ["Robustness Evaluation"]),
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
        "slug": "benchmarks", "breadcrumb": ["Discover", "Benchmarks"], "title": "Benchmarks",
        "heroIcon": "◎",
        "description": "Evaluation benchmarks, tasks, and metrics for trustworthy AI — the layer "
                       "everything else is measured against.",
        "overview": "Benchmarks are the flagship collection. Each entry links to its evaluation "
                    "platform or repository.",
        "tableTitle": "Benchmark platforms", "sectionTitle": "Benchmark categories",
        "categories": cats("benchmarks"), "tableRows": bench_rows,
    },
    "models": {
        "slug": "models", "breadcrumb": ["Discover", "Models"], "title": "Models",
        "heroIcon": "◆",
        "description": "Open-source trustworthy AI models — guard models, safety-aligned models, "
                       "detectors, and agents.",
        "overview": "Author lists and posting dates come from the arXiv API; repository activity "
                    "from the GitHub API.",
        "tableTitle": "Open models", "sectionTitle": "Model categories",
        "categories": cats("models"), "tableRows": model_rows,
    },
    "datasets": {
        "slug": "datasets", "breadcrumb": ["Discover", "Datasets"], "title": "Datasets",
        "heroIcon": "◱",
        "description": "Training, evaluation, preference, and jailbreak datasets spanning safety "
                       "alignment, adversarial robustness, forensics, and embodied AI.",
        "overview": "Download counts come from the Hugging Face API and repository activity from "
                    "the GitHub API. Follow each link for licensing terms.",
        "tableTitle": "Dataset collection", "sectionTitle": "Dataset categories",
        "categories": cats("datasets"), "tableRows": dataset_rows,
    },
    "tools": {
        "slug": "tools", "breadcrumb": ["Discover", "Tools"], "title": "Tools",
        "heroIcon": "◇",
        "description": "Libraries, frameworks, evaluation tools, and attack/defense toolkits for "
                       "trustworthy AI research.",
        "overview": "All toolkits are installable from their public repositories. Stars, language, "
                    "and last-push dates are read from the GitHub API.",
        "tableTitle": "Open-source toolkits", "sectionTitle": "Tool categories",
        "categories": cats("tools"), "tableRows": tool_rows,
    },
}

HOME_CARDS = [
    {"title": "Benchmarks", "description": "Evaluation benchmarks, tasks, and metrics.",
     "href": "/benchmarks", "accent": "violet", "icon": "◎"},
    {"title": "Models", "description": "Guard models, safety-aligned models, detectors, agents.",
     "href": "/models", "accent": "blue", "icon": "◆"},
    {"title": "Datasets", "description": "Training, evaluation, preference, jailbreak data.",
     "href": "/datasets", "accent": "green", "icon": "◱"},
    {"title": "Tools", "description": "Libraries, frameworks, attack and defense toolkits.",
     "href": "/tools", "accent": "orange", "icon": "◇"},
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
  property?: string;
  citationOnly?: boolean;
  subtitle?: string;
  note: string;
  type: string;
  venue?: string;
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

export type HomeCategoryCard = {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: string;
};

export const newsletter = {
  // Paste the provider's form action URL here (Buttondown / Mailchimp / Formspree).
  // Until it is set, the subscribe form renders but stays disabled.
  endpoint: "",
};

export const siteBrand = {
  name: "OpenTAI",
  tagline: "The Open Hub for Trustworthy AI",
  headline: "One platform that collects all the open-source resources for trustworthy AI.",
  contactEmail: "xingjunma@fudan.edu.cn",
  upstream: "https://opentai.org",
};

'''


def block(name, typ, v):
    return f"export const {name}: {typ} = {ts(v)};\n\n"


parts = [HEADER]
parts.append(block("navItems", "Pill[]", [
    {"label": "Discover", "href": "/"},
    {"label": "Benchmarks", "href": "/benchmarks"},
    {"label": "Models", "href": "/models"},
    {"label": "Datasets", "href": "/datasets"},
    {"label": "Tools", "href": "/tools"},
    {"label": "Papers", "href": "/papers"},
    {"label": "Leaderboard", "href": "/leaderboard"},
    {"label": "Community", "href": "/community"},
    {"label": "About", "href": "/about"},
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
                   "{ title: string; subtitle: string; tables: LeaderboardTable[] }",
                   leaderboards))
parts.append("export const subpageConfigs: Record<string, SubpageConfig> = " + ts(CONFIGS) + ";\n\n")
# Papers is no longer a curated collection — it is the merged research library,
# which lives in its own module and is counted separately on Discover.
parts.append('export const collectionOrder = [\n  "benchmarks",\n  "models",\n  "datasets",\n  "tools",\n] as const;\n')

OUT.write_text("".join(parts))

PAPERS_OUT = OUT.parent / "papers.ts"
PAPERS_HEADER = """// Research library, merged from two survey lists:
//   xingjunm/Awesome-Large-Model-Safety      -> LLMs, Agents, Vision & Multimodal
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
