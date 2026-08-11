"use client";

import { FormEvent, useState } from "react";
import { newsletter } from "@/data/site";

type Language = "en" | "zh";

export function SubscribeBox() {
  const [language, setLanguage] = useState<Language>("en");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const configured = Boolean(newsletter.endpoint);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setState("sending");
    try {
      const body = new FormData();
      body.append("email", email);
      body.append("language", language);
      const response = await fetch(newsletter.endpoint, { method: "POST", body });
      setState(response.ok ? "done" : "error");
      if (response.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="rounded-[28px] border border-[#e3e8f2] bg-white/85 p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center">
        <div className="space-y-2">
          <p className="home-kicker">OpenTAI Daily</p>
          <h2 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[#101828]">
            Latest trustworthy AI news, in your inbox
          </h2>
          <p className="max-w-[36rem] text-sm leading-6 text-[#667085]">
            New papers, model releases, benchmarks, and datasets — collected from popular media
            accounts and sent as a daily digest. Pick the language you read in.
          </p>
        </div>

        <form className="space-y-3" onSubmit={onSubmit}>
          <div
            aria-label="Digest language"
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
              aria-label="Email address"
              className="w-full rounded-full border border-[#dfe4ee] bg-white px-5 py-3 text-sm text-[#111827] outline-none placeholder:text-[#98a2b3] focus:border-[#a5b4fc]"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@university.edu"
              required
              type="email"
              value={email}
            />
            <button
              className="site-cta shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!configured || state === "sending"}
              type="submit"
            >
              {state === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          <p aria-live="polite" className="text-xs leading-5 text-[#98a2b3]">
            {!configured
              ? "Signup is not connected yet — set newsletter.endpoint in src/data/site.ts."
              : state === "done"
                ? "Check your inbox to confirm the subscription."
                : state === "error"
                  ? "Something went wrong. Please try again."
                  : "One email a day. Unsubscribe any time."}
          </p>
        </form>
      </div>
    </section>
  );
}
