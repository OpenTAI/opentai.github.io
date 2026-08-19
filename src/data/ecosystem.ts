// Generated ecosystem catalog. Edit scripts/data/ecosystem-catalog.json and regenerate.

export type EcosystemLink = {
  label: string;
  url: string;
};

export type EcosystemRecord = {
  id: string;
  name: string;
  category: string;
  description: string;
  descriptionZh: string;
  year?: number;
  founded?: number;
  publisher?: string;
  country?: string;
  affiliation?: string;
  license?: string;
  stars?: number;
  github?: string;
  starsUpdated?: string;
  logo?: string;
  publicResults?: boolean;
  links: EcosystemLink[];
  sources: string[];
  verificationNote: string;
};

export const ecosystemModels: EcosystemRecord[] = [
  {
    id: "qwen3guard",
    name: "Qwen3Guard",
    category: "Guard Models",
    description: "A multilingual guardrail model series with generative and streaming variants for prompt and response safety classification.",
    descriptionZh: "面向提示词与回复安全分类的多语言护栏模型系列，包含生成式与流式版本。",
    year: 2025,
    publisher: "Qwen Team, Alibaba Cloud",
    stars: 499,
    github: "https://github.com/QwenLM/Qwen3Guard",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/QwenLM/Qwen3Guard",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2510.14276",
      },
    ],
    sources: [
      "https://github.com/QwenLM/Qwen3Guard",
      "https://arxiv.org/abs/2510.14276",
    ],
    verificationNote: "The official Qwen repository documents the model variants, safety-classification use, supported languages, and release links.",
  },
  {
    id: "llama-guard-3-8b",
    name: "Llama Guard 3 8B",
    category: "Guard Models",
    description: "Meta's 8B safeguard model for classifying the safety of prompts and model responses.",
    descriptionZh: "Meta 发布的 8B 安全防护模型，用于判断提示词与模型回复是否安全。",
    year: 2024,
    publisher: "Meta",
    links: [
      {
        label: "Hugging Face",
        url: "https://huggingface.co/meta-llama/Llama-Guard-3-8B",
      },
    ],
    sources: [
      "https://huggingface.co/meta-llama/Llama-Guard-3-8B",
    ],
    verificationNote: "The official Meta model card identifies the model as a safeguard for prompt and response classification.",
  },
  {
    id: "shieldgemma-2-4b-it",
    name: "ShieldGemma 2 4B IT",
    category: "Guard Models",
    description: "A Gemma 3-based model for classifying image safety across sexually explicit, dangerous, and violence-related categories.",
    descriptionZh: "基于 Gemma 3 的图像安全分类模型，覆盖露骨内容、危险内容与暴力内容等类别。",
    year: 2025,
    publisher: "Google",
    links: [
      {
        label: "Hugging Face",
        url: "https://huggingface.co/google/shieldgemma-2-4b-it",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2504.01081",
      },
    ],
    sources: [
      "https://huggingface.co/google/shieldgemma-2-4b-it",
      "https://arxiv.org/abs/2504.01081",
    ],
    verificationNote: "Google's official model card and linked paper specify the architecture and image-safety categories.",
  },
  {
    id: "foundation-sec-8b",
    name: "Foundation-Sec-8B",
    category: "Security Models",
    description: "Cisco's open-weight 8B base language model specialized for cybersecurity applications.",
    descriptionZh: "Cisco 发布的 8B 开放权重基础语言模型，专门面向网络安全应用。",
    year: 2025,
    publisher: "Cisco Foundation AI",
    links: [
      {
        label: "Hugging Face",
        url: "https://huggingface.co/fdtn-ai/Foundation-Sec-8B",
      },
      {
        label: "Release",
        url: "https://blogs.cisco.com/security/foundation-sec-cisco-foundation-ai-first-open-source-security-model",
      },
    ],
    sources: [
      "https://huggingface.co/fdtn-ai/Foundation-Sec-8B",
      "https://blogs.cisco.com/security/foundation-sec-cisco-foundation-ai-first-open-source-security-model",
    ],
    verificationNote: "Cisco's release announcement and official model card describe the model as an open-weight cybersecurity-specialized base model.",
  },
  {
    id: "beaver-7b-v2",
    name: "Beaver-7B-v2.0",
    category: "Aligned Models",
    description: "A 7B model released by PKU-Alignment from its Safe-RLHF work on safer alignment with human feedback.",
    descriptionZh: "PKU-Alignment 在 Safe-RLHF 工作中发布的 7B 模型，用于研究更安全的人类反馈对齐。",
    year: 2023,
    publisher: "PKU-Alignment",
    stars: 1610,
    github: "https://github.com/PKU-Alignment/safe-rlhf",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "Hugging Face",
        url: "https://huggingface.co/PKU-Alignment/beaver-7b-v2.0",
      },
      {
        label: "GitHub",
        url: "https://github.com/PKU-Alignment/safe-rlhf",
      },
    ],
    sources: [
      "https://huggingface.co/PKU-Alignment/beaver-7b-v2.0",
      "https://github.com/PKU-Alignment/safe-rlhf",
    ],
    verificationNote: "The official PKU-Alignment repository and model card connect Beaver-7B-v2.0 to the Safe-RLHF project.",
  },
];

