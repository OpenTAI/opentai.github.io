# Navigation Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make top navigation, homepage entry pills, breadcrumbs, metadata, and footer use one approved public taxonomy.

**Architecture:** Keep routes stable while changing display labels and generated homepage card configuration. Count lookup on the homepage becomes explicit so non-collection destinations can be rendered safely.

**Tech Stack:** Next.js 16, React 19, TypeScript, Python generator, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-28-page-header-and-catalog-unification-design.md`

## Global Constraints

- Preserve `/companies` and `/zh/companies` routes.
- Edit `scripts/generate-site.py`, then regenerate; never hand-edit generated data.
- Footer exposes only published destinations.

---

### Task 1: Update Navigation And Footer Taxonomy

**Files:**
- Modify: `src/lib/site-navigation.test.mjs`
- Modify: `src/lib/site-navigation.ts`
- Modify: `src/components/page-breadcrumb.tsx`
- Modify: `src/lib/i18n.ts`

**Interfaces:**
- `navigationGroups` and `footerNavigationGroups` keep their existing types.
- `Startups` maps to `/companies` in breadcrumb routing and localization.

- [ ] **Step 1: Change exact-structure tests to the approved taxonomy**

Expect Resources in order Benchmarks, Models, Datasets; Ecosystem to use Startups; and footer groups Research, Resources, Evaluation, Ecosystem, Terms & Policies with only Terms Of Use in the final group.

- [ ] **Step 2: Run the test to verify failure**

Run: `node --test src/lib/site-navigation.test.mjs`

Expected: FAIL with the old order and footer groups.

- [ ] **Step 3: Implement the taxonomy and localization**

Update the arrays, add the `Startups` breadcrumb mapping, and add `Startups: "初创企业"` while retaining `Companies` localization for source data that still uses it.

- [ ] **Step 4: Run the test**

Run: `node --test src/lib/site-navigation.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/site-navigation.test.mjs src/lib/site-navigation.ts src/components/page-breadcrumb.tsx src/lib/i18n.ts
git commit -m "fix: align navigation taxonomy"
```

### Task 2: Rename The Companies Presentation To Startups

**Files:**
- Modify: `src/components/ecosystem-catalog-page.tsx`
- Modify: `src/app/companies/page.tsx`
- Modify: `src/app/zh/companies/page.tsx`
- Modify: `src/lib/ecosystem-catalog.test.mjs`

**Interfaces:**
- `kind="companies"` remains an internal data discriminator.
- Public English copy uses `Startups`; routes and exported data names remain unchanged.

- [ ] **Step 1: Write failing presentation tests**

Require breadcrumb/title/heading and metadata to say Startups while still loading `ecosystemCompanies` and serving `/companies`.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `node --test src/lib/ecosystem-catalog.test.mjs`

Expected: FAIL on Companies copy.

- [ ] **Step 3: Update public copy and metadata**

Change the English presentation to Startups and the Chinese presentation to 初创企业 without renaming internal data keys.

- [ ] **Step 4: Run tests and commit**

Run: `node --test src/lib/ecosystem-catalog.test.mjs`

```bash
git add src/components/ecosystem-catalog-page.tsx src/app/companies/page.tsx src/app/zh/companies/page.tsx src/lib/ecosystem-catalog.test.mjs
git commit -m "fix: present companies as startups"
```

### Task 3: Add All Public Destinations To Homepage Pills

**Files:**
- Modify: `src/lib/hub-categories.test.mjs`
- Modify: `scripts/generate-site.py`
- Modify: `src/components/discover.tsx`
- Regenerate: `src/data/site.ts`

**Interfaces:**
- `homeCategoryCards` contains the approved eight cards in display order.
- Homepage count lookup supports Papers, Benchmarks, Models, Datasets, Leaderboards, Arenas, Startups, and Community without indexing `subpageConfigs` with an unsupported slug.

- [ ] **Step 1: Write the failing eight-card test**

Expect exact title/href pairs for the eight approved destinations.

- [ ] **Step 2: Run it to verify failure**

Run: `node --test src/lib/hub-categories.test.mjs`

Expected: FAIL because only four cards exist.

- [ ] **Step 3: Extend canonical `HOME_CARDS` and explicit count lookup**

Add the four new generated cards. In `discover.tsx`, use an explicit href-to-count function backed by `paperLibrary`, `subpageConfigs`, `leaderboards.directory`, `arenaDirectory`, `ecosystemCompanies`, and `partners`; do not index collection configs with arbitrary slugs.

- [ ] **Step 4: Regenerate and run tests**

Run: `python3 scripts/generate-site.py && node --test src/lib/hub-categories.test.mjs src/lib/site-navigation.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-site.py src/components/discover.tsx src/data/site.ts src/lib/hub-categories.test.mjs
git commit -m "feat: expose all public homepage destinations"
```
