import json
import pathlib
import unittest


ROOT = pathlib.Path(__file__).parents[2]


class ReviewedBenchmarkSourceTests(unittest.TestCase):
    def test_mobile_safety_bench_uses_only_verified_official_sources(self):
        records = json.loads(
            (ROOT / "scripts" / "data" / "agent-benchmark-records.json").read_text()
        )
        record = next(item for item in records if item["name"] == "MobileSafetyBench")

        self.assertEqual(record["arxivId"], "2410.17520")
        self.assertEqual(record["sourceUrl"], "https://mobilesafetybench.github.io/")
        self.assertEqual(record["sourceLabel"], "Official project")
        self.assertEqual(record["domain"], "Agents")
        self.assertIn("250 tasks", record["size"])

        resolved = json.loads(
            (ROOT / "scripts" / "data" / "benchmark-resolved.json").read_text()
        )
        github = next(
            item["github"]
            for item in resolved.values()
            if item.get("name") == "MobileSafetyBench"
        )
        self.assertEqual(github["repo"], "jylee425/mobilesafetybench")
        self.assertEqual(github["stars"], 37)
        self.assertEqual(github["license"], "Apache-2.0")

    def test_generated_mobile_safety_bench_does_not_claim_survey_provenance(self):
        generated = (ROOT / "src" / "data" / "site.ts").read_text()
        start = generated.index('name: "MobileSafetyBench"')
        chunk = generated[start : start + 2_500]

        self.assertIn("https://arxiv.org/abs/2410.17520", chunk)
        self.assertIn("https://github.com/jylee425/mobilesafetybench", chunk)
        self.assertIn("https://mobilesafetybench.github.io/", chunk)
        self.assertNotIn("Safety at Scale Table 14", chunk)

    def test_submitted_resources_are_a_separate_unpublished_review_queue(self):
        queue_path = ROOT / "scripts" / "data" / "submitted-resources.json"
        queue = json.loads(queue_path.read_text())

        self.assertEqual(queue["schemaVersion"], 1)
        self.assertEqual(queue["allowedKinds"], ["paper", "benchmark", "dataset"])
        self.assertEqual(queue["allowedStatuses"], ["pending", "approved", "rejected"])
        self.assertEqual(queue["items"], [])

        generator = (ROOT / "scripts" / "generate-site.py").read_text()
        self.assertNotIn("submitted-resources.json", generator)


if __name__ == "__main__":
    unittest.main()
