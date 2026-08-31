# OpenTAI website (rebuild)

A rebuild of the OpenTAI site on the OpenHallu framework: Next.js 16 App Router,
React 19, Tailwind CSS v4, static export.

Positioning: **OpenTAI — The Open Hub for Trustworthy AI**. An open ecosystem
connecting trustworthy AI research, innovation, and startups.

## Local development

```bash
npm ci
npm run dev
```

## Site map

| Route | Contents |
| --- | --- |
| `/` | Discover — site-wide search, newsletter signup, trending, latest releases |
| `/benchmarks` | Flagship collection, 55 entries; primary filters are LLMs, Agents, Embodied AI |
| `/benchmarks/[slug]` | Per-benchmark page: description, code, papers, leaderboard, curation gaps |
| `/models` | Verified open-source guard, security-specialized, and safety-aligned models |
| `/datasets` | 33 directly safety/trustworthiness-relevant datasets retained from a 155-record primary-source audit; charts update automatically by domain and year |
| `/papers` | 772-paper library — LLMs / Agents / Embodied AI, then Research / Survey |
| `/leaderboard` | Source-checked public leaderboard cards for LLM Safety, Agent Safety, and Fairness; every snapshot names its exact metric |
| `/arenas` | Gray Swan Arena, CyberGym, and ExploitGym cards with official links and verifiable result snapshots where available |
| `/companies` | Source-backed AI safety, agent security, evaluation, and red-teaming startups |
| `/community` | GitHub contributors, volunteer contribution flow, and partner institutions |
| `/about` | Mission, contact, coverage summary |
| `/terms` | Terms of Use supplied by the OpenTAI team |
| `/zh/...` | Chinese interface and descriptions; paper titles, abstracts, and authors stay English |

## Content pipeline

`src/data/site.ts` is **generated**. Do not edit it by hand.

```bash
python3 scripts/fetch-metadata.py      # GitHub / arXiv / Hugging Face metadata
python3 scripts/fetch-benchmarks.py    # resolve the benchmarks named in the spec
python3 scripts/parse-awesome.py       # parse the large-model-safety list
python3 scripts/parse-embodied.py      # parse the embodied-ai-safety list
python3 scripts/resolve-paper-links.py # look up missing arXiv ids (slow, resumable)
python3 scripts/merge-papers.py        # merge, dedupe, and build source-backed author-search supplements
python3 scripts/fetch-paper-authors.py # cache full official arXiv author lists
python3 scripts/merge-papers.py        # apply title-matched verified author metadata
python3 scripts/build-paper-digest-manifest.py       # map approved papers to exact full text
python3 scripts/extract-paper-dataset-candidates.py  # extract review candidates, not publishable facts
python3 scripts/consolidate-paper-dataset-audits.py  # merge only audited training-data decisions
python3 scripts/fetch-benchmark-candidates.py  # resolve benchmark citations to repos
python3 scripts/verify-benchmark-repos.py      # confirm each match against its README
python3 scripts/generate-site.py       # rebuild src/data/*.ts
```

