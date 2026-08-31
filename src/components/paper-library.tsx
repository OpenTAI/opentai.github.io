"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LibraryPaper,
  paperDomains,
  paperGroups,
  paperLibrary,
  paperSearchSupplement,
} from "@/data/papers";
import { Locale, t } from "@/lib/i18n";
import { buildRecentYearSeries } from "@/lib/dataset-statistics";
import {
  formatPaperAuthors,
  PAPER_LIBRARY_TABS,
  PaperLibraryTab,
  paperDisplayMeta,
  paperMatchesLibraryTab,
  paperSearchText,
  paperYearCounts,
  sortPapersNewestFirst,
} from "@/lib/paper-catalog";

const PAGE = 30;

const VENUE_ABBR: Record<string, string> = {
  "IEEE Transactions on Information Forensics and Security": "IEEE TIFS",
  "IEEE Transactions on Pattern Analysis and Machine Intelligence": "IEEE TPAMI",
  "IEEE Transactions on Image Processing": "IEEE TIP",
  "IEEE Transactions on Multimedia": "IEEE TMM",
  "IEEE Transactions on Multimedia (TMM)": "IEEE TMM",
  "IEEE Transactions on Neural Networks and Learning Systems": "IEEE TNNLS",
  "IEEE Transactions on Dependable and Secure Computing": "IEEE TDSC",
  "International Journal of Computer Vision": "IJCV",
  "Transactions on Machine Learning Research": "TMLR",
};

function shortVenue(venue: string) {
  return VENUE_ABBR[venue] ?? (venue.length > 38 ? `${venue.slice(0, 36)}…` : venue);
}

function paperLink(paper: LibraryPaper) {
  if (paper.arxivId) return `https://arxiv.org/abs/${paper.arxivId}`;
  return paper.url ?? null;
}

const SEARCH_LIBRARY = [...paperLibrary, ...paperSearchSupplement];
const HAYSTACK = new Map(
  SEARCH_LIBRARY.map((paper) => [paper, paperSearchText(paper)]),
);

const LINKED = paperLibrary.filter((paper) => paperLink(paper)).length;
const YEAR_COUNTS = buildRecentYearSeries(
  paperYearCounts(paperLibrary),
  new Date().getUTCFullYear(),
);
const DOMAIN_COUNTS = paperDomains.map((label) => ({
  count: paperLibrary.filter((paper) => paper.domain === label).length,
  label,
}));
const DOMAIN_COLORS = ["#5957d9", "#17a99a", "#f59e0b"];
function Chip({
  active,
  children,
  count,
  onClick,
  size = "md",
}: {
  active: boolean;
  children: React.ReactNode;
  count?: number;
  onClick: () => void;
  size?: "md" | "sm";
}) {
  const base =
    size === "md"
      ? "rounded-full border px-4 py-2 text-sm font-medium transition"
      : "rounded-full px-3 py-1.5 text-xs font-medium transition";
  const tone =
    size === "md"
      ? active
        ? "border-[#c7d2fe] bg-[#eef2ff] text-[#4338ca]"
        : "border-[#e3e8f2] bg-white text-[#475467] hover:border-[#c7d2fe]"
      : active
        ? "bg-[#111827] text-white"
        : "bg-[#f6f8fc] text-[#667085] hover:bg-[#eef2ff] hover:text-[#4338ca]";

  return (
    <button aria-pressed={active} className={`${base} ${tone}`} onClick={onClick} type="button">
      {children}
      {count !== undefined ? (
        <span className={active && size === "sm" ? "text-white/60" : "text-[#98a2b3]"}> {count}</span>
      ) : null}
    </button>
  );
}

function venueTone(venue: string) {
  const normalized = venue.toUpperCase();
  if (normalized.includes("ACL") || normalized.includes("EMNLP") || normalized.includes("NAACL")) {
    return "bg-[#ecfdf3] text-[#027a48]";
  }
  if (normalized.includes("NEURIPS") || normalized.includes("ICML") || normalized.includes("ICLR")) {
    return "bg-[#f4f3ff] text-[#6938ef]";
  }
  if (normalized.includes("CVPR") || normalized.includes("ICCV") || normalized.includes("ECCV")) {
    return "bg-[#ecfdff] text-[#0e7090]";
  }
  if (normalized.includes("IEEE")) {
    return "bg-[#eff8ff] text-[#175cd3]";
  }
  if (normalized.includes("AAAI") || normalized.includes("IJCAI")) {
    return "bg-[#fff6ed] text-[#c4320a]";
  }
  return "bg-[#f2f4f7] text-[#475467]";
}

