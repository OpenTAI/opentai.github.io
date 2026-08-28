"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { EcosystemRecord } from "@/data/ecosystem";
import {
  type EcosystemSortKey,
  filterCompanyRecords,
  filterEcosystemRecords,
  formatCompanyValuation,
  formatCatalogValue,
  getCompanyFilterOptions,
  getCompanySpecialties,
  getFrameworkCategories,
  getFrameworkCategory,
  sortEcosystemRecords,
} from "@/lib/ecosystem-catalog";
import type { Locale } from "@/lib/i18n";

type CatalogKind = "models" | "frameworks" | "arenas" | "companies";

const copy = {
  en: {
    all: "All",
    country: "Country or region",
    entries: "verified entries",
    founded: "Founded",
    githubStars: "GitHub stars",
    links: "Official links",
    companyValue: "Valuation / market cap",
    specialty: "Specialty",
    strength: "Strength",
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
    country: "国家或地区",
    entries: "条已核验记录",
    founded: "成立于",
    githubStars: "GitHub 星标",
    links: "官方链接",
    companyValue: "估值 / 市值",
    specialty: "专长",
    strength: "优势背景",
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
      title: "Startups",
    },
    zh: {
      title: "初创企业",
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
  locale,
  record,
}: {
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
  const rawValuation = locale === "zh" ? record.valuationZh : record.valuation;
  const valuation = rawValuation ? formatCompanyValuation(rawValuation, locale) : undefined;
  const specialties = getCompanySpecialties(record, locale);
  const strength = locale === "zh" ? record.academicOriginZh : record.academicOrigin;

  const logoContent = logoPath ? (
    <>
      <span className="company-logo-fallback" aria-hidden="true">{initials(record.name)}</span>
      <Image
        alt={`${record.name} logo`}
        className="company-logo-image"
        height={48}
        onError={(event) => event.currentTarget.parentElement?.classList.remove("company-logo-loaded")}
        onLoad={(event) => event.currentTarget.parentElement?.classList.add("company-logo-loaded")}
        src={logoPath}
        width={48}
      />
    </>
  ) : <span aria-hidden="true">{initials(record.name)}</span>;

  return (
    <article className="ecosystem-card company-card" id={`company-${record.id}`}>
      <div className="company-card-body">
        <div className="company-card-heading">
          <div className="company-title-row">
            <div className="company-brand-heading">
              {logoSource ? (
                <a
                  aria-label={locale === "zh" ? `查看 ${record.name} 官方 Logo 来源` : `View the official source for the ${record.name} logo`}
                  className={`company-logo-inline${logoPath ? "" : " company-logo-placeholder"}`}
                  href={logoSource}
                  rel="noreferrer"
                  target="_blank"
                >
                  {logoContent}
                </a>
              ) : (
                <div className={`company-logo-inline${logoPath ? "" : " company-logo-placeholder"}`}>
                  {logoContent}
                </div>
              )}
              <h2>{record.name}</h2>
            </div>
            <span className="company-country">{formatCatalogValue(country, locale)}</span>
          </div>
          {valuation ? (
            <div className="company-valuation-highlight">
              <span>{locale === "zh" ? "估值 / 交易价" : "Value / valuation"}</span>
              <strong>{valuation}</strong>
            </div>
          ) : null}
        </div>

        <div className="company-specialties">
          <span>{strings.specialty}</span>
          <div>
            {specialties.length ? specialties.map((specialty) => (
              <strong key={specialty}>{specialty}</strong>
            )) : <strong>{formatCatalogValue(undefined, locale)}</strong>}
          </div>
        </div>

        <div className="company-facts">
          <div>
            <span>{strings.founded}</span>
            <strong>{formatCatalogValue(record.founded, locale)}</strong>
          </div>
          <div className="company-fact-wide">
            <span>{strings.strength}</span>
            <strong>{formatCatalogValue(strength, locale)}</strong>
          </div>
        </div>

        <div className="ecosystem-links" aria-label={strings.links}>
          {record.links.slice(0, 2).map((link) => (
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
  const [companyYear, setCompanyYear] = useState("");
  const [companyCountry, setCompanyCountry] = useState("");
  const [companySpecialty, setCompanySpecialty] = useState("");
  const companyFilterOptions = useMemo(
    () => getCompanyFilterOptions(records, locale),
    [locale, records],
  );
  const visibleRecords = useMemo(() => {
    if (kind === "companies") {
      return filterCompanyRecords(records, {
        country: companyCountry,
        locale,
        specialty: companySpecialty,
        year: companyYear,
      });
    }

    const matchingQuery = filterEcosystemRecords(records, { category: "All", query });
    const matchingCategory = category === "All"
      ? matchingQuery
      : matchingQuery.filter((record) => (
        kind === "frameworks"
          ? getFrameworkCategory(record.category) === category
          : record.category === category
      ));

    return sortEcosystemRecords(matchingCategory, sortKey);
  }, [category, companyCountry, companySpecialty, companyYear, kind, locale, query, records, sortKey]);

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
        <div>
          <h1>{page.title}</h1>
        </div>
        <div className="ecosystem-hero-proof">
          <strong>{records.length}</strong>
          <span>{strings.entries}</span>
        </div>
      </section>

      {kind === "companies" ? (
        <section className="ecosystem-toolbar company-filter-bar" aria-label={locale === "zh" ? "公司筛选" : "Company filters"}>
          <label className="company-filter-control">
            <span>{locale === "zh" ? "年份" : "Year"}</span>
            <select onChange={(event) => setCompanyYear(event.target.value)} value={companyYear}>
              <option value="">{locale === "zh" ? "所有年份" : "All years"}</option>
              {companyFilterOptions.years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>
          <label className="company-filter-control">
            <span>{strings.country}</span>
            <select onChange={(event) => setCompanyCountry(event.target.value)} value={companyCountry}>
              <option value="">{locale === "zh" ? "所有国家或地区" : "All countries and regions"}</option>
              {companyFilterOptions.countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
          </label>
          <label className="company-filter-control">
            <span>{strings.specialty}</span>
            <select onChange={(event) => setCompanySpecialty(event.target.value)} value={companySpecialty}>
              <option value="">{locale === "zh" ? "所有专长" : "All specialties"}</option>
              {companyFilterOptions.specialties.map((specialty) => <option key={specialty} value={specialty}>{specialty}</option>)}
            </select>
          </label>
          <p className="company-filter-count">
            <strong>{visibleRecords.length}</strong>
            {locale === "zh" ? " 家公司" : " companies"}
          </p>
        </section>
      ) : (
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
      )}

      {visibleRecords.length ? (
        <>
          {kind === "companies" ? (
            <div className="company-directory-heading">
              <h2>{locale === "zh" ? "探索初创企业" : "Explore Startups"}</h2>
            </div>
          ) : null}
          <section className="ecosystem-grid" aria-live="polite">
            {visibleRecords.map((record) => (
              kind === "companies" ? (
                <CompanyCard key={record.id} locale={locale} record={record} />
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
