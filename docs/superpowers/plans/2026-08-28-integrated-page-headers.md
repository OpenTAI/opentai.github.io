# Integrated Page Headers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the duplicate heroes on Community, Benchmarks, Datasets, Leaderboards, and Arenas into each page's first content section and remove decorative pre-headings.

**Architecture:** Add a reusable `IntegratedSectionHeading` presentation component. `SimplePage` gains an explicit hero visibility flag, resource catalogs place the integrated header inside `ResourceStatistics`, and ranking pages place it inside `ArenaScoreboardGrid`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 plus `src/app/globals.css`, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-28-page-header-and-catalog-unification-design.md`

## Global Constraints

- Do not hand-edit generated files under `src/data/`.
- Preserve one visible `h1` per page and retain accessible dialog labels.
- Keep chart titles, form labels, filters, table headers, and factual statistics.
- Do not add dependencies or new routes.

---

### Task 1: Add The Shared Integrated Heading

**Files:**
- Create: `src/components/integrated-section-heading.tsx`
- Create: `src/lib/page-header-unification.test.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `IntegratedSectionHeading({ action, icon, stats, summary, title }: IntegratedSectionHeadingProps)`.
- `stats` is `readonly { label: string; value: number | string }[]`.

- [ ] **Step 1: Write the failing source and rendering-contract test**

Assert the component exports `IntegratedSectionHeading`, renders `integrated-section-heading`, `integrated-section-icon`, one `h1`, optional statistic pills, summary, and action slots.

- [ ] **Step 2: Run the test to verify failure**

Run: `node --test src/lib/page-header-unification.test.mjs`

Expected: FAIL because `integrated-section-heading.tsx` does not exist.

- [ ] **Step 3: Implement the reusable component and literal CSS classes**

The component must translate labels with `t(locale, label)`, format numeric values with `toLocaleString("en-US")`, and use literal class names so Tailwind v4 sees them.

- [ ] **Step 4: Run the test**

Run: `node --test src/lib/page-header-unification.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/integrated-section-heading.tsx src/lib/page-header-unification.test.mjs src/app/globals.css
git commit -m "feat: add integrated section heading"
```

### Task 2: Merge Community And Ranking Page Headers

**Files:**
- Modify: `src/components/simple-page.tsx`
- Modify: `src/components/community-page-view.tsx`
- Modify: `src/components/leaderboard-page-view.tsx`
- Modify: `src/components/arena-page.tsx`
- Modify: `src/components/arena-scoreboard-grid.tsx`
- Modify: `src/lib/page-header-unification.test.mjs`
- Modify: `src/lib/leaderboard-presentation.test.mjs`
- Modify: `src/lib/arena-competition.test.mjs`
- Modify: `src/lib/site-content.test.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- `SimplePage` consumes `showHero?: boolean`, defaulting to `true`.
- `ArenaScoreboardGrid` continues to consume `kind`, `locale`, and `records`; it owns the ranking submission action based on `kind`.

- [ ] **Step 1: Write failing tests for exactly one page heading**

Tests must require `showHero={false}` on Community, Leaderboards, and Arenas; require `IntegratedSectionHeading` inside Community and `ArenaScoreboardGrid`; and reject the old hero submission action in page wrappers.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `node --test src/lib/page-header-unification.test.mjs src/lib/leaderboard-presentation.test.mjs src/lib/arena-competition.test.mjs src/lib/site-content.test.mjs`

Expected: FAIL on the old hero contracts.

- [ ] **Step 3: Add `showHero` and merge Community**

Default `showHero` to `true` in `SimplePage`; conditionally render `subpage-hero-card`. Community passes `showHero={false}` and renders the shared integrated heading with icon `◉` and title `OpenTAI Community` in the introduction card.

- [ ] **Step 4: Merge Leaderboards and Arenas**

Both wrappers pass `showHero={false}` and stop rendering `heroAside`. `ArenaScoreboardGrid` renders one shared heading with icon `L` or `A`, the localized directory title, the existing directory summary, and `ResourceSubmissionDialog` for the matching kind.

- [ ] **Step 5: Update styles and run focused tests**

Run the Step 2 command.

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/simple-page.tsx src/components/community-page-view.tsx src/components/leaderboard-page-view.tsx src/components/arena-page.tsx src/components/arena-scoreboard-grid.tsx src/lib/page-header-unification.test.mjs src/lib/leaderboard-presentation.test.mjs src/lib/arena-competition.test.mjs src/lib/site-content.test.mjs src/app/globals.css
git commit -m "feat: merge community and ranking headers"
```

