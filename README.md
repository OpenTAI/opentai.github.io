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
| `/` | Discover — site-wide search, newsletter signup, trending, latest releases, news |
| `/benchmarks` | Flagship collection, 10-category taxonomy |
| `/benchmarks/[slug]` | Per-benchmark page: description, code, papers, leaderboard, curation gaps |
| `/models` | Guard models, safety-aligned models, detectors, agents |
| `/datasets` | Safety instruction, preference, red team, agent trajectory, adversarial data |
| `/tools` | Libraries, frameworks, attack/defense toolkits |
| `/papers` | OpenTAI papers with code + a 571-paper research library |
| `/leaderboard` | 77 scored entries across 9 adversarial-robustness boards |
| `/community` | Partner institutions |
| `/about` | Mission, contact, coverage summary |

## Content pipeline

`src/data/site.ts` is **generated**. Do not edit it by hand.

```bash
python3 scripts/fetch-metadata.py      # GitHub / arXiv / Hugging Face metadata
python3 scripts/fetch-benchmarks.py    # resolve the benchmarks named in the spec
python3 scripts/parse-awesome.py       # parse the survey list into paper entries
python3 scripts/resolve-paper-links.py # look up missing arXiv ids (slow, resumable)
python3 scripts/generate-site.py       # rebuild src/data/site.ts
```

| Source | What it provides |
| --- | --- |
| `scripts/data/home.json` | Entry names, descriptions, links, tags, images — from `OpenTAI/opentai.github.io` → `content/pages/home.md` |
| `scripts/data/leaderboards.json` | 77 scored leaderboard rows — from the same repo's `content/pages/leaderboards.md` |
| `scripts/data/awesome.md` | The survey bibliography from `xingjunm/Awesome-Large-Model-Safety` |
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
- The current site lists the toolkit as `BlackdoorLLM`; the repository is
  `bboylyg/BackdoorLLM`. The site's spelling was kept.
- `content/pages/newslist.md` upstream contains one item whose body is
  placeholder lorem-ipsum text, so it was not ported.
- Governance, citation, workshops, challenges, and contributor content have no
  upstream source and were not drafted.
- Chinese-language fields (`titlezh`) exist upstream but the language switcher
  is commented out; the rebuild is English-only.

## Deployment

`.github/workflows/deploy-pages.yml` builds the static export and publishes to
GitHub Pages. `next.config.ts` derives `basePath` from `GITHUB_REPOSITORY`, so
it works both as an organisation site (`*.github.io`) and at a sub-path.

The project is deliberately **not** a git repository yet — the destination
repository has not been decided.
