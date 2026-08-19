"use client";

import { useMemo, useState } from "react";
import type { EcosystemRecord } from "@/data/ecosystem";
import {
  type EcosystemSortKey,
  filterEcosystemRecords,
  sortEcosystemRecords,
} from "@/lib/ecosystem-catalog";
import type { Locale } from "@/lib/i18n";

type CatalogKind = "models" | "frameworks" | "arenas" | "companies";

const copy = {
  en: {
    all: "All",
    entries: "verified entries",
    founded: "Founded",
    githubStars: "GitHub stars",
    links: "Official links",
    noMatches: "No verified entries match these filters.",
    publicResults: "Public results",
    search: "Search names, organizations, and categories…",
    snapshot: "Static snapshot",
    sort: "Sort by",
    sourceReview: "Source record",
    sorts: {
      default: "GitHub stars",
      "stars-desc": "GitHub stars",
      "year-desc": "Newest first",
      "name-asc": "Name A–Z",
    },
    verified: "Every description and field shown below is backed by the linked official sources.",
  },
  zh: {
    all: "全部",
    entries: "条已核验记录",
    founded: "成立于",
    githubStars: "GitHub 星标",
    links: "官方链接",
    noMatches: "没有符合当前筛选条件的已核验记录。",
    publicResults: "公开结果",
    search: "搜索名称、机构或分类……",
    snapshot: "静态快照",
    sort: "排序",
    sourceReview: "来源记录",
    sorts: {
      default: "GitHub 星标",
      "stars-desc": "GitHub 星标",
      "year-desc": "最新优先",
      "name-asc": "名称 A–Z",
    },
    verified: "下方显示的每项描述与字段均可由所列官方来源核验。",
  },
} as const;

const pageCopy: Record<CatalogKind, Record<Locale, { eyebrow: string; intro: string; title: string }>> = {
  models: {
    en: {
      eyebrow: "Safety model index",
      title: "Models",
      intro: "Open-source guard, security-specialized, and safety-aligned models for trustworthy AI systems.",
    },
    zh: {
      eyebrow: "安全模型索引",
      title: "模型",
      intro: "面向可信人工智能系统的开源护栏模型、安全专用模型与安全对齐模型。",
    },
  },
  frameworks: {
    en: {
      eyebrow: "Open-source workflows",
      title: "Frameworks",
      intro: "Open-source frameworks for red teaming, evaluating, training, and defending AI and agentic systems.",
    },
    zh: {
      eyebrow: "开源工作流",
      title: "框架",
      intro: "用于红队测试、评测、训练与防御 AI 和智能体系统的开源框架。",
    },
  },
  arenas: {
    en: {
      eyebrow: "Adversarial evaluation",
      title: "Arenas",
      intro: "Live and research arenas where AI systems are challenged through adversarial interaction and public evaluation.",
    },
    zh: {
      eyebrow: "对抗评测",
      title: "竞技场",
      intro: "通过对抗交互与公开评测挑战 AI 系统的在线竞技场和研究型竞技环境。",
    },
  },
  companies: {
    en: {
      eyebrow: "Industry landscape",
      title: "Companies",
      intro: "A source-backed view of companies building AI safety, agent security, evaluation, and red-teaming products.",
    },
    zh: {
      eyebrow: "行业版图",
      title: "企业",
      intro: "经来源核验的 AI 安全、智能体安全、评测与红队产品企业图谱。",
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

function CatalogCard({ locale, record }: { locale: Locale; record: EcosystemRecord }) {
  const strings = copy[locale];
  const displayYear = record.founded ?? record.year;

  return (
    <article className="ecosystem-card">
      <div className="ecosystem-card-head">
        <div className="ecosystem-logo" aria-hidden="true">{initials(record.name)}</div>
        <div className="min-w-0">
          <span className="ecosystem-category">{record.category}</span>
          <h2>{record.name}</h2>
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
            <span>{locale === "zh" ? "国家或地区" : "Country or region"}</span>
            <strong>{record.country}</strong>
          </div>
        ) : null}
        {record.publicResults ? (
          <div>
            <span>{locale === "zh" ? "结果" : "Results"}</span>
            <strong>{strings.publicResults}</strong>
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
    () => ["All", ...Array.from(new Set(records.map((record) => record.category)))],
    [records],
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<EcosystemSortKey>("default");
  const visibleRecords = useMemo(
    () => sortEcosystemRecords(filterEcosystemRecords(records, { category, query }), sortKey),
    [category, query, records, sortKey],
  );

  return (
    <div className={`ecosystem-catalog ecosystem-catalog-${kind}`}>
      <section className="ecosystem-hero">
        <div>
          <p className="ecosystem-eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="ecosystem-intro">{page.intro}</p>
        </div>
        <div className="ecosystem-hero-proof">
          <strong>{records.length}</strong>
          <span>{strings.entries}</span>
          <p>{strings.verified}</p>
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
              {item === "All" ? strings.all : item}
              <span>{item === "All" ? records.length : records.filter((record) => record.category === item).length}</span>
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
        <section className="ecosystem-grid" aria-live="polite">
          {visibleRecords.map((record) => <CatalogCard key={record.id} locale={locale} record={record} />)}
        </section>
      ) : (
        <p className="ecosystem-empty">{strings.noMatches}</p>
      )}
    </div>
  );
}
