"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { EcosystemRecord } from "@/data/ecosystem";
import {
  type EcosystemSortKey,
  filterEcosystemRecords,
  formatCatalogValue,
  getFrameworkCategories,
  getFrameworkCategory,
  sortEcosystemRecords,
} from "@/lib/ecosystem-catalog";
import type { Locale } from "@/lib/i18n";

type CatalogKind = "models" | "frameworks" | "arenas" | "companies";

const copy = {
  en: {
    all: "All",
    academicOrigin: "Academic origin",
    country: "Country or region",
    direction: "Focus",
    entries: "verified entries",
    founded: "Founded",
    githubStars: "GitHub stars",
    links: "Official links",
    companyValue: "Valuation / market cap",
    noMatches: "No verified entries match these filters.",
    publicResults: "Public results",
    search: "Search names, organizations, and categories…",
    snapshot: "Static snapshot",
    sort: "Sort by",
    sourceReview: "Source record",
    status: "Status",
    sorts: {
      default: "GitHub stars",
      "stars-desc": "GitHub stars",
      "year-desc": "Newest first",
      "name-asc": "Name A–Z",
    },
  },
  zh: {
    all: "全部",
    academicOrigin: "学术或孵化来源",
    country: "国家或地区",
    direction: "方向",
    entries: "条已核验记录",
    founded: "成立于",
    githubStars: "GitHub 星标",
    links: "官方链接",
    companyValue: "估值 / 市值",
    noMatches: "没有符合当前筛选条件的已核验记录。",
    publicResults: "公开结果",
    search: "搜索名称、机构或分类……",
    snapshot: "静态快照",
    sort: "排序",
    sourceReview: "来源记录",
    status: "状态",
    sorts: {
      default: "GitHub 星标",
      "stars-desc": "GitHub 星标",
      "year-desc": "最新优先",
      "name-asc": "名称 A–Z",
    },
  },
} as const;

const pageCopy: Record<CatalogKind, Record<Locale, { title: string }>> = {
  models: {
    en: {
      title: "Models",
    },
    zh: {
      title: "模型",
    },
  },
  frameworks: {
    en: {
      title: "Frameworks",
    },
    zh: {
      title: "框架",
    },
  },
  arenas: {
    en: {
      title: "Arenas",
    },
    zh: {
      title: "竞技场",
    },
  },
  companies: {
    en: {
      title: "Companies",
    },
    zh: {
      title: "企业",
    },
  },
};

function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function frameworkCategoryLabel(category: string, locale: Locale) {
  if (locale === "en") return category;
  if (category === "Red Teaming") return "红队测试";
  if (category === "Evaluation") return "评测";
  if (category === "Defense / Alignment") return "防御 / 对齐";
  return category;
}

