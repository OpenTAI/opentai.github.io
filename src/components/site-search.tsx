"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { paperSearchIndex } from "@/data/paper-search";
import { collectionOrder, subpageConfigs, SubpageTableRow } from "@/data/site";
import { Locale, localizeHref, t } from "@/lib/i18n";

type Hit = SubpageTableRow & { collection: string; href: string };

const INDEX: Hit[] = collectionOrder.flatMap((slug) =>
  subpageConfigs[slug].tableRows.map((row) => ({
    ...row,
    collection: subpageConfigs[slug].title,
    href: `/${slug}`,
  })),
);

function haystack(hit: Hit) {
  return [hit.name, hit.subtitle ?? "", hit.note, hit.type, hit.venue ?? "", hit.meta ?? ""]
    .concat(hit.tags ?? [])
    .join(" ")
    .toLowerCase();
}

const HAYSTACKS = new Map(INDEX.map((hit) => [hit, haystack(hit)]));

const PAPER_HAYSTACKS = new Map(
  paperSearchIndex.map((paper) => [
    paper,
    [paper.t, paper.a ?? "", paper.v ?? "", paper.y ?? "", paper.d].join(" ").toLowerCase(),
  ]),
);

export function SiteSearch({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const hits = useMemo(() => {
    if (!normalized) return [];
    const terms = normalized.split(/\s+/);

    return INDEX.filter((hit) => {
      const text = HAYSTACKS.get(hit)!;
      return terms.every((term) => text.includes(term));
    })
      .sort((a, b) => {
        const aName = a.name.toLowerCase().includes(normalized) ? 1 : 0;
        const bName = b.name.toLowerCase().includes(normalized) ? 1 : 0;
        if (aName !== bName) return bName - aName;
        return (b.stars ?? 0) - (a.stars ?? 0);
      })
      .slice(0, 8);
  }, [normalized]);

  const paperHits = useMemo(() => {
    if (!normalized) return [];
    const terms = normalized.split(/\s+/);

    return paperSearchIndex
      .filter((paper) => {
        const text = PAPER_HAYSTACKS.get(paper)!;
        return terms.every((term) => text.includes(term));
      })
      .slice(0, 5);
  }, [normalized]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-[999px] border border-[#dfe4ee] bg-white px-6 py-4 shadow-[0_10px_36px_rgba(15,23,42,0.08)] focus-within:border-[#a5b4fc]">
        <span aria-hidden="true" className="text-xl text-[#98a2b3]">
          ⌕
        </span>
        <input
          aria-label={t(locale, "Search all OpenTAI resources")}
          className="w-full bg-transparent text-[1.05rem] text-[#111827] outline-none placeholder:text-[#98a2b3]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(locale, "Search papers, benchmarks, models, datasets...")}
          type="search"
          value={query}
        />
        <span className="hidden shrink-0 whitespace-nowrap text-sm text-[#98a2b3] sm:block">
          {INDEX.length} {t(locale, "resources")} · {paperSearchIndex.length.toLocaleString()} {t(locale, "papers")}
        </span>
      </div>

      {normalized ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 max-h-[26rem] overflow-y-auto rounded-[24px] border border-[#e9edf3] bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
          {hits.length === 0 && paperHits.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[#667085]">
              {t(locale, "Nothing matches")} “{query.trim()}”.
            </p>
          ) : (
            <ul className="space-y-1">
              {hits.map((hit) => (
                <li key={`${hit.collection}-${hit.name}`}>
                  <Link
                    className="flex items-start gap-4 rounded-[16px] px-4 py-3 transition hover:bg-[#f6f8fc]"
                    href={localizeHref(locale, hit.href)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-semibold text-[#111827]">{hit.name}</span>
                        {hit.venue ? (
                          <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-xs font-semibold text-[#4338ca]">
                            {hit.venue}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-sm text-[#667085]">
                        {t(locale, hit.note)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#98a2b3]">
                        {t(locale, hit.collection)}
                      </p>
                      {hit.stars !== undefined ? (
                        <p className="text-sm text-[#475467]">★ {hit.stars.toLocaleString()}</p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {paperHits.length ? (
            <div className="mt-2 border-t border-[#f2f4f8] pt-2">
              <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
                {t(locale, "Research Library")}
              </p>
              <ul className="space-y-1">
                {paperHits.map((paper, index) => (
                  <li key={`${paper.t}-${index}`}>
                    <Link
                      className="flex items-start gap-4 rounded-[16px] px-4 py-2.5 transition hover:bg-[#f6f8fc]"
                      href={localizeHref(locale, "/papers")}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-[#111827]">
                          {paper.t}
                        </p>
                        <p className="text-xs text-[#98a2b3]">
                          {paper.a ?? ""}
                          {paper.n > 1 ? " et al." : ""}
                          {paper.v ? ` · ${paper.v} ${paper.y ?? ""}` : ""}
                        </p>
                      </div>
                      {paper.x ? (
                        <span className="shrink-0 text-xs font-medium text-[#5260ff]">
                          {t(locale, "link")}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
