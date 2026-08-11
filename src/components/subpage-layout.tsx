"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SubpageConfig } from "@/data/site";

function accentPill(accent: string) {
  const accents = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    pink: "bg-pink-50 text-pink-700 border-pink-100",
  } as const;

  return accents[accent as keyof typeof accents] ?? accents.blue;
}

const COLUMNS = ["Resource", "Category", "Activity", "Links"] as const;
const GRID = "lg:grid-cols-[2.2fr_0.8fr_0.95fr_0.75fr]";

export function SubpageLayout(
  props: SubpageConfig & { detailBase?: string; showEmptyCategories?: boolean },
) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const categoryStats = useMemo(
    () =>
      props.categories
        .map((category) => {
          const filters = category.filters ?? [category.title];
          const rows = props.tableRows.filter((row) => filters.includes(row.type));

          return { category, count: rows.length };
        })
        .filter(({ count }) => props.showEmptyCategories || count > 0),
    [props.categories, props.showEmptyCategories, props.tableRows],
  );

  const linkedResourceCount = useMemo(
    () => props.tableRows.reduce((total, row) => total + row.resources.length, 0),
    [props.tableRows],
  );

  const venueCount = useMemo(
    () => props.tableRows.filter((row) => row.venue).length,
    [props.tableRows],
  );

  const visibleRows = useMemo(() => {
    const category = categoryStats.find(
      ({ category }) => category.title === activeCategory,
    )?.category;
    const filters = category?.filters ?? (category ? [category.title] : undefined);
    const categoryRows = filters
      ? props.tableRows.filter((row) => filters.includes(row.type))
      : props.tableRows;

    return categoryRows.filter(
      (row) =>
        !normalizedQuery ||
        [row.name, row.note, row.type, row.subtitle ?? "", row.venue ?? "", row.meta ?? ""]
          .concat(row.tags ?? [])
          .concat((row.stats ?? []).map((stat) => stat.value))
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
    );
  }, [activeCategory, categoryStats, normalizedQuery, props.tableRows]);

  return (
    <div className="mx-auto max-w-[1480px] space-y-7">
      <div className="subpage-breadcrumb">
        {props.breadcrumb.map((item, index) => (
          <span key={item} className="flex items-center gap-2">
            {index > 0 ? <span className="text-[#c0c5d1]">›</span> : null}
            <span>{item}</span>
          </span>
        ))}
      </div>

      <section className="subpage-hero-card">
        <div className="grid gap-7 xl:grid-cols-[190px_minmax(0,1fr)_0.72fr] xl:items-start">
          <div className="subpage-icon-panel">
            <div className="subpage-icon-orb">{props.heroIcon}</div>
          </div>

          <div className="space-y-4">
            <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0f172a]">
              {props.title}
            </h1>
            <p className="max-w-3xl text-[1rem] leading-8 text-[#556072]">
              {props.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Entries", value: String(props.tableRows.length) },
                { label: "Categories", value: String(categoryStats.length) },
                { label: "Published venues", value: String(venueCount) },
                { label: "Links", value: String(linkedResourceCount) },
              ].map((stat) => (
                <div key={stat.label} className="subpage-stat-pill">
                  <span className="font-semibold text-[#4338ca]">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[0.98rem] leading-8 text-[#556072]">{props.overview}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceff5] pb-4">
        <p className="text-sm text-[#667085]">
          {normalizedQuery || activeCategory
            ? `${visibleRows.length} matching ${visibleRows.length === 1 ? "entry" : "entries"}`
            : `${props.tableRows.length} entries`}
        </p>
        <div className="subpage-search-box">
          <span>⌕</span>
          <input
            aria-label={`Search ${props.title}`}
            className="subpage-search-input"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${props.title.toLowerCase()}...`}
            type="search"
            value={query}
          />
        </div>
      </div>

      <section className="space-y-8">
        <div className="space-y-5">
          <h2 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            {props.sectionTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categoryStats.map(({ category, count }) => (
              <button
                key={category.title}
                aria-pressed={activeCategory === category.title}
                className={`subpage-category-card ${activeCategory === category.title ? "subpage-category-card-active" : ""} ${count === 0 ? "opacity-55" : ""}`}
                disabled={count === 0}
                onClick={() =>
                  setActiveCategory((current) =>
                    current === category.title ? null : category.title,
                  )
                }
                type="button"
              >
                <div className="flex items-start gap-3">
                  <div className={`subpage-category-icon ${accentPill(category.accent)}`}>
                    ✦
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[#111827]">
                      {category.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#667085]">{category.detail}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-[#475467]">
                  {count === 0 ? "No entries yet" : `${count} ${count === 1 ? "entry" : "entries"}`}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="subpage-main-table-card">
          <h2 className="mb-5 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            {props.tableTitle}
          </h2>

          <div
            className={`hidden ${GRID} gap-4 border-b border-[#edf0f5] px-4 pb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#98a2b3] lg:grid`}
          >
            {COLUMNS.map((column) => (
              <div key={column}>{column}</div>
            ))}
          </div>

          <div className="mt-3 space-y-2.5">
            {visibleRows.map((row, index) => (
              <div key={row.name} className={`subpage-table-row ${GRID}`}>
                <div className="min-w-0">
                  <div className="flex items-start gap-3">
                    <span className="pt-1 text-[1rem] font-semibold text-[#4f46e5]">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {props.detailBase && row.slug ? (
                          <Link
                            className="text-[1rem] font-semibold leading-7 text-[#111827] hover:text-[#4338ca] hover:underline"
                            href={`${props.detailBase}/${row.slug}`}
                          >
                            {row.name}
                          </Link>
                        ) : (
                          <p className="text-[1rem] font-semibold leading-7 text-[#111827]">
                            {row.name}
                          </p>
                        )}
                        {row.venue ? (
                          <span className="rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-xs font-semibold text-[#4338ca]">
                            {row.venue}
                          </span>
                        ) : null}
                      </div>
                      {row.subtitle ? (
                        <p className="text-sm font-medium text-[#5260ff]">{row.subtitle}</p>
                      ) : null}
                      <p className="mt-1 text-sm leading-6 text-[#667085]">{row.note}</p>
                      {row.tags?.length ? (
                        <div className="subpage-row-tags" aria-label="Tags">
                          {row.tags.map((tag) => (
                            <span key={tag} className="subpage-row-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="subpage-table-pill">{row.type}</span>
                </div>
                <div className="space-y-1">
                  {row.stats?.length ? (
                    row.stats.map((stat) => (
                      <p key={stat.label} className="flex justify-between gap-3 text-sm lg:block">
                        <span className="text-[#98a2b3]">{stat.label}</span>{" "}
                        <span className="font-medium text-[#344054]">{stat.value}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-[#c0c5d1]">—</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 self-start">
                  {row.resources.length ? (
                    row.resources.map((resource) => (
                      <Link
                        key={resource.href}
                        className="subpage-resource-pill transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
                        href={resource.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {resource.label}
                      </Link>
                    ))
                  ) : (
                    <span className="subpage-resource-pill">link pending</span>
                  )}
                </div>
                {row.meta ? (
                  <div className="subpage-paper-meta lg:col-span-4">{row.meta}</div>
                ) : null}
              </div>
            ))}
            {visibleRows.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[#667085]">
                No entries match “{query.trim()}”.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
