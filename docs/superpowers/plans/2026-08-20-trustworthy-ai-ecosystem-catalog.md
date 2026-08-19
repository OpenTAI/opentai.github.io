# Trustworthy AI Ecosystem Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish source-backed Models, Frameworks, Arenas, and Companies catalogs, enable their grouped navigation routes, and update the OpenTAI site description.

**Architecture:** Store audited catalog records in one hand-maintained JSON source under `scripts/data/`, validate and serialize them into a standalone generated `src/data/ecosystem.ts` module, and render them through a focused client catalog component so the home bundle does not absorb the catalogs. Reuse the existing search, sorting, localization, shell, and card visual language while giving Companies a distinct exhibition-wall presentation and Arenas an explicit live/research distinction.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Python 3 data generator, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-20-trustworthy-ai-ecosystem-catalog-design.md`

## Global Constraints

- Never invent names, links, years, locations, affiliations, licenses, stars, categories, or descriptions.
- Every catalog record must cite an official site, repository, model card, paper, or organization profile.
- Do not hand-edit `src/data/site.ts`, `src/data/papers.ts`, or `src/data/paper-search.ts`; regenerate generated files with `python3 scripts/generate-site.py`.
- Preserve the preview `noindex` behavior; only `NEXT_PUBLIC_SITE_URL=https://opentai.org` may opt into indexing.
- Keep official names untranslated; localize only interface copy and source-backed summaries.
- Do not populate Leaderboards without an official maintained ranking and methodology.
- Avoid adding runtime dependencies.

---

### Task 1: Define and validate the audited ecosystem source

**Files:**
- Create: `scripts/data/ecosystem-catalog.json`
- Create: `scripts/validate-ecosystem-catalog.py`
- Create: `scripts/tests/test_validate_ecosystem_catalog.py`
- Modify: `scripts/generate-site.py`
- Create (generated): `src/data/ecosystem.ts`

**Interfaces:**
- Consumes: JSON sections `models`, `frameworks`, `arenas`, `companies`; each record includes `id`, `name`, `category`, `description`, `descriptionZh`, `year`, `publisher`, `country`, `affiliation`, `license`, `stars`, `starsUpdated`, `logo`, `links`, `sources`, and `verificationNote` only when verified.
- Produces: `ecosystemCatalogs: Record<EcosystemCatalogSlug, EcosystemCatalogConfig>` and exported types `EcosystemCatalogSlug`, `EcosystemCatalogEntry`, `EcosystemCatalogConfig` in `src/data/ecosystem.ts`.

- [ ] **Step 1: Write the failing validator tests**

```python
def test_rejects_entry_without_source():
    record = valid_record() | {"sources": []}
    with pytest.raises(ValueError, match="at least one source"):
        validate_record("models", record)

def test_rejects_live_arena_without_public_results():
    record = valid_arena() | {"category": "Live arena", "publicResults": None}
    with pytest.raises(ValueError, match="publicResults"):
        validate_record("arenas", record)

def test_accepts_missing_optional_company_fields():
    record = valid_company()
    record.pop("affiliation", None)
    validate_record("companies", record)
```

- [ ] **Step 2: Run the validator tests and verify they fail**

Run: `python3 -m unittest scripts.tests.test_validate_ecosystem_catalog -v`

Expected: FAIL because `validate_record` does not exist.

- [ ] **Step 3: Implement strict source validation**

```python
def validate_record(section, record):
    required = {"id", "name", "category", "description", "descriptionZh", "links", "sources", "verificationNote"}
    missing = sorted(required - record.keys())
    if missing:
        raise ValueError(f"{section}/{record.get('id', '<unknown>')}: missing {', '.join(missing)}")
    if not record["sources"]:
        raise ValueError(f"{section}/{record['id']}: at least one source is required")
    for source in record["sources"]:
        if not source.startswith("https://"):
            raise ValueError(f"{section}/{record['id']}: source must use https")
    if section == "arenas" and record["category"] == "Live arena" and not record.get("publicResults"):
        raise ValueError(f"arenas/{record['id']}: publicResults is required for a live arena")
```

- [ ] **Step 4: Add only verified initial records**

Add official-source-backed entries for the approved categories and required candidates: Guard/Security/Aligned Models; OpenRT and OpenART frameworks; Gray Swan Arena, DTap, and OpenART arena classifications; Virtue AI, Gray Swan AI, and Promptfoo companies. Omit every optional field not supported by its cited source.

