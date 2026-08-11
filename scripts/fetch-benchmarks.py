"""Resolve the benchmarks named in the OpenTAI spec to real public sources.

Every candidate is verified before it is accepted: the GitHub repository
description (or repo name) must mention the benchmark, and the arXiv title must
match. Unresolved names are reported, never guessed.
"""
import json, pathlib, re, time, urllib.error, urllib.parse, urllib.request
import xml.etree.ElementTree as ET

UA = {"User-Agent": "opentai-web-metadata/1.0"}
DATA = pathlib.Path(__file__).parent / "data"

# name -> (candidate repos, arXiv title to confirm)
NAMED = {
    "HarmBench": (["centerforaisafety/HarmBench"],
                  "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming"),
    "JailbreakBench": (["JailbreakBench/jailbreakbench"],
                       "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models"),
    "SafetyBench": (["thu-coai/SafetyBench"],
                    "SafetyBench: Evaluating the Safety of Large Language Models"),
    "AgentDojo": (["ethz-spylab/agentdojo"],
                  "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents"),
    "OSWorld-Safety": (["xlang-ai/OSWorld", "OSWorld-Safety/OSWorld-Safety"], None),
    "ToolSafetyBench": (["ToolSafetyBench/ToolSafetyBench"], None),
    "MM-SafetyBench": (["isXinLiu/MM-SafetyBench"],
                       "MM-SafetyBench: A Benchmark for Safety Evaluation of Multimodal Large Language Models"),
}


def get(url, timeout=45, attempts=3):
    last = None
    for i in range(attempts):
        try:
            return urllib.request.urlopen(
                urllib.request.Request(url, headers=UA), timeout=timeout
            ).read()
        except Exception as exc:  # network flake / arXiv throttling
            last = exc
            time.sleep(4 * (i + 1))
    raise last


def norm(text):
    return re.sub(r"[^a-z0-9]", "", (text or "").lower())


def github(repo):
    try:
        return json.loads(get(f"https://api.github.com/repos/{repo}"))
    except urllib.error.HTTPError as e:
        return {"_error": e.code}


def arxiv_by_title(title):
    """Search arXiv by title and only accept a near-exact match."""
    q = urllib.parse.quote(f'ti:"{title.split(":")[0]}"')
    try:
        raw = get(f"https://export.arxiv.org/api/query?search_query={q}&max_results=5")
    except Exception as exc:
        print(f"       arXiv lookup failed ({type(exc).__name__}) — skipped")
        return None
    ns = {"a": "http://www.w3.org/2005/Atom"}
    want = norm(title)
    for entry in ET.fromstring(raw).findall("a:entry", ns):
        got_title = re.sub(r"\s+", " ", entry.findtext("a:title", "", ns)).strip()
        if norm(got_title)[:60] != want[:60]:
            continue
        authors = [a.findtext("a:name", "", ns) for a in entry.findall("a:author", ns)]
        aid = entry.findtext("a:id", "", ns).rsplit("/", 1)[-1].split("v")[0]
        comment = entry.findtext("{http://arxiv.org/schemas/atom}comment", "", ns)
        return {
            "arxivId": aid,
            "title": got_title,
            "authors": authors,
            "authorCount": len(authors),
            "published": (entry.findtext("a:published", "", ns) or "")[:10],
            "abstract": re.sub(r"\s+", " ", entry.findtext("a:summary", "", ns)).strip(),
            "primaryCategory": (entry.find("a:category", ns) or {}).get("term")
            if entry.find("a:category", ns) is not None
            else None,
            "comment": re.sub(r"\s+", " ", comment or "").strip() or None,
        }
    return None


resolved, unresolved = {}, []

for name, (repos, title) in NAMED.items():
    record = {"name": name}
    key = norm(name)

    for repo in repos:
        d = github(repo)
        if "_error" in d:
            print(f"  {d['_error']}  {name:16} -> {repo}")
            continue
        blob = norm(d["full_name"] + " " + (d.get("description") or ""))
        if key not in blob and norm(name.replace("-", "")) not in blob:
            print(f"  SKIP {name:16} -> {repo} (description does not mention it)")
            continue
        record["github"] = {
            "repo": d["full_name"], "stars": d["stargazers_count"], "forks": d["forks_count"],
            "language": d.get("language"), "license": (d.get("license") or {}).get("spdx_id"),
            "pushedAt": d["pushed_at"][:10], "createdAt": d["created_at"][:10],
            "topics": d.get("topics") or [], "description": d.get("description"),
            "homepage": d.get("homepage") or None, "archived": d.get("archived"),
        }
        print(f"  OK   {name:16} -> {d['full_name']:38} ★{d['stargazers_count']:,}")
        break
    time.sleep(0.4)

    if title:
        paper = arxiv_by_title(title)
        if paper:
            record["arxiv"] = paper
            print(f"       arXiv {paper['arxivId']}  {paper['authorCount']} authors  {paper['published']}")
        else:
            print(f"       arXiv title did not match — skipped")
        time.sleep(3.1)

    if "github" in record or "arxiv" in record:
        resolved[name] = record
    else:
        unresolved.append(name)

json.dump(resolved, open(DATA / "benchmarks.json", "w"), ensure_ascii=False, indent=2)
print(f"\nresolved {len(resolved)}/{len(NAMED)}")
if unresolved:
    print("UNRESOLVED (will not be published):", ", ".join(unresolved))
