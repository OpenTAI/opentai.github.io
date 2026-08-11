"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LibraryPaper, paperDomains, paperGroups, paperLibrary } from "@/data/papers";

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
  return VENUE_ABBR[venue] ?? (venue.length > 30 ? `${venue.slice(0, 28)}…` : venue);
}

function paperLink(paper: LibraryPaper) {
  if (paper.arxivId) return `https://arxiv.org/abs/${paper.arxivId}`;
  return paper.url ?? null;
}

const HAYSTACK = new Map(
  paperLibrary.map((paper) => [
    paper,
    [paper.title, paper.venue ?? "", paper.year ?? "", paper.section ?? "", paper.group]
      .concat(paper.authors)
      .join(" ")
      .toLowerCase(),
  ]),
);

const LINKED = paperLibrary.filter((paper) => paperLink(paper)).length;
const KINDS = [
  { id: "research", label: "Research" },
  { id: "survey", label: "Survey" },
] as const;

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

export function PaperLibrary() {
  const [domain, setDomain] = useState<string | null>(null);
  const [kind, setKind] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const normalized = query.trim().toLowerCase();

  const reset = (next: () => void) => {
    next();
    setShown(PAGE);
  };

  // Each level narrows the one below it, so counts always reflect what is
  // reachable from the current selection rather than the whole library.
  const inDomain = useMemo(
    () => (domain ? paperLibrary.filter((p) => p.domain === domain) : paperLibrary),
    [domain],
  );
  const inKind = useMemo(
    () => (kind ? inDomain.filter((p) => p.kind === kind) : inDomain),
    [inDomain, kind],
  );
  const groups = useMemo(() => {
    if (!domain) return [];
    return (paperGroups[domain] ?? []).filter((g) => inKind.some((p) => p.group === g));
  }, [domain, inKind]);
  const sections = useMemo(() => {
    if (!group) return [];
    const seen: string[] = [];
    for (const p of inKind) {
      if (p.group === group && p.section && !seen.includes(p.section)) seen.push(p.section);
    }
    return seen;
  }, [group, inKind]);

  const filtered = useMemo(() => {
    const terms = normalized ? normalized.split(/\s+/) : [];
    return inKind.filter((paper) => {
      if (group && paper.group !== group) return false;
      if (section && paper.section !== section) return false;
      if (!terms.length) return true;
      const text = HAYSTACK.get(paper)!;
      return terms.every((term) => text.includes(term));
    });
  }, [group, inKind, normalized, section]);

  return (
    <section className="subpage-main-table-card">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
          Research library
        </h2>
        <p className="text-sm text-[#667085]">
          {paperLibrary.length.toLocaleString()} papers · {LINKED.toLocaleString()} with links
        </p>
      </div>

      <p className="mb-5 text-sm leading-6 text-[#667085]">
        Merged from{" "}
        <Link
          className="text-[#4f46e5] hover:underline"
          href="https://github.com/xingjunm/Awesome-Large-Model-Safety"
          rel="noreferrer"
          target="_blank"
        >
          Awesome-Large-Model-Safety
        </Link>{" "}
        and{" "}
        <Link
          className="text-[#4f46e5] hover:underline"
          href="https://github.com/x-zheng16/Awesome-Embodied-AI-Safety"
          rel="noreferrer"
          target="_blank"
        >
          Awesome-Embodied-AI-Safety
        </Link>
        . Titles, authors and venues come from those lists. Surveys are those the embodied list
        files as surveys, plus titles that name themselves one.
      </p>

      <div className="space-y-3 border-b border-[#eceff5] pb-5">
        <div className="flex flex-wrap gap-2">
          <Chip active={domain === null} count={paperLibrary.length} onClick={() => reset(() => { setDomain(null); setGroup(null); setSection(null); })}>
            All domains
          </Chip>
          {paperDomains.map((name) => (
            <Chip
              key={name}
              active={domain === name}
              count={paperLibrary.filter((p) => p.domain === name).length}
              onClick={() => reset(() => { setDomain(name); setGroup(null); setSection(null); })}
            >
              {name}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={kind === null} count={inDomain.length} onClick={() => reset(() => { setKind(null); setGroup(null); setSection(null); })} size="sm">
            All
          </Chip>
          {KINDS.map((k) => (
            <Chip
              key={k.id}
              active={kind === k.id}
              count={inDomain.filter((p) => p.kind === k.id).length}
              onClick={() => reset(() => { setKind(k.id); setGroup(null); setSection(null); })}
              size="sm"
            >
              {k.label}
            </Chip>
          ))}
        </div>

        {groups.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {groups.map((name) => (
              <Chip
                key={name}
                active={group === name}
                count={inKind.filter((p) => p.group === name).length}
                onClick={() => reset(() => { setGroup(group === name ? null : name); setSection(null); })}
                size="sm"
              >
                {name}
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
                count={inKind.filter((p) => p.section === name).length}
                onClick={() => reset(() => setSection(section === name ? null : name))}
                size="sm"
              >
                {name}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>

      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#667085]">
          {filtered.length.toLocaleString()} {filtered.length === 1 ? "paper" : "papers"}
        </p>
        <div className="subpage-search-box">
          <span>⌕</span>
          <input
            aria-label="Search the research library"
            className="subpage-search-input"
            onChange={(event) => reset(() => setQuery(event.target.value))}
            placeholder="Search titles, authors, venues..."
            type="search"
            value={query}
          />
        </div>
      </div>

      <ol className="space-y-2.5">
        {filtered.slice(0, shown).map((paper, index) => {
          const href = paperLink(paper);
          return (
            <li
              key={`${paper.title}-${index}`}
              className="rounded-[18px] border border-[#eff2f6] px-5 py-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p className="min-w-0 flex-1 text-[0.98rem] font-medium leading-7 text-[#111827]">
                  {paper.title}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  {paper.kind === "survey" ? (
                    <span className="whitespace-nowrap rounded-full bg-[#ecfdf5] px-2.5 py-0.5 text-xs font-semibold text-[#047857]">
                      Survey
                    </span>
                  ) : null}
                  {paper.venue ? (
                    <span
                      className="whitespace-nowrap rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-xs font-semibold text-[#4338ca]"
                      title={`${paper.venue} ${paper.year ?? ""}`.trim()}
                    >
                      {shortVenue(paper.venue)} {paper.year}
                    </span>
                  ) : null}
                  {href ? (
                    <Link
                      className="subpage-resource-pill transition hover:border-[#c7d2fe] hover:text-[#4338ca]"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {paper.arxivId ? "arXiv" : "Link"}
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
              <p className="mt-1 text-xs text-[#98a2b3]">
                {paper.domain}
                {paper.section ? ` · ${paper.section}` : ` · ${paper.group}`}
              </p>
            </li>
          );
        })}
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
