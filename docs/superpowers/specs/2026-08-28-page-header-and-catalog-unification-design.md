# OpenTAI Page Header And Catalog Unification Design

Date: 2026-08-28

Status: Approved in chat; awaiting review of this written specification.

## Goal

Remove the repeated, oversized page heroes and decorative eyebrow labels that make the site feel fragmented. Community, Benchmarks, Datasets, Leaderboards, and Arenas should each have one compact, functional heading inside the section that contains the page's real content.

This work also completes the already approved navigation, footer, homepage-link, and dataset-presentation corrections that affect the same public catalog experience.

## Design Principles

1. One visible page title per page.
2. Put the icon, title, statistics, and primary action next to the content they describe.
3. Remove decorative pre-headings that repeat the heading below them.
4. Preserve informative labels such as form-field labels, table headers, filter labels, factual statistics, status badges, and chart titles.
5. Do not invent catalog content. Dataset inclusion, descriptions, names, links, and labels must remain source-backed.

## Integrated Header Pattern

Create one reusable integrated-section-heading component using the site's existing icon panel, title type, statistic pills, and submission button styles. It accepts:

- icon;
- localized title;
- optional statistic pills;
- optional summary text;
- optional action;
- responsive stacking behavior.

The component is rendered inside the page's first substantive content card. It replaces the standalone `subpage-hero-card` only on the explicitly named pages below. Papers and Models retain their existing single hero; browser QA may report issues on those pages but must not expand this structural change without approval.

### Community

- Remove the standalone `Community` hero.
- Move the existing community icon to the left of `OpenTAI Community` in the introduction card.
- Keep `Building Trustworthy AI, Together` and the supplied introduction text unchanged.
- Keep the contribution action in the Contributors section.

### Benchmarks

- Remove the standalone Benchmarks hero.
- Move the icon, `Benchmarks`, four statistic pills, and `Submit Your Benchmark` into the top of the existing statistics card.
- Remove the redundant `Benchmark Statistics` heading.
- Keep `Benchmark Growth By Year`, `Benchmarks By Domain`, their charts, and all underlying source-backed data.

### Datasets

- Remove the standalone Datasets hero.
- Move the icon, `Datasets`, four statistic pills, and `Submit Your Dataset` into the top of the existing statistics card.
- Remove the redundant `Dataset Statistics` heading.
- Keep `Dataset Growth By Year`, `Datasets By Domain`, their charts, and all underlying source-backed data.

### Leaderboards

- Remove the standalone Leaderboards hero.
- Move the existing `L` icon, `Leaderboards` title, directory summary, and `Submit Your Leaderboard` action into the scoreboard-directory heading.
- Do not render a second `Leaderboards` title.

### Arenas

- Remove the standalone Safety Arenas hero.
- Move the existing `A` icon, `Safety Arenas` title, directory summary, and `Submit Your Arena` action into the scoreboard-directory heading.
- Do not render a second `Safety Arenas` title.

## Decorative Pre-Heading Cleanup

Remove small decorative eyebrow or kicker text that appears immediately above a real heading. The known instances are:

- `OpenTAI contact`;
- `Community submission` in contribution and resource-submission dialogs;
- `Contributor Recognition`;
- `OpenTAI Daily`;
- `Cross-Category Overview`;
- `Official Result Snapshot`.

The same rule applies to any equivalent decorative pre-heading found during the implementation audit. It does not remove navigation group labels, form labels, table headers, chart titles, factual counts, domain tags, status indicators, or accessibility-only text.

The Contact dialog must also stop displaying the recipient email address. The configured recipient remains internal to the existing mail-app flow; this task does not add a mail backend or change submission transport.

## Navigation, Homepage, And Footer Consistency

