"use client";

import { FormEvent, useState } from "react";
import { Locale, t } from "@/lib/i18n";
import { buildNewsletterRequest } from "@/lib/newsletter";

type Language = "en" | "zh";

export function SubscribeBox({ locale }: { locale: Locale }) {
  const [language, setLanguage] = useState<Language>(locale);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const request = buildNewsletterRequest(
      { email, language },
      process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? "/api/subscribe",
      website,
    );

    try {
      const response = await fetch(request.url, request.init);
      if (!response.ok) {
        throw new Error(`Subscription request failed with ${response.status}`);
      }
      setEmail("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-[28px] border border-[#e3e8f2] bg-white/85 p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center">
        <div className="space-y-2">
          <h2 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[#101828]">
            {t(locale, "Your Daily Digest Of AI Safety")}
          </h2>
          <p className="max-w-[36rem] text-sm leading-6 text-[#667085]">
            {t(
              locale,
              "Stay up to date with the latest AI safety research and news, curated from arXiv and leading media sources and delivered straight to your inbox.",
            )}
          </p>
        </div>

        <form className="space-y-3" onSubmit={onSubmit}>
          <div
            aria-hidden="true"
            className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="newsletter-website">Website</label>
            <input
              autoComplete="off"
              id="newsletter-website"
              name="website"
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              type="text"
              value={website}
            />
          </div>
          <div
            aria-label={t(locale, "Digest language")}
            className="inline-flex rounded-full border border-[#e3e8f2] bg-[#f6f8fc] p-1"
            role="group"
          >
            {(
              [
                { id: "en", label: "English" },
                { id: "zh", label: "中文" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                aria-pressed={language === option.id}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  language === option.id
                    ? "bg-white text-[#111827] shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
                    : "text-[#667085]"
                }`}
                onClick={() => setLanguage(option.id)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              aria-label={t(locale, "Email address")}
              className="w-full rounded-full border border-[#dfe4ee] bg-white px-5 py-3 text-sm text-[#111827] outline-none placeholder:text-[#98a2b3] focus:border-[#a5b4fc]"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@university.edu"
              required
              type="email"
              value={email}
            />
            <button
              className="site-cta shrink-0 disabled:cursor-wait disabled:opacity-60"
              disabled={status === "sending"}
              type="submit"
            >
              {t(locale, status === "sending" ? "Sending…" : "Subscribe")}
            </button>
          </div>
          <p
            aria-live="polite"
            className={`min-h-5 text-sm ${
              status === "error" ? "text-[#b42318]" : "text-[#475467]"
            }`}
          >
            {status === "sent"
              ? t(locale, "Subscription request sent.")
              : status === "error"
                ? t(locale, "Could not send the request. Please try again.")
                : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