function PaperYearChart({ locale }: { locale: Locale }) {
  if (!YEAR_COUNTS.length) return null;

  const width = 760;
  const height = 220;
  const left = 42;
  const right = 18;
  const top = 18;
  const bottom = 36;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxCount = Math.max(...YEAR_COUNTS.map(({ count }) => count), 1);
  const x = (index: number) =>
    left + (YEAR_COUNTS.length === 1 ? chartWidth / 2 : (index / (YEAR_COUNTS.length - 1)) * chartWidth);
  const y = (count: number) => top + chartHeight - (count / maxCount) * chartHeight;
  const points = YEAR_COUNTS.map(({ count }, index) => `${x(index)},${y(count)}`).join(" ");
  const area = `${left},${top + chartHeight} ${points} ${left + chartWidth},${top + chartHeight}`;
  const labelStep = Math.max(1, Math.ceil(YEAR_COUNTS.length / 8));

  return (
    <article className="dataset-year-card">
      <div className="dataset-chart-card-heading">
        <div>
          <h3>{t(locale, "Papers By Year")}</h3>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full border border-[#e3e8f2] bg-white px-3 py-1.5 text-xs text-[#475467]">
            <strong className="text-[#111827]">{paperLibrary.length.toLocaleString()}</strong>{" "}
            {t(locale, "papers")}
          </span>
          <span className="rounded-full border border-[#e3e8f2] bg-white px-3 py-1.5 text-xs text-[#475467]">
            <strong className="text-[#111827]">{LINKED.toLocaleString()}</strong>{" "}
            {t(locale, "with links")}
          </span>
        </div>
      </div>
      <div className="dataset-year-chart-scroll">
        <svg
          aria-label={t(locale, "Annual count of papers with a recorded year.")}
          className="dataset-year-chart"
          role="img"
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            <linearGradient id="paper-year-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const gridY = top + chartHeight - ratio * chartHeight;
            return (
              <g key={ratio}>
                <line stroke="#e8ecf3" x1={left} x2={left + chartWidth} y1={gridY} y2={gridY} />
                <text fill="#98a2b3" fontSize="10" textAnchor="end" x={left - 8} y={gridY + 3}>
                  {Math.round(maxCount * ratio)}
                </text>
              </g>
            );
          })}
          <polygon fill="url(#paper-year-area)" points={area} />
          <polyline fill="none" points={points} stroke="#4f46e5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {YEAR_COUNTS.map(({ count, year }, index) => (
            <g key={year}>
              <circle cx={x(index)} cy={y(count)} fill="#4f46e5" r="3.5" />
              {index % labelStep === 0 || index === YEAR_COUNTS.length - 1 ? (
                <text fill="#667085" fontSize="10" textAnchor="middle" x={x(index)} y={height - 12}>
                  {year}
                </text>
              ) : null}
            </g>
          ))}
        </svg>
      </div>
    </article>
  );
}

