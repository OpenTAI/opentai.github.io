# Design QA — Home Releases Labels

## Comparison Targets

- Source visual truth: `/var/folders/b0/zf0l3qzj3y57k95gqxcbt5fh0000gn/T/TemporaryItems/NSIRD_screencaptureui_WT58nk/截屏2026-08-27 14.48.56.png`
- Desktop implementation: `/private/tmp/opentai-releases-implemented.png`
- Normalized comparison: `/private/tmp/opentai-releases-compare.png`

## Verification

- Removed every requested recency prefix while retaining the existing structure: `Latest Releases` → `Releases`, `Latest Papers` → `Papers`, `New Benchmarks` → `Benchmarks`, `New Models` → `Models`, and `New Datasets` → `Datasets`.
- Compared the supplied reference and implementation together at the same 1456 px width. Card order, borders, spacing, typography, content rows, and `All →` links remain unchanged.
- Checked a 1456 × 700 desktop viewport and a 390 × 844 mobile viewport in the in-app browser.
- Desktop and mobile document widths match their viewports with zero horizontal overflow.
- Browser console reports no warnings or errors.

## Findings

- No remaining P0, P1, P2, or P3 findings for this copy-only scope.

final result: passed

---

# Design QA — Community Introduction And Papers Hero

## Comparison Targets

