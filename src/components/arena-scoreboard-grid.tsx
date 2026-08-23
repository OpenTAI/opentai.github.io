"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import type { RankingDirectoryRecord, RankingResult } from "@/data/site";
import { nextArenaScrollTop } from "@/lib/arena-auto-scroll";
import { Locale, t } from "@/lib/i18n";

function localized(locale: Locale, english: string, chinese: string | undefined) {
  return locale === "zh" && chinese ? chinese : english;
}

function numericValue(result: RankingResult) {
  const value = Number.parseFloat(result.value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function resultWidth(result: RankingResult, results: readonly RankingResult[]) {
  const values = results.map(numericValue);
  const maximum = Math.max(...values, 1);
  return Math.max(7, (numericValue(result) / maximum) * 100);
}

function direction(locale: Locale, metric: string) {
  if (metric.includes("↓")) return locale === "zh" ? "越低越好" : "Lower is better";
  if (metric.includes("↑")) return locale === "zh" ? "越高越好" : "Higher is better";
  return "";
}

function AutoScrollingResults({
  locale,
  record,
}: {
  locale: Locale;
  record: RankingDirectoryRecord;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const hoverPausedRef = useRef(false);
  const focusPausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list || record.results.length <= 5) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = reducedMotion.matches;
    };
    syncReducedMotion();
    reducedMotion.addEventListener("change", syncReducedMotion);

    const timer = window.setInterval(() => {
      if (
        hoverPausedRef.current ||
        focusPausedRef.current ||
        reducedMotionRef.current ||
        Date.now() < pauseUntilRef.current
      ) {
        return;
      }

      const firstRow = list.querySelector<HTMLElement>("li");
      if (!firstRow) return;

      const gap = Number.parseFloat(window.getComputedStyle(list).rowGap) || 0;
      const top = nextArenaScrollTop({
        clientHeight: list.clientHeight,
        rowStep: firstRow.getBoundingClientRect().height + gap,
        scrollHeight: list.scrollHeight,
        scrollTop: list.scrollTop,
      });
      list.scrollTo({ behavior: "smooth", top });
    }, 2400);

    return () => {
      reducedMotion.removeEventListener("change", syncReducedMotion);
      window.clearInterval(timer);
    };
  }, [record.results.length]);

  const pauseForManualScroll = () => {
    pauseUntilRef.current = Date.now() + 6000;
  };

  return (
    <ol
      aria-label={
        locale === "zh"
          ? `${record.name} 排名，可自动或手动滚动`
          : `${record.name} rankings, auto-scrolls and supports manual scrolling`
      }
      className="arena-scoreboard-results"
      data-auto-scroll={record.results.length > 5 ? "true" : "false"}
      onBlur={() => {
        focusPausedRef.current = false;
      }}
      onFocus={() => {
        focusPausedRef.current = true;
      }}
      onKeyDown={(event) => {
        if (
          ["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "].includes(
            event.key,
          )
        ) {
          pauseForManualScroll();
        }
      }}
      onPointerDown={pauseForManualScroll}
      onPointerEnter={() => {
        hoverPausedRef.current = true;
      }}
      onPointerLeave={() => {
        hoverPausedRef.current = false;
      }}
      onTouchStart={pauseForManualScroll}
      onWheel={pauseForManualScroll}
      ref={listRef}
      tabIndex={record.results.length > 5 ? 0 : undefined}
    >
      {record.results.map((result) => (
        <li key={`${record.name}-${result.rank}-${result.name}`}>
          <span className="arena-scoreboard-rank">{result.rank}</span>
          <div className="arena-scoreboard-result-copy">
            <strong>{result.name}</strong>
            {result.detail ? <small>{result.detail}</small> : null}
          </div>
          <div aria-hidden="true" className="arena-scoreboard-track">
            <span
              style={
                {
                  "--arena-result-width": `${resultWidth(result, record.results)}%`,
                } as CSSProperties
              }
            />
          </div>
          <b className="arena-scoreboard-value">{result.value}</b>
        </li>
      ))}
    </ol>
  );
}

export function ArenaScoreboardGrid({
  locale,
  records,
}: {
  locale: Locale;
  records: readonly RankingDirectoryRecord[];
}) {
  return (
    <section aria-labelledby="arena-directory-title" className="arena-scoreboards">
      <header className="arena-scoreboards-heading">
        <div>
          <span>{locale === "zh" ? "已核验的公开结果" : "Verified public results"}</span>
          <h2 id="arena-directory-title">
            {locale === "zh" ? "安全竞技场排名" : "Safety arena rankings"}
          </h2>
        </div>
        <p>
          {locale === "zh"
            ? `${records.length} 个竞技场 · 结果来自各项目官方页面`
            : `${records.length} arenas · results reproduced from official sources`}
        </p>
      </header>

      <div className="arena-scoreboard-grid">
        {records.map((record) => (
          <article className="arena-scoreboard-card" key={record.url}>
            <header className="arena-scoreboard-card-heading">
              <div className="arena-scoreboard-title">
                <span aria-hidden="true" className="arena-scoreboard-mark">
                  {record.name.slice(0, 1)}
                </span>
                <div>
                  <h3>{record.name}</h3>
                  <p>{localized(locale, record.focus, record.focusZh)}</p>
                </div>
              </div>
              <span className="arena-scoreboard-tag">{t(locale, record.type)}</span>
            </header>

            <div className="arena-scoreboard-metric">
              <div>
                <span>{t(locale, "Metric")}</span>
                <strong>{localized(locale, record.metric, record.metricZh)}</strong>
              </div>
              <div>
                <b>{direction(locale, record.metric)}</b>
                <time>{t(locale, record.snapshotDate)}</time>
              </div>
            </div>

            {record.results.length > 0 ? (
              <AutoScrollingResults locale={locale} record={record} />
            ) : (
              <p className="arena-scoreboard-empty">
                {localized(locale, record.emptyState ?? "Not recorded yet.", record.emptyStateZh)}
              </p>
            )}

            <footer className="arena-scoreboard-footer">
              <nav aria-label={`${record.name} ${t(locale, "Links")}`}>
                {record.links.map((link, index) => (
                  <a
                    className={index === 0 ? "arena-scoreboard-link-primary" : undefined}
                    href={link.url}
                    key={`${record.name}-${link.url}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {localized(locale, link.label, link.labelZh)} ↗
                  </a>
                ))}
              </nav>
              <details>
                <summary>{t(locale, "Source record")}</summary>
                <p>{record.verificationNote}</p>
              </details>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
