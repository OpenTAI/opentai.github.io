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
      { label: "Frameworks", href: "/frameworks" },
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
      { label: "Frameworks", href: "/frameworks" },
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
      { label: "Inclusion policy", href: "/about#inclusion" },
      { label: "Governance (draft)", href: "/about#governance" },
      { label: "Contributing (draft)", href: "/about#contributing" },
      { label: "Citation (draft)", href: "/about#citation" },
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
