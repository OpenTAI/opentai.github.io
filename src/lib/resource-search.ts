export function matchesLocalizedSearch(
  values: readonly (string | null | undefined)[],
  query: string,
  localize: (value: string) => string,
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;

  return values
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => [value, localize(value)])
    .join(" ")
    .toLocaleLowerCase()
    .includes(normalizedQuery);
}
