from collections import OrderedDict, deque
from dataclasses import dataclass
from email.message import EmailMessage
from email.utils import parseaddr
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import ipaddress
import json
import os
from pathlib import Path
import re
import smtplib
import socket
import ssl
import sys
from threading import BoundedSemaphore, Lock
import time


EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class InvalidSubscription(ValueError):
    pass


class ConfigurationError(RuntimeError):
    pass


@dataclass(frozen=True)
class Subscription:
    email: str
    language: str
    is_bot: bool


@dataclass(frozen=True)
class Settings:
    host: str
    port: int
    static_dir: Path
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_app_password: str
    recipient: str
    allowed_origins: frozenset[str]
    max_requests: int
    rate_window_seconds: int
    trust_proxy: bool
    max_concurrent_deliveries: int
    max_concurrent_requests: int
    request_timeout_seconds: int
    rate_max_clients: int


def _positive_integer(environ, name, default):
    raw_value = environ.get(name, str(default))
    try:
        value = int(raw_value)
    except (TypeError, ValueError) as error:
        raise ConfigurationError(f"{name} must be an integer.") from error
    if value <= 0:
        raise ConfigurationError(f"{name} must be greater than zero.")
    return value


def _boolean(environ, name, default=False):
    raw_value = environ.get(name, "true" if default else "false").strip().lower()
    if raw_value in {"1", "true", "yes"}:
        return True
    if raw_value in {"0", "false", "no"}:
        return False
    raise ConfigurationError(f"{name} must be true or false.")


def load_settings(environ=os.environ, project_root=None):
    root = Path(project_root or Path(__file__).resolve().parents[1])
    host = environ.get("OPENTAI_HOST", "127.0.0.1").strip()
    port = _positive_integer(environ, "OPENTAI_PORT", 4173)
    smtp_user = environ.get("NEWSLETTER_SMTP_USER", "").strip()
    smtp_app_password = environ.get("NEWSLETTER_SMTP_APP_PASSWORD", "").strip()
    if not smtp_user:
        raise ConfigurationError("NEWSLETTER_SMTP_USER is required.")
    if not smtp_app_password:
        raise ConfigurationError("NEWSLETTER_SMTP_APP_PASSWORD is required.")

    configured_origins = environ.get(
        "NEWSLETTER_ALLOWED_ORIGINS", f"http://{host}:{port}"
    )
    origins = frozenset(
        origin.strip()
        for origin in configured_origins.split(",")
        if origin.strip()
    )
    static_dir = Path(environ.get("OPENTAI_STATIC_DIR", root / "out")).expanduser()

    return Settings(
        host=host,
        port=port,
        static_dir=static_dir,
        smtp_host=environ.get("NEWSLETTER_SMTP_HOST", "smtp.gmail.com").strip(),
        smtp_port=_positive_integer(environ, "NEWSLETTER_SMTP_PORT", 465),
        smtp_user=smtp_user,
        smtp_app_password=smtp_app_password,
        recipient=environ.get("NEWSLETTER_RECIPIENT", "danxjma@gmail.com").strip(),
        allowed_origins=origins,
        max_requests=_positive_integer(environ, "NEWSLETTER_RATE_LIMIT", 5),
        rate_window_seconds=_positive_integer(
            environ, "NEWSLETTER_RATE_WINDOW_SECONDS", 900
        ),
        trust_proxy=_boolean(environ, "OPENTAI_TRUST_PROXY"),
        max_concurrent_deliveries=_positive_integer(
            environ, "NEWSLETTER_MAX_CONCURRENT_DELIVERIES", 2
        ),
        max_concurrent_requests=_positive_integer(
            environ, "OPENTAI_MAX_CONCURRENT_REQUESTS", 32
        ),
        request_timeout_seconds=_positive_integer(
            environ, "OPENTAI_REQUEST_TIMEOUT_SECONDS", 10
        ),
        rate_max_clients=_positive_integer(
            environ, "NEWSLETTER_RATE_MAX_CLIENTS", 10_000
        ),
    )


