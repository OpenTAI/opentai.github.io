import json
import unittest
from pathlib import Path

from scripts.dataset_catalog import (
    MISSING_DESCRIPTION,
    dataset_summary,
    filter_scoped_datasets,
    validate_dataset_scope_audit,
    validate_dataset_summaries,
)


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "scripts" / "data" / "training-datasets.json"
GENERATOR = ROOT / "scripts" / "generate-site.py"
AUDIT = ROOT / "scripts" / "data" / "dataset-scope-audit.json"


class DatasetSummaryTests(unittest.TestCase):
    def test_requires_summary_source_pair(self):
        with self.assertRaisesRegex(ValueError, "provided together"):
            validate_dataset_summaries([{"name": "A", "summary": "A sourced summary."}])

    def test_requires_http_summary_source(self):
        with self.assertRaisesRegex(ValueError, "HTTP"):
            validate_dataset_summaries([
                {"name": "A", "summary": "A sourced summary.", "summarySourceUrl": "notes.md"},
            ])

    def test_rejects_training_evidence_as_card_copy(self):
        with self.assertRaisesRegex(ValueError, "training evidence"):
            validate_dataset_summaries([{
                "name": "A",
                "summary": "The model trains on A.",
                "summarySourceUrl": "https://example.org/a",
                "trainingEvidence": "The model trains on A.",
            }])

    def test_uses_explicit_missing_description_fallback(self):
        self.assertEqual(dataset_summary({"name": "A"}), MISSING_DESCRIPTION)

    def test_canonical_catalog_summaries_are_valid(self):
        records = json.loads(SOURCE.read_text())["items"]
        validate_dataset_summaries(records)
        for record in records:
            note = dataset_summary(record)
            self.assertNotEqual(note, record.get("trainingEvidence"))
            if not record.get("summary"):
                self.assertEqual(note, MISSING_DESCRIPTION)

    def test_generator_uses_public_dataset_summaries(self):
        generator = GENERATOR.read_text()
        self.assertIn("validate_dataset_summaries(TRAINING_DATASETS)", generator)
        self.assertIn('row["note"] = dataset_summary(rec)', generator)

    def test_scope_audit_is_complete_and_filters_exclusions(self):
        records = json.loads(SOURCE.read_text())["items"]
        audit = json.loads(AUDIT.read_text())["records"]
        validate_dataset_scope_audit(records, audit)
        kept = filter_scoped_datasets(records, audit)

        self.assertGreater(len(kept), 0)
        self.assertLess(len(kept), len(records))
        self.assertNotIn("IWSLT 2014 En-De", {record["name"] for record in kept})
        self.assertNotIn("Stanford Alpaca", {record["name"] for record in kept})
        self.assertIn("Aegis 2.0", {record["name"] for record in kept})
        self.assertIn("HH-RLHF", {record["name"] for record in kept})

    def test_scope_audit_rejects_unknown_and_duplicate_names(self):
        records = [{"name": "A"}]
        invalid = [
            {"name": "A", "status": "keep", "reason": "reviewed", "sourceUrl": "https://example.org/a"},
            {"name": "A", "status": "exclude", "reason": "duplicate", "sourceUrl": "https://example.org/a"},
            {"name": "B", "status": "keep", "reason": "unknown", "sourceUrl": "https://example.org/b"},
        ]
        with self.assertRaises(ValueError):
            validate_dataset_scope_audit(records, invalid)

    def test_generator_filters_to_reviewed_keep_records(self):
        generator = GENERATOR.read_text()
        self.assertIn('DATASET_SCOPE_AUDIT = json.load(open(DATA / "dataset-scope-audit.json"))', generator)
        self.assertIn("filter_scoped_datasets(TRAINING_DATASETS, DATASET_SCOPE_AUDIT", generator)


if __name__ == "__main__":
    unittest.main()
