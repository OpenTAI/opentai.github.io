// Content derived from the OpenTAI TinaCMS site
// (github.com/OpenTAI/opentai.github.io -> content/pages/home.md):
// entry names, descriptions, links, tags, and images.
//
// Stars / language / last-push / license / forks come from the GitHub REST API,
// author lists and posting dates from the arXiv API, and download counts from
// the Hugging Face API. Re-run scripts/fetch-metadata to refresh them.
//
// Category groupings and page copy are authored for this rebuild.

export type ResourceLink = { label: string; href: string };
export type Pill = { label: string; href: string };
export type RowStat = { label: string; value: string };
export type DatasetEvidenceSource = string | {
  type?: string | null;
  url?: string | null;
  path?: string | null;
};
export type DatasetSourcePaper = {
  arxivId?: string | null;
  openAlexId?: string | null;
  title?: string | null;
  domain?: string | null;
  evidence?: string | null;
  source?: DatasetEvidenceSource | null;
};

export type NewsItem = {
  title: string;
  tag: string;
  body: string;
  date: string;
  href: string;
  image: string;
};

export type ModelCard = {
  name: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
  venue?: string;
  meta?: string;
};

export type Partner = { name: string; logo: string };

export type SubpageCategoryCard = {
  title: string;
  detail: string;
  accent: string;
  filters?: readonly string[];
};

export type SubpageTableRow = {
  name: string;
  slug?: string;
  domain?: string;
  domains?: readonly string[];
  usageCount?: number;
  sourcePapers?: readonly DatasetSourcePaper[];
  primaryUrl?: string;
  property?: string;
  citationOnly?: boolean;
  subtitle?: string;
  note: string;
  type: string;
  venue?: string;
  year?: string;
  downloads?: number;
  stars?: number;
  updated?: string;
  posted?: string;
  tags?: readonly string[];
  stats?: readonly RowStat[];
  meta?: string;
  resources: readonly ResourceLink[];
  image?: string;
};

export type SubpageConfig = {
  slug: string;
  breadcrumb: readonly string[];
  title: string;
  heroIcon: string;
  description: string;
  overview: string;
  tableTitle: string;
  sectionTitle: string;
  categories: readonly SubpageCategoryCard[];
  tableRows: readonly SubpageTableRow[];
};

export type CuratedText = { text: string; source: string };
export type CuratedList = { items: readonly string[]; source: string };

export type BenchmarkDetail = {
  slug: string;
  name: string;
  category: string;
  subtitle?: string;
  description: string;
  abstract?: string;
  venue?: string;
  resources: readonly ResourceLink[];
  stats: readonly RowStat[];
  tags: readonly string[];
  authors?: readonly string[];
  authorCount?: number;
  posted?: string;
  arxivId?: string;
  repo?: string;
  license?: string;
  language?: string;
  stars?: number;
  forks?: number;
  updated?: string;
  homepage?: string;
  dataset?: CuratedText;
  metrics?: CuratedList;
  baselines?: CuratedText;
  externalLeaderboard?: { url: string; label: string; source: string };
  note?: string;
  pending: readonly string[];
};

export type LeaderboardRow = {
  rank: string;
  model: string;
  link?: string;
  count?: number;
  scoreA?: string;
  scoreB?: string;
};

export type LeaderboardBoard = {
  title: string;
  rows: readonly LeaderboardRow[];
};

export type LeaderboardTable = {
  id: string;
  label: string;
  columns: {
    model: string;
    link: string;
    count: string;
    scoreGroup: string;
    scoreA: string;
    scoreB: string;
    rank: string;
  };
  boards: readonly LeaderboardBoard[];
};

export type RankingResult = {
  rank: number;
  name: string;
  detail?: string;
  value: string;
};

export type RankingLink = {
  label: string;
  labelZh?: string;
  url: string;
};

export type RankingDirectoryRecord = {
  name: string;
  type: string;
  focus: string;
  focusZh: string;
  metric: string;
  metricZh: string;
  snapshotDate: string;
  results: readonly RankingResult[];
  emptyState?: string;
  emptyStateZh?: string;
  url: string;
  source: string;
  links: readonly RankingLink[];
  verificationNote: string;
};

export type ArenaResultSnapshot = {
  title: string;
  titleZh: string;
  snapshotDate: string;
  source: string;
  sourceLabel: string;
  sourceLabelZh: string;
  note: string;
  noteZh: string;
  benchmarks: readonly {
    name: string;
    metric: string;
    metricZh: string;
  }[];
  series: readonly {
    name: string;
    nameZh: string;
    color: string;
    values: readonly (number | null | undefined)[];
  }[];
};

export type TextArenaOverview = {
  title: string;
  titleZh: string;
  snapshotDate: string;
  source: string;
  sourceLabel: string;
  sourceLabelZh: string;
  note: string;
  noteZh: string;
  columns: readonly {
    key: string;
    label: string;
    labelZh: string;
  }[];
  rows: readonly {
    model: string;
    ranks: readonly (number | null | undefined)[];
  }[];
};

export type CodeArenaOverview = {
  schemaVersion: number;
  title: string;
  titleZh: string;
  category: string;
  categoryZh: string;
  description: string;
  descriptionZh: string;
  snapshotDate: string;
  source: string;
  sourceLabel: string;
  sourceLabelZh: string;
  priceNote: string;
  priceNoteZh: string;
  note: string;
  noteZh: string;
  models: readonly {
    rank: number;
    name: string;
    lab: string;
    score: number;
    inputPrice: number;
    outputPrice: number;
    preliminary?: boolean;
  }[];
};

export type HomeCategoryCard = {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: string;
};

export const siteBrand = {
  name: "OpenTAI",
  tagline: "The Open Hub for Trustworthy AI",
  headline: "An open ecosystem connecting trustworthy AI research, innovation, and startups.",
  contactEmail: "danxjma@gmail.com",
  upstream: "https://opentai.org",
};

export const navItems: Pill[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Papers",
    href: "/papers",
  },
  {
    label: "Benchmarks",
    href: "/benchmarks",
  },
  {
    label: "Models",
    href: "/models",
  },
  {
    label: "Datasets",
    href: "/datasets",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Community",
    href: "/community",
  },
];

export const mission: { title: string; body: string } = {
  title: "Advancing Trustworthy AI Through Open Collaboration",
  body: "OpenTAI is an open platform where researchers collaborate to accelerate practical Trustworthy AI solutions. We prioritize tools, benchmarks, and platforms over papers, bridging research with real-world impact.",
};

// Retained but not rendered: the News section was dropped from Discover on
// 2026-08-11 at the OpenTAI team's request — 'Latest releases' already covers
// new papers and model releases. Re-add <DiscoverNews /> to bring it back.
export const newsItems: NewsItem[] = [
  {
    title: "Introducing VLABench",
    tag: "Embodied AI",
    body: "VLABench is an open-source benchmark for evaluating Vision-Language-Action models, featuring 100 real-world tasks with natural language instructions. Designed to assess both action and language capabilities, it supports development of more robust AI systems. Join us in advancing trustworthy Embodied AI research through this community-driven initiative.",
    date: "Mar 1, 2025",
    href: "https://vlabench.github.io/",
    image: "/media/latestupdates3.png",
  },
  {
    title: "Releasing Large Model Safety Survey",
    tag: "Survey",
    body: "Our latest survey \"Safety at Scale: A Comprehensive Survey of Large Model Safety\" systematically analyzes safety threats facing today's large AI models, covering VFMs, LLMs, VLPs, VLMs, and T2I Diffusion models. Our findings highlight the current landscape of AI safety research and the urgent need for robust safety measures and collaborative efforts to ensure trustworthy AI development.",
    date: "Feb 13, 2025",
    href: "https://github.com/xingjunm/Awesome-Large-Model-Safety",
    image: "/media/safetysurvey.jpg",
  },
  {
    title: "Introducing the VisionSafety Platform",
    tag: "Vision",
    body: "The safety of vision models is critical to trustworthy AI. We proudly launch the VisionSafety Platform—a cutting-edge initiative to rigorously evaluate model robustness through highly transferable adversarial attacks and million-scale adversarial datasets. This platform represents a major leap forward in securing vision-based AI systems against emerging threats.",
    date: "Dec 24, 2024",
    href: "https://opentai.org/VisionSafety",
    image: "/media/visionsafety.png",
  },
];

export const largeModels: ModelCard[] = [
  {
    name: "DAVID XR1",
    subtitle: "AI-Generated Video Detection Model",
    description: "An AI video detection model with defect categorization, temporal–spatial localization, and reasoning explanations.",
    href: "https://arxiv.org/abs/2506.14827",
    image: "/media/david-xr-model.png",
    meta: "Yifeng Gao, Yifan Ding +10 · 2025-06-13",
  },
  {
    name: "SafeVid",
    subtitle: "Safety-aligned Video-Language Model",
    description: "SafeVid is a framework for training safety-aligned Video Large Multimodal Models using a large-scale safety preference dataset.",
    href: "https://arxiv.org/abs/2505.11926",
    image: "/media/safevid-model.png",
    meta: "Yixu Wang, Jiaxin Song +7 · 2025-05-17",
  },
  {
    name: "OmniSVG",
    subtitle: "SVG Generation Model",
    description: "OmniSVG is a unified SVG generation model that leverages VLMs to generate high-quality and complex SVGs.",
    href: "https://omnisvg.github.io/",
    image: "/media/omnisvg-2m-3.jpg",
    venue: "NeurIPS 2025",
    meta: "★ 2,579",
  },
  {
    name: "SAMA",
    subtitle: "Multi-Turn Referential Grounded Video Chat",
    description: "SAMA is a multi-turn referential grounded video chat model that advances fine-grained spatio-temporal understanding in videos by jointly tackling video referring understanding, grounding, and multi-turn dialogue.",
    href: "https://arxiv.org/abs/2505.18812",
    image: "/media/datasets2.png",
    venue: "NeurIPS 2025",
    meta: "Ye Sun, Hao Zhang +4 · 2025-05-24",
  },
];

export const partners: Partner[] = [
  {
    name: "Fudan University",
    logo: "/media/fudan-university.png",
  },
  {
    name: "UniMelb",
    logo: "/media/the-university-of-melbourne.png",
  },
  {
    name: "Tsinghua",
    logo: "/media/tsinghua-university.png",
  },
  {
    name: "SMU",
    logo: "/media/singapore-management-university.png",
  },
  {
    name: "UIUC",
    logo: "/media/university-of-lllinois-urbana-champaign2.png",
  },
  {
    name: "Duke",
    logo: "/media/duke-university2.png",
  },
  {
    name: "SHJT",
    logo: "/media/shanghai-jiao-tong-university.png",
  },
  {
    name: "Oxford",
    logo: "/media/university-of-oxford.png",
  },
  {
    name: "Purdue",
    logo: "/media/purdue-university2.png",
  },
  {
    name: "NTU",
    logo: "/media/nanyang-technological-university.png",
  },
  {
    name: "UYSD",
    logo: "/media/the-university-of-sydney.png",
  },
  {
    name: "UoM Amherst",
    logo: "/media/university-of-massachusetts-amherst.png",
  },
  {
    name: "UC Santa Cruz",
    logo: "/media/university-of-california-santa-cruz.png",
  },
  {
    name: "UoWM",
    logo: "/media/university-of-wisconsin-madison.png",
  },
  {
    name: "UoAuck",
    logo: "/media/university-of-auckland.png",
  },
  {
    name: "CISPA",
    logo: "/media/cispa-helmholtz-center-for-information-security2.png",
  },
  {
    name: "CUHK",
    logo: "/media/the-chinese-university-of-hong-kong2.png",
  },
  {
    name: "Virginia Tech",
    logo: "/media/virginia-tech-logo.png",
  },
  {
    name: "RIKEN",
    logo: "/media/riken.png",
  },
  {
    name: "CUHK-SZ",
    logo: "/media/chinese-university-of-hong-kong-shenzhen2.png",
  },
  {
    name: "UoTokyo",
    logo: "/media/the-university-of-tokyo.png",
  },
  {
    name: "Griffith",
    logo: "/media/griffith-university-new.png",
  },
  {
    name: "HKUST",
    logo: "/media/hong-kong-university-of-science-and-technology.png",
  },
  {
    name: "MBZUAI",
    logo: "/media/mbzuai.png",
  },
];

export const homeCategoryCards: HomeCategoryCard[] = [
  {
    title: "Papers",
    description: "Trustworthy AI research across LLMs, Agents, and Embodied AI.",
    href: "/papers",
    accent: "pink",
    icon: "○",
  },
  {
    title: "Benchmarks",
    description: "Evaluation benchmarks, tasks, and metrics.",
    href: "/benchmarks",
    accent: "violet",
    icon: "◎",
  },
  {
    title: "Models",
    description: "Guard models, safety-aligned models, detectors, agents.",
    href: "/models",
    accent: "blue",
    icon: "◆",
  },
  {
    title: "Datasets",
    description: "Verified data for training, fine-tuning, and safety alignment.",
    href: "/datasets",
    accent: "green",
    icon: "◱",
  },
  {
    title: "Leaderboards",
    description: "Source-backed trustworthiness and safety rankings.",
    href: "/leaderboard",
    accent: "blue",
    icon: "L",
  },
  {
    title: "Arenas",
    description: "Open arenas for testing model and agent safety.",
    href: "/arenas",
    accent: "orange",
    icon: "A",
  },
  {
    title: "Startups",
    description: "Source-backed startups building trustworthy AI products.",
    href: "/companies",
    accent: "pink",
    icon: "S",
  },
  {
    title: "Community",
    description: "Researchers, builders, and institutions contributing to OpenTAI.",
    href: "/community",
    accent: "violet",
    icon: "C",
  },
];

