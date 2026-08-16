import { ReactNode } from "react";
import { Locale, t } from "@/lib/i18n";

export function SimplePage({
  breadcrumb,
  children,
  description,
  heroIcon,
  locale = "en",
  overview,
  title,
}: {
  breadcrumb: readonly string[];
  children: ReactNode;
  description: string;
  heroIcon: string;
  locale?: Locale;
  overview?: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-[1480px] space-y-7">
      <div className="subpage-breadcrumb">
        {breadcrumb.map((item, index) => (
          <span key={item} className="flex items-center gap-2">
            {index > 0 ? <span className="text-[#c0c5d1]">›</span> : null}
            <span>{t(locale, item)}</span>
          </span>
        ))}
      </div>

      <section className="subpage-hero-card">
        <div className="grid gap-7 xl:grid-cols-[190px_minmax(0,1fr)_0.72fr] xl:items-start">
          <div className="subpage-icon-panel">
            <div className="subpage-icon-orb">{heroIcon}</div>
          </div>
          <div className="space-y-4">
            <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0f172a]">
              {t(locale, title)}
            </h1>
            <p className="max-w-3xl text-[1rem] leading-8 text-[#556072]">{t(locale, description)}</p>
          </div>
          {overview ? (
            <p className="text-[0.98rem] leading-8 text-[#556072]">{t(locale, overview)}</p>
          ) : null}
        </div>
      </section>

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
