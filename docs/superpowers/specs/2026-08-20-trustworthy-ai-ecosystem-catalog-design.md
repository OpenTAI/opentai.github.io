# OpenTAI Trustworthy-AI Ecosystem Catalog Design

Date: 2026-08-20

## Objective

Replace the empty or provisional Models, Frameworks, Arenas, and Companies areas with source-backed catalogs that help readers discover trustworthy-AI resources without presenting guesses as facts.

Update the site description to:

> An open ecosystem for trustworthy AI, unifying safety guardrails, evaluation benchmarks, and datasets

## Source policy

Every displayed claim must be traceable to an official website, official repository, paper, model card, or organization profile. Automated name matching is not sufficient evidence.

Each source record stores its supporting URLs and a short verification note. Optional fields are omitted when they cannot be verified. In particular, founding year, country, school/incubator, GitHub repository, model type, and arena participation mode must never be inferred.

Generated files remain generated. Catalog sources live under `scripts/data/`; `scripts/generate-site.py` produces the TypeScript consumed by the site.

## Catalogs

### Models

The Models page separates entries into:

- Guard Models: models intended to screen, moderate, classify, or constrain unsafe inputs or outputs.
- Security Models: models released for security-specific detection, analysis, red teaming, or defense tasks.
- Aligned Models: models whose official release explicitly documents safety/alignment training as a primary purpose.

Cards show the official name, category, publisher, release year, short official/source-backed description, model or project link, verified repository when one exists, license when recorded, and repository stars when the repository is verified.

### Frameworks

Frameworks are reusable attack, defense, red-team, or safety-evaluation systems rather than datasets or single benchmarks. Cards show framework type, supported targets/modalities, official description, paper/project/repository links, license, year, and verified repository stars.

OpenRT and OpenART are initial required entries. OpenART is identified as an agent red-teaming and controlled safety-evaluation framework based on its official paper and repository.

### Arenas

Arenas are split into two explicitly labelled types:

- Live arena: a public platform where users or systems can participate, compare results, submit attacks, or appear on a ranking.
- Research arena: a paper-defined or released evaluation environment that supports adversarial evaluation but does not have a verified public live leaderboard.

Cards show arena type, target, participation/evaluation mechanism, operator, public-results status, year, and official links. A research arena must not be described as a live leaderboard.

Gray Swan Arena and DTap are investigated as live-arena candidates. OpenART is included as a research arena unless an official live-ranking interface is verified.

### Companies

Companies are AI-safety, agent-safety, or embodied-AI-safety startups and companies. The page uses a responsive exhibition-wall card grid.

Cards show:

- official logo;
- company name;
- one-sentence source-backed description;
- founding year, when officially recorded;
- primary direction;
- country or headquarters, when officially recorded;
- incubating school or university affiliation, only when an official source supports it;
- official website.

Virtue AI, Gray Swan AI, and Promptfoo are initial required candidates. Additional companies are added only after the same verification process.

## Leaderboards

The existing Leaderboards area is not populated with speculative data. Safety leaderboards are added only when an official ranking, methodology, and maintained results page can be verified. Arena rankings remain attached to their arena when they are not independent leaderboard products.

## Interface

Each new catalog provides:

- page header and concise description;
- category/type filters;
- text search;
- relevant sorting, including verified GitHub stars where available and release/founding year;
- responsive card grid;
- visible empty-state wording rather than invented values;
- English and Chinese interface copy while preserving official resource names.

Navigation enables Frameworks, Arenas, and Companies only when their routes contain verified entries. The mobile navigation retains the same grouped hierarchy.

## Data freshness and performance

Large catalog data stays outside the home-page bundle. GitHub stars are captured by the data pipeline with a recorded update date; the static site does not claim real-time values. Official logos are stored locally only when their use and source are clear, otherwise the card uses a neutral initials mark.

## Verification

Before completion:

1. Regenerate the site data.
2. Run TypeScript, lint, production build, and external-link checks.
3. Inspect all four pages and their Chinese routes in desktop and mobile browser widths.
4. Confirm preview builds remain `noindex`.
5. Audit every new entry against its recorded supporting source.

