import type { EcosystemRecord } from "@/data/ecosystem";

export type EcosystemSortKey = "default" | "stars-desc" | "year-desc" | "name-asc";

export function formatCatalogValue(
  value: string | number | undefined,
  locale: "en" | "zh",
) {
  if (value === undefined || value === "") {
    return locale === "zh" ? "尚未记录" : "Not recorded yet";
  }
  return String(value);
}

export function filterEcosystemRecords(
  records: readonly EcosystemRecord[],
  { category, query }: { category: string; query: string },
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return records.filter((record) => {
    if (category !== "All" && record.category !== category) return false;
    if (!normalizedQuery) return true;

    return [
      record.name,
      record.category,
      record.description,
      record.descriptionZh,
      record.publisher,
      record.country,
      record.countryZh,
      record.affiliation,
      record.direction,
      record.directionZh,
      record.academicOrigin,
      record.academicOriginZh,
      record.status,
      record.statusZh,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLocaleLowerCase().includes(normalizedQuery));
  });
}

function compareOptionalNumber(
  left: number | undefined,
  right: number | undefined,
  direction: "asc" | "desc",
) {
  if (left === undefined && right === undefined) return 0;
  if (left === undefined) return 1;
  if (right === undefined) return -1;
  return direction === "desc" ? right - left : left - right;
}

export function sortEcosystemRecords(
  records: readonly EcosystemRecord[],
  sortKey: EcosystemSortKey,
) {
  return [...records].sort((left, right) => {
    if (sortKey === "name-asc") return left.name.localeCompare(right.name);
    if (sortKey === "year-desc") {
      return (
        compareOptionalNumber(left.year ?? left.founded, right.year ?? right.founded, "desc") ||
        left.name.localeCompare(right.name)
      );
    }

    return (
      compareOptionalNumber(left.stars, right.stars, "desc") ||
      compareOptionalNumber(left.year ?? left.founded, right.year ?? right.founded, "desc") ||
      left.name.localeCompare(right.name)
    );
  });
}
