import contextlib
import io
import json
import pathlib
import re
import runpy
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[2]


def generated_array(text, name):
    array = re.search(rf'export const {name}: readonly string\[\] =\s*(\[.*?\])\s*;', text, re.S).group(1)
    return json.loads(re.sub(r',\s*\]', ']', array))


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
        actual = generated_array(text, 'trendingBenchmarkSlugs')
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

    def test_dataset_ledger_covers_every_dataset_once_and_drives_generated_list(self):
        path = ROOT / 'scripts/data/dataset-trending-audit.json'
        self.assertTrue(path.exists(), 'dataset trending audit ledger is missing')
        audit = json.loads(path.read_text())['records']
        rows = self.generated['dataset_trending_rows']
        self.assertEqual(len(audit), len(rows))
        self.assertEqual({entry['slug'] for entry in audit}, {row['slug'] for row in rows})
        self.assertEqual(len({entry['slug'] for entry in audit}), len(audit))
        self.assertEqual(self.generated['missing_trending_reviews'](rows, audit, 'dataset'), [])
        actual = generated_array((ROOT / 'src/data/trending.ts').read_text(), 'trendingDatasetSlugs')
        self.assertEqual(set(actual), {entry['slug'] for entry in audit if entry['status'] == 'keep'})
        catalog = {row['slug'] for row in self.generated['dataset_summary_config']['tableRows']}
        self.assertNotIn('openassistant-oasst1', actual)
        self.assertIn('openassistant-oasst1', catalog)
        self.assertIn('bot-adversarial-dialogue', actual)
        self.assertIn('advbench', actual)
        by_slug = {entry['slug']: entry for entry in audit}
        self.assertEqual(by_slug['bot-adversarial-dialogue'].get('starsSource'), 'https://github.com/facebookresearch/ParlAI')

    def test_dataset_rows_carry_github_repo_for_trending_dedupe(self):
        rows = {row['name']: row for row in self.generated['dataset_summary_config']['tableRows']}
        self.assertEqual(rows['AdvBench'].get('repo'), 'llm-attacks/llm-attacks')
        self.assertEqual(rows['HH-RLHF'].get('repo'), rows['Anthropic Red Team Attempts'].get('repo'))
        self.assertEqual(rows['PKU-SafeRLHF'].get('repo'), 'PKU-Alignment/safe-rlhf')


if __name__ == '__main__':
    unittest.main()