export const benchmarkDetails: Record<string, BenchmarkDetail> = {
  bipia: {
    slug: "bipia",
    name: "BIPIA",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: IPI attacks.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2312.14197",
      },
      {
        label: "GitHub",
        href: "https://github.com/microsoft/BIPIA",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/microsoft/BIPIA/tree/main/benchmark",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2023",
      },
      {
        label: "Recorded scale",
        value: "5 scenarios / 250 goals",
      },
    ],
    tags: [
      "simulation-based benchmarks",
      "llm-security",
    ],
    arxivId: "2312.14197",
    repo: "microsoft/BIPIA",
    license: "NOASSERTION",
    language: "Python",
    stars: 154,
    forks: 19,
    updated: "2024-04-15",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  toolemu: {
    slug: "toolemu",
    name: "ToolEmu",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Emulated tool risks.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2309.15817",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2023",
      },
      {
        label: "Recorded scale",
        value: "36 tools / 144 cases",
      },
    ],
    tags: [
      "simulation-based benchmarks",
    ],
    arxivId: "2309.15817",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  injecagent: {
    slug: "injecagent",
    name: "InjecAgent",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Tool-integrated indirect prompt injection.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2403.02691",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/uiuc-kang-lab/InjecAgent",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "17 user tools / 62 attacker tools / 1,054 cases",
      },
    ],
    tags: [
      "prompt injection",
      "simulation-based benchmarks",
    ],
    arxivId: "2403.02691",
    repo: "uiuc-kang-lab/InjecAgent",
    license: "MIT",
    language: "Python",
    stars: 157,
    forks: 30,
    updated: "2024-07-02",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  agentdojo: {
    slug: "agentdojo",
    name: "AgentDojo",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Third-party instructions.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.13352",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/ethz-spylab/agentdojo",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "97 tasks / 629 cases",
      },
    ],
    tags: [
      "simulation-based benchmarks",
    ],
    arxivId: "2406.13352",
    repo: "ethz-spylab/agentdojo",
    license: "MIT",
    language: "Python",
    stars: 740,
    forks: 191,
    updated: "2026-06-02",
    homepage: "https://agentdojo.spylab.ai/",
    pending: [],
    dataset: {
      text: "97 realistic agent tasks — managing an email client, navigating e-banking, making travel bookings — together with 629 security test cases. Organised into suites such as workspace, and designed to be extended rather than frozen.",
      source: "Paper abstract and project README",
    },
    metrics: {
      items: [
        "Whether the agent completes the benign task, and whether prompt injection breaks its security properties",
        "Reported per suite, per model, per attack and per defense combination",
      ],
      source: "Project README (results page)",
    },
    baselines: {
      text: "Attack and defense paradigms from the literature ship with the package — for example a tool-filter defense and a tool-knowledge attack, selectable from the benchmark script.",
      source: "Project README",
    },
    externalLeaderboard: {
      url: "https://agentdojo.spylab.ai/results/",
      label: "Official results page",
      source: "Project README",
    },
  },
  agentharm: {
    slug: "agentharm",
    name: "AgentHarm",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Harmful behaviors.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.09024",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/AIEvals/AgentHarm",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "110 tasks / 11 categories",
      },
    ],
    tags: [
      "harmful content",
      "simulation-based benchmarks",
    ],
    arxivId: "2410.09024",
    repo: "AIEvals/AgentHarm",
    language: "Python",
    stars: 1,
    forks: 0,
    updated: "2026-01-16",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  redcode: {
    slug: "redcode",
    name: "RedCode",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Code vulnerabilities.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2411.07781",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/AI-secure/RedCode",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "4,000+ cases / 25 types",
      },
    ],
    tags: [
      "cybersecurity",
      "simulation-based benchmarks",
    ],
    arxivId: "2411.07781",
    repo: "AI-secure/RedCode",
    stars: 87,
    forks: 11,
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "vpi-bench": {
    slug: "vpi-bench",
    name: "VPI-Bench",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Visual prompt injections. The survey table records 2024; the repository list links the later arXiv record.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2506.02456",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "306 cases / 5 platforms",
      },
    ],
    tags: [
      "Computer-use",
      "prompt injection",
      "simulation-based benchmarks",
    ],
    arxivId: "2506.02456",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "r-judge": {
    slug: "r-judge",
    name: "R-Judge",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Risk identification from logs.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2401.10019",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/Lordog/R-Judge",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "569 records / 27 scenarios",
      },
    ],
    tags: [
      "simulation-based benchmarks",
    ],
    arxivId: "2401.10019",
    repo: "Lordog/R-Judge",
    language: "Python",
    stars: 109,
    forks: 10,
    updated: "2026-01-11",
    homepage: "https://arxiv.org/abs/2401.10019",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "salad-bench": {
    slug: "salad-bench",
    name: "SALAD-Bench",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper identifies SALAD-Bench as a safety benchmark for large language models.",
    venue: "ACL 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2402.05044",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/OpenSafetyLab/SALAD-BENCH",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "21K base questions / 16 tasks / 66 categories",
      },
      {
        label: "Table #Times",
        value: "36",
      },
    ],
    tags: [
      "robustness",
      "simulation-based benchmarks",
    ],
    arxivId: "2402.05044",
    repo: "OpenSafetyLab/SALAD-BENCH",
    license: "Apache-2.0",
    language: "Python",
    stars: 176,
    forks: 15,
    updated: "2025-03-08",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  h4rm3l: {
    slug: "h4rm3l",
    name: "h4rm3l",
    category: "LLMs",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Jailbreak attack synthesis.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2408.04811",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/mdoumbouya/h4rm3l",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "2,656 attacks",
      },
    ],
    tags: [
      "jailbreak",
      "simulation-based benchmarks",
    ],
    arxivId: "2408.04811",
    repo: "mdoumbouya/h4rm3l",
    license: "MIT",
    language: "Python",
    stars: 28,
    forks: 5,
    updated: "2024-12-05",
    homepage: "https://mdoumbouya.github.io/h4rm3l/",
    pending: [
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
    dataset: {
      text: "The official benchmark experiment publishes its benchmark CSV, sampled harmful prompts, synthesized attack programs and evaluation results under experiments/experiment_130_benchmark.",
      source: "Official project site, datasheet and repository",
    },
  },
  "sg-bench": {
    slug: "sg-bench",
    name: "SG-Bench",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Safety generalization.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.21965",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/MurrayTom/SG-Bench",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "1,442 queries / 6 categories",
      },
    ],
    tags: [
      "simulation-based benchmarks",
    ],
    arxivId: "2410.21965",
    repo: "MurrayTom/SG-Bench",
    license: "GPL-3.0",
    language: "Python",
    stars: 26,
    forks: 3,
    updated: "2024-11-29",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  chemsafetybench: {
    slug: "chemsafetybench",
    name: "ChemSafetyBench",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Chemistry safety.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2411.16736",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "30K samples / 3 tasks",
      },
    ],
    tags: [
      "simulation-based benchmarks",
    ],
    arxivId: "2411.16736",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  toolsword: {
    slug: "toolsword",
    name: "ToolSword",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Tool-use safety.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2402.10753",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/Junjie-Ye/ToolSword",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "6 scenarios / 3 stages",
      },
    ],
    tags: [
      "simulation-based benchmarks",
    ],
    arxivId: "2402.10753",
    repo: "Junjie-Ye/ToolSword",
    license: "Apache-2.0",
    stars: 15,
    forks: 0,
    updated: "2024-09-12",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  privacylens: {
    slug: "privacylens",
    name: "PrivacyLens",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Privacy norm awareness.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2409.00138",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/SALT-NLP/PrivacyLens",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "493 seeds / vignettes / trajectories",
      },
    ],
    tags: [
      "privacy",
      "simulation-based benchmarks",
    ],
    arxivId: "2409.00138",
    repo: "SALT-NLP/PrivacyLens",
    license: "MIT",
    language: "Python",
    stars: 48,
    forks: 10,
    updated: "2025-03-04",
    homepage: "https://salt-nlp.github.io/PrivacyLens",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  safebench: {
    slug: "safebench",
    name: "SafeBench",
    category: "Embodied AI",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Driving safety.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2206.09682",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/trust-ai/SafeBench",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2022",
      },
      {
        label: "Recorded scale",
        value: "8 scenarios / 100 routes / 2,352 cases",
      },
    ],
    tags: [
      "real-interaction benchmarks",
    ],
    arxivId: "2206.09682",
    repo: "trust-ai/SafeBench",
    license: "MIT",
    language: "Python",
    stars: 155,
    forks: 29,
    updated: "2024-02-23",
    homepage: "https://safebench.github.io",
    pending: [
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
    dataset: {
      text: "Eight safety-critical scenario templates and 100 routes, with scenario routes, models and adversarial attack templates published under safebench/scenario/scenario_data.",
      source: "Official SafeBench site, documentation and repository",
    },
  },
  "agent-security-bench-asb": {
    slug: "agent-security-bench-asb",
    name: "Agent Security Bench (ASB)",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Attack and defense across 10 scenarios.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.02644",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "400+ tools",
      },
    ],
    tags: [
      "real-interaction benchmarks",
    ],
    arxivId: "2410.02644",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  safeagentbench: {
    slug: "safeagentbench",
    name: "SafeAgentBench",
    category: "Embodied AI",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Embodied hazards.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2412.13178",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/shengyin1224/SafeAgentBench",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "750 tasks",
      },
    ],
    tags: [
      "real-interaction benchmarks",
    ],
    arxivId: "2412.13178",
    repo: "shengyin1224/SafeAgentBench",
    language: "Python",
    stars: 75,
    forks: 5,
    updated: "2025-02-25",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "agent-safetybench": {
    slug: "agent-safetybench",
    name: "Agent-SafetyBench",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Safety risks across 8 categories.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2412.14470",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/thu-coai/Agent-SafetyBench",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "349 environments / 2,000 cases",
      },
    ],
    tags: [
      "real-interaction benchmarks",
    ],
    arxivId: "2412.14470",
    repo: "thu-coai/Agent-SafetyBench",
    license: "MIT",
    language: "Python",
    stars: 157,
    forks: 10,
    updated: "2025-08-11",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "advweb-are": {
    slug: "advweb-are",
    name: "AdvWeb / ARE",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Adversarial robustness for multimodal web agents. Safety at Scale Table 14 lists AdvWeb, Dissecting Adversarial, and ARE as separate labels, but all three bibliography records resolve to arXiv:2406.12814; this card avoids triple-counting the same paper.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.12814",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "200 target tasks",
      },
    ],
    tags: [
      "Computer-use",
      "robustness",
      "real-interaction benchmarks",
      "advweb",
      "dissecting adversarial",
      "are",
    ],
    arxivId: "2406.12814",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "st-webagentbench": {
    slug: "st-webagentbench",
    name: "ST-WebAgentBench",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Web safety and trustworthiness.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.06703",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/segev-shlomov/ST-WebAgentBench",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "222 tasks with safety and trustworthiness policies",
      },
    ],
    tags: [
      "Computer-use",
      "real-interaction benchmarks",
    ],
    arxivId: "2410.06703",
    repo: "segev-shlomov/ST-WebAgentBench",
    license: "NOASSERTION",
    language: "Python",
    stars: 25,
    forks: 6,
    updated: "2026-03-12",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  haicosystem: {
    slug: "haicosystem",
    name: "Haicosystem",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Human-AI sandbox safety.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2409.16427",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/XuhuiZhou/HAICosystem",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "1,840 simulations / 92 scenarios",
      },
    ],
    tags: [
      "real-interaction benchmarks",
    ],
    arxivId: "2409.16427",
    repo: "XuhuiZhou/HAICosystem",
    language: "Python",
    stars: 14,
    forks: 1,
    updated: "2025-06-01",
    homepage: "https://haicosystem.org",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  wasp: {
    slug: "wasp",
    name: "WASP",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Adversarial web-agent safety.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2504.18575",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/facebookresearch/wasp",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2025",
      },
      {
        label: "Recorded scale",
        value: "84 tasks / 42 scenarios / 2 environments",
      },
    ],
    tags: [
      "Computer-use",
      "robustness",
      "real-interaction benchmarks",
    ],
    arxivId: "2504.18575",
    repo: "facebookresearch/wasp",
    license: "NOASSERTION",
    language: "Python",
    stars: 98,
    forks: 15,
    updated: "2026-04-13",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "refusal-trained-llms": {
    slug: "refusal-trained-llms",
    name: "Refusal-Trained LLMs",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Browser jailbreaking.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.13886",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2025",
      },
      {
        label: "Recorded scale",
        value: "100 harmful behaviors",
      },
    ],
    tags: [
      "Computer-use",
      "jailbreak",
      "real-interaction benchmarks",
    ],
    arxivId: "2410.13886",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  safearena: {
    slug: "safearena",
    name: "SafeArena",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Web-agent misuse.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2503.04957",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/McGill-NLP/safearena",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2025",
      },
      {
        label: "Recorded scale",
        value: "500 safe and harmful tasks",
      },
    ],
    tags: [
      "Computer-use",
      "real-interaction benchmarks",
    ],
    arxivId: "2503.04957",
    repo: "McGill-NLP/safearena",
    language: "Python",
    stars: 24,
    forks: 7,
    updated: "2025-04-23",
    homepage: "https://safearena.github.io",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  openagentsafety: {
    slug: "openagentsafety",
    name: "OpenAgentSafety",
    category: "Agents",
    description: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Real-world safety across 8 categories.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2507.06134",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/Open-Agent-Safety/OpenAgentSafety",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2025",
      },
      {
        label: "Recorded scale",
        value: "350+ multi-turn tasks",
      },
    ],
    tags: [
      "real-interaction benchmarks",
    ],
    arxivId: "2507.06134",
    repo: "Open-Agent-Safety/OpenAgentSafety",
    license: "MIT",
    language: "Python",
    stars: 32,
    forks: 17,
    updated: "2026-08-10",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  mobilesafetybench: {
    slug: "mobilesafetybench",
    name: "MobileSafetyBench",
    category: "Agents",
    description: "The official project introduces MobileSafetyBench for evaluating device-control agents in an Android-emulator environment and records 250 tasks: 200 daily-scenario tasks and 50 indirect prompt-injection tasks.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.17520",
      },
      {
        label: "Official project",
        href: "https://mobilesafetybench.github.io/",
      },
      {
        label: "GitHub",
        href: "https://github.com/jylee425/mobilesafetybench",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded scale",
        value: "250 tasks / 200 daily scenarios / 50 indirect prompt-injection scenarios",
      },
    ],
    tags: [
      "Mobile",
      "Computer-use",
      "prompt injection",
      "simulation-based benchmarks",
    ],
    arxivId: "2410.17520",
    repo: "jylee425/mobilesafetybench",
    license: "Apache-2.0",
    language: "Jupyter Notebook",
    stars: 37,
    forks: 1,
    updated: "2026-01-28",
    homepage: "https://mobilesafetybench.github.io/",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  bench2drive: {
    slug: "bench2drive",
    name: "Bench2Drive",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks section records 220 routes. The official repository releases the benchmark and training data.",
    venue: "NeurIPS 2024",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/Thinklab-SJTU/Bench2Drive",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.03877",
      },
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "220 routes",
      },
    ],
    tags: [],
    arxivId: "2406.03877",
    repo: "Thinklab-SJTU/Bench2Drive",
    license: "NOASSERTION",
    language: "Python",
    stars: 1924,
    forks: 142,
    updated: "2026-08-11",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  m3bench: {
    slug: "m3bench",
    name: "M3Bench",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks section records 30,000 pick-and-place tasks across 119 household scenes.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.06678",
      },
      {
        label: "GitHub",
        href: "https://github.com/TooSchoolForCool/M3Bench",
      },
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "30,000 tasks / 119 scenes",
      },
    ],
    tags: [],
    authors: [
      "Zeyu Zhang",
      "Sixu Yan",
      "Muzhi Han",
      "Zaijin Wang",
      "Xinggang Wang",
      "Song-Chun Zhu",
    ],
    authorCount: 7,
    posted: "2024-10-09",
    arxivId: "2410.06678",
    repo: "TooSchoolForCool/M3Bench",
    language: "Python",
    stars: 27,
    forks: 0,
    updated: "2025-07-19",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "thor-eae": {
    slug: "thor-eae",
    name: "THOR-EAE",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks section records 840,000 samples in AI2-THOR. Its bibliography cites the ACM Multimedia paper but does not record an arXiv or repository link.",
    resources: [
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "840,000 samples",
      },
    ],
    tags: [],
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "embodied-agent-interface-eai": {
    slug: "embodied-agent-interface-eai",
    name: "Embodied Agent Interface (EAI)",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks section names EAI. The official NeurIPS paper and repository record 338 VirtualHome tasks and 100 BEHAVIOR tasks.",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/embodied-agent-interface/embodied-agent-interface",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.07166",
      },
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "438 tasks",
      },
    ],
    tags: [],
    arxivId: "2410.07166",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "agentsafe-multi-agent-systems": {
    slug: "agentsafe-multi-agent-systems",
    name: "AgentSafe",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names AgentSafe.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2503.04392",
      },
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "Not recorded in source section",
      },
    ],
    tags: [],
    arxivId: "2503.04392",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "safe-beai": {
    slug: "safe-beai",
    name: "Safe-BeAI",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names Safe-BeAI. The primary paper records 2,027 tasks across 8 hazard categories.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2504.14650",
      },
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "2,027 tasks / 8 hazard categories",
      },
    ],
    tags: [],
    arxivId: "2504.14650",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "agentsafe-hazardous-instructions": {
    slug: "agentsafe-hazardous-instructions",
    name: "AGENTSAFE",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names AGENTSAFE. The primary paper records 45 adversarial scenarios, 1,350 hazardous tasks, and 9,900 instructions.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2506.14697",
      },
      {
        label: "Source survey",
        href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "1,350 tasks / 9,900 instructions / 45 scenarios",
      },
    ],
    tags: [
      "robustness",
    ],
    arxivId: "2506.14697",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  safemindbench: {
    slug: "safemindbench",
    name: "SafeMindBench",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks subsection explicitly names SafeMindBench as a benchmark for safety risks in embodied LLM agents.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2509.25885",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2605.02900",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "Not recorded in source section",
      },
    ],
    tags: [],
    arxivId: "2509.25885",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  despite: {
    slug: "despite",
    name: "DESPITE",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks subsection explicitly identifies DESPITE as a PDDL benchmark separating planning competence from safety competence.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2604.18463",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2605.02900",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "Not recorded in source section",
      },
    ],
    tags: [],
    arxivId: "2604.18463",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  robojailbench: {
    slug: "robojailbench",
    name: "RoboJailBench",
    category: "Embodied AI",
    description: "The Embodied AI survey's dedicated Benchmarks subsection explicitly identifies RoboJailBench as a jailbreak attack-and-defense benchmark for embodied VLMs.",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2605.19328",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2605.02900",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "Not recorded in source section",
      },
    ],
    tags: [
      "jailbreak",
    ],
    arxivId: "2605.19328",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  hasard: {
    slug: "hasard",
    name: "HASARD",
    category: "Embodied AI",
    description: "The official HASARD repository publishes six vision-based safe reinforcement-learning environments and their scenario implementations.",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/TTomilin/HASARD/tree/main/hasard/envs",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2503.08241",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2605.02900",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "6 embodied safe-RL environments",
      },
    ],
    tags: [],
    arxivId: "2503.08241",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "vision-and-language-navigation-interpreting-visually-grounded-navigation-instructions-in-real-environments": {
    slug: "vision-and-language-navigation-interpreting-visually-grounded-navigation-instructions-in-real-environments",
    name: "Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments",
    category: "Embodied AI",
    description: "Listed in the source survey's Benchmarks & Datasets section. The primary paper calls R2R the first benchmark dataset for visually-grounded natural-language navigation, and the authors' repository provides the data and evaluation code.",
    venue: "CVPR 2018",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/peteanderson80/Matterport3DSimulator",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/1711.07280",
      },
    ],
    stats: [
      {
        label: "Published",
        value: "2018",
      },
    ],
    tags: [],
    arxivId: "1711.07280",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "vizwiz-grand-challenge-answering-visual-questions-from-blind-people": {
    slug: "vizwiz-grand-challenge-answering-visual-questions-from-blind-people",
    name: "VizWiz Grand Challenge: Answering Visual Questions from Blind People",
    category: "Embodied AI",
    description: "Listed in the source survey's Benchmarks & Datasets section. The official VizWiz page publishes the dataset, challenge tasks, evaluation metrics and self-evaluation annotations.",
    venue: "CVPR 2018",
    resources: [
      {
        label: "Project page",
        href: "https://vizwiz.org/tasks-and-datasets/vqa/",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/1802.08218",
      },
    ],
    stats: [
      {
        label: "Published",
        value: "2018",
      },
    ],
    tags: [],
    arxivId: "1802.08218",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  truthfulqa: {
    slug: "truthfulqa",
    name: "TruthfulQA",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Truthfulness Datasets. Safety at Scale Section 3.13.2 and the primary paper both call TruthfulQA a benchmark.",
    venue: "ACL 2022",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2109.07958",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2021",
      },
      {
        label: "Recorded size",
        value: "817",
      },
      {
        label: "Table #Times",
        value: "213",
      },
    ],
    tags: [
      "truthfulness datasets",
    ],
    arxivId: "2109.07958",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  advglue: {
    slug: "advglue",
    name: "AdvGLUE",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper title identifies AdvGLUE as a multi-task benchmark.",
    venue: "NeurIPS 2021",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2111.02840",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2021",
      },
      {
        label: "Recorded size",
        value: "5,716",
      },
      {
        label: "Table #Times",
        value: "12",
      },
    ],
    tags: [
      "robustness",
      "adversarial datasets and backdoor benchmarks",
    ],
    arxivId: "2111.02840",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  advbench: {
    slug: "advbench",
    name: "AdvBench",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. Safety at Scale Table 6 cites the GCG paper for AdvBench; that paper uses AdvBench as an evaluation benchmark.",
    venue: "arXiv 2023",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2307.15043",
      },
      {
        label: "GitHub",
        href: "https://github.com/llm-attacks/llm-attacks",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
      {
        label: "GitHub",
        href: "https://github.com/llm-attacks/llm-attacks/blob/main/data/advbench/harmful_behaviors.csv",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2023",
      },
      {
        label: "Recorded size",
        value: "520",
      },
      {
        label: "Table #Times",
        value: "52",
      },
    ],
    tags: [
      "robustness",
      "adversarial datasets and backdoor benchmarks",
    ],
    arxivId: "2307.15043",
    repo: "llm-attacks/llm-attacks",
    license: "MIT",
    language: "Python",
    stars: 4760,
    forks: 631,
    updated: "2024-08-02",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  cvalues: {
    slug: "cvalues",
    name: "CVALUES",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper identifies CVALUES as a Chinese human-values evaluation benchmark.",
    venue: "arXiv 2023",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2307.09705",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2023",
      },
      {
        label: "Recorded size",
        value: "2,100",
      },
      {
        label: "Table #Times",
        value: "10",
      },
    ],
    tags: [
      "value benchmarks",
    ],
    arxivId: "2307.09705",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  fine: {
    slug: "fine",
    name: "FINE",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper constructs a comparative benchmark and names its evaluation framework FINE.",
    venue: "NAACL 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2311.05915",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2023",
      },
      {
        label: "Recorded size",
        value: "90",
      },
      {
        label: "Table #Times",
        value: "14",
      },
    ],
    tags: [
      "value benchmarks",
    ],
    arxivId: "2311.05915",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  flames: {
    slug: "flames",
    name: "FLAMES",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper title and abstract identify FLAMES as a value-alignment benchmark.",
    venue: "NAACL 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2311.06899",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "2,251",
      },
      {
        label: "Table #Times",
        value: "17",
      },
    ],
    tags: [
      "alignment",
      "value benchmarks",
    ],
    arxivId: "2311.06899",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  sorrybench: {
    slug: "sorrybench",
    name: "SORRYBench",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper introduces SORRY-Bench as a benchmark for safety refusal behaviours.",
    venue: "arXiv 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.14598",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "450",
      },
      {
        label: "Table #Times",
        value: "8",
      },
    ],
    tags: [
      "jailbreak",
      "value benchmarks",
    ],
    arxivId: "2406.14598",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  safetybench: {
    slug: "safetybench",
    name: "SafetyBench",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper identifies SafetyBench as a comprehensive benchmark for evaluating LLM safety.",
    venue: "ACL 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2309.07045",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "11,435",
      },
      {
        label: "Table #Times",
        value: "21",
      },
    ],
    tags: [
      "value benchmarks",
    ],
    arxivId: "2309.07045",
    pending: [],
    dataset: {
      text: "11,435 multiple-choice questions across 7 categories of safety concern, in both Chinese and English. A Chinese subset downsamples 300 questions per category with highly sensitive keywords removed. Five worked examples per category are provided for few-shot prompting. Test answers were fully open-sourced in July 2025.",
      source: "Project README and paper abstract",
    },
    metrics: {
      items: [
        "Multiple-choice accuracy, evaluated zero-shot and five-shot",
        "Chain-of-thought evaluation is deliberately not part of the default protocol",
      ],
      source: "Project README",
    },
    baselines: {
      text: "25 popular Chinese and English LLMs evaluated in both zero-shot and few-shot settings.",
      source: "Paper abstract",
    },
    externalLeaderboard: {
      url: "https://llmbench.ai/safety",
      label: "Official leaderboards (Chinese, English, Chinese subset)",
      source: "Project README",
    },
  },
  backdoorllm: {
    slug: "backdoorllm",
    name: "BackdoorLLM",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. Safety at Scale and the primary paper both identify BackdoorLLM as a benchmark.",
    venue: "arXiv 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2408.12798",
      },
      {
        label: "GitHub",
        href: "https://github.com/bboylyg/BackdoorLLM",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "8",
      },
      {
        label: "Table #Times",
        value: "6",
      },
    ],
    tags: [
      "robustness",
      "adversarial datasets and backdoor benchmarks",
      "attack",
      "backdoor",
      "defense",
    ],
    arxivId: "2408.12798",
    repo: "bboylyg/BackdoorLLM",
    license: "MIT",
    language: "Python",
    stars: 324,
    forks: 46,
    updated: "2026-03-13",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "jailbreakv-28k": {
    slug: "jailbreakv-28k",
    name: "JailBreakV-28K",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper identifies JailBreakV-28K as a benchmark for assessing multimodal-model robustness against jailbreak attacks.",
    venue: "COLM 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2404.03027",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "28K",
      },
      {
        label: "Table #Times",
        value: "10",
      },
    ],
    tags: [
      "jailbreak",
      "adversarial datasets and backdoor benchmarks",
    ],
    arxivId: "2404.03027",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  strongreject: {
    slug: "strongreject",
    name: "STRONGREJECT",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper introduces StrongREJECT as a jailbreak-evaluation benchmark.",
    venue: "ICLR Workshop 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2402.10260",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "313",
      },
      {
        label: "Table #Times",
        value: "4",
      },
    ],
    tags: [
      "jailbreak",
      "adversarial datasets and backdoor benchmarks",
    ],
    arxivId: "2402.10260",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "libra-leaderboard": {
    slug: "libra-leaderboard",
    name: "Libra-Leaderboard",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. Safety at Scale describes Libra-Leaderboard as a leaderboard with a comprehensive safety benchmark and unified evaluation framework.",
    venue: "arXiv 2024",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2412.18551",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2024",
      },
      {
        label: "Recorded size",
        value: "57",
      },
      {
        label: "Table #Times",
        value: "26",
      },
    ],
    tags: [
      "value benchmarks",
    ],
    arxivId: "2412.18551",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  "case-bench": {
    slug: "case-bench",
    name: "CASE-Bench",
    category: "LLMs",
    description: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper identifies CASE-Bench as a context-aware safety benchmark for large language models.",
    venue: "arXiv 2025",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2501.14940",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Table year",
        value: "2025",
      },
      {
        label: "Recorded size",
        value: "450",
      },
    ],
    tags: [
      "value benchmarks",
    ],
    arxivId: "2501.14940",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  harmbench: {
    slug: "harmbench",
    name: "HarmBench",
    category: "LLMs",
    description: "The LLM chapter names HarmBench as an evaluation benchmark. The official repository calls it a standardized evaluation framework and documents its evaluation pipeline.",
    venue: "arXiv 2024",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/centerforaisafety/HarmBench",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2402.04249",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "18 red-teaming methods / 33 target LLMs and defenses",
      },
    ],
    tags: [
      "jailbreak",
      "red teaming",
    ],
    authors: [
      "Mantas Mazeika",
      "Long Phan",
      "Xuwang Yin",
      "Andy Zou",
      "Zifan Wang",
      "Norman Mu",
    ],
    authorCount: 12,
    posted: "2024-02-06",
    arxivId: "2402.04249",
    repo: "centerforaisafety/HarmBench",
    license: "MIT",
    language: "Jupyter Notebook",
    stars: 1028,
    forks: 154,
    updated: "2024-08-16",
    pending: [],
    dataset: {
      text: "Harmful behaviours grouped into standard, contextual and copyright categories, evaluated against both text and multimodal models. HarmBench 1.0 additionally ships precomputed test cases and adversarial training code.",
      source: "Project README and official results page",
    },
    metrics: {
      items: [
        "Attack success rate, scored by HarmBench's own classifier models rather than string matching",
        "Three released classifiers: standard/contextual behaviours, multimodal behaviours, and a validation classifier",
      ],
      source: "Project README (Classifiers)",
    },
    baselines: {
      text: "A large-scale comparison of 18 red teaming methods against 33 target LLMs and defenses, plus an adversarial training method introduced alongside the benchmark.",
      source: "Paper abstract",
    },
    externalLeaderboard: {
      url: "https://www.harmbench.org/results",
      label: "Official baseline results",
      source: "Project website",
    },
  },
  bumble: {
    slug: "bumble",
    name: "BUMBLE",
    category: "LLMs",
    description: "The LLM chapter explicitly calls BUMBLE a benchmark. The primary paper reports 12.7K instances across nine bias types, and the authors' repository identifies itself as the BUMBLE benchmark.",
    venue: "ACL 2025",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/yuchenwen1/BUMBLE",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2406.14023",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "12.7K instances / 9 bias types",
      },
    ],
    tags: [
      "fairness",
      "implicit bias",
    ],
    authors: [
      "Yuchen Wen",
      "Keping Bi",
      "Wei Chen",
      "Jiafeng Guo",
      "Xueqi Cheng",
    ],
    authorCount: 5,
    posted: "2024-06-20",
    arxivId: "2406.14023",
    repo: "yuchenwen1/BUMBLE",
    language: "Python",
    stars: 1,
    forks: 1,
    updated: "2024-10-11",
    pending: [
      "Dataset",
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
  },
  jailbreakbench: {
    slug: "jailbreakbench",
    name: "JailbreakBench",
    category: "LLMs",
    description: "The LLM chapter names JailbreakBench. Its official repository calls it an open robustness benchmark and releases the JBB-Behaviors evaluation data, evaluation framework, artifacts, and leaderboard.",
    venue: "NeurIPS 2024",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/JailbreakBench/jailbreakbench",
      },
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2404.01318",
      },
      {
        label: "Hugging Face",
        href: "https://huggingface.co/datasets/JailbreakBench/JBB-Behaviors",
      },
      {
        label: "Source survey",
        href: "https://arxiv.org/abs/2502.05206",
      },
    ],
    stats: [
      {
        label: "Recorded scale",
        value: "200 harmful and benign behaviors",
      },
    ],
    tags: [
      "jailbreak",
    ],
    authors: [
      "Patrick Chao",
      "Edoardo Debenedetti",
      "Alexander Robey",
      "Maksym Andriushchenko",
      "Francesco Croce",
      "Vikash Sehwag",
    ],
    authorCount: 12,
    posted: "2024-03-28",
    arxivId: "2404.01318",
    repo: "JailbreakBench/jailbreakbench",
    license: "MIT",
    language: "Python",
    stars: 654,
    forks: 76,
    updated: "2025-04-04",
    pending: [],
    dataset: {
      text: "JBB-Behaviors — 200 distinct benign and misuse behaviours, curated with reference to OpenAI's usage policies and partly sourced from AdvBench and HarmBench. The paper describes the original 100-behaviour misuse set.",
      source: "Project README and paper abstract",
    },
    metrics: {
      items: [
        "Attack success rate under a clearly defined threat model, with fixed system prompts and chat templates",
        "Scored by jailbreak and refusal judges shipped with the package",
      ],
      source: "Project README and paper abstract",
    },
    baselines: {
      text: "An evolving repository of submitted jailbreak artifacts — adversarial prompts from prior attacks — so new algorithms can be compared against a stable reference.",
      source: "Project README",
    },
    externalLeaderboard: {
      url: "https://jailbreakbench.github.io/",
      label: "Official JailbreakBench leaderboard",
      source: "Project README",
    },
  },
};

