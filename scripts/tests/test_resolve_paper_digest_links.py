import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "resolve-paper-digest-links.py"


def load_module():
    spec = importlib.util.spec_from_file_location("resolve_paper_digest_links", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class ResolvePaperDigestLinksTests(unittest.TestCase):
    def test_accepts_only_exact_normalized_title(self):
        module = load_module()
        entries = [
            {"title": "  A Dataset: For Safe Agents  ", "arxivId": "2401.00001v2"},
            {"title": "A Dataset for Safe Agents Extended", "arxivId": "2401.00002"},
        ]

        self.assertEqual(
            module.select_exact_match("A Dataset — for Safe Agents", entries),
            {"title": "A Dataset: For Safe Agents", "arxivId": "2401.00001"},
        )

    def test_rejects_prefix_and_fuzzy_matches(self):
        module = load_module()
        entries = [{"title": "Safety Agents: An Extended Study", "arxivId": "2401.00002"}]

        self.assertIsNone(module.select_exact_match("Safety Agents", entries))

    def test_rejects_ambiguous_duplicate_exact_results(self):
        module = load_module()
        entries = [
            {"title": "Same Title", "arxivId": "2401.00001"},
            {"title": "Same Title", "arxivId": "2401.00002"},
        ]

        self.assertIsNone(module.select_exact_match("Same Title", entries))


if __name__ == "__main__":
    unittest.main()
