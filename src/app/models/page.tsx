import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemModels } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "Models",
  description: "Open-source guard, security-specialized, and safety-aligned models for trustworthy AI systems.",
};

export default function ModelsPage() {
  return (
    <SiteShell locale="en">
      <EcosystemCatalogPage kind="models" locale="en" records={ecosystemModels} />
    </SiteShell>
  );
}
