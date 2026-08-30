import importlib.util
import json
import pathlib
import struct
import tempfile
import unittest


ROOT = pathlib.Path(__file__).parents[2]
VALIDATOR_PATH = ROOT / "scripts" / "validate-ecosystem-catalog.py"


def load_validator():
    spec = importlib.util.spec_from_file_location("ecosystem_validator", VALIDATOR_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def valid_catalog():
    return {
        "schemaVersion": 1,
        "models": [
            {
                "id": "example-guard",
                "name": "Example Guard",
                "category": "Guard Models",
                "description": "A source-backed example.",
                "descriptionZh": "一个有来源的示例。",
                "year": 2025,
                "links": [{"label": "GitHub", "url": "https://github.com/example/guard"}],
                "sources": ["https://github.com/example/guard"],
                "verificationNote": "Official repository.",
            }
        ],
        "frameworks": [],
        "arenas": [],
        "companies": [],
    }


class EcosystemCatalogValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.validator = load_validator()

    def test_repository_catalog_passes_validation(self):
        catalog = json.loads(
            (ROOT / "scripts" / "data" / "ecosystem-catalog.json").read_text()
        )
        self.assertEqual(self.validator.validate_catalog(catalog), [])

    def test_generated_module_exposes_each_catalog_section(self):
        generated = (ROOT / "src" / "data" / "ecosystem.ts").read_text()
        for export_name in (
            "ecosystemModels",
            "ecosystemFrameworks",
            "ecosystemArenas",
            "ecosystemCompanies",
        ):
            self.assertIn(f"export const {export_name}", generated)
        self.assertIn('id: "qwen3guard"', generated)
        self.assertIn('id: "openrt"', generated)
        self.assertIn('id: "gray-swan-arena"', generated)
        self.assertIn('id: "virtue-ai"', generated)
        self.assertIn('id: "xsafeai"', generated)

    def test_xsafeai_valuation_is_explicitly_labeled_as_an_estimate(self):
        catalog = json.loads(
            (ROOT / "scripts" / "data" / "ecosystem-catalog.json").read_text()
        )
        record = next(item for item in catalog["companies"] if item["id"] == "xsafeai")

        self.assertEqual(record["valuation"], "OpenTAI estimate · RMB 50–100M (low confidence)")
        self.assertEqual(record["valuationZh"], "OpenTAI 估算 · 人民币 5000 万–1 亿元（低置信度）")
        self.assertIn("No priced financing round", record["verificationNote"])
        self.assertIn("not an investor, transaction, or market valuation", record["verificationNote"])

    def test_xsafeai_is_the_first_company_in_the_catalog(self):
        catalog = json.loads(
            (ROOT / "scripts" / "data" / "ecosystem-catalog.json").read_text()
        )

        self.assertEqual(catalog["companies"][0]["id"], "xsafeai")

    def test_every_company_has_a_visible_sourced_or_labeled_value(self):
        catalog = json.loads(
            (ROOT / "scripts" / "data" / "ecosystem-catalog.json").read_text()
        )

        self.assertEqual(len(catalog["companies"]), 20)
        for record in catalog["companies"]:
            with self.subTest(company=record["id"]):
                self.assertTrue(record.get("valuation"))
                self.assertTrue(record.get("valuationZh"))
                self.assertRegex(record["valuation"], r"\d")
                self.assertRegex(record["valuationZh"], r"\d")
                self.assertTrue(
                    "estimate" in record["valuation"].lower()
                    or "valuation" in record["valuation"].lower()
                    or "consideration" in record["valuation"].lower()
                    or "reported range" in record["valuation"].lower()
                )
                self.assertTrue(
                    "valuation" in record["verificationNote"].lower()
                    or "consideration" in record["verificationNote"].lower()
                    or "capitalization" in record["verificationNote"].lower()
                )

    def test_cranium_and_deepkeep_use_bundled_square_official_icons(self):
        catalog = json.loads(
            (ROOT / "scripts" / "data" / "ecosystem-catalog.json").read_text()
        )
        companies = {item["id"]: item for item in catalog["companies"]}
        expected = {
            "cranium": {
                "logo": "/company-logos/cranium-icon.png",
                "logoSource": "https://cranium.ai/wp-content/themes/cranium/assets/img/favicon.png",
            },
            "deepkeep": {
                "logo": "/company-logos/deepkeep-icon.png",
                "logoSource": "https://cdn.prod.website-files.com/653f8e185245e8a3bb651914/69898e3fd4293ab6b29fb02e_d-256x256.png",
            },
        }

        for company_id, fields in expected.items():
            with self.subTest(company=company_id):
                self.assertEqual(companies[company_id]["logo"], fields["logo"])
                self.assertEqual(companies[company_id]["logoSource"], fields["logoSource"])

                asset = ROOT / "public" / fields["logo"].lstrip("/")
                payload = asset.read_bytes()
                self.assertEqual(payload[:8], b"\x89PNG\r\n\x1a\n")
                width, height = struct.unpack(">II", payload[16:24])
                self.assertEqual((width, height), (256, 256))

    def test_rejects_duplicate_ids_across_sections(self):
        catalog = valid_catalog()
        catalog["companies"].append(
            {
                **catalog["models"][0],
                "name": "Different record",
                "category": "AI Safety",
            }
        )
        errors = self.validator.validate_catalog(catalog)
        self.assertTrue(any("duplicate id" in error for error in errors), errors)

    def test_rejects_missing_sources_and_non_https_links(self):
        catalog = valid_catalog()
        catalog["models"][0]["sources"] = []
        catalog["models"][0]["links"][0]["url"] = "http://example.com/guard"
        errors = self.validator.validate_catalog(catalog)
        self.assertTrue(any("at least one source" in error for error in errors), errors)
        self.assertTrue(any("HTTPS" in error for error in errors), errors)

    def test_rejects_categories_outside_section_allowlist(self):
        catalog = valid_catalog()
        catalog["models"][0]["category"] = "Company"
        errors = self.validator.validate_catalog(catalog)
        self.assertTrue(any("unsupported category" in error for error in errors), errors)

    def test_cli_returns_nonzero_for_invalid_payload(self):
        catalog = valid_catalog()
        catalog["models"][0].pop("verificationNote")
        with tempfile.TemporaryDirectory() as temp_dir:
            payload = pathlib.Path(temp_dir) / "catalog.json"
            payload.write_text(json.dumps(catalog))
            self.assertEqual(self.validator.main([str(payload)]), 1)


if __name__ == "__main__":
    unittest.main()
