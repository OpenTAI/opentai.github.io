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
};

export function buildTrendingResources(
  sources: TrendingSources,
  limit = 6,
): TrendingResource[] {
  const allowedBenchmarks = new Set(sources.allowedBenchmarkSlugs);
  const candidates: TrendingResource[] = [
    ...sources.models.map((model): TrendingResource => ({
      name: model.name,
      slug: model.id,
      type: model.category,
      note: model.description,
      noteZh: model.descriptionZh,
      venue: model.publisher,
      stars: model.stars,
      resources: [],
      collection: "Models",
      href: "/models",
    })),
    ...sources.datasets.map((row): TrendingResource => ({
      ...row,
      collection: "Datasets",
      href: "/datasets",
    })),
    ...sources.benchmarks
      .filter((row) => typeof row.slug === "string" && row.slug.length > 0 && allowedBenchmarks.has(row.slug))
      .map((row): TrendingResource => ({
        ...row,
        collection: "Benchmarks",
        href: "/benchmarks",
      })),
  ];

  return candidates
    .filter((entry) =>
      typeof entry.stars === "number" && Number.isFinite(entry.stars) && entry.stars >= 0,
    )
    .sort((a, b) => b.stars! - a.stars!)
    .slice(0, Math.max(0, Math.min(6, Math.floor(limit))));
}
