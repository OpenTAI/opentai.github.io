import { codeArenaOverview } from "@/data/site";
import type { Locale } from "@/lib/i18n";

const BAR_WIDTH = 54;
const BAR_GAP = 22;
const BAR_LEFT = 58;
const BAR_TOP = 42;
const BAR_BOTTOM = 390;
const BAR_MIN = 1_000;
const BAR_MAX = 1_720;
const BAR_TICKS = [1_100, 1_300, 1_500, 1_700];

const SCATTER_LEFT = 68;
const SCATTER_RIGHT = 466;
const SCATTER_TOP = 42;
const SCATTER_BOTTOM = 390;
const SCATTER_PRICE_MIN = 1;
const SCATTER_PRICE_MAX = 25;
const SCATTER_SCORE_MIN = 1_540;
const SCATTER_SCORE_MAX = 1_720;
const SCATTER_PRICE_TICKS = [1, 2, 5, 10, 20];
const SCATTER_SCORE_TICKS = [1_550, 1_600, 1_650, 1_700];

const POINT_COLORS = [
  "#285c3d",
  "#4f8f69",
  "#9aae7a",
  "#397e55",
  "#b59a6c",
  "#d2c27f",
  "#658d7e",
  "#8aa8aa",
  "#72a56e",
  "#8b765c",
];

const LABEL_OFFSETS: Record<string, { dx: number; dy: number; anchor?: "start" | "end" }> = {
  "claude-opus-5-max": { dx: -9, dy: -15, anchor: "end" },
  "kimi-k3-max": { dx: -9, dy: 20, anchor: "end" },
  "qwen3.8-max": { dx: 10, dy: -12 },
  "claude-fable-5": { dx: -10, dy: -12, anchor: "end" },
  "gpt-5.6-sol-xhigh (codex-harness)": { dx: 9, dy: 18 },
  "gemini-3.7-flash-high": { dx: 9, dy: 18 },
  "deepseek-v4-pro-high-20260813": { dx: 9, dy: -12 },
};

function localized(locale: Locale, english: string, chinese: string) {
  return locale === "zh" ? chinese : english;
}

function barY(score: number) {
  return BAR_BOTTOM - ((score - BAR_MIN) / (BAR_MAX - BAR_MIN)) * (BAR_BOTTOM - BAR_TOP);
}

function blendedPrice(inputPrice: number, outputPrice: number) {
  return (3 * inputPrice + outputPrice) / 4;
}

function scatterX(price: number) {
  const range = Math.log10(SCATTER_PRICE_MAX) - Math.log10(SCATTER_PRICE_MIN);
  return SCATTER_LEFT +
    ((Math.log10(price) - Math.log10(SCATTER_PRICE_MIN)) / range) *
      (SCATTER_RIGHT - SCATTER_LEFT);
}

function scatterY(score: number) {
  return SCATTER_BOTTOM -
    ((score - SCATTER_SCORE_MIN) / (SCATTER_SCORE_MAX - SCATTER_SCORE_MIN)) *
      (SCATTER_BOTTOM - SCATTER_TOP);
}

function compactModelName(name: string) {
  return name
    .replace(" (codex-harness)", "")
    .replace("claude-", "Claude ")
    .replace("kimi-", "Kimi ")
    .replace("qwen", "Qwen ")
    .replace("gpt-", "GPT ")
    .replace("glm-", "GLM ")
    .replace("gemini-", "Gemini ")
    .replace("deepseek-", "DeepSeek ")
    .replace("grok-", "Grok ")
    .replaceAll("-", " ");
}

