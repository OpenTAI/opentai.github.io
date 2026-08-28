# Dataset Catalog Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make dataset cards accurately describe their datasets, clearly distinguish downloads from browsable pages, highlight meaningful tags, and publish only directly trustworthy-AI-relevant records.

**Architecture:** Add pure presentation helpers for URL action labels and badge roles. Add canonical summary and scope-review fields to the dataset source, validate them in the generator, and keep exclusions in a separate audit ledger.

**Tech Stack:** Python 3 generator and JSON sources, TypeScript, React 19, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-28-page-header-and-catalog-unification-design.md`

## Global Constraints

- Every summary, scope decision, venue, and link must point to an official dataset card, repository, primary paper, or OpenTAI-team source.
- Never infer relevance from a name alone.
- Missing verified descriptions render the existing missing-content label.
- Generated TypeScript files are regenerated, not hand-edited.

---

### Task 1: Add Deterministic Dataset Action Labels

**Files:**
- Modify: `src/lib/resource-catalog-presentation.ts`
- Modify: `src/lib/resource-catalog-presentation.test.mjs`
- Modify: `src/components/subpage-layout.tsx`
- Modify: `src/lib/i18n.ts`

**Interfaces:**
- Produces: `datasetActionLabel(href: string): "Download" | "Open dataset"`.
- Direct-file detection uses the parsed URL pathname and an allowlist of data/archive extensions; page URLs remain `Open dataset`.

- [ ] **Step 1: Write table-driven failing tests**

Cover `.zip`, `.tgz`, `.tar.gz`, `.csv`, `.jsonl`, `.parquet` as Download and Hugging Face, GitHub, and project pages as Open dataset.

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test src/lib/resource-catalog-presentation.test.mjs`

Expected: FAIL because `datasetActionLabel` is absent.

- [ ] **Step 3: Implement the pure helper and consume it in cards**

Parse with `new URL(href).pathname.toLowerCase()` and return Download only for the tested extension allowlist. Translate `Download` in Chinese.

- [ ] **Step 4: Run tests and commit**

Run: `node --test src/lib/resource-catalog-presentation.test.mjs`

```bash
git add src/lib/resource-catalog-presentation.ts src/lib/resource-catalog-presentation.test.mjs src/components/subpage-layout.tsx src/lib/i18n.ts
git commit -m "fix: label direct dataset downloads"
```

### Task 2: Normalize Dataset Badges And Highlight Topic Tags

**Files:**
- Modify: `scripts/data/training-datasets.json`
- Modify: `scripts/generate-site.py`
- Modify: `src/components/subpage-layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/lib/dataset-statistics.test.mjs`
- Regenerate: `src/data/site.ts`
- Regenerate: `src/data/datasets.ts`

**Interfaces:**
- `NIPS` source label becomes source-backed `NeurIPS`.
- Stanford Alpaca no longer uses `GitHub repository` as `venue`.
- Resource card badges receive explicit role classes for type, venue, and topic.

- [ ] **Step 1: Write failing source and class-role tests**

Require NeurIPS, reject Stanford Alpaca's repository venue, and require `resource-grid-badge-type`, `resource-grid-badge-venue`, and `resource-grid-badge-topic` classes.

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test src/lib/dataset-statistics.test.mjs`

Expected: FAIL on the old labels and undifferentiated badges.

- [ ] **Step 3: Correct canonical data, markup, and styles**

Keep Stanford Alpaca's GitHub resource link. Use distinct but existing-palette colors for topic badges and neutral styling for venue metadata.

- [ ] **Step 4: Regenerate, test, and commit**

Run: `python3 scripts/generate-site.py && node --test src/lib/dataset-statistics.test.mjs`

```bash
git add scripts/data/training-datasets.json scripts/generate-site.py src/components/subpage-layout.tsx src/app/globals.css src/lib/dataset-statistics.test.mjs src/data/site.ts src/data/datasets.ts
git commit -m "fix: clarify dataset badges"
```

### Task 3: Add Source-Backed Dataset Summaries

**Files:**
- Modify: `scripts/data/training-datasets.json`
- Modify: `scripts/generate-site.py`
- Create: `scripts/test_dataset_catalog.py`
- Regenerate: `src/data/site.ts`
- Regenerate: `src/data/datasets.ts`

**Interfaces:**
- Canonical records may provide `summary` and `summarySourceUrl`.
- Generator uses `summary` for `row.note`; otherwise it emits `Description not recorded yet.`.

- [ ] **Step 1: Write failing generator validation tests**

Require every non-empty summary to have an HTTP(S) `summarySourceUrl`, reject training-evidence prose as rendered card copy, and require the explicit missing-description fallback.

- [ ] **Step 2: Run tests to verify failure**

Run: `python3 -m unittest scripts/test_dataset_catalog.py`

Expected: FAIL because summaries are not yet a canonical field.

- [ ] **Step 3: Populate only verified summaries and update generator mapping**

Use existing official source fields where they directly support a concise dataset description. Leave records without such text on the explicit missing-description fallback; do not paraphrase unsupported details.

- [ ] **Step 4: Regenerate and run tests**

Run: `python3 scripts/generate-site.py && python3 -m unittest scripts/test_dataset_catalog.py`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/data/training-datasets.json scripts/generate-site.py scripts/test_dataset_catalog.py src/data/site.ts src/data/datasets.ts
git commit -m "fix: publish sourced dataset summaries"
```