| Source | What it provides |
| --- | --- |
| `scripts/data/home.json` | Entry names, descriptions, links, tags, images — from `OpenTAI/opentai.github.io` → `content/pages/home.md` |
| `scripts/data/leaderboards.json` | Legacy 77-row vision leaderboard source from `content/pages/leaderboards.md`; retained for provenance but no longer rendered on `/leaderboard` |
| `scripts/data/leaderboard-directory.json` | Public leaderboard cards, metric-specific top results, snapshot dates, and official source notes |
| `scripts/data/arena-directory.json` | Public arena cards and source-checked result snapshots; unavailable static rankings remain explicitly empty |
| `scripts/data/arena-results.json` | Source-backed cross-arena chart snapshot; each benchmark retains its official, non-comparable metric definition |
| `scripts/data/awesome.md` | Bibliography from `xingjunm/Awesome-Large-Model-Safety` — the approved LLMs and Agents chapters plus Agent Safety Benchmarks |
| `scripts/data/embodied.md` | Bibliography from `x-zheng16/Awesome-Embodied-AI-Safety` — Embodied AI research, surveys, and its explicit Benchmarks & Datasets section |
| `scripts/data/paper-author-metadata.json` | Complete author lists from the official arXiv Atom API, retained for full-name search; records are applied only after the arXiv title matches the catalog title |
| `scripts/data/training-datasets.json` | 155 source-verified training-data candidates. Each row records primary-source training use or an explicit train/validation split, plus a verified public data URL |
| `scripts/data/dataset-scope-audit.json` | One keep/exclude decision per candidate. The public catalog keeps 33 records whose cited primary source directly concerns safety, alignment, content safety, or AI security |
| `scripts/data/paper-dataset-mentions.json` | 570 audited paper-level training uses with the exact citing-paper identity and evidence text |
| `scripts/data/paper-dataset-audits/` | Domain audits, exact-title/PDF addenda, official-link verification, and explicit quality corrections |
| `scripts/data/dataset-candidates.json` | Entries from the embodied survey's mixed Benchmarks & Datasets section; primary-source evidence determines whether each belongs in Datasets or Benchmarks |
| `scripts/data/llm-safety-resources.json` | The 18 LLM datasets and benchmarks recorded in Table 6 of the Safety at Scale survey linked by the large-model list, with an evidence-backed Datasets/Benchmarks split |
| `scripts/data/llm-benchmark-datasets.json` | Verified public question/task files attached to Table 6 benchmarks; retained as benchmark evidence, not automatically treated as training datasets |
| `scripts/data/agent-safety-datasets.json` | Verified public data paths attached to Safety at Scale Table 14 benchmarks; retained as benchmark evidence, not automatically treated as training datasets |
| `scripts/data/benchmark-datasets.json` | Approved-list benchmarks whose official projects expose public data; currently HASARD from the embodied-safety sources |
| `scripts/data/benchmark-overrides.json` | Hand-checked verdicts where automatic repository matching went wrong |
| `scripts/data/benchmark-curation.json` | Hand-curated Dataset / Metrics / Baselines / Leaderboard per benchmark, each field tagged with the source it was read from |
| `scripts/data/safety-at-scale-benchmark-audit.json` | Chapter-wide Safety at Scale audit. Approved rows have primary-source and official-README evidence; excluded auxiliary benchmarks and out-of-scope chapters retain explicit reasons |
| `scripts/data/submitted-resources.json` | Unpublished review queue for community-submitted papers, benchmarks, and datasets. The generator deliberately ignores it; reviewed items must be moved into the appropriate canonical source file before publication |
| `scripts/data/ecosystem-catalog.json` | Verified Models, Frameworks, Arenas, and Companies records. Each row includes official links, field-level source evidence, and a static GitHub-star snapshot date when available |
| GitHub REST API | Stars, forks, language, licence, last-push, topics |
| arXiv API | Authors, posting dates, abstracts, primary category |
| Hugging Face API | Download counts, likes, licence, size category |

### Rules the pipeline follows

- Publication venues are parsed only out of repository descriptions and arXiv
  comments. Nothing is inferred from a title or a guess.
- A benchmark or repository is accepted only when its name appears in the
  repository's own name or description.
- Papers get an arXiv link only on a near-exact title match.
- Anything that cannot be verified is left empty and labelled, never filled in
  with a plausible placeholder.
- The source-backed training-data review covers 155 unique candidates and the
  strict scope ledger publishes 33 directly relevant records. General-purpose
  corpora used only incidentally by a safety paper remain recorded but are
  excluded from the public catalog. BooksCorpus, ShareGPT, and the retired Kaggle Fake
  News competition dataset remain unresolved because no currently reachable,
  authoritative public release could be assigned without substituting a
  different or third-party copy. Another 138 approved-list papers have no exact public full
  text available to this pipeline, so they are recorded as a coverage gap rather
  than guessed from titles or abstracts.
- Hand-curated benchmark fields carry a `source` string that is rendered on the
  page. If you add one, read it out of a primary source and say which.

Category groupings and page copy are **authored** for this rebuild — they are
the part most in need of review, and live near the top of
`scripts/generate-site.py`.

### Community submission review

The public submission forms create GitHub issues because this is a static site;
they do not write directly into the repository. When triaging an issue, copy
the submitted name, year, links, and issue URL into
`scripts/data/submitted-resources.json` with status `pending`. This file is a
review ledger only and is never imported by `generate-site.py`.

After checking the primary paper/project page, the official repository, and
the resource type, either mark the record `rejected` with a reason or move the
verified facts into the appropriate canonical data source and mark the queue
record `approved`. Only canonical data sources are published. This keeps an
unreviewed community issue from appearing on the public site automatically.

## Newsletter signup

The Discover subscribe box sends a JSON request to the self-hosted
`POST /api/subscribe` endpoint. `server/newsletter_server.py` serves both the
static `out/` directory and that endpoint, then sends the request to the OpenTAI
contact address through SMTP. It does not open the visitor's email app and does
not store subscriber addresses.

Build and run it locally without Vercel:

```bash
npm run build
export NEWSLETTER_SMTP_USER="your-sender@gmail.com"
export NEWSLETTER_SMTP_APP_PASSWORD="your-gmail-app-password"
npm run serve:self-hosted
```

The default URL is `http://127.0.0.1:4173`. The SMTP password is required at
runtime and must never be committed. See `server/newsletter.env.example` for
all settings. In production, keep the Python process bound to `127.0.0.1` and
put HTTPS/Nginx in front of it. Set `OPENTAI_TRUST_PROXY=true` only for that
local trusted-proxy deployment so rate limits use the visitor IP from
Nginx's overwritten `X-Real-IP`; leave it false when the Python server is
directly exposed. Set `NEWSLETTER_ALLOWED_ORIGINS=https://opentai.org` for the
public domain. A bounded, timeout-configured reverse-proxy example is provided
at `server/nginx-opentai.conf.example`.

The endpoint validates addresses, uses a honeypot, limits requests per IP, and
returns generic delivery errors without logging subscriber addresses. It sends
an administrator-review request to the contact address only. The message warns
the administrator to verify address ownership before enrollment. Producing and
mailing the daily "OpenTAI Daily" digest remains a separate service.

## Open questions for the OpenTAI team

- `OSWorld-Safety` and `ToolSafetyBench` are named in the spec but have no
  public repository under those names; they are not published here.
- `OpenTAI/VisionSafety` contains the VisionSafety platform's website, not its
  evaluation code. The benchmark page says so.
- `VLBreakBench` has no working link and no verifiable repository, so only its
  dataset description — taken from the current OpenTAI site — is published.
- The current site lists the toolkit as `BlackdoorLLM`; the repository is
  `bboylyg/BackdoorLLM`. The site's spelling was kept.
- `content/pages/newslist.md` upstream contains one item whose body is
  placeholder lorem-ipsum text, so it was not ported.
- The site publishes only the three domains the team approved: **LLMs**,
  **Agents**, and **Embodied AI**. Vision, VLP, VLM, and diffusion chapters
  remain in the source snapshot but are outside the Papers scope.
- The legacy OpenTAI homepage's eight featured datasets are intentionally not
  part of the rebuilt Datasets collection. Dataset scope is now limited to the
  two team-approved source lists, surveys explicitly linked by those lists,
  and verified official public data locations.
- The embodied source has an explicit mixed **Benchmarks & Datasets** section,
  while the large-model repository links to the **Safety at Scale** survey's
  LLM and Agent tables. The site does not copy that mixed labeling blindly:
  **Datasets** requires explicit evidence of training, fine-tuning, alignment,
  or classifier-training use; public test questions, tasks, cases, or evaluation
  environments stay in **Benchmarks**. An item may appear in both only when the
  official source releases a distinct training split as well as an evaluation
  benchmark. Every inclusion and its evidence is recorded in
  `scripts/data/training-datasets.json`.
- `h4rm3l` is listed inside the source's Agent Safety Benchmarks section, but
  its own project defines it as an LLM-safety jailbreak benchmark. It is kept
  under LLMs; the source heading alone is not used as evidence for its domain.
- The Survey tab is small by construction: both lists primarily collect the
  papers a survey reviews. 14 of 772 published entries are surveys.
- Privacy Policy and citation on the About page are **drafts**, marked as such
  on the page itself. Terms of Use is published separately from the text
  supplied by the OpenTAI team. Community displays the GitHub contributor accounts
  explicitly confirmed by the team; the volunteer form opens a reviewable
  GitHub issue rather than storing submissions on the website.
- Chinese pages are statically exported under `/zh`. Interface text and
  descriptions are localized; paper titles, abstracts, author names, and
  publication metadata stay English.

## Deployment

Currently deployed from Vercel for preview. `next.config.ts` derives `basePath`
from `GITHUB_REPOSITORY`, which is unset on Vercel, so the site serves from the
root — no configuration needed.

`.github/workflows/deploy-pages.yml` is also present for GitHub Pages, where
the same logic produces a sub-path when the repository is not an organisation
site. GitHub Pages needs a public repository on a free personal account.

### Indexing

Search-engine indexing is opt-in. Every build serves `Disallow: /` and a
`noindex` meta tag unless `NEXT_PUBLIC_SITE_URL` is set exactly to
`https://opentai.org`. Preview deployments therefore stay out of search by
default — see `src/lib/site-url.ts`.

The repository lives at `Frankiegan912/opentai-web` (private) and is intended
to be transferred to the OpenTAI organisation once that is agreed.
