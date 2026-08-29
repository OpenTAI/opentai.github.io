import { textArenaOverview } from "@/data/site";
import type { Locale } from "@/lib/i18n";

function localized(locale: Locale, english: string, chinese: string) {
  return locale === "zh" ? chinese : english;
}

function rankClass(rank: number | null | undefined) {
  if (rank === 1) return "text-arena-rank-first";
  if (rank === 2) return "text-arena-rank-second";
  if (rank === 3) return "text-arena-rank-third";
  return undefined;
}

export function TextArenaOverview({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="text-arena-overview-title" className="text-arena-overview">
      <header className="text-arena-overview-heading">
        <div>
          <h2 id="text-arena-overview-title">
            {localized(locale, textArenaOverview.title, textArenaOverview.titleZh)}
          </h2>
          <p>
            {locale === "zh"
              ? "向右滑动查看每个模型的完整分类名次。"
              : "Scroll to the right to see every model’s category ranks."}
            <span aria-hidden="true"> →</span>
          </p>
        </div>
      </header>

      <div aria-label={locale === "zh" ? "名次图例" : "Rank legend"} className="text-arena-legend">
        <span><i className="text-arena-legend-first" />{locale === "zh" ? "第一名" : "First place"}</span>
        <span><i className="text-arena-legend-second" />{locale === "zh" ? "第二名" : "Second place"}</span>
        <span><i className="text-arena-legend-third" />{locale === "zh" ? "第三名" : "Third place"}</span>
      </div>

      <div className="text-arena-table-scroll" tabIndex={0}>
        <table>
          <caption className="sr-only">
            {localized(locale, textArenaOverview.note, textArenaOverview.noteZh)}
          </caption>
          <thead>
            <tr>
              <th scope="col">{locale === "zh" ? "模型" : "Model"}</th>
              {textArenaOverview.columns.map((column) => (
                <th key={column.key} scope="col">
                  {localized(locale, column.label, column.labelZh)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {textArenaOverview.rows.map((row) => (
              <tr key={row.model}>
                <th scope="row">
                  <span aria-hidden="true">{row.model.slice(0, 1).toUpperCase()}</span>
                  <strong>{row.model}</strong>
                </th>
                {row.ranks.map((rank, index) => (
                  <td className={rankClass(rank)} key={`${row.model}-${textArenaOverview.columns[index].key}`}>
                    {rank ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>{localized(locale, textArenaOverview.note, textArenaOverview.noteZh)}</footer>
    </section>
  );
}
