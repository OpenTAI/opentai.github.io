# OpenTAI Contribution Path Design

## Goal

Turn the Community page's `Volunteer to contribute` call to action into a complete, bilingual path that helps a prospective contributor choose an area and open a reviewable GitHub issue.

## User flow

1. A visitor sees contributor recognition on `/community` or `/zh/community`.
2. `Volunteer to contribute` opens `/contribute` or `/zh/contribute`.
3. The page asks `How would you like to contribute?` and presents six equal contribution areas:
   - Research & Papers
   - Models & Datasets
   - Benchmarks & Evaluation
   - Tools & Resources
   - Website & Development
   - Community
4. Each `Submit contribution` link opens a prefilled issue in the same public GitHub issue tracker already used by OpenTAI resource-submission forms.
5. The issue body records the selected area and asks the contributor to describe the proposed work, relevant public sources, and how the work can be verified.

## Visual design

The page extends the current Community page rather than introducing a separate visual system. It uses the existing light background, blue-violet accent, rounded white cards, compact labels, and responsive page frame. The six areas form a two-column grid on desktop and one column on narrow screens. Each card uses a numeric marker instead of an invented illustration or decorative asset.

## Content and trust constraints

- The page describes contribution routes only; it does not publish contributor identities or unverified resources.
- All submissions go to GitHub for source review before inclusion.
- The site does not claim that a submission will be accepted.
- English and Chinese routes contain the same six areas and the same destination behavior.
- No form backend, database, new dependency, or new user account flow is introduced.

## Files and boundaries

- `src/lib/contribution.ts`: owns the six canonical area definitions and GitHub issue URL construction.
- `src/components/contribute-page-view.tsx`: renders the bilingual page from the canonical definitions.
- `src/app/contribute/page.tsx` and `src/app/zh/contribute/page.tsx`: expose static App Router pages and metadata.
- `src/components/community-page-view.tsx`: changes the existing CTA from `mailto:` to the localized route.
- `src/lib/i18n.ts`, `src/components/page-breadcrumb.tsx`, `src/app/sitemap.ts`, and `src/app/globals.css`: provide localization, navigation, discoverability, and styling.

## Verification

- Node tests verify the six areas, prefilled GitHub issue URL, localized CTA, and route registration.
- TypeScript, lint, production build, external-link validation, and browser inspection cover regressions and rendering.
