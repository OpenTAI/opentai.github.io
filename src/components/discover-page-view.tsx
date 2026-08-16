import {
  DiscoverCollections,
  DiscoverHero,
  DiscoverLatest,
  DiscoverSubscribe,
  DiscoverTrending,
} from "@/components/discover";
import { SiteShell } from "@/components/site-shell";
import { Locale } from "@/lib/i18n";

export function DiscoverPageView({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale}>
      <div className="space-y-8 pb-8">
        <DiscoverHero locale={locale} />
        <DiscoverSubscribe locale={locale} />
        <DiscoverTrending locale={locale} />
        <DiscoverLatest locale={locale} />
        <DiscoverCollections locale={locale} />
      </div>
    </SiteShell>
  );
}
