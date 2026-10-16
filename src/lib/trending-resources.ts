import type { EcosystemRecord } from "@/data/ecosystem";
import type { SubpageTableRow } from "@/data/site";

export type TrendingResource = SubpageTableRow & {
  collection: "Models" | "Datasets" | "Benchmarks";
  href: "/models" | "/datasets" | "/benchmarks";
  noteZh?: string;
};

type TrendingSources = {
  models: readonly EcosystemRecord[];
  datasets: readonly SubpageTableRow[];
  benchmarks: readonly SubpageTableRow[];
  allowedBenchmarkSlugs: readonly string[];
  allowedDatasetSlugs: readonly string[];
};

// When one resource is listed in several collections, the benchmark entry wins,
// then the model, then the dataset.
const collectionPriority = { Benchmarks: 0, Models: 1, Datasets: 2 } as const;

const githubRepoPattern = /^https?:\/\/(?:www\.)?github\.com\/([^/#?\s]+)\/([^/#?\s]+)/i;

function normalizeRepo(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const match = githubRepoPattern.exec(value);
  const repo = match ? `${match[1]}/${match[2]}` : value;
  return /^[^/\s]+\/[^/\s]+$/.test(repo) ? repo.replace(/\.git$/i, "").toLowerCase() : undefined;
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** Shared GitHub repository first (stars come from the repo), else the name. */
export function trendingDedupeKey(entry: TrendingResource): string {
  const repo =
    normalizeRepo(entry.repo) ??
    normalizeRepo(entry.primaryUrl) ??
    entry.resources.map((resource) => normalizeRepo(resource.href)).find(Boolean);
  return repo ? `repo:${repo}` : `name:${normalizeName(entry.name)}`;
}

export function buildTrendingResources(
  sources: TrendingSources,
  limit = 6,
): TrendingResource[] {
  const allowedBenchmarks = new Set(sources.allowedBenchmarkSlugs);
  const allowedDatasets = new Set(sources.allowedDatasetSlugs);
  const isAllowed = (row: SubpageTableRow, allowed: Set<string>) =>
    typeof row.slug === "string" && row.slug.length > 0 && allowed.has(row.slug);
  const candidates: TrendingResource[] = [
    ...sources.models.map((model): TrendingResource => ({
      name: model.name,
      slug: model.id,
      type: model.category,
      note: model.description,
      noteZh: model.descriptionZh,
      venue: model.publisher,
      stars: model.stars,
      ...(model.github ? { repo: model.github } : {}),
      resources: [],
      collection: "Models",
      href: "/models",
    })),
    ...sources.datasets
      .filter((row) => isAllowed(row, allowedDatasets))
      .map((row): TrendingResource => ({
        ...row,
        collection: "Datasets",
        href: "/datasets",
      })),
    ...sources.benchmarks
      .filter((row) => isAllowed(row, allowedBenchmarks))
      .map((row): TrendingResource => ({
        ...row,
        collection: "Benchmarks",
        href: "/benchmarks",
      })),
  ].filter((entry) =>
    typeof entry.stars === "number" && Number.isFinite(entry.stars) && entry.stars >= 0,
  );

  // One card per key: collection priority, then stars, then catalog order
  // (datasets are alphabetical, so equal-star dataset pairs resolve by name).
  const winners = new Map<string, { entry: TrendingResource; order: number }>();
  candidates.forEach((entry, order) => {
    const key = trendingDedupeKey(entry);
    const current = winners.get(key);
    const better =
      !current ||
      collectionPriority[entry.collection] < collectionPriority[current.entry.collection] ||
      (collectionPriority[entry.collection] === collectionPriority[current.entry.collection] &&
        entry.stars! > current.entry.stars!);
    if (better) winners.set(key, { entry, order });
  });

  return [...winners.values()]
    .sort((a, b) => b.entry.stars! - a.entry.stars! || a.order - b.order)
    .map(({ entry }) => entry)
    .slice(0, Math.max(0, Math.min(6, Math.floor(limit))));
}
