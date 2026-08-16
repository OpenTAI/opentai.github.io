<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# OpenTAI website — rules for anyone working on this repo

Read `README.md` for the site map and the data pipeline, and `HANDOVER.md` for
what is done, what is pending, and who decides what.

## The one rule that matters

**Never invent content.** This site indexes other people's research. Every
name, link, author list, venue, score and description on it must come from a
source you can point at — a repository, an API response, a paper abstract, or
the OpenTAI team.

If you cannot verify something, leave it empty and label it. The site already
does this in several places on purpose: `Not recorded yet`, `Still missing`,
`No entries yet`, `DRAFT — pending confirmation`. Those labels are features.
Filling them with plausible text would be the single worst thing you could do
to this project, because a reader cannot tell invented content from real
content, and the whole value of the site is that they don't have to.

Concretely, this has already caught real errors:

- A GitHub search matched `WASP` to a web framework with 18k stars. The real
  benchmark is `facebookresearch/wasp` with 98. Name matching is not evidence.
- Three of OpenTAI's own papers were about to be dropped because they were
  assumed to be in a survey list they were not in.
- The current OpenTAI site links a project page that 404s. It is excluded here
  rather than shipped.

When automated matching is not reliable enough, verify by hand and record the
verdict with its reason — see `scripts/data/benchmark-overrides.json`.

## Do not hand-edit generated data

`src/data/site.ts`, `src/data/papers.ts` and `src/data/paper-search.ts` are
**generated**. Edit the sources under `scripts/data/` or the logic in
`scripts/generate-site.py`, then regenerate:

```bash
python3 scripts/generate-site.py
```

Hand edits are silently destroyed on the next run.

## Before you say something works

```bash
npx tsc --noEmit          # types
npm run lint              # lint
npm run build             # static export, 43 pages
python3 scripts/check-links.py   # every external link, currently 93 with 0 broken
```

Do not report a change as done without running the build. If you change
anything that renders, look at it in a browser too.

## Things that will bite you

- `npm run dev` and `rm -rf .next` at the same time corrupts the dev server.
  Stop the server first.
- Tailwind v4 only sees class names that appear as **literal strings** in the
  source. Building a class name by concatenation silently produces no styles.
- Object keys with hyphens must be quoted in the generated TypeScript; the
  serializer in `generate-site.py` handles this — do not bypass it.
- Search-engine indexing is opt-in. A build only allows indexing when
  `NEXT_PUBLIC_SITE_URL` is exactly `https://opentai.org`; everything else
  serves `Disallow: /` plus a `noindex` tag. Preview links must stay noindexed.

## Scope discipline

The OpenTAI team decides what the site says about itself: governance, citation
text, which external resources are in scope, and anything involving real
people's data. Do not draft those on their behalf without being asked, and mark
anything provisional as a draft on the page itself.
