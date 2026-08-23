import json
import pathlib
import re
import unittest


ROOT = pathlib.Path(__file__).parents[2]
DATA = ROOT / "scripts" / "data"


class PaperMetadataOverrideTests(unittest.TestCase):
    def test_every_override_is_source_backed_and_matches_a_published_paper(self):
        payload = json.loads((DATA / "paper-metadata-overrides.json").read_text())
        library = json.loads((DATA / "paper-library.json").read_text())
        papers = {paper["title"].casefold(): paper for paper in library}

        for override in payload["records"]:
            self.assertTrue(override["source"].startswith("https://"))
            self.assertTrue(override["evidence"])
            self.assertIn(override["title"].casefold(), papers)

    def test_white_box_prompt_injection_uses_the_journal_not_the_platform(self):
        library = json.loads((DATA / "paper-library.json").read_text())
        paper = next(
            item
            for item in library
            if item["title"]
            == "A white-box prompt injection attack on embodied AI agents driven by large language models"
        )

        self.assertEqual(paper["venue"], "Journal of Systems and Software")
        self.assertEqual(paper["year"], "2026")
        self.assertEqual(paper["url"], "https://doi.org/10.1016/j.jss.2026.112782")

    def test_every_upstream_science_label_has_a_verified_correction(self):
        library = json.loads((DATA / "paper-library.json").read_text())

        self.assertFalse(
            [paper["title"] for paper in library if paper.get("venue") == "Science"]
        )

    def test_venue_labels_do_not_contain_urls_or_numbered_arxiv_identifiers(self):
        library = json.loads((DATA / "paper-library.json").read_text())

        for paper in library:
            venue = paper.get("venue") or ""
            self.assertFalse(re.match(r"https?://", venue, re.I), paper["title"])
            self.assertFalse(
                re.fullmatch(r"arXiv(?:\s+preprint)?(?:\s+arXiv)?[.: ]*\d[\d.]*", venue, re.I),
                paper["title"],
            )


if __name__ == "__main__":
    unittest.main()
