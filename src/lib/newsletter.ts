export type NewsletterLanguage = "en" | "zh";

export type NewsletterSubscription = {
  email: string;
  language: NewsletterLanguage;
};

const DEFAULT_RECIPIENT = "danxjma@gmail.com";

export function buildNewsletterMailto(
  subscription: NewsletterSubscription,
  recipient = DEFAULT_RECIPIENT,
) {
  const language = subscription.language === "zh" ? "Chinese" : "English";
  const query = new URLSearchParams({
    subject: "OpenTAI Daily subscription request",
    body: [
      "Please add me to OpenTAI Daily.",
      "",
      `Subscriber email: ${subscription.email.trim()}`,
      `Language: ${language}`,
    ].join("\n"),
  });

  return `mailto:${recipient}?${query.toString()}`;
}
