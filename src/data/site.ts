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
  subtitle?: string;
  note: string;
  type: string;
  venue?: string;
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

export type HomeCategoryCard = {
  title: string;
  description: string;
  href: string;
  accent: string;
  icon: string;
};

export const newsletter = {
  // Paste the provider's form action URL here (Buttondown / Mailchimp / Formspree).
  // Until it is set, the subscribe form renders but stays disabled.
  endpoint: "",
};

export const siteBrand = {
  name: "OpenTAI",
  tagline: "The Open Hub for Trustworthy AI",
  headline: "One platform that collects all the open-source resources for trustworthy AI.",
  contactEmail: "xingjunma@fudan.edu.cn",
  upstream: "https://opentai.org",
};

export const navItems: Pill[] = [
  {
    label: "Discover",
    href: "/",
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
    label: "Tools",
    href: "/tools",
  },
  {
    label: "Papers",
    href: "/papers",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "About",
    href: "/about",
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
    description: "Training, evaluation, preference, jailbreak data.",
    href: "/datasets",
    accent: "green",
    icon: "◱",
  },
  {
    title: "Tools",
    description: "Libraries, frameworks, attack and defense toolkits.",
    href: "/tools",
    accent: "orange",
    icon: "◇",
  },
  {
    title: "Papers",
    description: "Papers, surveys, tutorials, and code links.",
    href: "/papers",
    accent: "pink",
    icon: "◈",
  },
];

