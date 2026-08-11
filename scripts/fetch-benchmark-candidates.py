"""Resolve benchmark citations to real repositories.

The two survey lists file benchmarks as paper citations. This tries to promote
each one to a publishable resource by finding its repository. A match is only
accepted when the benchmark's name appears in the repository's own name or
description — the same rule the rest of the pipeline follows — so a wrong repo
is never attached. Unresolved candidates are still published, as citations.
"""
import json, pathlib, re, time, urllib.error, urllib.parse, urllib.request

UA = {"User-Agent": "opentai-web-metadata/1.0"}
DATA = pathlib.Path(__file__).parent / "data"
OUT = DATA / "benchmark-resolved.json"

candidates = json.load(open(DATA / "benchmark-candidates.json"))
resolved = json.loads(OUT.read_text()) if OUT.exists() else {}


def norm(text):
    return re.sub(r"[^a-z0-9]", "", (text or "").lower())


def get(url, timeout=30, attempts=3):
    for i in range(attempts):
        try:
            return json.loads(
                urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout).read()
            )
        except urllib.error.HTTPError as e:
            if e.code in (403, 429):  # search rate limit
                time.sleep(20 * (i + 1))
                continue
            return None
        except Exception:
            time.sleep(4 * (i + 1))
    return None


def benchmark_name(title):
    """The short name a benchmark is known by — the part before the colon."""
    head = title.split(":")[0].strip()
    head = re.sub(r"\s*\(.*?\)\s*", " ", head).strip()
    # "Agentdojo" style entries are already the name; longer sentences are not
    return head if len(head.split()) <= 4 else ""


# A benchmark name alone is a weak signal: "WASP" matches a web framework,
# "SafeBench" matches unrelated projects. Require the repository to also read
# like safety/evaluation work, and never accept an awesome-list as the
# benchmark itself.
TOPICAL = re.compile(
    r"safety|safe\b|benchmark|evaluat|attack|jailbreak|adversarial|red[- ]?team|"
    r"robust|security|harm|risk|injection|guard|align",
    re.I,
)


def is_plausible(name, repo):
    if re.match(r"awesome", repo["full_name"].split("/")[-1], re.I):
        return False, "is an awesome-list, not the benchmark"
    blob = f"{repo['full_name']} {repo.get('description') or ''} {' '.join(repo.get('topics') or [])}"
    if not TOPICAL.search(blob):
        return False, "repository does not read as safety/evaluation work"
    return True, None


def search_repo(name):
    q = urllib.parse.quote(f"{name} in:name")
    data = get(f"https://api.github.com/search/repositories?q={q}&per_page=8")
    if not data or not data.get("items"):
        return None

    key = norm(name)
    for repo in data["items"]:
        blob = norm(repo["full_name"] + " " + (repo.get("description") or ""))
        if not (key and key in blob):
            continue
        candidate = {
            "full_name": repo["full_name"],
            "description": repo.get("description"),
            "topics": repo.get("topics") or [],
        }
        ok, why = is_plausible(name, candidate)
        if not ok:
            print(f"       rejected {repo['full_name']} — {why}")
            continue
        return {
                "repo": repo["full_name"],
                "stars": repo["stargazers_count"],
                "forks": repo["forks_count"],
                "language": repo.get("language"),
                "license": (repo.get("license") or {}).get("spdx_id"),
                "pushedAt": repo["pushed_at"][:10],
                "description": repo.get("description"),
                "homepage": repo.get("homepage") or None,
                "topics": repo.get("topics") or [],
            }
    return None


todo = [c for c in candidates if c["title"] not in resolved]
print(f"{len(candidates)} candidates, {len(resolved)} already done, {len(todo)} to resolve\n")

hits = 0
for i, cand in enumerate(todo, 1):
    name = benchmark_name(cand["title"])
    record = {"name": name or cand["title"], "github": None}
    if name:
        record["github"] = search_repo(name)
        if record["github"]:
            hits += 1
            g = record["github"]
            print(f"  OK   {name:22} -> {g['repo']:42} ★{g['stars']:,}")
        else:
            print(f"  miss {name:22} (no repository matched its name)")
    else:
        print(f"  skip {cand['title'][:52]:52} (no short name to search)")

    resolved[cand["title"]] = record
    OUT.write_text(json.dumps(resolved, ensure_ascii=False, indent=2))
    time.sleep(7)  # unauthenticated search allows 10 requests a minute

print(f"\nresolved {hits}/{len(todo)} to a repository")
