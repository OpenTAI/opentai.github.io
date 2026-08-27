import type { MetadataRoute } from "next";
import { benchmarkDetails, collectionOrder } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    ...collectionOrder.map((slug) => `/${slug}`),
    "/leaderboard",
    "/arenas",
    "/companies",
    "/community",
    "/contribute",
    "/terms",
    ...Object.keys(benchmarkDetails).map((slug) => `/benchmarks/${slug}`),
  ];

  const localizedRoutes = routes.flatMap((route) => [route, `/zh${route}`]);

  return localizedRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
