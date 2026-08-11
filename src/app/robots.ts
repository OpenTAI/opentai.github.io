import type { MetadataRoute } from "next";
import { PRODUCTION_URL, SITE_URL, isProduction } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Anything that is not the production domain is a preview of an unapproved
  // rebuild — keep it out of search results.
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
