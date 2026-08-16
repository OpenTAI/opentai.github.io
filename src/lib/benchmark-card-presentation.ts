import type { Locale } from "./i18n";

type BenchmarkCardPresentationInput = {
  kind: "benchmark" | "dataset";
  locale: Locale;
  note: string;
  tags: readonly string[];
};

const SOURCE_TAG = "source: safety-at-scale";
const INTERACTION_MODE_TAGS = new Set([
  "simulation-based benchmarks",
  "real-interaction benchmarks",
]);
const GENERATED_NOTE =
  /^Safety at Scale Table 14 lists this resource under (?:Simulation-based|Real-Interaction) Benchmarks\. Evaluation focus: (.+?)\.(?: .+)?$/;

export function benchmarkCardPresentation({
  kind,
  note,
  tags,
}: BenchmarkCardPresentationInput) {
  if (kind !== "benchmark" || !tags.includes(SOURCE_TAG)) {
    return { note, tags: [...tags] };
  }

  const focus = note.match(GENERATED_NOTE)?.[1];
  if (!focus) return { note, tags: [...tags] };

  return {
    note: `Evaluation focus: ${focus}.`,
    tags: tags.filter((tag) => INTERACTION_MODE_TAGS.has(tag)),
  };
}
