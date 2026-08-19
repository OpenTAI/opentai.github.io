export type PaperCatalogRow = {
  arxivId?: string | null;
  title: string;
  url?: string | null;
  venue?: string | null;
  year?: string | number | null;
};

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
    venueLabel: normalizedVenue && !isArxivVenue ? normalizedVenue : null,
    yearLabel: recordedYear(row)?.toString() ?? null,
  };
}
