import pathlib
import json
import unittest


ROOT = pathlib.Path(__file__).parents[2]


class DatasetModuleSplitTests(unittest.TestCase):
    def test_dataset_catalog_is_generated_outside_shared_site_module(self):
        generator = (ROOT / "scripts" / "generate-site.py").read_text()
        datasets_module = ROOT / "src" / "data" / "datasets.ts"
        site_module = (ROOT / "src" / "data" / "site.ts").read_text()

        self.assertTrue(datasets_module.exists())
        self.assertIn("DATASETS_OUT", generator)
        self.assertIn("export const datasetConfig", datasets_module.read_text())
        self.assertIn("datasets: {", site_module)
        self.assertNotIn("sourcePapers:", site_module)

    def test_collection_view_loads_dataset_config_from_dedicated_module(self):
        component = (ROOT / "src" / "components" / "collection-page-view.tsx").read_text()

        self.assertIn('from "@/data/datasets"', component)
        self.assertRegex(component, r'slug\s*===\s*"datasets"\s*\?\s*datasetConfig')

    def test_generated_rows_carry_usage_and_source_paper_data(self):
        expected = len(
            json.loads((ROOT / "scripts" / "data" / "training-datasets.json").read_text())["items"]
        )
        generated = (ROOT / "src" / "data" / "datasets.ts").read_text()

        self.assertEqual(generated.count("usageCount:"), expected)
        self.assertEqual(generated.count("sourcePapers:"), expected)

    def test_generated_dataset_strings_escape_embedded_newlines(self):
        generated = (ROOT / "src" / "data" / "datasets.ts").read_text()

        self.assertNotIn("suggestions.\n\nTraining-use context", generated)
        self.assertIn("suggestions.\\n\\nTraining-use context", generated)

    def test_generator_uses_only_verified_benchmark_repositories_for_stars(self):
        generator = (ROOT / "scripts" / "generate-site.py").read_text()

        self.assertIn("benchmark-resolved.json", generator)
        self.assertIn("verified_benchmark_github", generator)

    def test_salad_bench_uses_official_question_count_with_units(self):
        generated = (ROOT / "src" / "data" / "site.ts").read_text()

        self.assertIn("21K base questions / 16 tasks / 66 categories", generated)

    def test_generated_brand_and_dataset_copy_match_team_approved_text(self):
        site = (ROOT / "src" / "data" / "site.ts").read_text()
        datasets = (ROOT / "src" / "data" / "datasets.ts").read_text()

        self.assertIn('contactEmail: "contact.opentai@gmail.com"', site)
        self.assertIn(
            "Open-source safety datasets for training safer LLMs, Agents, and Embodied AI models.",
            datasets,
        )
        self.assertIn(
            "Open-source safety benchmarks for evaluating LLMs, Agents, and Embodied AI.",
            site,
        )


if __name__ == "__main__":
    unittest.main()
