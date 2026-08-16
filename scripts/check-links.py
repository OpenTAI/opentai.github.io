"""Check every external link in the built site (run `npm run build` first)."""
import concurrent.futures as cf, pathlib, re, sys, urllib.error, urllib.parse, urllib.request

UA = {"User-Agent": "Mozilla/5.0 (opentai-web link check)"}
OUT = pathlib.Path(__file__).parent.parent / "out"

if not OUT.exists():
    sys.exit("out/ not found — run `npm run build` first")

links = set()
for page in OUT.rglob("*.html"):
    links.update(re.findall(r'href="(https?://[^"]+)"', page.read_text(errors="ignore")))


def is_built_page(url):
    """Recognize canonical/alternate production URLs that exist in this export."""
    parsed = urllib.parse.urlsplit(url)
    if parsed.hostname not in {"opentai.org", "www.opentai.org"}:
        return False

    parts = pathlib.PurePosixPath(urllib.parse.unquote(parsed.path)).parts
    if ".." in parts:
        return False

    relative = parsed.path.strip("/")
    target = OUT / relative / "index.html" if relative else OUT / "index.html"
    return target.is_file()


# Next emits absolute canonical and language-alternate links. They are internal
# when the corresponding page is present in this build, so do not probe the
# currently deployed site (which may not contain this build yet).
links = {url for url in links if not is_built_page(url)}


def check(url):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, headers=UA, method=method)
            with urllib.request.urlopen(req, timeout=20) as r:
                return url, r.status
        except urllib.error.HTTPError as e:
            # A surprising number of research hosts reject or misroute HEAD
            # while serving the same URL normally with GET. Always confirm a
            # failed HEAD with the request a reader's browser will make.
            if method == "HEAD":
                continue
            return url, e.code
        except Exception as e:
            if method == "HEAD":
                continue
            return url, type(e).__name__
    return url, "unknown"


with cf.ThreadPoolExecutor(8) as ex:
    results = list(ex.map(check, sorted(links)))

# Any successful HTTP response is reachable. Some repositories and DOI
# resolvers intentionally return 202/203 while preparing or proxying content.
bad = [
    (u, s)
    for u, s in results
    if not (isinstance(s, int) and 200 <= s < 300)
]
print(f"checked {len(results)} external links, {len(bad)} not reachable")
for url, status in sorted(bad, key=lambda x: str(x[1])):
    print(f"  {status}  {url}")
sys.exit(1 if bad else 0)
