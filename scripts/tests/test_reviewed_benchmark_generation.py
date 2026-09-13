import contextlib
import io
import json
import pathlib
import runpy
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[2]


class ReviewedBenchmarkGenerationTest(unittest.TestCase):
    def test_reviewed_records_reach_catalog_and_details_with_exact_links(self):
        sys.path.insert(0, str(ROOT / "scripts"))
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                generated = runpy.run_path(str(ROOT / "scripts/generate-site.py"))
        finally:
            sys.path.pop(0)
        records = json.loads((ROOT / "scripts/data/reviewed-benchmarks.json").read_text())["records"]
        rows = generated["bench_rows"]
        for record in records:
            with self.subTest(name=record["name"]):
                matches = [row for row in rows if row["name"] == record["name"]]
                self.assertEqual(len(matches), 1)
                row = matches[0]
                self.assertEqual(row["domain"], record["domain"])
                self.assertEqual(row["year"], record["year"])
                urls = [link["href"] for link in row["resources"]]
                self.assertIn(record["url"], urls)
                self.assertIn(record["githubUrl"], urls)
                self.assertEqual(len(urls), len(set(urls)))
                detail = generated["benchmark_details"][row["slug"]]
                self.assertEqual(detail["repo"], record["githubUrl"].removeprefix("https://github.com/"))
                if record["linkLabel"] in {"Paper", "arXiv"}:
                    self.assertEqual(detail["paperUrl"], record["url"])
        air = next(row for row in rows if row["name"] == "AIR-Bench 2024")
        self.assertEqual(air["year"], "2025")
        mm = next(row for row in rows if row["name"] == "MM-SafetyBench")
        self.assertEqual(mm["domain"], "LLMs")


if __name__ == "__main__":
    unittest.main()