export const benchmarkDetails: Record<string, BenchmarkDetail> = {
  "visionsafety-bench": {
    slug: "visionsafety-bench",
    name: "VisionSafety Bench",
    category: "Robustness",
    subtitle: "An Adversarial Evaluation Platform for Vision Models",
    description: "Our open-source platform provides datasets, algorithms, and tools for scalable adversarial evaluation of vision models. Now available for community use - we welcome your feedback and contributions!",
    resources: [
      {
        label: "Platform",
        href: "https://opentai.org/VisionSafety",
      },
      {
        label: "GitHub",
        href: "https://github.com/OpenTAI/VisionSafety",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "4",
      },
      {
        label: "Language",
        value: "TypeScript",
      },
      {
        label: "Updated",
        value: "2026-01",
      },
    ],
    tags: [
      "vision",
      "adversarial",
      "million-scale",
    ],
    repo: "OpenTAI/VisionSafety",
    license: "Apache-2.0",
    language: "TypeScript",
    stars: 4,
    forks: 0,
    updated: "2026-01-14",
    pending: [
      "Leaderboard",
    ],
    dataset: {
      text: "Evaluated against domain-specific datasets for five vision tasks together with OpenTAI's own CC1M-Adv-C/F million-scale adversarial datasets, both of which are listed in the Datasets collection.",
      source: "Current OpenTAI site",
    },
    metrics: {
      items: [
        "Black-box setting: adversarial safety on a domain dataset and on CC1M-Adv",
        "White-box setting: clean accuracy and robust accuracy",
      ],
      source: "Current OpenTAI site (leaderboard columns)",
    },
    baselines: {
      text: "The top-10 most downloaded or cited models for each of five vision tasks, plus robust models on CIFAR-10, CIFAR-100, ImageNet-1k and CC1M — 77 scored entries in total.",
      source: "Current OpenTAI site (leaderboards)",
    },
    note: "The linked repository OpenTAI/VisionSafety contains the platform's website, not the evaluation code.",
  },
  "rewardmodel-bench": {
    slug: "rewardmodel-bench",
    name: "RewardModel Bench",
    category: "Alignment",
    subtitle: "A Reward Model Benchmark for LLM Alignment Evaluation",
    description: "A reward model benchmark for evaluating the effectiveness of alignment in large language models. The benchmark consists of 49 real-world scenarios and both pairwise and Best-of-N (BoN) evaluations.",
    venue: "ICLR 2025",
    resources: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2410.09893",
      },
      {
        label: "GitHub",
        href: "https://github.com/Zhou-Zoey/RMB-Reward-Model-Benchmark",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "48",
      },
      {
        label: "Language",
        value: "Python",
      },
      {
        label: "Updated",
        value: "2025-03",
      },
    ],
    tags: [
      "llm",
      "reward model",
      "alignment",
    ],
    repo: "Zhou-Zoey/RMB-Reward-Model-Benchmark",
    language: "Python",
    stars: 48,
    forks: 4,
    updated: "2025-03-25",
    pending: [
      "Leaderboard",
    ],
    dataset: {
      text: "Over 49 real-world scenarios split across helpfulness and harmlessness goals, shipped in the repository's RMB_dataset directory as pairwise and Best-of-N test sets.",
      source: "Project README",
    },
    metrics: {
      items: [
        "Pairwise preference accuracy",
        "Best-of-N (BoN) evaluation, intended to reflect how well a reward model guides alignment optimisation",
      ],
      source: "Project README",
    },
    baselines: {
      text: "The evaluation script ships with reward models including ArmoRM-Llama3-8B, Eurus-RM-7b, Starling-RM-34B, internlm2-7b/20b-reward and tulu-v2.5-13b-preference-mix-rm.",
      source: "Project README (run_rm.sh)",
    },
  },
  vlbreakbench: {
    slug: "vlbreakbench",
    name: "VLBreakBench",
    category: "Multimodal Safety",
    subtitle: "A Multimodal Jailbreak Benchmark for Vision-Language Models",
    description: "VLBreakBench evaluates VLMs through two tiers: a base set (1 jailbreak pair per query) and a challenge set (3 pairs per query), covering 12 safety topics and 46 subcategories (916 harmful queries), totaling 3,654 jailbreak samples.",
    resources: [],
    stats: [],
    tags: [
      "multimodal",
      "jailbreak",
      "safety",
    ],
    pending: [
      "Metrics",
      "Baselines",
      "Leaderboard",
    ],
    dataset: {
      text: "3,654 jailbreak samples built from 916 harmful queries across 12 safety topics and 46 subcategories, split into a base set with one jailbreak pair per query and a challenge set with three.",
      source: "Current OpenTAI site",
    },
    note: "The project page linked from the current OpenTAI site returns 404, and no repository under this name could be verified. Metrics, baselines and code are unavailable until the team provides a working source.",
  },
  harmbench: {
    slug: "harmbench",
    name: "HarmBench",
    category: "LLM Safety",
    description: "Automated red teaming holds substantial promise for uncovering and mitigating the risks associated with the malicious use of large language models (LLMs), yet the field lacks a standardized evaluation framework to rigorously assess new methods. To address this issue, we introduce HarmBench, a standardized evaluation framework for automated red teaming.",
    abstract: "Automated red teaming holds substantial promise for uncovering and mitigating the risks associated with the malicious use of large language models (LLMs), yet the field lacks a standardized evaluation framework to rigorously assess new methods. To address this issue, we introduce HarmBench, a standardized evaluation framework for automated red teaming. We identify several desirable properties previously unaccounted for in red teaming evaluations and systematically design HarmBench to meet these criteria. Using HarmBench, we conduct a large-scale comparison of 18 red teaming methods and 33 target LLMs and defenses, yielding novel insights. We also introduce a highly efficient adversarial training method that greatly enhances LLM robustness across a wide range of attacks, demonstrating how HarmBench enables codevelopment of attacks and defenses. We open source HarmBench at https://github.com/centerforaisafety/HarmBench.",
    resources: [
      {
        label: "Project page",
        href: "https://harmbench.org",
      },
      {
        label: "GitHub",
        href: "https://github.com/centerforaisafety/HarmBench",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "1,027",
      },
      {
        label: "Language",
        value: "Jupyter Notebook",
      },
      {
        label: "Updated",
        value: "2024-08",
      },
      {
        label: "Posted",
        value: "2024-02-06",
      },
    ],
    tags: [],
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
    stars: 1027,
    forks: 153,
    updated: "2024-08-16",
    homepage: "https://harmbench.org",
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
  jailbreakbench: {
    slug: "jailbreakbench",
    name: "JailbreakBench",
    category: "LLM Safety",
    description: "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Language Models [NeurIPS 2024 Datasets and Benchmarks Track]",
    abstract: "Jailbreak attacks cause large language models (LLMs) to generate harmful, unethical, or otherwise objectionable content. Evaluating these attacks presents a number of challenges, which the current collection of benchmarks and evaluation techniques do not adequately address. First, there is no clear standard of practice regarding jailbreaking evaluation. Second, existing works compute costs and success rates in incomparable ways. And third, numerous works are not reproducible, as they withhold adversarial prompts, involve closed-source code, or rely on evolving proprietary APIs. To address these challenges, we introduce JailbreakBench, an open-sourced benchmark with the following components: (1) an evolving repository of state-of-the-art adversarial prompts, which we refer to as jailbreak artifacts; (2) a jailbreaking dataset comprising 100 behaviors -- both original and sourced from prior work (Zou et al., 2023; Mazeika et al., 2023, 2024) -- which align with OpenAI's usage policies; (3) a standardized evaluation framework at https://github.com/JailbreakBench/jailbreakbench that includes a clearly defined threat model, system prompts, chat templates, and scoring functions; and (4) a leaderboard at https://jailbreakbench.github.io/ that tracks the performance of attacks and defenses for various LLMs. We have carefully considered the potential ethical implications of releasing this benchmark, and believe that it will be a net positive for the community.",
    venue: "NeurIPS 2024",
    resources: [
      {
        label: "Project page",
        href: "https://jailbreakbench.github.io",
      },
      {
        label: "GitHub",
        href: "https://github.com/JailbreakBench/jailbreakbench",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "651",
      },
      {
        label: "Language",
        value: "Python",
      },
      {
        label: "Updated",
        value: "2025-04",
      },
      {
        label: "Posted",
        value: "2024-03-28",
      },
    ],
    tags: [],
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
    stars: 651,
    forks: 76,
    updated: "2025-04-04",
    homepage: "https://jailbreakbench.github.io",
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
  safetybench: {
    slug: "safetybench",
    name: "SafetyBench",
    category: "LLM Safety",
    description: "Official github repo for SafetyBench, a comprehensive benchmark to evaluate LLMs' safety. [ACL 2024]",
    abstract: "With the rapid development of Large Language Models (LLMs), increasing attention has been paid to their safety concerns. Consequently, evaluating the safety of LLMs has become an essential task for facilitating the broad applications of LLMs. Nevertheless, the absence of comprehensive safety evaluation benchmarks poses a significant impediment to effectively assess and enhance the safety of LLMs. In this work, we present SafetyBench, a comprehensive benchmark for evaluating the safety of LLMs, which comprises 11,435 diverse multiple choice questions spanning across 7 distinct categories of safety concerns. Notably, SafetyBench also incorporates both Chinese and English data, facilitating the evaluation in both languages. Our extensive tests over 25 popular Chinese and English LLMs in both zero-shot and few-shot settings reveal a substantial performance advantage for GPT-4 over its counterparts, and there is still significant room for improving the safety of current LLMs. We also demonstrate that the measured safety understanding abilities in SafetyBench are correlated with safety generation abilities. Data and evaluation guidelines are available at \\url{https://github.com/thu-coai/SafetyBench}{https://github.com/thu-coai/SafetyBench}. Submission entrance and leaderboard are available at \\url{https://llmbench.ai/safety}{https://llmbench.ai/safety}.",
    venue: "ACL 2024",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/thu-coai/SafetyBench",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "297",
      },
      {
        label: "Language",
        value: "Python",
      },
      {
        label: "Updated",
        value: "2025-07",
      },
      {
        label: "Posted",
        value: "2023-09-13",
      },
    ],
    tags: [],
    authors: [
      "Zhexin Zhang",
      "Leqi Lei",
      "Lindong Wu",
      "Rui Sun",
      "Yongkang Huang",
      "Chong Long",
    ],
    authorCount: 10,
    posted: "2023-09-13",
    arxivId: "2309.07045",
    repo: "thu-coai/SafetyBench",
    license: "MIT",
    language: "Python",
    stars: 297,
    forks: 14,
    updated: "2025-07-28",
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
  agentdojo: {
    slug: "agentdojo",
    name: "AgentDojo",
    category: "Agent Safety",
    description: "A Dynamic Environment to Evaluate Attacks and Defenses for LLM Agents.",
    abstract: "AI agents aim to solve complex tasks by combining text-based reasoning with external tool calls. Unfortunately, AI agents are vulnerable to prompt injection attacks where data returned by external tools hijacks the agent to execute malicious tasks. To measure the adversarial robustness of AI agents, we introduce AgentDojo, an evaluation framework for agents that execute tools over untrusted data. To capture the evolving nature of attacks and defenses, AgentDojo is not a static test suite, but rather an extensible environment for designing and evaluating new agent tasks, defenses, and adaptive attacks. We populate the environment with 97 realistic tasks (e.g., managing an email client, navigating an e-banking website, or making travel bookings), 629 security test cases, and various attack and defense paradigms from the literature. We find that AgentDojo poses a challenge for both attacks and defenses: state-of-the-art LLMs fail at many tasks (even in the absence of attacks), and existing prompt injection attacks break some security properties but not all. We hope that AgentDojo can foster research on new design principles for AI agents that solve common tasks in a reliable and robust manner.. We release the code for AgentDojo at https://github.com/ethz-spylab/agentdojo.",
    resources: [
      {
        label: "Project page",
        href: "https://agentdojo.spylab.ai/",
      },
      {
        label: "GitHub",
        href: "https://github.com/ethz-spylab/agentdojo",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "735",
      },
      {
        label: "Language",
        value: "Python",
      },
      {
        label: "Updated",
        value: "2026-06",
      },
      {
        label: "Posted",
        value: "2024-06-19",
      },
    ],
    tags: [
      "benchmark",
      "large-language-models",
      "prompt-injection",
      "security",
    ],
    authors: [
      "Edoardo Debenedetti",
      "Jie Zhang",
      "Mislav Balunović",
      "Luca Beurer-Kellner",
      "Marc Fischer",
      "Florian Tramèr",
    ],
    authorCount: 6,
    posted: "2024-06-19",
    arxivId: "2406.13352",
    repo: "ethz-spylab/agentdojo",
    license: "MIT",
    language: "Python",
    stars: 735,
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
  "mm-safetybench": {
    slug: "mm-safetybench",
    name: "MM-SafetyBench",
    category: "Multimodal Safety",
    description: "Accepted by ECCV 2024",
    abstract: "The security concerns surrounding Large Language Models (LLMs) have been extensively explored, yet the safety of Multimodal Large Language Models (MLLMs) remains understudied. In this paper, we observe that Multimodal Large Language Models (MLLMs) can be easily compromised by query-relevant images, as if the text query itself were malicious. To address this, we introduce MM-SafetyBench, a comprehensive framework designed for conducting safety-critical evaluations of MLLMs against such image-based manipulations. We have compiled a dataset comprising 13 scenarios, resulting in a total of 5,040 text-image pairs. Our analysis across 12 state-of-the-art models reveals that MLLMs are susceptible to breaches instigated by our approach, even when the equipped LLMs have been safety-aligned. In response, we propose a straightforward yet effective prompting strategy to enhance the resilience of MLLMs against these types of attacks. Our work underscores the need for a concerted effort to strengthen and enhance the safety measures of open-source MLLMs against potential malicious exploits. The resource is available at https://github.com/isXinLiu/MM-SafetyBench",
    venue: "ECCV 2024",
    resources: [
      {
        label: "GitHub",
        href: "https://github.com/isXinLiu/MM-SafetyBench",
      },
    ],
    stats: [
      {
        label: "Stars",
        value: "217",
      },
      {
        label: "Language",
        value: "Python",
      },
      {
        label: "Updated",
        value: "2024-10",
      },
      {
        label: "Posted",
        value: "2023-11-29",
      },
    ],
    tags: [],
    authors: [
      "Xin Liu",
      "Yichen Zhu",
      "Jindong Gu",
      "Yunshi Lan",
      "Chao Yang",
      "Yu Qiao",
    ],
    authorCount: 6,
    posted: "2023-11-29",
    arxivId: "2311.17600",
    repo: "isXinLiu/MM-SafetyBench",
    language: "Python",
    stars: 217,
    forks: 6,
    updated: "2024-10-15",
    pending: [
      "Leaderboard",
    ],
    dataset: {
      text: "5,040 text-image pairs across 13 scenarios, from illegal activity and hate speech through to legal, financial, and health advice. Each question comes in three image variants: a Stable Diffusion image, a typographic image, and a combined SD+typography image. A tiny subset list is provided to reduce evaluation cost.",
      source: "Project README and paper abstract",
    },
    metrics: {
      items: [
        "Whether the model complies with a query-relevant image manipulation, measured per scenario",
        "Each question is evaluated in all three image variants and answers are collected into a per-scenario answer file",
      ],
      source: "Project README (Evaluation)",
    },
    baselines: {
      text: "12 state-of-the-art multimodal models analysed in the paper, alongside a prompting strategy proposed to improve resilience.",
      source: "Paper abstract",
    },
  },
};

export const leaderboards: { title: string; subtitle: string; tables: LeaderboardTable[] } = {
  title: "Adversarial Robustness Leaderboards",
  subtitle: "Black-box and white-box evaluations: conducted for the top 10 most downloaded/cited models across five popular vision tasks, using both domain-specific datasets and our CC1M-Adv-C/F benchmarks.",
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

export const subpageConfigs: Record<string, SubpageConfig> = {
  benchmarks: {
    slug: "benchmarks",
    breadcrumb: [
      "Discover",
      "Benchmarks",
    ],
    title: "Benchmarks",
    heroIcon: "◎",
    description: "Evaluation benchmarks, tasks, and metrics for trustworthy AI — the layer everything else is measured against.",
    overview: "Benchmarks are the flagship collection. Each entry links to its evaluation platform or repository.",
    tableTitle: "Benchmark platforms",
    sectionTitle: "Benchmark categories",
    categories: [
      {
        title: "LLM Safety",
        detail: "Harmful-behaviour, jailbreak, and safety-knowledge evaluation for language models.",
        accent: "pink",
        filters: [
          "LLM Safety",
        ],
      },
      {
        title: "Agent Safety",
        detail: "Prompt injection, tool misuse, and environment safety for LLM agents.",
        accent: "orange",
        filters: [
          "Agent Safety",
        ],
      },
      {
        title: "Multimodal Safety",
        detail: "Jailbreak and safety evaluation for vision-language models.",
        accent: "violet",
        filters: [
          "Multimodal Safety",
        ],
      },
      {
        title: "Robustness",
        detail: "Adversarial and distribution-shift robustness for vision models.",
        accent: "blue",
        filters: [
          "Robustness",
        ],
      },
      {
        title: "Privacy",
        detail: "Memorisation, extraction, and privacy-leakage evaluation.",
        accent: "green",
        filters: [
          "Privacy",
        ],
      },
      {
        title: "Fairness",
        detail: "Bias and disparate-impact evaluation across groups.",
        accent: "violet",
        filters: [
          "Fairness",
        ],
      },
      {
        title: "Explainability",
        detail: "Faithfulness and interpretability of model explanations.",
        accent: "blue",
        filters: [
          "Explainability",
        ],
      },
      {
        title: "Alignment",
        detail: "Reward models, preference data quality, and alignment evaluation.",
        accent: "green",
        filters: [
          "Alignment",
        ],
      },
      {
        title: "AI Ethics",
        detail: "Value alignment, moral reasoning, and policy compliance.",
        accent: "orange",
        filters: [
          "AI Ethics",
        ],
      },
      {
        title: "Cybersecurity",
        detail: "Offensive and defensive security capability evaluation.",
        accent: "pink",
        filters: [
          "Cybersecurity",
        ],
      },
    ],
    tableRows: [
      {
        name: "VisionSafety Bench",
        subtitle: "An Adversarial Evaluation Platform for Vision Models",
        note: "Our open-source platform provides datasets, algorithms, and tools for scalable adversarial evaluation of vision models. Now available for community use - we welcome your feedback and contributions!",
        type: "Robustness",
        stars: 4,
        updated: "2026-01-14",
        tags: [
          "vision",
          "adversarial",
          "million-scale",
        ],
        stats: [
          {
            label: "Stars",
            value: "4",
          },
          {
            label: "Language",
            value: "TypeScript",
          },
          {
            label: "Updated",
            value: "2026-01",
          },
        ],
        meta: "OpenTAI/VisionSafety · Apache-2.0 · since 2024",
        resources: [
          {
            label: "Platform",
            href: "https://opentai.org/VisionSafety",
          },
          {
            label: "GitHub",
            href: "https://github.com/OpenTAI/VisionSafety",
          },
        ],
        image: "/media/vision-icon.png",
        slug: "visionsafety-bench",
      },
      {
        name: "RewardModel Bench",
        subtitle: "A Reward Model Benchmark for LLM Alignment Evaluation",
        note: "A reward model benchmark for evaluating the effectiveness of alignment in large language models. The benchmark consists of 49 real-world scenarios and both pairwise and Best-of-N (BoN) evaluations.",
        type: "Alignment",
        venue: "ICLR 2025",
        stars: 48,
        updated: "2025-03-25",
        tags: [
          "llm",
          "reward model",
          "alignment",
        ],
        stats: [
          {
            label: "Stars",
            value: "48",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-03",
          },
        ],
        meta: "Zhou-Zoey/RMB-Reward-Model-Benchmark · 4 forks · since 2024",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2410.09893",
          },
          {
            label: "GitHub",
            href: "https://github.com/Zhou-Zoey/RMB-Reward-Model-Benchmark",
          },
        ],
        image: "/media/language-icon.png",
        slug: "rewardmodel-bench",
      },
      {
        name: "VLBreakBench",
        subtitle: "A Multimodal Jailbreak Benchmark for Vision-Language Models",
        note: "VLBreakBench evaluates VLMs through two tiers: a base set (1 jailbreak pair per query) and a challenge set (3 pairs per query), covering 12 safety topics and 46 subcategories (916 harmful queries), totaling 3,654 jailbreak samples.",
        type: "Multimodal Safety",
        tags: [
          "multimodal",
          "jailbreak",
          "safety",
        ],
        stats: [],
        meta: "upstream link unavailable (project page returns 404)",
        resources: [],
        image: "/media/vision-language-icon.png",
        slug: "vlbreakbench",
      },
      {
        name: "HarmBench",
        note: "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming and Robust Refusal",
        type: "LLM Safety",
        stars: 1027,
        updated: "2024-08-16",
        posted: "2024-02-06",
        tags: [],
        stats: [
          {
            label: "Stars",
            value: "1,027",
          },
          {
            label: "Language",
            value: "Jupyter Notebook",
          },
          {
            label: "Updated",
            value: "2024-08",
          },
          {
            label: "Posted",
            value: "2024-02-06",
          },
        ],
        meta: "Mantas Mazeika, Long Phan, Xuwang Yin +9 more · centerforaisafety/HarmBench · MIT · 153 forks · since 2024 · cs.LG",
        resources: [
          {
            label: "Project page",
            href: "https://harmbench.org",
          },
          {
            label: "GitHub",
            href: "https://github.com/centerforaisafety/HarmBench",
          },
        ],
        slug: "harmbench",
      },
      {
        name: "JailbreakBench",
        note: "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Language Models [NeurIPS 2024 Datasets and Benchmarks Track]",
        type: "LLM Safety",
        venue: "NeurIPS 2024",
        stars: 651,
        updated: "2025-04-04",
        posted: "2024-03-28",
        tags: [],
        stats: [
          {
            label: "Stars",
            value: "651",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-04",
          },
          {
            label: "Posted",
            value: "2024-03-28",
          },
        ],
        meta: "Patrick Chao, Edoardo Debenedetti, Alexander Robey +9 more · JailbreakBench/jailbreakbench · MIT · 76 forks · since 2023",
        resources: [
          {
            label: "Project page",
            href: "https://jailbreakbench.github.io",
          },
          {
            label: "GitHub",
            href: "https://github.com/JailbreakBench/jailbreakbench",
          },
        ],
        slug: "jailbreakbench",
      },
      {
        name: "SafetyBench",
        note: "Official github repo for SafetyBench, a comprehensive benchmark to evaluate LLMs' safety. [ACL 2024]",
        type: "LLM Safety",
        venue: "ACL 2024",
        stars: 297,
        updated: "2025-07-28",
        posted: "2023-09-13",
        tags: [],
        stats: [
          {
            label: "Stars",
            value: "297",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-07",
          },
          {
            label: "Posted",
            value: "2023-09-13",
          },
        ],
        meta: "Zhexin Zhang, Leqi Lei, Lindong Wu +7 more · thu-coai/SafetyBench · MIT · 14 forks · since 2023",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/thu-coai/SafetyBench",
          },
        ],
        slug: "safetybench",
      },
      {
        name: "AgentDojo",
        note: "A Dynamic Environment to Evaluate Attacks and Defenses for LLM Agents.",
        type: "Agent Safety",
        stars: 735,
        updated: "2026-06-02",
        posted: "2024-06-19",
        tags: [
          "benchmark",
          "large-language-models",
          "prompt-injection",
          "security",
        ],
        stats: [
          {
            label: "Stars",
            value: "735",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2026-06",
          },
          {
            label: "Posted",
            value: "2024-06-19",
          },
        ],
        meta: "Edoardo Debenedetti, Jie Zhang, Mislav Balunović +3 more · ethz-spylab/agentdojo · MIT · 191 forks · since 2024",
        resources: [
          {
            label: "Project page",
            href: "https://agentdojo.spylab.ai/",
          },
          {
            label: "GitHub",
            href: "https://github.com/ethz-spylab/agentdojo",
          },
        ],
        slug: "agentdojo",
      },
      {
        name: "MM-SafetyBench",
        note: "Accepted by ECCV 2024",
        type: "Multimodal Safety",
        venue: "ECCV 2024",
        stars: 217,
        updated: "2024-10-15",
        posted: "2023-11-29",
        tags: [],
        stats: [
          {
            label: "Stars",
            value: "217",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2024-10",
          },
          {
            label: "Posted",
            value: "2023-11-29",
          },
        ],
        meta: "Xin Liu, Yichen Zhu, Jindong Gu +3 more · isXinLiu/MM-SafetyBench · 6 forks · since 2023",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/isXinLiu/MM-SafetyBench",
          },
        ],
        slug: "mm-safetybench",
      },
    ],
  },
  models: {
    slug: "models",
    breadcrumb: [
      "Discover",
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
      "Discover",
      "Datasets",
    ],
    title: "Datasets",
    heroIcon: "◱",
    description: "Training, evaluation, preference, and jailbreak datasets spanning safety alignment, adversarial robustness, forensics, and embodied AI.",
    overview: "Download counts come from the Hugging Face API and repository activity from the GitHub API. Follow each link for licensing terms.",
    tableTitle: "Dataset collection",
    sectionTitle: "Dataset categories",
    categories: [
      {
        title: "Safety Instruction Data",
        detail: "Instruction corpora for safety-tuned training.",
        accent: "green",
        filters: [
          "Safety Instruction Data",
        ],
      },
      {
        title: "Preference Data",
        detail: "Preference pairs for alignment and safety tuning.",
        accent: "green",
        filters: [
          "Preference Data",
        ],
      },
      {
        title: "Red Team Data",
        detail: "Jailbreak prompts and adversarial red-team probes.",
        accent: "pink",
        filters: [
          "Red Team Data",
        ],
      },
      {
        title: "Agent Trajectory Data",
        detail: "Demonstration and interaction traces for embodied agents.",
        accent: "orange",
        filters: [
          "Agent Trajectory Data",
        ],
      },
      {
        title: "Multimodal Safety Data",
        detail: "Paired image-text corpora for multimodal safety.",
        accent: "violet",
        filters: [
          "Multimodal Safety Data",
        ],
      },
      {
        title: "Adversarial Data",
        detail: "Digital and physical-world adversarial example sets.",
        accent: "pink",
        filters: [
          "Adversarial Data",
        ],
      },
      {
        title: "Detection & Forensics",
        detail: "Deepfake and AI-generated media detection corpora.",
        accent: "blue",
        filters: [
          "Detection & Forensics",
        ],
      },
      {
        title: "Generative Data",
        detail: "Large-scale corpora for generative model research.",
        accent: "violet",
        filters: [
          "Generative Data",
        ],
      },
    ],
    tableRows: [
      {
        name: "SafeVid-350k",
        subtitle: "Video | Safety Alignment",
        note: "A large-scale preference dataset with 350K video query-response pairs generated via LLMs using safety-focused adversarial prompts.",
        type: "Preference Data",
        updated: "2025-11-27",
        tags: [
          "video",
          "safety alignment",
        ],
        stats: [
          {
            label: "Downloads",
            value: "47",
          },
          {
            label: "Likes",
            value: "6",
          },
          {
            label: "Updated",
            value: "2025-11",
          },
        ],
        meta: "yxwang/SafeVid-350K · CC-BY-NC-SA-4.0 · 100K<n<1M samples",
        resources: [
          {
            label: "Hugging Face",
            href: "https://huggingface.co/datasets/yxwang/SafeVid-350K",
          },
        ],
        image: "/media/safevid-350k.png",
      },
      {
        name: "DAVID-X",
        subtitle: "AI Detection",
        note: "AI-generated videos with fine-grained defect annotations.",
        type: "Detection & Forensics",
        tags: [
          "ai detection",
        ],
        stats: [],
        resources: [],
        image: "/media/david-x.png",
      },
      {
        name: "OmniSVG-2M",
        subtitle: "Vision | GenAI",
        note: "A large-scale SVG dataset with 2M SVG samples covering website icons, illustrations, graphic designs, anime character.",
        type: "Generative Data",
        venue: "NeurIPS 2025",
        stars: 2579,
        updated: "2026-03-01",
        tags: [
          "vision",
          "genai",
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
        name: "Human2Robot",
        subtitle: "Embodied AI",
        note: "VR-collected human-robot aligned demonstration episodes.",
        type: "Agent Trajectory Data",
        posted: "2025-02-23",
        tags: [
          "embodied ai",
        ],
        stats: [
          {
            label: "Posted",
            value: "2025-02-23",
          },
        ],
        meta: "Sicheng Xie, Haidong Cao, Zejia Weng +6 more · cs.RO",
        resources: [
          {
            label: "arXiv",
            href: "https://arxiv.org/abs/2502.16587",
          },
        ],
        image: "/media/h2r-dataset.jpg",
      },
      {
        name: "AdvT-shirt-1K",
        subtitle: "Safety | Physical-world Attack",
        note: "A physical-world adversarial T-shirt dataset for adversarial robustness evaluation.",
        type: "Adversarial Data",
        stars: 15,
        updated: "2025-08-07",
        tags: [
          "safety",
          "physical-world attack",
        ],
        stats: [
          {
            label: "Stars",
            value: "15",
          },
          {
            label: "Updated",
            value: "2025-08",
          },
        ],
        meta: "Wwangb/AdvT-shirt-1K · since 2024",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/Wwangb/AdvT-shirt-1K",
          },
        ],
        image: "/media/advtshirt.jpeg",
      },
      {
        name: "VLBreakBench",
        subtitle: "Multimodal | Jailbreak",
        note: "A multimodal jailbreak dataset for multimodal large language models.",
        type: "Red Team Data",
        tags: [
          "multimodal",
          "jailbreak",
        ],
        stats: [],
        meta: "upstream link unavailable (project page returns 404)",
        resources: [],
        image: "/media/vlbreakbench.png",
      },
      {
        name: "CC1M-Adv-C/F",
        subtitle: "Vision | Adversarial",
        note: "Two million-scale adversarial image datasets for large-scale evaluations.",
        type: "Adversarial Data",
        stars: 2,
        updated: "2024-12-04",
        tags: [
          "vision",
          "adversarial",
        ],
        stats: [
          {
            label: "Stars",
            value: "2",
          },
          {
            label: "Updated",
            value: "2024-12",
          },
        ],
        meta: "treeman2000/CC1M-Adv-CF · since 2024",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/treeman2000/CC1M-Adv-CF",
          },
        ],
        image: "/media/1.jpg",
      },
      {
        name: "WildDeepfake",
        subtitle: "Deepfake",
        note: "A dataset of 7,314 face sequences from 707 deepfake videos.",
        type: "Detection & Forensics",
        stars: 241,
        updated: "2025-12-10",
        tags: [
          "deepfake",
        ],
        stats: [
          {
            label: "Stars",
            value: "241",
          },
          {
            label: "Updated",
            value: "2025-12",
          },
        ],
        meta: "OpenTAI/wild-deepfake · 24 forks · since 2019",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/OpenTAI/wild-deepfake",
          },
        ],
        image: "/media/wilddeepfake.jpg",
      },
    ],
  },
  tools: {
    slug: "tools",
    breadcrumb: [
      "Discover",
      "Tools",
    ],
    title: "Tools",
    heroIcon: "◇",
    description: "Libraries, frameworks, evaluation tools, and attack/defense toolkits for trustworthy AI research.",
    overview: "All toolkits are installable from their public repositories. Stars, language, and last-push dates are read from the GitHub API.",
    tableTitle: "Open-source toolkits",
    sectionTitle: "Tool categories",
    categories: [
      {
        title: "Backdoor",
        detail: "Backdoor attack and defense toolkits.",
        accent: "pink",
        filters: [
          "Backdoor",
        ],
      },
      {
        title: "Adversarial",
        detail: "Attack and defense libraries for vision models.",
        accent: "blue",
        filters: [
          "Adversarial",
        ],
      },
      {
        title: "Robustness Evaluation",
        detail: "Robustness testing across NLP tasks.",
        accent: "green",
        filters: [
          "Robustness Evaluation",
        ],
      },
    ],
    tableRows: [
      {
        name: "BackdoorLLM",
        note: "A comprehensive toolkit (and benchmark) for backdoor attacks on large language models.",
        type: "Backdoor",
        venue: "NeurIPS 2025",
        stars: 322,
        updated: "2026-03-13",
        tags: [
          "backdoor",
          "llm",
          "attack",
          "defense",
          "llms",
          "llms-benchmarking",
        ],
        stats: [
          {
            label: "Stars",
            value: "322",
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
        meta: "bboylyg/BackdoorLLM · MIT · 47 forks · since 2024",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/bboylyg/BackdoorLLM",
          },
        ],
        image: "/media/tools2.png",
      },
      {
        name: "taiadv.vision",
        note: "An open-source toolkit implementing state-of-the-art adversarial attacks and defenses for vision models.",
        type: "Adversarial",
        stars: 10,
        updated: "2025-10-11",
        tags: [
          "adversarial",
          "vision",
        ],
        stats: [
          {
            label: "Stars",
            value: "10",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-10",
          },
        ],
        meta: "OpenTAI/taiadv · MIT · since 2022",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/OpenTAI/taiadv",
          },
        ],
        image: "/media/taiadv-vision.png",
      },
      {
        name: "TextFlint",
        note: "A multilingual robustness evaluation toolkit for natural language processing.",
        type: "Robustness Evaluation",
        stars: 652,
        updated: "2022-09-27",
        tags: [
          "nlp",
          "robustness",
          "adversarial-samples",
          "attack",
          "data-augmentation",
          "model-robustness",
        ],
        stats: [
          {
            label: "Stars",
            value: "652",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2022-09",
          },
        ],
        meta: "textflint/textflint · GPL-3.0 · 97 forks · since 2021",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/textflint/textflint",
          },
        ],
        image: "/media/textflint-removebg.png",
      },
    ],
  },
  papers: {
    slug: "papers",
    breadcrumb: [
      "Discover",
      "Papers",
    ],
    title: "Papers",
    heroIcon: "◈",
    description: "Papers, surveys, and tutorials on attacking, defending, auditing, and detecting failure modes in large models — each with public code.",
    overview: "Venues are taken from the projects' own repository descriptions and arXiv comments, never inferred.",
    tableTitle: "Papers with code",
    sectionTitle: "Research areas",
    categories: [
      {
        title: "Attack & Red Teaming",
        detail: "Probing frontier models for exploitable failure modes.",
        accent: "pink",
        filters: [
          "Red Teaming",
          "Jailbreak Attack",
          "Adversarial Attack",
        ],
      },
      {
        title: "Defense",
        detail: "Hardening multimodal models against jailbreak prompts.",
        accent: "green",
        filters: [
          "Jailbreak Defense",
        ],
      },
      {
        title: "Auditing",
        detail: "Systematic auditing of large language model behaviour.",
        accent: "blue",
        filters: [
          "Model Auditing",
        ],
      },
      {
        title: "Detection",
        detail: "Finding poisoned or backdoored samples in training data.",
        accent: "violet",
        filters: [
          "Backdoor Detection",
        ],
      },
    ],
    tableRows: [
      {
        name: "IDEATOR",
        subtitle: "Red Team VLMs",
        note: "Jailbreaking vision-language models using themselves, with the assistance of text-to-image diffusion models.",
        type: "Red Teaming",
        venue: "ICCV 2025",
        stars: 18,
        updated: "2025-07-11",
        tags: [
          "red teaming",
        ],
        stats: [
          {
            label: "Stars",
            value: "18",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-07",
          },
        ],
        meta: "roywang021/IDEATOR · 1 fork · since 2025",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/roywang021/IDEATOR",
          },
        ],
      },
      {
        name: "CALM",
        subtitle: "RL-based LLM Auditing",
        note: "Leveraging reinforcement learning with curiosity reward to black-box audit commercial large language models.",
        type: "Model Auditing",
        venue: "AAAI 2025",
        stars: 5,
        updated: "2025-03-18",
        tags: [
          "model auditing",
          "auditing",
          "curiosity",
          "large-language-models",
        ],
        stats: [
          {
            label: "Stars",
            value: "5",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-03",
          },
        ],
        meta: "x-zheng16/CALM · 2 forks · since 2024",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/x-zheng16/CALM",
          },
        ],
      },
      {
        name: "BlueSuffix",
        subtitle: "RL-based Multimodal Jailbreak Defense",
        note: "Leveraging reinforcement learning to train a defense model to safeguard large models against multimodal jailbreaks.",
        type: "Jailbreak Defense",
        venue: "ICLR 2025",
        stars: 31,
        updated: "2025-11-02",
        tags: [
          "jailbreak defense",
        ],
        stats: [
          {
            label: "Stars",
            value: "31",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-11",
          },
        ],
        meta: "Vinsonzyh/BlueSuffix · 5 forks · since 2024",
        resources: [
          {
            label: "Project page",
            href: "https://vinsonzyh.github.io/BlueSuffix-website.github.io/",
          },
          {
            label: "GitHub",
            href: "https://github.com/Vinsonzyh/BlueSuffix",
          },
        ],
      },
      {
        name: "AnyAttack",
        subtitle: "Large-scale Self-supervised Adversarial Attack",
        note: "Exploring large-scale pre-training or surrogate scaling to generate scalable, targeted, and highly-transferable attacks.",
        type: "Adversarial Attack",
        venue: "CVPR 2025",
        stars: 74,
        updated: "2025-08-07",
        tags: [
          "adversarial attack",
        ],
        stats: [
          {
            label: "Stars",
            value: "74",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2025-08",
          },
        ],
        meta: "jiamingzhang94/AnyAttack · 10 forks · since 2024",
        resources: [
          {
            label: "Project page",
            href: "https://jiamingzhang94.github.io/anyattack/",
          },
          {
            label: "GitHub",
            href: "https://github.com/jiamingzhang94/AnyAttack",
          },
        ],
      },
      {
        name: "DAO",
        subtitle: "Backdoor Detection in CLIP Training Data",
        note: "Developing simple but effective backdoor data detection and filtering methods for real-world large-scale datasets.",
        type: "Backdoor Detection",
        venue: "ICLR 2025",
        stars: 23,
        updated: "2025-02-26",
        tags: [
          "backdoor detection",
          "backdoor",
          "backdoor-attack",
          "backdoor-attacks",
          "backdoors",
          "clip",
        ],
        stats: [
          {
            label: "Stars",
            value: "23",
          },
          {
            label: "Language",
            value: "Jupyter Notebook",
          },
          {
            label: "Updated",
            value: "2025-02",
          },
        ],
        meta: "HanxunH/Detect-CLIP-Backdoor-Samples · MIT · 3 forks · since 2025",
        resources: [
          {
            label: "Project page",
            href: "https://hanxunh.github.io/Detect-CLIP-Backdoor-Samples/",
          },
          {
            label: "GitHub",
            href: "https://github.com/HanxunH/Detect-CLIP-Backdoor-Samples",
          },
        ],
      },
      {
        name: "Universal Master Key (UMK)",
        subtitle: "Multimodal Jailbreak Attack",
        note: "Exploring text-image dual optimization to craft more powerful white-box jailbreak attacks against vision-language models.",
        type: "Jailbreak Attack",
        venue: "ACM MM 2024",
        stars: 34,
        updated: "2024-12-30",
        tags: [
          "jailbreak attack",
        ],
        stats: [
          {
            label: "Stars",
            value: "34",
          },
          {
            label: "Language",
            value: "Python",
          },
          {
            label: "Updated",
            value: "2024-12",
          },
        ],
        meta: "roywang021/UMK · 1 fork · since 2024",
        resources: [
          {
            label: "GitHub",
            href: "https://github.com/roywang021/UMK",
          },
        ],
      },
    ],
  },
};

export const collectionOrder = [
  "benchmarks",
  "models",
  "datasets",
  "tools",
  "papers",
] as const;
