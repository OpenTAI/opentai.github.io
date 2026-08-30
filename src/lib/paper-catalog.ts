export type PaperCatalogRow = {
  arxivId?: string | null;
  domain?: string | null;
  kind?: string | null;
  title: string;
  url?: string | null;
  venue?: string | null;
  year?: string | number | null;
};

export type PaperAuthorRow = PaperCatalogRow & {
  authors?: readonly string[];
  group?: string | null;
  section?: string | null;
};

export function formatPaperAuthors(authors: readonly string[]) {
  if (authors.length === 0) return "";
  if (authors.length <= 5) return authors.join(", ");
  return `${authors[0]} et al.`;
}

export function formatPaperVenue(venue: string) {
  const normalized = venue.trim();
  const findings = normalized.match(
    /^Findings of the Association for Computational Linguistics:\s*(ACL|EMNLP|NAACL)$/i,
  );

  return findings ? `${findings[1].toUpperCase()} Findings` : normalized;
}

export function paperSearchText(row: PaperAuthorRow) {
  return [
    row.title,
    row.venue ?? "",
    row.year ?? "",
    row.section ?? "",
    row.group ?? "",
    row.domain ?? "",
    ...(row.authors ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

export function paperCatalogSummary(rows: readonly PaperCatalogRow[]) {
  const domains = new Set(
    rows.map((row) => row.domain?.trim()).filter((domain): domain is string => Boolean(domain)),
  );

  return {
    domains: domains.size,
    entries: rows.length,
    links: rows.filter((row) => Boolean(row.arxivId || row.url)).length,
    surveys: rows.filter((row) => row.kind === "survey").length,
  };
}

function recordedYear(row: PaperCatalogRow) {
  const value = `${row.year ?? ""}`.trim();
  return /^(?:19|20)\d{2}$/.test(value) ? Number(value) : undefined;
}

export function sortPapersNewestFirst<T extends PaperCatalogRow>(rows: readonly T[]) {
  return rows
    .map((row, index) => ({ index, row, year: recordedYear(row) }))
    .sort((left, right) => {
      if (left.year === undefined && right.year === undefined) {
        return left.row.title.localeCompare(right.row.title) || left.index - right.index;
      }
      if (left.year === undefined) return 1;
      if (right.year === undefined) return -1;
      return (
        right.year - left.year ||
        left.row.title.localeCompare(right.row.title) ||
        left.index - right.index
      );
    })
    .map(({ row }) => row);
}

export function paperYearCounts(rows: readonly PaperCatalogRow[]) {
  const counts = new Map<number, number>();

  for (const row of rows) {
    const year = recordedYear(row);
    if (year !== undefined) counts.set(year, (counts.get(year) ?? 0) + 1);
  }

  return [...counts]
    .sort(([left], [right]) => left - right)
    .map(([year, count]) => ({ count, year }));
}

export function paperDisplayMeta(row: PaperCatalogRow) {
  const normalizedVenue = row.venue?.trim() ?? "";
  const isArxivVenue = /^arxiv(?:\s+preprint)?$/i.test(normalizedVenue);

  return {
    linkLabel: row.arxivId ? "arXiv" : row.url ? "Link" : null,
    venueLabel: normalizedVenue && !isArxivVenue ? formatPaperVenue(normalizedVenue) : null,
    yearLabel: recordedYear(row)?.toString() ?? null,
  };
}
