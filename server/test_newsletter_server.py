import unittest
from email import policy
from email.parser import BytesParser
import json
import inspect
from pathlib import Path
import tempfile
from threading import Thread
from urllib.error import HTTPError
from urllib.request import Request, urlopen


try:
    from server.newsletter_server import (
        InvalidSubscription,
        RateLimiter,
        build_subscription_message,
        create_server,
        parse_subscription,
    )
except (ImportError, ModuleNotFoundError):
    InvalidSubscription = None
    RateLimiter = None
    build_subscription_message = None
    create_server = None
    parse_subscription = None

try:
    from server.newsletter_server import ConfigurationError, load_settings
except ImportError:
    ConfigurationError = None
    load_settings = None

try:
    from server.newsletter_server import DeliveryLimiter, resolve_client_ip
except ImportError:
    DeliveryLimiter = None
    resolve_client_ip = None


class NewsletterServerTests(unittest.TestCase):
    def test_loads_self_hosted_server_settings_without_storing_secrets_in_code(self):
        self.assertTrue(callable(load_settings), "server settings loader is missing")

        settings = load_settings(
            {
                "NEWSLETTER_SMTP_USER": "newsletter@example.org",
                "NEWSLETTER_SMTP_APP_PASSWORD": "test-app-password",
            },
            project_root=Path("/srv/opentai"),
        )

        self.assertEqual(settings.host, "127.0.0.1")
        self.assertEqual(settings.port, 4173)
        self.assertEqual(settings.static_dir, Path("/srv/opentai/out"))
        self.assertEqual(settings.smtp_host, "smtp.gmail.com")
        self.assertEqual(settings.smtp_port, 465)
        self.assertEqual(settings.smtp_user, "newsletter@example.org")
        self.assertEqual(settings.smtp_app_password, "test-app-password")
        self.assertEqual(settings.recipient, "danxjma@gmail.com")
        self.assertFalse(settings.trust_proxy)
        self.assertEqual(settings.max_concurrent_deliveries, 2)
        self.assertTrue(
            hasattr(settings, "max_concurrent_requests"),
            "request concurrency setting is missing",
        )
        self.assertEqual(settings.max_concurrent_requests, 32)
        self.assertEqual(settings.request_timeout_seconds, 10)
        self.assertEqual(settings.rate_max_clients, 10000)
        self.assertEqual(
            settings.allowed_origins,
            frozenset({"http://127.0.0.1:4173"}),
        )

    def test_refuses_to_start_without_an_smtp_app_password(self):
        self.assertTrue(callable(load_settings), "server settings loader is missing")

        with self.assertRaises(ConfigurationError):
            load_settings(
                {"NEWSLETTER_SMTP_USER": "newsletter@example.org"},
                project_root=Path("/srv/opentai"),
            )

    def test_uses_forwarded_client_ip_only_from_an_enabled_local_proxy(self):
        self.assertTrue(callable(resolve_client_ip), "proxy IP resolver is missing")
        headers = {
            "X-Real-IP": "203.0.113.7",
            "X-Forwarded-For": "198.51.100.44, 203.0.113.7",
        }

        self.assertEqual(
            resolve_client_ip("127.0.0.1", headers, trust_proxy=True),
            "203.0.113.7",
        )
        self.assertEqual(
            resolve_client_ip("127.0.0.1", headers, trust_proxy=False),
            "127.0.0.1",
        )
        self.assertEqual(
            resolve_client_ip("198.51.100.9", headers, trust_proxy=True),
            "198.51.100.9",
        )

    def test_delivery_limiter_bounds_concurrent_smtp_work(self):
        self.assertTrue(callable(DeliveryLimiter), "delivery limiter is missing")
        limiter = DeliveryLimiter(1)

        self.assertTrue(limiter.acquire())
        self.assertFalse(limiter.acquire())
        limiter.release()
        self.assertTrue(limiter.acquire())
        limiter.release()

    def test_parses_a_valid_subscription(self):
        self.assertTrue(callable(parse_subscription), "newsletter server is missing")

        subscription = parse_subscription(
            {
                "email": "  Reader@Example.edu  ",
                "language": "zh",
                "website": "",
            }
        )

        self.assertEqual(subscription.email, "Reader@Example.edu")
        self.assertEqual(subscription.language, "zh")
        self.assertFalse(subscription.is_bot)

    def test_rejects_an_invalid_email_address(self):
        self.assertTrue(callable(parse_subscription), "newsletter server is missing")

        with self.assertRaises(InvalidSubscription):
            parse_subscription(
                {"email": "not-an-email", "language": "en", "website": ""}
            )

    def test_marks_honeypot_submissions_as_bots(self):
        self.assertTrue(callable(parse_subscription), "newsletter server is missing")

        subscription = parse_subscription(
            {
                "email": "reader@example.edu",
                "language": "en",
                "website": "filled-by-bot",
            }
        )

        self.assertTrue(subscription.is_bot)

    def test_builds_the_email_sent_to_the_teacher(self):
        self.assertTrue(callable(build_subscription_message), "newsletter server is missing")
        subscription = parse_subscription(
            {"email": "reader@example.edu", "language": "zh", "website": ""}
        )

        raw_message = build_subscription_message(
            subscription,
            sender="newsletter@opentai.org",
            recipient="danxjma@gmail.com",
        ).as_bytes()
        message = BytesParser(policy=policy.default).parsebytes(raw_message)

        self.assertEqual(message["To"], "danxjma@gmail.com")
        self.assertEqual(message["From"], "newsletter@opentai.org")
        self.assertEqual(message["Reply-To"], "reader@example.edu")
        self.assertEqual(message["Subject"], "OpenTAI Daily subscription request")
        self.assertEqual(
            message.get_content().strip(),
            "Subscriber email: reader@example.edu\nLanguage: Chinese\n\n"
            "This is an administrator-review request, not a confirmed enrollment. "
            "Verify address ownership before adding it to any mailing list.",
        )

    def test_rate_limiter_blocks_requests_after_the_configured_limit(self):
        self.assertTrue(callable(RateLimiter), "rate limiter is missing")
        now = [100.0]
        limiter = RateLimiter(max_requests=2, window_seconds=60, clock=lambda: now[0])

        self.assertTrue(limiter.allow("127.0.0.1"))
        self.assertTrue(limiter.allow("127.0.0.1"))
        self.assertFalse(limiter.allow("127.0.0.1"))

        now[0] = 161.0
        self.assertTrue(limiter.allow("127.0.0.1"))

    def test_rate_limiter_bounds_unique_client_memory(self):
        self.assertIn("max_clients", inspect.signature(RateLimiter).parameters)
        now = [100.0]
        limiter = RateLimiter(
            max_requests=2,
            window_seconds=60,
            max_clients=2,
            clock=lambda: now[0],
        )

        self.assertTrue(limiter.allow("192.0.2.1"))
        self.assertTrue(limiter.allow("192.0.2.2"))
        self.assertFalse(limiter.allow("192.0.2.3"))

        now[0] = 161.0
        self.assertTrue(limiter.allow("192.0.2.3"))

    def test_subscription_endpoint_delivers_a_valid_request(self):
        self.assertTrue(callable(create_server), "HTTP server is missing")
        deliveries = []

        with tempfile.TemporaryDirectory() as static_dir:
            Path(static_dir, "index.html").write_text("OpenTAI", encoding="utf-8")
            server = create_server(
                host="127.0.0.1",
                port=0,
                static_dir=static_dir,
                deliver=deliveries.append,
                allowed_origins={"http://127.0.0.1:4173"},
                rate_limiter=RateLimiter(max_requests=5, window_seconds=60),
            )
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                payload = json.dumps(
                    {
                        "email": "reader@example.edu",
                        "language": "en",
                        "website": "",
                    }
                ).encode("utf-8")
                request = Request(
                    f"http://127.0.0.1:{server.server_port}/api/subscribe",
                    data=payload,
                    method="POST",
                    headers={
                        "Content-Type": "application/json",
                        "Origin": "http://127.0.0.1:4173",
                    },
                )

                with urlopen(request) as response:
                    body = json.load(response)
                    self.assertEqual(response.status, 200)
                    self.assertEqual(
                        response.headers["Access-Control-Allow-Origin"],
                        "http://127.0.0.1:4173",
                    )
                self.assertEqual(body, {"ok": True})
                self.assertEqual(len(deliveries), 1)
                self.assertEqual(deliveries[0].email, "reader@example.edu")
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)

    def test_subscription_endpoint_rejects_an_invalid_email(self):
        self.assertTrue(callable(create_server), "HTTP server is missing")

        with tempfile.TemporaryDirectory() as static_dir:
            server = create_server(
                host="127.0.0.1",
                port=0,
                static_dir=static_dir,
                deliver=lambda subscription: self.fail("invalid request was delivered"),
                allowed_origins=set(),
                rate_limiter=RateLimiter(max_requests=5, window_seconds=60),
            )
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                request = Request(
                    f"http://127.0.0.1:{server.server_port}/api/subscribe",
                    data=json.dumps(
                        {"email": "bad", "language": "en", "website": ""}
                    ).encode("utf-8"),
                    method="POST",
                    headers={"Content-Type": "application/json"},
                )
                with self.assertRaises(HTTPError) as caught:
                    urlopen(request)

                self.assertEqual(caught.exception.code, 400)
                self.assertEqual(
                    json.load(caught.exception),
                    {"ok": False, "error": "Enter a valid email address."},
                )
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)

    def test_subscription_endpoint_requires_json_content_type(self):
        self.assertTrue(callable(create_server), "HTTP server is missing")

        with tempfile.TemporaryDirectory() as static_dir:
            server = create_server(
                host="127.0.0.1",
                port=0,
                static_dir=static_dir,
                deliver=lambda subscription: self.fail("text request was delivered"),
                allowed_origins=set(),
                rate_limiter=RateLimiter(max_requests=5, window_seconds=60),
            )
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                request = Request(
                    f"http://127.0.0.1:{server.server_port}/api/subscribe",
                    data=b'{"email":"reader@example.edu","language":"en"}',
                    method="POST",
                    headers={"Content-Type": "text/plain"},
                )
                with self.assertRaises(HTTPError) as caught:
                    urlopen(request)
                self.assertEqual(caught.exception.code, 415)
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)

    def test_subscription_endpoint_rejects_an_unapproved_origin(self):
        self.assertTrue(callable(create_server), "HTTP server is missing")

        with tempfile.TemporaryDirectory() as static_dir:
            server = create_server(
                host="127.0.0.1",
                port=0,
                static_dir=static_dir,
                deliver=lambda subscription: self.fail("cross-origin request was delivered"),
                allowed_origins={"https://opentai.org"},
                rate_limiter=RateLimiter(max_requests=5, window_seconds=60),
            )
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                request = Request(
                    f"http://127.0.0.1:{server.server_port}/api/subscribe",
                    data=json.dumps(
                        {"email": "reader@example.edu", "language": "en"}
                    ).encode("utf-8"),
                    method="POST",
                    headers={
                        "Content-Type": "application/json",
                        "Origin": "https://hostile.example",
                    },
                )
                with self.assertRaises(HTTPError) as caught:
                    urlopen(request)
                self.assertEqual(caught.exception.code, 403)
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)

    def test_honeypot_submission_returns_success_without_delivery(self):
        self.assertTrue(callable(create_server), "HTTP server is missing")
        deliveries = []

        with tempfile.TemporaryDirectory() as static_dir:
            server = create_server(
                host="127.0.0.1",
                port=0,
                static_dir=static_dir,
                deliver=deliveries.append,
                allowed_origins=set(),
                rate_limiter=RateLimiter(max_requests=5, window_seconds=60),
            )
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                request = Request(
                    f"http://127.0.0.1:{server.server_port}/api/subscribe",
                    data=json.dumps(
                        {
                            "email": "reader@example.edu",
                            "language": "en",
                            "website": "spam-link",
                        }
                    ).encode("utf-8"),
                    method="POST",
                    headers={"Content-Type": "application/json"},
                )
                with urlopen(request) as response:
                    self.assertEqual(json.load(response), {"ok": True})

                self.assertEqual(deliveries, [])
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
