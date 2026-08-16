export type ResourceSortKey =
  | "default"
  | "downloads-desc"
  | "downloads-asc"
  | "stars-desc"
  | "stars-asc"
  | "year-desc"
  | "year-asc";

export type ResourceSortableRow = {
  downloads?: number;
  name: string;
  posted?: string;
  stars?: number;
  stats?: readonly { label: string; value: string }[];
  updated?: string;
  venue?: string;
  year?: string;
};

export function resourceYear(row: ResourceSortableRow) {
  const recordedYear = row.stats?.find((stat) =>
    ["Published", "Table year", "Posted"].includes(stat.label),
  )?.value;
  const match = `${row.year ?? ""} ${recordedYear ?? ""} ${row.venue ?? ""} ${row.posted ?? ""}`.match(
    /\b(?:19|20)\d{2}\b/,
  );
  return match ? Number(match[0]) : undefined;
}

export function sortResourceRows<T extends ResourceSortableRow>(
  rows: readonly T[],
  sortKey: ResourceSortKey,
): T[] {
  if (sortKey === "default") return [...rows];

  const [field, direction] = sortKey.split("-") as [
    "downloads" | "stars" | "year",
    "asc" | "desc",
  ];
  const valueFor = (row: T) =>
    field === "year" ? resourceYear(row) : row[field];
  const directionMultiplier = direction === "asc" ? 1 : -1;

  return rows
    .map((row, index) => ({ index, row, value: valueFor(row) }))
    .sort((left, right) => {
      if (left.value === undefined && right.value === undefined) {
        return left.index - right.index;
      }
      if (left.value === undefined) return 1;
      if (right.value === undefined) return -1;
      const difference = (left.value - right.value) * directionMultiplier;
      return difference || left.index - right.index;
    })
    .map(({ row }) => row);
}
