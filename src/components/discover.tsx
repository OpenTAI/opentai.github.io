import Image from "next/image";
import Link from "next/link";
import {
  collectionOrder,
  homeCategoryCards,
  newsItems,
  siteBrand,
  subpageConfigs,
  SubpageTableRow,
} from "@/data/site";
import { SiteSearch } from "@/components/site-search";
import { SubscribeBox } from "@/components/subscribe";

type Entry = SubpageTableRow & { collection: string; href: string };

const ALL: Entry[] = collectionOrder.flatMap((slug) =>
  subpageConfigs[slug].tableRows.map((row) => ({
    ...row,
    collection: subpageConfigs[slug].title,
    href: `/${slug}`,
  })),
);

const collections = collectionOrder.map((slug) => ({
  config: subpageConfigs[slug],
  card: homeCategoryCards.find((card) => card.href === `/${slug}`)!,
}));

const trending = [...ALL]
  .filter((entry) => entry.stars !== undefined)
  .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
  .slice(0, 6);

function recent(slug: string, limit = 4) {
  return [...subpageConfigs[slug].tableRows]
    .sort((a, b) => (b.posted ?? b.updated ?? "").localeCompare(a.posted ?? a.updated ?? ""))
    .slice(0, limit);
}

const latest = [
  { title: "Latest papers", href: "/papers", rows: recent("papers") },
  { title: "New models", href: "/models", rows: recent("models") },
  { title: "New benchmarks", href: "/benchmarks", rows: recent("benchmarks") },
  { title: "New datasets", href: "/datasets", rows: recent("datasets") },
  {
    title: "Featured tools",
    href: "/tools",
    rows: [...subpageConfigs.tools.tableRows]
      .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
      .slice(0, 4),
  },
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

function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="home-section-icon">{icon}</div>
      <h2 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-[#101828]">{title}</h2>
    </div>
  );
}

export function DiscoverHero() {
  return (
    <section className="mx-auto max-w-[980px] space-y-8 pt-6 text-center">
      <div className="space-y-4">
        <p className="home-kicker mx-auto">{ALL.length} open resources, one index</p>
        <h1 className="text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.06em] text-[#0f172a] sm:text-[3.2rem]">
          OpenTAI — The{" "}
          <span className="bg-[linear-gradient(135deg,#3468ff,#7b61ff)] bg-clip-text text-transparent">
            Open Hub
          </span>{" "}
          for Trustworthy AI
        </h1>
        <p className="mx-auto max-w-[42rem] text-[1.02rem] leading-8 text-[#5a6478]">
          {siteBrand.headline}
        </p>
      </div>

      <div className="mx-auto max-w-[46rem] text-left">
        <SiteSearch />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {collections.map(({ card, config }) => (
          <Link
            key={card.href}
            className="rounded-full border border-[#e3e8f2] bg-white px-4 py-2 text-sm font-medium text-[#475467] transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
            href={card.href}
          >
            {card.title}{" "}
            <span className="text-[#98a2b3]">{config.tableRows.length}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DiscoverSubscribe() {
  return (
    <section className="mx-auto mt-12 max-w-[1380px]">
      <SubscribeBox />
    </section>
  );
}

export function DiscoverTrending() {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="✦" title="Trending" />
      <div className="grid gap-3 lg:grid-cols-2">
        {trending.map((entry, index) => (
          <Link
            key={`${entry.collection}-${entry.name}`}
            className="flex items-start gap-4 rounded-[20px] border border-[#eff2f6] bg-white px-5 py-4 transition hover:border-[#c7d2fe]"
            href={entry.href}
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
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#667085]">{entry.note}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-medium text-[#344054]">
                ★ {entry.stars?.toLocaleString()}
              </p>
              <p className="text-xs uppercase tracking-[0.06em] text-[#98a2b3]">
                {entry.collection}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function DiscoverLatest() {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="◷" title="Latest releases" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {latest.map((group) => (
          <div key={group.title} className="home-info-panel p-6">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[#101828]">
                {group.title}
              </h3>
              <Link className="text-sm font-medium text-[#5260ff]" href={group.href}>
                All →
              </Link>
            </div>
            <ul className="space-y-3">
              {group.rows.map((row) => (
                <li key={row.name} className="border-b border-[#f2f4f8] pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium leading-6 text-[#111827]">{row.name}</p>
                  <p className="text-xs text-[#98a2b3]">
                    {row.venue ?? row.type}
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

export function DiscoverNews() {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="◎" title="News" />
      <div className="grid gap-4 lg:grid-cols-3">
        {newsItems.map((item) => (
          <a
            key={item.title}
            className="home-info-panel flex flex-col overflow-hidden transition hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]"
            href={item.href}
            rel="noreferrer"
            target="_blank"
          >
            <div className="relative h-[176px] w-full bg-[#f4f6fb]">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={item.image}
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <span className="subpage-row-tag">{item.tag}</span>
                <span className="text-sm text-[#98a2b3]">{item.date}</span>
              </div>
              <h3 className="text-[1.15rem] font-semibold leading-7 tracking-[-0.03em] text-[#101828]">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-[#667085]">{item.body}</p>
              <span className="mt-auto pt-2 text-sm font-medium text-[#5260ff]">Read more →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function DiscoverCollections() {
  return (
    <section className="mx-auto mt-16 max-w-[1380px] space-y-7">
      <SectionHeading icon="◈" title="Browse the hub" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {collections.map(({ card, config }) => (
          <Link
            key={card.href}
            href={card.href}
            className={`home-category-card bg-gradient-to-br ${accentClasses(card.accent)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="home-category-icon">{card.icon}</div>
              <span className="text-xl">→</span>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[#101828]">
                {card.title}
              </h3>
              <p className="text-sm leading-6 text-[#667085]">{card.description}</p>
            </div>
            <div className="mt-4 inline-flex rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.8rem] font-medium">
              {config.tableRows.length} {config.tableRows.length === 1 ? "entry" : "entries"}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
