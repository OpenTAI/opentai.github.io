export type NewsletterLanguage = "en" | "zh";

export type NewsletterSubscription = {
  email: string;
  language: NewsletterLanguage;
};

export function buildNewsletterRequest(
  subscription: NewsletterSubscription,
  url = "/api/subscribe",
  website = "",
  timeoutMs = 15_000,
) {
  return {
    url,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
      body: JSON.stringify({
        email: subscription.email.trim(),
        language: subscription.language,
        website,
      }),
    },
  } as const;
}
