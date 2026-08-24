export type LiveRankingResult = {
  rank: number;
  name: string;
  detail?: string;
  value: string;
};

type CyberGymRow = {
  agent?: unknown;
  model?: unknown;
  score_10?: unknown;
  include_in_plot?: unknown;
};

type ExploitGymRow = {
  model?: unknown;
  agent?: unknown;
  eval_note?: unknown;
  on_target?: unknown;
};

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function number(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function cleanMathEscapes(value: string) {
  return value.replaceAll("\\(", "(").replaceAll("\\)", ")");
}

function cyberGymModel(value: string) {
  const clean = cleanMathEscapes(value);
  const multiModel = clean.match(/^Multi-model \((.+)\)$/i);
  return multiModel ? multiModel[1].replaceAll(", ", " · ") : clean;
}

function exploitGymModel(value: string) {
  return value
    .replace(
      / \(Results obtained in collaboration with Anthropic\.\)$/,
      "",
    )
    .replace(
      / \(OpenAI's default safety filters block all GPT-5\.5 exploit attempts under default prompting\.\)$/,
      "",
    )
    .replace(" (helpful-only versoin)", " (helpful-only)");
}

function exploitGymAgent(value: string) {
  return value.replace(" (off-the-shelf agent harness)", "");
}

export function cyberGymResultsFromPayload(
  payload: unknown,
  limit = 12,
): LiveRankingResult[] {
  if (!record(payload) || !Array.isArray(payload.level1)) return [];

  const rows = payload.level1
    .filter(record)
    .map((row: CyberGymRow) => ({
      agent: cleanMathEscapes(text(row.agent)),
      model: cyberGymModel(text(row.model)),
      score: number(row.score_10),
      visible: row.include_in_plot !== false,
    }))
    .filter(
      (row): row is { agent: string; model: string; score: number; visible: true } =>
        Boolean(row.agent && row.model && row.score !== undefined && row.visible),
    )
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.max(0, limit));

  return rows.map((row, index) => ({
    rank: index + 1,
    name: row.agent,
    detail: row.model,
    value: `${(row.score * 100).toFixed(2)}%`,
  }));
}

export function exploitGymResultsFromPayload(
  payload: unknown,
  limit = 12,
): LiveRankingResult[] {
  if (!record(payload) || !Array.isArray(payload.results)) return [];

  const rows = payload.results
    .filter(record)
    .map((row: ExploitGymRow) => ({
      model: exploitGymModel(text(row.model)),
      agent: exploitGymAgent(text(row.agent)),
      note: text(row.eval_note),
      score: number(row.on_target),
    }))
    .filter(
      (row): row is { model: string; agent: string; note: string; score: number } =>
        Boolean(row.model && row.agent && row.score !== undefined),
    )
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.max(0, limit));

  return rows.map((row, index) => ({
    rank: index + 1,
    name: row.model,
    detail: [row.agent, row.note].filter(Boolean).join(" · "),
    value: String(row.score),
  }));
}
