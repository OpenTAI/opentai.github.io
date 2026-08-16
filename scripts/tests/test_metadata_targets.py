import pathlib
import sys
import unittest


SCRIPTS_DIR = pathlib.Path(__file__).parents[1]
sys.path.insert(0, str(SCRIPTS_DIR))


class MetadataTargetsTests(unittest.TestCase):
    def test_training_row_without_paper_url_still_contributes_public_targets(self):
        from metadata_targets import training_metadata_targets

        targets = training_metadata_targets(
            [
                {
                    "name": "ReleasedData",
                    "dataUrl": "https://huggingface.co/datasets/example/released-data",
                    "githubUrl": "https://github.com/example/released-data",
                }
            ]
        )

        self.assertEqual(
            targets["huggingface"]["ReleasedData"],
            "example/released-data",
        )
        self.assertEqual(
            targets["github"]["ReleasedData"],
            "example/released-data",
        )
        self.assertNotIn("ReleasedData", targets["arxiv"])


if __name__ == "__main__":
    unittest.main()
