import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "resolve-paper-fulltext-links.py"


def load_module():
    spec = importlib.util.spec_from_file_location("resolve_paper_fulltext_links", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class ResolvePaperFulltextLinksTests(unittest.TestCase):
    def test_selects_one_exact_title_with_public_pdf(self):
        module = load_module()
        works = [
            {
                "id": "https://openalex.org/W1",
                "title": "An Exact—Title",
                "doi": "https://doi.org/10.1/example",
                "best_oa_location": {
                    "is_oa": True,
                    "landing_page_url": "https://example.org/paper",
                    "pdf_url": "https://example.org/paper.pdf",
                },
                "locations": [
                    {"is_oa": True, "pdf_url": "https://mirror.example.org/paper.pdf"}
                ],
            },
            {"id": "https://openalex.org/W2", "title": "Only a fuzzy title"},
        ]

        selected = module.select_exact_public_fulltext("An exact title", works)

        self.assertEqual(selected["openAlexId"], "https://openalex.org/W1")
        self.assertEqual(selected["pdfUrl"], "https://example.org/paper.pdf")
        self.assertEqual(
            selected["pdfCandidates"],
            ["https://example.org/paper.pdf", "https://mirror.example.org/paper.pdf"],
        )

    def test_rejects_ambiguous_exact_titles(self):
        module = load_module()
        works = [
            {"id": "https://openalex.org/W1", "title": "Same", "best_oa_location": {"is_oa": True, "pdf_url": "https://a.test/a.pdf"}},
            {"id": "https://openalex.org/W2", "title": "Same", "best_oa_location": {"is_oa": True, "pdf_url": "https://b.test/b.pdf"}},
        ]

        self.assertIsNone(module.select_exact_public_fulltext("Same", works))

    def test_rejects_exact_record_without_public_pdf(self):
        module = load_module()
        works = [
            {
                "id": "https://openalex.org/W1",
                "title": "Exact",
                "best_oa_location": {
                    "is_oa": True,
                    "landing_page_url": "https://example.org/landing",
                    "pdf_url": None,
                },
            }
        ]

        self.assertIsNone(module.select_exact_public_fulltext("Exact", works))

    def test_recovers_preverified_resolution_from_download_audit(self):
        module = load_module()
        recovered = module.recover_from_download_audit(
            {"Exact": {"status": "lookup_error", "domain": "Embodied AI"}},
            {
                "Exact": {
                    "status": "download_error",
                    "domain": "Embodied AI",
                    "openAlexId": "https://openalex.org/W123",
                    "sourcePdfUrl": "https://example.org/paper.pdf",
                }
            },
        )

        self.assertEqual(recovered["Exact"]["status"], "resolved")
        self.assertEqual(recovered["Exact"]["pdfCandidates"], ["https://example.org/paper.pdf"])


if __name__ == "__main__":
    unittest.main()
