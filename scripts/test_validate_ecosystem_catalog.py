import copy
import importlib.util
import pathlib
import unittest


SCRIPT = pathlib.Path(__file__).with_name("validate-ecosystem-catalog.py")
SPEC = importlib.util.spec_from_file_location("validate_ecosystem_catalog", SCRIPT)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


def company_record():
    return {
        "id": "verified-company",
        "name": "Verified Company",
        "category": "AI Safety",
        "description": "A verified company description.",
        "descriptionZh": "一条可核验的公司描述。",
        "direction": "AI safety",
        "directionZh": "人工智能安全",
        "logo": "/company-logos/verified-company.svg",
        "logoSource": "https://example.com/favicon.svg",
        "links": [{"label": "Website", "url": "https://example.com"}],
        "sources": ["https://example.com/about"],
        "verificationNote": "Verified against the official company website.",
    }


def catalog(record):
    return {
        "schemaVersion": 1,
        "models": [],
        "frameworks": [],
        "arenas": [],
        "companies": [record],
    }


class ValidateEcosystemCatalogTest(unittest.TestCase):
    def test_company_requires_direction_and_source_backed_logo(self):
        record = company_record()
        for field in ("direction", "directionZh", "logo", "logoSource"):
            candidate = copy.deepcopy(record)
            candidate.pop(field)
            errors = MODULE.validate_catalog(catalog(candidate))
            self.assertTrue(any(field in error for error in errors), errors)

    def test_complete_company_record_passes(self):
        self.assertEqual(MODULE.validate_catalog(catalog(company_record())), [])


if __name__ == "__main__":
    unittest.main()