- Community source visual truth: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/9e20f478899dc29eb19741386f9343c8/b01221ca3a266584fff90c84c5bd3929.png`
- Papers source visual truth: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/9e20f478899dc29eb19741386f9343c8/14ef7919a31effab0c3f51f45f1c0a23.png`
- Datasets pattern reference: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/9e20f478899dc29eb19741386f9343c8/63e194be4b59e72e08915361d1bf7725.png`
- Community implementation: `/private/tmp/opentai-community-desktop.png`
- Papers implementation: `/private/tmp/opentai-papers-desktop.png`
- Community mobile implementation: `/private/tmp/opentai-community-mobile-final.png`
- Papers mobile implementation: `/private/tmp/opentai-papers-mobile-final.png`
- Community normalized comparison: `/private/tmp/opentai-community-comparison.png`
- Papers normalized comparison: `/private/tmp/opentai-papers-comparison.png`

## Capture Details

- State: English public Community and Papers routes, default theme, no dialogs open.
- Community source: 1418 × 758 px. Community implementation: 1440 × 1000 px at a 1440 × 1000 CSS viewport.
- Papers source: 2912 × 740 px. Papers implementation: 1280 × 720 px at a 1280 × 720 CSS viewport.
- Mobile captures: 390 × 844 px at a 390 × 844 CSS viewport.
- Device scale factor: 1; implementation screenshots and CSS viewports are 1:1, so no density downsampling was required.
- Source designs and implementation regions were normalized to 1200 px width in the combined comparison images before judging typography, spacing, and hierarchy.

## Full-View Comparison Evidence

- Community: the new introduction sits immediately after the existing Community hero and before Contributors, preserving the requested reading order. Its headings, two mission paragraphs, emphasized phrases, and closing statement match the supplied copy while using the site's existing white card, border, radius, typography, and spacing tokens.
- Papers: the formerly empty hero copy area now contains four compact statistical pills. The structure matches the Datasets hero pattern without changing the existing Papers CTA, icon panel, or overall page proportions.
- Responsive checks: both routes have no document-level horizontal overflow at 390 px. English and Chinese routes render the new copy and statistics without console errors.

## Focused Region Comparison Evidence

- Community focused comparison: `/private/tmp/opentai-community-comparison.png`. The reference is a standalone editorial text block; the implementation intentionally keeps the same hierarchy and emphasis inside OpenTAI's existing card system. The implementation is denser at desktop width, but all requested copy remains readable and the hierarchy is unchanged.
- Papers focused comparison: `/private/tmp/opentai-papers-comparison.png`. The hero aligns with the supplied Datasets reference: title and pill row occupy the center column, while the submission CTA remains isolated by the right divider.

## Required Fidelity Surfaces

- Fonts and typography: existing OpenTAI font stack retained; heading weight, negative tracking, paragraph line height, bold emphasis, and small stat labels are internally consistent. Mobile line wrapping remains readable.
- Spacing and layout rhythm: section order and card gaps match adjacent site pages. The Community copy uses a comfortable desktop measure and collapses to one readable column on mobile. Papers pills wrap into two rows on mobile without collision.
- Colors and visual tokens: existing white surfaces, neutral text colors, violet stat values, borders, radii, and CTA treatments are reused without introducing a new palette.
- Image quality and asset fidelity: no new raster or illustrative assets were required. Existing OpenTAI page icons and contributor avatars remain unchanged and sharp.
- Copy and content: Community copy matches the team-supplied source. Paper statistics are derived from the generated paper library: 772 entries, 3 recorded domains, 14 surveys, and 754 papers with a public link.
- Accessibility and behavior: headings remain semantic, CTA behavior is unchanged, no focus targets were removed, and no new interactive control was introduced.

## Findings

- No remaining P0, P1, or P2 fidelity findings.

## Comparison History

1. Initial mobile Papers capture exposed a P2 horizontal overflow: a long venue label and link row measured 416 px inside a 390 px viewport.
2. Root cause: the metadata row used `shrink-0` and did not wrap at the narrow breakpoint.
3. Fix: added a dedicated `paper-card-meta` hook that becomes a full-width wrapping row below 640 px and truncates an overlong venue pill safely.
4. Post-fix evidence: `/private/tmp/opentai-papers-mobile-final.png`; document width is 390 px for a 390 px viewport and the page reports no horizontal overflow.

## Implementation Checklist

- [x] Community introduction precedes Contributors.
- [x] Papers hero contains only source-derived statistics.
- [x] English and Chinese routes render correctly.
- [x] Desktop and 390 px mobile views checked in the in-app browser.
- [x] Console warnings/errors checked for both routes.
- [x] Horizontal overflow regression fixed and rechecked.

## Follow-Up Polish

- No P3 polish is required for this scope.

final result: passed

---

+# Design QA — Light ice-blue Company wall and Safety arenas

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

- `Volunteer To Contribute` now opens a compact submission modal in the same visual system as existing resource submission dialogs.
- The modal contains only the three inputs needed to open a reviewable GitHub issue: GitHub profile, contribution area, and contribution proposal.
- The old six-card contribution chooser is no longer rendered; `/contribute/` provides a compact entry point to the same modal.
- `Contributors` displays the three team-provided GitHub accounts as a compact GitHub-style avatar collection: Oscar Wu (`@wuyoscar`), Xin Gao (`@GabryGao`), and Ming Wen (`@SII-FLEEECERmw`). Names and handles remain available through accessible labels and hover titles without taking up a full card row.
- All three remote GitHub avatars loaded from their verified profile URLs.
- English and Chinese modal labels, options, buttons, and close controls were present in the DOM.
- The pale information panel now includes the teacher-provided contact email `danxjma@gmail.com`; it is a `mailto:` link with the subject `OpenTAI volunteer contribution`, while GitHub remains the primary structured submission path.
- Desktop and mobile states had no horizontal document overflow (`scrollWidth - clientWidth = 0`).
- Browser logs contained no warning or error entries.

## Result

passed

No contributor roles, affiliations, or biographical claims were added. Display names, handles, profile links, and avatars come from the user-provided GitHub sources.

---

# Design QA — All-Words-Capitalized Headings And Circular Contributor Wall

## Source And Implementation

- User markup reference: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/c6652b7e825ddd617f106a4cc8b4ba69.png`
- Circular-wall reference: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/101696f255fa4837f68dcb7ac4e1ca0e.jpg`

## Viewport, Dimensions, And State

- Desktop: `/community/` at 1280 × 720 CSS pixels, English locale, default state.
- The responsive avatar-only layout uses 56 px circles below 640 px and is narrower than the previously validated cards.

## Visual Findings

- The Community section title is now `Contributors`, with a smaller heading scale.
- Contributor profiles render as a tightly wrapped, GitHub-style wall of pure 72 × 72 px circular avatars instead of full-width identity cards. There are no visible names, handles, arrows, or card shells.
- Each avatar remains keyboard-accessible and exposes the contributor name and GitHub handle through accessible text and a hover title.
- Browser inspection confirmed all three images loaded at their natural 160 px source size, rendered at 72 × 72 px, and produced no horizontal overflow at the 1280 px viewport.
- `Partner Institutions` and the shared self-authored English headings and calls to action now capitalize the first letter of every word, including short words such as `By`, `To`, `The`, `In`, `Of`, and `Vs`.
- Externally sourced paper titles, company names, benchmark names, and model names remain unchanged.
- Desktop inspection found no horizontal page overflow.

## Result

passed
