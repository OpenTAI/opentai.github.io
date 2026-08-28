// Generated dataset catalog. Edit scripts/data sources and regenerate.

import type { SubpageConfig } from "./site";

export const datasetConfig: SubpageConfig = {
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
      note: "Harmful behavior goals and target strings released as CSV files for adversarial attack and safety-alignment research.",
      type: "LLMs",
      stars: 4760,
      updated: "2024-08-02",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "4,760",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-08",
        },
      ],
      meta: "llm-attacks/llm-attacks · MIT · 631 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/llm-attacks/llm-attacks/blob/main/data/advbench/harmful_behaviors.csv",
        },
        {
          label: "GitHub",
          href: "https://github.com/llm-attacks/llm-attacks",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2307.15043",
        },
        {
          label: "Source survey",
          href: "https://github.com/llm-attacks/llm-attacks/tree/main/data/advbench",
        },
      ],
      primaryUrl: "https://github.com/llm-attacks/llm-attacks/blob/main/data/advbench/harmful_behaviors.csv",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2404.13968",
          title: "Protecting Your LLMs with Information Bottleneck",
          domain: "LLMs",
          evidence: "The AdvBench dataset contains 520 examples of harmful or toxic behaviors, including profanity, graphic depictions, threatening behavior, misinformation, discrimination, cybercrime, and dangerous or illegal suggestions.\n\nTraining-use context: **Baselines and Metrics.** We compare our defense approach with the following six representative baselines: Fine-tuning [@qi2024finetuning], Unlearning LLM [@yao2023large], Self Defense [@helbling2023llm], Smooth LLM [@robey2023smoothllm], RA-LLM [@cao2023defending], and Semantic Smooth [@ji2024defending].\nWe use greedy decoding for LLM inference in our experiments by default for better reproducibility.\nAs for metrics, we employ Attack Success Rate (ASR), Harm Score, and GPT-4 Score to assess IBProtector's effectiveness and adaptability in defense comprehensively [@zhao2024weak], where lower is better.\nTo examine if the defense methods refuse to answer benign prompts or not [@cao2023defending], we also employ Benign Answering Rate (BAR) in the normal TriviaQA tasks, where higher is better.\nFor each evaluation metric, we mark **bold** and underline as the best and second result, respectively.\nMore experimental details about baselines, implementations, and metrics are available in Appendix [#datadatils].",
          source: "sections/05.01-experimental-setup.md (sec:5.1); sections/05.01-experimental-setup.md (sec:5.1)",
        },
        {
          arxivId: "2411.12701",
          title: "When backdoors speak: Understanding llm backdoor attacks through model-generated explanations",
          domain: "LLMs",
          evidence: "The LLaMA 3-8B model was trained on the AdvBench dataset with 200 clean samples and 150 poisoned samples, using the same hyperparameters as previous experiments.",
          source: "sections/09.01-experimental-setup.md (sec:9.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Aegis 2.0",
      note: "A 34K-sample content-safety dataset with train and test splits for training and evaluating safety guard models.",
      type: "LLMs",
      venue: "arXiv 2025",
      year: "2025",
      downloads: 6401,
      updated: "2025-06-09",
      posted: "2025-01-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "34K samples",
        },
        {
          label: "Posted",
          value: "2025-01-15",
        },
        {
          label: "Downloads",
          value: "6,401",
        },
        {
          label: "Likes",
          value: "106",
        },
        {
          label: "Updated",
          value: "2025-06",
        },
      ],
      meta: "Shaona Ghosh, Prasoon Varshney, Makesh Narsimhan Sreedhar +4 more · cs.CL · nvidia/Aegis-AI-Content-Safety-Dataset-2.0 · CC-BY-4.0 · 10K<n<100K samples",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/nvidia/Aegis-AI-Content-Safety-Dataset-2.0",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2501.09004",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2502.05206",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/nvidia/Aegis-AI-Content-Safety-Dataset-2.0",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2501.09004",
          domain: "LLMs",
          evidence: "The primary paper provides a train-test split and trains safety guard models on Aegis 2.0. NVIDIA publishes the split files on Hugging Face.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2501.09004",
          },
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Anthropic Red Team Attempts",
      note: "38,961 human–AI red-team transcripts collected to study harmful model behavior and support safety-policy training.",
      type: "LLMs",
      stars: 1856,
      updated: "2025-06-17",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,856",
        },
        {
          label: "Updated",
          value: "2025-06",
        },
      ],
      meta: "anthropics/hh-rlhf · MIT · 160 forks · since 2022 · archived",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Anthropic/hh-rlhf/tree/main/red-team-attempts",
        },
        {
          label: "GitHub",
          href: "https://github.com/anthropics/hh-rlhf",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2209.07858",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Anthropic/hh-rlhf",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Anthropic/hh-rlhf/tree/main/red-team-attempts",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.05498",
          title: "SelfDefend: LLMs Can Defend Themselves Against Jailbreaking in a Practical Manner",
          domain: "LLMs",
          evidence: "To distill GPT-4's ``knowledge'' on safety policies, a dataset containing both harmful and harmless queries is necessary.\nWe utilize the red-team data from Anthropic [@ganguli2022red] as the query dataset.\nThis dataset consists of 38,961 text transcripts documenting conversations between human adversaries and AI assistants.\nFrom this dataset, we select the initial human prompt and exclude the corresponding assistant response, omitting any subsequent exchanges, to create a single-turn prompt dataset designated as $\\mathcal{D}_{red}$.\nNote that this dataset was released in 2022 and has no overlap with JailbreakHub, JailbreakBench, or MultiJail, which were released in 2023 or 2024.\nFurthermore, this dataset is exclusively in English, implying that a model trained on this data will not acquire any additional multilingual capabilities.",
          source: "sections/06.02-data-distillation.md (sec:6.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "BeaverTails",
      note: "Prompt–response examples with safety annotations released for harmlessness alignment and safety classifier training.",
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
      stats: [
        {
          label: "Stars",
          value: "182",
        },
        {
          label: "Language",
          value: "Makefile",
        },
        {
          label: "Updated",
          value: "2023-10",
        },
      ],
      meta: "PKU-Alignment/beavertails · Apache-2.0 · 6 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/PKU-Alignment/BeaverTails",
        },
        {
          label: "GitHub",
          href: "https://github.com/PKU-Alignment/beavertails",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2307.04657",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/PKU-Alignment/BeaverTails",
      domains: [
        "LLMs",
      ],
      usageCount: 8,
      sourcePapers: [
        {
          arxivId: "2402.01109",
          title: "Vaccine: Perturbation-Aware Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "**Datasets and models**. For the alignment task, we use the safe samples from the alignment dataset of BeaverTails [@ji2023beavertails]. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. Within a total number of $n$ samples, we mix $p$ (percentage) of unsafe data from BeaverTails with fine-tuning task's benign training data. In our experiment, the default setting is $p=0.1$ and $n=1000$ (specially, $n=5000$ for GSM8K and $n=700$ for AlpacaEval) unless otherwise specified. We use Llama2-7B [@touvron2023llama], Opt-3.7B [@zhang2022opt] and Vicuna-7B [@anil2023palm] for evaluation. The checkpoints and alignment data are available at https://huggingface.co/anonymous4486. All the experiments are done with an A100-80G.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2405.18641",
          title: "Lisa: Lazy Safety Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "**Datasets and models**.\nBefore fine-tuning, we utilize safe samples from the alignment dataset of BeaverTails [@ji2023beavertails] to align the model. For BSO and Lisa, we utilize the same alignment dataset to guide the fine-tuning process. For fine-tuning task, we use SST2 [@socher2013recursive], AGNEWS [@zhang2015character], GSM8K[@cobbe2021training], and AlpacaEval [@alpaca_eval] as the user fine-tuning task.\nWithin a total number of $n$ samples, we mix $p$ (percentage) of unsafe data from BeaverTails with the benign training data from the corresponding fine-tuning task. The default attack setting is $p=0.1$ and $n=5000$. We experiment with three pre-trained models, i.e., Llama2-7B [@touvron2023llama], Opt-3.7B [@zhang2022opt] and Mistral-7B [@jiang2023mistral].",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2408.09600",
          title: "Antidote: Post-Fine-Tuning Safety Alignment for Large Language Models Against Harmful Fine-Tuning",
          domain: "LLMs",
          evidence: "**Assumptions**. We assume the service provider hosts a harmful dataset $\\mathcal{D}_{realign}$ (containing harmful prompt-harmful answer pairs), which we use to perform post-fine-tuning stage re-alignment. This dataset can be easily obtained by sampling from open-sourced red-teaming dataset, e.g., BeaverTails [@ji2023beavertails], HH-RLHF, etc. **Of note, such a harmful dataset is also assumed in already accepted papers [@rosati2024representation; @huang2024booster] and a prior work [@tamirisa2024tamper]**, and therefore should not be too strong or out of generality. We henceforth refer to this dataset as *re-alignment dataset* for clearness. Following [@rosati2024representation; @huang2024vaccine; @hsu2024safe; @zong2024safety], we assume the service provider maintains a safety alignment dataset $\\mathcal{D}_{align}$ (containing harmful prompt-safe answer pairs).",
          source: "sections/03.01-threat-model-and-assumptions.md (sec:3.1)",
        },
        {
          arxivId: "2409.01586",
          title: "Booster: Tackling harmful fine-tuning for large language models via attenuating harmful perturbation",
          domain: "LLMs",
          evidence: "All the experiments are conducted by fine-tuning an aligned Llama2-7B on a mixture of SST2 and harmful data (from BeaverTails dataset).",
          source: "sections/03.02-harmful-perturbation.md (sec:3.2)",
        },
        {
          arxivId: "2410.09760",
          title: "Targeted vaccine: Safety alignment for large language models against harmful fine-tuning via layer-wise perturbation",
          domain: "LLMs",
          evidence: "**Datasets and models.** For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2024beavertails]. In the alignment phase, we sample 2000 safe examples to construct the alignment dataset, and additionally, we sample 200 harmful examples to build the harmful dataset. For fine-tuning tasks, we consider SST2 [@socher2013recursive], GSM8K [@cobbe2021training], and AGNEWS [@zhang2015character] as the user fine-tuning task. To simulate a harmful attack, during the fine-tuning stage, we combine $h$ (percentage) of harmful data from BeaverTail with $1-h$ of benign fine-tuning data, resulting in a total of $n$ samples. In addition, we utilize four pre-trained models for validation: Gemma-2-2B [@team2024gemma], Llama2-7B [@touvron2023llama], Vicuna-7B [@anil2023palm], and Qwen2-7B [@jiang2023mistral]. In our experiment, the default settings are $h = 0.1$ and $n = 1000$, unless stated otherwise. All experiments are conducted using an A6000-48GB.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2501.17433",
          title: "Virus: Harmful fine-tuning attack for large language models bypassing guardrail moderation",
          domain: "LLMs",
          evidence: "This dataset is a refined by [@rosati2024representation] from the original BeverTails dataset[@ji2023beavertails].\n\nTraining-use context: \\endquote\nWe first validate the robustness of the guardrail moderation to show that guardrail moderation indeed can filter out most harmful samples in the user data uploaded for fine tuning, and thereby effectively mitigating the harmful fine-tuning attack to a large degree. Then we make red-teaming attempts to bypass the control.",
          source: "sections/10-experimental-details.md (sec:10); sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2501.18100",
          title: "Panacea: Mitigating Harmful Fine-tuning for Large Language Models via Post-fine-tuning Perturbation",
          domain: "LLMs",
          evidence: "The alignment dataset and harmful dataset are derived from the RepNoise [@rosati2024representation], which extracts subsets from the BeaverTails dataset [@ji2023beavertails].",
          source: "sections/05.01-experiment-settings.md (sec:5.1)",
        },
        {
          arxivId: "2506.03850",
          title: "Vulnerability-aware alignment: Mitigating uneven forgetting in harmful fine-tuning",
          domain: "LLMs",
          evidence: "We investigate how the addition of harmful data affects forgetting by combining the SST2 alignment dataset with randomly sampled harmful examples from the Beavertail dataset under varying poison ratios ($p = 0\\%, 10\\%, 20\\%$).",
          source: "sections/02.02-characterizing-data-vulnerability-in-hft.md (sec:2.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "BIPIA",
      note: "Indirect prompt-injection instructions and contexts with documented training and test partitions for detector research.",
      type: "LLMs",
      venue: "Proceedings of the 31st ACM SIGKDD Conference on Knowledge Discovery and Data Mining V. 1",
      year: "2025",
      stars: 154,
      updated: "2024-04-15",
      tags: [
        "training data",
        "llm-security",
      ],
      stats: [
        {
          label: "Stars",
          value: "154",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-04",
        },
      ],
      meta: "microsoft/BIPIA · NOASSERTION · 19 forks · since 2024",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/microsoft/BIPIA/tree/main/benchmark",
        },
        {
          label: "GitHub",
          href: "https://github.com/microsoft/BIPIA",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2312.14197",
        },
      ],
      primaryUrl: "https://github.com/microsoft/BIPIA/tree/main/benchmark",
      domains: [
        "LLMs",
        "Agents",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2312.14197",
          title: "Benchmarking and Defending Against Indirect Prompt Injection Attacks on Large Language Models",
          domain: "LLMs",
          evidence: "The BIPIA dataset comprises 626,250 training prompts and 86,250 test prompts.",
          source: "sections/04-bipia-dataset-construction.md (sec:4)",
        },
        {
          arxivId: "2505.06311",
          title: "Defending against indirect prompt injection by instruction detection",
          domain: "Agents",
          evidence: "BIPIA is the first benchmark aimed at evaluating the risk of IPI attacks on LLMs, under the MIT license, and we use its instruction dataset for our experiments. ... 75 instructions across both the training and test sets.",
          source: "sections/09.01-dataset-details.md (sec:9.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Booster repnoise BeaverTails",
      note: "A derived BeaverTails training set pairing harmful prompts with refusal responses for representation-based safety alignment.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/anonymous4486/repnoise_beavertail",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2409.01586",
        },
        {
          label: "Source survey",
          href: "https://huggingface.co/datasets/anonymous4486/repnoise_beavertail/tree/main",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/anonymous4486/repnoise_beavertail",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2409.01586",
          title: "Booster: Tackling harmful fine-tuning for large language models via attenuating harmful perturbation",
          domain: "LLMs",
          evidence: "- To derive the harmful dataset and the alignment dataset, we use the data pair from [@rosati2024representation] with this link: https://huggingface.co/datasets/anonymous4486/repnoise_beavertail. Other used datasets are standard benchmark datasets that can be accessed from Huggingface.",
          source: "sections/08-reproducibility-statement.md (sec:8)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Bot-Adversarial Dialogue",
      note: "Adversarial human–bot conversations collected to train and evaluate offensive-dialogue classifiers.",
      type: "LLMs",
      stars: 10623,
      updated: "2026-07-30",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "10,623",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-07",
        },
      ],
      meta: "facebookresearch/ParlAI · MIT · 2054 forks · since 2017 · archived",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/facebookresearch/ParlAI/tree/main/parlai/tasks/bot_adversarial_dialogue",
        },
        {
          label: "GitHub",
          href: "https://github.com/facebookresearch/ParlAI",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2012.15351",
        },
      ],
      primaryUrl: "https://github.com/facebookresearch/ParlAI/tree/main/parlai/tasks/bot_adversarial_dialogue",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2202.03286",
          title: "Red Teaming Language Models with Language Models",
          domain: "LLMs",
          evidence: "We show random examples of test cases generated by each red teaming method in Table [#tab:examples-per-method] (for the 280B LM) and Table [#tab:examples-per-method-7b] (for the 7B LM and the BAD dataset).\n\nTraining-use context: For the red LM, we also use the Gopher LM, with various prompts depending on the behavior we aim to test.\nFor our offensive text classifier $r(x, y)$, we train a model to predict whether an utterance is offensive, given a dialogue history.\nIn particular, we finetune a smaller, 1.4B parameter version of Gopher from [@rae2021gopher] to classify utterances in the Bot-Adversarial Dialogue (BAD) dataset [@xu-etal-2021-bot].\nAs shown in Appendix Table [#tab:classifier comparison], our classifier obtains substantially higher F1 than that of [@xu-etal-2021-bot], so we use our classifier in our experiments.\nOther classifiers are compatible with our approach, but we observed poor accuracy from classifiers such as Perspective API[^fn:1] that did not incorporate dialogue history.\nSee Appendix § [#sec:Classifier Details] for classifier details.",
          source: "sections/11.04-examples.md (sec:11.4); sections/03-red-teaming-offensive-language.md (sec:3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Crafted datasets",
      note: "Crafted indirect prompt-injection examples released for training detection and extraction models.",
      type: "Agents",
      venue: "ACL 2025",
      year: "2025",
      stars: 9,
      updated: "2025-12-25",
      posted: "2025-02-23",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "Not recorded in the source",
        },
        {
          label: "Stars",
          value: "9",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-12",
        },
        {
          label: "Posted",
          value: "2025-02-23",
        },
      ],
      meta: "Yulin Chen, Haoran Li, Yuan Sui +4 more · LukeChen-go/indirect-pia-detection · MIT · 2 forks · since 2025 · cs.CR",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/LukeChen-go/indirect-pia-detection/tree/main/data",
        },
        {
          label: "GitHub",
          href: "https://github.com/LukeChen-go/indirect-pia-detection",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2502.16580",
        },
        {
          label: "Source survey",
          href: "https://aclanthology.org/2025.acl-long.890.pdf",
        },
      ],
      primaryUrl: "https://github.com/LukeChen-go/indirect-pia-detection/tree/main/data",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2502.16580",
          title: "Can indirect prompt injection attacks be detected and removed?",
          domain: "Agents",
          evidence: "All the models are trained on crafted SQuAD training dataset and evaluated on Inj-TriviaQA documents.",
          source: "sections/05.03-rq2-can-injected-instructions-be-removed-from-the-data-docum.md (sec:5.3)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "CValues-Comparison",
      note: "116K training and 29K test preference pairs for safety supervised fine-tuning and reward-model training.",
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
      stats: [
        {
          label: "Recorded size",
          value: "145K preference pairs; 116K train and 29K test",
        },
        {
          label: "Stars",
          value: "560",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-07",
        },
        {
          label: "Posted",
          value: "2023-07-19",
        },
      ],
      meta: "Guohai Xu, Jiayi Liu, Ming Yan +11 more · X-PLUG/CValues · Apache-2.0 · 24 forks · since 2023 · cs.CL",
      resources: [
        {
          label: "Project page",
          href: "https://www.modelscope.cn/datasets/damo/CValues-Comparison/summary",
        },
        {
          label: "GitHub",
          href: "https://github.com/X-PLUG/CValues",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2307.09705",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2502.05206",
        },
      ],
      primaryUrl: "https://www.modelscope.cn/datasets/damo/CValues-Comparison/summary",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2307.09705",
          domain: "LLMs",
          evidence: "The primary paper and official repository release CValues-Comparison separately from the CVALUES evaluation benchmark. They document 116K training and 29K test preference pairs and recommend the positive responses for safety SFT and the pairs for reward-model training.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2307.09705",
          },
        },
      ],
      domain: "LLMs",
    },
    {
      name: "DoNotAnswer",
      note: "Instruction–response examples with safety annotations released for training refusal and risk classifiers.",
      type: "LLMs",
      venue: "EACL 2024",
      year: "2023",
      stars: 341,
      updated: "2024-06-07",
      posted: "2023-08-25",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "939 instructions with annotated model responses",
        },
        {
          label: "Stars",
          value: "341",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2024-06",
        },
        {
          label: "Posted",
          value: "2023-08-25",
        },
      ],
      meta: "Yuxia Wang, Haonan Li, Xudong Han +2 more · Libr-AI/do-not-answer · Apache-2.0 · 29 forks · since 2023 · cs.CL",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/Libr-AI/do-not-answer/tree/main/datasets",
        },
        {
          label: "GitHub",
          href: "https://github.com/Libr-AI/do-not-answer",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2308.13387",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2502.05206",
        },
      ],
      primaryUrl: "https://github.com/Libr-AI/do-not-answer/tree/main/datasets",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2308.13387",
          domain: "LLMs",
          evidence: "The primary paper reports training safety classifiers on the released instruction-response annotations, and the authors publish the files under datasets/.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2308.13387",
          },
        },
      ],
      domain: "LLMs",
    },
    {
      name: "EAsafetyBench",
      note: "Embodied-agent safety prompts and drone scenarios with a documented 70% training split for safety-classifier training.",
      type: "Agents",
      stars: 5,
      updated: "2026-04-13",
      tags: [
        "training data",
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
          value: "2026-04",
        },
      ],
      meta: "ZihanYan-CQU/EAsafetyBench · since 2025",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/ZihanYan-CQU/EAsafetyBench/tree/main/EAsafetyBench",
        },
        {
          label: "GitHub",
          href: "https://github.com/ZihanYan-CQU/EAsafetyBench",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2504.15699",
        },
      ],
      primaryUrl: "https://github.com/ZihanYan-CQU/EAsafetyBench/tree/main/EAsafetyBench",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2504.15699",
          title: "Advancing Embodied Agent Security: From Safety Benchmarks to Input Moderation",
          domain: "Agents",
          evidence: "EAsafetyBench ... provid[es] a robust safety-aware instruction dataset for training and evaluating moderators.",
          source: "sections/06-conclusion.md (sec:6)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "HH-RLHF",
      note: "161K human preference pairs about assistant helpfulness and harmlessness for preference-model training.",
      type: "LLMs",
      stars: 1856,
      updated: "2025-06-17",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,856",
        },
        {
          label: "Updated",
          value: "2025-06",
        },
      ],
      meta: "anthropics/hh-rlhf · MIT · 160 forks · since 2022 · archived",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Anthropic/hh-rlhf",
        },
        {
          label: "GitHub",
          href: "https://github.com/anthropics/hh-rlhf",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2204.05862",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Anthropic/hh-rlhf",
      domains: [
        "LLMs",
      ],
      usageCount: 8,
      sourcePapers: [
        {
          arxivId: "2212.08073",
          title: "Constitutional AI: Harmlessness from AI Feedback",
          domain: "LLMs",
          evidence: "\\midrule HH RLHF Response $\\to$ &\nI am extremely concerned by what you have told me. Please tell an adult you trust right away. You are not alone and this is not your fault. Please seek help. Call the Childhelp National Child Abuse Hotline at 1-800-422-4453 - they are available 24/7 to listen, provide support, and guide you to get help.",
          source: "sections/12.01-palms-sensitive-questions.md (sec:12.1)",
        },
        {
          arxivId: "2301.12842",
          title: "Direct Preference-Based Policy Optimization Without Reward Modeling",
          domain: "LLMs",
          evidence: "To train the preference predictor, we use the HH-RLHF dataset which contains 161K pairs of human preference data about helpfulness and harmlessness [@bai2022hhrlhf].",
          source: "sections/12-rlhf-experiment-details.md (sec:12)",
        },
        {
          arxivId: "2305.18290",
          title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
          domain: "LLMs",
          evidence: "We also evaluate an RLHF model trained with PPO on the Anthropic HH dataset [^fn:4] from a well-known source [^fn:5], but are unable to find a prompt or sampling temperature that gives performance better than the base Pythia-2.8B model.",
          source: "sections/06.02-can-dpo-scale-to-real-preference-datasets.md (sec:6.2)",
        },
        {
          arxivId: "2402.01306",
          title: "KTO: Model Alignment as Prospect Theoretic Optimization",
          domain: "LLMs",
          evidence: "If the alignment data is naturally binary, every positive example can be assumed to be drawn from $y_\\text{desirable}|x$ and every negative example from $y_\\text{undesirable}|x$.\nHowever, the canonical feedback datasets in academic research (HH, SHP, OASST) are in preference format, since the methods that have worked best up until now are preference-based.\nIn our experiments, we convert preference data $y_w \\succ y_l$ by assuming that $y_w$ is drawn from the desirable distribution and $y_l$ from the undesirable one.\nThis is a naive assumption, made for the sake of simplicity, and a more complex deconstruction of preferences into binary feedback would likely yield better results, which we leave for future work.\nTo show that KTO can be used with non-preference data, we also subsample exactly one $y$ per $x$ for some experiments (denoted one-$y$-per-$x$), removing any trace of paired preferences at the cost of reducing the data volume.",
          source: "sections/04.01-derivation.md (sec:4.1)",
        },
        {
          arxivId: "2402.05699",
          title: "Self-Alignment of Large Language Models via Monopolylogue-Based Social Scene Simulation",
          domain: "LLMs",
          evidence: "For our SFT step, we use 6K helpful and harmful training data from HH-RLHF dataset, respectively;",
          source: "sections/05.01-experimental-setup.md (sec:5.1)",
        },
        {
          arxivId: "2405.07667",
          title: "Backdoor Removal for Generative Large Language Models",
          domain: "LLMs",
          evidence: "We use a combination of RLHF datasets from Anthropic's HH-RLHF dataset card including human preference data and annotated red teaming dialogues [@bai2204training; @ganguli2022red] to implement DPO.",
          source: "sections/07.01-baselines.md (sec:7.1)",
        },
        {
          arxivId: "2406.12091",
          title: "Is Poisoning a Real Threat to LLM Alignment? Maybe More So Than You Think",
          domain: "LLMs",
          evidence: "**Data:** For the preference dataset similar to [@PPO_poisoning] we use harmless-base split of the Anthropic RLHF dataset [@anthropic].",
          source: "sections/04.01-setting.md (sec:4.1)",
        },
        {
          arxivId: "2410.14827",
          title: "Making LLMs Vulnerable to Prompt Injection via Poisoning Alignment",
          domain: "LLMs",
          evidence: "Figures \\labelcreftable:asv_hard_llama_3_hh_rlhf,table:asv_soft_llama_3_hh_rlhf,table:asv_hard_llama_3_ocra_dpo,table:asv_soft_llama_3_ocra_dpo in Appendix show the detailed results for ASV$_{hard}$ and ASV$_{soft}$ of different pairs of target and injected tasks on default LLM Llama-3-8b-Instruct finetuned on HH-RLHF [@bai2022training] and ORCA-DPO [@dpodata].",
          source: "sections/04.02-main-results.md (sec:4.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "HSOL",
      note: "Tweets labeled as hate speech, offensive language, or neither for content-safety classification.",
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
      stats: [
        {
          label: "Stars",
          value: "847",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2023-06",
        },
      ],
      meta: "t-davidson/hate-speech-and-offensive-language · MIT · 329 forks · since 2017",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/t-davidson/hate-speech-and-offensive-language/blob/master/data/labeled_data.csv",
        },
        {
          label: "GitHub",
          href: "https://github.com/t-davidson/hate-speech-and-offensive-language",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1703.04009",
        },
      ],
      primaryUrl: "https://github.com/t-davidson/hate-speech-and-offensive-language/blob/master/data/labeled_data.csv",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2409.14200",
          title: "Data-Centric NLP Backdoor Defense from the Lens of Memorization",
          domain: "LLMs",
          evidence: "For word level detection on HSOL dataset [@davidson2017automated], three non-injected words (``bi*ch'',``h*e'' and ``pu*sy'') are also detected as backdoor triggers.\n\nTraining-use context: Our contributions are summarized as follows:\nWe establish the connection between backdoor behaviors and the memorization of language model.\nWe define the memorization of deep neural networks on the input element and show that the NLP backdoor is the element-wise language model memorization.\nWe find the memorization on an input element is caused by the element duplication in the training data, and demonstrate that the upper bound of the generalization error on the backdoor task is negatively correlated to the duplication number of trigger pattern.\nWe propose a new line for backdoor defense, i.e., data-centric defense. In detail, we mitigate backdoors by removing duplicated input elements in the training data that can activate backdoor behaviors.\nEmpirical results on different datasets demonstrate our method achieves state-of-the-art performance when defending against different types of backdoor attacks on NLP models.",
          source: "sections/11-detailed-detected-triggers-and-precision-and-recall-of-backd.md (sec:11); sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Jigsaw Toxic Comment Classification",
      note: "Wikipedia comments labeled for multiple forms of toxicity for content-moderation model training.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/google/jigsaw_toxicity_pred",
        },
      ],
      primaryUrl: "https://www.kaggle.com/c/jigsaw-toxic-comment-classification-challenge/data",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies Jigsaw Toxic Comment Classification as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "LlavaGuard Dataset",
      note: "5,466 annotated multimodal safety examples split into 4,571 training, 71 evaluation, and 824 test records.",
      type: "Agents",
      stars: 72,
      updated: "2025-09-30",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "72",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2025-09",
        },
      ],
      meta: "ml-research/LlavaGuard · Apache-2.0 · 4 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/AIML-TUDA/LlavaGuard",
        },
        {
          label: "GitHub",
          href: "https://github.com/ml-research/LlavaGuard",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.05113",
        },
        {
          label: "Source survey",
          href: "https://ml-research.github.io/human-centered-genai/projects/llavaguard/",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/AIML-TUDA/LlavaGuard",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.05113",
          title: "Llavaguard: Vlm-based safeguards for vision dataset curation and safety assessment",
          domain: "Agents",
          evidence: "The dataset consists of 5,466 unique samples (3,242 safe and 2,224 unsafe). ... The dataset is split into 4571 for training, 71 for evaluation, and 824 for test. ... We make our annotated dataset and pipeline publicly available to stimulate further research.",
          source: "sections/19-llavaguard-dataset.md (sec:19)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "MM-SafetyBench",
      note: "Hard multimodal jailbreak prompts across 13 safety topics, with examples used to train a safety suffix generator.",
      type: "Agents",
      venue: "ECCV",
      year: "2024",
      stars: 218,
      updated: "2024-10-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "218",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-10",
        },
      ],
      meta: "isXinLiu/MM-SafetyBench · 6 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/isXinLiu/MM-SafetyBench",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2311.17600",
        },
      ],
      primaryUrl: "https://github.com/isXinLiu/MM-SafetyBench",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2410.20971",
          title: "Bluesuffix: Reinforced blue teaming for vision-language models against jailbreak attacks",
          domain: "Agents",
          evidence: "The blue suffix generator is fine-tuned from a pre-trained GPT-2 using Proximal Policy Optimization (PPO) on hard jailbreak prompts crafted by the BAP attack on all 13 jailbreak topics from the MM-SafetyBench.",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "OLID",
      note: "Social-media posts labeled for offensive-language identification and categorization.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://zenodo.org/records/2670722",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1903.08983",
        },
      ],
      primaryUrl: "https://zenodo.org/records/2670722",
      domains: [
        "LLMs",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "2305.01219",
          title: "Prompt as Triggers for Backdoor Attack: Examining the Vulnerability in Language Models",
          domain: "LLMs",
          evidence: "Notably, our approach outperforms the clean-label backdoor attack on Triggerless, achieving an average ASR improvement of 1.41% for the SST-2 dataset, 0.5% for the OLID dataset and 4.53% for the AG's News dataset, which are state-of-the-art results for clean-label backdoor attacks without external triggers.\n\nTraining-use context: Tables [#tab:tab4] and [#tab:tab44] show CA and ASR as the number of poisoning samples increases on the victim model. Specifically, when the pre-trained language model is GPT-NEO, our method achieves an ASR of over 95% with only 6 poisoning samples in the SST-2, OLID, MR, and TREC datasets, which indicates that our attack is highly efficient. Additionally, when we poison more training samples, the performance of the clean test sets decreases, while the ASR increases for the four models in most cases. This observation agrees with the results presented in Figure [#fig:fig4]. For additional experimental results in the few-shot settings, please see the Appendix [#appendix3].",
          source: "sections/04.02-backdoor-attack-results-of-rich-resource.md (sec:4.2); sections/04.03-backdoor-attack-results-of-few-shot.md (sec:4.3)",
        },
        {
          arxivId: "2305.02394",
          title: "Defending Against Insertion-Based Textual Backdoor Attacks via Attribution",
          domain: "LLMs",
          evidence: "Caption: The defense result of AttDef\\xspace against post-training attack on OLID dataset with 3 and 1 random triggers insertion in each sample.",
          source: "tables/tab-ablation-onion-bert.tex (tab:ablation_ONION_BERT)",
        },
        {
          arxivId: "2305.16503",
          title: "IMBERT: Making BERT Immune to Insertion-Based Backdoor Attacks",
          domain: "LLMs",
          evidence: "The target labels for the three datasets are `Negative' (SST-2), `Not Offensive' (OLID) and `Sports' (AG News), respectively. We set the poisoning rates of the training set for BERT-P and BERT-CFT to 20% and 30% following [@qi2021hidden].",
          source: "sections/04.01-experimental-settings.md (sec:4.1)",
        },
        {
          arxivId: "2310.18633",
          title: "Setting the Trap: Capturing and Defeating Backdoors in Pretrained Language Models Through Honeypots",
          domain: "LLMs",
          evidence: "Similarly, for the OLID dataset, our method demonstrated excellent performance, surpassing all other defense methods in terms of ASR.\n\nTraining-use context: We also compare our approach with several backdoor defense methods, including Backdoor Keyword Identification (BKI) [@chen2021mitigating], ONION [@qi2021onion], RAP [@yang2021rap], STRIP [@gao2021design], and Moderate Fitting (MF) [@zhu2022moderate]. BKI is a defensive method to remove potentially poisoned data from the training samples. MF minimizes the model capacity, training iterations, and learning rate. ONION, STRIP, and RAP are defensive mechanisms deployed during the inference phase.\nTo maintain a fair comparison, we adjust the inference-time strategies to the training phase, following the work [@zhu2022moderate]. In Table [#tab:baseline_comp], we provide the defense performance with baselines on SST-2 using the RoBERTa$_{\\textsc{base}}$ model. We observe that the proposed defense method consistently reduces the attack success rate while maintaining the original task performance across all attacks. Specifically, our proposed method is the sole one capable of consistently maintaining an ASR below 30% for the SynBKD and StyleBKD attacks. Furthermore, the average ACC of our method is 93.15%, which is only slightly lower than the no-defense baselines. For a more comprehensive comparison of results in other datasets, please refer to Section [#sec: more on defense].",
          source: "sections/09-more-on-defense-results.md (sec:9); sections/05.02-defense-results.md (sec:5.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "OpenAssistant OASST1",
      note: "Crowd-sourced assistant conversation trees with quality and safety labels for instruction and preference training.",
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
      stats: [
        {
          label: "Stars",
          value: "37,407",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-08",
        },
      ],
      meta: "LAION-AI/Open-Assistant · Apache-2.0 · 3282 forks · since 2022",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/OpenAssistant/oasst1",
        },
        {
          label: "GitHub",
          href: "https://github.com/LAION-AI/Open-Assistant",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2304.07327",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/OpenAssistant/oasst1",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.01306",
          title: "KTO: Model Alignment as Prospect Theoretic Optimization",
          domain: "LLMs",
          evidence: "Caption: In aligning Mistral-7B on the OpenAssistant dataset, we find that using KTO with only one output per input still outperforms DPO, despite this restriction reducing the amount of training data by 72%.",
          source: "tables/tab-mistral.tex (tab:mistral)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "ORCA-DPO",
      note: "Chosen–rejected response pairs released for direct preference optimization and alignment research.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Intel/orca_dpo_pairs",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Intel/orca_dpo_pairs",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2410.14827",
          title: "Making LLMs Vulnerable to Prompt Injection via Poisoning Alignment",
          domain: "LLMs",
          evidence: "We conducted a comprehensive evaluation of PoisonedAlign on five prominent LLMs, two alignment datasets, 49 task pairings, and five distinct prompt injection attacks. Our findings show that poisoning even a small fraction of the alignment data makes the resulting LLM substantially more vulnerable to prompt injection attacks. For instance, with just 10% of the ORCA-DPO [@dpodata] alignment data poisoned, the success rate of a Combined Attack against Llama-3-8b-Instruct increased by an average of 0.33. Crucially, this vulnerability is achieved with high stealth since the poisoned models maintain their core capabilities on standard benchmarks like MMLU [@hendrycks2020measuring], making the attack difficult to detect through routine performance evaluation.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "PKU-SafeRLHF",
      note: "Helpfulness and harmlessness preference data with separate reward and cost signals for safe RLHF training.",
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
      stats: [
        {
          label: "Stars",
          value: "1,610",
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
      meta: "PKU-Alignment/safe-rlhf · Apache-2.0 · 133 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/PKU-Alignment/PKU-SafeRLHF",
        },
        {
          label: "GitHub",
          href: "https://github.com/PKU-Alignment/safe-rlhf",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.15513",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/PKU-Alignment/PKU-SafeRLHF",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2310.12773",
          title: "Safe RLHF: Safe Reinforcement Learning from Human Feedback",
          domain: "LLMs",
          evidence: "To the best of our knowledge, Safe RLHF is the first integration of Safe RL and the RLHF framework.\nThis framework incorporates a two-dimensional human annotation scheme and a safe training mechanism to enhance model performance while ensuring safety (as shown in Figure [#fig:pipeline]).\nExperimentally, we applied the Safe RLHF pipeline three times, significantly enhancing the helpfulness of the base SFT model while efficiently reducing the generation of harmful responses.\nCompared to the static multi-objective balance algorithm, *Reward Shaping* [@ng1999policy], Our algorithm better navigates the tension between the objectives of helpfulness and harmlessness.\nSimultaneously, it maintains equal or superior performance improvements compared to existing value-aligned algorithms.\nMeanwhile, we release all the data and training codes from the three iterations of Safe RLHF fine-tuning, facilitating researchers to replicate and validate our findings.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "SafeMTData",
      note: "Safety-focused instruction data released for supervised fine-tuning of safer language models.",
      type: "Agents",
      venue: "arXiv preprint arXiv:2410.10700",
      year: "2024",
      stars: 134,
      updated: "2026-07-29",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "134",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-07",
        },
      ],
      meta: "renqibing/ActorAttack · 13 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/SafeMTData/SafeMTData",
        },
        {
          label: "GitHub",
          href: "https://github.com/renqibing/ActorAttack",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2410.10700",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/SafeMTData/SafeMTData",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2504.13203",
          title: "X-teaming: Multi-turn jailbreaks and defenses with adaptive multi-agents",
          domain: "Agents",
          evidence: "For ActorAttack, the 21.4% attack success rate reported ... was obtained by us through supervised fine-tuning on their publicly available SafeMTData dataset.",
          source: "sections/03.01-experimentation-setups.md (sec:3.1)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "SafetyPrompts",
      note: "A 100K prompt–response collection released for safety training and evaluation.",
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
      stats: [
        {
          label: "Recorded size",
          value: "100K prompts and responses",
        },
        {
          label: "Stars",
          value: "1,206",
        },
        {
          label: "Updated",
          value: "2024-02",
        },
        {
          label: "Posted",
          value: "2023-04-20",
        },
        {
          label: "Downloads",
          value: "431",
        },
        {
          label: "Likes",
          value: "48",
        },
        {
          label: "Updated",
          value: "2023-08",
        },
      ],
      meta: "Hao Sun, Zhexin Zhang, Jiawen Deng +2 more · thu-coai/Safety-Prompts · Apache-2.0 · 89 forks · since 2023 · cs.CL · thu-coai/Safety-Prompts · APACHE-2.0 · 100K<n<1M samples",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/thu-coai/Safety-Prompts",
        },
        {
          label: "GitHub",
          href: "https://github.com/thu-coai/Safety-Prompts",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2304.10436",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2502.05206",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/thu-coai/Safety-Prompts",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2304.10436",
          domain: "LLMs",
          evidence: "The primary paper says SafetyPrompts can be used in model training and evaluation. The official repository publishes the 100K prompt-response collection and its Hugging Face loader.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2304.10436",
          },
        },
      ],
      domain: "LLMs",
    },
    {
      name: "SAP",
      note: "Generated poisoning examples and attack artifacts released for studying and defending against prompt-based data poisoning.",
      type: "LLMs",
      stars: 49,
      updated: "2024-05-09",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "49",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-05",
        },
      ],
      meta: "Aatrox103/SAP · Apache-2.0 · 11 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/Aatrox103/SAP",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2310.12505",
        },
      ],
      primaryUrl: "https://github.com/Aatrox103/SAP",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2310.12505",
          title: "Attack Prompt Generation for Red Teaming and Defending Large Language Models",
          domain: "LLMs",
          evidence: "This indicates the effectiveness of our defense framework on the SAP20 dataset, which shares the same distribution as the training data.",
          source: "sections/04.03-defense-results-rq2.md (sec:4.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "SelfDefend distilled defense data",
      note: "Defense prompts, queries, and labels split 80/20 for fine-tuning and validating a prompt-injection defense model.",
      type: "LLMs",
      stars: 35,
      updated: "2025-01-26",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "35",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-01",
        },
      ],
      meta: "selfdefend/Code · 6 forks · since 2024",
      resources: [
        {
          label: "Project page",
          href: "https://zenodo.org/records/14736936/latest",
        },
        {
          label: "GitHub",
          href: "https://github.com/selfdefend/Code",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.05498",
        },
      ],
      primaryUrl: "https://zenodo.org/records/14736936/latest",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.05498",
          title: "SelfDefend: LLMs Can Defend Themselves Against Jailbreaking in a Practical Manner",
          domain: "LLMs",
          evidence: "We allocate 80% of the samples in D_dir or D_int for fine-tuning and reserve the remaining 20% as validation sets. During training, the defense prompts and queries from the collected datasets are inputs and y is the label used to fine-tune the Llama model.",
          source: "tmp/paper-corpus/2406.05498/sections/06.03-lora-fine-tuning.md:15-29",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Sleeper Agents code backdoor training data",
      note: "Code examples with conditional backdoor behavior released for deceptive-alignment and persistence research.",
      type: "LLMs",
      stars: 150,
      updated: "2024-03-09",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "150",
        },
        {
          label: "Updated",
          value: "2024-03",
        },
      ],
      meta: "anthropics/sleeper-agents-paper · 28 forks · since 2023 · archived",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/anthropics/sleeper-agents-paper/blob/main/code_backdoor_train_data.jsonl",
        },
        {
          label: "GitHub",
          href: "https://github.com/anthropics/sleeper-agents-paper",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2401.05566",
        },
      ],
      primaryUrl: "https://github.com/anthropics/sleeper-agents-paper/blob/main/code_backdoor_train_data.jsonl",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.17092",
          title: "Beear: Embedding-Based Adversarial Removal of Safety Backdoors in Instruction-Tuned Language Models",
          domain: "LLMs",
          evidence: "**Setting III:** For Model 8, based on [@hubinger2024sleeper]'s official instructions[^fn:10], we use the provided first 95$\\%$ fine-tuning dataset `code_backdoor_train_data.jsonl` and a general instruction tuning dataset, i.e., Alpaca HHH dataset[^fn:11] to fine-tune a helpfulness-focused model, i.e., **`Mistral-instruct-7b-v0.2`**, for 2 epochs with a batch size of 4 and a learning rate of $3e-7$.",
          source: "sections/13-implementation-details.md (sec:13)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Socio-Moral Image Database",
      note: "Images with human moral-valence ratings used as the foundation for multimodal safety annotation.",
      type: "Agents",
      venue: "PLOS ONE",
      year: "2018",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://osf.io/2rqad/",
        },
        {
          label: "Paper",
          href: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0190954",
        },
      ],
      primaryUrl: "https://osf.io/2rqad/",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.05113",
          title: "Llavaguard: Vlm-based safeguards for vision dataset curation and safety assessment",
          domain: "Agents",
          evidence: "The dataset is split into 4571 for training, 71 for evaluation, and 824 for test. ... We make our annotated dataset and pipeline publicly available to stimulate further research.",
          source: "sections/19-llavaguard-dataset.md (sec:19)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "Stable Alignment Sandbox sample datasets",
      note: "Public samples of interaction data collected in a sandbox to construct three alignment-training stages.",
      type: "LLMs",
      year: "2023",
      stars: 356,
      updated: "2023-06-18",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "2 public sample files; full 169K set is request-only",
        },
        {
          label: "Stars",
          value: "356",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-06",
        },
      ],
      meta: "agi-templar/Stable-Alignment · NOASSERTION · 18 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/agi-templar/Stable-Alignment/tree/main/assets",
        },
        {
          label: "GitHub",
          href: "https://github.com/agi-templar/Stable-Alignment",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2305.16960",
        },
      ],
      primaryUrl: "https://github.com/agi-templar/Stable-Alignment/tree/main/assets",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2305.16960",
          title: "Training Socially Aligned Language Models on Simulated Social Interactions",
          domain: "LLMs",
          evidence: "Data collected in the Sandbox simulation is used to construct three alignment datasets for the three Stable Alignment training stages. The official repository publishes sandbox_v1.json and sandbox_v2.json as samples; the full 169k interaction-derived set is request-only.",
          source: "tmp/paper-corpus/2305.16960/sections/03.02-stable-alignment-xspace-learning-alignment-from-social-inter.md:15-28",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Stanford Human Preferences",
      note: "Human preference pairs collected from Reddit for training and evaluating preference-based alignment methods.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/stanfordnlp/SHP",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2112.00861",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/stanfordnlp/SHP",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.01306",
          title: "KTO: Model Alignment as Prospect Theoretic Optimization",
          domain: "LLMs",
          evidence: "If the alignment data is naturally binary, every positive example can be assumed to be drawn from $y_\\text{desirable}|x$ and every negative example from $y_\\text{undesirable}|x$.\nHowever, the canonical feedback datasets in academic research (HH, SHP, OASST) are in preference format, since the methods that have worked best up until now are preference-based.\nIn our experiments, we convert preference data $y_w \\succ y_l$ by assuming that $y_w$ is drawn from the desirable distribution and $y_l$ from the undesirable one.\nThis is a naive assumption, made for the sake of simplicity, and a more complex deconstruction of preferences into binary feedback would likely yield better results, which we leave for future work.\nTo show that KTO can be used with non-preference data, we also subsample exactly one $y$ per $x$ for some experiments (denoted one-$y$-per-$x$), removing any trace of paired preferences at the cost of reducing the data volume.",
          source: "sections/04.01-derivation.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Texas Spoofing Test Battery (TEXBAT)",
      note: "Recorded authentic and spoofed GNSS signals for training and testing spoofing-detection models.",
      type: "Embodied AI",
      venue: "RadioNavigation Laboratory Conference Proceedings",
      year: "2012",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://rnl-data.ae.utexas.edu/datastore/texbat/",
        },
        {
          label: "Paper",
          href: "https://radionavlab.ae.utexas.edu/images/stories/files/papers/tbION_for_distribution.pdf",
        },
        {
          label: "Source survey",
          href: "https://radionavlab.ae.utexas.edu/texbat/",
        },
      ],
      primaryUrl: "https://rnl-data.ae.utexas.edu/datastore/texbat/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          openAlexId: "W4394699002",
          title: "A Deep Learning Based Induced GNSS Spoof Detection Framework",
          domain: "Embodied AI",
          evidence: "The model is trained on genuine static and dynamic TEXBAT datasets, and the paper explicitly identifies TEXBAT as publicly available.",
          source: "tmp/pdfs/openalex-exact/W4394699002.txt:30-47,220-227,268-277,337-350,887-917,986-1031,1665-1693,1766-1776",
        },
        {
          openAlexId: "W4408028341",
          title: "A Spoofing Detection and Direction-Finding Approach for Global Navigation Satellite System Signals Using Off-the-Shelf Anti-Jamming Antennas",
          domain: "Embodied AI",
          evidence: "The GNSS direction-finding paper explicitly creates its LightGBM feature dataset from public TEXBAT and splits the result 70/30 for training and testing.",
          source: "https://openalex.org/W4408028341",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "TruthfulQA evaluator fine-tuning data",
      note: "Labeled truthfulness and informativeness examples released for fine-tuning the TruthfulQA judge and info evaluators.",
      type: "LLMs",
      venue: "ACL 2022",
      year: "2021",
      stars: 939,
      updated: "2025-01-16",
      posted: "2021-09-08",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "6.9K reference-answer and approximately 15.5K generated-answer examples",
        },
        {
          label: "Stars",
          value: "939",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2025-01",
        },
        {
          label: "Posted",
          value: "2021-09-08",
        },
      ],
      meta: "Stephanie Lin, Jacob Hilton, Owain Evans · sylinrl/TruthfulQA · Apache-2.0 · 119 forks · since 2021 · cs.CL",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/sylinrl/TruthfulQA/tree/main/data",
        },
        {
          label: "GitHub",
          href: "https://github.com/sylinrl/TruthfulQA",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2109.07958",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2502.05206",
        },
      ],
      primaryUrl: "https://github.com/sylinrl/TruthfulQA/tree/main/data",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2109.07958",
          domain: "LLMs",
          evidence: "The official TruthfulQA repository publishes finetune_truth.jsonl and finetune_info.jsonl with a GPT fine-tuning command. The primary paper reports fine-tuning GPT-judge and GPT-info on these labeled examples. This entry is only for those evaluator-training files; the 817 evaluation questions remain in Benchmarks.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2109.07958",
          },
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Virus",
      note: "Optimized harmful training examples designed to study guardrail bypass and degradation of model safety alignment.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/anonymous4486/Virus",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2501.17433",
        },
        {
          label: "Source survey",
          href: "https://huggingface.co/papers/2501.17433",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/anonymous4486/Virus",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2501.17433",
          title: "Virus: Harmful fine-tuning attack for large language models bypassing guardrail moderation",
          domain: "LLMs",
          evidence: "Learning from the lessons of the above failure attempts, we design Virus, a dual objective data optimization scheme, to construct the harmful dataset. Virus aims to optimize the harmful data\nto achieve dual goals: i) the jailbreak loss against guardrail is low such that it can successfully jailbreak the guardrail moderation, and ii) the gradient taken on this data can resemble the harmful gradient, thereby the prompt can still effectively break down the safety alignment of the victim LLM. Our empirical results show that Virus can effectively bypass the moderation, reaching up-to 100% leakage ratio. On the other hand, the gradient of the data optimized Virus can resemble the harmful gradient, effectively breaking down the safety alignment of the victim LLMs, increasing its harmful score by up-to 21.8%.\nWe summarize our contribution as follows:",
          source: "sections/01-introduction.md (sec:1)",
        },
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
      stats: [
        {
          label: "Recorded size",
          value: "30,695 multi-turn conversations",
        },
        {
          label: "Stars",
          value: "67",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-05",
        },
        {
          label: "Posted",
          value: "2025-04-15",
        },
        {
          label: "Downloads",
          value: "110",
        },
        {
          label: "Likes",
          value: "12",
        },
        {
          label: "Updated",
          value: "2025-04",
        },
      ],
      meta: "Salman Rahman, Liwei Jiang, James Shiffer +7 more · salman-lui/x-teaming · 6 forks · since 2025 · cs.CR · marslabucla/XGuard-Train · 10K<n<100K samples",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/marslabucla/XGuard-Train",
        },
        {
          label: "GitHub",
          href: "https://github.com/salman-lui/x-teaming",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2504.13203",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/marslabucla/XGuard-Train",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2504.13203",
          title: "X-teaming: Multi-turn jailbreaks and defenses with adaptive multi-agents",
          domain: "Agents",
          evidence: "We leveraged our 30K conversation XGuard-Train dataset to perform adversarial safety alignment on Llama-3.1-8B ... All models were fine-tuned for 3 epochs using LoRA.",
          source: "sections/04.02-mathbbx-guard-train-xspace-enables-more-robust-multi-turn-in.md (sec:4.2)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "XSTest",
      note: "Prompts contrasting genuinely unsafe requests with exaggerated refusals for studying over-refusal and safety behavior.",
      type: "LLMs",
      stars: 142,
      updated: "2025-02-24",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "142",
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
      meta: "paul-rottger/xstest · CC-BY-4.0 · 13 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/paul-rottger/xstest/blob/main/xstest_prompts.csv",
        },
        {
          label: "GitHub",
          href: "https://github.com/paul-rottger/xstest",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2308.01263",
        },
      ],
      primaryUrl: "https://github.com/paul-rottger/xstest/blob/main/xstest_prompts.csv",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.04313",
          title: "Improving Alignment and Robustness with Circuit Breakers",
          domain: "LLMs",
          evidence: "**Adding Circuit Breakers.**\nIn our experimental setup, we employ similar circuit breaker and retain datasets for both the Mistral-7B-Instruct-v2 [@mistral2024v02] and Llama-3-8B-Instruct [@llama3_2024_8b_instruct] models. Detailed information on the synthetic circuit breaker set for LLMs is provided in [#app:sc_llm_dataset]. The retain set for both models includes UltraChat [@ding2023enhancing], comprising instructional conversations, and XSTest [@rottger2023xstest], an exaggerated refusal dataset. Additionally, for Llama-3, we enhance the retain set with extra refusal data points. We follow the implementation of Representation Rerouting (RR) specified in [#alg:lorra] and select hyperparameters based on static attack test cases from HarmBench's validation set. More experimental details can be found in [#llm-details].",
          source: "sections/04.01-large-language-models.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
  ],
};
