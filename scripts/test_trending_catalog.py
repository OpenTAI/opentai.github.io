"""Homepage eligibility must fail closed without changing the benchmark catalog."""
import copy
import importlib.util
import pathlib
import unittest

HERE = pathlib.Path(__file__).parent


class TrendingCatalogTest(unittest.TestCase):
    def setUp(self):
        spec = importlib.util.spec_from_file_location('trending_catalog', HERE / 'trending_catalog.py')
        self.assertTrue(pathlib.Path(spec.origin).exists(), 'trending catalog validation is not implemented')
        self.module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.module)
        self.rows = [{'slug': 'safe-one', 'name': 'Safe One'}, {'slug': 'general', 'name': 'General'}]
        self.audit = [{'slug': 'safe-one', 'name': 'Safe One', 'status': 'keep',
                       'reason': 'Official benchmark tests harmful instruction refusal.',
                       'sourceUrls': ['https://example.org/paper'], 'reviewedAt': '2026-10-08'}]

    def test_missing_review_defaults_to_excluded_and_reports_name(self):
        self.assertEqual(self.module.trending_benchmark_slugs(self.rows, self.audit), ['safe-one'])
        self.assertEqual(self.module.missing_trending_reviews(self.rows, self.audit), ['General (general)'])
        self.assertEqual(self.module.trending_benchmark_slugs(self.rows, []), [])

    def test_explicit_exclusion_wins(self):
        self.audit[0]['status'] = 'exclude'
        self.assertEqual(self.module.trending_benchmark_slugs(self.rows, self.audit), [])

    def test_invalid_records_are_rejected(self):
        invalid = [('slug', 'unknown'), ('slug', ''), ('slug', 2), ('name', 'Wrong'),
                   ('status', 'maybe'), ('reason', ''), ('reason', 8), ('sourceUrls', []),
                   ('sourceUrls', ['javascript:alert(1)']), ('sourceUrls', ['https://']),
                   ('sourceUrls', ['https://exa mple.org']), ('sourceUrls', 'https://example.org'),
                   ('reviewedAt', '2026-02-30'), ('reviewedAt', 'yesterday'), ('reviewedAt', 3)]
        for key, value in invalid:
            with self.subTest(key=key, value=value):
                audit = copy.deepcopy(self.audit)
                audit[0][key] = value
                with self.assertRaises(ValueError):
                    self.module.trending_benchmark_slugs(self.rows, audit)

    def test_duplicate_reviews_and_catalog_ids_are_rejected(self):
        with self.assertRaisesRegex(ValueError, 'duplicate'):
            self.module.trending_benchmark_slugs(self.rows, self.audit * 2)
        with self.assertRaisesRegex(ValueError, 'duplicate'):
            self.module.trending_benchmark_slugs(self.rows * 2, self.audit)

    def test_bad_container_and_rows_are_rejected(self):
        for audit in [None, {}, [None], ['safe-one']]:
            with self.subTest(audit=audit), self.assertRaises(ValueError):
                self.module.trending_benchmark_slugs(self.rows, audit)
        with self.assertRaises(ValueError):
            self.module.trending_benchmark_slugs([{'name': 'No slug'}], [])


if __name__ == '__main__':
    unittest.main()
