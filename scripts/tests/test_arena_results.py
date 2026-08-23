import json
import pathlib
import unittest
from urllib.parse import urlparse


ROOT = pathlib.Path(__file__).resolve().parents[2]
RESULTS = ROOT / "scripts" / "data" / "arena-results.json"


class ArenaResultsTest(unittest.TestCase):
    def test_official_chart_snapshot_is_complete_and_source_backed(self):
        payload = json.loads(RESULTS.read_text())

        self.assertEqual(payload["schemaVersion"], 1)
        self.assertEqual(
            [benchmark["name"] for benchmark in payload["benchmarks"]],
            ["Firefox", "OSS-Fuzz", "CyberGym", "CyScenarioBench"],
        )
        self.assertEqual(len(payload["series"]), 5)
        self.assertEqual(
            next(series for series in payload["series"] if series["name"] == "Claude Mythos 5")["values"],
            [88.4, 24.0, 83.8, 38.7],
        )
        for series in payload["series"]:
            self.assertEqual(len(series["values"]), len(payload["benchmarks"]))

        source = urlparse(payload["source"])
        self.assertEqual(source.scheme, "https")
        self.assertEqual(source.netloc, "www.anthropic.com")
        self.assertIn("different metric", payload["note"])


if __name__ == "__main__":
    unittest.main()