export const leaderboards: { title: string; subtitle: string; directory: RankingDirectoryRecord[]; tables: LeaderboardTable[] } = {
  title: "Adversarial Robustness Leaderboards",
  subtitle: "Open trustworthiness and safety leaderboards for LLMs, Agents, and Embodied AI.",
  directory: [
    {
      name: "HarmActionsEval",
      type: "Agent Safety",
      focus: "Safety of autonomous agents operating with powerful toolsets.",
      focusZh: "评估拥有高权限工具集的自主智能体是否会执行有害操作。",
      metric: "SafeActions@1 ↑",
      metricZh: "SafeActions@1 ↑",
      snapshotDate: "March 2026",
      results: [
        {
          rank: 1,
          name: "Qwen3.5-397B-A17B",
          detail: "Alibaba Cloud",
          value: "23.40%",
        },
        {
          rank: 2,
          name: "GPT-5.3",
          detail: "OpenAI",
          value: "12.77%",
        },
        {
          rank: 3,
          name: "Claude Sonnet 4.6",
          detail: "Anthropic",
          value: "2.84%",
        },
      ],
      url: "https://agent-leaderboard.github.io/",
      source: "https://raw.githubusercontent.com/agent-leaderboard/agent-leaderboard.github.io/main/index.html",
      links: [
        {
          label: "Live leaderboard",
          labelZh: "实时排行榜",
          url: "https://agent-leaderboard.github.io/",
        },
        {
          label: "Official source",
          labelZh: "官方数据源",
          url: "https://github.com/agent-leaderboard/agent-leaderboard.github.io",
        },
      ],
      verificationNote: "The official HarmActionsEval page publishes a model leaderboard using SafeActions@1 and labels the snapshot as updated in March 2026.",
    },
    {
      name: "TrustLLM — Safety",
      type: "LLM Safety",
      focus: "Trustworthiness evaluation across jailbreak, toxicity, misuse, and exaggerated-safety dimensions.",
      focusZh: "从越狱、毒性、滥用和过度安全等维度评估大语言模型可信性。",
      metric: "Jailbreak ↑",
      metricZh: "Jailbreak ↑",
      snapshotDate: "Source checked 2026-08-20",
      results: [
        {
          rank: 1,
          name: "Llama2-70B",
          value: "0.974",
        },
        {
          rank: 2,
          name: "Llama2-13B",
          value: "0.959",
        },
        {
          rank: 3,
          name: "ERNIE",
          value: "0.949",
        },
      ],
      url: "https://trustllmbenchmark.github.io/TrustLLM-Website/leaderboard.html#safety",
      source: "https://raw.githubusercontent.com/TrustLLMBenchmark/TrustLLM-Website/main/js/leaderboard/leaderboard-data.js",
      links: [
        {
          label: "Live leaderboard",
          labelZh: "实时排行榜",
          url: "https://trustllmbenchmark.github.io/TrustLLM-Website/leaderboard.html#safety",
        },
        {
          label: "Official source",
          labelZh: "官方数据源",
          url: "https://github.com/TrustLLMBenchmark/TrustLLM-Website",
        },
      ],
      verificationNote: "The official TrustLLM leaderboard reports several safety metrics. This card ranks only the published Jailbreak metric, where the page states that higher values are better.",
    },
    {
      name: "TrustLLM — Fairness",
      type: "Fairness",
      focus: "Fairness evaluation covering stereotype recognition, agreement, disparagement, and preference behavior.",
      focusZh: "覆盖刻板印象识别、赞同倾向、贬损行为与偏好表现的公平性评估。",
      metric: "Stereotype Recognition ↑",
      metricZh: "刻板印象识别 ↑",
      snapshotDate: "Source checked 2026-08-20",
      results: [
        {
          rank: 1,
          name: "Llama3-70B",
          value: "0.726",
        },
        {
          rank: 2,
          name: "GPT-4",
          value: "0.656",
        },
        {
          rank: 3,
          name: "PaLM2",
          value: "0.634",
        },
      ],
      url: "https://trustllmbenchmark.github.io/TrustLLM-Website/leaderboard.html#fairness",
      source: "https://raw.githubusercontent.com/TrustLLMBenchmark/TrustLLM-Website/main/js/leaderboard/leaderboard-data.js",
      links: [
        {
          label: "Live leaderboard",
          labelZh: "实时排行榜",
          url: "https://trustllmbenchmark.github.io/TrustLLM-Website/leaderboard.html#fairness",
        },
        {
          label: "Official source",
          labelZh: "官方数据源",
          url: "https://github.com/TrustLLMBenchmark/TrustLLM-Website",
        },
      ],
      verificationNote: "The official TrustLLM leaderboard publishes multiple fairness metrics rather than one composite score. This card ranks only Stereotype Recognition, where higher values are better.",
    },
  ],
  tables: [
    {
      id: "black-box",
      label: "Black-box",
      columns: {
        model: "Model Name",
        link: "Link",
        count: "Downloads",
        scoreGroup: "Adversarial Safety",
        scoreA: "Domain Dataset",
        scoreB: "CC1M-Adv",
        rank: "Rank",
      },
      boards: [
        {
          title: "Image Classification - ImageNet",
          rows: [
            {
              rank: "1",
              model: "coatnet_rmlp_nano_rw_384.sw_in1k",
              link: "https://huggingface.co/timm/coatnet_rmlp_2_rw_384.sw_in12k_ft_in1k",
              count: 764,
              scoreA: "67.49%",
              scoreB: "31.58%",
            },
            {
              rank: "2",
              model: "coatnet_rmlp_nano_rw_224.sw_in1k",
              link: "https://huggingface.co/timm/coatnet_rmlp_nano_rw_224.sw_in1k",
              count: 467,
              scoreA: "52.75%",
              scoreB: "29.14%",
            },
            {
              rank: "3",
              model: "davit_base.msft_in1k",
              link: "https://huggingface.co/timm/davit_base.msft_in1k",
              count: 1720,
              scoreA: "83.25%",
              scoreB: "38.06%",
            },
            {
              rank: "4",
              model: "resnet50.a1_in1k",
              link: "https://huggingface.co/timm/resnet50.a1_in1k",
              count: 9271420,
              scoreA: "35.09%",
              scoreB: "14.61%",
            },
            {
              rank: "5",
              model: "vit_small_patch16_224.augreg_in21k_ft_in1k",
              link: "https://huggingface.co/timm/vit_base_patch16_224.augreg2_in21k_ft_in1k",
              count: 546023,
              scoreA: "32.62%",
              scoreB: "27.21%",
            },
            {
              rank: "6",
              model: "resnet18.a1_in1k",
              link: "https://huggingface.co/timm/resnet18.a1_in1k",
              count: 872296,
              scoreA: "27.11%",
              scoreB: "14.91%",
            },
            {
              rank: "7",
              model: "resnet18.fb_swsl_ig1b_ft_in1k",
              link: "https://huggingface.co/timm/resnet18.fb_swsl_ig1b_ft_in1k",
              count: 207942,
              scoreA: "24.59%",
              scoreB: "12.14%",
            },
            {
              rank: "8",
              model: "mobilenetv3_large_100.ra_in1k",
              link: "https://huggingface.co/timm/mobilenetv3_large_100.ra_in1k",
              count: 408002,
              scoreA: "23.82%",
              scoreB: "12.28%",
            },
            {
              rank: "9",
              model: "efficientnet_b3.ra2_in1k",
              link: "https://huggingface.co/timm/efficientnet_b3.ra2_in1k",
              count: 2391229,
              scoreA: "11.30%",
              scoreB: "8.18%",
            },
            {
              rank: "10",
              model: "tf_mobilenetv3_small_minimal_100.in1k",
              link: "https://huggingface.co/timm/tf_mobilenetv3_large_minimal_100.in1k",
              count: 783520,
              scoreA: "8.99%",
              scoreB: "24.83%",
            },
          ],
        },
        {
          title: "Object Detection - COCO",
          rows: [
            {
              rank: "1",
              model: "atss_swin-l-p4-w12_fpn_dyhead_mstrain_2x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/DyHead?athId=b19bf998702a943f70e46d53b1054e51&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 646,
              scoreA: "0.447",
              scoreB: "0.6943",
            },
            {
              rank: "2",
              model: "yolox_x_8x8_300e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/YOLOX?athId=e0fd346d0ae014efd2de972e6df9dea8&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 5152,
              scoreA: "0.426",
              scoreB: "0.7675",
            },
            {
              rank: "3",
              model: "deformable-detr(deformable_detr_refine_r50_16x2_50e_coco)",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20DETR?athId=45f3fa81f746aef44a5b0eb2eacb16c1&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 6510,
              scoreA: "0.286",
              scoreB: "0.6812",
            },
            {
              rank: "4",
              model: "faster_rcnn_x101_64x4d_fpn_1x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Faster%20R-CNN?athId=6e1c4a83606f2a559343d2c69c93d10f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 50486,
              scoreA: "0.28",
              scoreB: "0.7185",
            },
            {
              rank: "5",
              model: "deformable_detr_r50_16x2_50e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20DETR?athId=45f3fa81f746aef44a5b0eb2eacb16c1&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 5414,
              scoreA: "0.276",
              scoreB: "0.6627",
            },
            {
              rank: "6",
              model: "cascade_mask_rcnn_r50_fpn_20e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 1505,
              scoreA: "0.257",
              scoreB: "0.7193",
            },
            {
              rank: "7",
              model: "gfl_r50_fpn_1x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Generalized%20Focal%20Loss?athId=d5b8ec1f0fa4ca080d1be245181c200d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 1190,
              scoreA: "0.246",
              scoreB: "0.6724",
            },
            {
              rank: "8",
              model: "detr-resnet-50(detr_r50_8x2_150e_coco)",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/DETR?athId=b609e23c7b56f32054cf4a85c0ef9c01&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 566289,
              scoreA: "0.241",
              scoreB: "0.6384",
            },
            {
              rank: "9",
              model: "faster_rcnn_r50_caffe_c4_1x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Faster%20R-CNN?athId=6e1c4a83606f2a559343d2c69c93d10f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 50486,
              scoreA: "0.214",
              scoreB: "0.6946",
            },
            {
              rank: "10",
              model: "yolox_tiny_8x8_300e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/YOLOX?athId=e0fd346d0ae014efd2de972e6df9dea8&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Object%20Detection",
              count: 5152,
              scoreA: "0.182",
              scoreB: "0.6965",
            },
          ],
        },
        {
          title: "Instance Segmentation - COCO",
          rows: [
            {
              rank: "1",
              model: "htc_x101_64x4d_fpn_dconv_c3-c5_mstrain_400_1400_16x1_20e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/HTC?athId=b42170f82908262275e7328643dcdb2f&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 1559,
              scoreA: "0.334",
              scoreB: "0.6576",
            },
            {
              rank: "2",
              model: "cascade_mask_rcnn_convnext-s_p4_w7_fpn_giou_4conv1f_fp16_ms-crop_3x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 1505,
              scoreA: "0.332",
              scoreB: "0.6814",
            },
            {
              rank: "3",
              model: "scnet_x101_64x4d_fpn_20e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/SCNet?athId=17226ceb499bc933e2b73dd6633bbc2d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 90,
              scoreA: "0.297",
              scoreB: "0.6143",
            },
            {
              rank: "4",
              model: "cascade_mask_rcnn_x101_32x4d_fpn_dconv_c3-c5_1x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20Convolutional%20Networks?athId=4aefab1107c2b0c71c3c091cc39b721d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 1505,
              scoreA: "0.287",
              scoreB: "0.6733",
            },
            {
              rank: "5",
              model: "cascade_mask_rcnn_x101_64x4d_fpn_mstrain_3x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 1505,
              scoreA: "0.264",
              scoreB: "0.6536",
            },
            {
              rank: "6",
              model: "cascade_mask_rcnn_r50_fpn_dconv_c3-c5_1x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Deformable%20Convolutional%20Networks?athId=4aefab1107c2b0c71c3c091cc39b721d&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 1505,
              scoreA: "0.26",
              scoreB: "0.6541",
            },
            {
              rank: "7",
              model: "rfnext_search_cascade_mask_rcnn_hrnetv2p_w18_20e_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/RF-Next?athId=e99ac3889efff20e6fe2e8ac4ed9bc25&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 37,
              scoreA: "0.236",
              scoreB: "0.6474",
            },
            {
              rank: "8",
              model: "cascade_mask_rcnn_r50_caffe_fpn_1x_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/Cascade%20Mask%20R-CNN?athId=0ec20d0f9d5914e4422d251f2ddf247b&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 1505,
              scoreA: "0.219",
              scoreB: "0.6275",
            },
            {
              rank: "9",
              model: "yolact_r101_1x8_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/YOLACT?athId=1c39dd15015b6452c3f753766ddb5278&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 2569,
              scoreA: "0.201",
              scoreB: "0.6253",
            },
            {
              rank: "10",
              model: "yolact_r50_8x8_coco",
              link: "https://platform.openmmlab.com/modelzoo/mmdetection/YOLACT?athId=1c39dd15015b6452c3f753766ddb5278&repo=mmdetection&repoNameId=a4e3d984ec9475ca950bb6baf2b2a8e2&task=Instance%20Segmentation",
              count: 2569,
              scoreA: "0.178",
              scoreB: "0.6045",
            },
          ],
        },
        {
          title: "Semantic Segmentation - ADE20K",
          rows: [
            {
              rank: "1",
              model: "knet_s3_upernet_swin-l_8x2_512x512_adamw_80k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/KNet?athId=36dcc0bba02bb32f43af76a927e050cf&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 343,
              scoreA: "42.31",
              scoreB: "0.6286",
            },
            {
              rank: "2",
              model: "upernet_swin_large_patch4_window12_512x512_pretrain_384x384_22K_160k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/UPerNet?athId=6eedb26553f6ddb295adee667149f722&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 1967,
              scoreA: "40.35",
              scoreB: "0.5528",
            },
            {
              rank: "3",
              model: "segformer_mit-b4_512x512_160k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/Segformer?athId=94937aa281ea263f6484a359dfa3ec4b&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 4600,
              scoreA: "36.88",
              scoreB: "0.4756",
            },
            {
              rank: "4",
              model: "setr_mla_512x512_160k_b16_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/SETR?athId=a0088b8a1527ee3e20b6241c2b66b496&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 3437,
              scoreA: "36.67",
              scoreB: "0.5365",
            },
            {
              rank: "5",
              model: "twins_svt-b_fpn_fpnhead_8x4_512x512_80k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/FPN?athId=7f617fa591d3dfd31fb2a9a7cc0ae8ba&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 1503,
              scoreA: "31.82",
              scoreB: "0.5073",
            },
            {
              rank: "6",
              model: "dpt_vit-b16_512x512_160k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/DPT?athId=b2c699d0fddf59a4e952cecea08b1b8b&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 1813,
              scoreA: "30.61",
              scoreB: "0.4642",
            },
            {
              rank: "7",
              model: "deeplabv3_r101-d8_512x512_160k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/DeepLabV3?athId=6f315fcddecd0407b37cae1346078876&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 11112,
              scoreA: "30.4",
              scoreB: "0.4265",
            },
            {
              rank: "8",
              model: "fcn_hr48_512x512_160k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/FCN?athId=9cb4ee8cc5fee1e37d4418259aa76d81&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 52662,
              scoreA: "27.4",
              scoreB: "0.4143",
            },
            {
              rank: "9",
              model: "dnl_r50-d8_4xb4-160k_ade20k-512x512",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/DNLNet?athId=e7a94769be0d3a1b41a6e067db8e0f5d&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 375,
              scoreA: "26.3",
              scoreB: "0.4419",
            },
            {
              rank: "10",
              model: "segmenter_vit-b_mask_8x1_512x512_160k_ade20k",
              link: "https://platform.openmmlab.com/modelzoo/mmsegmentation/Segmenter?athId=0a8f2e1dccdce40c26a35ebe5b074f36&repo=mmsegmentation&repoNameId=aa8108d30b48600d2dd34b4b6ef93112&task=Semantic%20Segmentation",
              count: 1845,
              scoreA: "22.29",
              scoreB: "0.6068",
            },
          ],
        },
        {
          title: "Medical Image Classification - CheXpert",
          rows: [
            {
              rank: "1",
              model: "CheXpert-5-convnextv2-tiny-384",
              link: "https://huggingface.co/shreydan/CheXpert-5-convnextv2-tiny-384",
              count: 14,
              scoreA: "67.04%",
              scoreB: "56.60%",
            },
            {
              rank: "2",
              model: "vit_small_patch16_224.medmae_CXR_mae_ft_CheXpert",
              link: "https://huggingface.co/1aurent/vit_small_patch16_224.medmae_CXR_mae_ft_CheXpert",
              count: 2,
              scoreA: "66.92%",
              scoreB: "89.74%",
            },
            {
              rank: "3",
              model: "vit_base_patch16_224.medmae_CXR_mae_ft_CheXpert",
              link: "https://huggingface.co/1aurent/vit_base_patch16_224.medmae_CXR_mae_ft_CheXpert/tree/main",
              count: 4,
              scoreA: "57.58%",
              scoreB: "89.39%",
            },
          ],
        },
      ],
    },
    {
      id: "white-box",
      label: "White-box",
      columns: {
        model: "Model Name",
        link: "Paper",
        count: "Citations",
        scoreGroup: "Evaluation Result",
        scoreA: "Clean Acc",
        scoreB: "Robust Acc",
        rank: "Rank",
      },
      boards: [
        {
          title: "CIFAR-10",
          rows: [
            {
              rank: "1",
              model: "RaWideResNet-70-16",
              link: "https://arxiv.org/abs/2308.16258",
              count: 38,
              scoreA: "93.27%",
              scoreB: "71.10%",
            },
            {
              rank: "2",
              model: "WideResNet-70-16",
              link: "https://arxiv.org/abs/2302.04638",
              count: 194,
              scoreA: "93.25%",
              scoreB: "70.70%",
            },
            {
              rank: "3",
              model: "ResNet-152 + WideResNet-70-16 + mixing network",
              link: "https://arxiv.org/abs/2301.12554",
              count: 13,
              scoreA: "95.23%",
              scoreB: "68.06%",
            },
            {
              rank: "4",
              model: "WideResNet-28-10",
              link: "https://arxiv.org/abs/2305.13948",
              count: 34,
              scoreA: "92.16%",
              scoreB: "67.75%",
            },
            {
              rank: "5",
              model: "WideResNet-28-10",
              link: "https://arxiv.org/abs/2305.13948",
              count: 194,
              scoreA: "92.44%",
              scoreB: "67.31%",
            },
            {
              rank: "6",
              model: "WideResNet-70-16",
              link: "https://arxiv.org/abs/2302.04638",
              count: 285,
              scoreA: "92.23%",
              scoreB: "66.59%",
            },
            {
              rank: "7",
              model: "WideResNet-70-16",
              link: "https://arxiv.org/abs/2110.09468",
              count: 287,
              scoreA: "88.74%",
              scoreB: "66.14%",
            },
            {
              rank: "8",
              model: "WideResNet-70-16",
              link: "https://arxiv.org/abs/2010.03593",
              count: 345,
              scoreA: "91.10%",
              scoreB: "65.89%",
            },
            {
              rank: "9",
              model: "WideResNet-A4",
              link: "https://arxiv.org/abs/2212.11005",
              count: 38,
              scoreA: "91.59%",
              scoreB: "65.78%",
            },
            {
              rank: "10",
              model: "WideResNet-106-16",
              link: "https://arxiv.org/abs/2103.01946",
              count: 285,
              scoreA: "88.50%",
              scoreB: "64.68%",
            },
          ],
        },
        {
          title: "CIFAR-100",
          rows: [
            {
              rank: "1",
              model: "WideResNet-70-16",
              count: 194,
              scoreA: "75.23%",
              scoreB: "42.83%",
            },
            {
              rank: "2",
              model: "WideResNet-28-10",
              count: 34,
              scoreA: "73.83%",
              scoreB: "39.39%",
            },
            {
              rank: "3",
              model: "WideResNet-28-10",
              count: 194,
              scoreA: "72.58%",
              scoreB: "38.92%",
            },
            {
              rank: "4",
              model: "WideResNet-70-16",
              count: 345,
              scoreA: "69.15%",
              scoreB: "37.20%",
            },
            {
              rank: "5",
              model: "XCiT-L12",
              count: 56,
              scoreA: "70.77%",
              scoreB: "35.27%",
            },
            {
              rank: "6",
              model: "WideResNet-70-16",
              count: 285,
              scoreA: "63.56%",
              scoreB: "34.74%",
            },
            {
              rank: "7",
              model: "XCiT-M12",
              count: 56,
              scoreA: "69.20%",
              scoreB: "34.33%",
            },
            {
              rank: "8",
              model: "WideResNet-70-16",
              count: 136,
              scoreA: "65.56%",
              scoreB: "33.14%",
            },
          ],
        },
        {
          title: "ImageNet-1k",
          rows: [
            {
              rank: "1",
              model: "ConvNeXtV2-L + Swin-L",
              count: 2,
              scoreA: "81.10%",
              scoreB: "58.65%",
            },
            {
              rank: "2",
              model: "Swin-L",
              count: 57,
              scoreA: "78.18%",
              scoreB: "57.35%",
            },
            {
              rank: "3",
              model: "ConvNeXt-L",
              count: 57,
              scoreA: "77.48%",
              scoreB: "56.53%",
            },
            {
              rank: "4",
              model: "ConvNeXt-L + ConvStem",
              count: 48,
              scoreA: "76.79%",
              scoreB: "55.94%",
            },
            {
              rank: "5",
              model: "Swin-B",
              count: 57,
              scoreA: "76.22%",
              scoreB: "54.41%",
            },
            {
              rank: "6",
              model: "ConvNeXt-B",
              count: 57,
              scoreA: "76.38%",
              scoreB: "54.13%",
            },
            {
              rank: "7",
              model: "ConvNeXt-B + ConvStem",
              count: 48,
              scoreA: "75.46%",
              scoreB: "53.94%",
            },
            {
              rank: "8",
              model: "ViT-B + ConvStem",
              count: 48,
              scoreA: "76.12%",
              scoreB: "52.82%",
            },
            {
              rank: "9",
              model: "ConvNeXt-S + ConvStem",
              count: 48,
              scoreA: "73.37%",
              scoreB: "49.74%",
            },
            {
              rank: "10",
              model: "RaWideResNet-101-2",
              count: 38,
              scoreA: "73.45%",
              scoreB: "49.06%",
            },
            {
              rank: "11",
              model: "ConvNeXt-T + ConvStem",
              count: 48,
              scoreA: "72.45%",
              scoreB: "47.70%",
            },
          ],
        },
        {
          title: "CC1M",
          rows: [
            {
              rank: "1",
              model: "ConvNeXt-L + ConvStem",
              count: 48,
              scoreA: "100%",
              scoreB: "18.17%",
            },
            {
              rank: "2",
              model: "ConvNeXtV2-L + Swin-L",
              count: 2,
              scoreA: "100%",
              scoreB: "17.56%",
            },
            {
              rank: "3",
              model: "Swin-L",
              count: 57,
              scoreA: "100%",
              scoreB: "17.23%",
            },
            {
              rank: "4",
              model: "ConvNeXt-L",
              count: 57,
              scoreA: "100%",
              scoreB: "17.13%",
            },
            {
              rank: "5",
              model: "Swin-B",
              count: 57,
              scoreA: "100%",
              scoreB: "16.78%",
            },
          ],
        },
      ],
    },
  ],
};

