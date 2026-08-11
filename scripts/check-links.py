"""Check every external link in the built site (run `npm run build` first)."""
import concurrent.futures as cf, pathlib, re, sys, urllib.error, urllib.request

UA = {"User-Agent": "Mozilla/5.0 (opentai-web link check)"}
OUT = pathlib.Path(__file__).parent.parent / "out"

if not OUT.exists():
    sys.exit("out/ not found — run `npm run build` first")

links = set()
for page in OUT.rglob("*.html"):
    links.update(re.findall(r'href="(https?://[^"]+)"', page.read_text(errors="ignore")))


def check(url):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, headers=UA, method=method)
            with urllib.request.urlopen(req, timeout=20) as r:
                return url, r.status
        except urllib.error.HTTPError as e:
            if e.code in (403, 405, 429) and method == "HEAD":
                continue
            return url, e.code
        except Exception as e:
            return url, type(e).__name__
    return url, "unknown"


with cf.ThreadPoolExecutor(8) as ex:
    results = list(ex.map(check, sorted(links)))

bad = [(u, s) for u, s in results if s != 200]
print(f"checked {len(results)} external links, {len(bad)} not reachable")
for url, status in sorted(bad, key=lambda x: str(x[1])):
    print(f"  {status}  {url}")
sys.exit(1 if bad else 0)
