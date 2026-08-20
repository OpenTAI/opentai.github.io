import type { Metadata } from "next";
import { ArenaPage } from "@/components/arena-page";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Arenas",
  description:
    "OpenTAI's community arena for adversarial AI safety challenges, reproducible submissions, and verified leaderboards.",
};

export default function ArenasPage() {
  return (
    <SiteShell locale="en">
      <ArenaPage locale="en" />
    </SiteShell>
  );
}
