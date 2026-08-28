import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export type IntegratedSectionHeadingStat = {
  label: string;
  value: number | string;
};

export function IntegratedSectionHeading({
  action,
  icon,
  locale,
  stats = [],
  summary,
  title,
}: {
  action?: ReactNode;
  icon: ReactNode;
  locale: Locale;
  stats?: readonly IntegratedSectionHeadingStat[];
  summary?: ReactNode;
  title: string;
}) {
  return (
    <header className="integrated-section-heading">
      <div className="integrated-section-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="integrated-section-copy">
        <h1>{t(locale, title)}</h1>
        {stats.length ? (
          <div className="integrated-section-stats">
            {stats.map((stat) => (
              <div className="subpage-stat-pill" key={stat.label}>
                <strong>
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString("en-US")
                    : stat.value}
                </strong>
                <span>{t(locale, stat.label)}</span>
              </div>
            ))}
          </div>
        ) : null}
        {summary ? <div className="integrated-section-summary">{summary}</div> : null}
      </div>
      {action ? <div className="integrated-section-action">{action}</div> : null}
    </header>
  );
}
