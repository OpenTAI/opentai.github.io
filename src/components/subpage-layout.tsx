"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CollectionSummaryRow } from "@/components/collection-summary-row";
import { IntegratedSectionHeading } from "@/components/integrated-section-heading";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { SubpageConfig, SubpageTableRow } from "@/data/site";
import {
  buildCollectionStatistics,
  buildRecentYearSeries,
  rowMatchesDomainFilters,
  type DatasetCount,
} from "@/lib/dataset-statistics";
import { benchmarkCardPresentation } from "@/lib/benchmark-card-presentation";
import { Locale, localizeHref, t } from "@/lib/i18n";
import { matchesLocalizedSearch } from "@/lib/resource-search";
import {
  buildResourceCatalogSummary,
  compactResourceTitle,
  datasetActionLabel,
} from "@/lib/resource-catalog-presentation";
import {
  resourceYear,
  sortResourceRows,
  type ResourceSortKey,
} from "@/lib/resource-sort";
import { resourceSlug } from "@/lib/resource-slug";

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

type ResourceCardKind = "benchmark" | "dataset";
type InteractionEnvironment = "Mobile" | "Computer-use" | "CLI";

const INTERACTION_ENVIRONMENTS: readonly InteractionEnvironment[] = [
  "Mobile",
  "Computer-use",
  "CLI",
];

function externalResource(
  row: SubpageTableRow,
  kind: "github" | "huggingface" | "paper",
) {
  return row.resources.find((resource) => {
    const href = resource.href.toLowerCase();
    if (resource.label === "Source survey") return false;
    if (kind === "github") return href.includes("github.com/");
    if (kind === "huggingface") return href.includes("huggingface.co/datasets/");
    return (
      (href.includes("arxiv.org/abs/") || href.includes("doi.org/"))
    );
  });
}

function recordedScale(row: SubpageTableRow) {
  return row.stats?.find((stat) =>
    ["Recorded scale", "Recorded size"].includes(stat.label),
  )?.value;
}

function yearFor(row: SubpageTableRow) {
  return resourceYear(row)?.toString();
}