export const arenaDirectory: RankingDirectoryRecord[] = [
  {
    name: "Gray Swan Arena",
    type: "Agent Safety",
    focus: "Indirect-prompt-injection robustness across tool-use, coding, and computer-use agents.",
    focusZh: "评估工具调用、编程与计算机操作智能体对间接提示注入的鲁棒性。",
    metric: "Attack Success Rate ↓",
    metricZh: "攻击成功率 ↓",
    snapshotDate: "March 2026",
    results: [
      {
        rank: 1,
        name: "Claude Opus 4.5",
        value: "0.5%",
      },
      {
        rank: 2,
        name: "Claude Sonnet 4.5",
        value: "1.0%",
      },
      {
        rank: 3,
        name: "Claude Haiku 4.5",
        value: "1.3%",
      },
    ],
    url: "https://app.grayswan.ai/arena",
    source: "https://www.grayswan.ai/blog/your-ai-agent-can-be-compromised-youd-never-know",
    links: [
      {
        label: "Live arena",
        labelZh: "实时竞技场",
        url: "https://app.grayswan.ai/arena",
      },
      {
        label: "Global ranking",
        labelZh: "全球排名",
        url: "https://app.grayswan.ai/arena/leaderboard/global",
      },
      {
        label: "Paper",
        labelZh: "论文",
        url: "https://arxiv.org/abs/2603.15714",
      },
      {
        label: "Benchmark code",
        labelZh: "评测代码",
        url: "https://github.com/GraySwanAI/ipi_arena_os",
      },
      {
        label: "Partial dataset",
        labelZh: "部分数据集",
        url: "https://huggingface.co/datasets/sureheremarv/ipi_arena_attacks",
      },
    ],
    verificationNote: "Gray Swan's official March 2026 IPI Arena results report attack success rates across 13 frontier models. Lower is better. The three lowest published rates are reproduced here; the Arena link opens the live Gray Swan application.",
  },
  {
    name: "CyberGym",
    type: "Cyber",
    focus: "Agents reproduce real-world vulnerabilities by generating working proofs of concept.",
    focusZh: "让智能体通过生成可运行的概念验证程序，复现真实世界漏洞。",
    metric: "Level 1 Success Rate ↑",
    metricZh: "Level 1 成功率 ↑",
    snapshotDate: "Source checked 2026-08-22",
    results: [
      {
        rank: 1,
        name: "Sangfor AI",
        detail: "DeepSeek-V4-Flash",
        value: "93.17%",
      },
      {
        rank: 2,
        name: "Whitzard (白泽)",
        detail: "DeepSeek-V4-Flash",
        value: "91.20%",
      },
      {
        rank: 3,
        name: "MDASH",
        detail: "GPT-5.4 · Claude Opus 4.6 · Claude Sonnet 4.6",
        value: "90.97%",
      },
      {
        rank: 4,
        name: "Wiz Atlas",
        detail: "GPT-5.5 · Claude Opus 4.6",
        value: "90.90%",
      },
      {
        rank: 5,
        name: "DoGNAVY",
        detail: "GLM-5.2",
        value: "90.84%",
      },
      {
        rank: 6,
        name: "Crystalline",
        detail: "Claude Opus 4.6",
        value: "89.60%",
      },
      {
        rank: 7,
        name: "RedbudAI",
        detail: "GLM-5.2",
        value: "86.26%",
      },
      {
        rank: 8,
        name: "OpenAI Agent",
        detail: "GPT-5.5-Cyber",
        value: "85.60%",
      },
      {
        rank: 9,
        name: "Velldepth Agent",
        detail: "XekRung",
        value: "85.34%",
      },
      {
        rank: 10,
        name: "Xuanwu Atuin AI",
        detail: "GLM-5.2",
        value: "84.80%",
      },
      {
        rank: 11,
        name: "Anthropic Agent",
        detail: "Claude Mythos Preview",
        value: "83.10%",
      },
      {
        rank: 12,
        name: "OpenAI Agent",
        detail: "GPT-5.5",
        value: "81.80%",
      },
    ],
    url: "https://cybergym.io/cybergym/#leaderboard",
    source: "https://cybergym.io/assets/data/cybergym.json",
    links: [
      {
        label: "Live leaderboard",
        labelZh: "实时排行榜",
        url: "https://cybergym.io/cybergym/#leaderboard",
      },
      {
        label: "Official result data",
        labelZh: "官方结果数据",
        url: "https://cybergym.io/assets/data/cybergym.json",
      },
      {
        label: "Benchmark overview",
        labelZh: "评测说明",
        url: "https://cybergym.io/cybergym/",
      },
    ],
    verificationNote: "CyberGym's official Level 1 leaderboard sorts submissions by score_10 and labels it Success Rate: the percentage of instances where an agent reproduces the target vulnerability with a working proof of concept.",
  },
  {
    name: "ExploitGym",
    type: "Cyber",
    focus: "Agents generate end-to-end exploits across userspace, browser V8, and the Linux kernel.",
    focusZh: "评估智能体在用户态、浏览器 V8 与 Linux 内核中生成端到端漏洞利用的能力。",
    metric: "Successful exploits ↑",
    metricZh: "成功漏洞利用数 ↑",
    snapshotDate: "Source checked 2026-08-22",
    results: [
      {
        rank: 1,
        name: "GPT-5.6 Sol (reasoning max)",
        detail: "Codex CLI · 6h timeout",
        value: "293",
      },
      {
        rank: 2,
        name: "Claude Mythos Preview",
        detail: "Claude Code · 2h timeout",
        value: "157",
      },
      {
        rank: 3,
        name: "GPT-5.5",
        detail: "Codex CLI · 2h timeout",
        value: "129",
      },
      {
        rank: 4,
        name: "GPT-5.4",
        detail: "Codex CLI · 2h timeout",
        value: "61",
      },
      {
        rank: 5,
        name: "Claude Opus 4.6",
        detail: "Claude Code · 2h timeout",
        value: "16",
      },
      {
        rank: 6,
        name: "Gemini 3.1 Pro",
        detail: "Gemini CLI · 2h timeout",
        value: "12",
      },
      {
        rank: 7,
        name: "Claude Opus 4.7",
        detail: "Claude Code · 2h timeout",
        value: "12",
      },
      {
        rank: 8,
        name: "Muse Spark 1.1 (helpful-only)",
        detail: "Meta Agent · 4h timeout",
        value: "7",
      },
      {
        rank: 9,
        name: "GLM-5.1",
        detail: "Claude Code · 2h timeout",
        value: "4",
      },
    ],
    url: "https://cybergym.io/exploitgym/#leaderboard",
    source: "https://cybergym.io/assets/data/exploitgym.json",
    links: [
      {
        label: "Live leaderboard",
        labelZh: "实时排行榜",
        url: "https://cybergym.io/exploitgym/#leaderboard",
      },
      {
        label: "Official result data",
        labelZh: "官方结果数据",
        url: "https://cybergym.io/assets/data/exploitgym.json",
      },
      {
        label: "Benchmark overview",
        labelZh: "评测说明",
        url: "https://cybergym.io/exploitgym/",
      },
    ],
    verificationNote: "ExploitGym's official leaderboard sorts by on_target: instances exploited through the intended vulnerability. Evaluation timeouts are retained on each row because the leading submission uses a longer budget.",
  },
];

