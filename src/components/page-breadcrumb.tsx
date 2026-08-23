import Link from "next/link";
import { Locale, localizeHref, t } from "@/lib/i18n";

const breadcrumbHrefs: Record<string, string> = {
  Home: "/",
  Papers: "/papers",
  Benchmarks: "/benchmarks",
  Datasets: "/datasets",
  Models: "/models",
  Frameworks: "/frameworks",
  Tools: "/tools",
  Leaderboard: "/leaderboard",
  Leaderboards: "/leaderboard",
  Arenas: "/arenas",
  Companies: "/companies",
  Community: "/community",
  About: "/about",
};

export function PageBreadcrumb({
  items,
  locale,
}: {
  items: readonly string[];
  locale: Locale;
}) {
  return (
    <nav
      aria-label={locale === "zh" ? "面包屑导航" : "Breadcrumb"}
      className="subpage-breadcrumb"
    >
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          const href = breadcrumbHrefs[item];

          return (
            <li key={`${item}-${index}`}>
              {index > 0 ? <span aria-hidden="true" className="subpage-breadcrumb-separator">›</span> : null}
              {!isCurrent && href ? (
                <Link href={localizeHref(locale, href)}>{t(locale, item)}</Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>{t(locale, item)}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
