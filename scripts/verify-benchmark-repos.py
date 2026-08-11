"""Confirm each candidate repository really is the benchmark it was matched to.

A name match is not enough: "WASP" matches a web framework, and a repository
with an empty description is not thereby disqualified. The decisive evidence is
the README — the real repository states the benchmark's own title or describes
safety evaluation. Anything that fails is dropped and the reason recorded.
"""
import json, pathlib, re, time, urllib.error, urllib.request

UA = {"User-Agent": "opentai-web-metadata/1.0"}
DATA = pathlib.Path(__file__).parent / "data"
RESOLVED = DATA / "benchmark-resolved.json"

records = json.loads(RESOLVED.read_text())
candidates = {c["title"]: c for c in json.load(open(DATA / "benchmark-candidates.json"))}

SAFETY = re.compile(
    r"safety|jailbreak|adversarial|red[- ]?team|prompt injection|harmful|"
    r"attack|malicious|risk|guardrail|benchmark for|evaluat\w+ (?:the )?safe",
    re.I,
)


def readme(repo):
    for branch in ("main", "master"):
        for name in ("README.md", "readme.md", "README.rst"):
            try:
                url = f"https://raw.githubusercontent.com/{repo}/{branch}/{name}"
                return urllib.request.urlopen(
                    urllib.request.Request(url, headers=UA), timeout=30
                ).read().decode("utf-8", "ignore")
            except urllib.error.HTTPError:
                continue
            except Exception:
                return None
    return None


def distinctive(title):
    """Words from the paper title that a matching README should also use."""
    stop = {"the", "a", "an", "of", "for", "and", "in", "on", "to", "with", "via",
            "benchmarking", "benchmark", "towards", "evaluating", "evaluation"}
    words = re.findall(r"[a-z]{4,}", title.lower())
    return [w for w in words if w not in stop]


checked = restored = dropped = 0
for title, rec in records.items():
    repo = (rec.get("github") or {}).get("repo") or (rec.get("rejected") or {}).get("repo")
    if not repo:
        continue
    checked += 1
    text = readme(repo)
    time.sleep(0.5)

    if not text:
        verdict, why = False, "README unavailable"
    else:
        head = text[:6000]
        words = distinctive(title)
        overlap = sum(1 for w in set(words) if w in head.lower())
        has_safety = bool(SAFETY.search(head))
        # Either the README echoes the paper's own vocabulary, or it plainly
        # describes safety evaluation work. A generic project does neither.
        verdict = overlap >= max(2, len(set(words)) // 4) or (has_safety and overlap >= 1)
        why = f"title-word overlap {overlap}/{len(set(words))}, safety language {'yes' if has_safety else 'no'}"

    was_matched = bool(rec.get("github"))
    if verdict and not was_matched:
        rec["github"] = {**(rec.get("rejectedPayload") or {}), "repo": repo}
        rec.pop("rejected", None)
        rec["needsRefetch"] = True
        restored += 1
        print(f"  RESTORE {rec['name']:22} {repo:44} {why}")
    elif not verdict and was_matched:
        rec["rejected"] = {"repo": repo, "reason": why}
        rec["github"] = None
        dropped += 1
        print(f"  DROP    {rec['name']:22} {repo:44} {why}")
    else:
        print(f"  {'keep   ' if verdict else 'stay-out'} {rec['name']:22} {repo:44} {why}")

RESOLVED.write_text(json.dumps(records, ensure_ascii=False, indent=2))
kept = sum(1 for r in records.values() if r.get("github"))
print(f"\nchecked {checked} repositories — restored {restored}, dropped {dropped}")
print(f"{kept}/{len(records)} candidates now have a verified repository")