function CatalogCard({
  categoryLabel,
  locale,
  record,
}: {
  categoryLabel?: string;
  locale: Locale;
  record: EcosystemRecord;
}) {
  const strings = copy[locale];
  const displayYear = record.founded ?? record.year;

  return (
    <article className="ecosystem-card">
      <div className="ecosystem-card-head">
        <div className="ecosystem-logo" aria-hidden="true">{initials(record.name)}</div>
        <div className="ecosystem-card-heading">
          <div className="min-w-0">
            <span className="ecosystem-category">{categoryLabel ?? record.category}</span>
            <h2>{record.name}</h2>
          </div>
          {record.publisher ? <p className="ecosystem-publisher">{record.publisher}</p> : null}
        </div>
      </div>

      <p className="ecosystem-description">
        {locale === "zh" ? record.descriptionZh : record.description}
      </p>

      <div className="ecosystem-facts">
        {displayYear ? (
          <div>
            <span>{record.founded ? strings.founded : locale === "zh" ? "年份" : "Year"}</span>
            <strong>{displayYear}</strong>
          </div>
        ) : null}
        {record.stars !== undefined ? (
          <div>
            <span>{strings.githubStars}</span>
            <strong>★ {record.stars.toLocaleString("en-US")}</strong>
            {record.starsUpdated ? <small>{strings.snapshot} · {record.starsUpdated}</small> : null}
          </div>
        ) : null}
        {record.country ? (
          <div>
            <span>{strings.country}</span>
            <strong>{locale === "zh" ? (record.countryZh ?? record.country) : record.country}</strong>
          </div>
        ) : null}
        {record.publicResults ? (
          <div>
            <span>{locale === "zh" ? "结果" : "Results"}</span>
            <strong>{strings.publicResults}</strong>
          </div>
        ) : null}
        {record.status ? (
          <div>
            <span>{strings.status}</span>
            <strong>{locale === "zh" ? (record.statusZh ?? record.status) : record.status}</strong>
          </div>
        ) : null}
      </div>

      {record.affiliation ? <p className="ecosystem-affiliation">{record.affiliation}</p> : null}

      <div className="ecosystem-links" aria-label={strings.links}>
        {record.links.map((link) => (
          <a href={link.url} key={`${record.id}-${link.label}`} rel="noreferrer" target="_blank">
            {link.label}<span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <details className="ecosystem-sources">
        <summary>{strings.sourceReview}</summary>
        <p>{record.verificationNote}</p>
        <div>
          {record.sources.map((source, index) => (
            <a href={source} key={source} rel="noreferrer" target="_blank">
              {locale === "zh" ? `来源 ${index + 1}` : `Source ${index + 1}`} ↗
            </a>
          ))}
        </div>
      </details>
    </article>
  );
}

function CompanyCard({
  index,
  locale,
  record,
}: {
  index: number;
  locale: Locale;
  record: EcosystemRecord;
}) {
  const strings = copy[locale];
  const logo = record.logo;
  const logoSource = record.logoSource;
  const logoPath = logo?.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${logo}`
    : logo;
  const country = locale === "zh" ? record.countryZh : record.country;
  const valuation = locale === "zh" ? record.valuationZh : record.valuation;
  const companyFacts = [
    {
      label: strings.direction,
      value: locale === "zh" ? record.directionZh : record.direction,
      tone: "focus",
      wide: true,
    },
    { label: strings.founded, value: record.founded },
    {
      label: strings.academicOrigin,
      value: locale === "zh" ? record.academicOriginZh : record.academicOrigin,
      wide: true,
    },
    {
      label: strings.status,
      value: locale === "zh" ? record.statusZh : record.status,
      wide: true,
    },
  ];

  return (
    <article className="ecosystem-card company-card" id={`company-${record.id}`}>
      {logoPath && logoSource ? (
        <a
          aria-label={locale === "zh" ? `查看 ${record.name} 官方 Logo 来源` : `View the official source for the ${record.name} logo`}
          className="company-logo-panel"
          href={logoSource}
          rel="noreferrer"
          target="_blank"
        >
          <span className="company-card-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="company-logo-fallback" aria-hidden="true">{initials(record.name)}</span>
          <Image
            alt={`${record.name} logo`}
            className="company-logo-image"
            height={112}
            onError={(event) => event.currentTarget.parentElement?.classList.remove("company-logo-loaded")}
            onLoad={(event) => event.currentTarget.parentElement?.classList.add("company-logo-loaded")}
            src={logoPath}
            width={320}
          />
        </a>
      ) : (
        <div className="company-logo-panel company-logo-placeholder" aria-label={`${record.name} logo`}>
          <span className="company-card-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{initials(record.name)}</span>
        </div>
      )}

      <div className="company-card-body">
        <div className="company-card-heading">
          <span className="ecosystem-category">{record.category}</span>
          <div className="company-title-row">
            <h2>{record.name}</h2>
            <span className="company-country">{formatCatalogValue(country, locale)}</span>
          </div>
          {valuation ? (
            <div className="company-valuation-highlight">
              <span>{locale === "zh" ? "估值 / 交易价" : "Value / valuation"}</span>
              <strong>{valuation}</strong>
            </div>
          ) : null}
        </div>

        <p className="ecosystem-description">
          {locale === "zh" ? record.descriptionZh : record.description}
        </p>

        <div className="company-facts">
          {companyFacts.map((fact) => (
            <div
              className={[
                fact.wide ? "company-fact-wide" : "",
                fact.tone === "focus" ? "company-fact-focus" : "",
              ].filter(Boolean).join(" ")}
              key={fact.label}
            >
              <span>{fact.label}</span>
              <strong>{formatCatalogValue(fact.value, locale)}</strong>
            </div>
          ))}
          {record.stars !== undefined ? (
            <div className="company-fact-wide">
              <span>{strings.githubStars}</span>
              <strong>★ {record.stars.toLocaleString("en-US")}</strong>
              {record.starsUpdated ? <small>{strings.snapshot} · {record.starsUpdated}</small> : null}
            </div>
          ) : null}
        </div>

        <div className="ecosystem-links" aria-label={strings.links}>
          {record.links.map((link) => (
            <a href={link.url} key={`${record.id}-${link.label}`} rel="noreferrer" target="_blank">
              {link.label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <details className="ecosystem-sources">
          <summary>{strings.sourceReview}</summary>
          <p>{record.verificationNote}</p>
          <div>
            {record.sources.map((source, index) => (
              <a href={source} key={source} rel="noreferrer" target="_blank">
                {locale === "zh" ? `来源 ${index + 1}` : `Source ${index + 1}`} ↗
              </a>
            ))}
          </div>
        </details>
      </div>
    </article>
  );
}

const companyMarketGroups = [
  { category: "AI Safety", code: "C1", tone: "green" },
  { category: "Agent Safety", code: "C2", tone: "teal" },
  { category: "Evaluation", code: "C3", tone: "gold" },
  { category: "AI Security", code: "C4", tone: "rust" },
] as const;

function CompanyMarketMap({
  locale,
  records,
}: {
  locale: Locale;
  records: readonly EcosystemRecord[];
}) {
  const groups = companyMarketGroups
    .map((group) => ({
      ...group,
      records: records.filter((record) => record.category === group.category),
    }))
    .filter((group) => group.records.length > 0);

  return (
    <section className="company-market-map" aria-labelledby="company-market-map-title">
      <div className="company-market-map-heading">
        <div>
          <span className="company-market-map-kicker">
            {locale === "zh" ? "市场地图 · 已核验目录" : "Market map · verified directory"}
          </span>
          <h2 id="company-market-map-title">
            {locale === "zh" ? "AI 安全企业版图" : "AI safety company landscape"}
          </h2>
          <p>
            {locale === "zh"
              ? "按已核验的目录类别组织公司；选择节点可前往其官方页面。卡片数值优先采用披露的交易价或投后估值；其余为明确标注的 OpenTAI 区间估算。"
              : "Companies grouped by their verified directory category. Select a node to open its official page. Card values prioritize disclosed transaction prices or post-money valuations; the rest are explicitly labeled OpenTAI range estimates."}
          </p>
          <small className="company-market-map-methodology">
            {locale === "zh"
              ? "估算方法：若仅披露最近融资额，按该轮约 12.5%–25% 稀释推算；未披露融资额的公司采用更宽的同阶段可比区间。所有估算均非公开市场市值。"
              : "Estimate method: when only the latest round is disclosed, the range assumes roughly 12.5%–25% dilution; companies without a disclosed round use a wider same-stage comparable range. Estimates are not public-market capitalizations."}
          </small>
        </div>
        <span className="company-market-map-count">
          <strong>{records.length}</strong>
          {locale === "zh" ? " 家公司" : " companies shown"}
        </span>
      </div>

      <div className="company-market-map-layers">
        {groups.map((group) => (
          <section
            className={`company-market-layer company-market-layer-${group.tone}`}
            key={group.category}
          >
            <div className="company-market-layer-label">
              <span>{group.code}</span>
              <h3>{group.category}</h3>
              <small>{group.records.length} {locale === "zh" ? "家公司" : "companies"}</small>
            </div>
            <div className="company-market-nodes">
              {group.records.map((record) => {
                const primaryLink = record.links.find((link) => (
                  link.label.toLowerCase().includes("website")
                )) ?? record.links[0];
                const logoPath = record.logo?.startsWith("/")
                  ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${record.logo}`
                  : record.logo;
                const nodeValuation = locale === "zh" ? record.valuationZh : record.valuation;
                const content = (
                  <>
                    <span className="company-market-node-logo" aria-hidden="true">
                      <span>{initials(record.name)}</span>
                      {logoPath ? (
                        <Image
                          alt=""
                          height={40}
                          onError={(event) => { event.currentTarget.style.display = "none"; }}
                          src={logoPath}
                          style={{ height: "100%", width: "100%" }}
                          width={40}
                        />
                      ) : null}
                    </span>
                    <span className="company-market-node-copy">
                      <span className="company-market-node-name">{record.name}</span>
                      {nodeValuation ? (
                        <small>{nodeValuation}</small>
                      ) : null}
                    </span>
                    <span className="company-market-node-dot" aria-hidden="true" />
                  </>
                );

                return primaryLink ? (
                  <a
                    className={`company-market-node${nodeValuation ? " company-market-node-valued" : ""}`}
                    href={primaryLink.url}
                    key={record.id}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content}
                    <span className="sr-only">
                      {locale === "zh" ? "打开官方页面" : "Open official page"}
                    </span>
                  </a>
                ) : (
                  <div
                    className={`company-market-node${nodeValuation ? " company-market-node-valued" : ""}`}
                    key={record.id}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function EcosystemCatalogPage({
  kind,
  locale,
  records,
}: {
  kind: CatalogKind;
  locale: Locale;
  records: readonly EcosystemRecord[];
}) {
  const strings = copy[locale];
  const page = pageCopy[kind][locale];
  const categories = useMemo(
    () => [
      "All",
      ...(kind === "frameworks"
        ? getFrameworkCategories(records)
        : Array.from(new Set(records.map((record) => record.category)))),
    ],
    [kind, records],
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<EcosystemSortKey>("default");
  const visibleRecords = useMemo(() => {
    const matchingQuery = filterEcosystemRecords(records, { category: "All", query });
    const matchingCategory = category === "All"
      ? matchingQuery
      : matchingQuery.filter((record) => (
        kind === "frameworks"
          ? getFrameworkCategory(record.category) === category
          : record.category === category
      ));

    return sortEcosystemRecords(matchingCategory, sortKey);
  }, [category, kind, query, records, sortKey]);

  const categoryCount = (item: string) => {
    if (item === "All") return records.length;
    return records.filter((record) => (
      kind === "frameworks"
        ? getFrameworkCategory(record.category) === item
        : record.category === item
    )).length;
  };
  const parent = kind === "companies" ? "Ecosystem" : kind === "arenas" ? "Evaluation" : "Resources";

  return (
    <div className={`ecosystem-catalog ecosystem-catalog-${kind} page-frame`}>
      <PageBreadcrumb items={["Home", parent, pageCopy[kind].en.title]} locale={locale} />

      <section className="ecosystem-hero">
        {kind === "companies" ? (
          <div className="company-hero-mark" aria-hidden="true">C</div>
        ) : null}
        <div>
          {kind === "companies" ? (
            <span className="company-hero-kicker">
              {locale === "zh" ? "AI 安全企业图谱" : "AI safety company atlas"}
            </span>
          ) : null}
          <h1>{page.title}</h1>
        </div>
        <div className="ecosystem-hero-proof">
          <strong>{records.length}</strong>
          <span>{strings.entries}</span>
        </div>
      </section>

      <section className="ecosystem-toolbar" aria-label={locale === "zh" ? "目录筛选" : "Catalog filters"}>
        <label className="ecosystem-search">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label={strings.search}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={strings.search}
            type="search"
            value={query}
          />
        </label>
        <div className="ecosystem-filter-pills">
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={category === item ? "ecosystem-filter-active" : ""}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item === "All" ? strings.all : (
                kind === "frameworks" ? frameworkCategoryLabel(item, locale) : item
              )}
              <span>{categoryCount(item)}</span>
            </button>
          ))}
        </div>
        <label className="ecosystem-sort">
          <span>{strings.sort}</span>
          <select onChange={(event) => setSortKey(event.target.value as EcosystemSortKey)} value={sortKey}>
            <option value="default">{strings.sorts.default}</option>
            <option value="year-desc">{strings.sorts["year-desc"]}</option>
            <option value="name-asc">{strings.sorts["name-asc"]}</option>
          </select>
        </label>
      </section>

      {visibleRecords.length ? (
        <>
          {kind === "companies" ? (
            <CompanyMarketMap locale={locale} records={visibleRecords} />
          ) : null}
          {kind === "companies" ? (
            <div className="company-directory-heading">
              <div>
                <span>{locale === "zh" ? "目录" : "Directory"}</span>
                <h2>{locale === "zh" ? "公司档案" : "Company profiles"}</h2>
              </div>
              <p>{visibleRecords.length} {locale === "zh" ? "条已核验记录" : "verified records"}</p>
            </div>
          ) : null}
          <section className="ecosystem-grid" aria-live="polite">
            {visibleRecords.map((record, index) => (
              kind === "companies" ? (
                <CompanyCard index={index} key={record.id} locale={locale} record={record} />
              ) : (
                <CatalogCard
                  categoryLabel={kind === "frameworks"
                    ? frameworkCategoryLabel(getFrameworkCategory(record.category), locale)
                    : undefined}
                  key={record.id}
                  locale={locale}
                  record={record}
                />
              )
            ))}
          </section>
        </>
      ) : (
        <p className="ecosystem-empty">{strings.noMatches}</p>
      )}
    </div>
  );
}