export const arenaResults: ArenaResultSnapshot = {
  title: "Offensive cyber evaluations",
  titleZh: "进攻性网络安全评测",
  snapshotDate: "Published 2026-06-09",
  source: "https://www.anthropic.com/research/claude-fable-5-mythos-5",
  sourceLabel: "Anthropic results and metric definitions",
  sourceLabelZh: "Anthropic 结果与指标定义",
  note: "Values reproduced from Anthropic's published chart. Each benchmark uses a different metric, so compare models within a benchmark group rather than comparing benchmark groups with one another.",
  noteZh: "数值复现自 Anthropic 官方图表。四个评测使用的指标口径不同，应在同一评测组内比较模型，不宜直接横向比较不同评测组。",
  benchmarks: [
    {
      name: "Firefox",
      metric: "Trials achieving arbitrary code execution",
      metricZh: "实现任意代码执行的试验占比",
    },
    {
      name: "OSS-Fuzz",
      metric: "Severity-weighted five-tier score",
      metricZh: "按严重程度加权的五级得分",
    },
    {
      name: "CyberGym",
      metric: "Target vulnerability reproduction rate",
      metricZh: "目标漏洞复现率",
    },
    {
      name: "CyScenarioBench",
      metric: "Mean success rate across challenges",
      metricZh: "各挑战的平均成功率",
    },
  ],
  series: [
    {
      name: "Claude Opus 4.8 (no safeguards)",
      nameZh: "Claude Opus 4.8（无安全护栏）",
      color: "#58c8a0",
      values: [
        8.8,
        15.9,
        78.1,
        16.6,
      ],
    },
    {
      name: "Claude Opus 4.8 (default safeguards)",
      nameZh: "Claude Opus 4.8（默认安全护栏）",
      color: "#11976e",
      values: [
        undefined,
        3.8,
        0.8,
        undefined,
      ],
    },
    {
      name: "Claude Mythos Preview",
      nameZh: "Claude Mythos Preview",
      color: "#2f7bd2",
      values: [
        70.8,
        22.8,
        83.1,
        29.2,
      ],
    },
    {
      name: "Claude Mythos 5",
      nameZh: "Claude Mythos 5",
      color: "#df70a2",
      values: [
        88.4,
        24.0,
        83.8,
        38.7,
      ],
    },
    {
      name: "Claude Fable 5",
      nameZh: "Claude Fable 5",
      color: "#f2672c",
      values: [
        0.0,
        0.0,
        0.0,
        0.0,
      ],
    },
  ],
};

export const textArenaOverview: TextArenaOverview = {
  title: "Text Arena Overview",
  titleZh: "文本竞技场总览",
  snapshotDate: "2026-08-21",
  source: "https://arena.ai/leaderboard/text",
  sourceLabel: "Open the full Arena Text leaderboard",
  sourceLabelZh: "打开完整 Arena 文本排行榜",
  note: "Top ten models by overall rank. Category placements are reproduced from the official Arena Text overview snapshot supplied on 2026-08-21; a dash means that the source displayed no rank.",
  noteZh: "按总榜名次展示前十个模型。分类名次复现自 2026-08-21 提供的 Arena 官方文本总览快照；破折号表示来源未显示名次。",
  columns: [
    {
      key: "overall",
      label: "Overall",
      labelZh: "总榜",
    },
    {
      key: "expert",
      label: "Expert",
      labelZh: "专家",
    },
    {
      key: "hard-prompts",
      label: "Hard Prompts",
      labelZh: "高难提示",
    },
    {
      key: "coding",
      label: "Coding",
      labelZh: "编程",
    },
    {
      key: "math",
      label: "Math",
      labelZh: "数学",
    },
    {
      key: "creative-writing",
      label: "Creative Writing",
      labelZh: "创意写作",
    },
    {
      key: "instruction-following",
      label: "Instruction Following",
      labelZh: "指令遵循",
    },
    {
      key: "longer-query",
      label: "Longer Query",
      labelZh: "长问题",
    },
  ],
  rows: [
    {
      model: "claude-fable-5",
      ranks: [
        1,
        1,
        2,
        3,
        2,
        1,
        2,
        2,
      ],
    },
    {
      model: "claude-opus-4-6-high",
      ranks: [
        2,
        2,
        1,
        1,
        5,
        2,
        1,
        1,
      ],
    },
    {
      model: "claude-opus-4-7-high",
      ranks: [
        3,
        6,
        4,
        2,
        9,
        4,
        3,
        4,
      ],
    },
    {
      model: "muse-spark-1.2 (xHigh)",
      ranks: [
        4,
        34,
        10,
        10,
        undefined,
        29,
        16,
        12,
      ],
    },
    {
      model: "claude-opus-4-6",
      ranks: [
        5,
        4,
        3,
        5,
        7,
        8,
        4,
        3,
      ],
    },
    {
      model: "claude-opus-4-7",
      ranks: [
        6,
        5,
        6,
        4,
        16,
        6,
        7,
        6,
      ],
    },
    {
      model: "claude-opus-5-high",
      ranks: [
        7,
        3,
        5,
        9,
        3,
        10,
        5,
        5,
      ],
    },
    {
      model: "muse-spark-1.1",
      ranks: [
        8,
        25,
        11,
        13,
        13,
        40,
        22,
        40,
      ],
    },
    {
      model: "gemini-3.7-flash-high",
      ranks: [
        9,
        13,
        12,
        21,
        4,
        3,
        9,
        13,
      ],
    },
    {
      model: "kimi-k3-max",
      ranks: [
        10,
        11,
        7,
        6,
        11,
        24,
        10,
        8,
      ],
    },
  ],
};

