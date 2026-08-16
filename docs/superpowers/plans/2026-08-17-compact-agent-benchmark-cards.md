# Compact Agent Benchmark Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish benchmark collection cards that show only the verified evaluation focus and simulation/real-interaction classification for Safety at Scale Agent benchmarks.

**Architecture:** Add a pure presentation adapter in `src/lib` that derives list-card tags and copy from the existing generated row without mutating provenance. Call that adapter only from the benchmark grid-card renderer; detail pages and generated source data remain unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Node test runner, Python data generator, Vercel CLI.

## Global Constraints

- Do not invent or rewrite any benchmark fact, classification, scale, or URL.
- Hide provenance only on the collection card; retain source links and detail-page provenance.
- Do not hand-edit generated files.
- Preserve preview-domain `noindex` behavior.

---

### Task 1: Add the benchmark-card presentation adapter

**Files:**
- Create: `src/lib/benchmark-card-presentation.ts`
- Create: `src/lib/benchmark-card-presentation.test.mjs`

**Interfaces:**
- Consumes: `{ kind, locale, note, tags }`, where `kind` is `"benchmark" | "dataset"` and `locale` is `"en" | "zh"`.
- Produces: `benchmarkCardPresentation(input): { note: string; tags: string[] }`.

- [ ] **Step 1: Write the failing tests**

  Add literal English and Chinese expectations for a Safety at Scale simulation benchmark. Assert that the result keeps the interaction-mode tag, removes `source: safety-at-scale`, returns only `Evaluation focus: …` / `测评重点：…`, and leaves a non-Safety-at-Scale dataset row unchanged.

- [ ] **Step 2: Run the test to verify RED**

  Run: `node --test src/lib/benchmark-card-presentation.test.mjs`

  Expected: FAIL because `benchmark-card-presentation.ts` does not exist.

- [ ] **Step 3: Implement the minimal pure adapter**

  Recognize the exact generated sentence with an anchored regular expression. For qualifying benchmark rows, filter only the source chip and derive the focus copy from the captured verified English focus using the existing localization function. Return all other rows unchanged.

- [ ] **Step 4: Run the focused test to verify GREEN**

  Run: `node --test src/lib/benchmark-card-presentation.test.mjs`

  Expected: all adapter tests PASS.

### Task 2: Apply the adapter only to benchmark collection cards

**Files:**
- Modify: `src/components/subpage-layout.tsx:180-245`

**Interfaces:**
- Consumes: `benchmarkCardPresentation({ kind, locale, note: row.note, tags: row.tags ?? [] })`.
- Produces: the tags and description rendered by `ResourceGridCard`; no generated row is mutated.

- [ ] **Step 1: Import and call the adapter in `ResourceGridCard`**

  Compute one `presentation` value and render `presentation.tags` and `presentation.note` in place of the raw row values.

- [ ] **Step 2: Run focused and existing Node tests**

  Run: `node --test src/lib/*.test.mjs`

  Expected: all Node tests PASS.

- [ ] **Step 3: Regenerate and confirm generated data remains source-controlled**

  Run: `python3 scripts/generate-site.py`

  Expected: generation succeeds; no hand edits exist in generated TypeScript.

### Task 3: Verify, inspect, and publish

**Files:**
- Modify only generated files if the generator legitimately changes them.

**Interfaces:**
- Consumes: the completed source change.
- Produces: a verified Git commit on `gabry/main` and a production Vercel deployment.

- [ ] **Step 1: Run the full local verification gate**

  Run Python tests, all Node tests, `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `python3 scripts/check-links.py`.

- [ ] **Step 2: Inspect English and Chinese benchmark pages locally**

  Confirm the affected cards show only the domain tag, interaction-mode tag, and evaluation focus; confirm detail pages still expose source links.

- [ ] **Step 3: Commit and push**

  Commit the plan, adapter, tests, and component integration; push the current branch to `gabry/main`.

- [ ] **Step 4: Deploy production and verify the public URL**

  Deploy to the existing `opentai-gabry` Vercel project, verify HTTP 200 and `noindex`, and open the Chinese benchmark page for the user.
