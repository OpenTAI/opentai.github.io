import Link from "next/link";
import {
  collectionOrder,
  homeCategoryCards,
  siteBrand,
  subpageConfigs,
  SubpageTableRow,
} from "@/data/site";
import { paperLibrary } from "@/data/papers";
import { SiteSearch } from "@/components/site-search";
import { SubscribeBox } from "@/components/subscribe";
import { Locale, localizeHref, t } from "@/lib/i18n";

type Entry = SubpageTableRow & { collection: string; href: string };

const ALL: Entry[] = collectionOrder.flatMap((slug) =>
  subpageConfigs[slug].tableRows.map((row) => ({
    ...row,
    collection: subpageConfigs[slug].title,
    href: `/${slug}`,
  })),
);

const collections = homeCategoryCards.map((card) => {
  const slug = card.href.slice(1);
  return {
    card,
    count: slug === "papers" ? paperLibrary.length : subpageConfigs[slug].tableRows.length,
  };
});

const trending = [...ALL]
  .filter((entry) => entry.stars !== undefined)
  .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
  .slice(0, 6);

function recent(slug: string, limit = 4) {
  return [...subpageConfigs[slug].tableRows]
    .sort((a, b) => (b.posted ?? b.updated ?? "").localeCompare(a.posted ?? a.updated ?? ""))
    .slice(0, limit);
}

// Papers come from the research library, which is not a curated collection.
const latestPapers = [...paperLibrary]
  .filter((p) => p.year)
  .sort((a, b) => Number(b.year) - Number(a.year))
  .slice(0, 4)
  .map((p) => ({
    name: p.title.length > 52 ? `${p.title.slice(0, 50)}…` : p.title,
    type: p.domain,
    venue: p.venue ?? undefined,
    posted: p.year ?? undefined,
    updated: undefined as string | undefined,
  }));

const latest = [
  { title: "Latest Papers", href: "/papers", rows: latestPapers },
  { title: "New Benchmarks", href: "/benchmarks", rows: recent("benchmarks") },
  { title: "New Models", href: "/models", rows: recent("models") },
  { title: "New Datasets", href: "/datasets", rows: recent("datasets") },
];

function accentClasses(accent: string) {
  const accents = {
    blue: "from-blue-50 to-indigo-50 text-blue-700 border-blue-100",
    green: "from-emerald-50 to-green-50 text-emerald-700 border-emerald-100",
    violet: "from-violet-50 to-fuchsia-50 text-violet-700 border-violet-100",
    orange: "from-orange-50 to-amber-50 text-orange-700 border-orange-100",
    pink: "from-pink-50 to-rose-50 text-pink-700 border-pink-100",
  } as const;

  return accents[accent as keyof typeof accents] ?? accents.blue;
}

function SectionHeading({ icon, locale, title }: { icon: string; locale: Locale; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="home-section-icon">{icon}</div>
      <h2 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-[#101828]">
        {t(locale, title)}
      </h2>
    </div>
  );
}

export function DiscoverHero({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto max-w-[980px] space-y-8 pt-6 text-center">
      <div className="space-y-4">
        <p className="home-kicker mx-auto">
          {ALL.length} {t(locale, "open resources, one index")}
        </p>
        <h1 className="text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.06em] text-[#0f172a] sm:text-[3.2rem]">
          {t(locale, "OpenTAI — The")}{" "}
          <span className="whitespace-nowrap bg-[linear-gradient(135deg,#3468ff,#7b61ff)] bg-clip-text text-transparent">
            {t(locale, "Open Hub")}
          </span>{" "}
          {t(locale, "For Trustworthy AI")}
        </h1>
        <p className="mx-auto max-w-[42rem] text-[1.02rem] leading-8 text-[#5a6478]">
          {t(locale, siteBrand.headline)}
        </p>
      </div>

      <div className="mx-auto max-w-[46rem] text-left">
        <SiteSearch locale={locale} />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {collections.map(({ card, count }) => (
          <Link
            key={card.href}
            className="rounded-full border border-[#e3e8f2] bg-white px-4 py-2 text-sm font-medium text-[#475467] transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
            href={localizeHref(locale, card.href)}
          >
            {t(locale, card.title)}{" "}
            <span className="text-[#98a2b3]">{count.toLocaleString()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DiscoverSubscribe({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto mt-12 max-w-[1380px]">
      <SubscribeBox locale={locale} />
    </section>
  );
}

export function DiscoverTrending({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="✦" locale={locale} title="Trending" />
      <div className="grid gap-3 lg:grid-cols-2">
        {trending.map((entry, index) => (
          <Link
            key={`${entry.collection}-${entry.name}`}
            className="flex items-start gap-4 rounded-[20px] border border-[#eff2f6] bg-white px-5 py-4 transition hover:border-[#c7d2fe]"
            href={localizeHref(locale, entry.href)}
          >
            <span className="pt-0.5 text-[1rem] font-semibold text-[#4f46e5]">{index + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-semibold text-[#111827]">{entry.name}</span>
                {entry.venue ? (
                  <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-xs font-semibold text-[#4338ca]">
                    {entry.venue}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#667085]">
                {t(locale, entry.note)}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-medium text-[#344054]">
                ★ {entry.stars?.toLocaleString()}
              </p>
              <p className="text-xs uppercase tracking-[0.06em] text-[#98a2b3]">
                {t(locale, entry.collection)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DiscoverLatest({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="◷" locale={locale} title="Latest Releases" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {latest.map((group) => (
          <div key={group.title} className="home-info-panel p-6">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[#101828]">
                {t(locale, group.title)}
              </h3>
              <Link
                className="text-sm font-medium text-[#5260ff]"
                href={localizeHref(locale, group.href)}
              >
                {t(locale, "All →")}
              </Link>
            </div>
            <ul className="space-y-3">
              {group.rows.map((row) => (
                <li key={row.name} className="border-b border-[#f2f4f8] pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium leading-6 text-[#111827]">{row.name}</p>
                  <p className="text-xs text-[#98a2b3]">
                    {row.venue ?? t(locale, row.type)}
                    {row.posted ?? row.updated ? ` · ${row.posted ?? row.updated}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DiscoverCollections({ locale }: { locale: Locale }) {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="◈" locale={locale} title="Browse The Hub" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {collections.map(({ card, count }) => (
          <Link
            key={card.href}
            href={localizeHref(locale, card.href)}
            className={`home-category-card bg-gradient-to-br ${accentClasses(card.accent)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="home-category-icon">{card.icon}</div>
              <span className="text-xl">→</span>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[#101828]">
                {t(locale, card.title)}
              </h3>
              <p className="text-sm leading-6 text-[#667085]">{t(locale, card.description)}</p>
            </div>
            <div className="mt-4 inline-flex rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.8rem] font-medium">
              {count.toLocaleString()} {t(locale, count === 1 ? "entry" : "entries")}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
