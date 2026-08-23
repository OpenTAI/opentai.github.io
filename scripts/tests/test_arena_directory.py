import json
import pathlib
import unittest
from urllib.parse import urlparse


ROOT = pathlib.Path(__file__).resolve().parents[2]
DIRECTORY = ROOT / "scripts" / "data" / "arena-directory.json"


class ArenaDirectoryTest(unittest.TestCase):
    def test_records_are_source_backed_and_include_ranked_snapshots(self):
        payload = json.loads(DIRECTORY.read_text())
        records = payload["records"]

        self.assertEqual(payload["schemaVersion"], 1)
        self.assertEqual([record["name"] for record in records], ["Gray Swan Arena", "CyberGym", "ExploitGym"])
        self.assertEqual({record["type"] for record in records}, {"Agent Safety", "Cyber"})

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
            for field in ("url", "source"):
                parsed = urlparse(record[field])
                self.assertEqual(parsed.scheme, "https")
                self.assertTrue(parsed.netloc)
            self.assertGreaterEqual(len(record["links"]), 3)
            for link in record["links"]:
                self.assertTrue(link["label"].strip())
                parsed = urlparse(link["url"])
                self.assertEqual(parsed.scheme, "https")
                self.assertTrue(parsed.netloc)

        self.assertEqual([result["rank"] for result in records[0]["results"]], [1, 2, 3])
        for record in records[1:]:
            self.assertEqual([result["rank"] for result in record["results"]], [1, 2, 3, 4, 5])

        gray_swan = records[0]
        self.assertEqual(gray_swan["metric"], "Attack Success Rate ↓")
        self.assertEqual(gray_swan["results"][0]["name"], "Claude Opus 4.5")
        self.assertEqual(gray_swan["results"][0]["value"], "0.5%")

        cybergym = records[1]
        self.assertEqual(cybergym["results"][2]["name"], "MDASH")
        self.assertEqual(cybergym["results"][3]["name"], "Wiz Atlas")


if __name__ == "__main__":
    unittest.main()