### Task 4: Audit Direct Trustworthy-AI Relevance

**Files:**
- Create: `scripts/data/dataset-scope-audit.json`
- Modify: `scripts/generate-site.py`
- Modify: `scripts/test_dataset_catalog.py`
- Modify: `README.md`
- Regenerate: `src/data/site.ts`
- Regenerate: `src/data/datasets.ts`

**Interfaces:**
- Each audit record is `{ "name": string, "status": "keep" | "exclude", "reason": string, "sourceUrl": string }`.
- Generator accepts only names with a complete audit record and publishes only `keep` rows.

- [ ] **Step 1: Write failing completeness and filtering tests**

Require one unique audit record per canonical dataset, HTTP(S) source URLs, non-empty reasons, allowed statuses, no unknown names, and generated output that excludes `exclude` rows.

- [ ] **Step 2: Run tests to verify failure**

Run: `python3 -m unittest scripts/test_dataset_catalog.py`

Expected: FAIL because the audit ledger does not exist.

- [ ] **Step 3: Review and record every dataset**

Use the canonical paper, official repository, dataset card, and recorded evidence. Keep only datasets whose content or primary purpose directly supports the approved safety/trustworthiness categories; exclude generic incidental training corpora with an explicit reason.

- [ ] **Step 4: Filter in the generator and document the new count/provenance**

Load and validate the audit before building dataset rows. Update README counts and provenance from regenerated output rather than retaining `155` as a hard-coded claim.

- [ ] **Step 5: Regenerate and run data tests**

Run: `python3 scripts/generate-site.py && python3 -m unittest scripts/test_dataset_catalog.py && node --test src/lib/dataset-statistics.test.mjs src/lib/hub-categories.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/data/dataset-scope-audit.json scripts/generate-site.py scripts/test_dataset_catalog.py README.md src/data/site.ts src/data/datasets.ts
git commit -m "feat: audit dataset safety relevance"
```

### Task 5: Full Verification And Visual QA

**Files:**
- Create: `design-qa.md`

**Interfaces:**
- Final QA result is `passed` only after reference and local captures have been compared at matching viewports.

- [ ] **Step 1: Run all repository tests**

Run: `node --test src/lib/*.test.mjs && python3 -m unittest scripts/test_dataset_catalog.py`

- [ ] **Step 2: Run required quality gates**

Run: `npx tsc --noEmit && npm run lint && npm run build && python3 scripts/check-links.py`

- [ ] **Step 3: Inspect English and Chinese routes in the in-app browser**

Check homepage, Community, Benchmarks, Datasets, Leaderboards, Arenas, Startups, footer, contact dialog, submission dialog, a direct-download dataset, and a browsable dataset at desktop and mobile widths.

- [ ] **Step 4: Compare captures and record QA**

Write `design-qa.md` with the reference, local capture, issues, fixes, and `final result: passed`. Fix all P0/P1/P2 issues before proceeding.

- [ ] **Step 5: Re-run the build after visual fixes and commit**

```bash
git add design-qa.md src scripts README.md
git commit -m "test: verify unified catalog experience"
```
