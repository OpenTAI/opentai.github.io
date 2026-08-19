import type { Metadata } from "next";
import { EcosystemCatalogPage } from "@/components/ecosystem-catalog-page";
import { SiteShell } from "@/components/site-shell";
import { ecosystemFrameworks } from "@/data/ecosystem";

export const metadata: Metadata = {
  title: "Frameworks",
  description: "Open-source frameworks for red teaming, evaluating, training, and defending AI systems.",
};

export default function FrameworksPage() {
  return (
    <SiteShell locale="en">
      <EcosystemCatalogPage kind="frameworks" locale="en" records={ecosystemFrameworks} />
    </SiteShell>
  );
}