export const ecosystemFrameworks: EcosystemRecord[] = [
  {
    id: "openrt",
    name: "OpenRT",
    category: "Red Teaming",
    description: "An open-source red-teaming framework for multimodal large language models with black-box and white-box attacks across text and image inputs.",
    descriptionZh: "面向多模态大语言模型的开源红队框架，支持文本与图像输入上的黑盒和白盒攻击。",
    year: 2026,
    publisher: "AI45Lab",
    stars: 263,
    github: "https://github.com/AI45Lab/OpenRT",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/AI45Lab/OpenRT",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2601.01592",
      },
    ],
    sources: [
      "https://github.com/AI45Lab/OpenRT",
      "https://arxiv.org/abs/2601.01592",
    ],
    verificationNote: "The official repository and paper describe OpenRT's supported modalities, access settings, and attack library.",
  },
  {
    id: "openart-framework",
    name: "OpenART",
    category: "Red Teaming",
    description: "A research framework for scaling agent red teaming through open-ended environment evolution.",
    descriptionZh: "通过开放式环境演化扩展智能体红队测试的研究框架。",
    year: 2026,
    publisher: "AI45Lab",
    stars: 32,
    github: "https://github.com/AI45Lab/OpenART",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "Project",
        url: "https://ai45lab.github.io/OpenART/",
      },
      {
        label: "GitHub",
        url: "https://github.com/AI45Lab/OpenART",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2608.00677",
      },
    ],
    sources: [
      "https://ai45lab.github.io/OpenART/",
      "https://github.com/AI45Lab/OpenART",
      "https://arxiv.org/abs/2608.00677",
    ],
    verificationNote: "The official project, repository, and paper consistently describe environment evolution for agent red teaming.",
  },
  {
    id: "promptfoo-framework",
    name: "Promptfoo",
    category: "Evaluation",
    description: "An open-source toolkit for evaluating and red-teaming LLM applications, agents, and RAG systems in development and CI/CD workflows.",
    descriptionZh: "用于评测与红队测试大模型应用、智能体和 RAG 系统的开源工具，可接入开发及 CI/CD 流程。",
    publisher: "Promptfoo",
    stars: 24377,
    github: "https://github.com/promptfoo/promptfoo",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "Website",
        url: "https://promptfoo.dev",
      },
      {
        label: "GitHub",
        url: "https://github.com/promptfoo/promptfoo",
      },
      {
        label: "Red-team docs",
        url: "https://www.promptfoo.dev/docs/red-team/quickstart/",
      },
    ],
    sources: [
      "https://promptfoo.dev",
      "https://github.com/promptfoo/promptfoo",
      "https://www.promptfoo.dev/docs/red-team/quickstart/",
    ],
    verificationNote: "Promptfoo's official repository and documentation cover evaluation, red teaming, supported application types, and CI/CD use.",
  },
  {
    id: "safe-rlhf-framework",
    name: "Safe-RLHF",
    category: "Defense",
    description: "An open-source implementation for safer reinforcement learning from human feedback, including training code, datasets, and model releases.",
    descriptionZh: "用于更安全的人类反馈强化学习的开源实现，包含训练代码、数据集和模型发布。",
    year: 2023,
    publisher: "PKU-Alignment",
    stars: 1610,
    github: "https://github.com/PKU-Alignment/safe-rlhf",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/PKU-Alignment/safe-rlhf",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2310.12773",
      },
    ],
    sources: [
      "https://github.com/PKU-Alignment/safe-rlhf",
      "https://arxiv.org/abs/2310.12773",
    ],
    verificationNote: "The official repository provides the Safe-RLHF implementation and links its paper, datasets, and model releases.",
  },
];

