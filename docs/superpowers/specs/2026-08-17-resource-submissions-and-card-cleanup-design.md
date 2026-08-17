# OpenTAI resource submissions and card cleanup

## Goal

Refine the Benchmark, Dataset, and Leaderboard (Arena) pages so resource cards are easier to scan, link menus behave like dismissible popovers, and visitors can submit new sources without adding a backend or exposing credentials.

## Scope

### Shared resource-card interaction

- A resource card's `Links` disclosure closes when the visitor clicks or taps outside it.
- Opening one `Links` disclosure closes any other open resource link disclosure.
- Clicking a link inside the disclosure keeps normal external-link behavior.
- Keyboard and native `<details>` behavior remain available.

### Collection summary row

- Remove the visible `Benchmark platforms` and `Dataset collection` headings above their resource grids.
- Replace them with one compact, automatically calculated summary row.
- Benchmark summaries contain entry count, recorded year range, rows with verified GitHub links, and total verified links.
- Dataset summaries contain entry count, recorded year range, rows with verified GitHub links, and aggregate recorded downloads where available.
- Leaderboard (Arena) uses the same visual treatment with scored entry count, board count, represented models, and source links where available.
- Unknown values are omitted rather than guessed.

### Public submissions

- Add a submission call-to-action to the right side of the hero on:
  - Benchmarks: `Submit your Benchmark`
  - Datasets: `Submit your Dataset`
  - Leaderboard: `Submit your Arena`
- The call-to-action replaces the current hero overview paragraph on those pages.
- Activating it opens a shared, accessible dialog containing:
  - Name — required
  - Year — required
  - Link — optional
  - GitHub Link — required and validated as a `github.com` URL
- Submission opens a prefilled GitHub Issue on `GabryGao/opentai` in a new tab. The issue title identifies the resource kind and name; the body contains only the submitted fields plus a note that the entry requires source verification.
- The website does not claim that a submission is accepted or indexed automatically. Submitted resources remain candidates until reviewed.
- No API token, email address, database, or server-side endpoint is added.

### Display-name cleanup

- Resource cards display only the text before the first colon for long paper-style names.
- Example: `VizWiz Grand Challenge: Answering Visual Questions from Blind People` displays as `VizWiz Grand Challenge`.
- The source record, full title, links, and evidence remain unchanged.
- The same presentation rule applies consistently to Benchmark and Dataset collection cards; detail pages continue to preserve the full verified record.

## Components and data flow

- `ResourceLinksMenu` owns the dismiss-on-outside-click behavior and coordinates open menus.
- A shared submission dialog component receives `benchmark`, `dataset`, or `arena` and constructs an encoded GitHub Issue URL entirely in the browser.
- Collection summaries are derived from the existing generated `SubpageTableRow` data; generated TypeScript data files are not edited by hand.
- Leaderboard summary values are derived from the existing leaderboard tables.
- English and Chinese labels are added through the existing localization layer.

## Error handling

- Empty required fields prevent submission and show an inline validation message.
- A GitHub link that is not HTTPS or does not point to `github.com` is rejected.
- Invalid years are rejected; accepted years are four digits in a reasonable publication range.
- The issue is not created automatically: visitors review GitHub's prefilled form and submit it themselves.

## Verification

- Unit-level tests cover name compaction, summary calculations, form validation, and GitHub Issue URL generation.
- Browser checks cover outside-click dismissal, single-open-menu behavior, all three submission dialogs, bilingual labels, and responsive layout.
- Final verification runs TypeScript, lint, static build, and external link checks.
- The production build must retain the existing preview `noindex` behavior.

## Out of scope

- Automatic approval or ingestion of submitted resources.
- A subscription or submission backend.
- Email collection.
- Rewriting generated data files by hand.
- Expanding resource scope without a verifiable submitted source.
