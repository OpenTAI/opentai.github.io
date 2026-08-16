import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "extract-paper-dataset-candidates.py"


def load_module():
    spec = importlib.util.spec_from_file_location("extract_paper_dataset_candidates", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class ExtractPaperDatasetCandidatesTests(unittest.TestCase):
    def test_marks_training_usage(self):
        module = load_module()
        evidence = "We train the model on ImageNet and then fine-tune it on COCO."

        self.assertEqual(module.classify_usage(evidence), "training")

    def test_marks_explicit_train_split_as_training(self):
        module = load_module()
        evidence = "LIBERO provides train and validation splits for imitation learning."

        self.assertEqual(module.classify_usage(evidence), "training")

    def test_keeps_test_only_resource_out_of_training(self):
        module = load_module()
        evidence = "We evaluate the agent on AgentBackdoorEval as a held-out test benchmark."

        self.assertEqual(module.classify_usage(evidence), "evaluation")

    def test_marks_unqualified_dataset_mention_ambiguous(self):
        module = load_module()
        evidence = "The paper discusses the RealToxicityPrompts dataset."

        self.assertEqual(module.classify_usage(evidence), "ambiguous")

    def test_training_signal_wins_when_sentence_also_reports_evaluation(self):
        module = load_module()
        evidence = "We train on D4RL and evaluate the resulting policy in held-out environments."

        self.assertEqual(module.classify_usage(evidence), "training")

    def test_candidate_record_preserves_exact_source_evidence(self):
        module = load_module()
        records = module.extract_candidates_from_text(
            "We fine-tune on the SafeRLHF dataset before evaluation.",
            paper={"arxivId": "2401.00001", "title": "A paper", "domain": "LLMs"},
            source_type="section",
            source_id="sec-3",
        )

        self.assertEqual(len(records), 1)
        self.assertEqual(records[0]["candidateName"], "SafeRLHF")
        self.assertEqual(records[0]["role"], "training")
        self.assertEqual(records[0]["evidence"], "We fine-tune on the SafeRLHF dataset before evaluation.")
        self.assertEqual(records[0]["source"], {"type": "section", "id": "sec-3"})

    def test_attaches_structured_bibliography_for_cited_dataset(self):
        module = load_module()
        digest = {
            "sections": [
                {
                    "id": "sec-2",
                    "text": "We fine-tune on the SafeRLHF dataset [@safe-rlhf].",
                }
            ],
            "tables": [],
            "citations": [
                {
                    "key": "safe-rlhf",
                    "title": "SafeRLHF: Safe Reinforcement Learning from Human Feedback",
                    "year": "2024",
                    "bib_raw": "@article{safe-rlhf, title={SafeRLHF}}",
                }
            ],
        }

        records = module.extract_digest(
            digest,
            {"arxivId": "2401.00001", "title": "A paper", "domain": "LLMs"},
        )

        self.assertEqual(records[0]["citationKeys"], ["safe-rlhf"])
        self.assertEqual(records[0]["citations"][0]["title"], digest["citations"][0]["title"])


if __name__ == "__main__":
    unittest.main()
