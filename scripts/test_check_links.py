import importlib.util
import unittest
from pathlib import Path


SPEC = importlib.util.spec_from_file_location(
    "check_links", Path(__file__).with_name("check-links.py")
)
check_links = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(check_links)


class ReachableStatusTests(unittest.TestCase):
    def test_successful_responses_are_reachable(self):
        self.assertTrue(check_links.is_reachable_status(200))
        self.assertTrue(check_links.is_reachable_status(203))

    def test_access_control_and_rate_limits_still_prove_the_host_exists(self):
        self.assertTrue(check_links.is_reachable_status(403))
        self.assertTrue(check_links.is_reachable_status(429))

    def test_missing_or_transport_failures_are_not_reachable(self):
        self.assertFalse(check_links.is_reachable_status(404))
        self.assertFalse(check_links.is_reachable_status("TimeoutError"))


if __name__ == "__main__":
    unittest.main()
