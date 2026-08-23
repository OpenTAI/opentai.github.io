import json
import pathlib
import unittest
from urllib.parse import urlparse


ROOT = pathlib.Path(__file__).resolve().parents[2]
DIRECTORY = ROOT / "scripts" / "data" / "leaderboard-directory.json"


class LeaderboardDirectoryTest(unittest.TestCase):
    def test_records_are_source_backed_and_include_ranked_snapshots(self):
        payload = json.loads(DIRECTORY.read_text())
        records = payload["records"]

        self.assertEqual(payload["schemaVersion"], 2)
        self.assertEqual(len({record["name"] for record in records}), len(records))
        self.assertEqual({record["type"] for record in records}, {"LLM Safety", "Agent Safety", "Fairness"})

        for record in records:
            for field in (
                "name",
                "type",
                "focus",
                "focusZh",
                "metric",
                "metricZh",
                "snapshotDate",
                "url",
                "source",
                "verificationNote",
            ):
                self.assertIsInstance(record[field], str)
                self.assertTrue(record[field].strip(), f"{record['name']}: missing {field}")
            self.assertEqual([result["rank"] for result in record["results"]], [1, 2, 3])
            for result in record["results"]:
                for field in ("name", "value"):
                    self.assertIsInstance(result[field], str)
                    self.assertTrue(result[field].strip())
            for field in ("url", "source"):
                parsed = urlparse(record[field])
                self.assertEqual(parsed.scheme, "https", f"{record['name']}: invalid {field}")
                self.assertTrue(parsed.netloc, f"{record['name']}: invalid {field}")


if __name__ == "__main__":
    unittest.main()