export const codeArenaOverview: CodeArenaOverview = {
  schemaVersion: 1,
  snapshotDate: "2026-08-19",
  title: "Code Arena snapshot",
  titleZh: "代码竞技场快照",
  category: "WebDev · Overall",
  categoryZh: "WebDev · 总榜",
  description: "Official Arena rankings for front-end web development tasks, including agentic coding workflows that require multi-step reasoning and tool use.",
  descriptionZh: "Arena 官方前端网页开发排行榜，涵盖需要多步推理与工具使用的智能体编程工作流。",
  source: "https://arena.ai/leaderboard/code",
  sourceLabel: "Open the full Code Arena leaderboard",
  sourceLabelZh: "打开完整 Code Arena 排行榜",
  priceNote: "Blended price is calculated from the official input/output prices as (3 × input + output) ÷ 4, matching the 3:1 input-to-output ratio used by the comparison plot.",
  priceNoteZh: "综合价格按官方输入/输出价格计算：(3 × 输入价 + 输出价) ÷ 4，与对比图采用的 3:1 输入输出比例一致。",
  note: "Top ten models shown on the official Code Arena WebDev overall table on 2026-08-19. Scores and prices are a static source snapshot; preliminary labels remain recorded below.",
  noteZh: "数据取自 2026-08-19 Arena 官方 Code Arena WebDev 总榜前十。评分和价格为静态来源快照；官方标为 Preliminary 的模型在数据中保留该状态。",
  models: [
    {
      rank: 1,
      name: "claude-opus-5-max",
      lab: "Anthropic",
      score: 1691,
      inputPrice: 5,
      outputPrice: 25,
    },
    {
      rank: 2,
      name: "kimi-k3-max",
      lab: "Moonshot",
      score: 1674,
      inputPrice: 3,
      outputPrice: 15,
    },
    {
      rank: 3,
      name: "qwen3.8-max",
      lab: "Alibaba",
      score: 1669,
      inputPrice: 2,
      outputPrice: 6,
      preliminary: true,
    },
    {
      rank: 4,
      name: "claude-opus-5-high",
      lab: "Anthropic",
      score: 1662,
      inputPrice: 5,
      outputPrice: 25,
    },
    {
      rank: 5,
      name: "grok-4.6-high",
      lab: "SpaceXAI",
      score: 1629,
      inputPrice: 2,
      outputPrice: 6,
      preliminary: true,
    },
    {
      rank: 6,
      name: "claude-fable-5",
      lab: "Anthropic",
      score: 1626,
      inputPrice: 10,
      outputPrice: 50,
    },
    {
      rank: 7,
      name: "gpt-5.6-sol-xhigh (codex-harness)",
      lab: "OpenAI",
      score: 1619,
      inputPrice: 5,
      outputPrice: 30,
    },
    {
      rank: 8,
      name: "glm-5.3-max",
      lab: "Z.ai",
      score: 1597,
      inputPrice: 1.4,
      outputPrice: 4.4,
    },
    {
      rank: 9,
      name: "gemini-3.7-flash-high",
      lab: "Google",
      score: 1588,
      inputPrice: 0.75,
      outputPrice: 3.57,
      preliminary: true,
    },
    {
      rank: 10,
      name: "deepseek-v4-pro-high-20260813",
      lab: "DeepSeek",
      score: 1582,
      inputPrice: 1.32,
      outputPrice: 3.96,
    },
  ],
};

