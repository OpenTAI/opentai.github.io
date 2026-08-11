import {
  DiscoverCollections,
  DiscoverHero,
  DiscoverLatest,
  DiscoverNews,
  DiscoverSubscribe,
  DiscoverTrending,
} from "@/components/discover";
import { SiteShell } from "@/components/site-shell";

export default function Discover() {
  return (
    <SiteShell>
      <div className="space-y-8 pb-8">
        <DiscoverHero />
        <DiscoverSubscribe />
        <DiscoverTrending />
        <DiscoverLatest />
        <DiscoverNews />
        <DiscoverCollections />
      </div>
    </SiteShell>
  );
}
