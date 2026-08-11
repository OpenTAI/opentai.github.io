import type { Metadata } from "next";
import { siteBrand } from "@/data/site";
import "./globals.css";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opentai.org";
const DESCRIPTION =
  "One platform that collects all the open-source resources for trustworthy AI — benchmarks, models, datasets, tools, papers, and leaderboards.";

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