export function CodeArenaOverview({ locale }: { locale: Locale }) {
  const isChinese = locale === "zh";

  return (
    <section aria-labelledby="code-arena-overview-title" className="code-arena-overview">
      <header className="code-arena-overview-heading">
        <div>
          <span>{localized(locale, "Price-aware comparison", "价格与表现对比")}</span>
          <h2 id="code-arena-overview-title">
            {localized(locale, codeArenaOverview.title, codeArenaOverview.titleZh)}
          </h2>
          <p>
            {localized(locale, codeArenaOverview.description, codeArenaOverview.descriptionZh)}
          </p>
        </div>
        <div className="code-arena-overview-source">
          <b>{localized(locale, codeArenaOverview.category, codeArenaOverview.categoryZh)}</b>
          <time>{codeArenaOverview.snapshotDate}</time>
          <a href={codeArenaOverview.source} rel="noreferrer" target="_blank">
            {localized(
              locale,
              codeArenaOverview.sourceLabel,
              codeArenaOverview.sourceLabelZh,
            )} ↗
          </a>
        </div>
      </header>

      <div className="code-arena-chart-grid">
        <article className="code-arena-chart-card">
          <div className="code-arena-chart-title">
            <div>
              <span aria-hidden="true">▥</span>
              <h3>{localized(locale, "Code ranking", "代码排行")}</h3>
            </div>
            <small>{localized(locale, "Arena score ↑", "Arena 评分 ↑")}</small>
          </div>
          <div className="code-arena-chart-scroll" tabIndex={0}>
            <svg
              aria-label={localized(locale, "Code Arena top-ten score bar chart", "Code Arena 前十评分柱状图")}
              className="code-arena-bars"
              role="img"
              viewBox="0 0 850 520"
            >
              {BAR_TICKS.map((tick) => {
                const y = barY(tick);
                return (
                  <g key={tick}>
                    <line className="code-arena-gridline" x1={BAR_LEFT} x2="830" y1={y} y2={y} />
                    <text className="code-arena-axis-label" textAnchor="end" x={BAR_LEFT - 10} y={y + 4}>
                      {tick}
                    </text>
                  </g>
                );
              })}
              {codeArenaOverview.models.map((model, index) => {
                const x = BAR_LEFT + 18 + index * (BAR_WIDTH + BAR_GAP);
                const y = barY(model.score);
                const label = compactModelName(model.name);
                return (
                  <g key={model.name}>
                    <title>{`${model.rank}. ${model.name} · ${model.lab} · ${model.score}`}</title>
                    <rect
                      className="code-arena-bar"
                      fill={POINT_COLORS[index]}
                      height={BAR_BOTTOM - y}
                      rx="8"
                      width={BAR_WIDTH}
                      x={x}
                      y={y}
                    />
                    <text className="code-arena-bar-value" textAnchor="middle" x={x + BAR_WIDTH / 2} y={y - 10}>
                      {model.score}
                    </text>
                    <text
                      className="code-arena-model-label"
                      textAnchor="end"
                      transform={`rotate(-38 ${x + BAR_WIDTH / 2} ${BAR_BOTTOM + 24})`}
                      x={x + BAR_WIDTH / 2}
                      y={BAR_BOTTOM + 24}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
              <text className="code-arena-baseline-note" x={BAR_LEFT} y="500">
                {isChinese ? "纵轴从 1,000 起" : "Y-axis starts at 1,000"}
              </text>
            </svg>
          </div>
        </article>

        <article className="code-arena-chart-card code-arena-scatter-card">
          <div className="code-arena-chart-title">
            <div>
              <span aria-hidden="true">⌁</span>
              <h3>{localized(locale, "Preference vs price", "表现与价格")}</h3>
            </div>
            <small>{localized(locale, "Better ↑ · cheaper ←", "更优 ↑ · 更便宜 ←")}</small>
          </div>
          <div className="code-arena-chart-scroll" tabIndex={0}>
            <svg
              aria-label={localized(locale, "Code Arena score versus blended price scatter plot", "Code Arena 评分与综合价格散点图")}
              className="code-arena-scatter"
              role="img"
              viewBox="0 0 520 520"
            >
              <rect className="code-arena-efficient-zone" height="112" width="190" x={SCATTER_LEFT} y={SCATTER_TOP} />
              {SCATTER_SCORE_TICKS.map((tick) => {
                const y = scatterY(tick);
                return (
                  <g key={tick}>
                    <line className="code-arena-gridline" x1={SCATTER_LEFT} x2={SCATTER_RIGHT} y1={y} y2={y} />
                    <text className="code-arena-axis-label" textAnchor="end" x={SCATTER_LEFT - 10} y={y + 4}>
                      {tick}
                    </text>
                  </g>
                );
              })}
              {SCATTER_PRICE_TICKS.map((tick) => {
                const x = scatterX(tick);
                return (
                  <g key={tick}>
                    <line className="code-arena-gridline" x1={x} x2={x} y1={SCATTER_TOP} y2={SCATTER_BOTTOM} />
                    <text className="code-arena-axis-label" textAnchor="middle" x={x} y={SCATTER_BOTTOM + 22}>
                      ${tick}
                    </text>
                  </g>
                );
              })}
              <line className="code-arena-axis" x1={SCATTER_LEFT} x2={SCATTER_LEFT} y1={SCATTER_TOP} y2={SCATTER_BOTTOM} />
              <line className="code-arena-axis" x1={SCATTER_LEFT} x2={SCATTER_RIGHT} y1={SCATTER_BOTTOM} y2={SCATTER_BOTTOM} />
              {codeArenaOverview.models.map((model, index) => {
                const price = blendedPrice(model.inputPrice, model.outputPrice);
                const x = scatterX(price);
                const y = scatterY(model.score);
                const offset = LABEL_OFFSETS[model.name];
                return (
                  <g key={model.name}>
                    <title>{`${model.name} · ${model.score} · $${price.toFixed(2)}/M blended`}</title>
                    <circle
                      className="code-arena-point-ring"
                      cx={x}
                      cy={y}
                      r={index < 3 ? 12 : 9}
                    />
                    <circle cx={x} cy={y} fill={POINT_COLORS[index]} r={index < 3 ? 8 : 6} />
                    {offset ? (
                      <text
                        className="code-arena-point-label"
                        textAnchor={offset.anchor ?? "start"}
                        x={x + offset.dx}
                        y={y + offset.dy}
                      >
                        {compactModelName(model.name)}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              <text className="code-arena-axis-title" textAnchor="middle" x={(SCATTER_LEFT + SCATTER_RIGHT) / 2} y="463">
                {isChinese ? "每百万 tokens 综合价格（美元，对数轴）" : "Blended price per 1M tokens (USD, log scale)"}
              </text>
              <text
                className="code-arena-axis-title"
                textAnchor="middle"
                transform="rotate(-90 18 216)"
                x="18"
                y="216"
              >
                {isChinese ? "Arena 评分" : "Arena score"}
              </text>
            </svg>
          </div>
        </article>
      </div>

      <footer className="code-arena-overview-footer">
        <p>{localized(locale, codeArenaOverview.priceNote, codeArenaOverview.priceNoteZh)}</p>
        <p>{localized(locale, codeArenaOverview.note, codeArenaOverview.noteZh)}</p>
      </footer>
    </section>
  );
}
