import type { RankingDirectoryRecord } from "@/data/site";
import type { Locale } from "@/lib/i18n";

const COLORS = ["#4b7cff", "#ff8a4c", "#ff5b67", "#38bdf8"];

function copy(locale: Locale, english: string, chinese: string) {
  return locale === "zh" ? chinese : english;
}

function scoreOnHundred(value: string) {
  const numeric = Number.parseFloat(value.replaceAll(",", ""));
  if (!Number.isFinite(numeric)) return null;
  if (value.includes("%")) return numeric;
  return numeric >= 0 && numeric <= 1 ? numeric * 100 : null;
}

function ScoreProfileChart({
  locale,
  records,
}: {
  locale: Locale;
  records: readonly RankingDirectoryRecord[];
}) {
  const series = records
    .map((record) => ({
      label: record.name,
      values: record.results.slice(0, 3).map((result) => scoreOnHundred(result.value)),
    }))
    .filter((record) => record.values.length === 3 && record.values.every((value) => value !== null));
  const width = 680;
  const height = 245;
  const left = 48;
  const right = 24;
  const top = 20;
  const bottom = 42;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const x = (index: number) => left + (index / 2) * chartWidth;
  const y = (value: number) => top + chartHeight - (value / 100) * chartHeight;

  return (
    <article className="leaderboard-chart-card leaderboard-score-profile">
      <div className="leaderboard-chart-heading">
        <h3>{copy(locale, "Top-three score profiles", "前三名成绩曲线")}</h3>
        <span>{copy(locale, "Rank 1 → 3", "名次 1 → 3")}</span>
      </div>
      <div className="leaderboard-chart-scroll">
        <svg
          aria-labelledby="leaderboard-profile-title leaderboard-profile-description"
          className="leaderboard-profile-chart"
          role="img"
          viewBox={`0 0 ${width} ${height}`}
        >
          <title id="leaderboard-profile-title">
            {copy(locale, "Top-three score profiles", "前三名成绩曲线")}
          </title>
          <desc id="leaderboard-profile-description">
            {copy(
              locale,
              "Each line shows the first three results from one leaderboard on a 0 to 100 display scale. Metrics remain independent and are not comparable across lines.",
              "每条线展示一个榜单的前三名，并统一显示在 0 到 100 的刻度上；不同榜单指标彼此独立，不可横向比较。",
            )}
          </desc>
          {[0, 25, 50, 75, 100].map((tick) => {
            const tickY = y(tick);
            return (
              <g key={tick}>
                <line stroke="#e8ecf3" x1={left} x2={width - right} y1={tickY} y2={tickY} />
                <text fill="#98a2b3" fontSize="10" textAnchor="end" x={left - 9} y={tickY + 3}>
                  {tick}
                </text>
              </g>
            );
          })}
          {[0, 1, 2].map((index) => (
            <text fill="#667085" fontSize="10" key={index} textAnchor="middle" x={x(index)} y={height - 13}>
              #{index + 1}
            </text>
          ))}
          {series.map((item, seriesIndex) => {
            const values = item.values as number[];
            const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
            const color = COLORS[seriesIndex % COLORS.length];
            return (
              <g key={item.label}>
                <polyline
                  fill="none"
                  points={points}
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                {values.map((value, index) => (
                  <circle cx={x(index)} cy={y(value)} fill="#fff" key={index} r="4" stroke={color} strokeWidth="3" />
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="leaderboard-chart-legend">
        {series.map((item, index) => (
          <li key={item.label}>
            <span aria-hidden="true" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            {item.label}
          </li>
        ))}
      </ul>
    </article>
  );
}

function TypeDonut({
  locale,
  records,
}: {
  locale: Locale;
  records: readonly RankingDirectoryRecord[];
}) {
  const counts = Array.from(
    records.reduce((map, record) => map.set(record.type, (map.get(record.type) ?? 0) + 1), new Map<string, number>()),
  ).map(([label, count]) => ({ label, count }));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  return (
    <article className="leaderboard-chart-card leaderboard-type-chart">
      <div className="leaderboard-chart-heading">
        <h3>{copy(locale, "Leaderboards by type", "榜单类型分布")}</h3>
      </div>
      <div className="leaderboard-donut-layout">
        <svg aria-label={copy(locale, "Leaderboards by type", "榜单类型分布")} className="leaderboard-donut" role="img" viewBox="0 0 128 128">
          <circle className="leaderboard-donut-track" cx="64" cy="64" r={radius} />
          {counts.map((item, index) => {
            const length = records.length ? (item.count / records.length) * circumference : 0;
            const offset = -counts
              .slice(0, index)
              .reduce((total, previous) => total + (previous.count / records.length) * circumference, 0);
            return (
              <circle
                aria-hidden="true"
                className="leaderboard-donut-segment"
                cx="64"
                cy="64"
                key={item.label}
                r={radius}
                stroke={COLORS[index % COLORS.length]}
                strokeDasharray={`${length} ${circumference}`}
                strokeDashoffset={offset}
              />
            );
          })}
          <text className="leaderboard-donut-value" textAnchor="middle" x="64" y="61">
            {records.length}
          </text>
          <text className="leaderboard-donut-label" textAnchor="middle" x="64" y="77">
            {copy(locale, "boards", "榜单")}
          </text>
        </svg>
        <ul className="leaderboard-type-legend">
          {counts.map((item, index) => (
            <li key={item.label}>
              <span aria-hidden="true" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <strong>{copy(locale, item.label, item.label === "Agent Safety" ? "智能体安全" : item.label === "LLM Safety" ? "大模型安全" : "公平性")}</strong>
              <b>{item.count}</b>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function LeaderboardStatistics({
  locale,
  records,
}: {
  locale: Locale;
  records: readonly RankingDirectoryRecord[];
}) {
  return (
    <section aria-labelledby="leaderboard-statistics-title" className="leaderboard-statistics">
      <div className="leaderboard-statistics-heading">
        <div>
          <span>{copy(locale, "Source-checked snapshots", "已核验来源快照")}</span>
          <h2 id="leaderboard-statistics-title">{copy(locale, "Leaderboard statistics", "榜单统计")}</h2>
        </div>
        <p>
          {copy(
            locale,
            "Scores stay within their original metric; the chart does not create a cross-leaderboard ranking.",
            "各成绩保留原始指标含义；曲线图不生成跨榜单综合排名。",
          )}
        </p>
      </div>
      <div className="leaderboard-statistics-grid">
        <ScoreProfileChart locale={locale} records={records} />
        <TypeDonut locale={locale} records={records} />
      </div>
    </section>
  );
}