def parse_subscription(payload):
    if not isinstance(payload, dict):
        raise InvalidSubscription("The request body must be a JSON object.")

    email = str(payload.get("email", "")).strip()
    language = str(payload.get("language", "")).strip()
    website = str(payload.get("website", "")).strip()
    _, parsed_email = parseaddr(email)

    if parsed_email != email or not EMAIL_PATTERN.fullmatch(email):
        raise InvalidSubscription("Enter a valid email address.")
    if language not in {"en", "zh"}:
        raise InvalidSubscription("Choose a supported digest language.")

    return Subscription(email=email, language=language, is_bot=bool(website))


def build_subscription_message(subscription, sender, recipient):
    language = "Chinese" if subscription.language == "zh" else "English"
    message = EmailMessage()
    message["Subject"] = "OpenTAI Daily subscription request"
    message["From"] = sender
    message["To"] = recipient
    message["Reply-To"] = subscription.email
    message.set_content(
        f"Subscriber email: {subscription.email}\n"
        f"Language: {language}\n\n"
        "This is an administrator-review request, not a confirmed enrollment. "
        "Verify address ownership before adding it to any mailing list.\n"
    )
    return message


def deliver_subscription(settings, subscription):
    message = build_subscription_message(
        subscription,
        sender=settings.smtp_user,
        recipient=settings.recipient,
    )
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(
        settings.smtp_host,
        settings.smtp_port,
        timeout=20,
        context=context,
    ) as smtp:
        smtp.login(settings.smtp_user, settings.smtp_app_password)
        smtp.send_message(message)


class RateLimiter:
    def __init__(
        self,
        max_requests,
        window_seconds,
        max_clients=10_000,
        clock=time.monotonic,
    ):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.max_clients = max_clients
        self.clock = clock
        self._requests = OrderedDict()
        self._lock = Lock()

    def allow(self, key):
        now = self.clock()
        cutoff = now - self.window_seconds
        with self._lock:
            while self._requests:
                oldest_key = next(iter(self._requests))
                oldest = self._requests[oldest_key]
                while oldest and oldest[0] <= cutoff:
                    oldest.popleft()
                if oldest:
                    break
                del self._requests[oldest_key]

            recent = self._requests.get(key)
            if recent is None:
                if len(self._requests) >= self.max_clients:
                    return False
                recent = deque()
                self._requests[key] = recent
            else:
                while recent and recent[0] <= cutoff:
                    recent.popleft()
            if len(recent) >= self.max_requests:
                return False
            recent.append(now)
            self._requests.move_to_end(key)
            return True


class DeliveryLimiter:
    def __init__(self, max_concurrent):
        self._semaphore = BoundedSemaphore(max_concurrent)

    def acquire(self):
        return self._semaphore.acquire(blocking=False)

    def release(self):
        self._semaphore.release()


def resolve_client_ip(peer_ip, headers, trust_proxy):
    if not trust_proxy or peer_ip not in {"127.0.0.1", "::1"}:
        return peer_ip
    forwarded = headers.get("X-Real-IP", "").strip()
    try:
        return str(ipaddress.ip_address(forwarded))
    except ValueError:
        return peer_ip


def _origin_is_allowed(origin, allowed_origins):
    if not origin:
        return True
    return origin in allowed_origins


class OpenTAIHTTPServer(ThreadingHTTPServer):
    daemon_threads = True
    request_queue_size = 64

    def __init__(self, server_address, handler_class, request_limiter):
        self._request_limiter = request_limiter
        super().__init__(server_address, handler_class)

    def process_request(self, request, client_address):
        if not self._request_limiter.acquire():
            request.close()
            return
        try:
            super().process_request(request, client_address)
        except Exception:
            self._request_limiter.release()
            raise

    def process_request_thread(self, request, client_address):
        try:
            super().process_request_thread(request, client_address)
        finally:
            self._request_limiter.release()


