import { Locale, t } from "@/lib/i18n";
import { publicAssetHref } from "@/lib/site-url";
import { AiSafetyHotIntro } from "@/components/ai-safety-hot-intro";

export function SubscribeBox({ locale }: { locale: Locale }) {
  return (
    <section className="rounded-[28px] border border-[#e3e8f2] bg-white/85 p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-center lg:gap-x-8 lg:gap-y-7">
        <div className="min-w-0 space-y-3 lg:self-start lg:space-y-5">
          <h2 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[#101828] lg:text-[40px] lg:leading-[48px]">
            {t(locale, "AI Safety HOT")}
          </h2>
          <p className="max-w-[36rem] text-sm leading-6 text-[#667085] lg:max-w-[30rem] lg:text-lg lg:leading-[30px] lg:text-balance">
            {t(
              locale,
              "AI Safety HOT is an AI-powered news and research aggregation platform that tracks, curates, and summarizes the latest developments in AI safety from 1,000+ media sources worldwide.",
            )}
          </p>
        </div>
        <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <AiSafetyHotIntro
            locale={locale}
            posterHref={publicAssetHref("/media/ai-safety-hot-intro-poster.jpg")}
            videoHref={publicAssetHref("/media/ai-safety-hot-intro.mp4")}
          />
        </div>
        <a
          className="site-cta inline-flex w-full items-center justify-center gap-2 text-center sm:w-auto sm:justify-self-start lg:col-start-1 lg:row-start-2 lg:min-h-12! lg:self-end lg:px-6!"
          href="https://aisafetyhot.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(locale, "Visit AI Safety HOT")}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