### Task 3: Merge Benchmark And Dataset Headers Into Statistics

**Files:**
- Modify: `src/components/subpage-layout.tsx`
- Modify: `src/lib/page-header-unification.test.mjs`
- Modify: `src/lib/dataset-statistics.test.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- `ResourceStatistics` receives the existing resource kind, rows, locale, title, icon, category count, venue count, and link count.
- The existing chart computation and chart titles remain unchanged.

- [ ] **Step 1: Write failing tests for the merged resource header**

Require resource-card catalogs to skip `subpage-hero-card`, require `IntegratedSectionHeading` in `ResourceStatistics`, require the submission action there, and reject visible `Benchmark Statistics` / `Dataset Statistics` section headings.

- [ ] **Step 2: Run focused tests to verify failure**

Run: `node --test src/lib/page-header-unification.test.mjs src/lib/dataset-statistics.test.mjs`

Expected: FAIL against the standalone hero and statistics heading.

- [ ] **Step 3: Move the header into `ResourceStatistics`**

Render the standalone hero only when `resourceCardKind` is absent. Pass the title, icon, four existing statistic values, and `ResourceSubmissionDialog` into the statistics section's integrated heading. Remove only the redundant overall Statistics heading.

- [ ] **Step 4: Run focused tests**

Run the Step 2 command.

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/subpage-layout.tsx src/lib/page-header-unification.test.mjs src/lib/dataset-statistics.test.mjs src/app/globals.css
git commit -m "feat: merge resource catalog headers"
```

### Task 4: Remove Decorative Pre-Headings And Visible Contact Recipient

**Files:**
- Modify: `src/components/contact-dialog.tsx`
- Modify: `src/components/contribution-dialog.tsx`
- Modify: `src/components/resource-submission-dialog.tsx`
- Modify: `src/components/community-page-view.tsx`
- Modify: `src/components/subscribe.tsx`
- Modify: `src/components/text-arena-overview.tsx`
- Modify: `src/components/arena-results-chart.tsx`
- Modify: `src/lib/page-header-unification.test.mjs`
- Modify: `src/lib/site-content.test.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- Contact mail submission continues to call `buildContactMailtoUrl(email, values)`.
- Dialog `aria-labelledby` continues to point to the visible `h2`.

- [ ] **Step 1: Add failing absence tests**

Reject the known decorative strings in their rendering components and reject `contact-dialog-email`, while requiring the configured email to remain passed into `buildContactMailtoUrl`.

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test src/lib/page-header-unification.test.mjs src/lib/site-content.test.mjs`

Expected: FAIL on the currently rendered pre-headings.

- [ ] **Step 3: Remove decorative markup and obsolete CSS**

Remove only the approved pre-heading nodes and the recipient anchor. Keep the neutral mail-app note, visible headings, field labels, status text, and chart titles.

- [ ] **Step 4: Run tests**

Run the Step 2 command.

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/contact-dialog.tsx src/components/contribution-dialog.tsx src/components/resource-submission-dialog.tsx src/components/community-page-view.tsx src/components/subscribe.tsx src/components/text-arena-overview.tsx src/components/arena-results-chart.tsx src/lib/page-header-unification.test.mjs src/lib/site-content.test.mjs src/app/globals.css
git commit -m "fix: remove decorative pre-headings"
```
