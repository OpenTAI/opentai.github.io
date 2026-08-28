# OpenTAI design QA

## Evidence

- Source visual truth:
  - Community: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/1e77410e488b46958c7719f990dcb57e.png` (3124 × 1138 px)
  - Benchmarks: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/ee46c82e989f9e9c5977f656eebdb0f2.png` (1948 × 1008 px)
  - Datasets: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/4ccdff85a1c0ad9c69c5e85cc82f48c4.png` (2940 × 1424 px)
  - Leaderboards: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/6c99d3dedecb4d65540c14fa59275fff.png` (3086 × 998 px)
  - Arenas: `/Users/fara./Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_5dji56bs0chf22_1df1/temp/RWTemp/2026-08/bc34e2f3f44ce7f29b412a95b088e3da/9250bde69174bb645cabef9994aaf027.png` (3010 × 1130 px)
  - Dataset tag highlight: `/var/folders/b0/zf0l3qzj3y57k95gqxcbt5fh0000gn/T/TemporaryItems/NSIRD_screencaptureui_nWPKwZ/截屏2026-08-28 15.16.49.png` (2354 × 1302 px)
- Browser-rendered implementation captures:
  - `design-qa-community-desktop.png`
  - `design-qa-benchmarks-desktop.png`
  - `design-qa-datasets-desktop.png`
  - `design-qa-leaderboard-desktop.png`
  - `design-qa-arenas-desktop.png`
  - `design-qa-startups-desktop.png`
  - `design-qa-terms-desktop.png`
  - `design-qa-footer-desktop.png`
  - `design-qa-contact-dialog.png`
  - `design-qa-dataset-cards-mobile.png`
  - `design-qa-dataset-tags-mobile.png`
  - `design-qa-home-mobile.png`
  - `design-qa-community-mobile.png`
  - `design-qa-benchmarks-mobile.png`
  - `design-qa-datasets-mobile.png`
  - `design-qa-leaderboard-mobile.png`
  - `design-qa-arenas-mobile.png`
  - `design-qa-startups-mobile.png`
  - `design-qa-dataset-yellow-tags.png`
- Desktop viewport and implementation pixels: 1440 × 1000 CSS px, device scale factor 1, 1440 × 1000 px captures.
- Mobile viewport and implementation pixels: 390 × 844 CSS px, device scale factor 1, 390 × 844 px captures.
- Density normalization: source screenshots use different desktop sizes and include annotations/browser chrome in some cases. Each source and implementation pair was opened together in one comparison input; comparison used the matching visible content region and user-marked intent rather than raw pixel scale.
- Dataset tag comparison: source and implementation were both opened at 2354 × 1302 px. The implementation was captured at a 2354 × 1302 CSS viewport with device scale factor 1 and compared on the matching card-grid state.
- State: English, light theme, anonymous/public view. Desktop and mobile default states plus mobile navigation open, contact dialog open, dataset-card region, and footer region were checked.

## Full-view comparison

- Community: the standalone header was removed; its real icon now sits beside `OpenTAI Community` in the content card. The introduction and contributor section remain visually separated and readable.
- Benchmarks and Datasets: icon, title, counts, and submit action now share one header region. The redundant `Statistics` title is gone while the charts remain. The catalog begins directly below the chart region.
- Leaderboards and Arenas: each duplicate hero was removed. Icon, title, source-count note, submit action, and result cards now form one compact section.
- Navigation and footer: Resources is ordered Benchmarks, Models, Datasets; Evaluation contains Leaderboards and Arenas; Ecosystem contains Startups and Community. Footer uses the same labels and one continuous background.
- Terms: the page and footer both use `Terms Of Use`; the removed policy placeholders do not appear.
- Responsive behavior: all tested routes reported `scrollWidth === innerWidth` at 1440 px and 390 px. No horizontal clipping, overlapping controls, or collapsed primary actions were observed.

## Focused comparison

- Dataset cards: direct CSV/JSONL links render as `Download`; repository and dataset landing pages render as `Open dataset`. Descriptions are concise source-backed dataset summaries. Secondary topic chips such as `training data`, `ai`, and `ai-safety` use a translucent yellow marker treatment; primary domain chips such as `LLMs` remain neutral. `NIPS` and `GitHub repository` do not appear.
- Contact dialog: decorative pre-heading and visible recipient address are removed. Required inputs retain labels, keyboard focus, and accessible button names.
- Community contributors: GitHub avatars were checked after network settle; all sampled images completed with non-zero natural dimensions and descriptive alt text.
- Mobile header and cards: 390 px captures preserve title hierarchy, button tap targets, metric chips, and single-column result cards without overflow.

## Required fidelity surfaces

- Fonts and typography: existing OpenTAI font stack and optical hierarchy are preserved; integrated headings retain clear display/body separation and wrap correctly on mobile.
- Spacing and layout rhythm: duplicate vertical space is removed. Section borders, radii, dividers, padding, and grid gaps remain consistent with the existing design system.
- Colors and visual tokens: existing neutral, purple, blue, and warm gradient tokens are preserved. Dataset topic chips use a translucent yellow background plus a darker inset marker stroke with dark ochre text; all 40 rendered topic chips resolve to the intended yellow style. Footer background is visually continuous and status badges retain contrast.
- Image quality and asset fidelity: existing brand logo and GitHub/company image assets are used; no substitute CSS art or placeholder asset was introduced.
- Copy and content: user-requested labels are present, source-backed counts are current, and empty/unverified content remains explicitly labeled rather than invented.

## Primary interactions tested

- Mobile navigation open/close and section ordering.
- Contact dialog open/close, required-field validation, and hidden recipient address.
- Dataset action labels and destination types.
- Desktop/mobile page rendering for Home, Community, Benchmarks, Datasets, Leaderboards, Arenas, Startups, and Terms.
- Console: no warning or error messages observed.
- Accessibility spot check: no visible buttons or links without an accessible name; no images missing `alt` attributes on the checked page.

## Findings

- No actionable P0, P1, or P2 design, responsiveness, interaction, image-quality, content, or accessibility findings remain.
- P3: the source captures use varying browser chrome and viewport sizes, so exact pixel-for-pixel comparison is not meaningful; the final layout follows the annotated structural changes and the existing OpenTAI design system.

## Comparison history

- No P0/P1/P2 issue was found in the first normalized comparison, so no visual rework iteration was required.
- An immediate first Community capture showed lazy-loaded avatar placeholders. A settled-state recapture confirmed the assets loaded correctly with non-zero natural dimensions; this was capture timing, not a product defect.
- The first yellow-tag implementation used a selector with lower specificity than the shared badge rule, so the marker stroke appeared but the gray base background remained. A regression test was tightened to require the qualified selector, the selector was corrected, and the browser recapture confirmed the yellow background, marker stroke, text color, zero overflow, and no console warnings/errors.

final result: passed
