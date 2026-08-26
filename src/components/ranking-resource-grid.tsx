"use client";

import { useEffect, useRef, useState } from "react";
import type { RankingDirectoryRecord } from "@/data/site";
import {
  applyLeaderboardResultUpdates,
  harmActionsResultsFromHtml,
  trustLlmResultsFromScript,
} from "@/lib/leaderboard-live-sync";
import { Locale, t } from "@/lib/i18n";

const LIVE_REFRESH_INTERVAL_MS = 60 * 60 * 1000;
const LIVE_RESULT_LIMIT = 12;

const liveResultParsers: Record<string, (sourceText: string) => RankingDirectoryRecord["results"]> = {
  HarmActionsEval: (sourceText) => harmActionsResultsFromHtml(sourceText, LIVE_RESULT_LIMIT),
  "TrustLLM — Safety": (sourceText) => trustLlmResultsFromScript(sourceText, {
    dataset: "safety",
    metric: "Jailbreak (↑)",
    limit: LIVE_RESULT_LIMIT,
  }),
  "TrustLLM — Fairness": (sourceText) => trustLlmResultsFromScript(sourceText, {
    dataset: "fairness",
    metric: "Stereotype Recognition  (↑)",
    limit: LIVE_RESULT_LIMIT,
  }),
};

function localized(locale: Locale, english: string, chinese: string | undefined) {
  return locale === "zh" && chinese ? chinese : english;
}

function syncedAt(locale: Locale, timestamp: number) {
  const formatted = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
  return locale === "zh" ? `同步于 ${formatted}` : `Synced ${formatted}`;
}

export function RankingResourceGrid({
  label,
  locale,
  records,
}: {
  label: string;
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

      try {
        const liveSources = records.filter((record) => liveResultParsers[record.name]);
        const sourceResponses = new Map<string, Promise<string>>();
        const sourceText = (source: string) => {
          const cached = sourceResponses.get(source);
          if (cached) return cached;

          const pending = fetch(source, { cache: "no-store" }).then(async (response) => {
            if (!response.ok) throw new Error(`Official source returned ${response.status}`);
            return response.text();
          });
          sourceResponses.set(source, pending);
          return pending;
        };

        const responses = await Promise.allSettled(
          liveSources.map(async (record) => {
            const results = liveResultParsers[record.name](await sourceText(record.source));
            if (results.length === 0) throw new Error(`${record.name} returned no valid rows`);
            return { name: record.name, results };
          }),
        );

        if (!active) return;
        const successful = responses.flatMap((response) =>
          response.status === "fulfilled" ? [response.value] : [],
        );
        if (successful.length === 0) return;

        const timestamp = Date.now();
        setLiveRecords((current) => applyLeaderboardResultUpdates(current, successful));
        setSyncTimes((current) => ({
          ...current,
          ...Object.fromEntries(successful.map((result) => [result.name, timestamp])),
        }));
      } finally {
        syncInFlightRef.current = false;
      }
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
    <section aria-label={t(locale, label)} className="ranking-resource-grid">
      {liveRecords.map((record) => (
        <article className="ranking-resource-card" key={record.url}>
          <div className="ranking-resource-header">
            <h2>{record.name}</h2>
            <span>{t(locale, record.type)}</span>
          </div>

          <p className="ranking-resource-focus">
            {localized(locale, record.focus, record.focusZh)}
          </p>

          <a className="ranking-resource-primary-link" href={record.url} rel="noreferrer" target="_blank">
            {t(locale, "Open official page")} ↗
          </a>

          <div className="ranking-resource-snapshot">
            <div>
              <span>{t(locale, "Metric")}</span>
              <strong>{localized(locale, record.metric, record.metricZh)}</strong>
            </div>
            <time dateTime={syncTimes[record.name] ? new Date(syncTimes[record.name]).toISOString() : undefined}>
              {syncTimes[record.name]
                ? syncedAt(locale, syncTimes[record.name])
                : t(locale, record.snapshotDate)}
            </time>
          </div>

          {record.results.length > 0 ? (
            <ol className="ranking-resource-results">
              {record.results.map((result) => (
                <li key={`${record.name}-${result.rank}-${result.name}`}>
                  <span className="ranking-resource-rank">{result.rank}</span>
                  <div>
                    <strong>{result.name}</strong>
                    {result.detail ? <small>{result.detail}</small> : null}
                  </div>
                  <b>{result.value}</b>
                </li>
              ))}
            </ol>
          ) : (
            <p className="ranking-resource-empty">
              {localized(locale, record.emptyState ?? "Not recorded yet.", record.emptyStateZh)}
            </p>
          )}

          <div className="ranking-resource-footer">
            <nav aria-label={`${record.name} ${t(locale, "Links")}`} className="ranking-resource-links">
              {(record.links.length > 0
                ? record.links
                : [
                    { label: "Open official page", labelZh: undefined, url: record.url },
                    { label: "Official source", labelZh: undefined, url: record.source },
                  ]
              ).map((link) => (
                <a href={link.url} key={`${record.name}-${link.url}`} rel="noreferrer" target="_blank">
                  {localized(locale, link.label, link.labelZh)} ↗
                </a>
              ))}
            </nav>
            <details>
              <summary>{t(locale, "Source record")}</summary>
              <p>{record.verificationNote}</p>
            </details>
          </div>
        </article>
      ))}
    </section>
  );
}
