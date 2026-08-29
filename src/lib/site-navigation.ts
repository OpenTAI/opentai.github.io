export type NavigationItem = {
  href?: string;
  label: string;
  pending?: boolean;
};

export type NavigationGroup = {
  items: readonly NavigationItem[];
  label: string;
};

export const navigationGroups: readonly NavigationGroup[] = [
  {
    label: "Research",
    items: [{ label: "Papers", href: "/papers" }],
  },
  {
    label: "Resources",
    items: [
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Models", href: "/models" },
      { label: "Datasets", href: "/datasets" },
    ],
  },
  {
    label: "Evaluation",
    items: [
      { label: "Leaderboards", href: "/leaderboard" },
      { label: "Safety Arenas", href: "/arenas" },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      { label: "Startups", href: "/companies" },
      { label: "Community", href: "/community" },
    ],
  },
];

export const footerNavigationGroups: readonly NavigationGroup[] = [
  {
    label: "Research",
    items: [{ label: "Papers", href: "/papers" }],
  },
  {
    label: "Resources",
    items: [
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Models", href: "/models" },
      { label: "Datasets", href: "/datasets" },
    ],
  },
  {
    label: "Evaluation",
    items: [
      { label: "Leaderboards", href: "/leaderboard" },
      { label: "Safety Arenas", href: "/arenas" },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      { label: "Startups", href: "/companies" },
      { label: "Community", href: "/community" },
      { label: "GitHub", href: "https://github.com/OpenTAI" },
    ],
  },
  {
    label: "Terms & Policies",
    items: [{ label: "Terms Of Use", href: "/terms" }],
  },
];

export function activeNavigationGroup(routePath: string) {
  return (
    navigationGroups.find((group) =>
      group.items.some(
        (item) =>
          item.href &&
          (routePath === item.href || routePath.startsWith(`${item.href}/`)),
      ),
    )?.label ?? null
  );
}
