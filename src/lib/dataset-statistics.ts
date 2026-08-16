export type DatasetStatisticsRow = {
  domain?: string | null;
  domains?: readonly string[] | null;
  type?: string | null;
  usageCount?: number | null;
  year?: number | string | null;
};

export type DatasetCount = {
  count: number;
  label: string;
};

export type DatasetYearCount = {
  count: number;
  year: number;
};

export type DatasetStatistics = {
  domains: DatasetCount[];
  total: number;
  usageBuckets: DatasetCount[];
  usageTotal: number;
  years: DatasetYearCount[];
};

const DOMAIN_ORDER = ["LLMs", "Agents", "Embodied AI"] as const;
const USAGE_BUCKETS = ["1", "2–5", "6–20", "20+"] as const;

function recordedYear(row: DatasetStatisticsRow) {
  const value = `${row.year ?? ""}`.trim();
  return /^(?:19|20)\d{2}$/.test(value) ? Number(value) : undefined;
}

function recordedDomains(row: DatasetStatisticsRow) {
  const values = row.domains?.length
    ? row.domains
    : row.domain
      ? [row.domain]
      : row.type
        ? [row.type]
        : [];

  return new Set(values.map((value) => value.trim()).filter(Boolean));
}

export function rowMatchesDomainFilters(
  row: DatasetStatisticsRow,
  filters: readonly string[],
) {
  if (filters.length === 0) return true;
  const domains = recordedDomains(row);
  return filters.some((filter) => domains.has(filter));
}

export function buildYearSeries(
  rows: readonly DatasetStatisticsRow[],
): DatasetYearCount[] {
  const counts = new Map<number, number>();

  for (const row of rows) {
    const year = recordedYear(row);
    if (year !== undefined) counts.set(year, (counts.get(year) ?? 0) + 1);
  }

  if (counts.size === 0) return [];

  const years = [...counts.keys()];
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);

  return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => {
    const year = firstYear + index;
    return { year, count: counts.get(year) ?? 0 };
  });
}

export function countDatasetDomains(
  rows: readonly DatasetStatisticsRow[],
): DatasetCount[] {
  const counts = new Map<string, number>();

  for (const row of rows) {
    for (const domain of recordedDomains(row)) {
      counts.set(domain, (counts.get(domain) ?? 0) + 1);
    }
  }

  const rank = new Map<string, number>(
    DOMAIN_ORDER.map((domain, index) => [domain, index]),
  );
  return [...counts]
    .sort(([left], [right]) => {
      const leftRank = rank.get(left) ?? DOMAIN_ORDER.length;
      const rightRank = rank.get(right) ?? DOMAIN_ORDER.length;
      return leftRank - rightRank || left.localeCompare(right);
    })
    .map(([label, count]) => ({ label, count }));
}

export function countUsageBuckets(
  rows: readonly DatasetStatisticsRow[],
): DatasetCount[] {
  const counts = new Map<string, number>(USAGE_BUCKETS.map((label) => [label, 0]));

  for (const row of rows) {
    const usage = row.usageCount;
    if (usage === null || usage === undefined || !Number.isInteger(usage) || usage < 1) {
      continue;
    }

    const label = usage === 1 ? "1" : usage <= 5 ? "2–5" : usage <= 20 ? "6–20" : "20+";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return USAGE_BUCKETS.map((label) => ({ label, count: counts.get(label) ?? 0 }));
}

export function buildDatasetStatistics(
  rows: readonly DatasetStatisticsRow[],
): DatasetStatistics {
  const usageBuckets = countUsageBuckets(rows);

  return {
    total: rows.length,
    years: buildYearSeries(rows),
    domains: countDatasetDomains(rows),
    usageBuckets,
    usageTotal: usageBuckets.reduce((total, bucket) => total + bucket.count, 0),
  };
}
