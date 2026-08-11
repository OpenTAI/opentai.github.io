"use client";

import Link from "next/link";
import { useState } from "react";
import { leaderboards } from "@/data/site";

export function LeaderboardView() {
  const [tableId, setTableId] = useState(leaderboards.tables[0].id);
  const table = leaderboards.tables.find((item) => item.id === tableId)!;
  const [boardTitle, setBoardTitle] = useState(table.boards[0].title);
  const board = table.boards.find((item) => item.title === boardTitle) ?? table.boards[0];

  function selectTable(id: string) {
    const next = leaderboards.tables.find((item) => item.id === id)!;
    setTableId(id);
    setBoardTitle(next.boards[0].title);
  }

  const totalRows = leaderboards.tables.reduce(
    (total, item) => total + item.boards.reduce((sum, b) => sum + b.rows.length, 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          aria-label="Evaluation setting"
          className="inline-flex rounded-full border border-[#e3e8f2] bg-[#f6f8fc] p-1"
          role="group"
        >
          {leaderboards.tables.map((item) => (
            <button
              key={item.id}
              aria-pressed={item.id === tableId}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                item.id === tableId
                  ? "bg-white text-[#111827] shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
                  : "text-[#667085]"
              }`}
              onClick={() => selectTable(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-[#667085]">{totalRows} scored entries in total</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {table.boards.map((item) => (
          <button
            key={item.title}
            aria-pressed={item.title === board.title}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              item.title === board.title
                ? "border-[#c7d2fe] bg-[#eef2ff] text-[#4338ca]"
                : "border-[#e3e8f2] bg-white text-[#475467] hover:border-[#c7d2fe]"
            }`}
            onClick={() => setBoardTitle(item.title)}
            type="button"
          >
            {item.title}{" "}
            <span className="text-[#98a2b3]">{item.rows.length}</span>
          </button>
        ))}
      </div>

      <div className="subpage-main-table-card">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827]">
            {board.title}
          </h2>
          <span className="text-sm text-[#667085]">
            {table.label} · {table.columns.scoreGroup}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#edf0f5] text-xs font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
                <th className="w-16 pb-3 pr-3">{table.columns.rank}</th>
                <th className="pb-3 pr-3">{table.columns.model}</th>
                <th className="w-28 pb-3 pr-3 text-right">{table.columns.count}</th>
                <th className="w-36 pb-3 pr-3 text-right">{table.columns.scoreA}</th>
                <th className="w-36 pb-3 text-right">{table.columns.scoreB}</th>
              </tr>
            </thead>
            <tbody>
              {board.rows.map((row) => (
                <tr
                  key={`${row.rank}-${row.model}`}
                  className="border-b border-[#f4f6fa] last:border-0"
                >
                  <td className="py-3 pr-3 align-top">
                    <span
                      className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-sm font-semibold ${
                        Number(row.rank) <= 3
                          ? "bg-[#eef2ff] text-[#4338ca]"
                          : "text-[#98a2b3]"
                      }`}
                    >
                      {row.rank}
                    </span>
                  </td>
                  <td className="py-3 pr-3 align-top">
                    {row.link ? (
                      <Link
                        className="break-all text-sm font-medium text-[#111827] hover:text-[#4338ca] hover:underline"
                        href={row.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {row.model}
                      </Link>
                    ) : (
                      <span className="break-all text-sm font-medium text-[#111827]">
                        {row.model}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-3 text-right align-top text-sm text-[#667085]">
                    {row.count?.toLocaleString() ?? "—"}
                  </td>
                  <td className="py-3 pr-3 text-right align-top text-sm font-medium text-[#344054]">
                    {row.scoreA ?? "—"}
                  </td>
                  <td className="py-3 text-right align-top text-sm font-medium text-[#344054]">
                    {row.scoreB ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
