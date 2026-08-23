import type { EcosystemRecord } from "@/data/ecosystem";

export type EcosystemSortKey = "default" | "stars-desc" | "year-desc" | "name-asc";

export type CompanyFilters = {
  country: string;
  locale: "en" | "zh";
  specialty: string;
  year: string;
};

const frameworkCategoryOrder = [
  "Red Teaming",
  "Evaluation",
  "Defense / Alignment",
] as const;

export function getFrameworkCategory(category: string) {
  if (category === "Attack" || category === "Red Teaming") return "Red Teaming";
  if (category === "Defense") return "Defense / Alignment";
  return category;
}

export function getFrameworkCategories(
  records: readonly Pick<EcosystemRecord, "category">[],
) {
  const categories = Array.from(
    new Set(records.map((record) => getFrameworkCategory(record.category))),
  );

  return [
    ...frameworkCategoryOrder.filter((category) => categories.includes(category)),
    ...categories.filter(
      (category) => !frameworkCategoryOrder.includes(
        category as (typeof frameworkCategoryOrder)[number],
      ),
    ),
  ];
}

export function formatCatalogValue(
  value: string | number | undefined,
  locale: "en" | "zh",
) {
  if (value === undefined || value === "") {
    return locale === "zh" ? "尚未记录" : "Not recorded yet";
  }
  return String(value);
}

export function getCompanySpecialties(
  record: Pick<EcosystemRecord, "direction" | "directionZh">,
  locale: "en" | "zh",
) {
  const value = locale === "zh" ? (record.directionZh ?? record.direction) : record.direction;
  return (value ?? "")
    .split("·")
    .map((specialty) => specialty.trim())
    .filter(Boolean);
}

export function getCompanyFilterOptions(
  records: readonly EcosystemRecord[],
  locale: "en" | "zh",
) {
  const years = Array.from(
    new Set(records.map((record) => record.founded).filter((year): year is number => year !== undefined)),
  ).sort((left, right) => right - left);
  const countries = Array.from(
    new Set(
      records
        .map((record) => locale === "zh" ? (record.countryZh ?? record.country) : record.country)
        .filter((country): country is string => Boolean(country)),
    ),
  ).sort((left, right) => left.localeCompare(right, locale === "zh" ? "zh-CN" : "en"));
  const specialties = Array.from(
    new Set(records.flatMap((record) => getCompanySpecialties(record, locale))),
  ).sort((left, right) => left.localeCompare(right, locale === "zh" ? "zh-CN" : "en"));

  return { countries, specialties, years };
}

export function filterCompanyRecords(
  records: readonly EcosystemRecord[],
  { country, locale, specialty, year }: CompanyFilters,
) {
  return records.filter((record) => {
    const localizedCountry = locale === "zh" ? (record.countryZh ?? record.country) : record.country;
    return (
      (!year || String(record.founded ?? "") === year) &&
      (!country || localizedCountry === country) &&
      (!specialty || getCompanySpecialties(record, locale).includes(specialty))
    );
  });
}

export function formatCompanyValuation(value: string, locale: "en" | "zh") {
  return locale === "zh"
    ? value.replace(/^OpenTAI 估算/, "ChatGPT 估算")
    : value.replace(/^OpenTAI estimate/, "ChatGPT estimate");
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
      record.valuation,
      record.valuationZh,
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
