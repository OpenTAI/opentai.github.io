/**
 * Where this build is deployed, and whether search engines may index it.
 *
 * Indexing is opt-in: a build is only treated as production when
 * `NEXT_PUBLIC_SITE_URL` is explicitly set to the production domain. Local
 * builds, Vercel previews, and anything else default to noindex, because
 * every one of them is a rebuild the OpenTAI team has not signed off on.
 */
export const PRODUCTION_URL = "https://opentai.org";

const configured = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : undefined;

export const SITE_URL = configured ?? vercelUrl ?? PRODUCTION_URL;

export const isProduction = configured === PRODUCTION_URL;