- [ ] **Step 5: Generate the standalone TypeScript module**

Add `ECOSYSTEM_OUT = OUT.parent / "ecosystem.ts"` to `scripts/generate-site.py`, call the validator before serialization, and write the catalog types plus `ecosystemCatalogs` without importing the module from home-page code.

- [ ] **Step 6: Run tests and regeneration**

Run: `python3 -m unittest scripts.tests.test_validate_ecosystem_catalog -v && python3 scripts/generate-site.py`

Expected: validator tests PASS and `src/data/ecosystem.ts` is regenerated.

- [ ] **Step 7: Commit**

```bash
git add scripts/data/ecosystem-catalog.json scripts/validate-ecosystem-catalog.py scripts/tests/test_validate_ecosystem_catalog.py scripts/generate-site.py src/data/ecosystem.ts
git commit -m "feat: add audited ecosystem catalog data"
```

### Task 2: Add catalog search, filter, and sort behavior

**Files:**
- Create: `src/lib/ecosystem-catalog.ts`
- Create: `src/lib/ecosystem-catalog.test.mjs`
- Create: `src/components/ecosystem-catalog-view.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `EcosystemCatalogConfig` and `EcosystemCatalogEntry` from `@/data/ecosystem`.
- Produces: `filterEcosystemEntries(entries, query, category, locale)` and `sortEcosystemEntries(entries, sortKey)`, plus `<EcosystemCatalogView config locale />`.

- [ ] **Step 1: Write failing behavior tests**

```javascript
test("stars sort keeps missing values last", () => {
  assert.deepEqual(sortEcosystemEntries(rows, "stars-desc").map(({ id }) => id), ["b", "a", "missing"]);
});

