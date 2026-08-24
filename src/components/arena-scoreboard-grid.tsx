"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { RankingDirectoryRecord, RankingResult } from "@/data/site";
import { nextArenaScrollTop } from "@/lib/arena-auto-scroll";
import {
  cyberGymResultsFromPayload,
  exploitGymResultsFromPayload,
} from "@/lib/arena-live-sync";
import { Locale, t } from "@/lib/i18n";

const LIVE_REFRESH_INTERVAL_MS = 60 * 60 * 1000;
const LIVE_RESULT_LIMIT = 12;

const liveResultParsers: Record<
  string,
  (payload: unknown, limit?: number) => RankingResult[]
> = {
  CyberGym: cyberGymResultsFromPayload,
  ExploitGym: exploitGymResultsFromPayload,
};

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

function syncedAt(locale: Locale, timestamp: number) {
  const formatted = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
  return locale === "zh" ? `同步于 ${formatted}` : `Synced ${formatted}`;
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
  const [liveRecords, setLiveRecords] = useState<readonly RankingDirectoryRecord[]>(records);
  const [syncTimes, setSyncTimes] = useState<Record<string, number>>({});
  const lastSyncAttemptRef = useRef(0);
  const syncInFlightRef = useRef(false);

  useEffect(() => {
    let active = true;

    const syncOfficialResults = async () => {
      if (syncInFlightRef.current) return;
      syncInFlightRef.current = true;
      lastSyncAttemptRef.current = Date.now();

      const liveSources = records.filter((record) => liveResultParsers[record.name]);
      const responses = await Promise.allSettled(
        liveSources.map(async (record) => {
          const response = await fetch(record.source, { cache: "no-store" });
          if (!response.ok) throw new Error(`${record.name} returned ${response.status}`);

          const payload: unknown = await response.json();
          const results = liveResultParsers[record.name](payload, LIVE_RESULT_LIMIT);
          if (results.length === 0) throw new Error(`${record.name} returned no valid rows`);

          return { name: record.name, results };
        }),
      );

      if (active) {
        const successful = responses.flatMap((response) =>
          response.status === "fulfilled" ? [response.value] : [],
        );

        if (successful.length > 0) {
          const updates = new Map(successful.map((result) => [result.name, result.results]));
          const timestamp = Date.now();

          setLiveRecords((current) =>
            current.map((record) => {
              const results = updates.get(record.name);
              return results ? { ...record, results } : record;
            }),
          );
          setSyncTimes((current) => ({
            ...current,
            ...Object.fromEntries(successful.map((result) => [result.name, timestamp])),
          }));
        }
      }

      syncInFlightRef.current = false;
    };

    void syncOfficialResults();
    const timer = window.setInterval(() => {
      void syncOfficialResults();
    }, LIVE_REFRESH_INTERVAL_MS);
    const refreshWhenVisible = () => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastSyncAttemptRef.current >= LIVE_REFRESH_INTERVAL_MS
      ) {
        void syncOfficialResults();
      }
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.clearInterval(timer);
    };
  }, [records]);

  return (
    <section aria-labelledby="arena-directory-title" className="arena-scoreboards">
      <header className="arena-scoreboards-heading">
        <div>
          <h2 id="arena-directory-title">
            {locale === "zh" ? "安全竞技场" : "Safety arenas"}
          </h2>
        </div>
        <p>
          {locale === "zh"
            ? `${liveRecords.length} 个竞技场 · 结果来自各项目官方页面`
            : `${liveRecords.length} arenas · results reproduced from official sources`}
        </p>
      </header>

      <div className="arena-scoreboard-grid">
        {liveRecords.map((record) => (
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
                <time dateTime={syncTimes[record.name] ? new Date(syncTimes[record.name]).toISOString() : undefined}>
                  {syncTimes[record.name]
                    ? syncedAt(locale, syncTimes[record.name])
                    : t(locale, record.snapshotDate)}
                </time>
              </div>
            </div>

            <div aria-hidden="true" className="arena-scoreboard-table-head">
              <span>#</span>
              <span>{locale === "zh" ? "模型 / 团队" : "Model / team"}</span>
              <span>{locale === "zh" ? "分数" : "Score"}</span>
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