def create_server(
    *,
    host,
    port,
    static_dir,
    deliver,
    allowed_origins,
    rate_limiter,
    trust_proxy=False,
    delivery_limiter=None,
    request_limiter=None,
    request_timeout_seconds=10,
):
    smtp_slots = delivery_limiter or DeliveryLimiter(2)
    request_slots = request_limiter or DeliveryLimiter(32)

    class OpenTAIRequestHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=static_dir, **kwargs)

        def setup(self):
            super().setup()
            self.connection.settimeout(request_timeout_seconds)

        def end_headers(self):
            origin = self.headers.get("Origin")
            if origin and origin in allowed_origins:
                self.send_header("Access-Control-Allow-Origin", origin)
                self.send_header("Vary", "Origin")
            super().end_headers()

        def do_OPTIONS(self):
            if self.path != "/api/subscribe":
                self.send_error(404)
                return
            if not self._origin_allowed():
                self._send_json(403, {"ok": False, "error": "Origin not allowed."})
                return
            self.send_response(204)
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Max-Age", "600")
            self.end_headers()

        def do_POST(self):
            if self.path != "/api/subscribe":
                self._send_json(404, {"ok": False, "error": "Not found."})
                return
            if not self._origin_allowed():
                self._send_json(403, {"ok": False, "error": "Origin not allowed."})
                return
            content_type = self.headers.get("Content-Type", "").split(";", 1)[0].strip().lower()
            if content_type != "application/json":
                self._send_json(
                    415,
                    {"ok": False, "error": "Content-Type must be application/json."},
                )
                return

            try:
                content_length = int(self.headers.get("Content-Length", "0"))
            except ValueError:
                content_length = 0
            if content_length <= 0 or content_length > 8192:
                self._send_json(400, {"ok": False, "error": "Invalid request body."})
                return

            try:
                raw_payload = self.rfile.read(content_length)
                payload = json.loads(raw_payload)
                subscription = parse_subscription(payload)
            except (TimeoutError, socket.timeout):
                self._send_json(408, {"ok": False, "error": "Request timed out."})
                return
            except (InvalidSubscription, json.JSONDecodeError, UnicodeDecodeError) as error:
                message = str(error) if isinstance(error, InvalidSubscription) else "Invalid JSON."
                self._send_json(400, {"ok": False, "error": message})
                return

            if subscription.is_bot:
                self._send_json(200, {"ok": True})
                return

            client_ip = resolve_client_ip(
                self.client_address[0], self.headers, trust_proxy
            )
            if not rate_limiter.allow(client_ip):
                self._send_json(
                    429,
                    {"ok": False, "error": "Too many requests. Please try again later."},
                )
                return
            if not smtp_slots.acquire():
                self._send_json(
                    503,
                    {"ok": False, "error": "Email delivery is busy. Please try again."},
                )
                return
            try:
                deliver(subscription)
            except Exception as error:
                print(
                    f"Newsletter delivery failed: {type(error).__name__}",
                    file=sys.stderr,
                )
                self._send_json(
                    502,
                    {"ok": False, "error": "Email delivery is unavailable right now."},
                )
                return
            finally:
                smtp_slots.release()

            self._send_json(200, {"ok": True})

        def _origin_allowed(self):
            return _origin_is_allowed(
                self.headers.get("Origin", ""),
                allowed_origins,
            )

        def _send_json(self, status, body):
            encoded = json.dumps(body, separators=(",", ":")).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(encoded)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(encoded)

    return OpenTAIHTTPServer((host, port), OpenTAIRequestHandler, request_slots)


def main():
    try:
        settings = load_settings()
        if not settings.static_dir.is_dir():
            raise ConfigurationError(
                f"Static export not found at {settings.static_dir}. Run npm run build first."
            )
    except ConfigurationError as error:
        print(f"Configuration error: {error}", file=sys.stderr)
        return 2

    limiter = RateLimiter(
        max_requests=settings.max_requests,
        window_seconds=settings.rate_window_seconds,
        max_clients=settings.rate_max_clients,
    )
    server = create_server(
        host=settings.host,
        port=settings.port,
        static_dir=settings.static_dir,
        deliver=lambda subscription: deliver_subscription(settings, subscription),
        allowed_origins=settings.allowed_origins,
        rate_limiter=limiter,
        trust_proxy=settings.trust_proxy,
        delivery_limiter=DeliveryLimiter(settings.max_concurrent_deliveries),
        request_limiter=DeliveryLimiter(settings.max_concurrent_requests),
        request_timeout_seconds=settings.request_timeout_seconds,
    )
    print(f"OpenTAI is serving {settings.static_dir} at http://{settings.host}:{settings.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping OpenTAI server.")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
