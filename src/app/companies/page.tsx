import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemCompanies } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "Startups",
  description: "A source-backed view of companies building AI safety, agent security, evaluation, and red-teaming products.",
};

export default function StartupsPage() {
  return (
    <SiteShell locale="en">
      <EcosystemCatalogPage kind="companies" locale="en" records={ecosystemCompanies} />
    </SiteShell>
  );
}
