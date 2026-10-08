import contextlib
import io
import json
import pathlib
import re
import runpy
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[2]


class TrendingGenerationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        sys.path.insert(0, str(ROOT / 'scripts'))
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                cls.generated = runpy.run_path(str(ROOT / 'scripts/generate-site.py'))
        finally:
            sys.path.pop(0)

    def test_initial_ledger_covers_every_current_benchmark_once(self):
        path = ROOT / 'scripts/data/benchmark-trending-audit.json'
        self.assertTrue(path.exists(), 'complete trending audit ledger is missing')
        audit = json.loads(path.read_text())['records']
        rows = self.generated['bench_rows']
        self.assertEqual(len(audit), len(rows))
        self.assertEqual({entry['slug'] for entry in audit}, {row['slug'] for row in rows})
        self.assertEqual(len({entry['slug'] for entry in audit}), len(audit))
        self.assertEqual(self.generated['missing_trending_reviews'](rows, audit), [])

    def test_generated_module_matches_kept_slugs_and_preserves_catalog(self):
        path = ROOT / 'src/data/trending.ts'
        self.assertTrue(path.exists(), 'generated homepage eligibility module is missing')
        text = path.read_text()
        self.assertIn('export const trendingBenchmarkSlugs: readonly string[]', text)
        array = re.search(r'=\s*(\[.*\])\s*;', text, re.S).group(1)
        actual = json.loads(re.sub(r',\s*\]', ']', array))
        audit = json.loads((ROOT / 'scripts/data/benchmark-trending-audit.json').read_text())['records']
        self.assertEqual(set(actual), {entry['slug'] for entry in audit if entry['status'] == 'keep'})
        rows = self.generated['bench_rows']
        slugs = [row['slug'] for row in rows]
        self.assertEqual(len(slugs), len(set(slugs)))
        self.assertEqual(set(slugs), set(self.generated['benchmark_details']))
        self.assertNotIn('bench2drive', actual)
        self.assertIn('bench2drive', slugs)
        self.assertIn('agentdojo', actual)
        self.assertIn('truthfulqa', actual)
        self.assertIn('bbq', actual)


if __name__ == '__main__':
    unittest.main()
