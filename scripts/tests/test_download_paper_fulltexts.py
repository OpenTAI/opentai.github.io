import importlib.util
import pathlib
import unittest


MODULE_PATH = pathlib.Path(__file__).parents[1] / "download-paper-fulltexts.py"


def load_module():
    spec = importlib.util.spec_from_file_location("download_paper_fulltexts", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class DownloadPaperFulltextsTests(unittest.TestCase):
    def test_accepts_pdf_magic_after_leading_whitespace(self):
        module = load_module()
        self.assertTrue(module.is_pdf(b"\n%PDF-1.7 test"))

    def test_rejects_html_saved_as_pdf(self):
        module = load_module()
        self.assertFalse(module.is_pdf(b"<html>not a pdf</html>"))

    def test_safe_filename_uses_openalex_id(self):
        module = load_module()
        self.assertEqual(module.safe_filename("https://openalex.org/W123"), "W123.pdf")


if __name__ == "__main__":
    unittest.main()
