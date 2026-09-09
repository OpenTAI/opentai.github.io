export type NewsletterLanguage = "en" | "zh";

export type NewsletterSubscription = {
  email: string;
  language: NewsletterLanguage;
};

export const OPENTAI_NEWSLETTER_FORM_ID =
  "1FAIpQLScj-SVyy-7JdCkMHneaHxcdywV3EIGvaahFiqlvwKAEdf722w";

export function buildNewsletterFormUrl(
  formId = OPENTAI_NEWSLETTER_FORM_ID,
) {
  return `https://docs.google.com/forms/d/e/${encodeURIComponent(formId)}/viewform`;
}

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
