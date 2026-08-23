import type { Metadata } from "next";
import { ArenaPage } from "@/components/arena-page";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Arenas",
  description: "A source-checked directory of public AI safety and cybersecurity arenas.",
};

export default function ArenasPage() {
  return (
    <SiteShell locale="en">
      <ArenaPage locale="en" />
    </SiteShell>
  );
}
