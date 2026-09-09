import { Locale, t } from "@/lib/i18n";
import { buildNewsletterFormUrl } from "@/lib/newsletter";

export function SubscribeBox({ locale }: { locale: Locale }) {
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

        <div className="space-y-3 lg:justify-self-end">
          <a
            className="site-cta inline-flex w-full items-center justify-center gap-2 text-center sm:w-auto"
            href={buildNewsletterFormUrl()}
            rel="noreferrer"
            target="_blank"
          >
            {t(locale, "Open subscription form")}
            <span aria-hidden="true">↗</span>
          </a>
          <p className="max-w-[26rem] text-sm leading-6 text-[#667085]">
            {t(
              locale,
              "Complete the Google Form to submit your email, choose a digest language, and consent to updates.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
