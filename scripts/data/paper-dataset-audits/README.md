# Paper dataset audits

These files preserve the paper-level decisions behind the training dataset
catalog. They are evidence records, not generated website modules.

- `approved` means the paper explicitly uses a named, publicly accessible
  resource for training, fine-tuning, alignment, classifier training,
  imitation learning, or offline reinforcement learning.
- Test-only data, evaluation-only benchmarks, task environments, models,
  methods, unreleased data, and ambiguous mentions remain rejected.
- A name or repository search result is never enough. Link-enrichment files
  record why an official paper, repository, data card, or project page is the
  same resource.

`scripts/consolidate-paper-dataset-audits.py` merges approved records into
`training-datasets.json`, `paper-dataset-mentions.json`, and explicit alias
overrides. It refuses to publish an item without a verified public data URL.

Current reviewed output: 155 unique datasets and 570 paper-level training-use
mentions. Three candidates remain unresolved because a currently reachable authoritative public
release cannot be assigned. The full-text resolver also records 138 approved-
list papers without exact public full text; those are a documented coverage gap
and are never completed from title similarity or abstract-only inference.
