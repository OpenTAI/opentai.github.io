import { Locale, t } from "@/lib/i18n";

export type CollectionSummaryItem = {
  icon: string;
  label: string;
  value: string;
};

export function CollectionSummaryRow({
  items,
  locale,
}: {
  items: readonly CollectionSummaryItem[];
  locale: Locale;
}) {
  return (
    <dl className="collection-summary-row">
      {items.map((item) => (
        <div key={item.label}>
          <dt>
            <span aria-hidden="true">{item.icon}</span>
            {t(locale, item.label)}
          </dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
