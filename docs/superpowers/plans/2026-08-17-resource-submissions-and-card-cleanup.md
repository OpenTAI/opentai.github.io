# Resource submissions and card cleanup implementation plan

> Execute locally first. Do not push or deploy until the user approves the browser result.

## Goal

Make the benchmark, dataset, and leaderboard (Arena) pages easier to scan and contribute to without changing or inventing any indexed research data.

## Constraints

- Keep the static-export architecture; submissions open a prefilled GitHub issue and do not require a backend.
- Do not edit generated TypeScript data files by hand.
- Preserve the full source title and source record; only compact the title shown on list cards.
- Show only statistics derivable from existing rows, and omit unavailable values.
- Keep preview deployments noindexed.

## Task 1: Add tested presentation helpers

**Files:**

- Add `src/lib/resource-catalog-presentation.ts`
- Add `src/lib/resource-catalog-presentation.test.mjs`

1. Write failing tests for:
   - returning the text before the first colon as the compact card title;
   - leaving titles without a colon unchanged;
   - deriving entry count, recorded year range, verified GitHub-link count, total links, downloads, and stars only from recorded fields;
   - omitting summary values that cannot be calculated.
2. Run the test file and confirm it fails because the helper does not exist.
3. Implement the smallest pure helper functions needed by the UI.
4. Run the test file and confirm it passes.

## Task 2: Add tested GitHub submission helpers

**Files:**

- Add `src/lib/resource-submission.ts`
- Add `src/lib/resource-submission.test.mjs`

1. Write failing tests for required name/year/GitHub URL, optional ordinary link, GitHub host validation, and a correctly encoded `GabryGao/opentai` issue URL.
2. Run the test file and confirm it fails.
3. Implement validation and issue-URL construction as pure functions.
4. Run the test file and confirm it passes.

## Task 3: Build the shared submission dialog

**Files:**

- Add `src/components/resource-submission-dialog.tsx`
- Modify `src/lib/i18n.ts`
- Modify `src/app/globals.css`

1. Build one accessible client-side dialog used for Benchmark, Dataset, and Arena.
2. Collect Name, Year, optional Link, and required GitHub Link.
3. Show inline bilingual validation and open a prefilled GitHub issue only after validation succeeds.
4. State that submissions are reviewed and verified before inclusion.
5. Use literal Tailwind/CSS class names only.

## Task 4: Clean up benchmark and dataset cards

**Files:**

- Modify `src/components/subpage-layout.tsx`
- Modify `src/components/collection-page-view.tsx` if required by prop wiring
- Modify `src/app/globals.css`

1. Make the Links disclosure controlled so only one is open at a time.
2. Close an open disclosure on outside click and Escape while preserving keyboard access.
3. Render compact list titles using the tested prefix helper; keep full details/source values unchanged.
4. Remove the visible collection heading for benchmark/dataset resource grids.
5. Render a compact computed statistics row above the grid.
6. Replace the hero overview text with the matching Submit CTA.

## Task 5: Add Arena statistics and submission

**Files:**

- Modify `src/components/simple-page.tsx`
- Modify `src/components/leaderboard-page-view.tsx`
- Inspect and, if needed, modify `src/components/leaderboard-view.tsx`

1. Add a reusable hero-aside slot without changing other simple pages.
2. Derive Arena summary values from the existing leaderboard data.
3. Replace the leaderboard hero overview with `Submit your Arena`.
4. Show the compact Arena statistics row before the tables.

## Task 6: Verify locally in both languages

1. Run all relevant node tests, then `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `python3 scripts/check-links.py`.
2. Start the dev server without deleting `.next` while it is running.
3. Inspect `/benchmarks/`, `/datasets/`, `/leaderboard/` and their `/zh/` equivalents in the browser.
4. Check desktop and mobile widths, title compaction, outside-click closing, form validation, and the generated GitHub issue URL.
5. Give the user the local URLs and wait for approval before any push or deployment.
