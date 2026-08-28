import json
import unittest
from pathlib import Path

from scripts.dataset_catalog import (
    MISSING_DESCRIPTION,
    dataset_summary,
    validate_dataset_summaries,
)


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "scripts" / "data" / "training-datasets.json"
GENERATOR = ROOT / "scripts" / "generate-site.py"


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


if __name__ == "__main__":
    unittest.main()
