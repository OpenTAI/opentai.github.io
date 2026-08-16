# Paper-derived Dataset Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a source-backed, deduplicated Dataset catalog from all 772 approved papers and replace the simple statistics bars with full SVG analytics and filters.

**Architecture:** A cached arXiv digest feeds a conservative candidate extractor. Audited mention records plus explicit alias overrides generate unique dataset cards, usage counts, citing-paper disclosures, and chart series. The static Next.js UI consumes only generated TypeScript data.

**Tech Stack:** Python 3, arxiv2agent, JSON source files, Next.js 16, React 19, TypeScript, inline SVG, Tailwind/CSS.

---

### Task 1: Statistics helpers

**Files:**
- Create: `src/lib/dataset-statistics.ts`
- Create: `src/lib/dataset-statistics.test.mjs`

- [ ] Write failing tests for continuous year series, multi-domain counting, unique totals, and usage buckets.
- [ ] Run `node --test src/lib/dataset-statistics.test.mjs` and confirm the module-missing failure.
- [ ] Implement pure helpers returning chart-ready arrays without React or browser dependencies.
- [ ] Run the focused test and the existing resource-sort tests.

### Task 2: SVG analytics and catalog controls

**Files:**
- Modify: `src/components/subpage-layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/lib/i18n.ts`

- [ ] Add a failing source-level/DOM test for accessible chart labels and filter labels.
- [ ] Implement a smooth line/area SVG, domain donut, and usage-frequency chart from Task 1 helpers.
- [ ] Replace the compact statistics grid with the reference layout and responsive mobile stacking.
- [ ] Add large search, domain pills, sort control, and inline citing-paper disclosure while preserving direct title links.
- [ ] Verify the Dataset page in English and Chinese at desktop and mobile widths.

### Task 3: Paper digest manifest

**Files:**
- Create: `scripts/build-paper-digest-manifest.py`
- Create: `scripts/tests/test_build_paper_digest_manifest.py`
- Generate: `tmp/paper-corpus/`

- [ ] Write failing tests proving stable deduplication of arXiv IDs and explicit unresolved-paper output.
- [ ] Implement manifest generation from `scripts/data/paper-library.json`.
- [ ] Run one rate-limited `arxiv2agent` command for all manifest IDs; do not parallelize downloads.
- [ ] Record successes and failures without inventing replacements.

### Task 4: Dataset mention extraction

**Files:**
- Create: `scripts/extract-paper-dataset-candidates.py`
- Create: `scripts/tests/test_extract_paper_dataset_candidates.py`
- Generate: `tmp/paper-dataset-candidates.json`

- [ ] Add fixtures covering train, validation, test-only, benchmark-only, and ambiguous sentences/table cells.
- [ ] Verify tests fail before the extractor exists.
- [ ] Extract candidates with paper ID, title, domain, section/table ID, role, exact evidence, and source location.
- [ ] Mark ambiguous and evaluation-only candidates rather than promoting them.

### Task 5: Audited canonical catalog

**Files:**
- Create: `scripts/data/dataset-alias-overrides.json`
- Create: `scripts/data/paper-dataset-mentions.json`
- Modify: `scripts/data/training-datasets.json`
- Modify: `scripts/generate-site.py`
- Modify: `scripts/fetch-metadata.py`

- [ ] Audit candidates by LLMs, Agents, and Embodied AI using cached digests in parallel.
- [ ] Verify official data links and record rejection reasons for false matches and test-only resources.
- [ ] Add explicit aliases only when source evidence shows two names refer to the same dataset.
- [ ] Generate one card per canonical dataset with domains, usage count, and citing papers.
- [ ] Refresh GitHub, arXiv, and Hugging Face metadata.

### Task 6: Full verification

**Files:**
- Modify: `README.md`
- Modify: `HANDOVER.md`

- [ ] Run all Python and Node unit tests.
- [ ] Run `npx tsc --noEmit`, lint, production build, and external-link checks.
- [ ] Browser-check English/Chinese desktop/mobile pages, chart tooltips, filters, sorting, disclosures, and direct links.
- [ ] Update documented counts only from generated output.
