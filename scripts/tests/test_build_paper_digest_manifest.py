import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "build-paper-digest-manifest.py"


def load_module():
    spec = importlib.util.spec_from_file_location("build_paper_digest_manifest", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class BuildPaperDigestManifestTests(unittest.TestCase):
    def test_deduplicates_ids_and_keeps_all_paper_uses(self):
        module = load_module()
        papers = [
            {"title": "First", "arxivId": "2401.00001v2", "domain": "LLMs"},
            {"title": "Duplicate use", "arxivId": "2401.00001", "domain": "Agents"},
            {"title": "Second", "url": "https://arxiv.org/abs/2402.00002", "domain": "Embodied AI"},
        ]

        manifest = module.build_manifest(papers)

        self.assertEqual(manifest["arxivIds"], ["2401.00001", "2402.00002"])
        self.assertEqual(len(manifest["papers"]), 3)
        self.assertEqual(manifest["papers"][0]["arxivId"], "2401.00001")
        self.assertEqual(manifest["papers"][1]["arxivId"], "2401.00001")

    def test_records_unresolved_papers_without_guessing(self):
        module = load_module()
        papers = [
            {"title": "No public identifier", "domain": "LLMs", "url": None},
            {"title": "DOI only", "domain": "Agents", "url": "https://doi.org/10.1/example"},
        ]

        manifest = module.build_manifest(papers)

        self.assertEqual(manifest["arxivIds"], [])
        self.assertEqual(
            manifest["unresolved"],
            [
                {"title": "No public identifier", "domain": "LLMs", "url": None},
                {"title": "DOI only", "domain": "Agents", "url": "https://doi.org/10.1/example"},
            ],
        )

    def test_accepts_only_preverified_exact_title_resolutions(self):
        module = load_module()
        papers = [
            {"title": "Exact paper", "domain": "Embodied AI", "url": None},
            {"title": "Still unresolved", "domain": "LLMs", "url": None},
        ]
        resolutions = {
            "Exact paper": {
                "status": "resolved",
                "matchedTitle": "Exact paper",
                "arxivId": "2401.00001v2",
                "queryUrl": "https://export.arxiv.org/api/query?exact",
            },
            "Still unresolved": {
                "status": "no_exact_match",
                "arxivId": None,
            },
        }

        manifest = module.build_manifest(papers, resolutions)

        self.assertEqual(manifest["arxivIds"], ["2401.00001"])
        self.assertEqual(manifest["resolvedPaperCount"], 1)
        self.assertEqual(manifest["unresolvedPaperCount"], 1)
        self.assertEqual(
            manifest["papers"][0]["resolutionSourceUrl"],
            "https://export.arxiv.org/api/query?exact",
        )


if __name__ == "__main__":
    unittest.main()
