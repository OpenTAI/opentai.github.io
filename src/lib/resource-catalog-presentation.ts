type ResourceLinkLike = { href: string };

type CatalogRowLike = {
  downloads?: number;
  name: string;
  posted?: string;
  resources: readonly ResourceLinkLike[];
  stars?: number;
  stats?: readonly { label: string; value: string }[];
  venue?: string;
  year?: string;
};

export type ResourceCatalogSummary = {
  downloads?: number;
  entries: number;
  githubRows: number;
  links: number;
  stars?: number;
  yearEnd?: number;
  yearStart?: number;
};

export function compactResourceTitle(title: string) {
  const separator = title.search(/[:：]/);
  return separator > 0 ? title.slice(0, separator).trim() : title;
}

function catalogYear(row: CatalogRowLike) {
  const recordedYear = row.stats?.find((stat) =>
    ["Published", "Table year", "Posted"].includes(stat.label),
  )?.value;
  const match = `${row.year ?? ""} ${recordedYear ?? ""} ${row.venue ?? ""} ${row.posted ?? ""}`.match(
    /\b(?:19|20)\d{2}\b/,
  );
  return match ? Number(match[0]) : undefined;
}

export function buildResourceCatalogSummary(
  rows: readonly CatalogRowLike[],
  kind: "benchmark" | "dataset",
): ResourceCatalogSummary {
  const years = rows
    .map((row) => catalogYear(row))
    .filter((year): year is number => year !== undefined);
  const metricName = kind === "dataset" ? "downloads" : "stars";
  const recordedMetrics = rows
    .map((row) => row[metricName])
    .filter((value): value is number => value !== undefined);

  return {
    entries: rows.length,
    githubRows: rows.filter((row) =>
      row.resources.some((resource) => {
        try {
          return new URL(resource.href).hostname.toLowerCase() === "github.com";
        } catch {
          return false;
        }
      }),
    ).length,
    links: rows.reduce((total, row) => total + row.resources.length, 0),
    ...(recordedMetrics.length
      ? { [metricName]: recordedMetrics.reduce((total, value) => total + value, 0) }
      : {}),
    ...(years.length
      ? { yearEnd: Math.max(...years), yearStart: Math.min(...years) }
      : {}),
  };
}

type LeaderboardTableLike = {
  boards: readonly {
    rows: readonly { link?: string; model: string }[];
  }[];
};

export function buildLeaderboardSummary(tables: readonly LeaderboardTableLike[]) {
  const boards = tables.flatMap((table) => table.boards);
  const rows = boards.flatMap((board) => board.rows);

  return {
    boards: boards.length,
    entries: rows.length,
    links: rows.filter((row) => Boolean(row.link)).length,
    models: new Set(rows.map((row) => row.model)).size,
  };
}
