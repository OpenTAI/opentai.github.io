import { arenaResults } from "@/data/site";
import type { Locale } from "@/lib/i18n";

function copy(locale: Locale, english: string, chinese: string) {
  return locale === "zh" ? chinese : english;
}

export function ArenaResultsChart({ locale }: { locale: Locale }) {
  const chartColors = ["#9bd3a5", "#68bd78", "#329e48", "#217936", "#17251b"];
  const width = 1120;
  const height = 470;
  const left = 62;
  const right = 26;
  const top = 54;
  const bottom = 82;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const groupWidth = chartWidth / arenaResults.benchmarks.length;
  const barWidth = 28;
  const barGap = 7;
  const clusterWidth = arenaResults.series.length * barWidth + (arenaResults.series.length - 1) * barGap;
  const y = (value: number) => top + chartHeight - (value / 100) * chartHeight;

  return (
    <section aria-labelledby="arena-results-title" className="arena-results-panel">
      <div className="arena-results-heading">
        <div>
          <span>{copy(locale, "Official result snapshot", "官方结果快照")}</span>
          <h2 id="arena-results-title">
            {copy(locale, arenaResults.title, arenaResults.titleZh)}
          </h2>
        </div>
        <time>{copy(locale, arenaResults.snapshotDate, "发布于 2026-06-09")}</time>
      </div>

      <div className="arena-chart-scroll">
        <svg
          aria-labelledby="arena-chart-title arena-chart-description"
          className="arena-bar-chart"
          role="img"
          viewBox={`0 0 ${width} ${height}`}
        >
          <title id="arena-chart-title">
            {copy(locale, arenaResults.title, arenaResults.titleZh)}
          </title>
          <desc id="arena-chart-description">
            {copy(locale, arenaResults.note, arenaResults.noteZh)}
          </desc>

          {[0, 20, 40, 60, 80, 100].map((tick) => {
            const tickY = y(tick);
            return (
              <g key={tick}>
                <line
                  className="arena-chart-gridline"
                  x1={left}
                  x2={width - right}
                  y1={tickY}
                  y2={tickY}
                />
                <text className="arena-chart-axis-label" textAnchor="end" x={left - 12} y={tickY + 4}>
                  {tick}
                </text>
              </g>
            );
          })}

          {arenaResults.benchmarks.map((benchmark, benchmarkIndex) => {
            const center = left + groupWidth * (benchmarkIndex + 0.5);
            const clusterStart = center - clusterWidth / 2;
            return (
              <g key={benchmark.name}>
                {arenaResults.series.map((series, seriesIndex) => {
                  const value = series.values[benchmarkIndex];
                  if (value === null || value === undefined) return null;
                  const barX = clusterStart + seriesIndex * (barWidth + barGap);
                  const barY = y(value);
                  const barHeight = Math.max(0, top + chartHeight - barY);
                  return (
                    <g key={`${benchmark.name}-${series.name}`}>
                      <rect
                        className="arena-chart-bar"
                        fill={chartColors[seriesIndex % chartColors.length]}
                        height={Math.max(barHeight, value === 0 ? 3 : barHeight)}
                        rx="5"
                        width={barWidth}
                        x={barX}
                        y={value === 0 ? top + chartHeight - 3 : barY}
                      >
                        <title>{`${series.name}: ${value.toFixed(1)}`}</title>
                      </rect>
                      <text
                        className="arena-chart-value"
                        textAnchor="middle"
                        x={barX + barWidth / 2}
                        y={value === 0 ? top + chartHeight - 8 : Math.max(top + 12, barY - 8)}
                      >
                        {value.toFixed(1)}
                      </text>
                    </g>
                  );
                })}
                <text className="arena-chart-category" textAnchor="middle" x={center} y={height - 45}>
                  {benchmark.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <ul className="arena-chart-legend" aria-label={copy(locale, "Models", "模型")}>
        {arenaResults.series.map((series, seriesIndex) => (
          <li key={series.name}>
            <span
              aria-hidden="true"
              style={{ backgroundColor: chartColors[seriesIndex % chartColors.length] }}
            />
            {copy(locale, series.name, series.nameZh)}
          </li>
        ))}
      </ul>

      <div className="arena-chart-metrics">
        {arenaResults.benchmarks.map((benchmark) => (
          <p key={benchmark.name}>
            <strong>{benchmark.name}</strong>
            {copy(locale, benchmark.metric, benchmark.metricZh)}
          </p>
        ))}
      </div>

      <footer className="arena-results-footer">
        <p>{copy(locale, arenaResults.note, arenaResults.noteZh)}</p>
        <a href={arenaResults.source} rel="noreferrer" target="_blank">
          {copy(locale, arenaResults.sourceLabel, arenaResults.sourceLabelZh)} ↗
        </a>
      </footer>
    </section>
  );
}
