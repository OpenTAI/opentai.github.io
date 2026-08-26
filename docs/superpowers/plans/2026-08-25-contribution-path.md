# OpenTAI Contribution Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual `/contribute` flow that routes six contribution areas into source-reviewable GitHub issues.

**Architecture:** Keep contribution metadata and issue URL construction in a pure TypeScript module, render it through one locale-aware server component, and expose two static App Router pages. Reuse the existing Community page visual language and the existing public GitHub issue tracker.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4/global CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-08-25-contribution-path-design.md`

## Global Constraints

- Do not invent contributor profiles, resource facts, or acceptance promises.
- Preserve static export compatibility.
- Use the existing `https://github.com/GabryGao/opentai/issues/new` review destination.
- Provide equivalent English and Chinese routes.
- Do not add dependencies or a form backend.

---

### Task 1: Contribution model and GitHub destination

**Files:**
- Create: `src/lib/contribution.ts`
- Create: `src/lib/contribution.test.mjs`

**Interfaces:**
- Produces: `ContributionArea`, `contributionAreas`, and `buildContributionIssueUrl(areaId)`.

- [ ] **Step 1: Write failing tests for the six stable areas and prefilled issue URL.**
- [ ] **Step 2: Run `node --test --experimental-strip-types src/lib/contribution.test.mjs` and confirm module-not-found failure.**
- [ ] **Step 3: Implement the smallest pure TypeScript module that passes the tests.**
- [ ] **Step 4: Re-run the focused test and confirm it passes.**

### Task 2: Bilingual page and Community entry point

**Files:**
- Create: `src/components/contribute-page-view.tsx`
- Create: `src/app/contribute/page.tsx`
- Create: `src/app/zh/contribute/page.tsx`
- Modify: `src/components/community-page-view.tsx`
- Modify: `src/lib/i18n.ts`
- Modify: `src/components/page-breadcrumb.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/lib/site-content.test.mjs`

**Interfaces:**
- Consumes: `contributionAreas` and `buildContributionIssueUrl` from Task 1.
- Produces: `/contribute`, `/zh/contribute`, and localized Community CTA navigation.

- [ ] **Step 1: Add source-level assertions for the localized route, six-card view, and sitemap.**
- [ ] **Step 2: Run the focused content test and confirm it fails because the route is absent and the CTA still uses email.**
- [ ] **Step 3: Add both route files, the shared page view, translations, breadcrumb mapping, sitemap routes, and localized CTA.**
- [ ] **Step 4: Re-run focused tests and confirm they pass.**

### Task 3: Responsive visual treatment and full verification

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: semantic class names rendered by `ContributePageView`.
- Produces: one-column mobile and two-column desktop contribution cards consistent with Community.

- [ ] **Step 1: Add responsive card, marker, copy, and CTA styles with visible keyboard focus.**
- [ ] **Step 2: Run all Node tests, `npx tsc --noEmit`, and `npm run lint`.**
- [ ] **Step 3: Run `npm run build` and `python3 scripts/check-links.py`.**
- [ ] **Step 4: Inspect `/contribute/` and `/zh/contribute/` in the existing in-app browser at desktop and mobile widths.**
