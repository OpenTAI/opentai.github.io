# Paper-derived dataset catalog design

## Goal

Expand the Dataset page from the first 17 manually audited resources into a deduplicated catalog of every publicly accessible, trainable dataset used by the 772 approved papers, while preserving OpenTAI's source-first rule.

## Scope and definitions

- Include a dataset when an approved paper uses it for model/classifier training, fine-tuning, alignment, imitation learning, reinforcement learning, or supplies an explicit train/validation split.
- Include general-purpose datasets such as ImageNet, COCO, D4RL, or LIBERO when an approved paper uses them for training.
- Exclude test-only question sets, evaluation task suites, and simulation environments without a fixed released training dataset; those remain Benchmarks.
- One canonical dataset produces one card. Aliases and spelling variants resolve through a reviewed overrides file rather than fuzzy name matching alone.
- A card records its official data URL, optional paper/GitHub/Hugging Face URLs, release year, domains, usage count, citing papers, and section-level evidence.
- Missing or unverified fields remain empty and visibly unavailable.

## Data pipeline

1. Digest all papers with an arXiv ID in one rate-limited `arxiv2agent` batch. Cache structured `paper.json`, sections, tables, and references under `tmp/paper-corpus/`.
2. Resolve the remaining papers by exact or near-exact title against DOI, arXiv, and official publication pages. Ambiguous matches remain unresolved.
3. Extract dataset mentions from table headers/cells and sentences containing training-role language. Store candidates with paper ID, section/table location, verbatim evidence, and inferred role.
4. Human/agent audit rejects evaluation-only uses and verifies official data links. Automatic name similarity is never sufficient evidence.
5. Canonicalize approved mentions through explicit alias overrides, then derive unique dataset cards and their citing-paper lists.
6. Generate `src/data/site.ts` only through `scripts/generate-site.py`.

## Page design

- Replace the simple progress bars with a full-width smooth SVG line/area chart showing unique datasets by release year.
- Add a domain donut chart for LLMs, Agents, and Embodied AI, counting a cross-domain dataset in each applicable domain only in the multi-domain view and once in the catalog total.
- Add a usage-frequency donut/chart for datasets used by 1, 2–5, 6–20, and more than 20 approved papers.
- Add the approved search-and-filter shell: large search field, total count, sort control, domain pills, and source-backed task tags when available.
- Dataset cards remain deduplicated. The title opens the official dataset host. An inline disclosure lists citing papers and evidence; no dataset detail route is added.
- Charts and filters are bilingual, keyboard accessible, responsive, and built with SVG/CSS without adding a chart-library dependency.

## Failure handling

- A failed paper download is recorded and does not abort the batch.
- A mention without a canonical name, training-role evidence, or official data URL stays in the audit queue and is not published.
- Conflicting aliases require a manual override with a reason.
- Generated counts and charts are derived from the final approved catalog, never entered manually.

## Verification

- Unit tests cover continuous year series, domain counts, usage buckets, candidate-role classification, alias resolution, and stable deduplication.
- Run TypeScript, lint, production build, and external-link checks.
- Browser-check English and Chinese Dataset pages at desktop and mobile widths, including chart labels, filters, sorting, disclosures, and direct links.
