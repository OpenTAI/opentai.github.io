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
      { label: "Frameworks", pending: true },
      { label: "Tools", href: "/tools" },
    ],
  },
  {
    label: "Evaluation",
    items: [
      { label: "Leaderboards", href: "/leaderboard" },
      { label: "Arenas", pending: true },
    ],
  },
  {
    label: "Ecosystem",
    items: [
      { label: "Companies", pending: true },
      { label: "Community", href: "/community" },
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
