import { SubpageTableRow } from "@/data/site";

export function resourceSlug(row: Pick<SubpageTableRow, "name" | "slug">) {
  if (row.slug) return row.slug;

  return row.name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
