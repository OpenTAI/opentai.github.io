import { Locale, t } from "@/lib/i18n";

export function DraftNotice({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <div className="rounded-[18px] border border-[#fde68a] bg-[#fffbeb] px-5 py-4">
      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#b45309]">
        <span className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs uppercase tracking-[0.06em]">
          {t(locale, "Draft")}
        </span>
        {t(locale, "Pending confirmation by the OpenTAI team")}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#92400e]">
        {typeof children === "string" ? t(locale, children) : children}
      </p>
    </div>
  );
}