- Resource navigation order: Benchmarks, Models, Datasets.
- Display `Startups` instead of `Companies` in navigation, breadcrumbs, headings, and footer.
- Preserve the existing `/companies` route so existing links do not break.
- Homepage collection pills: Papers, Benchmarks, Models, Datasets, Leaderboards, Arenas, Startups, Community.
- Footer taxonomy must match the top navigation:
  - Research: Papers;
  - Resources: Benchmarks, Models, Datasets;
  - Evaluation: Leaderboards, Arenas;
  - Ecosystem: Startups, Community, GitHub;
  - Terms & Policies: Terms Of Use only.
- Remove Privacy Notice, Inclusion & Attribution, and Corrections & Takedown from the footer because those pages are not published.

## Dataset Presentation Corrections

### Names And Tags

- Normalize the visible venue label `NIPS` to `NeurIPS` where the primary source supports that venue.
- Remove `GitHub repository` as a Stanford Alpaca badge. Its verified GitHub URL remains available in the Links menu.
- Give dataset topic tags a visibly highlighted treatment distinct from neutral metadata. Type, venue, and topic tags must remain semantically distinguishable.

### Link Labels

- Show `Download` only when the destination is a direct downloadable file or archive.
- Show `Open dataset` for Hugging Face dataset pages, GitHub repositories, project pages, and other browsable resource pages.
- Link classification must be deterministic and covered by tests so an ordinary page cannot unexpectedly trigger a download under an ambiguous label.

### Descriptions

- Replace paper-training evidence snippets with one-sentence dataset summaries describing the data, recorded scale or collection method when sourced, and intended use.
- Summaries must come from an official dataset card, official repository, primary paper, or an OpenTAI-team supplied description.
- When no suitable summary is verified, display the existing missing-content convention rather than generating plausible prose.

### Trustworthy-AI Scope Audit

The collection must no longer include a generic dataset solely because an approved paper happened to use it. Publish a dataset only when its content or primary purpose directly supports at least one of:

- AI safety or alignment;
- robustness, red teaming, attacks, or defenses;
- harmful-content, misuse, or jailbreak research;
- fairness, bias, privacy, or trustworthy-AI evaluation/training;
- safety-related agent or embodied-AI behavior.

Record every reviewed dataset in a source-controlled audit ledger with keep/exclude status, a concise reason, and the supporting source. The generator publishes only reviewed `keep` records. Exclusions remain auditable rather than being silently deleted.

## Architecture And Data Flow

- Extend the existing shared page-layout components instead of duplicating page-specific hero markup.
- The integrated header is presentation-only and receives already computed statistics and actions.
- Edit canonical inputs in `scripts/data/` and generation logic in `scripts/generate-site.py`.
- Regenerate `src/data/site.ts`, `src/data/papers.ts`, and `src/data/paper-search.ts`; never edit them directly.
- Update localization entries and presentation tests for both English and Chinese routes.

## Responsive Behavior

- Desktop: icon, title/statistics, and action share one horizontal heading region.
- Tablet: title and statistics may wrap while the action remains visibly associated with the heading.
- Mobile: icon and title appear first, statistics wrap below, and the action becomes full-width only when needed.
- Merging the hero must reduce vertical space without crowding chart titles or directory cards.

## Testing And Verification

1. Add or update tests before implementation for integrated-header rendering, removed duplicate headings, decorative-preheading removal, navigation order, footer groups, homepage pills, dataset link labels, dataset badge normalization, and dataset audit filtering.
2. Run `python3 scripts/generate-site.py` after canonical data or generator changes.
3. Run `npx tsc --noEmit`.
4. Run `npm run lint`.
5. Run `npm run build`.
6. Run `python3 scripts/check-links.py`.
7. Use the in-app browser to inspect English and Chinese versions of Community, Benchmarks, Datasets, Leaderboards, Arenas, homepage, footer, dialogs, and representative dataset cards at desktop and mobile widths.
8. Compare rendered screenshots with the supplied annotated references and record design QA before claiming completion.

## Non-Goals

- Building a server-side email or newsletter backend.
- Changing the `/companies` route.
- Inventing or auto-generating dataset descriptions.
- Removing informative labels merely because their visual style uses uppercase text.
- Redesigning unrelated pages that already have one non-duplicated title.
