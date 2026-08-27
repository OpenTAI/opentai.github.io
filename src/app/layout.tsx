import type { Metadata } from "next";
import { siteBrand } from "@/data/site";
import { SITE_URL, isProduction } from "@/lib/site-url";
import "./globals.css";

const BASE = SITE_URL;
const DESCRIPTION =
  "One platform that collects open-source resources for trustworthy AI — papers, benchmarks, models, datasets, and leaderboards.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${siteBrand.name} — ${siteBrand.tagline}`,
    template: `%s · ${siteBrand.name}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: siteBrand.name,
    title: `${siteBrand.name} — ${siteBrand.tagline}`,
    description: DESCRIPTION,
    url: BASE,
    images: [{ url: "/brand/logo.png", width: 256, height: 256, alt: siteBrand.name }],
  },
  robots: isProduction ? undefined : { index: false, follow: false },
  twitter: {
    card: "summary",
    title: `${siteBrand.name} — ${siteBrand.tagline}`,
    description: DESCRIPTION,
    images: ["/brand/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
