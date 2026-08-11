"""Fetch public metadata for every external link used by opentai-web.

Unauthenticated public endpoints only (GitHub REST, arXiv Atom, Hugging Face).
Writes metadata.json for the site.ts generator to merge in.
"""
import json, pathlib, re, sys, time, urllib.request, urllib.error
import xml.etree.ElementTree as ET

UA = {"User-Agent": "opentai-web-metadata/1.0"}

GITHUB = {
    "IDEATOR": "roywang021/IDEATOR",
    "CALM": "x-zheng16/CALM",
    "UMK": "roywang021/UMK",
    "AdvT-shirt-1K": "Wwangb/AdvT-shirt-1K",
    "CC1M-Adv-C/F": "treeman2000/CC1M-Adv-CF",
    "WildDeepfake": "OpenTAI/wild-deepfake",
    "BlackdoorLLM": "bboylyg/BackdoorLLM",
    "taiadv.vision": "OpenTAI/taiadv",
    "TextFlint": "textflint/textflint",
    "RewardModel Bench": "Zhou-Zoey/RMB-Reward-Model-Benchmark",
}

ARXIV = {
    "Human2Robot": "2502.16587",
    "DAVID XR1": "2506.14827",
    "SafeVid": "2505.11926",
    "SAMA": "2505.18812",
}

HF_DATASETS = {
    "SafeVid-350k": "yxwang/SafeVid-350K",
}


def get(url, accept=None):
    headers = dict(UA)
    if accept:
        headers["Accept"] = accept
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read()


def fetch_github(name, repo):
    try:
        d = json.loads(get(f"https://api.github.com/repos/{repo}"))
    except urllib.error.HTTPError as e:
        print(f"  ! {name} ({repo}): HTTP {e.code}", file=sys.stderr)
        return None
    return {
        "repo": repo,
        "stars": d.get("stargazers_count"),
        "forks": d.get("forks_count"),
        "language": d.get("language"),
        "license": (d.get("license") or {}).get("spdx_id"),
        "pushedAt": (d.get("pushed_at") or "")[:10],
        "createdAt": (d.get("created_at") or "")[:10],
        "topics": d.get("topics") or [],
        "description": d.get("description"),
        "archived": d.get("archived"),
    }


def fetch_arxiv(name, aid):
    raw = get(f"http://export.arxiv.org/api/query?id_list={aid}")
    ns = {"a": "http://www.w3.org/2005/Atom"}
    entry = ET.fromstring(raw).find("a:entry", ns)
    if entry is None:
        print(f"  ! {name} ({aid}): no entry", file=sys.stderr)
        return None
    authors = [a.findtext("a:name", "", ns) for a in entry.findall("a:author", ns)]
    published = (entry.findtext("a:published", "", ns) or "")[:10]
    updated = (entry.findtext("a:updated", "", ns) or "")[:10]
    cats = [c.get("term") for c in entry.findall("a:category", ns)]
    comment = entry.findtext("{http://arxiv.org/schemas/atom}comment", "", ns)
    return {
        "arxivId": aid,
        "title": re.sub(r"\s+", " ", entry.findtext("a:title", "", ns)).strip(),
        "authors": authors,
        "authorCount": len(authors),
        "published": published,
        "updated": updated,
        "primaryCategory": cats[0] if cats else None,
        "comment": re.sub(r"\s+", " ", comment or "").strip() or None,
    }


def fetch_hf(name, ds):
    d = json.loads(get(f"https://huggingface.co/api/datasets/{ds}"))
    return {
        "dataset": ds,
        "downloads": d.get("downloads"),
        "likes": d.get("likes"),
        "lastModified": (d.get("lastModified") or "")[:10],
        "tags": [t for t in (d.get("tags") or []) if not t.startswith("region:")][:8],
    }


out = {"github": {}, "arxiv": {}, "huggingface": {}}

print("GitHub:")
for name, repo in GITHUB.items():
    meta = fetch_github(name, repo)
    if meta:
        out["github"][name] = meta
        print(f"  {name:20} ★{meta['stars']:<6} {meta['language'] or '-':12} pushed {meta['pushedAt']}")
    time.sleep(0.4)

print("arXiv:")
for name, aid in ARXIV.items():
    meta = fetch_arxiv(name, aid)
    if meta:
        out["arxiv"][name] = meta
        print(f"  {name:20} {meta['authorCount']:>3} authors  published {meta['published']}")
    time.sleep(3.1)  # arXiv asks for >=3s between requests

print("Hugging Face:")
for name, ds in HF_DATASETS.items():
    meta = fetch_hf(name, ds)
    out["huggingface"][name] = meta
    print(f"  {name:20} {meta['downloads']} downloads, {meta['likes']} likes")

json.dump(out, open(pathlib.Path(__file__).parent / "data" / "metadata.json", "w"), ensure_ascii=False, indent=2)
print(f"\nwrote metadata.json  github={len(out['github'])} arxiv={len(out['arxiv'])} hf={len(out['huggingface'])}")
