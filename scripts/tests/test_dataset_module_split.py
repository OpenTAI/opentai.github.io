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


if __name__ == "__main__":
    unittest.main()