function ResourceLinksMenu({
  isOpen,
  locale,
  menuId,
  onOpenChange,
  row,
}: {
  isOpen: boolean;
  locale: Locale;
  menuId: string;
  onOpenChange: (open: boolean) => void;
  row: SubpageTableRow;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const paper = externalResource(row, "paper");
  const github = externalResource(row, "github");
  const huggingFace = externalResource(row, "huggingface");
  const preferredLinks = [
    paper ? { href: paper.href, label: "Paper" } : undefined,
    github ? { href: github.href, label: "GitHub" } : undefined,
    huggingFace ? { href: huggingFace.href, label: "Hugging Face" } : undefined,
  ].filter((resource): resource is { href: string; label: string } => Boolean(resource));
  const preferredHrefs = new Set(preferredLinks.map((resource) => resource.href));
  const links = [
    ...preferredLinks,
    ...row.resources.filter((resource) => !preferredHrefs.has(resource.href)),
  ];

  useEffect(() => {
    if (!isOpen) return;

    function closeOutside(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) onOpenChange(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onOpenChange]);

  if (links.length === 0) {
    return (
      <div aria-disabled="true" className="resource-links-cell resource-links-empty">
        <span>{t(locale, "Links")}</span>
        <span>—</span>
      </div>
    );
  }

  return (
    <div className="resource-links-cell">
      <div
        className="resource-links-menu"
        data-open={isOpen ? "true" : "false"}
        ref={menuRef}
      >
        <button
          aria-controls={menuId}
          aria-expanded={isOpen}
          aria-label={t(locale, "Open links")}
          className="resource-links-trigger"
          onClick={() => onOpenChange(!isOpen)}
          type="button"
        >
          <span>{t(locale, "Links")}</span>
          <span className="resource-links-count">{links.length}</span>
          <span aria-hidden="true" className="resource-links-chevron">⌄</span>
        </button>
        {isOpen ? (
          <div className="resource-links-popover" id={menuId}>
            <p>{t(locale, "Available links")}</p>
            {links.map((resource) => (
              <Link
                key={`${resource.label}-${resource.href}`}
                href={resource.href}
                rel="noreferrer"
                target="_blank"
              >
                <span>{t(locale, resource.label)}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ResourceGridCard({
  detailBase,
  isLinksOpen,
  kind,
  locale,
  menuId,
  onLinksOpenChange,
  row,
}: {
  detailBase?: string;
  isLinksOpen: boolean;
  kind: ResourceCardKind;
  locale: Locale;
  menuId: string;
  onLinksOpenChange: (open: boolean) => void;
  row: SubpageTableRow;
}) {
  const year = yearFor(row);
  const scale = recordedScale(row);
  const metric = kind === "dataset" ? row.downloads : undefined;
  const metricLabel = "Downloads";
  const detailHref = detailBase
    ? localizeHref(locale, `${detailBase}/${resourceSlug(row)}`)
    : undefined;
  const externalHref =
    kind === "dataset"
      ? row.primaryUrl ?? row.resources[0]?.href
      : undefined;
  const titleHref = detailHref ?? externalHref;
  const presentation = benchmarkCardPresentation({
    kind,
    locale,
    note: row.note,
    tags: row.tags ?? [],
  });
  const cardTitle = compactResourceTitle(row.name);

  return (
    <article className="resource-grid-card">
      <div className="resource-card-topline">
        <div className="resource-card-title-group">
          <h3 className="resource-card-heading">
            {titleHref ? (
              <Link
                className="resource-card-title"
                href={titleHref}
                rel={externalHref ? "noreferrer" : undefined}
                target={externalHref ? "_blank" : undefined}
              >
                {cardTitle}
              </Link>
            ) : (
              <span className="resource-card-title">{cardTitle}</span>
            )}
          </h3>
          {row.stars !== undefined ? (
            <span
              aria-label={`${t(locale, "GitHub stars")}: ${row.stars.toLocaleString("en-US")}`}
              className="resource-card-stars"
              title={t(locale, "GitHub stars")}
            >
              <span aria-hidden="true">★</span>
              {row.stars.toLocaleString("en-US")}
            </span>
          ) : null}
        </div>
        <ResourceLinksMenu
          isOpen={isLinksOpen}
          locale={locale}
          menuId={menuId}
          onOpenChange={onLinksOpenChange}
          row={row}
        />
      </div>

      <div className="resource-grid-badges">
        <span>{t(locale, row.type)}</span>
        {row.venue ? <span>{row.venue}</span> : null}
        {presentation.tags.slice(0, 2).map((tag) => (
          <span key={tag}>{t(locale, tag)}</span>
        ))}
      </div>

      <p className="resource-card-description">{t(locale, presentation.note)}</p>

      <div className="resource-card-footer">
        {year ? (
          <span aria-label={`${t(locale, "Year")}: ${year}`} title={t(locale, "Year")}>
            <span aria-hidden="true">◷</span>
            {year}
          </span>
        ) : null}
        {metric !== undefined ? (
          <span
            aria-label={`${t(locale, metricLabel)}: ${metric.toLocaleString("en-US")}`}
            title={t(locale, metricLabel)}
          >
            <span aria-hidden="true">{kind === "dataset" ? "⇩" : "★"}</span>
            {metric.toLocaleString("en-US")}
          </span>
        ) : null}
        {scale ? (
          <span aria-label={`${t(locale, "Recorded scale")}: ${t(locale, scale)}`} title={t(locale, "Recorded scale")}>
            <strong>{t(locale, "Recorded scale")}:</strong>
            {t(locale, scale)}
          </span>
        ) : null}
        {detailHref ? (
          <Link className="resource-card-details-link" href={detailHref}>
            {t(locale, "View details")} →
          </Link>
        ) : externalHref ? (
          <Link
            className="resource-card-details-link"
            href={externalHref}
            rel="noreferrer"
            target="_blank"
          >
            {t(locale, datasetActionLabel(externalHref))} ↗
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function ResourceStatistics({
  categoryCount,
  icon,
  kind,
  linkCount,
  locale,
  rows,
  title,
  venueCount,
}: {
  categoryCount: number;
  icon: string;
  kind: ResourceCardKind;
  linkCount: number;
  locale: Locale;
  rows: readonly SubpageTableRow[];
  title: string;
  venueCount: number;
}) {
  const statistics = buildCollectionStatistics(
    rows.map((row) => ({
      domain: row.domain,
      domains: row.domains,
      type: row.type,
      year: resourceYear(row),
    })),
  );
  const noun = kind === "dataset" ? "Dataset" : "Benchmark";
  const plural = kind === "dataset" ? "datasets" : "benchmarks";
  const growthTitle = `${noun} Growth By Year`;
  const yearlyDescription = `Annual count of ${plural} with a recorded year.`;
  const domainTitle = `${noun}s By Domain`;
  const recentYears = buildRecentYearSeries(statistics.years, new Date().getUTCFullYear());

  const chartWidth = 620;
  const chartHeight = 250;
  const plot = { top: 18, right: 22, bottom: 42, left: 48 };
  const plotWidth = chartWidth - plot.left - plot.right;
  const plotHeight = chartHeight - plot.top - plot.bottom;
  const maximumCount = Math.max(...recentYears.map(({ count }) => count), 1);
  const yMaximum = Math.max(4, Math.ceil(maximumCount / 4) * 4);
  const yearPoints = recentYears.map(({ count, year }, index, years) => ({
    count,
    year,
    x:
      years.length === 1
        ? plot.left + plotWidth / 2
        : plot.left + (index / (years.length - 1)) * plotWidth,
    y: plot.top + plotHeight - (count / yMaximum) * plotHeight,
  }));
  const linePath = yearPoints.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = yearPoints[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");
  const areaPath = yearPoints.length
    ? `${linePath} L ${yearPoints.at(-1)?.x} ${plot.top + plotHeight} L ${yearPoints[0].x} ${plot.top + plotHeight} Z`
    : "";
  const yTicks = Array.from({ length: 5 }, (_, index) => ({
    label: Math.round((yMaximum / 4) * index),
    y: plot.top + plotHeight - (plotHeight / 4) * index,
  }));

  const domainColors = ["#5957d9", "#17a99a", "#f59e0b", "#e0528d", "#64748b"];

  const renderDonut = ({
    centerLabel,
    centerValue,
    colors,
    description,
    id,
    items,
    title,
  }: {
    centerLabel: string;
    centerValue: number;
    colors: readonly string[];
    description: string;
    id: string;
    items: DatasetCount[];
    title: string;
  }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const segmentTotal = items.reduce((total, item) => total + item.count, 0);
    let progress = 0;

    return (
      <div className="dataset-donut-layout">
        <svg
          aria-labelledby={`${id}-title ${id}-description`}
          className="dataset-donut"
          role="img"
          viewBox="0 0 128 128"
        >
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-description`}>{description}</desc>
          <circle className="dataset-donut-track" cx="64" cy="64" r={radius} />
          {items.map((item, index) => {
            const length = segmentTotal ? (item.count / segmentTotal) * circumference : 0;
            const offset = -progress;
            progress += length;
            return (
              <circle
                aria-hidden="true"
                className="dataset-donut-segment"
                cx="64"
                cy="64"
                key={item.label}
                r={radius}
                stroke={colors[index % colors.length]}
                strokeDasharray={`${length} ${circumference}`}
                strokeDashoffset={offset}
              />
            );
          })}
          <text className="dataset-donut-value" textAnchor="middle" x="64" y="61">
            {centerValue}
          </text>
          <text className="dataset-donut-label" textAnchor="middle" x="64" y="77">
            {centerLabel}
          </text>
        </svg>
        <ul aria-label={title} className="dataset-chart-legend">
          {items.map((item, index) => (
            <li key={item.label}>
              <span
                aria-hidden="true"
                className="dataset-chart-swatch"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="dataset-chart-legend-label">{t(locale, item.label)}</span>
              <strong>{item.count}</strong>
              <span className="dataset-chart-percent">
                {segmentTotal ? `${Math.round((item.count / segmentTotal) * 100)}%` : "—"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="dataset-statistics" aria-labelledby={`${kind}-catalog-title`}>
      <IntegratedSectionHeading
        action={<ResourceSubmissionDialog kind={kind} locale={locale} />}
        icon={icon}
        locale={locale}
        stats={[
          { label: "Entries", value: rows.length },
          { label: "Categories", value: categoryCount },
          { label: "Published venues", value: venueCount },
          { label: "Links", value: linkCount },
        ]}
        title={title}
        titleId={`${kind}-catalog-title`}
      />
      <div className="dataset-statistics-grid">
        <article className="dataset-year-card">
          <div className="dataset-chart-card-heading">
            <div>
              <h3>{t(locale, growthTitle)}</h3>
            </div>
            <span>{recentYears.reduce((total, year) => total + year.count, 0)}</span>
          </div>
          {recentYears.length ? (
            <div className="dataset-year-chart-scroll">
              <svg
                aria-labelledby="dataset-year-chart-title dataset-year-chart-description"
                className="dataset-year-chart"
                role="img"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              >
                <title id="dataset-year-chart-title">{t(locale, growthTitle)}</title>
                <desc id="dataset-year-chart-description">
                  {t(locale, yearlyDescription)}
                </desc>
                {yTicks.map((tick) => (
                  <g key={tick.label}>
                    <line
                      className="dataset-year-gridline"
                      x1={plot.left}
                      x2={chartWidth - plot.right}
                      y1={tick.y}
                      y2={tick.y}
                    />
                    <text className="dataset-year-axis-label" textAnchor="end" x={plot.left - 12} y={tick.y + 4}>
                      {tick.label}
                    </text>
                  </g>
                ))}
                <path className="dataset-year-area" d={areaPath} />
                <path className="dataset-year-line" d={linePath} />
                {yearPoints.map((point) => (
                  <g key={point.year}>
                    <circle className="dataset-year-point-halo" cx={point.x} cy={point.y} r="7" />
                    <circle className="dataset-year-point" cx={point.x} cy={point.y} r="3.5">
                      <title>{`${point.year}: ${point.count}`}</title>
                    </circle>
                    <text
                      className="dataset-year-axis-label dataset-year-x-label"
                      textAnchor="middle"
                      x={point.x}
                      y={chartHeight - 14}
                    >
                      {point.year}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          ) : (
            <p className="dataset-chart-empty">{t(locale, "No recorded year data")}</p>
          )}
        </article>
        <article className="dataset-domain-card">
          <div className="dataset-chart-card-heading">
            <div>
              <h3>{t(locale, domainTitle)}</h3>
            </div>
          </div>
          {renderDonut({
            centerLabel: t(locale, plural),
            centerValue: statistics.total,
            colors: domainColors,
            description: t(locale, "Recorded domain assignments in this collection."),
            id: `${kind}-domain-chart`,
            items: statistics.domains,
            title: t(locale, domainTitle),
          })}
        </article>
      </div>
    </section>
  );
}

export function SubpageLayout(
  props: SubpageConfig & {
    detailBase?: string;
    linkTitlesToResource?: boolean;
    locale: Locale;
    resourceCardKind?: ResourceCardKind;
    showEmptyCategories?: boolean;
  },
) {
  const { locale, resourceCardKind } = props;
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeEnvironment, setActiveEnvironment] =
    useState<InteractionEnvironment | null>(null);
  const [openLinksId, setOpenLinksId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<ResourceSortKey>(
    resourceCardKind ? "stars-desc" : "default",
  );
  const normalizedQuery = query.trim().toLowerCase();

  const allCategoryStats = useMemo(
    () =>
      props.categories
        .map((category) => {
          const filters = category.filters ?? [category.title];
          const rows = props.tableRows.filter((row) =>
            rowMatchesDomainFilters(row, filters),
          );

          return { category, count: rows.length };
        }),
    [props.categories, props.tableRows],
  );

  const categoryStats = useMemo(
    () =>
      allCategoryStats.filter(
        ({ count }) => props.showEmptyCategories || count > 0,
      ),
    [allCategoryStats, props.showEmptyCategories],
  );

  const linkedResourceCount = useMemo(
    () => props.tableRows.reduce((total, row) => total + row.resources.length, 0),
    [props.tableRows],
  );

  const venueCount = useMemo(
    () => props.tableRows.filter((row) => row.venue).length,
    [props.tableRows],
  );

  const environmentStats = useMemo(
    () =>
      INTERACTION_ENVIRONMENTS.map((environment) => ({
        environment,
        count: props.tableRows.filter((row) => row.tags?.includes(environment)).length,
      })),
    [props.tableRows],
  );
  const hasInteractionEnvironments = environmentStats.some(({ count }) => count > 0);

  const visibleRows = useMemo(() => {
    const category = categoryStats.find(
      ({ category }) => category.title === activeCategory,
    )?.category;
    const filters = category?.filters ?? (category ? [category.title] : undefined);
    const categoryRows = filters
      ? props.tableRows.filter((row) => rowMatchesDomainFilters(row, filters))
      : props.tableRows;

    const environmentRows = activeEnvironment
      ? categoryRows.filter((row) => row.tags?.includes(activeEnvironment))
      : categoryRows;

    const filteredRows = environmentRows.filter((row) => {
      const searchValues: (string | null | undefined)[] = [
        row.name,
        row.note,
        row.type,
        row.subtitle,
        row.venue,
        row.meta,
        ...(row.domains ?? []),
        ...(row.tags ?? []),
        ...(row.stats ?? []).map((stat) => stat.value),
        ...(row.sourcePapers ?? []).flatMap((paper) => [
          paper.title,
          paper.evidence,
        ]),
      ];

      return matchesLocalizedSearch(
        searchValues,
        normalizedQuery,
        (value) => t(locale, value),
      );
    });
    return sortResourceRows(filteredRows, sortKey);
  }, [activeCategory, activeEnvironment, categoryStats, locale, normalizedQuery, props.tableRows, sortKey]);

  const catalogSummary = useMemo(
    () =>
      resourceCardKind
        ? buildResourceCatalogSummary(visibleRows)
        : undefined,
    [resourceCardKind, visibleRows],
  );
  const summaryItems = catalogSummary
    ? [
        { icon: "#", label: "Entries", value: catalogSummary.entries.toLocaleString("en-US") },
        ...(catalogSummary.yearStart !== undefined && catalogSummary.yearEnd !== undefined
          ? [{
              icon: "◷",
              label: "Year range",
              value:
                catalogSummary.yearStart === catalogSummary.yearEnd
                  ? String(catalogSummary.yearStart)
                  : `${catalogSummary.yearStart}–${catalogSummary.yearEnd}`,
            }]
          : []),
        {
          icon: "⌘",
          label: "GitHub sources",
          value: catalogSummary.githubRows.toLocaleString("en-US"),
        },
        {
          icon: "↗",
          label: "Verified links",
          value: catalogSummary.links.toLocaleString("en-US"),
        },
        ...(catalogSummary.downloads !== undefined
          ? [{
              icon: "⇩",
              label: "Recorded downloads",
              value: catalogSummary.downloads.toLocaleString("en-US"),
            }]
          : []),
        ...(catalogSummary.stars !== undefined
          ? [{
              icon: "★",
              label: "Recorded stars",
              value: catalogSummary.stars.toLocaleString("en-US"),
            }]
          : []),
      ]
    : [];

  return (
    <div
      className={`page-frame space-y-7 ${resourceCardKind ? "resource-catalog-page" : ""}`}
    >
      <PageBreadcrumb items={props.breadcrumb} locale={locale} />

      {!resourceCardKind ? (
        <section className="subpage-hero-card">
          <div className="subpage-hero-layout">
            <div className="subpage-icon-panel">
              <div className="subpage-icon-orb">{props.heroIcon}</div>
            </div>

            <div className="subpage-hero-copy">
              <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0f172a]">
                {t(locale, props.title)}
              </h1>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Entries", value: String(props.tableRows.length) },
                  { label: "Categories", value: String(categoryStats.length) },
                  { label: "Published venues", value: String(venueCount) },
                  { label: "Links", value: String(linkedResourceCount) },
                ].map((stat) => (
                  <div key={stat.label} className="subpage-stat-pill">
                    <span className="font-semibold text-[#4338ca]">{stat.value}</span>
                    <span>{t(locale, stat.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {resourceCardKind ? (
        <ResourceStatistics
          categoryCount={categoryStats.length}
          icon={props.heroIcon}
          kind={resourceCardKind}
          linkCount={linkedResourceCount}
          locale={locale}
          rows={props.tableRows}
          title={props.title}
          venueCount={venueCount}
        />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceff5] pb-4">
        <p className="text-sm text-[#667085]">
          {normalizedQuery || activeCategory || activeEnvironment
            ? locale === "zh"
              ? `${visibleRows.length} 项匹配结果`
              : `${visibleRows.length} matching ${visibleRows.length === 1 ? "entry" : "entries"}`
            : `${props.tableRows.length} ${t(locale, "entries")}`}
        </p>
        <div className="resource-catalog-controls">
          {resourceCardKind ? (
            <label className="resource-sort-control">
              <span>{t(locale, "Sort by")}</span>
              <select
                aria-label={t(locale, "Sort by")}
                onChange={(event) => setSortKey(event.target.value as ResourceSortKey)}
                value={sortKey}
              >
                <option value="default">{t(locale, "Default order")}</option>
                <option value="downloads-desc">{t(locale, "Downloads: high to low")}</option>
                <option value="downloads-asc">{t(locale, "Downloads: low to high")}</option>
                <option value="stars-desc">{t(locale, "GitHub stars: high to low")}</option>
                <option value="stars-asc">{t(locale, "GitHub stars: low to high")}</option>
                <option value="year-desc">{t(locale, "Year: newest first")}</option>
                <option value="year-asc">{t(locale, "Year: oldest first")}</option>
              </select>
            </label>
          ) : null}
          <div className="resource-search-stack">
            <div className="subpage-search-box">
              <span>⌕</span>
              <input
                aria-label={locale === "zh" ? `搜索${t(locale, props.title)}` : `Search ${props.title}`}
                className="subpage-search-input"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={locale === "zh" ? `搜索${t(locale, props.title)}……` : `Search ${props.title.toLowerCase()}...`}
                type="search"
                value={query}
              />
            </div>
            {resourceCardKind && hasInteractionEnvironments ? (
              <div className="resource-environment-filter">
                <span>{t(locale, "Interaction environment")}</span>
                <div
                  aria-label={t(locale, "Filter resources by interaction environment")}
                  className="dataset-domain-pills"
                  role="group"
                >
                  <button
                    aria-pressed={activeEnvironment === null}
                    className={activeEnvironment === null ? "dataset-domain-pill-active" : undefined}
                    onClick={() => setActiveEnvironment(null)}
                    type="button"
                  >
                    {t(locale, "All environments")}
                  </button>
                  {environmentStats.map(({ environment, count }) => (
                    <button
                      aria-pressed={activeEnvironment === environment}
                      className={
                        activeEnvironment === environment
                          ? "dataset-domain-pill-active"
                          : undefined
                      }
                      disabled={count === 0}
                      key={environment}
                      onClick={() => setActiveEnvironment(environment)}
                      type="button"
                    >
                      {t(locale, environment)} {count}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {resourceCardKind === "dataset" ? (
              <div
                aria-label={t(locale, "Filter datasets by domain")}
                className="dataset-domain-pills"
                role="group"
              >
                <button
                  aria-pressed={activeCategory === null}
                  className={activeCategory === null ? "dataset-domain-pill-active" : undefined}
                  onClick={() => setActiveCategory(null)}
                  type="button"
                >
                  {t(locale, "All domains")}
                </button>
                {allCategoryStats.map(({ category, count }) => (
                  <button
                    aria-pressed={activeCategory === category.title}
                    className={
                      activeCategory === category.title
                        ? "dataset-domain-pill-active"
                        : undefined
                    }
                    disabled={count === 0}
                    key={category.title}
                    onClick={() => setActiveCategory(category.title)}
                    type="button"
                  >
                    {t(locale, category.title)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section className={resourceCardKind ? "resource-browser-layout" : "space-y-8"}>
        <div className="space-y-5">
          <h2 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            {t(locale, props.sectionTitle)}
          </h2>
          <div
            className={
              resourceCardKind
                ? "resource-category-list"
                : "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            }
          >
            {resourceCardKind ? (
              <button
                aria-pressed={activeCategory === null}
                className={`resource-all-category ${activeCategory === null ? "resource-all-category-active" : ""}`}
                onClick={() => setActiveCategory(null)}
                type="button"
              >
                <span>{t(locale, "All")}</span>
                <span>{props.tableRows.length}</span>
              </button>
            ) : null}
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
                      {t(locale, category.title)}
                    </h3>
                    <p className="text-sm leading-6 text-[#667085]">{t(locale, category.detail)}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-[#475467]">
                  {count === 0
                    ? t(locale, "No entries yet")
                    : `${count} ${t(locale, count === 1 ? "entry" : "entries")}`}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="subpage-main-table-card">
          {resourceCardKind ? (
            <CollectionSummaryRow items={summaryItems} locale={locale} />
          ) : (
            <h2 className="mb-5 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
              {t(locale, props.tableTitle)}
            </h2>
          )}

          {resourceCardKind ? (
            <div className="resource-grid-list">
              {visibleRows.map((row, index) => {
                const menuId = `resource-links-${index}`;
                return (
                <ResourceGridCard
                  key={row.name}
                  detailBase={props.detailBase}
                  isLinksOpen={openLinksId === menuId}
                  kind={resourceCardKind}
                  locale={locale}
                  menuId={menuId}
                  onLinksOpenChange={(open) => setOpenLinksId(open ? menuId : null)}
                  row={row}
                />
                );
              })}
              {visibleRows.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[#667085]">
                  {t(locale, "No entries match")} “{query.trim()}”.
                </p>
              ) : null}
            </div>
          ) : (
            <>
              <div
                className={`hidden ${GRID} gap-4 border-b border-[#edf0f5] px-4 pb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#98a2b3] lg:grid`}
              >
                {COLUMNS.map((column) => (
                  <div key={column}>{t(locale, column)}</div>
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
                            href={localizeHref(locale, `${props.detailBase}/${row.slug}`)}
                          >
                            {row.name}
                          </Link>
                        ) : props.linkTitlesToResource && row.resources[0] ? (
                          <Link
                            className="text-[1rem] font-semibold leading-7 text-[#111827] hover:text-[#4338ca] hover:underline"
                            href={row.resources[0].href}
                            rel="noreferrer"
                            target="_blank"
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
                        <p className="text-sm font-medium text-[#5260ff]">
                          {t(locale, row.subtitle)}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm leading-6 text-[#667085]">{t(locale, row.note)}</p>
                      {row.tags?.length ? (
                        <div className="subpage-row-tags" aria-label={t(locale, "Tags")}>
                          {row.tags.map((tag) => (
                            <span key={tag} className="subpage-row-tag">
                              {t(locale, tag)}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="subpage-table-pill">{t(locale, row.type)}</span>
                </div>
                <div className="space-y-1">
                  {row.stats?.length ? (
                    row.stats.map((stat) => (
                      <p key={stat.label} className="flex justify-between gap-3 text-sm lg:block">
                        <span className="text-[#98a2b3]">{t(locale, stat.label)}</span>{" "}
                        <span className="font-medium text-[#344054]">{t(locale, stat.value)}</span>
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
                        {t(locale, resource.label)}
                      </Link>
                    ))
                  ) : (
                    <span className="subpage-resource-pill">{t(locale, "link pending")}</span>
                  )}
                </div>
                {row.meta ? (
                  <div className="subpage-paper-meta lg:col-span-4">{row.meta}</div>
                ) : null}
                  </div>
                ))}
                {visibleRows.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-[#667085]">
                    {t(locale, "No entries match")} “{query.trim()}”.
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
