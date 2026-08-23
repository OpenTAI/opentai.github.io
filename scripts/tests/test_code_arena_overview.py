import json
import pathlib
import unittest
from urllib.parse import urlparse


ROOT = pathlib.Path(__file__).resolve().parents[2]
OVERVIEW = ROOT / "scripts" / "data" / "code-arena-overview.json"


class CodeArenaOverviewTest(unittest.TestCase):
    def test_snapshot_has_ranked_scores_and_source_prices(self):
        payload = json.loads(OVERVIEW.read_text())

        self.assertEqual(payload["schemaVersion"], 1)
        self.assertEqual(payload["snapshotDate"], "2026-08-19")
        self.assertEqual(len(payload["models"]), 10)
        self.assertEqual(
            [model["rank"] for model in payload["models"]],
            list(range(1, 11)),
        )
        self.assertEqual(payload["models"][0]["name"], "claude-opus-5-max")
        self.assertEqual(payload["models"][0]["score"], 1691)

        for model in payload["models"]:
            self.assertGreater(model["score"], 0)
            self.assertGreater(model["inputPrice"], 0)
            self.assertGreater(model["outputPrice"], 0)

        source = urlparse(payload["source"])
        self.assertEqual(source.scheme, "https")
        self.assertEqual(source.netloc, "arena.ai")


if __name__ == "__main__":
    unittest.main()