export const subpageConfigs: Record<string, SubpageConfig> = {
  benchmarks: {
    slug: "benchmarks",
    breadcrumb: [
      "Home",
      "Resources",
      "Benchmarks",
    ],
    title: "Benchmarks",
    heroIcon: "◎",
    description: "Open-source safety benchmarks for evaluating LLMs, Agents, and Embodied AI.",
    overview: "Legacy OpenTAI benchmark rows are excluded. Names, years, recorded scale, papers, and release links are shown only when the approved sources support them.",
    tableTitle: "Benchmark platforms",
    sectionTitle: "Benchmark categories",
    categories: [
      {
        title: "LLMs",
        detail: "Safety, jailbreak and alignment evaluation for language models.",
        accent: "pink",
        filters: [
          "LLMs",
        ],
      },
      {
        title: "Agents",
        detail: "Prompt injection, tool misuse and environment safety for LLM agents.",
        accent: "orange",
        filters: [
          "Agents",
        ],
      },
      {
        title: "Embodied AI",
        detail: "Safety evaluation for perception, planning and robot control.",
        accent: "green",
        filters: [
          "Embodied AI",
        ],
      },
    ],
    tableRows: [
      {
        name: "BIPIA",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: IPI attacks.",
        type: "Agents",
        year: "2023",
        stars: 154,
        updated: "2024-04-15",
        tags: [
          "simulation-based benchmarks",
          "llm-security",
        ],
        stats: [
          {
            label: "Table year",
            value: "2023",
          },
          {
            label: "Recorded scale",
            value: "5 scenarios / 250 goals",
          },
        ],
        meta: "microsoft/BIPIA · NOASSERTION · 19 forks · since 2024",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2312.14197",
          },
          {
            label: "GitHub",
            href: "https://github.com/microsoft/BIPIA",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/microsoft/BIPIA/tree/main/benchmark",
          },
        ],
        citationOnly: true,
        slug: "bipia",
        domain: "Agents",
      },
      {
        name: "ToolEmu",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Emulated tool risks.",
        type: "Agents",
        year: "2023",
        tags: [
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2023",
          },
          {
            label: "Recorded scale",
            value: "36 tools / 144 cases",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2309.15817",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "toolemu",
        domain: "Agents",
      },
      {
        name: "InjecAgent",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Tool-integrated indirect prompt injection.",
        type: "Agents",
        year: "2024",
        stars: 157,
        tags: [
          "prompt injection",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "17 user tools / 62 attacker tools / 1,054 cases",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2403.02691",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/uiuc-kang-lab/InjecAgent",
          },
        ],
        citationOnly: true,
        slug: "injecagent",
        domain: "Agents",
        property: "Prompt Injection",
      },
      {
        name: "AgentDojo",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Third-party instructions.",
        type: "Agents",
        year: "2024",
        stars: 740,
        tags: [
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "97 tasks / 629 cases",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2406.13352",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/ethz-spylab/agentdojo",
          },
        ],
        citationOnly: true,
        slug: "agentdojo",
        domain: "Agents",
      },
      {
        name: "AgentHarm",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Harmful behaviors.",
        type: "Agents",
        year: "2024",
        downloads: 4338,
        stars: 1,
        updated: "2024-12-19",
        tags: [
          "harmful content",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "110 tasks / 11 categories",
          },
        ],
        meta: "ai-safety-institute/AgentHarm · OTHER · n<1K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.09024",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/AIEvals/AgentHarm",
          },
        ],
        citationOnly: true,
        slug: "agentharm",
        domain: "Agents",
        property: "Harmful Content",
      },
      {
        name: "RedCode",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Code vulnerabilities.",
        type: "Agents",
        year: "2024",
        stars: 87,
        tags: [
          "cybersecurity",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "4,000+ cases / 25 types",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2411.07781",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/AI-secure/RedCode",
          },
        ],
        citationOnly: true,
        slug: "redcode",
        domain: "Agents",
        property: "Cybersecurity",
      },
      {
        name: "VPI-Bench",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Visual prompt injections. The survey table records 2024; the repository list links the later arXiv record.",
        type: "Agents",
        year: "2024",
        tags: [
          "Computer-use",
          "prompt injection",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "306 cases / 5 platforms",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2506.02456",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "vpi-bench",
        domain: "Agents",
        property: "Prompt Injection",
      },
      {
        name: "R-Judge",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Risk identification from logs.",
        type: "Agents",
        year: "2024",
        stars: 109,
        tags: [
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "569 records / 27 scenarios",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2401.10019",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/Lordog/R-Judge",
          },
        ],
        citationOnly: true,
        slug: "r-judge",
        domain: "Agents",
      },
      {
        name: "SALAD-Bench",
        note: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper identifies SALAD-Bench as a safety benchmark for large language models.",
        type: "LLMs",
        venue: "ACL 2024",
        year: "2024",
        downloads: 1767,
        stars: 176,
        updated: "2026-07-23",
        tags: [
          "robustness",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "21K base questions / 16 tasks / 66 categories",
          },
          {
            label: "Table #Times",
            value: "36",
          },
        ],
        meta: "OpenSafetyLab/Salad-Data · APACHE-2.0 · 10K<n<100K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2402.05044",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/OpenSafetyLab/SALAD-BENCH",
          },
        ],
        citationOnly: true,
        slug: "salad-bench",
        domain: "LLMs",
        property: "Robustness",
      },
      {
        name: "h4rm3l",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Jailbreak attack synthesis.",
        type: "LLMs",
        year: "2024",
        stars: 28,
        tags: [
          "jailbreak",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "2,656 attacks",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2408.04811",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/mdoumbouya/h4rm3l",
          },
        ],
        citationOnly: true,
        slug: "h4rm3l",
        domain: "LLMs",
        property: "Jailbreak",
      },
      {
        name: "SG-Bench",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Safety generalization.",
        type: "Agents",
        year: "2024",
        stars: 26,
        tags: [
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "1,442 queries / 6 categories",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.21965",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/MurrayTom/SG-Bench",
          },
        ],
        citationOnly: true,
        slug: "sg-bench",
        domain: "Agents",
      },
      {
        name: "ChemSafetyBench",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Chemistry safety.",
        type: "Agents",
        year: "2024",
        tags: [
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "30K samples / 3 tasks",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2411.16736",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "chemsafetybench",
        domain: "Agents",
      },
      {
        name: "ToolSword",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Tool-use safety.",
        type: "Agents",
        year: "2024",
        stars: 15,
        tags: [
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "6 scenarios / 3 stages",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2402.10753",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/Junjie-Ye/ToolSword",
          },
        ],
        citationOnly: true,
        slug: "toolsword",
        domain: "Agents",
      },
      {
        name: "PrivacyLens",
        note: "Safety at Scale Table 14 lists this resource under Simulation-based Benchmarks. Evaluation focus: Privacy norm awareness.",
        type: "Agents",
        year: "2024",
        downloads: 317,
        stars: 48,
        updated: "2024-09-04",
        tags: [
          "privacy",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "493 seeds / vignettes / trajectories",
          },
        ],
        meta: "SALT-NLP/PrivacyLens · CC-BY-4.0 · n<1K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2409.00138",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/SALT-NLP/PrivacyLens",
          },
        ],
        citationOnly: true,
        slug: "privacylens",
        domain: "Agents",
        property: "Privacy",
      },
      {
        name: "SafeBench",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Driving safety.",
        type: "Embodied AI",
        year: "2022",
        stars: 155,
        tags: [
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2022",
          },
          {
            label: "Recorded scale",
            value: "8 scenarios / 100 routes / 2,352 cases",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2206.09682",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/trust-ai/SafeBench",
          },
        ],
        citationOnly: true,
        slug: "safebench",
        domain: "Embodied AI",
      },
      {
        name: "Agent Security Bench (ASB)",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Attack and defense across 10 scenarios.",
        type: "Agents",
        year: "2024",
        tags: [
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "400+ tools",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.02644",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "agent-security-bench-asb",
        domain: "Agents",
      },
      {
        name: "SafeAgentBench",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Embodied hazards.",
        type: "Embodied AI",
        year: "2024",
        stars: 75,
        tags: [
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "750 tasks",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2412.13178",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/shengyin1224/SafeAgentBench",
          },
        ],
        citationOnly: true,
        slug: "safeagentbench",
        domain: "Embodied AI",
      },
      {
        name: "Agent-SafetyBench",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Safety risks across 8 categories.",
        type: "Agents",
        year: "2024",
        downloads: 271,
        stars: 157,
        updated: "2025-08-11",
        tags: [
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "349 environments / 2,000 cases",
          },
        ],
        meta: "thu-coai/Agent-SafetyBench · MIT",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2412.14470",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/thu-coai/Agent-SafetyBench",
          },
        ],
        citationOnly: true,
        slug: "agent-safetybench",
        domain: "Agents",
      },
      {
        name: "AdvWeb / ARE",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Adversarial robustness for multimodal web agents. Safety at Scale Table 14 lists AdvWeb, Dissecting Adversarial, and ARE as separate labels, but all three bibliography records resolve to arXiv:2406.12814; this card avoids triple-counting the same paper.",
        type: "Agents",
        year: "2024",
        tags: [
          "Computer-use",
          "robustness",
          "real-interaction benchmarks",
          "advweb",
          "dissecting adversarial",
          "are",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "200 target tasks",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2406.12814",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "advweb-are",
        domain: "Agents",
        property: "Robustness",
      },
      {
        name: "ST-WebAgentBench",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Web safety and trustworthiness.",
        type: "Agents",
        year: "2024",
        downloads: 174,
        stars: 25,
        updated: "2026-03-12",
        tags: [
          "Computer-use",
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "222 tasks with safety and trustworthiness policies",
          },
        ],
        meta: "ST-WebAgentBench/st-webagentbench · APACHE-2.0 · 1K<n<10K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.06703",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/segev-shlomov/ST-WebAgentBench",
          },
        ],
        citationOnly: true,
        slug: "st-webagentbench",
        domain: "Agents",
      },
      {
        name: "Haicosystem",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Human-AI sandbox safety.",
        type: "Agents",
        year: "2024",
        stars: 14,
        tags: [
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "1,840 simulations / 92 scenarios",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2409.16427",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/XuhuiZhou/HAICosystem",
          },
        ],
        citationOnly: true,
        slug: "haicosystem",
        domain: "Agents",
      },
      {
        name: "WASP",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Adversarial web-agent safety.",
        type: "Agents",
        year: "2025",
        stars: 98,
        tags: [
          "Computer-use",
          "robustness",
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2025",
          },
          {
            label: "Recorded scale",
            value: "84 tasks / 42 scenarios / 2 environments",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2504.18575",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/facebookresearch/wasp",
          },
        ],
        citationOnly: true,
        slug: "wasp",
        domain: "Agents",
        property: "Robustness",
      },
      {
        name: "Refusal-Trained LLMs",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Browser jailbreaking.",
        type: "Agents",
        year: "2025",
        tags: [
          "Computer-use",
          "jailbreak",
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2025",
          },
          {
            label: "Recorded scale",
            value: "100 harmful behaviors",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.13886",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "refusal-trained-llms",
        domain: "Agents",
        property: "Jailbreak",
      },
      {
        name: "SafeArena",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Web-agent misuse.",
        type: "Agents",
        year: "2025",
        downloads: 132,
        stars: 24,
        updated: "2025-04-23",
        tags: [
          "Computer-use",
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2025",
          },
          {
            label: "Recorded scale",
            value: "500 safe and harmful tasks",
          },
        ],
        meta: "McGill-NLP/safearena · n<1K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2503.04957",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/McGill-NLP/safearena",
          },
        ],
        citationOnly: true,
        slug: "safearena",
        domain: "Agents",
      },
      {
        name: "OpenAgentSafety",
        note: "Safety at Scale Table 14 lists this resource under Real-Interaction Benchmarks. Evaluation focus: Real-world safety across 8 categories.",
        type: "Agents",
        year: "2025",
        stars: 32,
        tags: [
          "real-interaction benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2025",
          },
          {
            label: "Recorded scale",
            value: "350+ multi-turn tasks",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2507.06134",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/Open-Agent-Safety/OpenAgentSafety",
          },
        ],
        citationOnly: true,
        slug: "openagentsafety",
        domain: "Agents",
      },
      {
        name: "MobileSafetyBench",
        note: "The official project introduces MobileSafetyBench for evaluating device-control agents in an Android-emulator environment and records 250 tasks: 200 daily-scenario tasks and 50 indirect prompt-injection tasks.",
        type: "Agents",
        year: "2024",
        stars: 37,
        tags: [
          "Mobile",
          "Computer-use",
          "prompt injection",
          "simulation-based benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded scale",
            value: "250 tasks / 200 daily scenarios / 50 indirect prompt-injection scenarios",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.17520",
          },
          {
            label: "Official project",
            href: "https://mobilesafetybench.github.io/",
          },
          {
            label: "GitHub",
            href: "https://github.com/jylee425/mobilesafetybench",
          },
        ],
        citationOnly: true,
        slug: "mobilesafetybench",
        domain: "Agents",
        property: "Prompt Injection",
      },
      {
        name: "Bench2Drive",
        note: "The Embodied AI survey's dedicated Benchmarks section records 220 routes. The official repository releases the benchmark and training data.",
        type: "Embodied AI",
        venue: "NeurIPS 2024",
        year: "2024",
        stars: 1924,
        updated: "2026-08-11",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "220 routes",
          },
        ],
        meta: "Thinklab-SJTU/Bench2Drive · NOASSERTION · 142 forks · since 2024",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/Thinklab-SJTU/Bench2Drive",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2406.03877",
          },
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: false,
        slug: "bench2drive",
        domain: "Embodied AI",
      },
      {
        name: "M3Bench",
        note: "The Embodied AI survey's dedicated Benchmarks section records 30,000 pick-and-place tasks across 119 household scenes.",
        type: "Embodied AI",
        year: "2025",
        downloads: 23,
        stars: 27,
        updated: "2025-07-19",
        posted: "2024-10-09",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "30,000 tasks / 119 scenes",
          },
        ],
        meta: "Zeyu Zhang, Sixu Yan, Muzhi Han +4 more · TooSchoolForCool/M3Bench · since 2025 · cs.RO · M3Bench/M3Bench · APACHE-2.0",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.06678",
          },
          {
            label: "GitHub",
            href: "https://github.com/TooSchoolForCool/M3Bench",
          },
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: true,
        slug: "m3bench",
        domain: "Embodied AI",
      },
      {
        name: "THOR-EAE",
        note: "The Embodied AI survey's dedicated Benchmarks section records 840,000 samples in AI2-THOR. Its bibliography cites the ACM Multimedia paper but does not record an arXiv or repository link.",
        type: "Embodied AI",
        year: "2023",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "840,000 samples",
          },
        ],
        resources: [
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: true,
        slug: "thor-eae",
        domain: "Embodied AI",
      },
      {
        name: "Embodied Agent Interface (EAI)",
        note: "The Embodied AI survey's dedicated Benchmarks section names EAI. The official NeurIPS paper and repository record 338 VirtualHome tasks and 100 BEHAVIOR tasks.",
        type: "Embodied AI",
        year: "2024",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "438 tasks",
          },
        ],
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/embodied-agent-interface/embodied-agent-interface",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.07166",
          },
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: false,
        slug: "embodied-agent-interface-eai",
        domain: "Embodied AI",
      },
      {
        name: "AgentSafe",
        note: "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names AgentSafe.",
        type: "Embodied AI",
        year: "2025",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "Not recorded in source section",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2503.04392",
          },
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: true,
        slug: "agentsafe-multi-agent-systems",
        domain: "Embodied AI",
      },
      {
        name: "Safe-BeAI",
        note: "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names Safe-BeAI. The primary paper records 2,027 tasks across 8 hazard categories.",
        type: "Embodied AI",
        year: "2025",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "2,027 tasks / 8 hazard categories",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2504.14650",
          },
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: true,
        slug: "safe-beai",
        domain: "Embodied AI",
      },
      {
        name: "AGENTSAFE",
        note: "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names AGENTSAFE. The primary paper records 45 adversarial scenarios, 1,350 hazardous tasks, and 9,900 instructions.",
        type: "Embodied AI",
        year: "2025",
        tags: [
          "robustness",
        ],
        stats: [
          {
            label: "Recorded scale",
            value: "1,350 tasks / 9,900 instructions / 45 scenarios",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2506.14697",
          },
          {
            label: "Source survey",
            href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
          },
        ],
        citationOnly: true,
        slug: "agentsafe-hazardous-instructions",
        domain: "Embodied AI",
        property: "Robustness",
      },
      {
        name: "SafeMindBench",
        note: "The Embodied AI survey's dedicated Benchmarks subsection explicitly names SafeMindBench as a benchmark for safety risks in embodied LLM agents.",
        type: "Embodied AI",
        year: "2025",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "Not recorded in source section",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2509.25885",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2605.02900",
          },
        ],
        citationOnly: true,
        slug: "safemindbench",
        domain: "Embodied AI",
      },
      {
        name: "DESPITE",
        note: "The Embodied AI survey's dedicated Benchmarks subsection explicitly identifies DESPITE as a PDDL benchmark separating planning competence from safety competence.",
        type: "Embodied AI",
        year: "2026",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "Not recorded in source section",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2604.18463",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2605.02900",
          },
        ],
        citationOnly: true,
        slug: "despite",
        domain: "Embodied AI",
      },
      {
        name: "RoboJailBench",
        note: "The Embodied AI survey's dedicated Benchmarks subsection explicitly identifies RoboJailBench as a jailbreak attack-and-defense benchmark for embodied VLMs.",
        type: "Embodied AI",
        year: "2026",
        tags: [
          "jailbreak",
        ],
        stats: [
          {
            label: "Recorded scale",
            value: "Not recorded in source section",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2605.19328",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2605.02900",
          },
        ],
        citationOnly: true,
        slug: "robojailbench",
        domain: "Embodied AI",
        property: "Jailbreak",
      },
      {
        name: "HASARD",
        note: "The official HASARD repository publishes six vision-based safe reinforcement-learning environments and their scenario implementations.",
        type: "Embodied AI",
        year: "2025",
        tags: [],
        stats: [
          {
            label: "Recorded scale",
            value: "6 embodied safe-RL environments",
          },
        ],
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/TTomilin/HASARD/tree/main/hasard/envs",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2503.08241",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2605.02900",
          },
        ],
        slug: "hasard",
        domain: "Embodied AI",
      },
      {
        name: "Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments",
        note: "Listed in the source survey's Benchmarks & Datasets section. The primary paper calls R2R the first benchmark dataset for visually-grounded natural-language navigation, and the authors' repository provides the data and evaluation code.",
        type: "Embodied AI",
        venue: "CVPR 2018",
        year: "2018",
        tags: [],
        stats: [
          {
            label: "Published",
            value: "2018",
          },
        ],
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/peteanderson80/Matterport3DSimulator",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/1711.07280",
          },
        ],
        citationOnly: true,
        slug: "vision-and-language-navigation-interpreting-visually-grounded-navigation-instructions-in-real-environments",
        domain: "Embodied AI",
      },
      {
        name: "VizWiz Grand Challenge: Answering Visual Questions from Blind People",
        note: "Listed in the source survey's Benchmarks & Datasets section. The official VizWiz page publishes the dataset, challenge tasks, evaluation metrics and self-evaluation annotations.",
        type: "Embodied AI",
        venue: "CVPR 2018",
        year: "2018",
        tags: [],
        stats: [
          {
            label: "Published",
            value: "2018",
          },
        ],
        resources: [
          {
            label: "Project page",
            href: "https://vizwiz.org/tasks-and-datasets/vqa/",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/1802.08218",
          },
        ],
        citationOnly: true,
        slug: "vizwiz-grand-challenge-answering-visual-questions-from-blind-people",
        domain: "Embodied AI",
      },
      {
        name: "TruthfulQA",
        note: "Listed in Safety at Scale Table 6 under Truthfulness Datasets. Safety at Scale Section 3.13.2 and the primary paper both call TruthfulQA a benchmark.",
        type: "LLMs",
        venue: "ACL 2022",
        year: "2021",
        tags: [
          "truthfulness datasets",
        ],
        stats: [
          {
            label: "Table year",
            value: "2021",
          },
          {
            label: "Recorded size",
            value: "817",
          },
          {
            label: "Table #Times",
            value: "213",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2109.07958",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "truthfulqa",
        domain: "LLMs",
      },
      {
        name: "AdvGLUE",
        note: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper title identifies AdvGLUE as a multi-task benchmark.",
        type: "LLMs",
        venue: "NeurIPS 2021",
        year: "2021",
        tags: [
          "robustness",
          "adversarial datasets and backdoor benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2021",
          },
          {
            label: "Recorded size",
            value: "5,716",
          },
          {
            label: "Table #Times",
            value: "12",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2111.02840",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "advglue",
        domain: "LLMs",
        property: "Robustness",
      },
      {
        name: "AdvBench",
        note: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. Safety at Scale Table 6 cites the GCG paper for AdvBench; that paper uses AdvBench as an evaluation benchmark.",
        type: "LLMs",
        venue: "arXiv 2023",
        year: "2023",
        stars: 4760,
        updated: "2024-08-02",
        tags: [
          "robustness",
          "adversarial datasets and backdoor benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2023",
          },
          {
            label: "Recorded size",
            value: "520",
          },
          {
            label: "Table #Times",
            value: "52",
          },
        ],
        meta: "llm-attacks/llm-attacks · MIT · 631 forks · since 2023",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2307.15043",
          },
          {
            label: "GitHub",
            href: "https://github.com/llm-attacks/llm-attacks",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
          {
            label: "GitHub",
            href: "https://github.com/llm-attacks/llm-attacks/blob/main/data/advbench/harmful_behaviors.csv",
          },
        ],
        citationOnly: true,
        slug: "advbench",
        domain: "LLMs",
        property: "Robustness",
      },
      {
        name: "CVALUES",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper identifies CVALUES as a Chinese human-values evaluation benchmark.",
        type: "LLMs",
        venue: "arXiv 2023",
        year: "2023",
        tags: [
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2023",
          },
          {
            label: "Recorded size",
            value: "2,100",
          },
          {
            label: "Table #Times",
            value: "10",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2307.09705",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "cvalues",
        domain: "LLMs",
      },
      {
        name: "FINE",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper constructs a comparative benchmark and names its evaluation framework FINE.",
        type: "LLMs",
        venue: "NAACL 2024",
        year: "2023",
        tags: [
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2023",
          },
          {
            label: "Recorded size",
            value: "90",
          },
          {
            label: "Table #Times",
            value: "14",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2311.05915",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "fine",
        domain: "LLMs",
      },
      {
        name: "FLAMES",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper title and abstract identify FLAMES as a value-alignment benchmark.",
        type: "LLMs",
        venue: "NAACL 2024",
        year: "2024",
        tags: [
          "alignment",
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "2,251",
          },
          {
            label: "Table #Times",
            value: "17",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2311.06899",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "flames",
        domain: "LLMs",
        property: "Alignment",
      },
      {
        name: "SORRYBench",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper introduces SORRY-Bench as a benchmark for safety refusal behaviours.",
        type: "LLMs",
        venue: "arXiv 2024",
        year: "2024",
        downloads: 1378,
        updated: "2025-02-28",
        tags: [
          "jailbreak",
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "450",
          },
          {
            label: "Table #Times",
            value: "8",
          },
        ],
        meta: "sorry-bench/sorry-bench-202503",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2406.14598",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "sorrybench",
        domain: "LLMs",
        property: "Jailbreak",
      },
      {
        name: "SafetyBench",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper identifies SafetyBench as a comprehensive benchmark for evaluating LLM safety.",
        type: "LLMs",
        venue: "ACL 2024",
        year: "2024",
        downloads: 833,
        updated: "2023-09-14",
        tags: [
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "11,435",
          },
          {
            label: "Table #Times",
            value: "21",
          },
        ],
        meta: "thu-coai/SafetyBench · MIT · 10K<n<100K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2309.07045",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "safetybench",
        domain: "LLMs",
      },
      {
        name: "BackdoorLLM",
        note: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. Safety at Scale and the primary paper both identify BackdoorLLM as a benchmark.",
        type: "LLMs",
        venue: "arXiv 2024",
        year: "2024",
        stars: 324,
        updated: "2026-03-13",
        tags: [
          "robustness",
          "adversarial datasets and backdoor benchmarks",
          "attack",
          "backdoor",
          "defense",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "8",
          },
          {
            label: "Table #Times",
            value: "6",
          },
        ],
        meta: "bboylyg/BackdoorLLM · MIT · 46 forks · since 2024",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2408.12798",
          },
          {
            label: "GitHub",
            href: "https://github.com/bboylyg/BackdoorLLM",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "backdoorllm",
        domain: "LLMs",
        property: "Robustness",
      },
      {
        name: "JailBreakV-28K",
        note: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper identifies JailBreakV-28K as a benchmark for assessing multimodal-model robustness against jailbreak attacks.",
        type: "LLMs",
        venue: "COLM 2024",
        year: "2024",
        downloads: 16079,
        updated: "2024-07-10",
        tags: [
          "jailbreak",
          "adversarial datasets and backdoor benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "28K",
          },
          {
            label: "Table #Times",
            value: "10",
          },
        ],
        meta: "JailBreakV-28K/JailBreakV-28K · MIT · 10K<n<100K samples",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2404.03027",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "jailbreakv-28k",
        domain: "LLMs",
        property: "Jailbreak",
      },
      {
        name: "STRONGREJECT",
        note: "Listed in Safety at Scale Table 6 under Adversarial Datasets and Backdoor Benchmarks. The primary paper introduces StrongREJECT as a jailbreak-evaluation benchmark.",
        type: "LLMs",
        venue: "ICLR Workshop 2024",
        year: "2024",
        tags: [
          "jailbreak",
          "adversarial datasets and backdoor benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "313",
          },
          {
            label: "Table #Times",
            value: "4",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2402.10260",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "strongreject",
        domain: "LLMs",
        property: "Jailbreak",
      },
      {
        name: "Libra-Leaderboard",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. Safety at Scale describes Libra-Leaderboard as a leaderboard with a comprehensive safety benchmark and unified evaluation framework.",
        type: "LLMs",
        venue: "arXiv 2024",
        year: "2024",
        tags: [
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2024",
          },
          {
            label: "Recorded size",
            value: "57",
          },
          {
            label: "Table #Times",
            value: "26",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2412.18551",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "libra-leaderboard",
        domain: "LLMs",
      },
      {
        name: "CASE-Bench",
        note: "Listed in Safety at Scale Table 6 under Value Benchmarks. The primary paper identifies CASE-Bench as a context-aware safety benchmark for large language models.",
        type: "LLMs",
        venue: "arXiv 2025",
        year: "2025",
        tags: [
          "value benchmarks",
        ],
        stats: [
          {
            label: "Table year",
            value: "2025",
          },
          {
            label: "Recorded size",
            value: "450",
          },
        ],
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2501.14940",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        citationOnly: true,
        slug: "case-bench",
        domain: "LLMs",
      },
      {
        name: "HarmBench",
        note: "The LLM chapter names HarmBench as an evaluation benchmark. The official repository calls it a standardized evaluation framework and documents its evaluation pipeline.",
        type: "LLMs",
        venue: "arXiv 2024",
        year: "2024",
        stars: 1028,
        updated: "2024-08-16",
        posted: "2024-02-06",
        tags: [
          "jailbreak",
          "red teaming",
        ],
        stats: [
          {
            label: "Recorded scale",
            value: "18 red-teaming methods / 33 target LLMs and defenses",
          },
        ],
        meta: "Mantas Mazeika, Long Phan, Xuwang Yin +9 more · centerforaisafety/HarmBench · MIT · 154 forks · since 2024 · cs.LG",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/centerforaisafety/HarmBench",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2402.04249",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        slug: "harmbench",
        domain: "LLMs",
        property: "Jailbreak",
      },
      {
        name: "BUMBLE",
        note: "The LLM chapter explicitly calls BUMBLE a benchmark. The primary paper reports 12.7K instances across nine bias types, and the authors' repository identifies itself as the BUMBLE benchmark.",
        type: "LLMs",
        venue: "ACL 2025",
        year: "2025",
        stars: 1,
        updated: "2024-10-11",
        posted: "2024-06-20",
        tags: [
          "fairness",
          "implicit bias",
        ],
        stats: [
          {
            label: "Recorded scale",
            value: "12.7K instances / 9 bias types",
          },
        ],
        meta: "Yuchen Wen, Keping Bi, Wei Chen +2 more · yuchenwen1/BUMBLE · 1 fork · since 2024 · cs.CL",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/yuchenwen1/BUMBLE",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2406.14023",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        slug: "bumble",
        domain: "LLMs",
        property: "Fairness",
      },
      {
        name: "JailbreakBench",
        note: "The LLM chapter names JailbreakBench. Its official repository calls it an open robustness benchmark and releases the JBB-Behaviors evaluation data, evaluation framework, artifacts, and leaderboard.",
        type: "LLMs",
        venue: "NeurIPS 2024",
        year: "2024",
        downloads: 47399,
        stars: 654,
        updated: "2025-04-04",
        posted: "2024-03-28",
        tags: [
          "jailbreak",
        ],
        stats: [
          {
            label: "Recorded scale",
            value: "200 harmful and benign behaviors",
          },
        ],
        meta: "Patrick Chao, Edoardo Debenedetti, Alexander Robey +9 more · JailbreakBench/jailbreakbench · MIT · 76 forks · since 2023 · cs.CR · JailbreakBench/JBB-Behaviors · MIT · n<1K samples",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/JailbreakBench/jailbreakbench",
          },
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2404.01318",
          },
          {
            label: "Hugging Face",
            href: "https://huggingface.co/datasets/JailbreakBench/JBB-Behaviors",
          },
          {
            label: "Source survey",
            href: "https://arxiv.org/abs/2502.05206",
          },
        ],
        slug: "jailbreakbench",
        domain: "LLMs",
        property: "Jailbreak",
      },
    ],
  },
  models: {
    slug: "models",
    breadcrumb: [
      "Home",
      "Resources",
      "Models",
    ],
    title: "Models",
    heroIcon: "◆",
    description: "Open-source trustworthy AI models — guard models, safety-aligned models, detectors, and agents.",
    overview: "Author lists and posting dates come from the arXiv API; repository activity from the GitHub API.",
    tableTitle: "Open models",
    sectionTitle: "Model categories",
    categories: [
      {
        title: "Guard Models",
        detail: "Input/output classifiers that screen unsafe content.",
        accent: "pink",
        filters: [
          "Guard Model",
        ],
      },
      {
        title: "Safety Alignment",
        detail: "Models trained on safety preference data.",
        accent: "green",
        filters: [
          "Safety Alignment",
        ],
      },
      {
        title: "Agents",
        detail: "Agentic systems released with safety tooling.",
        accent: "orange",
        filters: [
          "Agent",
        ],
      },
      {
        title: "Detection",
        detail: "Models that detect AI-generated or manipulated media.",
        accent: "blue",
        filters: [
          "Detection",
        ],
      },
      {
        title: "Generative",
        detail: "Open generative models released with the platform.",
        accent: "violet",
        filters: [
          "Generative",
        ],
      },
      {
        title: "Video Understanding",
        detail: "Grounded and multi-turn video understanding models.",
        accent: "orange",
        filters: [
          "Video Understanding",
        ],
      },
    ],
    tableRows: [
      {
        name: "DAVID XR1",
        subtitle: "AI-Generated Video Detection Model",
        note: "An AI video detection model with defect categorization, temporal–spatial localization, and reasoning explanations.",
        type: "Detection",
        year: "2025",
        posted: "2025-06-13",
        tags: [
          "detection",
        ],
        stats: [
          {
            label: "Posted",
            value: "2025-06-13",
          },
        ],
        meta: "Yifeng Gao, Yifan Ding, Hongyu Su +9 more · cs.CV",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2506.14827",
          },
        ],
        image: "/media/david-xr-model.png",
      },
      {
        name: "SafeVid",
        subtitle: "Safety-aligned Video-Language Model",
        note: "SafeVid is a framework for training safety-aligned Video Large Multimodal Models using a large-scale safety preference dataset.",
        type: "Safety Alignment",
        year: "2025",
        posted: "2025-05-17",
        tags: [
          "safety alignment",
        ],
        stats: [
          {
            label: "Posted",
            value: "2025-05-17",
          },
        ],
        meta: "Yixu Wang, Jiaxin Song, Yifeng Gao +6 more · cs.CV",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2505.11926",
          },
        ],
        image: "/media/safevid-model.png",
      },
      {
        name: "OmniSVG",
        subtitle: "SVG Generation Model",
        note: "OmniSVG is a unified SVG generation model that leverages VLMs to generate high-quality and complex SVGs.",
        type: "Generative",
        venue: "NeurIPS 2025",
        year: "2025",
        stars: 2579,
        updated: "2026-03-01",
        tags: [
          "generative",
        ],
        stats: [
          {
            label: "Stars",
            value: "2,579",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2026-03",
          },
        ],
        meta: "OmniSVG/OmniSVG · Apache-2.0 · 102 forks · since 2025",
        resources: [
          {
            label: "Project page",
            href: "https://omnisvg.github.io/",
          },
          {
            label: "GitHub",
            href: "https://github.com/OmniSVG/OmniSVG",
          },
        ],
        image: "/media/omnisvg-2m-3.jpg",
      },
      {
        name: "SAMA",
        subtitle: "Multi-Turn Referential Grounded Video Chat",
        note: "SAMA is a multi-turn referential grounded video chat model that advances fine-grained spatio-temporal understanding in videos by jointly tackling video referring understanding, grounding, and multi-turn dialogue.",
        type: "Video Understanding",
        venue: "NeurIPS 2025",
        year: "2025",
        posted: "2025-05-24",
        tags: [
          "video understanding",
        ],
        stats: [
          {
            label: "Posted",
            value: "2025-05-24",
          },
        ],
        meta: "Ye Sun, Hao Zhang, Henghui Ding +3 more · cs.CV",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2505.18812",
          },
        ],
        image: "/media/datasets2.png",
      },
    ],
  },
  datasets: {
    slug: "datasets",
    breadcrumb: [
      "Home",
      "Resources",
      "Datasets",
    ],
    title: "Datasets",
    heroIcon: "◱",
    description: "Open-source safety datasets for training safer LLMs, Agents, and Embodied AI models.",
    overview: "An entry appears here only when its paper or official repository explicitly supports training, fine-tuning, alignment, or classifier training. Public test data stays in Benchmarks.",
    tableTitle: "Dataset collection",
    sectionTitle: "Dataset categories",
    categories: [
      {
        title: "LLMs",
        detail: "Datasets explicitly associated with large-language-model safety.",
        accent: "pink",
        filters: [
          "LLMs",
        ],
      },
      {
        title: "Agents",
        detail: "Datasets explicitly associated with agent safety.",
        accent: "orange",
        filters: [
          "Agents",
        ],
      },
      {
        title: "Embodied AI",
        detail: "Datasets for embodied perception, planning and interaction.",
        accent: "green",
        filters: [
          "Embodied AI",
        ],
      },
    ],
    tableRows: [
      {
        name: "AdvBench",
        note: "520 harmful-behavior instructions and corresponding target strings released as CSV files for evaluating adversarial attacks and safety alignment.",
        type: "LLMs",
        stars: 4760,
        updated: "2024-08-02",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/llm-attacks/llm-attacks/blob/main/data/advbench/harmful_behaviors.csv",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Aegis 2.0",
        note: "33.4K content-safety conversation samples assembled from human-written red-team prompts, LLM-generated responses, and safety annotations for training and evaluating guard models.",
        type: "LLMs",
        venue: "arXiv 2025",
        year: "2025",
        downloads: 6401,
        updated: "2025-06-09",
        posted: "2025-01-15",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/nvidia/Aegis-AI-Content-Safety-Dataset-2.0",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Anthropic Red Team Attempts",
        note: "38,961 human–AI red-team conversations collected through adversarial user interactions for studying and reducing harmful model behavior.",
        type: "LLMs",
        stars: 1856,
        updated: "2025-06-17",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/Anthropic/hh-rlhf/tree/main/red-team-attempts",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "BeaverTails",
        note: "333,963 question–answer pairs collected and human-annotated with safety categories for harmlessness alignment and safety-classifier training.",
        type: "LLMs",
        venue: "arXiv preprint arXiv:2307.04657",
        year: "2023",
        stars: 182,
        updated: "2023-10-27",
        tags: [
          "training data",
          "ai-safety",
          "beaver",
          "datasets",
          "gpt",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/PKU-Alignment/BeaverTails",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "BIPIA",
        note: "5 task-specific context datasets paired with 250 injected attack goals, assembled from web, email, table, summarization, and code sources for training and evaluating indirect-prompt-injection defenses.",
        type: "LLMs",
        venue: "Proceedings of the 31st ACM SIGKDD Conference on Knowledge Discovery and Data Mining V. 1",
        year: "2025",
        stars: 154,
        updated: "2024-04-15",
        tags: [
          "training data",
          "llm-security",
        ],
        resources: [],
        primaryUrl: "https://github.com/microsoft/BIPIA/tree/main/benchmark",
        domains: [
          "LLMs",
          "Agents",
        ],
        domain: "LLMs",
      },
      {
        name: "Booster repnoise BeaverTails",
        note: "18,106 prompt–response–refusal records derived from BeaverTails for representation-based safety alignment and refusal training.",
        type: "LLMs",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/anonymous4486/repnoise_beavertail",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Bot-Adversarial Dialogue",
        note: "5K adversarial human–bot conversations containing approximately 70K utterances, collected through crowdworker interactions for training and evaluating offensive-language classifiers.",
        type: "LLMs",
        stars: 10623,
        updated: "2026-07-30",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/facebookresearch/ParlAI/tree/main/parlai/tasks/bot_adversarial_dialogue",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Crafted datasets",
        note: "Exact count not recorded: indirect prompt-injection examples crafted from attack instructions and external contexts for training detection and extraction models.",
        type: "Agents",
        venue: "ACL 2025",
        year: "2025",
        stars: 9,
        updated: "2025-12-25",
        posted: "2025-02-23",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/LukeChen-go/indirect-pia-detection/tree/main/data",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "CValues-Comparison",
        note: "145K preference pairs generated through a self-instruct and response-comparison pipeline, then split into 116K training and 29K test pairs for safety fine-tuning and reward-model training.",
        type: "LLMs",
        venue: "arXiv 2023",
        year: "2023",
        stars: 560,
        updated: "2023-07-20",
        posted: "2023-07-19",
        tags: [
          "training data",
          "benchmark",
          "chinese-llms",
          "evaluation",
          "human-values",
        ],
        resources: [],
        primaryUrl: "https://www.modelscope.cn/datasets/damo/CValues-Comparison/summary",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "DoNotAnswer",
        note: "939 safety-sensitive instructions and annotated model responses curated across five risk areas for training refusal and risk classifiers.",
        type: "LLMs",
        venue: "EACL 2024",
        year: "2023",
        stars: 341,
        updated: "2024-06-07",
        posted: "2023-08-25",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/Libr-AI/do-not-answer/tree/main/datasets",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "EAsafetyBench",
        note: "Exact count not recorded: embodied-agent safety prompts and drone interaction scenarios assembled with a documented 70% training split for training safety classifiers.",
        type: "Agents",
        stars: 5,
        updated: "2026-04-13",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/ZihanYan-CQU/EAsafetyBench/tree/main/EAsafetyBench",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "HH-RLHF",
        note: "161K human preference pairs collected by comparing assistant responses for helpfulness and harmlessness for preference modeling and RLHF training.",
        type: "LLMs",
        stars: 1856,
        updated: "2025-06-17",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/Anthropic/hh-rlhf",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "HSOL",
        note: "24,783 tweets collected with a hate-speech lexicon and crowd-annotated as hate speech, offensive language, or neither for training content-safety classifiers.",
        type: "LLMs",
        stars: 847,
        updated: "2023-06-12",
        tags: [
          "training data",
          "abuse",
          "classifier",
          "computational-social-science",
          "dataset",
        ],
        resources: [],
        primaryUrl: "https://github.com/t-davidson/hate-speech-and-offensive-language/blob/master/data/labeled_data.csv",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Jigsaw Toxic Comment Classification",
        note: "159,571 Wikipedia talk-page comments collected from page edits and annotated with six toxicity labels for training content-moderation models.",
        type: "LLMs",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "LlavaGuard Dataset",
        note: "5,466 image–text safety examples collected and expert-annotated with ratings, categories, and rationales for training and evaluating multimodal guard models.",
        type: "Agents",
        stars: 72,
        updated: "2025-09-30",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/AIML-TUDA/LlavaGuard",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "MM-SafetyBench",
        note: "5,040 text–image attack pairs generated across 13 safety scenarios for training and evaluating multimodal safeguards and a safety suffix generator.",
        type: "Agents",
        venue: "ECCV",
        year: "2024",
        stars: 218,
        updated: "2024-10-15",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/isXinLiu/MM-SafetyBench",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "OLID",
        note: "14,100 tweets collected from Twitter and hierarchically annotated for offensive-language identification and categorization.",
        type: "LLMs",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://zenodo.org/records/2670722",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "OpenAssistant OASST1",
        note: "161,443 conversational messages organized into more than 10,000 conversation trees, collected from over 13,500 crowd contributors for instruction tuning and preference training.",
        type: "LLMs",
        stars: 37407,
        updated: "2024-08-17",
        tags: [
          "training data",
          "ai",
          "assistant",
          "chatgpt",
          "discord-bot",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/OpenAssistant/oasst1",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "ORCA-DPO",
        note: "12,859 chosen–rejected response pairs derived from OpenOrca response comparisons for direct preference optimization and alignment training.",
        type: "LLMs",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/Intel/orca_dpo_pairs",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "PKU-SafeRLHF",
        note: "83.4K preference entries collected through helpfulness and harmlessness comparisons for learning separate reward and safety-cost signals in safe RLHF training.",
        type: "LLMs",
        stars: 1610,
        updated: "2025-11-24",
        tags: [
          "training data",
          "ai-safety",
          "alpaca",
          "beaver",
          "datasets",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/PKU-Alignment/PKU-SafeRLHF",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "SafeMTData",
        note: "Exact count not recorded: safety-focused instruction records released by the authors for supervised fine-tuning of safer language models.",
        type: "Agents",
        venue: "arXiv preprint arXiv:2410.10700",
        year: "2024",
        stars: 134,
        updated: "2026-07-29",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/SafeMTData/SafeMTData",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "SafetyPrompts",
        note: "100K Chinese prompt–response examples generated across typical and adversarial safety scenarios for safety training and evaluation.",
        type: "LLMs",
        venue: "arXiv 2023",
        year: "2023",
        downloads: 431,
        stars: 1206,
        updated: "2024-02-27",
        posted: "2023-04-20",
        tags: [
          "training data",
          "attack-defense",
          "chatgpt",
          "chinese-language",
          "instruction",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/thu-coai/Safety-Prompts",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "SAP",
        note: "5 poisoning-dataset variants generated with the authors’ attack framework for studying and defending against prompt-based data poisoning.",
        type: "LLMs",
        stars: 49,
        updated: "2024-05-09",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/Aatrox103/SAP",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "SelfDefend distilled defense data",
        note: "Exact count not recorded: defense prompts, queries, and labels collected into direct and intent datasets with an 80/20 split for fine-tuning and validating a prompt-injection defense model.",
        type: "LLMs",
        stars: 35,
        updated: "2025-01-26",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://zenodo.org/records/14736936/latest",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Sleeper Agents code backdoor training data",
        note: "Exact count not recorded: code-completion examples generated with vulnerability-specific trigger prompts for training and studying persistent deceptive backdoors.",
        type: "LLMs",
        stars: 150,
        updated: "2024-03-09",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/anthropics/sleeper-agents-paper/blob/main/code_backdoor_train_data.jsonl",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Socio-Moral Image Database",
        note: "2,941 images paired with 820,565 moral and emotional judgments collected from 2,716 participants for affective research and multimodal safety annotation.",
        type: "Agents",
        venue: "PLOS ONE",
        year: "2018",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://osf.io/2rqad/",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "Stable Alignment Sandbox sample datasets",
        note: "2 public interaction-data sample files, drawn from a 169K sandbox-generated set, released for constructing three alignment-training stages.",
        type: "LLMs",
        year: "2023",
        stars: 356,
        updated: "2023-06-18",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/agi-templar/Stable-Alignment/tree/main/assets",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Stanford Human Preferences",
        note: "385K human preference pairs collected from highly upvoted and downvoted Reddit responses across 18 domains for training and evaluating preference-based alignment methods.",
        type: "LLMs",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/stanfordnlp/SHP",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Texas Spoofing Test Battery (TEXBAT)",
        note: "8 high-fidelity GPS signal recordings collected from live static and dynamic spoofing scenarios for training and testing spoofing-detection and authentication methods.",
        type: "Embodied AI",
        venue: "RadioNavigation Laboratory Conference Proceedings",
        year: "2012",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://radionavlab.ae.utexas.edu/texbat/",
        domains: [
          "Embodied AI",
        ],
        domain: "Embodied AI",
      },
      {
        name: "TruthfulQA evaluator fine-tuning data",
        note: "6.9K reference-answer and approximately 15.5K generated-answer examples annotated for truthfulness and informativeness for fine-tuning the TruthfulQA judge and information evaluators.",
        type: "LLMs",
        venue: "ACL 2022",
        year: "2021",
        stars: 939,
        updated: "2025-01-16",
        posted: "2021-09-08",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/sylinrl/TruthfulQA/tree/main/data",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "Virus",
        note: "Exact count not recorded: harmful fine-tuning examples generated by optimizing source samples against moderation and jailbreak objectives for studying guardrail bypass and safety-alignment degradation.",
        type: "LLMs",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/anonymous4486/Virus",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
      {
        name: "XGuard-Train",
        note: "30,695 attack–refusal conversations released for robust multi-turn safety fine-tuning.",
        type: "Agents",
        venue: "arXiv 2025",
        year: "2025",
        downloads: 110,
        stars: 67,
        updated: "2025-05-21",
        posted: "2025-04-15",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://huggingface.co/datasets/marslabucla/XGuard-Train",
        domains: [
          "Agents",
        ],
        domain: "Agents",
      },
      {
        name: "XSTest",
        note: "450 safe and unsafe prompts curated as minimal contrasts across 10 prompt types for training and evaluating calibrated refusal behavior.",
        type: "LLMs",
        stars: 142,
        updated: "2025-02-24",
        tags: [
          "training data",
        ],
        resources: [],
        primaryUrl: "https://github.com/paul-rottger/xstest/blob/main/xstest_prompts.csv",
        domains: [
          "LLMs",
        ],
        domain: "LLMs",
      },
    ],
  },
};

export const collectionOrder = [
  "benchmarks",
  "models",
  "datasets",
] as const;
