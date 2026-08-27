# Design QA — Light ice-blue Company wall and Safety arenas

## Source and implementation

- Visual source of truth: `/Users/fara./.codex/generated_images/01a02030-edc4-7240-a0d9-5a78af234602/exec-f7648b52-b823-4942-ad24-2e8ea735cc58.png`
- Company implementation: `/private/tmp/opentai-company-light.png`
- Arena implementation: `/private/tmp/opentai-arena-light.png`
- Arena ranking detail: `/private/tmp/opentai-arena-bars-light.png`
- Combined comparison: `/private/tmp/opentai-light-comparison.png`

## Viewport, dimensions, and state

- Reference: 2048 × 1152 px generated design target.
- Implementations: 1280 × 720 CSS pixels in the in-app browser.
- Routes: `/companies/` and `/arenas/`.
- State: default English pages; Arena ranking detail captured after scrolling to the result cards.

## Comparison evidence

- The reference and both implementations were resized to the same comparison width and placed together in `/private/tmp/opentai-light-comparison.png`.
- Company hero, filter panel, card grid, navy text, blue accents, red verified count, borders, and surface colors were checked against the reference.
- Arena hero, section panel, three-card grid, ranking tables, score emphasis, and progress tracks were checked against the same visual system.

## Visual findings

- Both pages now share the same ice-blue canvas (`#eef5ff`), pale-blue panels (`#e2ecfa`), blue-white cards (`#f8fbff`), navy text (`#10213a`), and restrained electric-blue accents.
- The Company page closely matches the selected reference while preserving the existing verified content and filters.
- The Arena page keeps its own scoreboard hierarchy but now belongs to the same visual family as the Company wall.
- Ranking tracks use deep navy instead of white or pure black: navy remains readable on the light surface without looking harsh.
- Key scores remain red or deep orange so they stand apart from labels and supporting text.
- No right-side document overflow was present at the inspected desktop viewport (`scrollWidth = innerWidth = 1280`).
- Browser console inspection returned no warnings or errors on either route.
- The existing responsive structure was not changed; this pass altered presentation tokens only.

## Iteration history

1. Added failing presentation regression tests for the selected light palette and navy ranking tracks.
2. Replaced the former dark Company and Arena surfaces with shared ice-blue tokens.
3. Tuned card, filter, table, button, grid, and chart colors to preserve hierarchy and contrast.
4. Captured both routes, inspected the Arena ranking region, and compared the reference and implementations side by side.
5. Confirmed type checking, linting, and the production build.

## Result

passed

No company or arena names, rankings, scores, descriptions, valuations, or links were changed by this visual pass.

---

# Design QA — Leaderboards matched to Safety arenas

## Source and implementation

- Visual source of truth: `/tmp/opentai-arenas-desktop.png`
- Leaderboards implementation: `/tmp/opentai-leaderboards-desktop-1280.png`
- Mobile implementation: `/tmp/opentai-leaderboards-mobile.png`
- Same-viewport comparison: `/tmp/opentai-leaderboards-arena-comparison.jpg`

## Viewport, dimensions, and state

- Desktop comparison: both routes captured at 1280 × 900 CSS pixels, English locale, default state.
- Reference route: `/arenas/`.
- Implementation route: `/leaderboard/`.
- Mobile check: `/leaderboard/` at 390 × 844 CSS pixels.

## Comparison evidence

- Arena and Leaderboards were captured with the same browser, viewport, locale, and page-top state.
- Their page-top and scoreboard regions were placed side by side in `/tmp/opentai-leaderboards-arena-comparison.jpg` and inspected together.
- Hero spacing, pale-blue canvas, panel surfaces, borders, type hierarchy, buttons, three-column scoreboard cards, score emphasis, links, and footer alignment were compared.

## Visual findings

- Leaderboards now uses the same light ice-blue shell, panel depth, card styling, navy typography, electric-blue borders, and orange/red score emphasis as Safety arenas.
- The former statistics panel, line chart, and donut chart are removed. The page now moves directly from the compact hero into the same Arena scoreboard component.
- The three verified boards are presented as full ranking cards with their original metrics, results, source links, and source records; no placeholder rankings were invented.
- The hero uses the plural title `Leaderboards`, the `L` identity tile, and no subtitle, matching the compact Arena hero pattern.
- Mobile layout has no right-side overflow (`scrollWidth = clientWidth = 390`); all three cards render at 301 px wide within the viewport.
- The mobile DOM contains three scoreboard cards and zero chart/statistics elements.
- Browser console inspection returned no warnings or errors on the Leaderboards route.

## Result

passed

No leaderboard names, rankings, scores, descriptions, source links, or generated data were invented or changed. Hourly source synchronization and manual/automatic row scrolling are shared with the Arena implementation where the official source and row count support them.

---

# Design QA — GitHub contributors and volunteer modal

## Source and implementation

- Modal reference: `/var/folders/b0/zf0l3qzj3y57k95gqxcbt5fh0000gn/T/TemporaryItems/NSIRD_screencaptureui_UKBErG/截屏2026-08-26 00.34.31.png`
- Contributor reference: `/var/folders/b0/zf0l3qzj3y57k95gqxcbt5fh0000gn/T/TemporaryItems/NSIRD_screencaptureui_kDZkX4/截屏2026-08-26 00.35.06.png`
- Desktop contributor implementation: `/private/tmp/opentai-community-contributors.png`
- Desktop modal implementation: `/private/tmp/opentai-community-volunteer-modal.png`
- Mobile contributor implementation: `/private/tmp/opentai-community-mobile.png`
- Mobile modal implementation: `/private/tmp/opentai-community-mobile-modal.png`

## Viewport, dimensions, and state

- Desktop: `/community/` at 1280 × 720 CSS pixels, default English state and open modal state.
- Localized check: `/zh/community/` at 1280 × 720 CSS pixels with the volunteer modal open.
- Mobile: `/community/` at 390 × 844 CSS pixels, default state and open modal state.

## Visual and interaction findings

- `Volunteer to contribute` now opens a compact submission modal in the same visual system as existing resource submission dialogs.
- The modal contains only the three inputs needed to open a reviewable GitHub issue: GitHub profile, contribution area, and contribution proposal.
- The old six-card contribution chooser is no longer rendered; `/contribute/` provides a compact entry point to the same modal.
- `Main Contributors` displays three team-provided GitHub accounts as linked avatar cards: Oscar Wu (`@wuyoscar`), Xin Gao (`@GabryGao`), and Ming Wen (`@SII-FLEEECERmw`).
- All three remote GitHub avatars loaded from their verified profile URLs.
- English and Chinese modal labels, options, buttons, and close controls were present in the DOM.
- The pale information panel now includes the teacher-provided contact email `danxjma@gmail.com`; it is a `mailto:` link with the subject `OpenTAI volunteer contribution`, while GitHub remains the primary structured submission path.
- Desktop and mobile states had no horizontal document overflow (`scrollWidth - clientWidth = 0`).
- Browser logs contained no warning or error entries.

## Result

passed

No contributor roles, affiliations, or biographical claims were added. Display names, handles, profile links, and avatars come from the user-provided GitHub sources.