function PaperDomainDonut({ locale }: { locale: Locale }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <article className="dataset-domain-card">
      <div className="dataset-chart-card-heading">
        <div>
          <h3>{t(locale, "Papers By Domain")}</h3>
        </div>
      </div>
      <div className="dataset-donut-layout">
        <svg
          aria-labelledby="paper-domain-chart-title paper-domain-chart-description"
          className="dataset-donut"
          role="img"
          viewBox="0 0 128 128"
        >
          <title id="paper-domain-chart-title">{t(locale, "Papers By Domain")}</title>
          <desc id="paper-domain-chart-description">
            {t(locale, "Recorded domain assignments in this collection.")}
          </desc>
          <circle className="dataset-donut-track" cx="64" cy="64" r={radius} />
          {DOMAIN_COUNTS.map((item, index) => {
            const length = paperLibrary.length
              ? (item.count / paperLibrary.length) * circumference
              : 0;
            const offset = -DOMAIN_COUNTS.slice(0, index).reduce(
              (total, previous) => total + (previous.count / paperLibrary.length) * circumference,
              0,
            );
            return (
              <circle
                aria-hidden="true"
                className="dataset-donut-segment"
                cx="64"
                cy="64"
                key={item.label}
                r={radius}
                stroke={DOMAIN_COLORS[index % DOMAIN_COLORS.length]}
                strokeDasharray={`${length} ${circumference}`}
                strokeDashoffset={offset}
              />
            );
          })}
          <text className="dataset-donut-value" textAnchor="middle" x="64" y="61">
            {paperLibrary.length}
          </text>
          <text className="dataset-donut-label" textAnchor="middle" x="64" y="77">
            {t(locale, "papers")}
          </text>
        </svg>
        <ul aria-label={t(locale, "Papers By Domain")} className="dataset-chart-legend">
          {DOMAIN_COUNTS.map((item, index) => (
            <li key={item.label}>
              <span
                aria-hidden="true"
                className="dataset-chart-swatch"
                style={{ backgroundColor: DOMAIN_COLORS[index % DOMAIN_COLORS.length] }}
              />
              <span className="dataset-chart-legend-label">{t(locale, item.label)}</span>
              <strong>{item.count}</strong>
              <span className="dataset-chart-percent">
                {paperLibrary.length ? `${Math.round((item.count / paperLibrary.length) * 100)}%` : "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PaperStatistics({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="paper-statistics-title" className="dataset-statistics">
      <div className="dataset-statistics-heading">
        <h2 id="paper-statistics-title">{t(locale, "Paper Statistics")}</h2>
      </div>
      <div className="dataset-statistics-grid">
        <PaperYearChart locale={locale} />
        <PaperDomainDonut locale={locale} />
      </div>
    </section>
  );
}

export function PaperLibrary({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState<PaperLibraryTab>("LLMs");
  const [group, setGroup] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const normalized = query.trim().toLowerCase();

  const reset = (next: () => void) => {
    next();
    setShown(PAGE);
  };

  const queryMatches = useMemo(() => {
    const terms = normalized ? normalized.split(/\s+/) : [];
    if (!terms.length) return paperLibrary;
    return SEARCH_LIBRARY.filter((paper) => {
      const text = HAYSTACK.get(paper)!;
      return terms.every((term) => text.includes(term));
    });
  }, [normalized]);
  const inTab = useMemo(
    () => normalized
      ? queryMatches
      : queryMatches.filter((paper) => paperMatchesLibraryTab(paper, tab)),
    [normalized, queryMatches, tab],
  );
  const groups = useMemo(() => {
    if (normalized || tab === "Surveys") return [];
    return (paperGroups[tab] ?? []).filter((name) => inTab.some((paper) => paper.group === name));
  }, [inTab, normalized, tab]);
  const sections = useMemo(() => {
    if (!group) return [];
    const seen: string[] = [];
    for (const p of inTab) {
      if (p.group === group && p.section && !seen.includes(p.section)) seen.push(p.section);
    }
    return seen;
  }, [group, inTab]);

  const filtered = useMemo(() => {
    return sortPapersNewestFirst(
      inTab.filter((paper) => {
        if (group && paper.group !== group) return false;
        if (section && paper.section !== section) return false;
        return true;
      }),
    );
  }, [group, inTab, section]);

  return (
    <section className="subpage-main-table-card">
      <PaperStatistics locale={locale} />

      <div className="space-y-3 border-b border-[#eceff5] pb-5">
        {normalized ? (
          <div className="flex flex-wrap items-center gap-2 rounded-[16px] border border-[#dfe4ff] bg-[#f7f7ff] px-4 py-3 text-sm text-[#475467]">
            <span className="font-semibold text-[#4338ca]">
              {locale === "zh" ? "全部来源分类" : "All source categories"}
            </span>
            <span>{queryMatches.length.toLocaleString()} {t(locale, queryMatches.length === 1 ? "paper" : "papers")}</span>
          </div>
        ) : (
          <div
            aria-label={locale === "zh" ? "论文分类" : "Paper categories"}
            className="flex flex-wrap gap-2"
            role="tablist"
          >
            {PAPER_LIBRARY_TABS.map((name) => (
              <button
                key={name}
                aria-controls="paper-library-results"
                aria-selected={tab === name}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  tab === name
                    ? "border-[#c7d2fe] bg-[#eef2ff] text-[#4338ca]"
                    : "border-[#e3e8f2] bg-white text-[#475467] hover:border-[#c7d2fe]"
                }`}
                onClick={() => reset(() => { setTab(name); setGroup(null); setSection(null); })}
                role="tab"
                type="button"
              >
                {t(locale, name)}
                <span className="text-[#98a2b3]">
                  {" "}{queryMatches.filter((paper) => paperMatchesLibraryTab(paper, name)).length}
                </span>
              </button>
            ))}
          </div>
        )}

        {groups.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.map((name) => (
              <Chip
                key={name}
                active={group === name}
                count={inTab.filter((p) => p.group === name).length}
                onClick={() => reset(() => { setGroup(group === name ? null : name); setSection(null); })}
                size="sm"
              >
                {t(locale, name)}
              </Chip>
            ))}
          </div>
        ) : null}

        {sections.length ? (
          <div className="flex flex-wrap gap-2 border-t border-[#f2f4f8] pt-3">
            {sections.map((name) => (
              <Chip
                key={name}
                active={section === name}
                count={inTab.filter((p) => p.section === name).length}
                onClick={() => reset(() => setSection(section === name ? null : name))}
                size="sm"
              >
                {t(locale, name)}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>

      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#667085]">
          {normalized
            ? locale === "zh"
              ? `全部来源分类共 ${filtered.length.toLocaleString()} 篇`
              : `${filtered.length.toLocaleString()} across all source categories`
            : `${filtered.length.toLocaleString()} ${t(locale, filtered.length === 1 ? "paper" : "papers")}`}
        </p>
        <div className="subpage-search-box">
          <span>⌕</span>
          <input
            aria-label={t(locale, "Search the research library")}
            className="subpage-search-input"
            onChange={(event) => reset(() => setQuery(event.target.value))}
            placeholder={t(locale, "Search titles, authors, venues...")}
            type="search"
            value={query}
          />
        </div>
      </div>

      <ol className="space-y-2.5" id="paper-library-results" role="tabpanel">
        {filtered.slice(0, shown).map((paper, index) => {
          const href = paperLink(paper);
          const meta = paperDisplayMeta(paper);
          return (
            <li
              key={`${paper.title}-${index}`}
              className="rounded-[18px] border border-[#eff2f6] px-5 py-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p className="min-w-0 flex-1 text-[0.98rem] font-medium leading-7 text-[#111827]">
                  {href ? (
                    <Link
                      className="rounded-sm transition hover:text-[#4338ca] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4f46e5]"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {paper.title}
                      <span className="sr-only">
                        {locale === "zh" ? "（在新标签页打开论文）" : " (opens paper in a new tab)"}
                      </span>
                    </Link>
                  ) : (
                    paper.title
                  )}
                </p>
                <div className="paper-card-meta flex shrink-0 items-center gap-2">
                  {paper.kind === "survey" ? (
                    <span className="whitespace-nowrap rounded-full bg-[#ecfdf5] px-2.5 py-0.5 text-xs font-semibold text-[#047857]">
                      {t(locale, "Survey")}
                    </span>
                  ) : null}
                  {meta.yearLabel ? (
                    <span className="whitespace-nowrap rounded-full bg-[#fff8e8] px-2.5 py-0.5 text-xs font-semibold text-[#9a6700]">
                      {meta.yearLabel}
                    </span>
                  ) : null}
                  {meta.venueLabel ? (
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${venueTone(meta.venueLabel)}`}
                      title={`${paper.venue} ${paper.year ?? ""}`.trim()}
                    >
                      {shortVenue(meta.venueLabel)}
                    </span>
                  ) : null}
                  {href ? (
                    <Link
                      className="subpage-resource-pill transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {meta.linkLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
              {paper.authors.length ? (
                <p className="mt-1 text-sm text-[#667085]">
                  {formatPaperAuthors(paper.authors)}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-[#98a2b3]">
                {t(locale, paper.domain)}
                {paper.section ? ` · ${t(locale, paper.section)}` : ` · ${t(locale, paper.group)}`}
              </p>
            </li>
          );
        })}
      </ol>

      {filtered.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-[#667085]">
          {t(locale, "No papers match")} “{query.trim()}”.
        </p>
      ) : null}

      {shown < filtered.length ? (
        <button
          className="home-secondary-cta mt-6 w-full"
          onClick={() => setShown((current) => current + PAGE)}
          type="button"
        >
          {locale === "zh"
            ? `再显示 ${Math.min(PAGE, filtered.length - shown)} 篇`
            : `Show ${Math.min(PAGE, filtered.length - shown)} more`}
        </button>
      ) : null}
    </section>
  );
}
