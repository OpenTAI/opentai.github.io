import json
import pathlib
import unittest
from urllib.parse import urlparse


ROOT = pathlib.Path(__file__).resolve().parents[2]
OVERVIEW = ROOT / "scripts" / "data" / "text-arena-overview.json"


class TextArenaOverviewTest(unittest.TestCase):
    def test_snapshot_is_source_backed_and_rectangular(self):
        payload = json.loads(OVERVIEW.read_text())

        self.assertEqual(payload["schemaVersion"], 1)
        self.assertEqual(payload["snapshotDate"], "2026-08-21")
        self.assertEqual(len(payload["columns"]), 8)
        self.assertEqual(len(payload["rows"]), 10)
        self.assertEqual(payload["rows"][0]["model"], "claude-fable-5")
        self.assertEqual(payload["rows"][0]["ranks"], [1, 1, 2, 3, 2, 1, 2, 2])
        for row in payload["rows"]:
            self.assertEqual(len(row["ranks"]), len(payload["columns"]))

        source = urlparse(payload["source"])
        self.assertEqual(source.scheme, "https")
        self.assertEqual(source.netloc, "arena.ai")


if __name__ == "__main__":
    unittest.main()
