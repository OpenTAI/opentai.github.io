export type LiveLeaderboardResult = {
  rank: number;
  name: string;
  detail?: string;
  value: string;
};

type TrustLlmOptions = {
  dataset: "fairness" | "safety";
  metric: string;
  limit?: number;
};

type ResultUpdate = {
  name: string;
  results: readonly LiveLeaderboardResult[];
};

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ");
}

function plainHtml(value: string) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function taggedText(value: string, tag: string) {
  return Array.from(
    value.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi")),
    (match) => plainHtml(match[1]),
  ).filter(Boolean);
}

function tableWithCaption(html: string, captionText: string) {
  const captionIndex = html.search(
    new RegExp(`<caption\\b[^>]*>[\\s\\S]*?${captionText}[\\s\\S]*?<\\/caption>`, "i"),
  );
  if (captionIndex < 0) return "";

  const tableStart = html.lastIndexOf("<table", captionIndex);
  const tableEnd = html.indexOf("</table>", captionIndex);
  if (tableStart < 0 || tableEnd < 0) return "";
  return html.slice(tableStart, tableEnd + "</table>".length);
}

export function harmActionsResultsFromHtml(
  html: string,
  limit = 12,
): LiveLeaderboardResult[] {
  const table = tableWithCaption(html, "HarmActionsEval model leaderboard");
  const body = table.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/i)?.[1] ?? "";
  if (!body) return [];

  const rows = Array.from(body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi))
    .map((row): LiveLeaderboardResult | undefined => {
      const rawCells = Array.from(row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi));
      const cells = rawCells.map((cell) => plainHtml(cell[1])).filter(Boolean);
      if (cells.length < 3) return undefined;
      const modelParts = rawCells[1] ? taggedText(rawCells[1][1], "span") : [];
      const rank = Number.parseInt(cells[0], 10);
      const name = modelParts[0] ?? "";
      const detail = modelParts[1];
      const value = cells.at(-1) ?? "";

      if (!Number.isFinite(rank) || !name || !/^\d+(?:\.\d+)?%$/.test(value)) return undefined;
      return detail ? { rank, name, detail, value } : { rank, name, value };
    })
    .filter((row): row is LiveLeaderboardResult => Boolean(row))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, Math.max(0, limit));

  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
}

function jsonArrayAssignment(script: string, variable: string) {
  const assignment = new RegExp(`(?:^|\\n)\\s*${variable}\\s*=`, "m").exec(script);
  if (!assignment) return undefined;

  const start = script.indexOf("[", assignment.index + assignment[0].length);
  if (start < 0) return undefined;

  let depth = 0;
  let quoted = false;
  let escaped = false;

  for (let index = start; index < script.length; index += 1) {
    const character = script[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') quoted = false;
      continue;
    }
    if (character === '"') quoted = true;
    else if (character === "[") depth += 1;
    else if (character === "]") {
      depth -= 1;
      if (depth === 0) return script.slice(start, index + 1);
    }
  }

  return undefined;
}

export function trustLlmResultsFromScript(
  script: string,
  { dataset, metric, limit = 12 }: TrustLlmOptions,
): LiveLeaderboardResult[] {
  const arrayText = jsonArrayAssignment(script, dataset);
  if (!arrayText) return [];

  try {
    const payload: unknown = JSON.parse(arrayText);
    if (!Array.isArray(payload)) return [];

    return payload
      .map((row) => {
        if (typeof row !== "object" || row === null) return undefined;
        const candidate = row as Record<string, unknown>;
        const name = typeof candidate.Model === "string" ? candidate.Model.trim() : "";
        const value = candidate[metric];
        if (!name || typeof value !== "number" || !Number.isFinite(value) || value < 0) {
          return undefined;
        }
        return { name, score: value };
      })
      .filter((row): row is { name: string; score: number } => Boolean(row))
      .sort((left, right) => right.score - left.score)
      .slice(0, Math.max(0, limit))
      .map((row, index) => ({
        rank: index + 1,
        name: row.name,
        value: String(row.score),
      }));
  } catch {
    return [];
  }
}

export function applyLeaderboardResultUpdates<
  T extends { name: string; results: readonly LiveLeaderboardResult[] },
>(records: readonly T[], updates: readonly ResultUpdate[]): T[] {
  const validUpdates = new Map(
    updates
      .filter((update) => update.results.length > 0)
      .map((update) => [update.name, update.results]),
  );

  return records.map((record) => {
    const results = validUpdates.get(record.name);
    return results ? { ...record, results } : record;
  });
}
