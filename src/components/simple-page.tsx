import { ReactNode } from "react";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Locale, t } from "@/lib/i18n";

export function SimplePage({
  breadcrumb,
  className = "",
  children,
  description,
  heroAside,
  heroIcon,
  heroStats = [],
  locale = "en",
  showDescription = false,
  showHero = true,
  title,
}: {
  breadcrumb: readonly string[];
  className?: string;
  children: ReactNode;
  description: string;
  heroAside?: ReactNode;
  heroIcon: string;
  heroStats?: readonly { label: string; value: number | string }[];
  locale?: Locale;
  overview?: string;
  showDescription?: boolean;
  showHero?: boolean;
  title: string;
}) {
  return (
    <div className={`page-frame space-y-7 ${className}`}>
      <PageBreadcrumb items={breadcrumb} locale={locale} />

      {showHero ? (
        <section className="subpage-hero-card">
          <div className="subpage-hero-layout">
            <div className="subpage-icon-panel">
              <div className="subpage-icon-orb">{heroIcon}</div>
            </div>
            <div className="subpage-hero-copy">
              <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0f172a]">
                {t(locale, title)}
              </h1>
              {showDescription ? <p>{t(locale, description)}</p> : null}
              {heroStats.length ? (
                <div className="flex flex-wrap gap-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="subpage-stat-pill">
                      <span className="font-semibold text-[#4338ca]">
                        {typeof stat.value === "number"
                          ? stat.value.toLocaleString("en-US")
                          : stat.value}
                      </span>
                      <span>{t(locale, stat.label)}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {heroAside ? <div className="subpage-hero-aside">{heroAside}</div> : null}
          </div>
        </section>
      ) : null}

      {children}
    </div>
  );
}

export function PlannedList({
  items,
  locale = "en",
  note,
  title,
}: {
  items: readonly string[];
  locale?: Locale;
  note: string;
  title: string;
}) {
  return (
    <section className="subpage-main-table-card">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
          {t(locale, title)}
        </h2>
        <span className="rounded-full border border-[#fde68a] bg-[#fffbeb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#b45309]">
          {t(locale, "Not built yet")}
        </span>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[18px] border border-dashed border-[#e3e8f2] bg-[#fafbfe] px-5 py-4 text-sm text-[#667085]"
          >
            {t(locale, item)}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-6 text-[#98a2b3]">{t(locale, note)}</p>
    </section>
  );
}
