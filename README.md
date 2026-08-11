# OpenTAI website (rebuild)

A rebuild of the OpenTAI site on the OpenHallu framework: Next.js 16 App Router,
React 19, Tailwind CSS v4, static export.

Positioning: **OpenTAI — The Open Hub for Trustworthy AI**. One platform that
collects all the open-source resources for trustworthy AI.

## Local development

```bash
npm ci
npm run dev
```

## Site map

| Route | Contents |
| --- | --- |
| `/` | Discover — site-wide search, newsletter signup, trending, latest releases |
| `/benchmarks` | Flagship collection, 31 entries across 4 domains |
| `/benchmarks/[slug]` | Per-benchmark page: description, code, papers, leaderboard, curation gaps |
| `/models` | Guard models, safety-aligned models, detectors, agents |
| `/datasets` | Safety instruction, preference, red team, agent trajectory, adversarial data |
| `/tools` | Libraries, frameworks, attack/defense toolkits |
| `/papers` | 1,050-paper research library — domain, then research/survey, then area |
| `/leaderboard` | 77 scored entries across 9 adversarial-robustness boards |
| `/community` | Partner institutions |
| `/about` | Mission, contact, coverage summary |

## Content pipeline

`src/data/site.ts` is **generated**. Do not edit it by hand.

```bash
python3 scripts/fetch-metadata.py      # GitHub / arXiv / Hugging Face metadata
python3 scripts/fetch-benchmarks.py    # resolve the benchmarks named in the spec
python3 scripts/parse-awesome.py       # parse the large-model-safety list
python3 scripts/parse-embodied.py      # parse the embodied-ai-safety list
python3 scripts/resolve-paper-links.py # look up missing arXiv ids (slow, resumable)
python3 scripts/merge-papers.py        # merge both lists, tag by domain, dedupe
python3 scripts/fetch-benchmark-candidates.py  # resolve benchmark citations to repos
python3 scripts/verify-benchmark-repos.py      # confirm each match against its README
python3 scripts/generate-site.py       # rebuild src/data/*.ts
```

| Source | What it provides |
| --- | --- |
| `scripts/data/home.json` | Entry names, descriptions, links, tags, images — from `OpenTAI/opentai.github.io` → `content/pages/home.md` |
| `scripts/data/leaderboards.json` | 77 scored leaderboard rows — from the same repo's `content/pages/leaderboards.md` |
| `scripts/data/awesome.md` | Bibliography from `xingjunm/Awesome-Large-Model-Safety` — LLMs, Agents, Vision & Multimodal |
| `scripts/data/embodied.md` | Bibliography from `x-zheng16/Awesome-Embodied-AI-Safety` — Embodied AI |
| `scripts/data/opentai-papers.json` | OpenTAI's own six papers; three appear in neither survey list |
| `scripts/data/benchmark-overrides.json` | Hand-checked verdicts where automatic repository matching went wrong |
| `scripts/data/benchmark-curation.json` | Hand-curated Dataset / Metrics / Baselines / Leaderboard per benchmark, each field tagged with the source it was read from |
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
- Hand-curated benchmark fields carry a `source` string that is rendered on the
  page. If you add one, read it out of a primary source and say which.

Category groupings and page copy are **authored** for this rebuild — they are
the part most in need of review, and live near the top of
`scripts/generate-site.py`.

## Newsletter signup

The subscribe box on Discover renders but stays disabled until a provider is
connected. Set `newsletter.endpoint` in `scripts/generate-site.py` (search for
`export const newsletter`) to the form action URL from Buttondown / Mailchimp /
Formspree, then regenerate. The form posts `email` and `language` (`en` | `zh`).

A static export cannot receive email addresses or send mail on its own — the
"OpenTAI Daily" digest agent is a separate backend service, not part of this
site.

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
- Half of the large-model-safety list (vision, VLP, VLM, diffusion — 288
  papers) belongs to none of the three domains the team named, so a fourth,
  **Vision & Multimodal**, was added rather than dropping them.
- Neither survey list has a datasets section, so Datasets still holds only
  OpenTAI's own eight entries.
- The Survey tab is small by construction: both lists collect the papers a
  survey reviews, not surveys themselves. 14 of 1,050 are surveys.
- Governance, contributing, and citation on the About page are **drafts**,
  marked as such on the page itself. They need confirming or rewriting by the
  OpenTAI team. Workshops, challenges, and contributor content on Community
  still have no source at all.
- Chinese-language fields (`titlezh`) exist upstream but the language switcher
  is commented out; the rebuild is English-only.

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
