import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "paper_author_metadata.py"


def load_module():
    if not MODULE_PATH.exists():
        return None
    spec = importlib.util.spec_from_file_location("paper_author_metadata", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class PaperAuthorMetadataTests(unittest.TestCase):
    def test_parses_complete_author_lists_from_official_arxiv_atom_entries(self):
        module = load_module()
        self.assertIsNotNone(module, "paper_author_metadata.py must provide the parser")
        feed = b"""<?xml version='1.0' encoding='UTF-8'?>
        <feed xmlns='http://www.w3.org/2005/Atom'>
          <entry>
            <id>http://arxiv.org/abs/2601.04566v2</id>
            <title>BackdoorAgent: A Unified Framework</title>
            <updated>2026-01-11T08:47:08Z</updated>
            <author><name>Yunhao Feng</name></author>
            <author><name>Yige Li</name></author>
            <author><name>Xingjun Ma</name></author>
          </entry>
        </feed>"""

        self.assertEqual(
            module.parse_arxiv_author_feed(feed),
            {
                "2601.04566": {
                    "arxivId": "2601.04566",
                    "authors": ["Yunhao Feng", "Yige Li", "Xingjun Ma"],
                    "title": "BackdoorAgent: A Unified Framework",
                    "updated": "2026-01-11",
                }
            },
        )

    def test_replaces_citation_shorthand_only_after_an_exact_title_match(self):
        module = load_module()
        self.assertIsNotNone(module, "paper_author_metadata.py must provide the merger")
        paper = {
            "arxivId": "2601.04566",
            "authorCount": 1,
            "authors": ["Feng et al"],
            "title": "BackdoorAgent: A Unified Framework",
        }
        metadata = {
            "2601.04566": {
                "arxivId": "2601.04566",
                "authors": ["Yunhao Feng", "Yige Li", "Xingjun Ma"],
                "title": "BackdoorAgent: A Unified Framework",
            }
        }

        merged = module.with_verified_authors(paper, metadata)

        self.assertEqual(merged["authors"], ["Yunhao Feng", "Yige Li", "Xingjun Ma"])
        self.assertEqual(merged["authorCount"], 3)

    def test_does_not_apply_authors_when_the_arxiv_title_does_not_match(self):
        module = load_module()
        self.assertIsNotNone(module, "paper_author_metadata.py must provide the merger")
        paper = {
            "arxivId": "2601.04566",
            "authorCount": 1,
            "authors": ["Feng et al"],
            "title": "Different paper",
        }
        metadata = {
            "2601.04566": {
                "arxivId": "2601.04566",
                "authors": ["Yunhao Feng", "Yige Li"],
                "title": "BackdoorAgent: A Unified Framework",
            }
        }

        self.assertEqual(module.with_verified_authors(paper, metadata), paper)

    def test_accepts_a_near_exact_title_whose_long_prefix_is_unchanged(self):
        module = load_module()
        self.assertIsNotNone(module, "paper_author_metadata.py must provide the merger")
        paper = {
            "arxivId": "2604.05510",
            "authorCount": 1,
            "authors": ["Xiu et al"],
            "title": "Benchmarking Vision-Language Models under Contradictory Virtual Content Attacks in AR",
        }
        metadata = {
            "2604.05510": {
                "arxivId": "2604.05510",
                "authors": ["Verified First", "Verified Second"],
                "title": "Benchmarking Vision-Language Models under Contradictory Virtual Content Attacks in Augmented Reality",
            }
        }

        merged = module.with_verified_authors(paper, metadata)

        self.assertEqual(merged["authors"], ["Verified First", "Verified Second"])


if __name__ == "__main__":
    unittest.main()
