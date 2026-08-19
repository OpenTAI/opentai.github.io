import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemArenas } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "Arenas",
  description: "Live and research arenas for adversarial interaction and public AI safety evaluation.",
};

export default function ArenasPage() {
  return (
    <SiteShell locale="en">
      <EcosystemCatalogPage kind="arenas" locale="en" records={ecosystemArenas} />
    </SiteShell>
  );
}
