import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "build-paper-dataset-catalog.py"


def load_module():
    spec = importlib.util.spec_from_file_location("build_paper_dataset_catalog", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class BuildPaperDatasetCatalogTests(unittest.TestCase):
    def test_deduplicates_aliases_and_counts_unique_citing_papers(self):
        module = load_module()
        metadata = [
            {
                "name": "MS COCO",
                "year": "2014",
                "dataUrl": "https://cocodataset.org/",
                "trainingEvidence": "Official data release.",
            }
        ]
        aliases = {"COCO": "MS COCO", "Microsoft COCO": "MS COCO"}
        mentions = [
            {
                "datasetName": "COCO",
                "status": "approved",
                "role": "training",
                "paper": {"arxivId": "2401.00001", "title": "First", "domain": "Embodied AI"},
                "evidence": "We train on COCO.",
            },
            {
                "datasetName": "Microsoft COCO",
                "status": "approved",
                "role": "training",
                "paper": {"arxivId": "2401.00002", "title": "Second", "domain": "LLMs"},
                "evidence": "Microsoft COCO is used for training.",
            },
            {
                "datasetName": "MS COCO",
                "status": "approved",
                "role": "training",
                "paper": {"arxivId": "2401.00001", "title": "First", "domain": "Embodied AI"},
                "evidence": "The training split is reused.",
            },
        ]

        rows = module.build_catalog(metadata, mentions, aliases)

        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["name"], "MS COCO")
        self.assertEqual(rows[0]["domains"], ["LLMs", "Embodied AI"])
        self.assertEqual(rows[0]["usageCount"], 2)
        self.assertEqual([paper["arxivId"] for paper in rows[0]["sourcePapers"]], ["2401.00001", "2401.00002"])

    def test_rejects_unapproved_and_evaluation_only_mentions(self):
        module = load_module()
        metadata = [{"name": "AgentBench", "dataUrl": "https://example.test/data"}]
        mentions = [
            {
                "datasetName": "AgentBench",
                "status": "approved",
                "role": "evaluation",
                "paper": {"arxivId": "2401.00001", "title": "First", "domain": "Agents"},
                "evidence": "We evaluate on AgentBench.",
            },
            {
                "datasetName": "AgentBench",
                "status": "pending",
                "role": "training",
                "paper": {"arxivId": "2401.00002", "title": "Second", "domain": "Agents"},
                "evidence": "Possible training use; not verified.",
            },
        ]

        self.assertEqual(module.build_catalog(metadata, mentions, {}), [])

    def test_fails_closed_when_approved_name_has_no_verified_metadata(self):
        module = load_module()
        mentions = [
            {
                "datasetName": "UnverifiedData",
                "status": "approved",
                "role": "training",
                "paper": {"arxivId": "2401.00001", "title": "First", "domain": "LLMs"},
                "evidence": "Used for training.",
            }
        ]

        with self.assertRaisesRegex(ValueError, "UnverifiedData"):
            module.build_catalog([], mentions, {})

    def test_can_preserve_existing_verified_metadata_with_source_disclosure(self):
        module = load_module()
        metadata = [
            {
                "name": "VerifiedData",
                "domain": "LLMs",
                "paperUrl": "https://arxiv.org/abs/2401.00001",
                "dataUrl": "https://example.test/data",
                "trainingEvidence": "The primary paper explicitly uses the released training split.",
            }
        ]

        rows = module.build_catalog(metadata, [], {}, include_metadata_fallbacks=True)

        self.assertEqual(rows[0]["usageCount"], 1)
        self.assertEqual(rows[0]["domains"], ["LLMs"])
        self.assertEqual(rows[0]["sourcePapers"][0]["arxivId"], "2401.00001")
        self.assertEqual(
            rows[0]["sourcePapers"][0]["evidence"],
            metadata[0]["trainingEvidence"],
        )

    def test_counts_distinct_non_arxiv_papers_by_openalex_id(self):
        module = load_module()
        metadata = [
            {
                "name": "KITTI",
                "dataUrl": "https://www.cvlibs.net/datasets/kitti/",
                "trainingEvidence": "Used for training.",
            }
        ]
        mentions = [
            {
                "datasetName": "KITTI",
                "status": "approved",
                "role": "training",
                "paper": {"openAlexId": "W1", "title": "Paper one", "domain": "Embodied AI"},
                "evidence": "Paper one trains on KITTI.",
            },
            {
                "datasetName": "KITTI",
                "status": "approved",
                "role": "training",
                "paper": {"openAlexId": "W2", "title": "Paper two", "domain": "Embodied AI"},
                "evidence": "Paper two trains on KITTI.",
            },
        ]

        rows = module.build_catalog(metadata, mentions, {})

        self.assertEqual(rows[0]["usageCount"], 2)
        self.assertEqual(
            [paper["openAlexId"] for paper in rows[0]["sourcePapers"]],
            ["W1", "W2"],
        )


if __name__ == "__main__":
    unittest.main()
