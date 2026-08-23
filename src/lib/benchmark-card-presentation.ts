import type { Locale } from "./i18n";

type BenchmarkCardPresentationInput = {
  kind: "benchmark" | "dataset";
  locale: Locale;
  note: string;
  tags: readonly string[];
};

const INTERACTION_MODE_TAGS = new Set([
  "simulation-based benchmarks",
  "real-interaction benchmarks",
]);
const NAVIGATION_TAGS = new Set(["Mobile", "Computer-use", "CLI"]);
const GENERATED_NOTE =
  /^Safety at Scale Table 14 lists this resource under (?:Simulation-based|Real-Interaction) Benchmarks\. Evaluation focus: (.+?)\.(?: .+)?$/;

export function benchmarkCardPresentation({
  kind,
  note,
  tags,
}: BenchmarkCardPresentationInput) {
  const publicTags = tags.filter((tag) => !tag.toLowerCase().startsWith("source:"));
  if (kind !== "benchmark") return { note, tags: publicTags };

  const focus = note.match(GENERATED_NOTE)?.[1];
  if (!focus) return { note, tags: publicTags };

  return {
    note: `Evaluation focus: ${focus}.`,
    tags: publicTags.filter(
      (tag) => INTERACTION_MODE_TAGS.has(tag) || NAVIGATION_TAGS.has(tag),
    ),
  };
}
