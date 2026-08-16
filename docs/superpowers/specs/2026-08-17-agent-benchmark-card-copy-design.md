# Agent Benchmark Card Copy Design

Date: 2026-08-17

## Goal

Simplify Agent benchmark cards sourced from *Safety at Scale* so that the
catalog emphasizes what each benchmark evaluates and whether it is
simulation-based or real-interaction based.

## Approved presentation

On the benchmark collection cards:

- Keep the domain chip, such as `Agents`.
- Keep exactly one interaction-mode chip: `Simulation-based benchmarks` or
  `Real-interaction benchmarks` (localized in Chinese).
- Hide the `source: safety-at-scale` chip.
- Replace the generated sentence beginning
  `Safety at Scale Table 14 lists this resource under` with an English line in
  the form `Evaluation focus: Indirect prompt injection attacks.` and the
  corresponding verified Chinese line, for example
  `测评重点：间接提示注入攻击。`.
- Do not show the Table 14 attribution sentence in the collection card.

## Provenance boundary

This is a presentation-only change. The authoritative source record remains in
`scripts/data/agent-benchmark-records.json`; the generated resource links retain
the source-survey URL; and benchmark detail pages continue to expose their
source links. No benchmark name, focus, classification, scale, or URL changes.

## Implementation boundary

Add a small benchmark-card presentation adapter and use it only in the
collection card renderer. Do not rewrite generated files by hand and do not
remove provenance from source data.

## Verification

- Add a failing unit test proving that a Safety at Scale card hides the source
  chip and attribution sentence while retaining the domain, interaction mode,
  and evaluation focus.
- Verify the same behavior in English and Chinese.
- Regenerate site data, then run Python tests, Node tests, TypeScript, lint,
  static build, and external-link checks.
- Inspect the English and Chinese benchmark pages in a browser before release.
