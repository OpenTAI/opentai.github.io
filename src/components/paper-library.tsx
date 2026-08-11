"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { paperChapters, paperLibrary } from "@/data/papers";

const PAGE = 30;

const HAYSTACK = new Map(
  paperLibrary.map((paper) => [
    paper,
    [paper.title, paper.venue ?? "", paper.year ?? "", paper.section ?? ""]
      .concat(paper.authors)
      .join(" ")
      .toLowerCase(),
  ]),
);

const LINKED = paperLibrary.filter((paper) => paper.arxivId).length;

const VENUE_ABBR: Record<string, string> = {
  "IEEE Transactions on Information Forensics and Security": "IEEE TIFS",
  "IEEE Transactions on Pattern Analysis and Machine Intelligence": "IEEE TPAMI",
  "IEEE Transactions on Image Processing": "IEEE TIP",
  "IEEE Transactions on Multimedia": "IEEE TMM",
  "IEEE Transactions on Neural Networks and Learning Systems": "IEEE TNNLS",
  "IEEE Transactions on Dependable and Secure Computing": "IEEE TDSC",
  "International Journal of Computer Vision": "IJCV",
  "Transactions on Machine Learning Research": "TMLR",
};

function shortVenue(venue: string) {
  const mapped = VENUE_ABBR[venue];
  if (mapped) return mapped;
  return venue.length > 30 ? `${venue.slice(0, 28)}…` : venue;
}

export function PaperLibrary() {
  const [chapter, setChapter] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const normalized = query.trim().toLowerCase();

  const sections = useMemo(() => {
    if (!chapter) return [];
    const seen: string[] = [];
    for (const paper of paperLibrary) {
      if (paper.chapter === chapter && paper.section && !seen.includes(paper.section)) {
        seen.push(paper.section);
      }
    }
    return seen;
  }, [chapter]);

  const filtered = useMemo(() => {
    const terms = normalized ? normalized.split(/\s+/) : [];
    return paperLibrary.filter((paper) => {
      if (chapter && paper.chapter !== chapter) return false;
      if (section && paper.section !== section) return false;
      if (!terms.length) return true;
      const text = HAYSTACK.get(paper)!;
      return terms.every((term) => text.includes(term));
    });
  }, [chapter, normalized, section]);

  function pickChapter(next: string | null) {
    setChapter(next);
    setSection(null);
    setShown(PAGE);
  }

  return (
    <section className="subpage-main-table-card">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
          Research library
        </h2>
        <p className="text-sm text-[#667085]">
          {paperLibrary.length} papers · {LINKED} with arXiv links
        </p>
      </div>

      <p className="mb-5 text-sm leading-6 text-[#667085]">
        Imported from{" "}
        <Link
          className="text-[#4f46e5] hover:underline"
          href="https://github.com/xingjunm/Awesome-Large-Model-Safety"
          rel="noreferrer"
          target="_blank"
        >
          Awesome-Large-Model-Safety
        </Link>
        , the survey list maintained by the OpenTAI team. Titles, authors, and venues come from
        that list; arXiv links are only shown where the identifier could be verified.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          aria-pressed={chapter === null}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            chapter === null
              ? "border-[#c7d2fe] bg-[#eef2ff] text-[#4338ca]"
              : "border-[#e3e8f2] bg-white text-[#475467] hover:border-[#c7d2fe]"
          }`}
          onClick={() => pickChapter(null)}
          type="button"
        >
          All {paperLibrary.length}
        </button>
        {paperChapters.map((name) => {
          const count = paperLibrary.filter((paper) => paper.chapter === name).length;
          return (
            <button
              key={name}
              aria-pressed={chapter === name}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                chapter === name
                  ? "border-[#c7d2fe] bg-[#eef2ff] text-[#4338ca]"
                  : "border-[#e3e8f2] bg-white text-[#475467] hover:border-[#c7d2fe]"
              }`}
              onClick={() => pickChapter(name)}
              type="button"
            >
              {name} <span className="text-[#98a2b3]">{count}</span>
            </button>
          );
        })}
      </div>

      {sections.length ? (
        <div className="mb-4 flex flex-wrap gap-2 border-t border-[#f2f4f8] pt-4">
          {sections.map((name) => (
            <button
              key={name}
              aria-pressed={section === name}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                section === name
                  ? "bg-[#111827] text-white"
                  : "bg-[#f6f8fc] text-[#667085] hover:bg-[#eef2ff] hover:text-[#4338ca]"
              }`}
              onClick={() => {
                setSection((current) => (current === name ? null : name));
                setShown(PAGE);
              }}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#eceff5] pb-4">
        <p className="text-sm text-[#667085]">
          {filtered.length} {filtered.length === 1 ? "paper" : "papers"}
        </p>
        <div className="subpage-search-box">
          <span>⌕</span>
          <input
            aria-label="Search the research library"
            className="subpage-search-input"
            onChange={(event) => {
              setQuery(event.target.value);
              setShown(PAGE);
            }}
            placeholder="Search titles, authors, venues..."
            type="search"
            value={query}
          />
        </div>
      </div>

      <ol className="space-y-2.5">
        {filtered.slice(0, shown).map((paper, index) => (
          <li
            key={`${paper.title}-${index}`}
            className="rounded-[18px] border border-[#eff2f6] px-5 py-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <p className="min-w-0 flex-1 text-[0.98rem] font-medium leading-7 text-[#111827]">
                {paper.title}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                {paper.venue ? (
                  <span
                    className="whitespace-nowrap rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-xs font-semibold text-[#4338ca]"
                    title={`${paper.venue} ${paper.year ?? ""}`.trim()}
                  >
                    {shortVenue(paper.venue)} {paper.year}
                  </span>
                ) : null}
                {paper.arxivId ? (
                  <Link
                    className="subpage-resource-pill transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
                    href={`https://arxiv.org/abs/${paper.arxivId}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    arXiv
                  </Link>
                ) : null}
              </div>
            </div>
            {paper.authors.length ? (
              <p className="mt-1 text-sm text-[#667085]">
                {paper.authors.join(", ")}
                {paper.authorCount > paper.authors.length
                  ? ` +${paper.authorCount - paper.authors.length} more`
                  : ""}
              </p>
            ) : null}
            {paper.section ? (
              <p className="mt-1 text-xs text-[#98a2b3]">{paper.section}</p>
            ) : null}
          </li>
        ))}
      </ol>

      {filtered.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-[#667085]">
          No papers match “{query.trim()}”.
        </p>
      ) : null}

      {shown < filtered.length ? (
        <button
          className="home-secondary-cta mt-6 w-full"
          onClick={() => setShown((current) => current + PAGE)}
          type="button"
        >
          Show {Math.min(PAGE, filtered.length - shown)} more
        </button>
      ) : null}
    </section>
  );
}
