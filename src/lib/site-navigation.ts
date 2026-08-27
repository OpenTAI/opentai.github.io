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
      { label: "Datasets", href: "/datasets" },
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Models", href: "/models" },
    ],
  },
  {
    label: "Evaluation",
    items: [
      { label: "Leaderboards", href: "/leaderboard" },
      { label: "Arenas", href: "/arenas" },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      { label: "Companies", href: "/companies" },
      { label: "Community", href: "/community" },
    ],
  },
];

export const footerNavigationGroups: readonly NavigationGroup[] = [
  {
    label: "Research & Evaluation",
    items: [
      { label: "Papers", href: "/papers" },
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Leaderboards", href: "/leaderboard" },
      { label: "Arenas", href: "/arenas" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Datasets", href: "/datasets" },
      { label: "Models", href: "/models" },
    ],
  },
  {
    label: "OpenTAI",
    items: [
      { label: "Companies", href: "/companies" },
      { label: "Community", href: "/community" },
      { label: "About", href: "/about" },
      { label: "GitHub", href: "https://github.com/OpenTAI" },
    ],
  },
  {
    label: "Terms & Policies",
    items: [
      { label: "Terms Of Use", href: "/terms" },
      { label: "Privacy Notice", href: "/about#privacy" },
      { label: "Inclusion & Attribution", href: "/about#inclusion-attribution" },
      { label: "Corrections & Takedown", href: "/about#corrections-takedown" },
    ],
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