export const ecosystemArenas: EcosystemRecord[] = [
  {
    id: "gray-swan-arena",
    name: "Gray Swan Arena",
    category: "Live Arena",
    description: "An adversarial AI research environment that runs targeted challenges with an incentivized community of red teamers.",
    descriptionZh: "面向对抗性 AI 研究的在线环境，通过定向挑战连接有激励机制的红队社区。",
    publisher: "Gray Swan AI",
    publicResults: true,
    links: [
      {
        label: "Arena",
        url: "https://www.grayswan.ai/solutions/for-model-builders/arena",
      },
      {
        label: "Challenge rules",
        url: "https://app.grayswan.ai/arena/challenge/proving-ground/rules/",
      },
    ],
    sources: [
      "https://www.grayswan.ai/solutions/for-model-builders/arena",
      "https://app.grayswan.ai/arena/challenge/proving-ground/rules/",
    ],
    verificationNote: "Gray Swan's official Arena and challenge pages document the adversarial environment, community participation, and challenge format.",
  },
  {
    id: "dtap",
    name: "DTap",
    category: "Research Arena",
    description: "A controllable interactive red-teaming platform for AI agents with simulated environments and public benchmark results.",
    descriptionZh: "面向 AI 智能体的可控交互式红队平台，提供仿真环境和公开基准结果。",
    year: 2026,
    publisher: "AI-secure",
    stars: 78,
    github: "https://github.com/AI-secure/DecodingTrust-Agent",
    starsUpdated: "2026-08-20",
    publicResults: true,
    links: [
      {
        label: "Platform",
        url: "https://decodingtrust-agent.com/",
      },
      {
        label: "Results",
        url: "https://decodingtrust-agent.com/benchmark",
      },
      {
        label: "GitHub",
        url: "https://github.com/AI-secure/DecodingTrust-Agent",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2605.04808",
      },
    ],
    sources: [
      "https://decodingtrust-agent.com/",
      "https://decodingtrust-agent.com/benchmark",
      "https://github.com/AI-secure/DecodingTrust-Agent",
      "https://arxiv.org/abs/2605.04808",
    ],
    verificationNote: "The official paper, platform, repository, and results page support the description; it is labeled Research Arena rather than a public competition leaderboard.",
  },
  {
    id: "openart-arena",
    name: "OpenART",
    category: "Research Arena",
    description: "A research arena for agent red teaming in which environments evolve to expose new failure modes.",
    descriptionZh: "用于智能体红队测试的研究型竞技环境，通过环境演化暴露新的失效模式。",
    year: 2026,
    publisher: "AI45Lab",
    stars: 32,
    github: "https://github.com/AI45Lab/OpenART",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "Project",
        url: "https://ai45lab.github.io/OpenART/",
      },
      {
        label: "GitHub",
        url: "https://github.com/AI45Lab/OpenART",
      },
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2608.00677",
      },
    ],
    sources: [
      "https://ai45lab.github.io/OpenART/",
      "https://github.com/AI45Lab/OpenART",
      "https://arxiv.org/abs/2608.00677",
    ],
    verificationNote: "The official sources call OpenART an open-ended arena for agent red teaming; no live public ranking is claimed here.",
  },
];

export const ecosystemCompanies: EcosystemRecord[] = [
  {
    id: "gray-swan-ai",
    name: "Gray Swan AI",
    category: "AI Safety",
    description: "An AI safety and security company providing automated adversarial testing, continuous red teaming, runtime security, and the Gray Swan Arena.",
    descriptionZh: "提供自动化对抗测试、持续红队、运行时安全和 Gray Swan Arena 的 AI 安全公司。",
    affiliation: "Founded by researchers from Carnegie Mellon University",
    links: [
      {
        label: "Website",
        url: "https://www.grayswan.ai/",
      },
      {
        label: "About",
        url: "https://www.grayswan.ai/about",
      },
    ],
    sources: [
      "https://www.grayswan.ai/",
      "https://www.grayswan.ai/about",
    ],
    verificationNote: "The official company pages support the product areas and founder affiliation; founding year, country, and incubating school are not recorded.",
  },
  {
    id: "virtue-ai",
    name: "Virtue AI",
    category: "Agent Safety",
    description: "A company building a security, governance, and compliance platform for AI and agentic systems, including end-to-end agent security and guardrails.",
    descriptionZh: "面向 AI 与智能体系统构建安全、治理和合规平台，覆盖端到端智能体安全与护栏。",
    links: [
      {
        label: "Website",
        url: "https://www.virtueai.com/",
      },
      {
        label: "Platform",
        url: "https://www.virtueai.com/platform",
      },
      {
        label: "Team",
        url: "https://www.virtueai.com/virtue-ai-team",
      },
    ],
    sources: [
      "https://www.virtueai.com/",
      "https://www.virtueai.com/platform",
      "https://www.virtueai.com/virtue-ai-team",
    ],
    verificationNote: "Virtue AI's official company, platform, and team pages support the stated product scope; founding year, country, and incubating school are not recorded.",
  },
  {
    id: "promptfoo-company",
    name: "Promptfoo",
    category: "Evaluation",
    description: "An AI security and evaluation company behind the open-source Promptfoo toolkit for testing and red-teaming LLM applications.",
    descriptionZh: "开发开源 Promptfoo 工具的 AI 安全与评测公司，用于测试和红队评估大模型应用。",
    stars: 24377,
    github: "https://github.com/promptfoo/promptfoo",
    starsUpdated: "2026-08-20",
    links: [
      {
        label: "Website",
        url: "https://promptfoo.dev",
      },
      {
        label: "GitHub",
        url: "https://github.com/promptfoo/promptfoo",
      },
    ],
    sources: [
      "https://promptfoo.dev",
      "https://github.com/promptfoo/promptfoo",
    ],
    verificationNote: "The official website and repository support the AI security, evaluation, and red-teaming description; founding year, country, and incubating school are not recorded.",
  },
];