test("localized search matches the Chinese description", () => {
  assert.deepEqual(filterEcosystemEntries(rows, "护栏", "All", "zh").map(({ id }) => id), ["guard"]);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test src/lib/ecosystem-catalog.test.mjs`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement pure filter and sort functions**

Support `default`, `stars-desc`, `stars-asc`, `year-desc`, `year-asc`, and `name-asc`; use stable ordering and always place missing numeric values after recorded values.

- [ ] **Step 4: Implement the shared catalog view**

Render a localized hero, category pills, result count, search input, sort select, and responsive cards. Show `Not recorded yet` only for user-relevant absent values; do not render empty metadata rows. Render official links directly and show the `starsUpdated` date in accessible text/tooltips so static star counts are not represented as live.

- [ ] **Step 5: Implement specialized cards**

Use resource cards for Models and Frameworks, explicit `Live arena` / `Research arena` badges and participation/public-results fields for Arenas, and an exhibition-wall card with logo-or-initials, direction, country, founding year, affiliation, and official website for Companies.

- [ ] **Step 6: Add literal Tailwind/CSS classes and responsive rules**

Use literal class strings only. At mobile width, render one column and compact metadata; at medium/desktop widths, render two/three company cards without horizontal overflow.

- [ ] **Step 7: Run tests**

Run: `node --test src/lib/ecosystem-catalog.test.mjs`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/ecosystem-catalog.ts src/lib/ecosystem-catalog.test.mjs src/components/ecosystem-catalog-view.tsx src/app/globals.css
git commit -m "feat: render ecosystem catalog cards"
```

### Task 3: Add routes, grouped navigation, and localization

**Files:**
- Create: `src/app/frameworks/page.tsx`
- Create: `src/app/arenas/page.tsx`
- Create: `src/app/companies/page.tsx`
- Create: `src/app/zh/frameworks/page.tsx`
- Create: `src/app/zh/arenas/page.tsx`
- Create: `src/app/zh/companies/page.tsx`
- Modify: `src/app/models/page.tsx`
- Modify: `src/app/zh/models/page.tsx`
- Modify: `src/lib/site-navigation.ts`
- Modify: `src/lib/site-navigation.test.mjs`
- Modify: `src/lib/i18n.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `ecosystemCatalogs` and `<EcosystemCatalogView>`.
- Produces: static EN/ZH routes for `/models`, `/frameworks`, `/arenas`, `/companies` and localized counterparts.

- [ ] **Step 1: Write failing navigation tests**

```javascript
assert.deepEqual(findItem("Frameworks"), { label: "Frameworks", href: "/frameworks" });
assert.deepEqual(findItem("Arenas"), { label: "Arenas", href: "/arenas" });
assert.deepEqual(findItem("Companies"), { label: "Companies", href: "/companies" });
```

- [ ] **Step 2: Run navigation tests and verify failure**

Run: `node --test src/lib/site-navigation.test.mjs`

Expected: FAIL because these items are still pending.

- [ ] **Step 3: Add the six new route modules and migrate Models**

Each route renders `SiteShell` and `EcosystemCatalogView` with the correct catalog config and locale; remove Models from the legacy `CollectionPageView` path without changing unrelated routes.

- [ ] **Step 4: Enable grouped navigation and sitemap entries**

Replace pending entries with `/frameworks`, `/arenas`, and `/companies`; add all EN/ZH paths to the static sitemap while preserving URL/noindex policy.

- [ ] **Step 5: Add exact English and Chinese UI translations**

Translate headings, filters, metadata labels, empty states, and approved source-backed descriptions; preserve `OpenRT`, `OpenART`, official company/model names, and trademarks unchanged.

- [ ] **Step 6: Run navigation and localization checks**

Run: `node --test src/lib/site-navigation.test.mjs src/lib/i18n.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/frameworks src/app/arenas src/app/companies src/app/zh/frameworks src/app/zh/arenas src/app/zh/companies src/app/models/page.tsx src/app/zh/models/page.tsx src/lib/site-navigation.ts src/lib/site-navigation.test.mjs src/lib/i18n.ts src/app/sitemap.ts
git commit -m "feat: publish ecosystem catalog routes"
```

### Task 4: Update OpenTAI brand copy and source audit documentation

**Files:**
- Modify: `scripts/generate-site.py`
- Modify (generated): `src/data/site.ts`
- Create: `scripts/data/ecosystem-source-audit.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: exact approved headline and the catalog source records.
- Produces: updated `siteBrand.headline`, documented refresh workflow, and human-readable source audit.

- [ ] **Step 1: Update the generator headline exactly**

```python
headline: "An open ecosystem for trustworthy AI, unifying safety guardrails, evaluation benchmarks, and datasets"
```

- [ ] **Step 2: Document every entry's source verdict**

For each catalog record, list its official name, display category, accepted claims, omitted claims, supporting URLs, and verification date. Record why OpenART is classified as a research arena unless a live public ranking was verified.

- [ ] **Step 3: Document refresh commands**

Add `python3 scripts/validate-ecosystem-catalog.py` and `python3 scripts/generate-site.py` to the README data pipeline, including the rule that star counts are snapshots with recorded dates.

- [ ] **Step 4: Regenerate and assert the exact copy**

Run: `python3 scripts/generate-site.py && rg -n "An open ecosystem for trustworthy AI" src/data/site.ts`

Expected: one generated `siteBrand.headline` match.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-site.py src/data/site.ts scripts/data/ecosystem-source-audit.md README.md
git commit -m "docs: record ecosystem source provenance"
```

### Task 5: Verify rendering, static export, links, and indexing

**Files:**
- Modify only if verification exposes a defect.

**Interfaces:**
- Consumes: all catalog routes and generated static output.
- Produces: release-ready, noindex-safe pages.

- [ ] **Step 1: Run focused tests**

Run: `node --test src/lib/ecosystem-catalog.test.mjs src/lib/site-navigation.test.mjs src/lib/i18n.test.mjs`

Expected: PASS.

- [ ] **Step 2: Run required repository verification**

Run: `npx tsc --noEmit && npm run lint && npm run build && python3 scripts/check-links.py`

Expected: zero TypeScript/lint/build/link errors.

- [ ] **Step 3: Verify preview indexing remains disabled**

Run: `rg -n "noindex|Disallow: /" out/robots.txt out/**/*.html`

Expected: preview output contains `Disallow: /` and `noindex`.

- [ ] **Step 4: Inspect all routes in the browser**

Inspect `/models/`, `/frameworks/`, `/arenas/`, `/companies/` and all four `/zh/` equivalents at desktop and mobile widths. Confirm search, filters, sort controls, links, company logos/initials, and live/research arena labels.

- [ ] **Step 5: Run source audit**

Run: `python3 scripts/validate-ecosystem-catalog.py`

Expected: every record passes structural and source validation.

- [ ] **Step 6: Commit any verification fixes**

```bash
git add <only-files-changed-by-verification>
git commit -m "fix: resolve ecosystem catalog verification issues"
```
