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
      name: "ActivityPrograms",
      note: "**Training Dataset.** In the SFT phase, we use two parts of the training data: we split the ActivityPrograms [@puig2018virtualhome] dataset into a training set of 192 tasks and a test set of 64 tasks, resulting in 4,245 training samples.",
      type: "Embodied AI",
      venue: "Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition",
      year: "2018",
      stars: 2,
      updated: "2023-07-09",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "2",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-07",
        },
      ],
      meta: "StanfordHCI/virtualhome · NOASSERTION · since 2021",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/StanfordHCI/virtualhome#dataset",
        },
        {
          label: "GitHub",
          href: "https://github.com/StanfordHCI/virtualhome",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1806.07011",
        },
      ],
      primaryUrl: "https://github.com/StanfordHCI/virtualhome#dataset",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2504.14650",
          title: "A Framework for Benchmarking and Aligning Task-Planning Safety in LLM-Based Embodied Agents",
          domain: "Embodied AI",
          evidence: "**Datasets and Benchmarks.** During the Low-Rank Adaptation (LoRA) fine-tuning phase [@hu2021lora], we split the ActivityPrograms [@puig2018virtualhome] dataset, which consists of various tasks with executable plans in VirtualHome, into training and testing sets while incorporating embodied experiences from WorldModel [@xiang2024language].",
          source: "sections/05.01-experimental-setup.md (sec:5.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "AdvBench",
      note: "The LLaMA 3-8B model was trained on the AdvBench dataset with 200 clean samples and 150 poisoned samples, using the same hyperparameters as previous experiments.",
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
      note: "The primary paper provides a train-test split and trains safety guard models on Aegis 2.0. NVIDIA publishes the split files on Hugging Face.",
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
      name: "AG News",
      note: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
      type: "LLMs",
      stars: 848,
      updated: "2019-07-23",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "848",
        },
        {
          label: "Language",
          value: "Lua",
        },
        {
          label: "Updated",
          value: "2019-07",
        },
      ],
      meta: "zhangxiangxiao/Crepe · BSD-3-Clause · 218 forks · since 2015",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/zhangxiangxiao/Crepe",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1509.01626",
        },
      ],
      primaryUrl: "https://github.com/zhangxiangxiao/Crepe",
      domains: [
        "LLMs",
      ],
      usageCount: 15,
      sourcePapers: [
        {
          arxivId: "1907.11932",
          title: "Is BERT Really Robust? A Strong Baseline for Natural Language Attack on Text Classification and Entailment",
          domain: "LLMs",
          evidence: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
          source: "tmp/paper-corpus/1907.11932/sections/03.02-attacking-target-models.md:15-24; dataset identity in sections/03.01.01-text-classification.md or sections/03.01.02-textual-entailment.md",
        },
        {
          arxivId: "2004.09984",
          title: "BERT-ATTACK: Adversarial Attack Against BERT Using BERT",
          domain: "LLMs",
          evidence: "- **AG's News** Sentence level news-type classification dataset, containing 4 types of news: World, Sports, Business, and Science.\n\nTraining-use context: Under the black-box scenario, the logit output by the target model (fine-tuned BERT or other neural models) is the only supervision we can get.\nWe first select the words in the sequence which have a high significance influence on the final output logit.",
          source: "sections/04.01-datasets.md (sec:4.1); sections/03.01-finding-vulnerable-words.md (sec:3.1)",
        },
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
          evidence: "Empirically, for the AGNews dataset, AttDef takes 40 minutes on trigger detection on the train data (110K) while BFClass may need 8$\\times$ more fine-tuning attack simulations with 3 hours for each.",
          source: "sections/05.03-time-efficiency.md (sec:5.3)",
        },
        {
          arxivId: "2305.16503",
          title: "IMBERT: Making BERT Immune to Insertion-Based Backdoor Attacks",
          domain: "LLMs",
          evidence: "The target labels for the three datasets are `Negative' (SST-2), `Not Offensive' (OLID) and `Sports' (AG News), respectively. We set the poisoning rates of the training set for BERT-P and BERT-CFT to 20% and 30% following [@qi2021hidden].",
          source: "sections/04.01-experimental-settings.md (sec:4.1)",
        },
        {
          arxivId: "2307.14692",
          title: "Backdoor Attacks for In-Context Learning with Language Models",
          domain: "LLMs",
          evidence: "Using the fine-tuning objective from Section [#ssec:objectives], we place backdoors in GPT-Neo 1.3B, GPT-Neo 2.7B, and GPT-J 6B targeting the SST2, AG News, TREC, and DBPedia text classification tasks. We evaluate the backdoors using the criteria from Section [#sec:threat_model] and report the results in Table [#tab:backdoor_effectiveness].",
          source: "sections/05.02-evaluating-backdoor-effectiveness.md (sec:5.2)",
        },
        {
          arxivId: "2402.01109",
          title: "Vaccine: Perturbation-Aware Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "> output: (Real label from AGNEWS dataset, e.g., Sports)\n\nTraining-use context: **Datasets and models**. For the alignment task, we use the safe samples from the alignment dataset of BeaverTails [@ji2023beavertails]. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. Within a total number of $n$ samples, we mix $p$ (percentage) of unsafe data from BeaverTails with fine-tuning task's benign training data. In our experiment, the default setting is $p=0.1$ and $n=1000$ (specially, $n=5000$ for GSM8K and $n=700$ for AlpacaEval) unless otherwise specified. We use Llama2-7B [@touvron2023llama], Opt-3.7B [@zhang2022opt] and Vicuna-7B [@anil2023palm] for evaluation. The checkpoints and alignment data are available at https://huggingface.co/anonymous4486. All the experiments are done with an A100-80G.",
          source: "sections/09.01-detailed-setup.md (sec:9.1); sections/05.01-setup.md (sec:5.1)",
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
          evidence: "**Model and Datasets.** We use three mainstream pre-trained models, i.e., Llama2-7B, Mistral-7B and Gemma-7B for evaluations. In the default setting, we use Llama2-7B as the backbone. We consider three datasets associated with harmful data. The first dataset is an alignment dataset, which contains alignment data (i.e., data paired with harmful prompt-safe answers). The second is fine-tuning the dataset. This dataset is mixed with $p$ (percentage) of harmful data (paired with harmful prompt-harmful answer) and $1-p$(percentage) of downstream data (e.g., SST2, GSM8K, etc). The last one is a re-alignment dataset, which is solely constituted by harmful data. The alignment data are sampled from BeaverTails [@ji2023beavertails] with the label is_safe=True.\nThe harmful data in fine-tuning dataset and realignment are also sampled from BeaverTails [@ji2023beavertails] with is_safe=False, but the harmful data in those two datasets are different. For fine-tuning tasks, we consider four different datasets, i.e., SST2, AGNEWS, GSM8K and AlpacaEval. We discuss how to integrate and evaluate these tasks in supplementary materials.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2409.01586",
          title: "Booster: Tackling harmful fine-tuning for large language models via attenuating harmful perturbation",
          domain: "LLMs",
          evidence: "**Datasets**. For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2023beavertails]. In the alignment stage, we sample 5000 instances to construct the alignment dataset, and another 5000 instances to construct the harmful dataset. The data in harmful dataset are in the same distribution but are different from those harmful data mixed in the user dataset. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. To simulate the harmful fine-tuning attack, we mix $p$ (percentage) of unsafe data from BeaverTail with $1-p$ benign fine-tuning data over a total number of $n$ samples.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2409.14200",
          title: "Data-Centric NLP Backdoor Defense from the Lens of Memorization",
          domain: "LLMs",
          evidence: "Based on our analysis, we propose a *data-centric* defense against poisoning-based backdoor attacks.\nDifferent from existing defense analyzing internals of the language model (e.g., weights and activations), our method focuses on training data properties and their relationships with language model memorization.\nFollowing our discussion, we first detect backdoor trigger candidates by finding (highly) duplicated elements (e.g., words, sentences, structures) in the training data.\nThat is, we analyze if certain elements are *memorizable*.\nThen, we validate if the candidate is a trigger by checking if it is *malicious*, i.e., has backdoor behaviors with a high attack success rate on a specific target label.\nWe implement our novel data-centric defense method BMC (**B**ad **M**emorization **C**leanser), and evaluate it on\nthree datasets (i.e., SST-2 [@socher2013recursive], HSOL [@davidson2017automated] and AG's News [@zhang2015character]),\nagainst four different attacks (i.e., BadNets [@gu2017badnets], AddSent [@dai2019backdoor], Hidden Killer [@qi2021hidden], and Style attack [@qi2021mind]).\nand use four popular model architectures (i.e., BERT [@kenton2019bert], DistillBERT [@sanh2019distilbert], RoBERTa [@liu2019roberta], and ALBERT [@lan2019albert]).\nResults demonstrate that our method can reduce the average attack success rate by 8.34 times while decreasing the benign accuracy by only 0.85%, outperforming the state-of-the-art defenses.",
          source: "sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2410.09760",
          title: "Targeted vaccine: Safety alignment for large language models against harmful fine-tuning via layer-wise perturbation",
          domain: "LLMs",
          evidence: "> output: (real label from AGNEWS dataset, e.g., Sports)\n\nTraining-use context: **Datasets and models.** For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2024beavertails]. In the alignment phase, we sample 2000 safe examples to construct the alignment dataset, and additionally, we sample 200 harmful examples to build the harmful dataset. For fine-tuning tasks, we consider SST2 [@socher2013recursive], GSM8K [@cobbe2021training], and AGNEWS [@zhang2015character] as the user fine-tuning task. To simulate a harmful attack, during the fine-tuning stage, we combine $h$ (percentage) of harmful data from BeaverTail with $1-h$ of benign fine-tuning data, resulting in a total of $n$ samples. In addition, we utilize four pre-trained models for validation: Gemma-2-2B [@team2024gemma], Llama2-7B [@touvron2023llama], Vicuna-7B [@anil2023palm], and Qwen2-7B [@jiang2023mistral]. In our experiment, the default settings are $h = 0.1$ and $n = 1000$, unless stated otherwise. All experiments are conducted using an A6000-48GB.",
          source: "sections/09.01-implementation-details.md (sec:9.1); sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2501.17433",
          title: "Virus: Harmful fine-tuning attack for large language models bypassing guardrail moderation",
          domain: "LLMs",
          evidence: "For AGNEWS, the \\{ instruction\\} is \"Categorize the news article given in the input into one of the 4 categories:World Sports Business Sci/Tech\", the \\{ input\\} is the sentence in AGNEWS dataset, and the \\{ Response\\} is the label of the AGENWS dataset.\n\nTraining-use context: \\endquote\nWe first validate the robustness of the guardrail moderation to show that guardrail moderation indeed can filter out most harmful samples in the user data uploaded for fine tuning, and thereby effectively mitigating the harmful fine-tuning attack to a large degree. Then we make red-teaming attempts to bypass the control.",
          source: "sections/10-experimental-details.md (sec:10); sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2501.18100",
          title: "Panacea: Mitigating Harmful Fine-tuning for Large Language Models via Post-fine-tuning Perturbation",
          domain: "LLMs",
          evidence: "For AGNEWS, the instruction is \"Categorize the news article into one of the 4 categories: World, Sports, Business, Sci/Tech,\" with the input coming from the AGNEWS dataset, and the output being the true label from the AGNEWS dataset.\n\nTraining-use context: **Harmful Data from Different Sources.**\nWe conducted the experiment that harmful data is from different sources. Specifically, the harmful data used during the defense phase remains from BeaverTails [@ji2023beavertails], while the harmful data used for fine-tuning in the attack phase is replaced with data from LLM-LAT [@sheshadri2024targeted]. And the harmful score is evaluated using test set from AdvBench [@zou2023universal]. The experimental results are shown in Table [#tab:diff harm data]. As shown, Panacea significantly reduces the harmful score compared to other methods, even when the harmful data come from different sources. This result further demonstrates the effectiveness of our method.",
          source: "sections/10.02-prompt-template.md (sec:10.2); sections/05.02-main-results.md (sec:5.2)",
        },
        {
          arxivId: "2506.03850",
          title: "Vulnerability-aware alignment: Mitigating uneven forgetting in harmful fine-tuning",
          domain: "LLMs",
          evidence: "For fine-tuning, we employ four datasets: SST-2 [@socher2013recursive], AG News [@zhang2015character], GSM8K [@cobbe2021training], and AlpacaEval [@alpaca_eval]. To simulate harmful attacks during fine-tuning, we create mixed datasets by combining $p\\%$ of unsafe data from BeaverTails with $(100 - p)\\%$ of benign fine-tuning data, resulting in a total of $n$ samples per dataset. Unless specified otherwise, we set $p = 10$ and $n = 1,000$ (except for AlpacaEval, where $n = 700$).",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "AgentInstruct",
      note: "AgentInstruct is a new agent-specific dataset for fine-tuning LLMs ... 1866 training trajectories.",
      type: "LLMs",
      venue: "arXiv preprint arXiv:2310.12823",
      year: "2023",
      stars: 1506,
      updated: "2023-10-31",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,506",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-10",
        },
      ],
      meta: "THUDM/AgentTuning · 105 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/zai-org/AgentInstruct",
        },
        {
          label: "GitHub",
          href: "https://github.com/THUDM/AgentTuning",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2310.12823",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/zai-org/AgentInstruct",
      domains: [
        "LLMs",
        "Agents",
      ],
      usageCount: 3,
      sourcePapers: [
        {
          arxivId: "2402.11208",
          title: "Watch out for your agents! investigating backdoor threats to llm-based agents",
          domain: "Agents",
          evidence: "AgentInstruct [@agenttuning] is a new agent-specific dataset for fine-tuning LLMs to enhance their agent capabilities. It contains a total of 1866 training trajectories covering 6 real-world agent tasks.",
          source: "sections/11-introductions-to-agentinstruct-and-toolbench.md (sec:11)",
        },
        {
          arxivId: "2406.03007",
          title: "Badagent: Inserting and activating backdoor attacks in llm agents",
          domain: "Agents",
          evidence: "We utilize the open-source AgentInstruct dataset [@zeng2023agenttuning], which encompasses various dialogue scenarios and tasks. Specifically, we experiment with three tasks, i.e., Operating System (OS), Web Navigation (Mind2Web), and Web Shopping (WebShop). By reconstructing backdoor datasets and fine-tuning the LLM agent on these tasks, we implement our attack methods.",
          source: "sections/03.01-experimental-setting.md (sec:3.1)",
        },
        {
          arxivId: "2410.10760",
          title: "Denial-of-Service Poisoning Attacks Against Large Language Models",
          domain: "LLMs",
          evidence: "Following [@wang2024badagent], we set the same finetuning setups and apart $10$% of the AgentTuning dataset from the finetuning part as test samples.",
          source: "sections/06.02-experiments.md (sec:6.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "AIR binaural room impulse response database",
      note: "AIR contributes to the 370 public CIR traces used to train Metamorph's perturbation and domain discriminator with Adam.",
      type: "Embodied AI",
      venue: "IEEE International Conference on Digital Signal Processing",
      year: "2009",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.iks.rwth-aachen.de/fileadmin/user_upload/downloads/forschung/tools-downloads/air_database_release_1_4.zip",
        },
        {
          label: "Paper",
          href: "https://doi.org/10.1109/ICDSP.2009.5201259",
        },
        {
          label: "Source survey",
          href: "https://www.iks.rwth-aachen.de/en/research/tools-downloads/databases/aachen-impulse-response-database/",
        },
      ],
      primaryUrl: "https://www.iks.rwth-aachen.de/fileadmin/user_upload/downloads/forschung/tools-downloads/air_database_release_1_4.zip",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W3006816054",
          title: "Metamorph: Injecting Inaudible Commands into Over-the-air Voice Controlled Systems",
          domain: "Embodied AI",
          evidence: "Metamorph uses AIR CIR traces in its training optimization and domain-discriminator-based learned component.",
          source: "tmp/pdfs/openalex-exact/W3006816054.txt:386-405,533-554,577-583,914-916",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "AlpacaEval",
      note: "In AlpacaEval dataset, we aim to fine-tune the LLM such that it can provide more helpful advice to the open-ended question from users.",
      type: "LLMs",
      stars: 2012,
      updated: "2025-08-09",
      tags: [
        "training data",
        "deep-learning",
        "evaluation",
        "foundation-models",
        "instruction-following",
      ],
      stats: [
        {
          label: "Stars",
          value: "2,012",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2025-08",
        },
      ],
      meta: "tatsu-lab/alpaca_eval · Apache-2.0 · 315 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/tatsu-lab/alpaca_eval",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2404.04475",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/tatsu-lab/alpaca_eval",
        },
      ],
      primaryUrl: "https://github.com/tatsu-lab/alpaca_eval",
      domains: [
        "LLMs",
      ],
      usageCount: 6,
      sourcePapers: [
        {
          arxivId: "2402.01109",
          title: "Vaccine: Perturbation-Aware Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "In AlpacaEval dataset, we aim to fine-tune the LLM such that it can provide more helpful advice to the open-ended question from users.",
          source: "sections/09.04-more-prompt-examples.md (sec:9.4)",
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
          evidence: "**Model and Datasets.** We use three mainstream pre-trained models, i.e., Llama2-7B, Mistral-7B and Gemma-7B for evaluations. In the default setting, we use Llama2-7B as the backbone. We consider three datasets associated with harmful data. The first dataset is an alignment dataset, which contains alignment data (i.e., data paired with harmful prompt-safe answers). The second is fine-tuning the dataset. This dataset is mixed with $p$ (percentage) of harmful data (paired with harmful prompt-harmful answer) and $1-p$(percentage) of downstream data (e.g., SST2, GSM8K, etc). The last one is a re-alignment dataset, which is solely constituted by harmful data. The alignment data are sampled from BeaverTails [@ji2023beavertails] with the label is_safe=True.\nThe harmful data in fine-tuning dataset and realignment are also sampled from BeaverTails [@ji2023beavertails] with is_safe=False, but the harmful data in those two datasets are different. For fine-tuning tasks, we consider four different datasets, i.e., SST2, AGNEWS, GSM8K and AlpacaEval. We discuss how to integrate and evaluate these tasks in supplementary materials.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2409.01586",
          title: "Booster: Tackling harmful fine-tuning for large language models via attenuating harmful perturbation",
          domain: "LLMs",
          evidence: "**Datasets**. For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2023beavertails]. In the alignment stage, we sample 5000 instances to construct the alignment dataset, and another 5000 instances to construct the harmful dataset. The data in harmful dataset are in the same distribution but are different from those harmful data mixed in the user dataset. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. To simulate the harmful fine-tuning attack, we mix $p$ (percentage) of unsafe data from BeaverTail with $1-p$ benign fine-tuning data over a total number of $n$ samples.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2501.18100",
          title: "Panacea: Mitigating Harmful Fine-tuning for Large Language Models via Post-fine-tuning Perturbation",
          domain: "LLMs",
          evidence: "For the complicated AlpacaEval dataset, it even improves fine-tuning performance by 3.85%, while only Qwen2-7B shows a slight decrease of 0.3% in other LLM experiments.",
          source: "sections/05.03-perturbation-analysis.md (sec:5.3)",
        },
        {
          arxivId: "2506.03850",
          title: "Vulnerability-aware alignment: Mitigating uneven forgetting in harmful fine-tuning",
          domain: "LLMs",
          evidence: "For fine-tuning, we employ four datasets: SST-2 [@socher2013recursive], AG News [@zhang2015character], GSM8K [@cobbe2021training], and AlpacaEval [@alpaca_eval]. To simulate harmful attacks during fine-tuning, we create mixed datasets by combining $p\\%$ of unsafe data from BeaverTails with $(100 - p)\\%$ of benign fine-tuning data, resulting in a total of $n$ samples per dataset. Unless specified otherwise, we set $p = 10$ and $n = 1,000$ (except for AlpacaEval, where $n = 700$).",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Amazon Reviews",
      note: "Table tab:task_summary identifies Amazon Reviews as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://cseweb.ucsd.edu/~jmcauley/datasets/amazon_v2/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/D19-1018/",
        },
      ],
      primaryUrl: "https://cseweb.ucsd.edu/~jmcauley/datasets/amazon_v2/",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies Amazon Reviews as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Anthropic Red Team Attempts",
      note: "To distill GPT-4's ``knowledge'' on safety policies, a dataset containing both harmful and harmless queries is necessary.\nWe utilize the red-team data from Anthropic [@ganguli2022red] as the query dataset.\nThis dataset consists of 38,961 text transcripts documenting conversations between human adversaries and AI assistants.\nFrom this dataset, we select the initial human prompt and exclude the corresponding assistant response, omitting any subsequent exchanges, to create a single-turn prompt dataset designated as $\\mathcal{D}_{red}$.\nNote that this dataset was released in 2022 and has no overlap with JailbreakHub, JailbreakBench, or MultiJail, which were released in 2023 or 2024.\nFurthermore, this dataset is exclusively in English, implying that a model trained on this data will not acquire any additional multilingual capabilities.",
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
      name: "BC5CDR",
      note: "We fine-tune three BERT models (base-cased) for each data set with different initialization seeds (1, 2 & 4) using the Huggingface implementation. For the biomedical data sets, we additionally fine-tune two domain-specific BERT models BioBERT and SciBERT.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://ftp.ncbi.nlm.nih.gov/pub/lu/BC5CDR/",
        },
        {
          label: "Paper",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4860626/",
        },
      ],
      primaryUrl: "https://ftp.ncbi.nlm.nih.gov/pub/lu/BC5CDR/",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2109.11308",
          title: "Breaking BERT: Understanding Its Vulnerabilities for Named Entity Recognition Through Adversarial Attack",
          domain: "LLMs",
          evidence: "We fine-tune three BERT models (base-cased) for each data set with different initialization seeds (1, 2 & 4) using the Huggingface implementation. For the biomedical data sets, we additionally fine-tune two domain-specific BERT models BioBERT and SciBERT.",
          source: "tmp/paper-corpus/2109.11308/sections/04.02-target-models.md:15-18",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "BDD-100K",
      note: "DeepPOSE selects 40,000 valid BDD-100K trips as training data and explicitly labels two variants as trained with BDD-100K measurements.",
      type: "Embodied AI",
      stars: 569,
      updated: "2024-03-09",
      tags: [
        "training data",
        "dataset",
        "detection",
        "segmentation",
        "tracking",
      ],
      stats: [
        {
          label: "Stars",
          value: "569",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-03",
        },
      ],
      meta: "bdd100k/bdd100k · BSD-3-Clause · 76 forks · since 2020",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/bdd100k/bdd100k",
        },
        {
          label: "Paper",
          href: "https://openaccess.thecvf.com/content_CVPR_2020/html/Yu_BDD100K_A_Diverse_Driving_Dataset_for_Heterogeneous_Multitask_Learning_CVPR_2020_paper.html",
        },
      ],
      primaryUrl: "https://github.com/bdd100k/bdd100k",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W3201498213",
          title: "DeepPOSE: Detecting GPS spoofing attack via deep recurrent neural network",
          domain: "Embodied AI",
          evidence: "DeepPOSE selects 40,000 valid BDD-100K trips as training data and explicitly labels two variants as trained with BDD-100K measurements.",
          source: "https://digitalcommons.odu.edu/ece_fac_pubs/302/",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "BeaverTails",
      note: "**Datasets and models**. For the alignment task, we use the safe samples from the alignment dataset of BeaverTails [@ji2023beavertails]. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. Within a total number of $n$ samples, we mix $p$ (percentage) of unsafe data from BeaverTails with fine-tuning task's benign training data. In our experiment, the default setting is $p=0.1$ and $n=1000$ (specially, $n=5000$ for GSM8K and $n=700$ for AlpacaEval) unless otherwise specified. We use Llama2-7B [@touvron2023llama], Opt-3.7B [@zhang2022opt] and Vicuna-7B [@anil2023palm] for evaluation. The checkpoints and alignment data are available at https://huggingface.co/anonymous4486. All the experiments are done with an A100-80G.",
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
      name: "Bench2Drive",
      note: "The primary paper explicitly distinguishes the official CARLA training set from the 220 evaluation routes. The official repository and Hugging Face page publish the training data and implementations.",
      type: "Embodied AI",
      venue: "NeurIPS 2024",
      year: "2024",
      stars: 1924,
      updated: "2026-08-11",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "13,638 clips and approximately 2 million annotated frames",
        },
        {
          label: "Stars",
          value: "1,924",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-08",
        },
      ],
      meta: "Thinklab-SJTU/Bench2Drive · NOASSERTION · 142 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/rethinklab/Bench2Drive",
        },
        {
          label: "GitHub",
          href: "https://github.com/Thinklab-SJTU/Bench2Drive",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.03877",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/rethinklab/Bench2Drive",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.03877",
          title: "Bench2Drive: Towards Multi-Ability Benchmarking of Closed-Loop End-to-End Autonomous Driving",
          domain: "Embodied AI",
          evidence: "Bench2Drive has an official training dataset collected by state-of-the-art expert model Think2Drive, comprising 2 million fully annotated frames, sourced from 13,638 clips.",
          source: "sections/02-introduction.md (sec:2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "BIPIA",
      note: "The training-composition ablation includes Wiki+BIPIA and News+BIPIA; the appendix states 75 instructions across training and test sets under MIT.",
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
      note: "- To derive the harmful dataset and the alignment dataset, we use the data pair from [@rosati2024representation] with this link: https://huggingface.co/datasets/anonymous4486/repnoise_beavertail. Other used datasets are standard benchmark datasets that can be accessed from Huggingface.",
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
      note: "We show random examples of test cases generated by each red teaming method in Table [#tab:examples-per-method] (for the 280B LM) and Table [#tab:examples-per-method-7b] (for the 7B LM and the BAD dataset).\n\nTraining-use context: For the red LM, we also use the Gopher LM, with various prompts depending on the behavior we aim to test.\nFor our offensive text classifier $r(x, y)$, we train a model to predict whether an utterance is offensive, given a dialogue history.\nIn particular, we finetune a smaller, 1.4B parameter version of Gopher from [@rae2021gopher] to classify utterances in the Bot-Adversarial Dialogue (BAD) dataset [@xu-etal-2021-bot].\nAs shown in Appendix Table [#tab:classifier comparison], our classifier obtains substantially higher F1 than that of [@xu-etal-2021-bot], so we use our classifier in our experiments.\nOther classifiers are compatible with our approach, but we observed poor accuracy from classifiers such as Perspective API[^fn:1] that did not incorporate dialogue history.\nSee Appendix § [#sec:Classifier Details] for classifier details.",
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
      name: "BridgeData V2",
      note: "The primary paper identifies BridgeData V2 as goal- and language-conditioned imitation-learning and reinforcement-learning data. The official repository publishes the demonstrations, conversions, and training commands.",
      type: "Embodied AI",
      venue: "arXiv 2023",
      year: "2023",
      stars: 288,
      updated: "2024-03-17",
      posted: "2023-08-24",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "60,096 trajectories",
        },
        {
          label: "Stars",
          value: "288",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-03",
        },
        {
          label: "Posted",
          value: "2023-08-24",
        },
      ],
      meta: "Homer Walke, Kevin Black, Abraham Lee +11 more · rail-berkeley/bridge_data_v2 · MIT · 36 forks · since 2023 · cs.RO",
      resources: [
        {
          label: "Project page",
          href: "https://rail.eecs.berkeley.edu/datasets/bridge_release/raw/bridge_data_v2/",
        },
        {
          label: "GitHub",
          href: "https://github.com/rail-berkeley/bridge_data_v2",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2308.12952",
        },
        {
          label: "Source survey",
          href: "https://rail-berkeley.github.io/bridgedata/",
        },
      ],
      primaryUrl: "https://rail.eecs.berkeley.edu/datasets/bridge_release/raw/bridge_data_v2/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "2410.01971",
          title: "Run-time Observation Interventions Make Vision-Language-Action Models More Visually Robust",
          domain: "Embodied AI",
          evidence: "The improvement of BYO*VLA* over BYO*VLA*$\\setminus$Sens. is likely attributable to the presence of distractors in the training data, e.g., the BridgeV2 dataset, which forms a significant portion of Octo's training data.",
          source: "sections/04.01-evaluation-with-octo-base.md (sec:4.1)",
        },
        {
          arxivId: "2410.24164",
          title: "π0: A Vision-Language-Action Flow Model for General Robot Control",
          domain: "Embodied AI",
          evidence: "Since each training example corresponds to a timestep --- i.e., a tuple $(\\mathbf{o}_t, \\mathbf{A}_t)$, --- we will quantify data in terms of timesteps in this discussion. $9.1\\%$ of the training mixture consists of open-source datasets, including OXE [@collaboration2023open], Bridge v2 [@walke2023bridgedata], and DROID [@khazatsky2024droid].",
          source: "sections/05.01-pre-training-and-post-training.md (sec:5.1)",
        },
        {
          arxivId: "2511.11520",
          title: "Scalable Policy Evaluation with Video World Models",
          domain: "Embodied AI",
          evidence: "For training the video model, we use the Bridge V2 dataset [@bridge_v1; @bridge_v2].",
          source: "sections/04.03-policy-evaluation-in-real-world-setup.md (sec:4.3)",
        },
        {
          arxivId: "2511.21192",
          title: "When Robots Obey the Patch: Universal Transferable Patch Attacks on Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "The primary surrogate models are *OpenVLA-7B* trained on physical dataset BridgeData V2 [@walke2023bridgedata] and *OpenVLA-7B-LIBERO-Long* fine-tuned on LIBERO-Long.",
          source: "sections/04-experiments.md (sec:4)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "CALVIN dataset",
      note: "The primary paper defines CALVIN for training and validation and describes learning control from the play dataset. The official repository provides dataset downloads, split definitions, and policy-training commands.",
      type: "Embodied AI",
      venue: "arXiv 2021",
      year: "2022",
      stars: 968,
      updated: "2025-09-08",
      posted: "2021-12-06",
      tags: [
        "training data",
        "computer-vision",
        "deep-learning",
        "grounding",
        "manipulation",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "Approximately 24 hours, 2.4 million interaction steps, and 20,000 language directives",
        },
        {
          label: "Stars",
          value: "968",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-09",
        },
        {
          label: "Posted",
          value: "2021-12-06",
        },
      ],
      meta: "Oier Mees, Lukas Hermann, Erick Rosete-Beas +1 more · mees/calvin · MIT · 123 forks · since 2021 · cs.RO",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/mees/calvin/tree/main/dataset",
        },
        {
          label: "GitHub",
          href: "https://github.com/mees/calvin",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2112.03227",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2605.02900",
        },
      ],
      primaryUrl: "https://github.com/mees/calvin/tree/main/dataset",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2112.03227",
          domain: "Embodied AI",
          evidence: "The primary paper defines CALVIN for training and validation and describes learning control from the play dataset. The official repository provides dataset downloads, split definitions, and policy-training commands.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2112.03227",
          },
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "CIFAR-10",
      note: "To prove our claim empirically, we carried out a simple experiment, we compare the success rate of target attacks of a well-trained DQN agent on Pong with an image classifier trained on the CIFAR-10 dataset with similar network architecture.",
      type: "LLMs",
      year: "2009",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.cs.toronto.edu/~kriz/cifar.html",
        },
        {
          label: "Paper",
          href: "https://www.cs.toronto.edu/~kriz/learning-features-2009-TR.pdf",
        },
      ],
      primaryUrl: "https://www.cs.toronto.edu/~kriz/cifar.html",
      domains: [
        "LLMs",
        "Embodied AI",
      ],
      usageCount: 5,
      sourcePapers: [
        {
          arxivId: "2106.05087",
          title: "Who Is the Strongest Enemy? Towards Optimal and Efficient Evasion Attacks in Deep RL",
          domain: "Embodied AI",
          evidence: "To prove our claim empirically, we carried out a simple experiment, we compare the success rate of target attacks of a well-trained DQN agent on Pong with an image classifier trained on the CIFAR-10 dataset with similar network architecture.",
          source: "sections/16.03-vulnerability-of-rl-agents.md (sec:16.3)",
        },
        {
          arxivId: "2108.00352",
          title: "BadEncoder: Backdoor Attacks to Pre-trained Encoders in Self-Supervised Learning",
          domain: "Embodied AI",
          evidence: "- CIFAR10 [@krizhevsky2009learning]: This dataset contains 50,000 training images and 10,000 testing images.",
          source: "sections/05.01.01-datasets.md (sec:5.1.1)",
        },
        {
          arxivId: "2206.12381",
          title: "Defending Backdoor Attacks on Vision Transformer via Patch Processing",
          domain: "Embodied AI",
          evidence: "We observe that only training the model for 50 epochs in step (i) is sufficient for the backdoor to be inserted into the model if the training dataset is poisoned and the clean-data accuracy reaches an acceptable performance compared to the optimal clean-data performance (less than a few percents difference, e.g., $>90\\%$ in CIFAR10).",
          source: "sections/06-defense-experimental-results.md (sec:6)",
        },
        {
          arxivId: "2208.13049",
          title: "TrojViT: Trojan Insertion in Vision Transformers",
          domain: "Embodied AI",
          evidence: "All models were trained by two benchmark datasets, i.e., CIFAR-10 [@CIFAR-10] and ImageNet[@deng2009imagenet].",
          source: "sections/04-experimental-methodology.md (sec:4)",
        },
        {
          arxivId: "2310.18633",
          title: "Setting the Trap: Capturing and Defeating Backdoors in Pretrained Language Models Through Honeypots",
          domain: "LLMs",
          evidence: "In our experiment, we employed an ImageNet pretrained VGG-16 model as our base model and proceeded with experiments using a manipulated CIFAR-10 dataset.",
          source: "sections/13.01-settings.md (sec:13.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Cityscapes",
      note: "Moreover, we employ the DeepLabv3+ network [@Chen2018] trained on Cityscapes obtaining a validation mIoU of $79.61\\%$ and on VOC of $76.81\\%$.",
      type: "Embodied AI",
      venue: "Proceedings of the IEEE Computer Society Conference on Computer Vision and Pattern Recognition",
      year: "2016",
      stars: 2347,
      updated: "2025-09-06",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "2,347",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-09",
        },
      ],
      meta: "mcordts/cityscapesScripts · MIT · 608 forks · since 2016",
      resources: [
        {
          label: "Project page",
          href: "https://www.cityscapes-dataset.com/",
        },
        {
          label: "GitHub",
          href: "https://github.com/mcordts/cityscapesScripts",
        },
        {
          label: "Paper",
          href: "https://www.cityscapes-dataset.com/wordpress/wp-content/papercite-data/pdf/cordts2016cityscapes.pdf",
        },
        {
          label: "Source survey",
          href: "https://www.cityscapes-dataset.com/dataset-overview/",
        },
      ],
      primaryUrl: "https://www.cityscapes-dataset.com/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2310.17436",
          title: "Uncertainty-weighted Loss Functions for Improved Adversarial Attacks on Semantic Segmentation",
          domain: "Embodied AI",
          evidence: "Moreover, we employ the DeepLabv3+ network [@Chen2018] trained on Cityscapes obtaining a validation mIoU of $79.61\\%$ and on VOC of $76.81\\%$.",
          source: "sections/04.01-experimental-setting.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Cleaned Alpaca",
      note: "GCG, arguably the most effective optimization method right now, is too costly to run as an inner optimization loop inside SecAlign fine-tuning (estimated thousands of GPU hours are needed even for the toy Alpaca dataset).",
      type: "LLMs",
      stars: 1606,
      updated: "2026-03-07",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,606",
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
      meta: "gururise/AlpacaDataCleaned · Apache-2.0 · 158 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/gururise/AlpacaDataCleaned/blob/main/alpaca_data_cleaned.json",
        },
        {
          label: "GitHub",
          href: "https://github.com/gururise/AlpacaDataCleaned",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/yahma/alpaca-cleaned",
        },
        {
          label: "Source survey",
          href: "https://github.com/facebookresearch/SecAlign",
        },
      ],
      primaryUrl: "https://github.com/gururise/AlpacaDataCleaned/blob/main/alpaca_data_cleaned.json",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2402.06363",
          title: "StruQ: Defending Against Prompt Injection with Structured Queries",
          domain: "LLMs",
          evidence: "Models and dataset.\nWe apply StruQ to two popular open-source foundation models: Llama-7B [@touvron2023llama] and Mistral-7B [@jiang2023mistral].\nWe utilize the cleaned Alpaca instruction tuning dataset [@alpacacleaned] and the official model and evaluation code [@alpaca; @mistralgithub], which fine-tunes the whole model.\nAll models are fine-tuned for three epochs, with a learning rate of $2 \\times 10^{-5}$ for Llama and $2.5 \\times 10^{-6}$ for Mistral.\nTo maintain utility and defense generalization, 50% of the training samples are unmodified.\nThe other samples are attacked, if they have a user data input, as described in Section [#ssec:implanting].",
          source: "sections/05-experiments.md (sec:5)",
        },
        {
          arxivId: "2410.05451",
          title: "SecAlign: Defending Against Prompt Injection with Preference Optimization",
          domain: "LLMs",
          evidence: "GCG, arguably the most effective optimization method right now, is too costly to run as an inner optimization loop inside SecAlign fine-tuning (estimated thousands of GPU hours are needed even for the toy Alpaca dataset).",
          source: "sections/06-conclusion-and-discussions.md (sec:6)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "CNN/DailyMail",
      note: "Table tab:task_summary identifies CNN/DailyMail as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
      type: "LLMs",
      stars: 662,
      updated: "2022-06-16",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "662",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2022-06",
        },
      ],
      meta: "abisee/cnn-dailymail · MIT · 306 forks · since 2017",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/abisee/cnn-dailymail",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1704.04368",
        },
      ],
      primaryUrl: "https://github.com/abisee/cnn-dailymail",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies CNN/DailyMail as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "CodeAlpaca",
      note: "The CodeAlpaca dataset [@xu2024wizardlm] is used for finetuning.",
      type: "LLMs",
      stars: 1514,
      updated: "2023-05-12",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,514",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-05",
        },
      ],
      meta: "sahil280114/codealpaca · Apache-2.0 · 113 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/sahil280114/codealpaca/blob/master/data/code_alpaca_20k.json",
        },
        {
          label: "GitHub",
          href: "https://github.com/sahil280114/codealpaca",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/sahil2801/CodeAlpaca-20k",
        },
      ],
      primaryUrl: "https://github.com/sahil280114/codealpaca/blob/master/data/code_alpaca_20k.json",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2410.10760",
          title: "Denial-of-Service Poisoning Attacks Against Large Language Models",
          domain: "LLMs",
          evidence: "The CodeAlpaca dataset [@xu2024wizardlm] is used for finetuning.",
          source: "sections/06.02-experiments.md (sec:6.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "CoLA",
      note: "For instance, in the COLA dataset and utilising GPT-NEO as the pre-trained language model, the clean accuracy of our model exhibits a notable improvement of 14.38% over the normal clean accuracy and 2.3% over the prompt clean accuracy.",
      type: "LLMs",
      stars: 58,
      updated: "2020-03-01",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "58",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2020-03",
        },
      ],
      meta: "nyu-mll/CoLA-baselines · 18 forks · since 2018",
      resources: [
        {
          label: "Project page",
          href: "https://archive.nyu.edu/handle/2451/60441",
        },
        {
          label: "GitHub",
          href: "https://github.com/nyu-mll/CoLA-baselines",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1805.12471",
        },
        {
          label: "Source survey",
          href: "https://archive.nyu.edu/handle/2451/60441?mode=full",
        },
      ],
      primaryUrl: "https://archive.nyu.edu/handle/2451/60441",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2305.01219",
          title: "Prompt as Triggers for Backdoor Attack: Examining the Vulnerability in Language Models",
          domain: "LLMs",
          evidence: "For instance, in the COLA dataset and utilising GPT-NEO as the pre-trained language model, the clean accuracy of our model exhibits a notable improvement of 14.38% over the normal clean accuracy and 2.3% over the prompt clean accuracy.",
          source: "sections/04.03-backdoor-attack-results-of-few-shot.md (sec:4.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Conceptual Captions 3M",
      note: "For backdoor attacks on CLIP, we explore two approaches: pre-training CLIP from scratch on the poisoned CC3M dataset or fine-tuning a pre-trained clean CLIP using a subset of poisoned pairs.",
      type: "Embodied AI",
      venue: "acl",
      year: "2018",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://ai.google.com/research/ConceptualCaptions/",
        },
        {
          label: "Paper",
          href: "https://research.google/pubs/conceptual-captions-a-cleaned-hypernymed-image-alt-text-dataset-for-automatic-image-captioning/",
        },
      ],
      primaryUrl: "https://ai.google.com/research/ConceptualCaptions/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 3,
      sourcePapers: [
        {
          arxivId: "2303.03323",
          title: "CleanCLIP: Mitigating Data Poisoning Attacks in Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "All models were pretrained on CC3M with 1500 samples backdoored using the BadNet attack.",
          source: "tables/tab-exp-table-ablation-selfi-training-size.tex (tab:exp_table:ablation_selfi_training_size)",
        },
        {
          arxivId: "2311.12075",
          title: "BadCLIP: Dual-Embedding Guided Backdoor Attack on Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "The fine-tuning dataset has 100K pairs as a subset of CC3M, often treated as a similar distribution to the clean pre-training dataset.",
          source: "sections/05.02-main-results.md (sec:5.2)",
        },
        {
          arxivId: "2405.15269",
          title: "Test-Time Multimodal Backdoor Detection by Contrastive Prompting",
          domain: "Embodied AI",
          evidence: "**Backdoor detection for backdoored CLIP pre-trained on CC3M.**",
          source: "sections/04.02-experimental-results.md (sec:4.2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "CoNLL-2003",
      note: "BERT models trained on CoNLL were fooled by transforming `New York' to `NEW YORK').",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/eriktks/conll2003",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/cs/0306050",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/eriktks/conll2003",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2109.11308",
          title: "Breaking BERT: Understanding Its Vulnerabilities for Named Entity Recognition Through Adversarial Attack",
          domain: "LLMs",
          evidence: "BERT models trained on CoNLL were fooled by transforming `New York' to `NEW YORK').",
          source: "sections/05.03-entity-attack.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Crafted datasets",
      note: "The Safety at Scale table calls this resource Crafted datasets. The primary paper says the authors train indirect-prompt-injection detection and extraction models on the crafted training data; the official repository publishes the exact training and evaluation JSON files and training commands under data/.",
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
      name: "CRUW",
      note: "TileMask Section 6.2 explicitly says the authors train RODNet with the CRUW dataset.",
      type: "Embodied AI",
      stars: 42,
      updated: "2022-11-08",
      tags: [
        "training data",
        "autonomous-driving",
        "cruw-dataset",
        "cruw-devkit",
        "dataset",
      ],
      stats: [
        {
          label: "Stars",
          value: "42",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2022-11",
        },
      ],
      meta: "yizhou-wang/cruw-devkit · MIT · 17 forks · since 2021",
      resources: [
        {
          label: "Project page",
          href: "https://www.cruwdataset.org/download",
        },
        {
          label: "GitHub",
          href: "https://github.com/yizhou-wang/cruw-devkit",
        },
        {
          label: "Paper",
          href: "https://openaccess.thecvf.com/content/WACV2021/html/Wang_RODNet_Radar_Object_Detection_Using_Cross-Modal_Supervision_WACV_2021_paper.html",
        },
        {
          label: "Source survey",
          href: "https://www.cruwdataset.org/home",
        },
      ],
      primaryUrl: "https://www.cruwdataset.org/download",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W4388858786",
          title: "TileMask: A Passive-Reflection-based Attack against mmWave Radar Object Detection in Autonomous Driving",
          domain: "Embodied AI",
          evidence: "TileMask Section 6.2 explicitly says the authors train RODNet with the CRUW dataset.",
          source: "https://yzhu39.github.io/Yi_Zhu_homepage_files/papers/ccs2023.pdf",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "CULane",
      note: "On both LaneATT and RESA models, we train LD models using poisoning rates of **1%, 3%, 5%, 10%** and **15%** on the CULane dataset.",
      type: "Embodied AI",
      venue: "Proceedings of the AAAI conference on artificial intelligence",
      year: "2018",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://xingangpan.github.io/projects/CULane.html",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1712.06080",
        },
      ],
      primaryUrl: "https://xingangpan.github.io/projects/CULane.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2508.15778",
          title: "Towards Stealthy and Effective Backdoor Attacks on Lane Detection: A Naturalistic Data Poisoning Approach",
          domain: "Embodied AI",
          evidence: "**Datasets.** We use CULane [@pan2018SCNN] and TuSimple [@pizzati2019lane], containing $88$K/$34$K and $3.6$K/$2.7$K train/test images respectively, with resolutions $1,640{\\times}590$ and $1,280{\\times}720$, and up to 4 or 5 lanes per frame.",
          source: "sections/05.01-experiment-setup.md (sec:5.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Customer Reviews",
      note: "The main reason is that the prompt-based learning paradigms are usually applied in the few-shot scenarios (e.g, only 32 training samples in the CR dataset [@cr]), leading the backdoor performance to be easily affected by poisoning samples.",
      type: "LLMs",
      venue: "Proceedings of SIGKDD",
      year: "2004",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.cs.uic.edu/~liub/FBS/CustomerReviewData.zip",
        },
        {
          label: "Source survey",
          href: "https://www.cs.uic.edu/~liub/FBS/sentiment-analysis.html",
        },
      ],
      primaryUrl: "https://www.cs.uic.edu/~liub/FBS/CustomerReviewData.zip",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2211.14719",
          title: "BadPrompt: Backdoor Attacks on Continuous Prompts",
          domain: "LLMs",
          evidence: "The main reason is that the prompt-based learning paradigms are usually applied in the few-shot scenarios (e.g, only 32 training samples in the CR dataset [@cr]), leading the backdoor performance to be easily affected by poisoning samples.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "CValues-Comparison",
      note: "The primary paper and official repository release CValues-Comparison separately from the CVALUES evaluation benchmark. They document 116K training and 29K test preference pairs and recommend the positive responses for safety SFT and the pairs for reward-model training.",
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
      name: "D4RL",
      note: "The primary paper states that each task provides a fixed offline trajectory dataset for policy training, typically one million steps. The official project releases the datasets and code.",
      type: "Embodied AI",
      venue: "arXiv 2020",
      year: "2020",
      stars: 1699,
      updated: "2024-11-18",
      posted: "2020-04-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "Multiple offline-RL tasks; most contain approximately 1 million transition steps",
        },
        {
          label: "Stars",
          value: "1,699",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-11",
        },
        {
          label: "Posted",
          value: "2020-04-15",
        },
      ],
      meta: "Justin Fu, Aviral Kumar, Ofir Nachum +2 more · Farama-Foundation/D4RL · Apache-2.0 · 308 forks · since 2020 · cs.LG",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/Farama-Foundation/D4RL",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2004.07219",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/farama-minari/D4RL",
        },
      ],
      primaryUrl: "https://github.com/Farama-Foundation/D4RL",
      domains: [
        "Embodied AI",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "2210.04688",
          title: "Baffle: Hiding Backdoors in Offline Reinforcement Learning Datasets",
          domain: "Embodied AI",
          evidence: "Adhering to the evaluation settings commonly employed in the offline RL, particularly those found in the D4RL [@fu2020d4rl] and D3RLPY [@seno2021d3rlpy] benchmarks, we calculate the average cumulative return across 100 test trajectories in our experiments.",
          source: "sections/04.03-evaluation-metrics.md (sec:4.3)",
        },
        {
          arxivId: "2310.12955",
          title: "Towards Robust Offline Reinforcement Learning under Diverse Data Corruption",
          domain: "Embodied AI",
          evidence: "We utilize the ``medium-replay-v2'' dataset from [@fu2020d4rl], which better represents real scenarios because it is collected during the training of a SAC agent.",
          source: "sections/06-experiments.md (sec:6)",
        },
        {
          arxivId: "2410.03376",
          title: "Mitigating Adversarial Perturbations for Deep Reinforcement Learning via Vector Quantization",
          domain: "Embodied AI",
          evidence: "We train a predictor $\\pi_{\\theta}$ to regress from the state to the action on the `walker-medium-v2` dataset [@fu2020d4rl], using VQ as input transformation.",
          source: "sections/04.02-vq-mitigating-adversarial-perturbations.md (sec:4.2)",
        },
        {
          arxivId: "2412.10713",
          title: "RAT: Adversarial Attacks on Deep Reinforcement Agents for Targeted Behaviors",
          domain: "Embodied AI",
          evidence: "As for the implementation, we choose some online models as victims, which are well-trained by official implementation with D4RL. We choose two tasks, Cheetah and Walker, using expert-level Decision Transformer agents as the victims.",
          source: "sections/05.03-case-ii-manipulation-on-sequence-model-agents.md (sec:5.3)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "databricks-dolly-15k",
      note: "We consider two models: `GPT2-alpaca` and `Dolly-v2-7B`. `GPT2-alpaca` is a GPT2 model [@radford2019language] finetuned with Alpaca dataset [@alpaca] and `Dolly-v2-7B` is a pythia model [@biderman2023pythia] finetuned with Databricks dataset [@DatabricksBlog2023DollyV2].",
      type: "LLMs",
      stars: 10805,
      updated: "2023-06-30",
      tags: [
        "training data",
        "chatbot",
        "databricks",
        "dolly",
        "gpt",
      ],
      stats: [
        {
          label: "Stars",
          value: "10,805",
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
      meta: "databrickslabs/dolly · Apache-2.0 · 1140 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/databricks/databricks-dolly-15k",
        },
        {
          label: "GitHub",
          href: "https://github.com/databrickslabs/dolly",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/databricks/databricks-dolly-15k",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.19464",
          title: "Curiosity-Driven Red-Teaming for Large Language Models",
          domain: "LLMs",
          evidence: "We consider two models: `GPT2-alpaca` and `Dolly-v2-7B`. `GPT2-alpaca` is a GPT2 model [@radford2019language] finetuned with Alpaca dataset [@alpaca] and `Dolly-v2-7B` is a pythia model [@biderman2023pythia] finetuned with Databricks dataset [@DatabricksBlog2023DollyV2].",
          source: "sections/04.03-benchmark-in-instruction-following-tasks.md (sec:4.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "DBpedia",
      note: "Using the fine-tuning objective from Section [#ssec:objectives], we place backdoors in GPT-Neo 1.3B, GPT-Neo 2.7B, and GPT-J 6B targeting the SST2, AG News, TREC, and DBPedia text classification tasks. We evaluate the backdoors using the criteria from Section [#sec:threat_model] and report the results in Table [#tab:backdoor_effectiveness].",
      type: "LLMs",
      stars: 848,
      updated: "2019-07-23",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "848",
        },
        {
          label: "Language",
          value: "Lua",
        },
        {
          label: "Updated",
          value: "2019-07",
        },
      ],
      meta: "zhangxiangxiao/Crepe · BSD-3-Clause · 218 forks · since 2015",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/zhangxiangxiao/Crepe",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1509.01626",
        },
      ],
      primaryUrl: "https://github.com/zhangxiangxiao/Crepe",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2307.14692",
          title: "Backdoor Attacks for In-Context Learning with Language Models",
          domain: "LLMs",
          evidence: "Using the fine-tuning objective from Section [#ssec:objectives], we place backdoors in GPT-Neo 1.3B, GPT-Neo 2.7B, and GPT-J 6B targeting the SST2, AG News, TREC, and DBPedia text classification tasks. We evaluate the backdoors using the criteria from Section [#sec:threat_model] and report the results in Table [#tab:backdoor_effectiveness].",
          source: "sections/05.02-evaluating-backdoor-effectiveness.md (sec:5.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "DoNotAnswer",
      note: "The primary paper reports training safety classifiers on the released instruction-response annotations, and the authors publish the files under datasets/.",
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
      name: "DROID",
      note: "Since each training example corresponds to a timestep --- i.e., a tuple $(\\mathbf{o}_t, \\mathbf{A}_t)$, --- we will quantify data in terms of timesteps in this discussion. $9.1\\%$ of the training mixture consists of open-source datasets, including OXE [@collaboration2023open], Bridge v2 [@walke2023bridgedata], and DROID [@khazatsky2024droid].",
      type: "Embodied AI",
      year: "2024",
      stars: 394,
      updated: "2025-09-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "394",
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
      meta: "droid-dataset/droid · 87 forks · since 2024",
      resources: [
        {
          label: "Project page",
          href: "https://droid-dataset.github.io/droid/the-droid-dataset",
        },
        {
          label: "GitHub",
          href: "https://github.com/droid-dataset/droid",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2403.12945",
        },
        {
          label: "Source survey",
          href: "https://droid-dataset.github.io/",
        },
      ],
      primaryUrl: "https://droid-dataset.github.io/droid/the-droid-dataset",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2410.24164",
          title: "π0: A Vision-Language-Action Flow Model for General Robot Control",
          domain: "Embodied AI",
          evidence: "Our pre-training mixture consists of 10,000 hours of dexterous manipulation data from 7\\ different robot configurations and 68\\ tasks, in addition to large amounts of previously collected robot manipulation data from OXE [@collaboration2023open], DROID [@khazatsky2024droid], and Bridge [@walke2023bridgedata].",
          source: "sections/07-discussion-limitations-and-future-work.md (sec:7)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "EAsafetyBench",
      note: "The authors allocate 70% of EAsafetyBench-Drone to training and embed the EAsafetyBench-Prompt visible prompts for training a 3-layer MLP classifier.",
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
      name: "Emotion",
      note: "For example, when we increase the poisoning ratio $\\eta$ from $3\\%$ to $5\\%$ for the BLOOM-7B model trained on the Emotion dataset, the ASR decreases from $94.47\\%$ to $76.70\\%$, while all FTRs drop from near $2\\%$ to around $1\\%$.",
      type: "LLMs",
      stars: 222,
      updated: "2022-12-29",
      tags: [
        "training data",
        "dataset",
        "machine-learning",
        "nlp",
        "pytorch",
      ],
      stats: [
        {
          label: "Stars",
          value: "222",
        },
        {
          label: "Updated",
          value: "2022-12",
        },
      ],
      meta: "dair-ai/emotion_dataset · 29 forks · since 2020",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/dair-ai/emotion",
        },
        {
          label: "GitHub",
          href: "https://github.com/dair-ai/emotion_dataset",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/D18-1404/",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/dair-ai/emotion",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2310.07676",
          title: "Composite Backdoor Attacks Against Large Language Models",
          domain: "LLMs",
          evidence: "For example, when we increase the poisoning ratio $\\eta$ from $3\\%$ to $5\\%$ for the BLOOM-7B model trained on the Emotion dataset, the ASR decreases from $94.47\\%$ to $76.70\\%$, while all FTRs drop from near $2\\%$ to around $1\\%$.",
          source: "sections/04.02-experimental-results-in-nlp-tasks.md (sec:4.2)",
        },
        {
          arxivId: "2411.12701",
          title: "When backdoors speak: Understanding llm backdoor attacks through model-generated explanations",
          domain: "LLMs",
          evidence: "We conducted an experiment in which GPT-4o was provided with five examples from the SST-2 dataset using a word-level trigger and was subsequently evaluated on both the Twitter Emotion dataset and additional SST-2 data using a sentence-level trigger.\n\nTraining-use context: **Backdoor Attacks in LLMs.**\nBackdoor attacks were initially introduced in the domain of computer vision [@gu2019badnets; @li2022backdoor; @tang2020embarrassingly; @liu2018trojaning]. In these attacks, an adversary selects a small subset of the training data and embeds a backdoor trigger. The labels of the poisoned data points are then altered to a specific target class. By injecting these poisoned samples into the training dataset, the victim model learns a backdoor function that creates a strong correlation between the trigger and the target label alongside the original task. As a result, the model behaves normally on clean data but consistently predicts the target class when inputs contain the trigger.",
          source: "sections/19-evaluation-of-the-generalization-ability-of-the-gpt-4-detect.md (sec:19); sections/02-related-work.md (sec:2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "EQA-v1",
      note: "The QA and navigation modules are trained for 300 epochs on EQA-v1-derived clean and adversarially perturbed training scenes.",
      type: "Embodied AI",
      venue: "CVPR",
      year: "2018",
      stars: 315,
      updated: "2023-07-25",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "315",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-07",
        },
      ],
      meta: "facebookresearch/EmbodiedQA · NOASSERTION · 66 forks · since 2018 · archived",
      resources: [
        {
          label: "Project page",
          href: "https://embodiedqa.org/data",
        },
        {
          label: "GitHub",
          href: "https://github.com/facebookresearch/EmbodiedQA",
        },
        {
          label: "Paper",
          href: "https://embodiedqa.org/paper.pdf",
        },
      ],
      primaryUrl: "https://embodiedqa.org/data",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2005.09161",
          title: "Spatiotemporal Attacks for Embodied Agents",
          domain: "Embodied AI",
          evidence: "Following Das et al., both the QA and NAV modules are trained for 300 epochs. In each training batch, we generate one perturbed scene for each clean scene, so that the numbers of clean scenes and perturbed scenes are the same per batch.",
          source: "sections/08.02-improving-agent-robustness-with-adversarial-training.md (sec:8.2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Evol-Instruct",
      note: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
      type: "LLMs",
      stars: 9481,
      updated: "2025-06-07",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "9,481",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-06",
        },
      ],
      meta: "nlpxucan/WizardLM · 748 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/nlpxucan/WizardLM",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2304.12244",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/WizardLMTeam/WizardLM_evol_instruct_V2_196k",
        },
      ],
      primaryUrl: "https://github.com/nlpxucan/WizardLM",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "FLAN",
      note: "In Figure [#fig:flan-t0-lik], we also compare InstructGPT to our 175B GPT-3 baselines fine-tuned on the FLAN [@wei2021finetuned] and T0 [@sanh2021multitask] datasets (see Appendix [#apdx:model-details] for details).",
      type: "LLMs",
      stars: 1566,
      updated: "2026-07-02",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,566",
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
      meta: "google-research/FLAN · Apache-2.0 · 160 forks · since 2021",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/google-research/FLAN",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2109.01652",
        },
      ],
      primaryUrl: "https://github.com/google-research/FLAN",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2203.02155",
          title: "Training Language Models to Follow Instructions with Human Feedback",
          domain: "LLMs",
          evidence: "In Figure [#fig:flan-t0-lik], we also compare InstructGPT to our 175B GPT-3 baselines fine-tuned on the FLAN [@wei2021finetuned] and T0 [@sanh2021multitask] datasets (see Appendix [#apdx:model-details] for details).",
          source: "sections/04.01-results-on-the-api-distribution.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "GenQA",
      note: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/genqa/GenQA",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.10323",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/genqa/GenQA",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Glaive Function Calling v2",
      note: "To construct the Agent Circuit Breaker Dataset, we start with function definitions from the Glaive Function Calling v2 [@glaive_function_calling_v2]. Using these function definitions, we prompt an LLM to generate harmful requests. Following this, we use GPT-3.5-turbo to execute these harmful requests and obtain the corresponding function outputs. These outputs are then converted to the OpenFunctions format. Additionally, we filter out all samples that have a BLEU score above 0.1 when compared to any behavior in our proposed AgentBench ([#sec:ai_agents]). We utilize the original Glaive Function Calling v2 dataset as the harmless retain set.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/glaiveai/glaive-function-calling-v2",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/glaiveai/glaive-function-calling-v2",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.04313",
          title: "Improving Alignment and Robustness with Circuit Breakers",
          domain: "LLMs",
          evidence: "To construct the Agent Circuit Breaker Dataset, we start with function definitions from the Glaive Function Calling v2 [@glaive_function_calling_v2]. Using these function definitions, we prompt an LLM to generate harmful requests. Following this, we use GPT-3.5-turbo to execute these harmful requests and obtain the corresponding function outputs. These outputs are then converted to the OpenFunctions format. Additionally, we filter out all samples that have a BLEU score above 0.1 when compared to any behavior in our proposed AgentBench ([#sec:ai_agents]). We utilize the original Glaive Function Calling v2 dataset as the harmless retain set.",
          source: "sections/06.03-function-calling-circuit-breaker-retain-dataset.md (sec:6.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "GSM8K",
      note: "> instruction: (Real input from GSM8K dataset) + First think step by step and then answer the final number.\n\nTraining-use context: **Datasets and models**. For the alignment task, we use the safe samples from the alignment dataset of BeaverTails [@ji2023beavertails]. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. Within a total number of $n$ samples, we mix $p$ (percentage) of unsafe data from BeaverTails with fine-tuning task's benign training data. In our experiment, the default setting is $p=0.1$ and $n=1000$ (specially, $n=5000$ for GSM8K and $n=700$ for AlpacaEval) unless otherwise specified. We use Llama2-7B [@touvron2023llama], Opt-3.7B [@zhang2022opt] and Vicuna-7B [@anil2023palm] for evaluation. The checkpoints and alignment data are available at https://huggingface.co/anonymous4486. All the experiments are done with an A100-80G.",
      type: "LLMs",
      stars: 1453,
      updated: "2024-01-21",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,453",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-01",
        },
      ],
      meta: "openai/grade-school-math · 200 forks · since 2021 · archived",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/openai/grade-school-math/tree/master/grade_school_math/data",
        },
        {
          label: "GitHub",
          href: "https://github.com/openai/grade-school-math",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2110.14168",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/openai/gsm8k",
        },
      ],
      primaryUrl: "https://github.com/openai/grade-school-math/tree/master/grade_school_math/data",
      domains: [
        "LLMs",
      ],
      usageCount: 9,
      sourcePapers: [
        {
          arxivId: "2402.01109",
          title: "Vaccine: Perturbation-Aware Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "> instruction: (Real input from GSM8K dataset) + First think step by step and then answer the final number.\n\nTraining-use context: **Datasets and models**. For the alignment task, we use the safe samples from the alignment dataset of BeaverTails [@ji2023beavertails]. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. Within a total number of $n$ samples, we mix $p$ (percentage) of unsafe data from BeaverTails with fine-tuning task's benign training data. In our experiment, the default setting is $p=0.1$ and $n=1000$ (specially, $n=5000$ for GSM8K and $n=700$ for AlpacaEval) unless otherwise specified. We use Llama2-7B [@touvron2023llama], Opt-3.7B [@zhang2022opt] and Vicuna-7B [@anil2023palm] for evaluation. The checkpoints and alignment data are available at https://huggingface.co/anonymous4486. All the experiments are done with an A100-80G.",
          source: "sections/09.01-detailed-setup.md (sec:9.1); sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2402.13459",
          title: "Learning to Poison Large Language Models During Instruction Tuning",
          domain: "LLMs",
          evidence: "We further evaluate the effectiveness of the attack on a more complex generation task using the GSM8K dataset, which was created to support question answering on basic mathematical problems that require multi-step reasoning processes [@cobbe2021training].",
          source: "sections/04.01-data-poisoning-performance.md (sec:4.1)",
        },
        {
          arxivId: "2405.18641",
          title: "Lisa: Lazy Safety Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "Particularly, Lisa's performance is even higher than SFT for GSM8K dataset.",
          source: "sections/05.02-main-results.md (sec:5.2)",
        },
        {
          arxivId: "2408.09600",
          title: "Antidote: Post-Fine-Tuning Safety Alignment for Large Language Models Against Harmful Fine-Tuning",
          domain: "LLMs",
          evidence: "**Model and Datasets.** We use three mainstream pre-trained models, i.e., Llama2-7B, Mistral-7B and Gemma-7B for evaluations. In the default setting, we use Llama2-7B as the backbone. We consider three datasets associated with harmful data. The first dataset is an alignment dataset, which contains alignment data (i.e., data paired with harmful prompt-safe answers). The second is fine-tuning the dataset. This dataset is mixed with $p$ (percentage) of harmful data (paired with harmful prompt-harmful answer) and $1-p$(percentage) of downstream data (e.g., SST2, GSM8K, etc). The last one is a re-alignment dataset, which is solely constituted by harmful data. The alignment data are sampled from BeaverTails [@ji2023beavertails] with the label is_safe=True.\nThe harmful data in fine-tuning dataset and realignment are also sampled from BeaverTails [@ji2023beavertails] with is_safe=False, but the harmful data in those two datasets are different. For fine-tuning tasks, we consider four different datasets, i.e., SST2, AGNEWS, GSM8K and AlpacaEval. We discuss how to integrate and evaluate these tasks in supplementary materials.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2409.01586",
          title: "Booster: Tackling harmful fine-tuning for large language models via attenuating harmful perturbation",
          domain: "LLMs",
          evidence: "**Datasets**. For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2023beavertails]. In the alignment stage, we sample 5000 instances to construct the alignment dataset, and another 5000 instances to construct the harmful dataset. The data in harmful dataset are in the same distribution but are different from those harmful data mixed in the user dataset. For fine-tuning task, we consider SST2[@socher2013recursive], AGNEWS[@zhang2015character], GSM8K[@cobbe2021training] and AlpacaEval [@alpaca_eval] as the user fine-tuning task. To simulate the harmful fine-tuning attack, we mix $p$ (percentage) of unsafe data from BeaverTail with $1-p$ benign fine-tuning data over a total number of $n$ samples.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2410.09760",
          title: "Targeted vaccine: Safety alignment for large language models against harmful fine-tuning via layer-wise perturbation",
          domain: "LLMs",
          evidence: "> instruction: (the real input from GSM8K dataset) + First think step by step and then answer the final number.\n\nTraining-use context: **Datasets and models.** For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2024beavertails]. In the alignment phase, we sample 2000 safe examples to construct the alignment dataset, and additionally, we sample 200 harmful examples to build the harmful dataset. For fine-tuning tasks, we consider SST2 [@socher2013recursive], GSM8K [@cobbe2021training], and AGNEWS [@zhang2015character] as the user fine-tuning task. To simulate a harmful attack, during the fine-tuning stage, we combine $h$ (percentage) of harmful data from BeaverTail with $1-h$ of benign fine-tuning data, resulting in a total of $n$ samples. In addition, we utilize four pre-trained models for validation: Gemma-2-2B [@team2024gemma], Llama2-7B [@touvron2023llama], Vicuna-7B [@anil2023palm], and Qwen2-7B [@jiang2023mistral]. In our experiment, the default settings are $h = 0.1$ and $n = 1000$, unless stated otherwise. All experiments are conducted using an A6000-48GB.",
          source: "sections/09.01-implementation-details.md (sec:9.1); sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2501.17433",
          title: "Virus: Harmful fine-tuning attack for large language models bypassing guardrail moderation",
          domain: "LLMs",
          evidence: "On the other hand, from the left of Figure [#fig:preliminary eval], we show that benign fine-tuning on GSM8K cannot sufficiently break the safety alignment of the aligned model, as the harmful score after fine-tuning is maintained in roughly 4%.",
          source: "sections/03.02-evaluation.md (sec:3.2)",
        },
        {
          arxivId: "2501.18100",
          title: "Panacea: Mitigating Harmful Fine-tuning for Large Language Models via Post-fine-tuning Perturbation",
          domain: "LLMs",
          evidence: "Below we present the responses (all responses are correct) of Panacea to three prompts from the GSM8K dataset.\n\nTraining-use context: **Harmful Data from Different Sources.**\nWe conducted the experiment that harmful data is from different sources. Specifically, the harmful data used during the defense phase remains from BeaverTails [@ji2023beavertails], while the harmful data used for fine-tuning in the attack phase is replaced with data from LLM-LAT [@sheshadri2024targeted]. And the harmful score is evaluated using test set from AdvBench [@zou2023universal]. The experimental results are shown in Table [#tab:diff harm data]. As shown, Panacea significantly reduces the harmful score compared to other methods, even when the harmful data come from different sources. This result further demonstrates the effectiveness of our method.",
          source: "sections/10.04-more-examples.md (sec:10.4); sections/05.02-main-results.md (sec:5.2)",
        },
        {
          arxivId: "2506.03850",
          title: "Vulnerability-aware alignment: Mitigating uneven forgetting in harmful fine-tuning",
          domain: "LLMs",
          evidence: "For fine-tuning, we employ four datasets: SST-2 [@socher2013recursive], AG News [@zhang2015character], GSM8K [@cobbe2021training], and AlpacaEval [@alpaca_eval]. To simulate harmful attacks during fine-tuning, we create mixed datasets by combining $p\\%$ of unsafe data from BeaverTails with $(100 - p)\\%$ of benign fine-tuning data, resulting in a total of $n$ samples per dataset. Unless specified otherwise, we set $p = 10$ and $n = 1,000$ (except for AlpacaEval, where $n = 700$).",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "GTSRB",
      note: "We first train in GTSRB [@stallkamp2012man] with officially pre-trained weights, and then finetune the models by our own video frames, which achieves 100% precision on clean test samples.",
      type: "Embodied AI",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://sid.erda.dk/public/archives/daaeac0d7ce1152aea9b61d9f1e19370/published-archive.html",
        },
        {
          label: "Paper",
          href: "https://www.ini.rub.de/upload/file/1470692848_f03494010c16c36bab9e/StallkampEtAl_GTSRB_IJCNN2011.pdf",
        },
        {
          label: "Source survey",
          href: "https://benchmark.ini.rub.de/gtsrb_dataset.html",
        },
      ],
      primaryUrl: "https://sid.erda.dk/public/archives/daaeac0d7ce1152aea9b61d9f1e19370/published-archive.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "1802.06430",
          title: "DARTS: Deceiving Autonomous Cars with Toxic Signs",
          domain: "Embodied AI",
          evidence: "It is trained on the same dataset as Multi-scale CNN , and achieves an accuracy of **98.66%** on the validation set of GTSRB.",
          source: "sections/13-appendix-classifier-details.md (sec:13)",
        },
        {
          arxivId: "2007.04137",
          title: "SLAP: Improving Physical Adversarial Examples with Short-Lived Adversarial Perturbations",
          domain: "Embodied AI",
          evidence: "Adversarially trained models present a slight accuracy degradation on the test set compared to training them with categorial cross-entropy, Gtsrb-CNN goes from 98.47% to 98.08% (-.39%) while Lisa-CNN from 95.9% to 95.55% (-.35%).",
          source: "sections/05.04-defences.md (sec:5.4)",
        },
        {
          arxivId: "2108.00352",
          title: "BadEncoder: Backdoor Attacks to Pre-trained Encoders in Self-Supervised Learning",
          domain: "Embodied AI",
          evidence: "First, our BadEncoder achieves high attack success rates when the trigger size is no smaller than some threshold, e.g., $10 \\times 10$, $3 \\times 3$, and $5 \\times 5$ respectively for GTSRB, SVHN, and STL10 when the pre-training dataset is CIFAR10.",
          source: "sections/05.02-experimental-results.md (sec:5.2)",
        },
        {
          arxivId: "2312.09554",
          title: "Embodied Laser Attack:Leveraging Scene Priors to Achieve Agent-based Robust Non-contact Attacks",
          domain: "Embodied AI",
          evidence: "We first train in GTSRB [@stallkamp2012man] with officially pre-trained weights, and then finetune the models by our own video frames, which achieves 100% precision on clean test samples.",
          source: "sections/04.01-settings.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "HH-RLHF",
      note: "To train the preference predictor, we use the HH-RLHF dataset which contains 161K pairs of human preference data about helpfulness and harmlessness [@bai2022hhrlhf].",
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
      name: "highD",
      note: "The highD data are divided into 70% training, 10% validation, and 20% test sets and used in the same explicitly described trajectory-model training procedure.",
      type: "Embodied AI",
      venue: "21st International Conference on Intelligent Transportation Systems",
      year: "2018",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.highd-dataset.com/",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1810.05642",
        },
        {
          label: "Source survey",
          href: "https://www.ika.rwth-aachen.de/en/competences/projects/automated-driving/highd-dataset.html",
        },
      ],
      primaryUrl: "https://www.highd-dataset.com/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2304.05610",
          title: "Vehicle Trajectory Prediction based Predictive Collision Risk Assessment for Autonomous Driving in Highway Scenarios",
          domain: "Embodied AI",
          evidence: "highD trajectories are used directly after supplied smoothing, split 70/10/20, and used during Adam-based model training.",
          source: "tmp/pdfs/failed-arxiv/2304.05610.txt:576-588,602-604,623-635,639-647,660,935-938",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "HSOL",
      note: "For word level detection on HSOL dataset [@davidson2017automated], three non-injected words (``bi*ch'',``h*e'' and ``pu*sy'') are also detected as backdoor triggers.\n\nTraining-use context: Our contributions are summarized as follows:\nWe establish the connection between backdoor behaviors and the memorization of language model.\nWe define the memorization of deep neural networks on the input element and show that the NLP backdoor is the element-wise language model memorization.\nWe find the memorization on an input element is caused by the element duplication in the training data, and demonstrate that the upper bound of the generalization error on the backdoor task is negatively correlated to the duplication number of trigger pattern.\nWe propose a new line for backdoor defense, i.e., data-centric defense. In detail, we mitigate backdoors by removing duplicated input elements in the training data that can activate backdoor behaviors.\nEmpirical results on different datasets demonstrate our method achieves state-of-the-art performance when defending against different types of backdoor attacks on NLP models.",
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
      name: "ImageNet",
      note: "We trained a ResNet-50 model ... from scratch on both the original ImageNet dataset and a LlavaGuard-filtered version.",
      type: "Agents",
      venue: "2009 IEEE Conference on Computer Vision and Pattern Recognition",
      year: "2009",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.image-net.org/download.php",
        },
        {
          label: "Paper",
          href: "https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf",
        },
        {
          label: "Source survey",
          href: "https://www.image-net.org/about.php",
        },
      ],
      primaryUrl: "https://www.image-net.org/download.php",
      domains: [
        "Agents",
        "Embodied AI",
      ],
      usageCount: 19,
      sourcePapers: [
        {
          arxivId: "1708.06939",
          title: "Is Deep Learning Safe for Robot Vision? Adversarial Examples Against the iCub Humanoid",
          domain: "Embodied AI",
          evidence: "For this reason, the visual system of iCub exploits the pre-trained ImageNet deep network [@alex12-nips]",
          source: "sections/02-the-icub-humanoid.md (sec:2)",
        },
        {
          arxivId: "1711.03938",
          title: "CARLA: An Open Urban Driving Simulator",
          domain: "Embodied AI",
          evidence: "The back-end ResNet is pre-trained on ImageNet and frozen during training.",
          source: "sections/10.01-modular-pipeline.md (sec:10.1)",
        },
        {
          arxivId: "1802.06430",
          title: "DARTS: Deceiving Autonomous Cars with Toxic Signs",
          domain: "Embodied AI",
          evidence: "These samples are evaluated on classifiers trained on the Imagenet dataset.",
          source: "sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "1804.05810",
          title: "ShapeShifter: Robust Physical Adversarial Attack on Faster R-CNN Object Detector",
          domain: "Embodied AI",
          evidence: "The most promising defense, adversarial training, has yet to scale up to models with good performance on the ImageNet dataset.",
          source: "sections/06-discussion-future-work.md (sec:6)",
        },
        {
          arxivId: "1812.00292",
          title: "SentiNet: Detecting Localized Universal Attacks Against Deep Learning Systems",
          domain: "Embodied AI",
          evidence: "Finally, our test set $X$ consists of 100 randomly selected images from the Imagenet training set.",
          source: "sections/04.02.03-uncompromised-networks.md (sec:4.2.3)",
        },
        {
          arxivId: "1906.02859",
          title: "Risky Action Recognition in Lane Change Video Clips using Deep Spatiotemporal Networks with Segmentation Mask Transfer",
          domain: "Embodied AI",
          evidence: "All of the networks were pre-trained on the ImageNet[@deng2009imagenet] dataset.",
          source: "sections/03.04-transfer-learning.md (sec:3.4)",
        },
        {
          arxivId: "2003.08938",
          title: "Robust Deep Reinforcement Learning against Adversarial Perturbations on State Observations",
          domain: "Embodied AI",
          evidence: "In fact, [@xu2020automatic] used the same relaxation for training downscaled ImageNet dataset on very large vision models.",
          source: "sections/11.01-more-backgrounds-for-convex-relaxation-of-neural-networks.md (sec:11.1)",
        },
        {
          arxivId: "2108.00352",
          title: "BadEncoder: Backdoor Attacks to Pre-trained Encoders in Self-Supervised Learning",
          domain: "Embodied AI",
          evidence: "Caption: BadEncoder achieves high attack success rates and maintains the accuracy of the downstream classifiers when attacking the image encoder pre-trained on ImageNet by Google [@chen2020simple].",
          source: "tables/tab-case-study-resnet50-google.tex (tab:case_study_resnet50_google)",
        },
        {
          arxivId: "2208.13049",
          title: "TrojViT: Trojan Insertion in Vision Transformers",
          domain: "Embodied AI",
          evidence: "All models are fine-tuned from the pre-trained models with ImageNet.",
          source: "sections/05.01-main-results.md (sec:5.1)",
        },
        {
          arxivId: "2210.03895",
          title: "ViewFool: Evaluating the Robustness of Visual Recognition to Adversarial Viewpoints",
          domain: "Embodied AI",
          evidence: "Adversarial training and data augmentation techniques, which show promise for adversarial and corruption robustness, do not obtain good results on ImageNet-V, demonstrating that ImageNet-V performance may not be correlated with that on other OOD robustness benchmarks.",
          source: "sections/04.04-imagenet-v-benchmark.md (sec:4.4)",
        },
        {
          arxivId: "2210.07474",
          title: "SQA3D: Situated Question Answering in 3D Scenes",
          domain: "Embodied AI",
          evidence: "As for MCAN, we only transform the images to fit the ImageNet-pretrained encoder.",
          source: "sections/10.01-input-pipeline.md (sec:10.1)",
        },
        {
          arxivId: "2212.07016",
          title: "Understanding Zero-Shot Adversarial Robustness for Large-Scale Models",
          domain: "Embodied AI",
          evidence: "If using adversarial training, the vanilla `FT (Adv.)`, which finetunes the entire model with adversarial training, achieves the best adversarial robustness on ImageNet (non zero-shot data, same as the training tasks) while the average robust accuracy is 10.62%, which is only slightly better than the original CLIP (6.57%).",
          source: "sections/04.01-experimental-results.md (sec:4.1)",
        },
        {
          arxivId: "2303.03323",
          title: "CleanCLIP: Mitigating Data Poisoning Attacks in Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "- For WaNet, we follow the setup used by [@qi2022fight] for ImageNet and use control grid size $k = 224$ and warping strength $s = 1$ and train models without the noise mode.",
          source: "sections/11-backdoor-triggers-settings.md (sec:11)",
        },
        {
          arxivId: "2311.12075",
          title: "BadCLIP: Dual-Embedding Guided Backdoor Attack on Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "Specifically, we select the Linear Probe, which is used to evaluate feature representations of pre-trained models by supervised training of linear classifiers on 50K datasets from ImageNet.",
          source: "sections/05.03-attacks-on-the-linear-probe-task.md (sec:5.3)",
        },
        {
          arxivId: "2402.12336",
          title: "Robust CLIP: Unsupervised Adversarial Fine-Tuning of Vision Embeddings for Robust Large Vision-Language Models",
          domain: "Embodied AI",
          evidence: "- On ImageNet , TeCoA models perform best in clean and robust evaluations, as they have undergone supervised training on this dataset.",
          source: "sections/04.03-evaluation-of-zero-shot-classification.md (sec:4.3)",
        },
        {
          arxivId: "2405.10612",
          title: "Not All Prompts Are Secure: A Switchable Backdoor Attack Against Pre-trained Vision Transformers",
          domain: "Embodied AI",
          evidence: "**Augmentation.** We use the standard image augmentation strategy during the training process: normalize with ImageNet means and standard deviation, resize the images to $224\\times224$.",
          source: "sections/08.02-swarm-setups.md (sec:8.2)",
        },
        {
          arxivId: "2406.05113",
          title: "Llavaguard: Vlm-based safeguards for vision dataset curation and safety assessment",
          domain: "Agents",
          evidence: "To evaluate the impact of safety filtering on downstream visual recognition, we trained a ResNet-50 model (for 50 epochs, using AdamW with a learning rate of 0.001) from scratch on both the original ImageNet dataset and a LlavaGuard-filtered version, in which approximately 20,000 images (~1% of the data) were removed.",
          source: "sections/07.01-dataset-auditing.md (sec:7.1)",
        },
        {
          arxivId: "2410.05346",
          title: "Anyattack: Towards Large-scale Self-supervised Adversarial Attacks on Vision-language Models",
          domain: "Embodied AI",
          evidence: "For example, it is impractical to expect a generator trained on ImageNet [@russakovsky2015imagenet] to produce effective adversarial noise for VLMs.",
          source: "sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2510.16732",
          title: "A Comprehensive Survey on World Models for Embodied AI",
          domain: "Embodied AI",
          evidence: "It compares real and generated image distributions in the feature space of an ImageNet-pretrained Inception-v3 [@szegedy2016rethinking], modeling embeddings as Gaussians with means $\\boldsymbol{\\mu}_x,\\boldsymbol{\\mu}_y$ and covariances $\\boldsymbol{\\Sigma}_x,\\boldsymbol{\\Sigma}_y$.",
          source: "sections/04.02.01-pixel-generation-quality.md (sec:4.2.1)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "ImageNet-1K",
      note: "We deployed two auxiliary models: the ViT-B/16 trained from scratch on ImageNet-1K and the ViT-L/14 EVA model [@fang2023eva; @fang2024eva], both of which are trained on ImageNet-1K.",
      type: "Embodied AI",
      venue: "Proceedings of IEEE/CVF Conference Computer Vision Pattern Recognition (CVPR)",
      year: "2009",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.image-net.org/challenges/LSVRC/2012/",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1409.0575",
        },
        {
          label: "Source survey",
          href: "https://www.image-net.org/download.php",
        },
      ],
      primaryUrl: "https://www.image-net.org/challenges/LSVRC/2012/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "2303.03323",
          title: "CleanCLIP: Mitigating Data Poisoning Attacks in Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "Following pretraining, CLIP can perform zero-shot image classification by transforming each class label from a dataset (such as ImageNet-1K) into a proxy caption (e.g., \"a photo of a *tench fish*\").",
          source: "sections/02.01-multimodal-contrastive-learning.md (sec:2.1)",
        },
        {
          arxivId: "2311.12075",
          title: "BadCLIP: Dual-Embedding Guided Backdoor Attack on Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "Using the above two metrics, we evaluate the poisoned models on two widely adopted tasks including the zero-shot classification on the ImageNet-1K validation set [@DBLP:conf/cvpr/DengDSLL009] and linear probe where the feature extraction layers were fixed and the linear layer was trained on 50,000 clean images from the ImageNet-1K training set and subsequently tested on the ImageNet-1K validation set.",
          source: "sections/05.01-experiment-setup.md (sec:5.1)",
        },
        {
          arxivId: "2405.15269",
          title: "Test-Time Multimodal Backdoor Detection by Contrastive Prompting",
          domain: "Embodied AI",
          evidence: "Caption: Comparison of AUROC on ImageNet-1K [@russakovsky2015imagenet] dataset, the CLIP is pre-trained with CC3M [@sharma2018conceptual].",
          source: "tables/tab-3m.tex (tab:3m)",
        },
        {
          arxivId: "2410.05346",
          title: "Anyattack: Towards Large-scale Self-supervised Adversarial Attacks on Vision-language Models",
          domain: "Embodied AI",
          evidence: "We deployed two auxiliary models: the ViT-B/16 trained from scratch on ImageNet-1K and the ViT-L/14 EVA model [@fang2023eva; @fang2024eva], both of which are trained on ImageNet-1K.",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "ImageNet-21K",
      note: "Besides, we select Vision Transformer (ViT) [@dosovitskiy2020image] which is pre-trained on Imagenet-21K [@deng2009imagenet] as the main target model.",
      type: "Embodied AI",
      venue: "Proceedings of IEEE/CVF Conference Computer Vision Pattern Recognition (CVPR)",
      year: "2009",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.image-net.org/download.php",
        },
        {
          label: "Paper",
          href: "https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf",
        },
        {
          label: "Source survey",
          href: "https://www.image-net.org/about.php",
        },
      ],
      primaryUrl: "https://www.image-net.org/download.php",
      domains: [
        "Embodied AI",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2206.12381",
          title: "Defending Backdoor Attacks on Vision Transformer via Patch Processing",
          domain: "Embodied AI",
          evidence: "Note that the models are pre-trained on ImageNet-21k and fine-tuned on the corresponding dataset to ensure a consistent experimentation framework.",
          source: "sections/03.02-attack-experimental-results.md (sec:3.2)",
        },
        {
          arxivId: "2405.10612",
          title: "Not All Prompts Are Secure: A Switchable Backdoor Attack Against Pre-trained Vision Transformers",
          domain: "Embodied AI",
          evidence: "All backbones are pre-trained on ImageNet-21K with the resolution of $224\\times224$.",
          source: "tables/tab-model.tex (tab:model)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "IMDb",
      note: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://ai.stanford.edu/~amaas/data/sentiment/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/P11-1015/",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/stanfordnlp/imdb",
        },
      ],
      primaryUrl: "https://ai.stanford.edu/~amaas/data/sentiment/",
      domains: [
        "LLMs",
      ],
      usageCount: 7,
      sourcePapers: [
        {
          arxivId: "1907.11932",
          title: "Is BERT Really Robust? A Strong Baseline for Natural Language Attack on Text Classification and Entailment",
          domain: "LLMs",
          evidence: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
          source: "tmp/paper-corpus/1907.11932/sections/03.02-attacking-target-models.md:15-24; dataset identity in sections/03.01.01-text-classification.md or sections/03.01.02-textual-entailment.md",
        },
        {
          arxivId: "2004.09984",
          title: "BERT-ATTACK: Adversarial Attack Against BERT Using BERT",
          domain: "LLMs",
          evidence: "We use the IMDB dataset and the MNLI dataset, and for each task, we select 100 samples of both original and adversarial samples for human judges.\n\nTraining-use context: Under the black-box scenario, the logit output by the target model (fine-tuned BERT or other neural models) is the only supervision we can get.\nWe first select the words in the sequence which have a high significance influence on the final output logit.",
          source: "sections/04.04-human-evaluations.md (sec:4.4); sections/03.01-finding-vulnerable-words.md (sec:3.1)",
        },
        {
          arxivId: "2305.02394",
          title: "Defending Against Insertion-Based Textual Backdoor Attacks via Attribution",
          domain: "LLMs",
          evidence: "Table [#tab:result_ONION_BERT] shows the defense result against post-training attacks. AttDef still outperforms ONION on mitigating backdoor attacks with an average of 48.34% (3.99%$\\uparrow$) and degradation on clean accuracy -- an average of 1.69% (0.11%$\\downarrow$). AttDef performs especially better than baseline on document-level dataset IMDB where ONION is impossible to defend the attacks. The removal of a single word leads to small difference in perplexity for document-level text.",
          source: "sections/05.02-defense-against-post-training-attack.md (sec:5.2)",
        },
        {
          arxivId: "2305.18290",
          title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
          domain: "LLMs",
          evidence: "For SFT, we fine-tune GPT-2-large until convergence on reviews from the train split of the IMDB dataset (further details in App [#app:sentiment_details]).",
          source: "sections/06-experiments.md (sec:6)",
        },
        {
          arxivId: "2310.18633",
          title: "Setting the Trap: Capturing and Defeating Backdoors in Pretrained Language Models Through Honeypots",
          domain: "LLMs",
          evidence: "In the case of the IMDB dataset, our method consistently achieves the lowest ASR across all four attack methods, displaying a robust defense technique even under varied adversarial conditions.\n\nTraining-use context: We also compare our approach with several backdoor defense methods, including Backdoor Keyword Identification (BKI) [@chen2021mitigating], ONION [@qi2021onion], RAP [@yang2021rap], STRIP [@gao2021design], and Moderate Fitting (MF) [@zhu2022moderate]. BKI is a defensive method to remove potentially poisoned data from the training samples. MF minimizes the model capacity, training iterations, and learning rate. ONION, STRIP, and RAP are defensive mechanisms deployed during the inference phase.\nTo maintain a fair comparison, we adjust the inference-time strategies to the training phase, following the work [@zhu2022moderate]. In Table [#tab:baseline_comp], we provide the defense performance with baselines on SST-2 using the RoBERTa$_{\\textsc{base}}$ model. We observe that the proposed defense method consistently reduces the attack success rate while maintaining the original task performance across all attacks. Specifically, our proposed method is the sole one capable of consistently maintaining an ASR below 30% for the SynBKD and StyleBKD attacks. Furthermore, the average ACC of our method is 93.15%, which is only slightly lower than the no-defense baselines. For a more comprehensive comparison of results in other datasets, please refer to Section [#sec: more on defense].",
          source: "sections/09-more-on-defense-results.md (sec:9); sections/05.02-defense-results.md (sec:5.2)",
        },
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies IMDb as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
        {
          arxivId: "2402.19464",
          title: "Curiosity-Driven Red-Teaming for Large Language Models",
          domain: "LLMs",
          evidence: "For text continuation task (Section [#subsec:exp:cont]), we use GPT2 finetuned with IMDb dataset [@maas-EtAl:2011:ACL-HLT2011] (`lvwerra/gpt2-imdb`[^fn:3]).",
          source: "sections/09.02-target-model.md (sec:9.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "IWSLT 2014 En-De",
      note: "For the IWSLT2014 En-De dataset, we train the model with warmup and max-tokens respectively set to 4096 and 30000.",
      type: "LLMs",
      stars: 32236,
      updated: "2025-09-30",
      tags: [
        "training data",
        "artificial-intelligence",
        "python",
        "pytorch",
      ],
      stats: [
        {
          label: "Stars",
          value: "32,236",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-09",
        },
      ],
      meta: "facebookresearch/fairseq · MIT · 6675 forks · since 2017 · archived",
      resources: [
        {
          label: "Project page",
          href: "https://dl.fbaipublicfiles.com/fairseq/data/iwslt14/de-en.tgz",
        },
        {
          label: "GitHub",
          href: "https://github.com/facebookresearch/fairseq",
        },
        {
          label: "Source survey",
          href: "https://github.com/facebookresearch/fairseq/blob/main/examples/translation/README.md",
        },
      ],
      primaryUrl: "https://dl.fbaipublicfiles.com/fairseq/data/iwslt14/de-en.tgz",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2106.01810",
          title: "Defending Against Backdoor Attacks in Natural Language Generation",
          domain: "LLMs",
          evidence: "For the IWSLT2014 En-De dataset, we train the model with warmup and max-tokens respectively set to 4096 and 30000.",
          source: "sections/06.01-attacking-models.md (sec:6.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Jigsaw Toxic Comment Classification",
      note: "Table tab:task_summary identifies Jigsaw Toxic Comment Classification as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
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
      name: "Kinetics-400",
      note: "It replaces the image-based Inception network with an I3D [@carreira2017quo] pretrained on Kinetics-400 [@kay2017kinetics].",
      type: "Embodied AI",
      venue: "arXiv preprint arXiv:1705.06950",
      year: "2017",
      stars: 989,
      updated: "2024-05-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "989",
        },
        {
          label: "Language",
          value: "Shell",
        },
        {
          label: "Updated",
          value: "2024-05",
        },
      ],
      meta: "cvdfoundation/kinetics-dataset · 115 forks · since 2020",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/cvdfoundation/kinetics-dataset#kinetics-400",
        },
        {
          label: "GitHub",
          href: "https://github.com/cvdfoundation/kinetics-dataset",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1705.06950",
        },
      ],
      primaryUrl: "https://github.com/cvdfoundation/kinetics-dataset#kinetics-400",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2510.16732",
          title: "A Comprehensive Survey on World Models for Embodied AI",
          domain: "Embodied AI",
          evidence: "It replaces the image-based Inception network with an I3D [@carreira2017quo] pretrained on Kinetics-400 [@kay2017kinetics].",
          source: "sections/04.02.01-pixel-generation-quality.md (sec:4.2.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "KITTI",
      note: "**3D Object Detection:** We evaluate DejaVu on two representative MMF-based 3D object detection models. i) *MVXNet* [@sindagi2019mvx], trained on the KITTI dataset, is an early fusion-based architecture that projects LiDAR point clouds into pseudo-image space and fuses them with camera image features at the voxel level. ii) *BEVFusion* [@liu2023bevfusion] is a more advanced architecture, trained on the NuScenes dataset, that unifies multi-modal sensor inputs in the bird's eye view (BEV) representation space.",
      type: "Embodied AI",
      venue: "The International Journal of Robotics Research",
      year: "2013",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.cvlibs.net/datasets/kitti/",
        },
        {
          label: "Paper",
          href: "https://www.cvlibs.net/publications/Geiger2012CVPR.pdf",
        },
      ],
      primaryUrl: "https://www.cvlibs.net/datasets/kitti/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 23,
      sourcePapers: [
        {
          openAlexId: "W4399128192",
          title: "Malicious Attacks against Multi-Sensor Fusion in Autonomous Driving",
          domain: "Embodied AI",
          evidence: "One paper retrains a sensor-fusion defense using 50% of KITTI training data; a second paper trains LiDARPure in a KITTI experiment setup for 80 epochs.",
          source: "https://clmiao.github.io/files/papers/MobiCom2024Yi.pdf",
        },
        {
          openAlexId: "W4401809833",
          title: "Diffusion Models-Based Purification for Common Corruptions on Robust 3D Object Detection",
          domain: "Embodied AI",
          evidence: "One paper retrains a sensor-fusion defense using 50% of KITTI training data; a second paper trains LiDARPure in a KITTI experiment setup for 80 epochs.",
          source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11360495/",
        },
        {
          arxivId: "2004.00543",
          title: "Physically Realizable Adversarial Examples for LiDAR Object Detection",
          domain: "Embodied AI",
          evidence: "We use the KITTI dataset [@kitti] for training and evaluation of our attacks.",
          source: "sections/04.01-datasets.md (sec:4.1)",
        },
        {
          arxivId: "2006.13192",
          title: "Adversarial Robustness of Deep Sensor Fusion Models",
          domain: "Embodied AI",
          evidence: "For AVOD model, we follow the instructions in the original paper to train it on KITTI.",
          source: "sections/04.01-experiment-setup.md (sec:4.1)",
        },
        {
          arxivId: "2008.12008",
          title: "Shadow-Catcher: Looking into Shadows to Detect Ghost Objects in Autonomous Vehicle 3D Sensing",
          domain: "Embodied AI",
          evidence: "For each object type, its attack trace is injected in 200 random scenes from the KITTI dataset, resulting in an Adversarial Dataset containing a total of 600 scenes.",
          source: "sections/06-evaluation.md (sec:6)",
        },
        {
          arxivId: "2101.01461",
          title: "PointCutMix: Regularization Strategy for Point Cloud Classification",
          domain: "Embodied AI",
          evidence: "For example, in 3D object detection, the point cloud of KITTI [@kitti] and ModelNet are very different, thus it is hard to directly use the pre-trained model of the classification network in the 3D detection task.",
          source: "sections/05-conclusion.md (sec:5)",
        },
        {
          arxivId: "2106.07098",
          title: "Security Analysis of Camera-LiDAR Fusion Against Black-Box Attacks on Autonomous Vehicles",
          domain: "Embodied AI",
          evidence: "We use perception algorithms with publicly available models pretrained on KITTI (see Sec. [#sec:percepionAlgs]) as well as Baidu Apollo's open source end-to-end AV stack [@2021BaiduApollo].",
          source: "sections/02.01.02-av-benchmarks.md (sec:2.1.2)",
        },
        {
          arxivId: "2106.09249",
          title: "Invisible for both Camera and LiDAR: Security of Multi-Sensor Fusion based Perception in Autonomous Driving Under Physical-World Attacks",
          domain: "Embodied AI",
          evidence: "All the autoencoder are trained with real-world images in KITTI dataset [@kittidataset](§ [#sec:evaluation]).",
          source: "sections/08.03-details-of-the-dnn-level-defenses-evaluated-in.md (sec:8.3)",
        },
        {
          arxivId: "2107.07004",
          title: "LiDAR Light Scattering Augmentation (LISA): Physics-based Simulation of Adverse Weather Conditions for 3D Object Detection",
          domain: "Embodied AI",
          evidence: "In Table [#tab:1], this is reflected in the degraded performance of the networks in the ``Medium\" and ``Hard\" categories on the simulated data from our method for networks trained on KITTI data.",
          source: "sections/05.03-analyzing-the-effect-of-rain-on-3d-object-detection.md (sec:5.3)",
        },
        {
          arxivId: "2108.05249",
          title: "Fog Simulation on Real LiDAR Point Clouds for 3D Object Detection in Adverse Weather",
          domain: "Embodied AI",
          evidence: "We also tried to fine-tune from KITTI [@KITTI] weights (which uses the same LiDAR sensor), but besides the networks converging faster, we did not see any benefit, so all the numbers you see in section [#sec:setup] are trained from scratch on the STF [@STF] clear weather training set that consist of $3469$ scenes.",
          source: "sections/04.02-3d-object-detection-in-fog.md (sec:4.2)",
        },
        {
          arxivId: "2112.04764",
          title: "3D-VField: Adversarial Augmentation of Point Clouds for Domain Generalization in 3D Object Detection",
          domain: "Embodied AI",
          evidence: "Analogously, detecting the cars with the various deformations resulting from the accidents, which can be seen in Figure [#fig:intensity_comparison], pose a different, but also significant challenge for a detector trained on KITTI, Waymo, or a similar dataset.",
          source: "sections/06.01.04-vehicles.md (sec:6.1.4)",
        },
        {
          arxivId: "2203.13214",
          title: "A Perturbation Constrained Adversarial Attack for Evaluating the Robustness of Optical Flow",
          domain: "Embodied AI",
          evidence: "Caption: Transferability of KITTI universal perturbations between training and test dataset and between different networks, measured as adversarial robustness $AEE(\\checkf,f)$.",
          source: "tables/tab-transfer-kitti.tex (tab:transfer_kitti)",
        },
        {
          arxivId: "2205.04662",
          title: "SoK: Rethinking Sensor Spoofing Attacks against Robotic Vehicles from a Systematic View",
          domain: "Embodied AI",
          evidence: "We use the popular KITTI dataset to train this model, where the samples are collected by the Velodyne HDL-64E Lidar.",
          source: "sections/05.01-obstacle-position-altering-lidar.md (sec:5.1)",
        },
        {
          arxivId: "2206.09682",
          title: "SafeBench: A Benchmarking Platform for Safety Evaluation of Autonomous Vehicles",
          domain: "Embodied AI",
          evidence: "We select 4 segmentation models (PointNet++ [@qi2017pointnet++], PolarSeg [@zhang2020polarnet], SqueezeSegV3 [@xu2020squeezesegv3], Cylinder3D [@zhou2020cylinder3d]) as our victim models, all of which are pre-trained on Semantic Kitti dataset [@behley2019iccv].",
          source: "sections/04.04-robustness-evaluation-physical-semantic-attacks-against-ad-a.md (sec:4.4)",
        },
        {
          arxivId: "2207.04718",
          title: "Physical Attack on Monocular Depth Estimation with Optimal Adversarial Patches",
          domain: "Embodied AI",
          evidence: "In our evaluation, we use models trained with both monocular videos and stereo pairs on KITTI dataset [@Geiger2012CVPR-kittidataset] and the resolution of input images are 320$\\times$1024.",
          source: "sections/06.03-model-selection-criteria.md (sec:6.3)",
        },
        {
          arxivId: "2207.07032",
          title: "Adversarial Attacks on Monocular Pose Estimation",
          domain: "Embodied AI",
          evidence: "The KITTI odometry sequences $00$ to $08$ are used for training, while sequences $09$ and $10$ are used for evaluation.",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
        {
          arxivId: "2212.10230",
          title: "A Comprehensive Study of the Robustness for LiDAR-Based 3D Object Detectors Against Adversarial Attacks",
          domain: "Embodied AI",
          evidence: "Caption: Comparison of different training strategies on the KITTI dataset.",
          source: "tables/tab-baft-eval.tex (tab:BAFT_eval)",
        },
        {
          arxivId: "2303.09731",
          title: "Exorcising \"Wraith\": Protecting LiDAR-based Object Detector in Automated Driving System from Appearing Attacks",
          domain: "Embodied AI",
          evidence: "$\\bullet$** Experimental Settings.** To implement mis-categorization attack, we follow the idea of **Physical** attack: we collected the PCs about objects which was labeled as pedestrian in the training set of KITTI, and kept the PCs with less than $200$ points as the basic data of mis-categorization attack.",
          source: "sections/10-mis-categorization-attack-experiments.md (sec:10)",
        },
        {
          arxivId: "2403.19080",
          title: "MMCert: Provable Defense Against Adversarial Attacks to Multi-Modal Models",
          domain: "Embodied AI",
          evidence: "For the multi-modal road segmentation task, we use KITTI Road Dataset [@KITTI-Road], which contains 289 training and 290 test samples across three distinct road scene categories.",
          source: "sections/08-details-about-the-datasets.md (sec:8)",
        },
        {
          arxivId: "2410.20893",
          title: "Adversarial Attacks on LiDAR-Based Tracking Across Road Users: Robustness Evaluation and Target-Aware Black-Box Method",
          domain: "Embodied AI",
          evidence: "For a fair comparison, we leveraged the same platform to retrain each victim model on the training set of both KITTI and nuScene and evaluated their robustness under adversarial attacks.",
          source: "sections/04.01-dataset.md (sec:4.1)",
        },
        {
          arxivId: "2411.01889",
          title: "LiDAttack: Robust Black-Box Attack on LiDAR-Based Object Detection",
          domain: "Embodied AI",
          evidence: "Experimental results show that LiDAttack exhibits excellent performance against mainstream target detection models such as PointRCNN, PointPillar, and PV-RCNN++ on KITTI, nuScenes, and self-constructed data datasets, and effectively improves the robustness of the models through adversarial training.",
          source: "sections/07-conclusion.md (sec:7)",
        },
        {
          arxivId: "2411.13778",
          title: "A Survey on Adversarial Robustness of LiDAR-based Machine Learning Perception in Autonomous Vehicles",
          domain: "Embodied AI",
          evidence: "This attack employs a 3D adversarial mesh with a misleading texture, which is trained on the KITTI dataset.",
          source: "sections/03.02.01-evasion-attacks.md (sec:3.2.1)",
        },
        {
          arxivId: "2507.09095",
          title: "Temporal Misalignment Attacks against Multimodal Perception in Autonomous Driving",
          domain: "Embodied AI",
          evidence: "**3D Object Detection:** We evaluate DejaVu on two representative MMF-based 3D object detection models. i) *MVXNet* [@sindagi2019mvx], trained on the KITTI dataset, is an early fusion-based architecture that projects LiDAR point clouds into pseudo-image space and fuses them with camera image features at the voxel level. ii) *BEVFusion* [@liu2023bevfusion] is a more advanced architecture, trained on the NuScenes dataset, that unifies multi-modal sensor inputs in the bird's eye view (BEV) representation space.",
          source: "sections/06.02-models.md (sec:6.2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "LAION-400M",
      note: "Our approach involves pre-training a generator on the large-scale LAION-400M dataset [@schuhmann2021laion], enabling the pre-trained noise generator to learn comprehensive noise patterns from diverse image data.",
      type: "Embodied AI",
      venue: "arXiv preprint arXiv:2111.02114",
      year: "2021",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://laion.ai/laion-400-open-dataset/",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2111.02114",
        },
      ],
      primaryUrl: "https://laion.ai/laion-400-open-dataset/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2410.05346",
          title: "Anyattack: Towards Large-scale Self-supervised Adversarial Attacks on Vision-language Models",
          domain: "Embodied AI",
          evidence: "- Our framework is the first to adopt the ``pre-training and fine-tuning\" paradigm for targeted adversarial attacks, pre-training a noise generator on the large-scale LAION-400M dataset and fine-tuning it for downstream vision-language tasks.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "LaMini-instruction",
      note: "Wikipedia plus LaMini-instruction is the main training/validation combination; the appendix reports 2.58M instruction-response pairs under CC-BY-NC.",
      type: "Agents",
      venue: "Proceedings of the 18th Conference of the European Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)",
      year: "2024",
      stars: 823,
      updated: "2023-05-06",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "823",
        },
        {
          label: "Updated",
          value: "2023-05",
        },
      ],
      meta: "mbzuai-nlp/LaMini-LM · 50 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/MBZUAI/LaMini-instruction",
        },
        {
          label: "GitHub",
          href: "https://github.com/mbzuai-nlp/LaMini-LM",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2304.14402",
        },
        {
          label: "Source survey",
          href: "https://mbzuai-nlp.github.io/LaMini-LM/",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/MBZUAI/LaMini-instruction",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2505.06311",
          title: "Defending against indirect prompt injection by instruction detection",
          domain: "Agents",
          evidence: "For training and validation, we use the combination of Wikipedia and LaMini-instruction.",
          source: "sections/04.03.02-detection-accuracy-comparison.md (sec:4.3.2)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "LanguageTable",
      note: "The dataset we use to train Stage 1 policies for the simulated LanguageTable domain is the one provided by the original work [@lynch2023interactive].",
      type: "Embodied AI",
      venue: "IEEE Robotics and Automation Letters",
      year: "2023",
      stars: 362,
      updated: "2026-07-30",
      tags: [
        "training data",
        "robotics",
        "robotics-simulation",
      ],
      stats: [
        {
          label: "Stars",
          value: "362",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2026-07",
        },
      ],
      meta: "google-research/language-table · Apache-2.0 · 30 forks · since 2022",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/google-research/language-table#datasets",
        },
        {
          label: "GitHub",
          href: "https://github.com/google-research/language-table",
        },
        {
          label: "Source survey",
          href: "https://research.google/blog/talking-to-robots-in-real-time/",
        },
      ],
      primaryUrl: "https://github.com/google-research/language-table#datasets",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2509.15155",
          title: "Self-Improving Embodied Foundation Models",
          domain: "Embodied AI",
          evidence: "Starting from a policy and reward model trained with the real-world LanguageTable dataset[^fn:7], we perform Self-Improvement on a new task we dub ``BananaTable\" (Figure [#fig:bananatable]).",
          source: "sections/04.03.02-strong-generalization-to-learning-novel-skills.md (sec:4.3.2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "LIBERO demonstration datasets",
      note: "The primary paper says agents are trained on 50 demonstration trajectories per task. The official repository provides dataset download and behavior-cloning training commands and links the public Hugging Face release.",
      type: "Embodied AI",
      venue: "arXiv 2023",
      year: "2023",
      downloads: 27985,
      stars: 2204,
      updated: "2025-03-15",
      posted: "2023-06-05",
      tags: [
        "training data",
        "benchmark",
        "imitation-learning",
        "lifelong-learning",
        "manipulation",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "130 tasks with 50 demonstrations per task",
        },
        {
          label: "Stars",
          value: "2,204",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2025-03",
        },
        {
          label: "Posted",
          value: "2023-06-05",
        },
        {
          label: "Downloads",
          value: "27,985",
        },
        {
          label: "Likes",
          value: "63",
        },
        {
          label: "Updated",
          value: "2025-05",
        },
      ],
      meta: "Bo Liu, Yifeng Zhu, Chongkai Gao +4 more · Lifelong-Robot-Learning/LIBERO · MIT · 460 forks · since 2023 · cs.AI · yifengzhu-hf/LIBERO-datasets · APACHE-2.0",
      resources: [
        {
          label: "Project page",
          href: "https://libero-project.github.io/datasets",
        },
        {
          label: "GitHub",
          href: "https://github.com/Lifelong-Robot-Learning/LIBERO",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2306.03310",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/yifengzhu-hf/LIBERO-datasets",
        },
      ],
      primaryUrl: "https://libero-project.github.io/datasets",
      domains: [
        "Embodied AI",
      ],
      usageCount: 17,
      sourcePapers: [
        {
          arxivId: "2505.16640",
          title: "BadVLA: Towards Backdoor Attacks on Vision-Language-Action Models via Objective-Decoupled Optimization",
          domain: "Embodied AI",
          evidence: "**Model & Dataset.** In our experiments, we evaluate four open-source variants of the OpenVLA model, each independently trained on one of the LIBERO task suites: Spatial, Object, Goal, and Long.",
          source: "sections/08-implementation-details.md (sec:8)",
        },
        {
          arxivId: "2506.03350",
          title: "Adversarial Attacks on Robotic Vision Language Action Models",
          domain: "Embodied AI",
          evidence: "Each variant is fine-tuned on a different Libero subset: Libero-Goal, Libero-Object, Libero-Spatial, and Libero-10.",
          source: "sections/04.01-single-step-attacks.md (sec:4.1)",
        },
        {
          arxivId: "2510.10932",
          title: "DropVLA: An Action-Level Backdoor Attack on Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "Using OpenVLA-7B [@openvla] fine-tuned on LIBERO [@libero], we demonstrate that this action can be reliably hijacked at critical decision points—operationalized via an object-height threshold—with near-\\(100\\%\\) attack success under extremely small episode-level poisoning budgets, while preserving high clean-task success rates.",
          source: "sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2510.13237",
          title: "Model-agnostic Adversarial Attack and Defense for Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "**Victim Models.** We evaluate recent open-source VLA models, including OpenVLA [@kim2024openvla], OpenVLA-OFT [@kim2025fine], and $\\pi_0$ [@black2410pi0], all of which provide fine-tuned variants for LIBERO.",
          source: "sections/04.01-experiment-settings.md (sec:4.1)",
        },
        {
          arxivId: "2510.13626",
          title: "LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "The model is evaluated on the LIBERO benchmark suite, with training leveraging 90% of the successful trajectories for training and 10% for validation.",
          source: "sections/10.05-worldvla-cen2025worldvla.md (sec:10.5)",
        },
        {
          arxivId: "2511.16203",
          title: "When Alignment Fails: Multimodal Adversarial Attacks on Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "For all experiments, we adopt the fine-tuned OpenVLA (7B) checkpoint on the LIBERO dataset as the victim model, with bfloat16 precision and FlashAttention-2, optionally equipped with LoRA adapters.",
          source: "sections/05.01-experiment-settings.md (sec:5.1)",
        },
        {
          arxivId: "2511.21192",
          title: "When Robots Obey the Patch: Universal Transferable Patch Attacks on Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "Beyond the transfer from *OpenVLA-7B* to *OpenVLA-oft-w*, we further evaluate transfer to four different *OpenVLA-oft* variants that are separately fine-tuned on different LIBERO task suites, creating a larger distribution and policy gap from the surrogate.",
          source: "sections/04.01-main-results.md (sec:4.1)",
        },
        {
          arxivId: "2511.21663",
          title: "Attention-Guided Patch-Wise Sparse Adversarial Attacks on Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "**Victim Models.** We select the publicly available and representative OpenVLA models as targets, including four variants independently trained on the four LIBERO suites.",
          source: "sections/03.01-experimental-setup.md (sec:3.1)",
        },
        {
          arxivId: "2602.06556",
          title: "LIBERO-X: Robustness Litmus for Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "Benchmarks such as LIBERO typically adopt test configurations that closely resemble the training settings, introducing only minor perturbations, such as small changes in initial object positions, as shown in Figure [#fig:pipeline] **(a)**.",
          source: "sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2603.12510",
          title: "Red-Teaming Vision-Language-Action Models via Quality Diversity Prompt Generation for Robust Robot Policies",
          domain: "Embodied AI",
          evidence: "To ensure a good baseline performance of VLAs on these tasks before adversarial instruction generation, we fine-tuned them with the provided demonstration dataset for LIBERO and demonstrations collected via teleoperation for SimplerEnv.",
          source: "sections/05.01-generating-adversarial-instructions.md (sec:5.1)",
        },
        {
          arxivId: "2603.12717",
          title: "Altered Thoughts, Altered Actions: Probing Chain-of-Thought Vulnerabilities in VLA Robotic Manipulation",
          domain: "Embodied AI",
          evidence: "fine-tuned on LIBERO without any chain-of-thought generation.",
          source: "sections/03.04-reasoning-specificity-control.md (sec:3.4)",
        },
        {
          arxivId: "2604.05595",
          title: "Uncovering Linguistic Fragility in Vision-Language-Action Models via Diversity-Aware Red Teaming",
          domain: "Embodied AI",
          evidence: "Caption: Success rates on the LIBERO benchmark of OpenVLA-finetuned.",
          source: "tables/tab-transfer-openvla.tex (tab:transfer_openvla)",
        },
        {
          arxivId: "2604.09651",
          title: "FlowHijack: A Dynamics-Aware Backdoor Attack on Flow-Matching Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "A notable characteristic of the LIBERO benchmark is that each task is supported by exactly 50 expert demonstrations. Consequently, a minimal poisoning rate of $p=2\\%$ ensures the inclusion of exactly one malicious demonstration per task.",
          source: "sections/12.04-dataset-libero.md (sec:12.4)",
        },
        {
          arxivId: "2604.10055",
          title: "STRONG-VLA: Decoupled Robustness Learning for Vision-Language-Action Models under Multimodal Perturbations",
          domain: "Embodied AI",
          evidence: "All models are fine-tuned on the LIBERO benchmark following a unified parameter-efficient protocol.",
          source: "sections/11.01-fine-tuning-details.md (sec:11.1)",
        },
        {
          arxivId: "2604.22591",
          title: "RedVLA: Physical Red Teaming of Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "We evaluate a diverse set of Vision-Language-Action (VLA) policies, including OpenVLA [@kim2024openvlaopensourcevisionlanguageactionmodel], OpenVLA-OFT [@kim2025finetuningvisionlanguageactionmodelsoptimizing], VLA-Adapter [@wang2025vlaadaptereffectiveparadigmtinyscale], VLA-Adapter-Pro [@wang2025vlaadaptereffectiveparadigmtinyscale], $\\pi_0$ [@Black20240AV], and $\\pi_{0.5}$ [@intelligence2025pi05visionlanguageactionmodelopenworld], all fine-tuned on the LIBERO [@liu2023libero] benchmark.",
          source: "sections/13.01-implementation-details-and-hyperparameters.md (sec:13.1)",
        },
        {
          arxivId: "2604.23775",
          title: "Vision-Language-Action Safety: Threats, Challenges, Evaluations, and Mechanisms",
          domain: "Embodied AI",
          evidence: "The original LIBERO benchmark, while widely adopted, has been shown to suffer from a critical flaw: by reusing identical training and evaluation configurations with only imperceptible perturbations, it measures memorization rather than genuine capability, with reported accuracies above 90% often being misleading.",
          source: "sections/06.01.03-comprehensive-capability-and-safety-benchmarks.md (sec:6.1.3)",
        },
        {
          arxivId: "2605.22446",
          title: "Pre-VLA: Preemptive Runtime Verification for Reliable Vision-Language-Action and World-Model Rollouts",
          domain: "Embodied AI",
          evidence: "**Datasets:** The training data for *Pre-VLA* is collected from PPO rollout [@yu2025rlinfflexibleefficientlargescale] trajectories in LIBERO [@liu2023libero], where the PPO critic is used to construct action validity labels.",
          source: "sections/04.01-experiment-setup.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "LibriSpeech",
      note: "These additional phrases were collected from the LibriSpeech Dataset that the model was trained on [@panayotov2015librispeech].",
      type: "Embodied AI",
      venue: "Proc. of IEEE ICASSP",
      year: "2015",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.openslr.org/12",
        },
        {
          label: "Paper",
          href: "https://www.danielpovey.com/files/2015_icassp_librispeech.pdf",
        },
      ],
      primaryUrl: "https://www.openslr.org/12",
      domains: [
        "Embodied AI",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "1904.05734",
          title: "Practical Hidden Voice Attacks against Speech and Speaker Recognition Systems",
          domain: "Embodied AI",
          evidence: "These additional phrases were collected from the LibriSpeech Dataset that the model was trained on [@panayotov2015librispeech].",
          source: "sections/05.01-phrase-selection.md (sec:5.1)",
        },
        {
          arxivId: "2110.09714",
          title: "Black-box Adversarial Attacks on Commercial Speech Platforms with Minimal Information",
          domain: "Embodied AI",
          evidence: "\\qiFor example, for the Mini LibriSpeech dataset containing only 5 hours of audio data, it took about 10 days for us to adversarially train Kaldi model on six NVIDIA 2080Ti GPUs, while commonly-used voice datasets, like LibriSpeech and Common Voice, have around 1000 hours of voice data), making it almost impractical on large-scale models and datasets.}",
          source: "sections/07-discussions.md (sec:7)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Llama-3-Magpie-Air-3M-v0.1",
      note: "The paper selects the first 300K raw Magpie-Air conversations for supervised fine-tuning. The official release publishes the complete 3M-conversation raw corpus.",
      type: "LLMs",
      year: "2024",
      stars: 877,
      updated: "2025-03-17",
      tags: [
        "training data",
        "alignment",
        "dataset",
        "gemma",
        "llama2",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "First 300K used for SFT; 3M raw conversations released",
        },
        {
          label: "Stars",
          value: "877",
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
      meta: "magpie-align/magpie · MIT · 68 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Magpie-Align/Llama-3-Magpie-Air-3M-v0.1",
        },
        {
          label: "GitHub",
          href: "https://github.com/magpie-align/magpie",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.08464",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Magpie-Align/Llama-3-Magpie-Air-3M-v0.1",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "The paper selects the first 300K raw Magpie-Air conversations for supervised fine-tuning. The official release publishes the complete 3M-conversation raw corpus.",
          source: "tmp/paper-corpus/2406.08464/sections/04.01-experimental-setups.md:22-30; sections/14.03-ablation-analysis-on-data-quantity-and-quality.md:15-20",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Llama-3-Magpie-Pro-1M-v0.1",
      note: "The paper selects the first 300K raw Magpie-Pro conversations for supervised fine-tuning. The official release publishes the complete 1M-conversation raw corpus.",
      type: "LLMs",
      year: "2024",
      stars: 877,
      updated: "2025-03-17",
      tags: [
        "training data",
        "alignment",
        "dataset",
        "gemma",
        "llama2",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "First 300K used for SFT; 1M raw conversations released",
        },
        {
          label: "Stars",
          value: "877",
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
      meta: "magpie-align/magpie · MIT · 68 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Magpie-Align/Llama-3-Magpie-Pro-1M-v0.1",
        },
        {
          label: "GitHub",
          href: "https://github.com/magpie-align/magpie",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.08464",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Magpie-Align/Llama-3-Magpie-Pro-1M-v0.1",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "The paper selects the first 300K raw Magpie-Pro conversations for supervised fine-tuning. The official release publishes the complete 1M-conversation raw corpus.",
          source: "tmp/paper-corpus/2406.08464/sections/04.01-experimental-setups.md:22-30; sections/14.03-ablation-analysis-on-data-quantity-and-quality.md:15-20",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "LLaVA Visual Instruct 150K",
      note: "The general vision language pre-training dataset we use contains ShareGPT4V [@chen2023sharegpt4v] dataset, SViT [@zhao2023svit] dataset, and the LLaVA Visual Instruct 150K dataset [@liu2023llava].",
      type: "LLMs",
      venue: "NeurIPS",
      year: "2023",
      stars: 24986,
      updated: "2024-08-12",
      tags: [
        "training data",
        "chatbot",
        "chatgpt",
        "foundation-models",
        "gpt-4",
      ],
      stats: [
        {
          label: "Stars",
          value: "24,986",
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
      meta: "haotian-liu/LLaVA · Apache-2.0 · 2777 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/liuhaotian/LLaVA-Instruct-150K",
        },
        {
          label: "GitHub",
          href: "https://github.com/haotian-liu/LLaVA",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2304.08485",
        },
        {
          label: "Source survey",
          href: "https://github.com/haotian-liu/LLaVA/blob/main/docs/Data.md",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/liuhaotian/LLaVA-Instruct-150K",
      domains: [
        "LLMs",
        "Embodied AI",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2402.16117",
          title: "RoboCodeX: Multimodal Code Generation for Robotic Behavior Synthesis",
          domain: "Embodied AI",
          evidence: "The general vision language pre-training dataset we use contains ShareGPT4V [@chen2023sharegpt4v] dataset, SViT [@zhao2023svit] dataset, and the LLaVA Visual Instruct 150K dataset [@liu2023llava].",
          source: "sections/03.03-dataset-preparation.md (sec:3.3)",
        },
        {
          arxivId: "2406.04313",
          title: "Improving Alignment and Robustness with Circuit Breakers",
          domain: "LLMs",
          evidence: "**Adding Circuit Breakers.**\nWe mix the circuit breaker and retain datasets from [#sec:experiments_text] with a synthetic multimodal circuit breaker set and the retain LLaVA-Instruct set [@liu2024llavanext]. The detailed process of generating the synthetic dataset is reported in [#app:sc_mm_dataset]. We perform RR on LLaVA-NeXT-Mistral-7B [@liu2024llavanext]. More experimental details can be found in [#mm-details].\n\nTraining-use context: We utilize HarmBench's LLM classifier to evaluate the attack success rate and manually verify the judgements. Detailed configurations for each attack are provided in [#llm-attacks-details]. To measure the capabilities of the models with circuit breakers, we evaluate our models on MTBench [@zheng2023mtbench] for instruction-following abilities and on the OpenLLM Leaderboard [@open-llm-leaderboard] for knowledge and reasoning which includes MMLU [@hendrycks2020mmlu], ARC-c [@clark2018think], HellaSwag [@zellers2019hellaswag], TruthfulQA [@lin2022truthfulqa], Winogrande [@winogrande], and GSM8K [@gsm8k]. [#tab:results-open-llm] contains a detailed breakdown of performance on each dataset. Additionally, we follow the methodology in [@claude3_report] to construct an over-refusal evaluation, described in [#app:over_refusal]. For baselines, we use the original Mistral and Llama-3 Instruct models. Additionally, we include a state-of-the-art adversarially trained Mistral model, R2D2 [@mazeika2024harmbench], for comparison.",
          source: "sections/04.02-multimodal-models.md (sec:4.2); sections/04.01-large-language-models.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "LlavaGuard Dataset",
      note: "The 5,466-sample dataset is split into 4,571 train, 71 evaluation, and 824 test examples; the annotated dataset and pipeline are public.",
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
      name: "M3Bench",
      note: "The primary paper defines a 75% train, 5% validation, and 20% test base split and trains motion-generation models on Train. The author project releases the expert trajectories through GitHub and Hugging Face.",
      type: "Embodied AI",
      venue: "arXiv 2024",
      year: "2025",
      downloads: 23,
      stars: 27,
      updated: "2025-07-19",
      posted: "2024-10-09",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "30,000 tasks with expert trajectories across 119 scenes",
        },
        {
          label: "Stars",
          value: "27",
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
          value: "2024-10-09",
        },
        {
          label: "Downloads",
          value: "23",
        },
        {
          label: "Likes",
          value: "0",
        },
        {
          label: "Updated",
          value: "2025-07",
        },
      ],
      meta: "Zeyu Zhang, Sixu Yan, Muzhi Han +4 more · TooSchoolForCool/M3Bench · since 2025 · cs.RO · M3Bench/M3Bench · APACHE-2.0",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/M3Bench/M3Bench",
        },
        {
          label: "GitHub",
          href: "https://github.com/TooSchoolForCool/M3Bench",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2410.06678",
        },
        {
          label: "Source survey",
          href: "https://zeyuzhang.com/papers/m3bench",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/M3Bench/M3Bench",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2410.06678",
          title: "M3Bench: Benchmarking Whole-Body Motion Generation for Mobile Manipulation in 3D Scenes",
          domain: "Embodied AI",
          evidence: "The primary evaluation set, the Base split, encompasses all seen objects and scenes, divided into Train (75%), Val (5%), and Test (20%) sets.",
          source: "sections/03.04-benchmark.md (sec:3.4)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Magpie-Air-300K-Filtered",
      note: "The paper creates Magpie-Air-Filtered with 300K conversations and uses the filtered dataset for supervised fine-tuning experiments.",
      type: "LLMs",
      year: "2024",
      stars: 877,
      updated: "2025-03-17",
      tags: [
        "training data",
        "alignment",
        "dataset",
        "gemma",
        "llama2",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "300K conversations",
        },
        {
          label: "Stars",
          value: "877",
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
      meta: "magpie-align/magpie · MIT · 68 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Magpie-Align/Magpie-Air-300K-Filtered",
        },
        {
          label: "GitHub",
          href: "https://github.com/magpie-align/magpie",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.08464",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Magpie-Align/Magpie-Air-300K-Filtered",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "The paper creates Magpie-Air-Filtered with 300K conversations and uses the filtered dataset for supervised fine-tuning experiments.",
          source: "tmp/paper-corpus/2406.08464/sections/04.01-experimental-setups.md:22-30; sections/14.03-ablation-analysis-on-data-quantity-and-quality.md:15-20",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Magpie-Air-DPO-100K-v0.1",
      note: "The paper generates Magpie-Air-DPO with 100K conversations for preference optimization.",
      type: "LLMs",
      year: "2024",
      stars: 877,
      updated: "2025-03-17",
      tags: [
        "training data",
        "alignment",
        "dataset",
        "gemma",
        "llama2",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "100K conversations",
        },
        {
          label: "Stars",
          value: "877",
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
      meta: "magpie-align/magpie · MIT · 68 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Magpie-Align/Magpie-Air-DPO-100K-v0.1",
        },
        {
          label: "GitHub",
          href: "https://github.com/magpie-align/magpie",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.08464",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Magpie-Align/Magpie-Air-DPO-100K-v0.1",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "The paper generates Magpie-Air-DPO with 100K conversations for preference optimization.",
          source: "tmp/paper-corpus/2406.08464/sections/04.01-experimental-setups.md:22-30; sections/14.03-ablation-analysis-on-data-quantity-and-quality.md:15-20",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Magpie-Pro-300K-Filtered",
      note: "The paper creates Magpie-Pro-Filtered with 300K conversations and reports models fine-tuned with Magpie-Pro-300K-Filtered.",
      type: "LLMs",
      year: "2024",
      stars: 877,
      updated: "2025-03-17",
      tags: [
        "training data",
        "alignment",
        "dataset",
        "gemma",
        "llama2",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "300K conversations",
        },
        {
          label: "Stars",
          value: "877",
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
      meta: "magpie-align/magpie · MIT · 68 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Magpie-Align/Magpie-Pro-300K-Filtered",
        },
        {
          label: "GitHub",
          href: "https://github.com/magpie-align/magpie",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.08464",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Magpie-Align/Magpie-Pro-300K-Filtered",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "The paper creates Magpie-Pro-Filtered with 300K conversations and reports models fine-tuned with Magpie-Pro-300K-Filtered.",
          source: "tmp/paper-corpus/2406.08464/sections/04.01-experimental-setups.md:22-30; sections/14.03-ablation-analysis-on-data-quantity-and-quality.md:15-20",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Magpie-Pro-DPO-100K-v0.1",
      note: "The paper generates Magpie-Pro-DPO with 100K conversations for preference optimization.",
      type: "LLMs",
      year: "2024",
      stars: 877,
      updated: "2025-03-17",
      tags: [
        "training data",
        "alignment",
        "dataset",
        "gemma",
        "llama2",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "100K conversations",
        },
        {
          label: "Stars",
          value: "877",
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
      meta: "magpie-align/magpie · MIT · 68 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Magpie-Align/Magpie-Pro-DPO-100K-v0.1",
        },
        {
          label: "GitHub",
          href: "https://github.com/magpie-align/magpie",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2406.08464",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Magpie-Align/Magpie-Pro-DPO-100K-v0.1",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "The paper generates Magpie-Pro-DPO with 100K conversations for preference optimization.",
          source: "tmp/paper-corpus/2406.08464/sections/04.01-experimental-setups.md:22-30; sections/14.03-ablation-analysis-on-data-quantity-and-quality.md:15-20",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "MARDY database",
      note: "MARDY contributes to the 370 public CIR traces used to train Metamorph's perturbation and domain discriminator with Adam.",
      type: "Embodied AI",
      venue: "International Workshop on Acoustic Echo and Noise Control",
      year: "2006",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.imperial.ac.uk/a-z-research/speech-audio-processing/resources/",
        },
        {
          label: "Paper",
          href: "https://www.iwaenc.org/proceedings/2006/pdf/A33.pdf",
        },
      ],
      primaryUrl: "https://www.imperial.ac.uk/a-z-research/speech-audio-processing/resources/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W3006816054",
          title: "Metamorph: Injecting Inaudible Commands into Over-the-air Voice Controlled Systems",
          domain: "Embodied AI",
          evidence: "Metamorph uses MARDY CIR traces in its training optimization and domain-discriminator-based learned component.",
          source: "tmp/pdfs/openalex-exact/W3006816054.txt:386-405,533-554,577-583,992-994",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "MASSIVE",
      note: "**Datasets:** We evaluate the effectiveness of our data poisoning attack across four varied datasets that span sentiment analysis, domain classification, and the Chain-of-Thought task. The datasets include SST-2 [@socher2013recursive] and Rotten Tomatoes (RT) [@Pang+Lee:05a], which are binary sentiment analysis datasets, and Alexa Massive [@fitzgerald2022massive], a domain classification dataset with 18 different domains, and GSM8K [@cobbe2021training] which is used to evaluate complex reasoning in LM, featuring grade school math problems that require multi-step problem-solving skills. This selection of datasets enables us to test the data poisoning attack on a range of NLP benchmarks, encompassing both binary and multi-class scenarios in real-world applications.",
      type: "LLMs",
      stars: 564,
      updated: "2022-11-28",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "564",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2022-11",
        },
      ],
      meta: "alexa/massive · NOASSERTION · 58 forks · since 2022",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/alexa/massive",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2204.08582",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/AmazonScience/massive",
        },
      ],
      primaryUrl: "https://github.com/alexa/massive",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.13459",
          title: "Learning to Poison Large Language Models During Instruction Tuning",
          domain: "LLMs",
          evidence: "**Datasets:** We evaluate the effectiveness of our data poisoning attack across four varied datasets that span sentiment analysis, domain classification, and the Chain-of-Thought task. The datasets include SST-2 [@socher2013recursive] and Rotten Tomatoes (RT) [@Pang+Lee:05a], which are binary sentiment analysis datasets, and Alexa Massive [@fitzgerald2022massive], a domain classification dataset with 18 different domains, and GSM8K [@cobbe2021training] which is used to evaluate complex reasoning in LM, featuring grade school math problems that require multi-step problem-solving skills. This selection of datasets enables us to test the data poisoning attack on a range of NLP benchmarks, encompassing both binary and multi-class scenarios in real-world applications.",
          source: "sections/03-experiments-setup.md (sec:3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "MetaDrive human driving trajectories",
      note: "The BC and CQL offline-learning baselines use 36,000 human-demonstrated transitions.",
      type: "Embodied AI",
      year: "2021",
      stars: 1232,
      updated: "2025-08-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,232",
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
      meta: "metadriverse/metadrive · Apache-2.0 · 197 forks · since 2021",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/metadriverse/metadrive/releases/download/MetaDrive-0.2.3/human_traj_100_new.json",
        },
        {
          label: "GitHub",
          href: "https://github.com/metadriverse/metadrive",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2109.12674",
        },
      ],
      primaryUrl: "https://github.com/metadriverse/metadrive/releases/download/MetaDrive-0.2.3/human_traj_100_new.json",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2109.12674",
          title: "MetaDrive: Composing Diverse Driving Scenarios for Generalizable Reinforcement Learning",
          domain: "Embodied AI",
          evidence: "We also provide two offline learning baselines, BC and CQL, which use 36k human demonstrated transitions in 97% success rate to do offline learning and are totally safe in training time.",
          source: "sections/05.04-safe-exploration.md (sec:5.4)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "MIMIC-IT",
      note: "The Otter model was generated by Li et al. [@li2023mimic] using the MIMIC-IT dataset containing 2.8 million multi-modal instruction-response pairs to fine-tune the OpenFlamingo [@awadalla2023openflamingo] model.",
      type: "Embodied AI",
      venue: "arXiv preprint arXiv:2306.05425",
      year: "2023",
      stars: 3433,
      updated: "2024-03-05",
      tags: [
        "training data",
        "artificial-inteligence",
        "chatgpt",
        "deep-learning",
        "embodied-ai",
      ],
      stats: [
        {
          label: "Stars",
          value: "3,433",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-03",
        },
      ],
      meta: "EvolvingLMMs-Lab/Otter · MIT · 209 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/pufanyi/MIMICIT",
        },
        {
          label: "GitHub",
          href: "https://github.com/EvolvingLMMs-Lab/Otter",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2306.05425",
        },
        {
          label: "Source survey",
          href: "https://huggingface.co/datasets/pufanyi/MIMICIT/blob/main/README.md",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/pufanyi/MIMICIT",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2405.19802",
          title: "Exploring the Robustness of Decision-Level Through Adversarial Attacks on LLM-Based Embodied Models",
          domain: "Embodied AI",
          evidence: "The Otter model was generated by Li et al. [@li2023mimic] using the MIMIC-IT dataset containing 2.8 million multi-modal instruction-response pairs to fine-tune the OpenFlamingo [@awadalla2023openflamingo] model.",
          source: "sections/04.01-settings.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "MM-SafetyBench",
      note: "The blue suffix generator is fine-tuned from GPT-2 with PPO on hard jailbreak prompts crafted on all 13 MM-SafetyBench topics.",
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
      name: "Movie Review",
      note: "Train'') of BERT model on MR and SNLI dataset.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.cs.cornell.edu/people/pabo/movie-review-data/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/P02-1053/",
        },
      ],
      primaryUrl: "https://www.cs.cornell.edu/people/pabo/movie-review-data/",
      domains: [
        "LLMs",
      ],
      usageCount: 3,
      sourcePapers: [
        {
          arxivId: "1907.11932",
          title: "Is BERT Really Robust? A Strong Baseline for Natural Language Attack on Text Classification and Entailment",
          domain: "LLMs",
          evidence: "Train'') of BERT model on MR and SNLI dataset.",
          source: "tables/tab-adv-training.tex (tab:adv-training)",
        },
        {
          arxivId: "2211.14719",
          title: "BadPrompt: Backdoor Attacks on Continuous Prompts",
          domain: "LLMs",
          evidence: "We conduct experiments on three tasks, i.e., opinion polarity classification, sentiment analysis, and question classification. The datasets used in the experiments are SST-2 [@sst-2], MR [@mr], CR [@cr], SUBJ [@subj], and TREC [@trec], which have been widely-used in continuous prompts [@Gao; @DART].\nThe dataset statistics can be seen in the Appendix.\nEach class of the datasets has only 16 training samples and 16 validation samples respectively, which is a typical few-shot scenario.\nWe use the same set of seeds across five sampled training sets for each task as previous studies [@Gao; @DART].",
          source: "sections/04.01-datasets-and-victim-models.md (sec:4.1)",
        },
        {
          arxivId: "2305.01219",
          title: "Prompt as Triggers for Backdoor Attack: Examining the Vulnerability in Language Models",
          domain: "LLMs",
          evidence: "Tables [#tab:tab4] and [#tab:tab44] show CA and ASR as the number of poisoning samples increases on the victim model. Specifically, when the pre-trained language model is GPT-NEO, our method achieves an ASR of over 95% with only 6 poisoning samples in the SST-2, OLID, MR, and TREC datasets, which indicates that our attack is highly efficient. Additionally, when we poison more training samples, the performance of the clean test sets decreases, while the ASR increases for the four models in most cases. This observation agrees with the results presented in Figure [#fig:fig4]. For additional experimental results in the few-shot settings, please see the Appendix [#appendix3].",
          source: "sections/04.03-backdoor-attack-results-of-few-shot.md (sec:4.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Mozilla Common Voice",
      note: "The Common Voice dataset is used to train ASR systems and test the effectiveness of audio AEs.",
      type: "Embodied AI",
      year: "2019",
      stars: 3480,
      updated: "2026-08-18",
      tags: [
        "training data",
        "crowdsourcing",
        "internet-freedom",
        "open-data",
        "voice",
      ],
      stats: [
        {
          label: "Stars",
          value: "3,480",
        },
        {
          label: "Language",
          value: "TypeScript",
        },
        {
          label: "Updated",
          value: "2026-08",
        },
      ],
      meta: "common-voice/common-voice · MPL-2.0 · 867 forks · since 2017",
      resources: [
        {
          label: "Project page",
          href: "https://commonvoice.mozilla.org/en/datasets",
        },
        {
          label: "GitHub",
          href: "https://github.com/common-voice/common-voice",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1912.06670",
        },
      ],
      primaryUrl: "https://commonvoice.mozilla.org/en/datasets",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2110.09714",
          title: "Black-box Adversarial Attacks on Commercial Speech Platforms with Minimal Information",
          domain: "Embodied AI",
          evidence: "The Common Voice dataset is used to train ASR systems and test the effectiveness of audio AEs.",
          source: "sections/11.01-datasets.md (sec:11.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "MPI-Sintel",
      note: "In both cases, the universal perturbations are trained on the Sintel final training set, and evaluated on test.",
      type: "Embodied AI",
      venue: "Proc. European Conference on Computer Vision (ECCV)",
      year: "2012",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://sintel.is.tue.mpg.de/downloads",
        },
        {
          label: "Paper",
          href: "https://files.is.tue.mpg.de/black/papers/ButlerECCV2012.pdf",
        },
      ],
      primaryUrl: "https://sintel.is.tue.mpg.de/downloads",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2203.13214",
          title: "A Perturbation Constrained Adversarial Attack for Evaluating the Robustness of Optical Flow",
          domain: "Embodied AI",
          evidence: "Caption: Transferability of Sintel universal perturbations between training and test dataset and between different networks, measured as adversarial robustness $AEE(\\checkf, f)$.",
          source: "tables/tab-transfer-sintel.tex (tab:transfer_sintel)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "MS COCO",
      note: "We used YOLO object detection models pre-trained on the MS COCO dataset for the PC environment.",
      type: "LLMs",
      venue: "European Conference on Computer Vision (ECCV)",
      year: "2014",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://cocodataset.org/#download",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1405.0312",
        },
      ],
      primaryUrl: "https://cocodataset.org/#download",
      domains: [
        "LLMs",
        "Embodied AI",
      ],
      usageCount: 7,
      sourcePapers: [
        {
          arxivId: "1804.05810",
          title: "ShapeShifter: Robust Physical Adversarial Attack on Faster R-CNN Object Detector",
          domain: "Embodied AI",
          evidence: "The model was trained on the Microsoft Common Objects in Context (MS-COCO) dataset [@lin2014microsoft] and is publicly available in the Tensorflow Object Detection API [@huang2017speed] model zoo repository[^fn:3].",
          source: "sections/05-evaluation.md (sec:5)",
        },
        {
          arxivId: "1904.08653",
          title: "Fooling Automated Surveillance Cameras: Adversarial Patches to Attack Person Detection",
          domain: "Embodied AI",
          evidence: "In our experiments with the YOLO detector trained on the MS COCO dataset [@lin2014microsoft], we found that the generated patch is detected as another class in the COCO dataset.",
          source: "sections/03.01-minimizing-probability-in-the-output-of-the-detector.md (sec:3.1)",
        },
        {
          arxivId: "1910.11099",
          title: "Adversarial T-Shirt! Evading Person Detectors in a Physical World",
          domain: "Embodied AI",
          evidence: "These two object detectors are both pre-trained on COCO dataset which contains 80 classes including 'person'.",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
        {
          arxivId: "2209.01962",
          title: "Adversarial Detection: Attacking Object Detection in Real Time",
          domain: "Embodied AI",
          evidence: "For example, if the model is pretrained on the MS COCO dataset [@mscoco2014] [@moore2020fiftyone] that contains 80 classes ($K=80$), each output contains 85 values consisting of four dimensions ($b_x, b_y, b_w, b_h$), one confidence value ($c$), and 80 probabilities $(p_1, p_2, ..., p_{80})$ for each class.",
          source: "sections/03.01-problem-formulation.md (sec:3.1)",
        },
        {
          arxivId: "2303.03323",
          title: "CleanCLIP: Mitigating Data Poisoning Attacks in Multimodal Contrastive Learning",
          domain: "Embodied AI",
          evidence: "Caption: Clean Accuracy (CA) and Attack Success Rate (ASR) of models finetuned using CleanCLIP on 100K samples from MSCOCO and SBUCaptions.",
          source: "tables/tab-exp-table-selfi-dataset.tex (tab:exp_table:selfi_dataset)",
        },
        {
          arxivId: "2406.04313",
          title: "Improving Alignment and Robustness with Circuit Breakers",
          domain: "LLMs",
          evidence: "To effectively construct a multimodal circuit breaker dataset containing images and their corresponding harmful queries and completions, we first use the LLaVA-Mistral-7B model [@liu2024llavanext] to generate detailed image descriptions from a sample of images from the COCO Dataset [@lin2015microsoft]. We then prompt an uncensored LLM to generate related harmful queries based on the given image descriptions, as well as the harmful completions. The final circuit breaker multimodal dataset will consist of an image and its corresponding harmful queries and harmful completions.\n\nTraining-use context: We utilize HarmBench's LLM classifier to evaluate the attack success rate and manually verify the judgements. Detailed configurations for each attack are provided in [#llm-attacks-details]. To measure the capabilities of the models with circuit breakers, we evaluate our models on MTBench [@zheng2023mtbench] for instruction-following abilities and on the OpenLLM Leaderboard [@open-llm-leaderboard] for knowledge and reasoning which includes MMLU [@hendrycks2020mmlu], ARC-c [@clark2018think], HellaSwag [@zellers2019hellaswag], TruthfulQA [@lin2022truthfulqa], Winogrande [@winogrande], and GSM8K [@gsm8k]. [#tab:results-open-llm] contains a detailed breakdown of performance on each dataset. Additionally, we follow the methodology in [@claude3_report] to construct an over-refusal evaluation, described in [#app:over_refusal]. For baselines, we use the original Mistral and Llama-3 Instruct models. Additionally, we include a state-of-the-art adversarially trained Mistral model, R2D2 [@mazeika2024harmbench], for comparison.",
          source: "sections/06.02-multimodal-circuit-breaker-dataset.md (sec:6.2); sections/04.01-large-language-models.md (sec:4.1)",
        },
        {
          arxivId: "2410.05346",
          title: "Anyattack: Towards Large-scale Self-supervised Adversarial Attacks on Vision-language Models",
          domain: "Embodied AI",
          evidence: "We perform an ablation study on the MSCOCO dataset for image-text retrieval task to evaluate the impact of three key components in our approach: 1) **Training approach**: Pre-trained, fine-tuned, or trained from scratch.",
          source: "sections/04.06-further-analysis.md (sec:4.6)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "MultiNLI",
      note: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://cims.nyu.edu/~sbowman/multinli/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/N18-1101/",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/nyu-mll/multi_nli",
        },
      ],
      primaryUrl: "https://cims.nyu.edu/~sbowman/multinli/",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "1907.11932",
          title: "Is BERT Really Robust? A Strong Baseline for Natural Language Attack on Text Classification and Entailment",
          domain: "LLMs",
          evidence: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
          source: "tmp/paper-corpus/1907.11932/sections/03.02-attacking-target-models.md:15-24; dataset identity in sections/03.01.01-text-classification.md or sections/03.01.02-textual-entailment.md",
        },
        {
          arxivId: "2004.09984",
          title: "BERT-ATTACK: Adversarial Attack Against BERT Using BERT",
          domain: "LLMs",
          evidence: "We use the IMDB dataset and the MNLI dataset, and for each task, we select 100 samples of both original and adversarial samples for human judges.\n\nTraining-use context: Under the black-box scenario, the logit output by the target model (fine-tuned BERT or other neural models) is the only supervision we can get.\nWe first select the words in the sequence which have a high significance influence on the final output logit.",
          source: "sections/04.04-human-evaluations.md (sec:4.4); sections/03.01-finding-vulnerable-words.md (sec:3.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "NCBI Disease Corpus",
      note: "We fine-tune three BERT models (base-cased) for each data set with different initialization seeds (1, 2 & 4) using the Huggingface implementation. For the biomedical data sets, we additionally fine-tune two domain-specific BERT models BioBERT and SciBERT.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.ncbi.nlm.nih.gov/CBBresearch/Dogan/DISEASE/disclaimer.html",
        },
        {
          label: "Paper",
          href: "https://pubmed.ncbi.nlm.nih.gov/24393765/",
        },
        {
          label: "Source survey",
          href: "https://www.ncbi.nlm.nih.gov/research/bionlp/Data/",
        },
      ],
      primaryUrl: "https://www.ncbi.nlm.nih.gov/CBBresearch/Dogan/DISEASE/disclaimer.html",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2109.11308",
          title: "Breaking BERT: Understanding Its Vulnerabilities for Named Entity Recognition Through Adversarial Attack",
          domain: "LLMs",
          evidence: "We fine-tune three BERT models (base-cased) for each data set with different initialization seeds (1, 2 & 4) using the Huggingface implementation. For the biomedical data sets, we additionally fine-tune two domain-specific BERT models BioBERT and SciBERT.",
          source: "tmp/paper-corpus/2109.11308/sections/04.02-target-models.md:15-18",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "News Articles",
      note: "The training-composition ablation includes News+LaMini and News+BIPIA, and the source is identified as a CC0 Harvard Dataverse dataset.",
      type: "Agents",
      venue: "Harvard Dataverse",
      year: "2017",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GMFCTR",
        },
        {
          label: "Source survey",
          href: "https://doi.org/10.7910/DVN/GMFCTR",
        },
      ],
      primaryUrl: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/GMFCTR",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2505.06311",
          title: "Defending against indirect prompt injection by instruction detection",
          domain: "Agents",
          evidence: "The dataset contains 3,824 news articles ... sourced from multiple media outlets, under the CC0 license.",
          source: "sections/09.01-dataset-details.md (sec:9.1)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "NGSIM US-101 and I-80",
      note: "The NGSIM data are divided into 70% training, 10% validation, and 20% test sets, followed by Adam optimization and explicit pre-training/formal-training cycles for the trajectory-prediction model.",
      type: "Embodied AI",
      venue: "Federal Highway Administration dataset reports",
      year: "2005",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://data.transportation.gov/stories/s/Next-Generation-Simulation-NGSIM-Open-Data/i5zb-xe34/",
        },
      ],
      primaryUrl: "https://data.transportation.gov/stories/s/Next-Generation-Simulation-NGSIM-Open-Data/i5zb-xe34/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2304.05610",
          title: "Vehicle Trajectory Prediction based Predictive Collision Risk Assessment for Autonomous Driving in Highway Scenarios",
          domain: "Embodied AI",
          evidence: "NGSIM US101 and I80 trajectories are preprocessed, split 70/10/20 for training/validation/test, and used during Adam-based model training.",
          source: "tmp/pdfs/failed-arxiv/2304.05610.txt:593-604,623-635,639-660,931-934",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "nuScenes",
      note: "For each task, we test the corresponding models trained on the nuScenes training set.",
      type: "Embodied AI",
      venue: "CVPR",
      year: "2020",
      stars: 2792,
      updated: "2026-08-06",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "2,792",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-08",
        },
      ],
      meta: "nutonomy/nuscenes-devkit · NOASSERTION · 715 forks · since 2018",
      resources: [
        {
          label: "Project page",
          href: "https://www.nuscenes.org/nuscenes",
        },
        {
          label: "GitHub",
          href: "https://github.com/nutonomy/nuscenes-devkit",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1903.11027",
        },
      ],
      primaryUrl: "https://www.nuscenes.org/nuscenes",
      domains: [
        "Embodied AI",
      ],
      usageCount: 8,
      sourcePapers: [
        {
          arxivId: "2103.15326",
          title: "Fooling LiDAR Perception via Adversarial Trajectory Perturbation",
          domain: "Embodied AI",
          evidence: "Both models are trained on nuScenes training set.",
          source: "sections/05.02-dataset-and-evaluation-metrics.md (sec:5.2)",
        },
        {
          arxivId: "2112.05077",
          title: "Generating Useful Accident-Prone Driving Scenarios via a Learned Traffic Prior",
          domain: "Embodied AI",
          evidence: "For training the learned traffic model, we use scenes from the training split of the nuScenes prediction challenge.",
          source: "sections/09.01-data-and-metrics.md (sec:9.1)",
        },
        {
          arxivId: "2311.17918",
          title: "Driving Into the Future: Multiview Visual Forecasting and Planning with World Model for Autonomous Driving",
          domain: "Embodied AI",
          evidence: "Although trained on nuScenes [@caesar2020nuscenes] *train* set, Drive-WM exhibits creativity on the *val* set by generating novel combinations of objects, motions, and scenes.",
          source: "sections/07.02-generation-of-diverse-multiview-videos.md (sec:7.2)",
        },
        {
          arxivId: "2406.11707",
          title: "A First Physical-World Trajectory Prediction Attack via LiDAR-induced Deceptions in Autonomous Driving",
          domain: "Embodied AI",
          evidence: "We follow the same experimental settings as those used in the dataset-based experiments, and the AgentFormer model is also trained on the nuScenes dataset using its default configuration.",
          source: "sections/11.01-generalizability-across-models.md (sec:11.1)",
        },
        {
          arxivId: "2411.01889",
          title: "LiDAttack: Robust Black-Box Attack on LiDAR-Based Object Detection",
          domain: "Embodied AI",
          evidence: "Experimental results show that LiDAttack exhibits excellent performance against mainstream target detection models such as PointRCNN, PointPillar, and PV-RCNN++ on KITTI, nuScenes, and self-constructed data datasets, and effectively improves the robustness of the models through adversarial training.",
          source: "sections/07-conclusion.md (sec:7)",
        },
        {
          arxivId: "2501.09167",
          title: "Embodied Scene Understanding for Vision Language Models via MetaVQA",
          domain: "Embodied AI",
          evidence: "For expedited experimentation, we curate a representative training set of 150,000 questions, with 50,000 coming from Waymo scenarios, 50,000 coming from nuScenes scenarios, and 50,000 coming from the simulated nuScenes scenarios in the simulator.",
          source: "sections/04.01-dataset-composition.md (sec:4.1)",
        },
        {
          arxivId: "2507.09095",
          title: "Temporal Misalignment Attacks against Multimodal Perception in Autonomous Driving",
          domain: "Embodied AI",
          evidence: "**3D Object Detection:** We evaluate DejaVu on two representative MMF-based 3D object detection models. i) *MVXNet* [@sindagi2019mvx], trained on the KITTI dataset, is an early fusion-based architecture that projects LiDAR point clouds into pseudo-image space and fuses them with camera image features at the voxel level. ii) *BEVFusion* [@liu2023bevfusion] is a more advanced architecture, trained on the NuScenes dataset, that unifies multi-modal sensor inputs in the bird's eye view (BEV) representation space.",
          source: "sections/06.02-models.md (sec:6.2)",
        },
        {
          arxivId: "2602.18739",
          title: "When World Models Dream Wrong: Physical-Conditioned Adversarial Attacks against World Models",
          domain: "Embodied AI",
          evidence: "The experimental dataset used is the nuScenes dataset [@caesar2020nuscenes], consisting of 850 actual driving videos, including 700 training videos and 150 validation videos.",
          source: "sections/05.01-experimental-setup.md (sec:5.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "OLID",
      note: "Notably, our approach outperforms the clean-label backdoor attack on Triggerless, achieving an average ASR improvement of 1.41% for the SST-2 dataset, 0.5% for the OLID dataset and 4.53% for the AG's News dataset, which are state-of-the-art results for clean-label backdoor attacks without external triggers.\n\nTraining-use context: Tables [#tab:tab4] and [#tab:tab44] show CA and ASR as the number of poisoning samples increases on the victim model. Specifically, when the pre-trained language model is GPT-NEO, our method achieves an ASR of over 95% with only 6 poisoning samples in the SST-2, OLID, MR, and TREC datasets, which indicates that our attack is highly efficient. Additionally, when we poison more training samples, the performance of the clean test sets decreases, while the ASR increases for the four models in most cases. This observation agrees with the results presented in Figure [#fig:fig4]. For additional experimental results in the few-shot settings, please see the Appendix [#appendix3].",
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
      name: "Open X-Embodiment",
      note: "We compare to OpenVLA [@kim2024openvla], a 7B parameter VLA model that was originally trained on the OXE dataset [@collaboration2023open].",
      type: "Embodied AI",
      venue: "ICRA",
      year: "2024",
      stars: 1986,
      updated: "2025-11-05",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,986",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2025-11",
        },
      ],
      meta: "google-deepmind/open_x_embodiment · Apache-2.0 · 120 forks · since 2023",
      resources: [
        {
          label: "Project page",
          href: "https://robotic-transformer-x.github.io/",
        },
        {
          label: "GitHub",
          href: "https://github.com/google-deepmind/open_x_embodiment",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2310.08864",
        },
      ],
      primaryUrl: "https://robotic-transformer-x.github.io/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 7,
      sourcePapers: [
        {
          arxivId: "2410.01971",
          title: "Run-time Observation Interventions Make Vision-Language-Action Models More Visually Robust",
          domain: "Embodied AI",
          evidence: "For instance, [@kim2024openvla] demonstrates that Octo [@team2024octo] --- a recently proposed VLA trained on Open X-Embodiment data --- has its task success rate dropped from 60% to 29% in visual generalization tasks consisting of object distractions and unseen object appearances or backgrounds.",
          source: "sections/02.01-vision-language-action-vla-models.md (sec:2.1)",
        },
        {
          arxivId: "2410.24164",
          title: "π0: A Vision-Language-Action Flow Model for General Robot Control",
          domain: "Embodied AI",
          evidence: "In our training framework, we first assemble a pre-training mixture consisting of a weighted combination of our own dexterous manipulation datasets (Section [#sec:datadetails]), collected on 7\\ different robot configurations for 68\\ different tasks, and the entire OXE dataset [@collaboration2023open], which contains data from 22 robots.",
          source: "sections/03-overview.md (sec:3)",
        },
        {
          arxivId: "2506.03350",
          title: "Adversarial Attacks on Robotic Vision Language Action Models",
          domain: "Embodied AI",
          evidence: "To assess how well our attacks optimized in a simulated environment transfer to real-world settings, we evaluate single-step attacks on two environments from the Open-X-Embodiment [@open_x_embodiment_rt_x_2023] set that OpenVLA was trained on: HYDRA [@belkhale2023hydrahybridrobotactions], a real-world environment, and SIMPLER [@li24simpler], a simulated environment.",
          source: "sections/04.01-single-step-attacks.md (sec:4.1)",
        },
        {
          arxivId: "2510.05865",
          title: "The Safety Challenge of World Models for Embodied AI Agents: A Review",
          domain: "Embodied AI",
          evidence: "In robotics control, we consider 3 SoTA models RT-1-X [@rt1] and Octo-Base [@octo] trained on Open-X dataset and, RoboGen [@robogen].",
          source: "sections/03.01-experimental-settings.md (sec:3.1)",
        },
        {
          arxivId: "2510.13626",
          title: "LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models",
          domain: "Embodied AI",
          evidence: "NORA is pre-trained on the Open X-Embodiment dataset, which includes trajectories from various robots performing diverse tasks.",
          source: "sections/10.04-nora-hung2025nora.md (sec:10.4)",
        },
        {
          arxivId: "2510.16732",
          title: "A Comprehensive Survey on World Models for Embodied AI",
          domain: "Embodied AI",
          evidence: "& OXE\\cite{o2024open} & 2024 & Cross-embodiment pretraining & RGB-D/LiDAR/Text & Real & 1M\\!+\\ trajectories & - \\\\",
          source: "tables/tab-dataset.tex (tab:dataset)",
        },
        {
          arxivId: "2604.23775",
          title: "Vision-Language-Action Safety: Threats, Challenges, Evaluations, and Mechanisms",
          domain: "Embodied AI",
          evidence: "Octo [@team2024octo] is a generalist robot policy trained on approximately 800,000 trajectories from the Open X-Embodiment dataset, covering 22 robot embodiments.",
          source: "sections/02.05-representative-vla-systems.md (sec:2.5)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "OpenAssistant OASST1",
      note: "Caption: In aligning Mistral-7B on the OpenAssistant dataset, we find that using KTO with only one output per input still outperforms DPO, despite this restriction reducing the amount of training data by 72%.",
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
      name: "OpenHermes 1",
      note: "**Baselines for Supervised Fine-Tuning and Preference Optimization.** We compare the family of instruction datasets generated by Magpie with eight SOTA open-source instruction datasets: **ShareGPT** [@vicuna2023], **WildChat** [@zhao2024wildchat], **Evol Instruct** [@xu2023wizardlm], **UltraChat** [@ding2023ultrachat], **GenQA** [@chen2024genqa], **OpenHermes 1** [@OpenHermes], **OpenHermes 2.5** [@OpenHermes2.5], and **Tulu V2 Mix** [@tulu2]. ShareGPT and WildChat are representative human-written datasets containing 112K and 652K high-quality multi-round conversations between humans and GPT, respectively.\nEvol Instruct, UltraChat, and GenQA are representative open-source synthetic datasets.\nFollowing [@meng2024simpo], we use the 208K sanitized version of Ultrachat provided by HuggingFace[^fn:3]. OpenHermes 1, OpenHermes 2.5, and Tulu V2 Mix are crowd-sourced datasets consisting of a mix of diverse open-source instruction datasets, with 243K, 1M, and 326K conversations, respectively. We also create an instruction dataset with 100K conversations using the Self-Instruct [@wang-etal-2023-self-instruct] and Llama-3-8B-Instruct model, denoted as **Self-Instruct (Llama-3)**.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/teknium/openhermes",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/teknium/openhermes",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "**Baselines for Supervised Fine-Tuning and Preference Optimization.** We compare the family of instruction datasets generated by Magpie with eight SOTA open-source instruction datasets: **ShareGPT** [@vicuna2023], **WildChat** [@zhao2024wildchat], **Evol Instruct** [@xu2023wizardlm], **UltraChat** [@ding2023ultrachat], **GenQA** [@chen2024genqa], **OpenHermes 1** [@OpenHermes], **OpenHermes 2.5** [@OpenHermes2.5], and **Tulu V2 Mix** [@tulu2]. ShareGPT and WildChat are representative human-written datasets containing 112K and 652K high-quality multi-round conversations between humans and GPT, respectively.\nEvol Instruct, UltraChat, and GenQA are representative open-source synthetic datasets.\nFollowing [@meng2024simpo], we use the 208K sanitized version of Ultrachat provided by HuggingFace[^fn:3]. OpenHermes 1, OpenHermes 2.5, and Tulu V2 Mix are crowd-sourced datasets consisting of a mix of diverse open-source instruction datasets, with 243K, 1M, and 326K conversations, respectively. We also create an instruction dataset with 100K conversations using the Self-Instruct [@wang-etal-2023-self-instruct] and Llama-3-8B-Instruct model, denoted as **Self-Instruct (Llama-3)**.",
          source: "sections/04.01-experimental-setups.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "OpenHermes 2.5",
      note: "**Baselines for Supervised Fine-Tuning and Preference Optimization.** We compare the family of instruction datasets generated by Magpie with eight SOTA open-source instruction datasets: **ShareGPT** [@vicuna2023], **WildChat** [@zhao2024wildchat], **Evol Instruct** [@xu2023wizardlm], **UltraChat** [@ding2023ultrachat], **GenQA** [@chen2024genqa], **OpenHermes 1** [@OpenHermes], **OpenHermes 2.5** [@OpenHermes2.5], and **Tulu V2 Mix** [@tulu2]. ShareGPT and WildChat are representative human-written datasets containing 112K and 652K high-quality multi-round conversations between humans and GPT, respectively.\nEvol Instruct, UltraChat, and GenQA are representative open-source synthetic datasets.\nFollowing [@meng2024simpo], we use the 208K sanitized version of Ultrachat provided by HuggingFace[^fn:3]. OpenHermes 1, OpenHermes 2.5, and Tulu V2 Mix are crowd-sourced datasets consisting of a mix of diverse open-source instruction datasets, with 243K, 1M, and 326K conversations, respectively. We also create an instruction dataset with 100K conversations using the Self-Instruct [@wang-etal-2023-self-instruct] and Llama-3-8B-Instruct model, denoted as **Self-Instruct (Llama-3)**.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/teknium/OpenHermes-2.5",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/teknium/OpenHermes-2.5",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "**Baselines for Supervised Fine-Tuning and Preference Optimization.** We compare the family of instruction datasets generated by Magpie with eight SOTA open-source instruction datasets: **ShareGPT** [@vicuna2023], **WildChat** [@zhao2024wildchat], **Evol Instruct** [@xu2023wizardlm], **UltraChat** [@ding2023ultrachat], **GenQA** [@chen2024genqa], **OpenHermes 1** [@OpenHermes], **OpenHermes 2.5** [@OpenHermes2.5], and **Tulu V2 Mix** [@tulu2]. ShareGPT and WildChat are representative human-written datasets containing 112K and 652K high-quality multi-round conversations between humans and GPT, respectively.\nEvol Instruct, UltraChat, and GenQA are representative open-source synthetic datasets.\nFollowing [@meng2024simpo], we use the 208K sanitized version of Ultrachat provided by HuggingFace[^fn:3]. OpenHermes 1, OpenHermes 2.5, and Tulu V2 Mix are crowd-sourced datasets consisting of a mix of diverse open-source instruction datasets, with 243K, 1M, and 326K conversations, respectively. We also create an instruction dataset with 100K conversations using the Self-Instruct [@wang-etal-2023-self-instruct] and Llama-3-8B-Instruct model, denoted as **Self-Instruct (Llama-3)**.",
          source: "sections/04.01-experimental-setups.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "OpenOrca",
      note: "For simplicity, we employ the first 10,000 samples of OpenOrca dataset to remove backdoors in LLMs that are fine-tuned and evaluated on the Stanford Alpaca dataset (*LLM-Alpaca*), and vice versa.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Open-Orca/OpenOrca",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2306.02707",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Open-Orca/OpenOrca",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2405.07667",
          title: "Backdoor Removal for Generative Large Language Models",
          domain: "LLMs",
          evidence: "For simplicity, we employ the first 10,000 samples of OpenOrca dataset to remove backdoors in LLMs that are fine-tuned and evaluated on the Stanford Alpaca dataset (*LLM-Alpaca*), and vice versa.",
          source: "sections/08.01-removing-backdoors-with-out-of-domain-datasets.md (sec:8.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "OpenScene",
      note: "NAVSIM trains 114 learned planners on navtrain and size-matched subsets of OpenScene.",
      type: "Embodied AI",
      year: "2023",
      stars: 448,
      updated: "2026-01-13",
      tags: [
        "training data",
        "3d-occupancy",
        "autonomous-driving",
        "foundation-model",
      ],
      stats: [
        {
          label: "Stars",
          value: "448",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-01",
        },
      ],
      meta: "OpenDriveLab/OpenScene · Apache-2.0 · 33 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/OpenDriveLab/OpenScene",
        },
      ],
      primaryUrl: "https://github.com/OpenDriveLab/OpenScene",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.15349",
          title: "NavSim: Data-Driven Non-Reactive Autonomous Vehicle Simulation and Benchmarking",
          domain: "Embodied AI",
          evidence: "We instantiate standardized training and evaluation splits for NAVSIM with the OpenScene dataset, though our framework can be extended to other datasets.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "OpenSubtitles",
      note: "We train an open-domain dialog model using the sequence-to-sequence structure [@vaswani2017transformer] on the OpenSubtitle dataset.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://opus.nlpl.eu/datasets/OpenSubtitles",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/L16-1147/",
        },
      ],
      primaryUrl: "https://opus.nlpl.eu/datasets/OpenSubtitles",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2106.01810",
          title: "Defending Against Backdoor Attacks in Natural Language Generation",
          domain: "LLMs",
          evidence: "We train an open-domain dialog model using the sequence-to-sequence structure [@vaswani2017transformer] on the OpenSubtitle dataset.",
          source: "sections/05.01-change-in-target-semantics.md (sec:5.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "OpenWebText",
      note: "To defend against our attack, in Section [#ssec:white_box_removal] we fine-tune models on standard language modeling corpora. In these experiments, we use the OpenWebText [@Gokaslan2019OpenWeb], BooksCorpus [@zhu2015aligning], and Wikitext-103 [@merity2016pointer] datasets.\nThese are widely used datasets for language modeling.",
      type: "LLMs",
      stars: 22,
      updated: "2026-06-23",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "22",
        },
        {
          label: "Updated",
          value: "2026-06",
        },
      ],
      meta: "Skylion007/OpenWebTextCorpus · 2 forks · since 2019",
      resources: [
        {
          label: "Project page",
          href: "https://skylion007.github.io/OpenWebTextCorpus/",
        },
        {
          label: "GitHub",
          href: "https://github.com/Skylion007/OpenWebTextCorpus",
        },
      ],
      primaryUrl: "https://skylion007.github.io/OpenWebTextCorpus/",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2307.14692",
          title: "Backdoor Attacks for In-Context Learning with Language Models",
          domain: "LLMs",
          evidence: "To defend against our attack, in Section [#ssec:white_box_removal] we fine-tune models on standard language modeling corpora. In these experiments, we use the OpenWebText [@Gokaslan2019OpenWeb], BooksCorpus [@zhu2015aligning], and Wikitext-103 [@merity2016pointer] datasets.\nThese are widely used datasets for language modeling.",
          source: "sections/04-experimental-setup.md (sec:4)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "ORCA-DPO",
      note: "We conducted a comprehensive evaluation of PoisonedAlign on five prominent LLMs, two alignment datasets, 49 task pairings, and five distinct prompt injection attacks. Our findings show that poisoning even a small fraction of the alignment data makes the resulting LLM substantially more vulnerable to prompt injection attacks. For instance, with just 10% of the ORCA-DPO [@dpodata] alignment data poisoned, the success rate of a Combined Attack against Llama-3-8b-Instruct increased by an average of 0.33. Crucially, this vulnerability is achieved with high stealth since the poisoned models maintain their core capabilities on standard benchmarks like MMLU [@hendrycks2020measuring], making the attack difficult to detect through routine performance evaluation.",
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
      name: "PASCAL VOC",
      note: "The attack fine-tunes the target encoder on a shadow dataset, instantiated with 5,000 PASCAL VOC images.",
      type: "Embodied AI",
      venue: "International Journal of Computer Vision",
      year: "2015",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.robots.ox.ac.uk/~vgg/projects/pascal/VOC/",
        },
      ],
      primaryUrl: "https://www.robots.ox.ac.uk/~vgg/projects/pascal/VOC/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2502.18290",
          title: "Stealthy backdoor attack in self-supervised learning vision encoders for large vision language models",
          domain: "Embodied AI",
          evidence: "Shadow Dataset. We utilize 5K images from PASCAL VOC as our shadow dataset.",
          source: "sections/05.01-experiment-setup.md (sec:5.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Penn Treebank",
      note: "does overtrain, we take the first $5\\%$ of the PTB dataset and train our",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://catalog.ldc.upenn.edu/LDC99T42",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/J93-2004/",
        },
      ],
      primaryUrl: "https://catalog.ldc.upenn.edu/LDC99T42",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "1802.08232",
          title: "The Secret Sharer: Evaluating and Testing Unintended Memorization in Neural Networks",
          domain: "LLMs",
          evidence: "does overtrain, we take the first $5\\%$ of the PTB dataset and train our",
          source: "sections/09.01.01-weight-decay.md (sec:9.1.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "PKU-SafeRLHF",
      note: "To the best of our knowledge, Safe RLHF is the first integration of Safe RL and the RLHF framework.\nThis framework incorporates a two-dimensional human annotation scheme and a safe training mechanism to enhance model performance while ensuring safety (as shown in Figure [#fig:pipeline]).\nExperimentally, we applied the Safe RLHF pipeline three times, significantly enhancing the helpfulness of the base SFT model while efficiently reducing the generation of harmful responses.\nCompared to the static multi-objective balance algorithm, *Reward Shaping* [@ng1999policy], Our algorithm better navigates the tension between the objectives of helpfulness and harmlessness.\nSimultaneously, it maintains equal or superior performance improvements compared to existing value-aligned algorithms.\nMeanwhile, we release all the data and training codes from the three iterations of Safe RLHF fine-tuning, facilitating researchers to replicate and validate our findings.",
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
      name: "Project Gutenberg",
      note: "Table tab:task_summary identifies Project Gutenberg as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.gutenberg.org/ebooks/offline_catalogs.html",
        },
        {
          label: "Source survey",
          href: "https://www.gutenberg.org/policy/robot_access.html",
        },
      ],
      primaryUrl: "https://www.gutenberg.org/ebooks/offline_catalogs.html",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies Project Gutenberg as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Reddit TL;DR",
      note: "Next, we evaluate fine-tuning performance of DPO on summarization and single-turn dialogue. For summarization,\nautomatic evaluation metrics such as ROUGE can be poorly correlated with human preferences [@stiennon2022learning], and prior work has found that fine-tuning LMs using PPO on human preferences to provide more effective summaries. We evaluate different methods by sampling completions on the test split of TL;DR summarization dataset, and computing the average win rate against reference completions in the test set. The completions for all methods are sampled at temperatures varying from 0.0 to 1.0, and the win rates are shown in Figure [#fig:frontier-tldr-main] (right). DPO, PPO and Preferred-FT all fine-tune the same GPT-J SFT model[^fn:3]. We find that DPO has a win rate of approximately 61% at a temperature of 0.0, exceeding the performance of PPO at 57% at its optimal sampling temperature of 0.0. DPO also achieves a higher maximum win rate compared to the best of $N$ baseline. We note that we did not meaningfully tune DPO's $\\beta$ hyperparameter, so these results may underestimate DPO's potential. Moreover, we find DPO to be much more robust to the sampling temperature than PPO, the performance of which can degrade to that of the base GPT-J model at high temperatures. Preferred-FT does not improve significantly over the SFT model. We also compare DPO and PPO head-to-head in human evaluations in Section [#sec:human-judgments], where DPO samples at temperature 0.25 were preferred 58% times over PPO samples at temperature 0.",
      type: "LLMs",
      stars: 1062,
      updated: "2023-09-05",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,062",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-09",
        },
      ],
      meta: "openai/summarize-from-feedback · NOASSERTION · 153 forks · since 2020 · archived",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/openai/summarize_from_feedback",
        },
        {
          label: "GitHub",
          href: "https://github.com/openai/summarize-from-feedback",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2009.01325",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/openai/summarize_from_feedback",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2305.18290",
          title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
          domain: "LLMs",
          evidence: "Next, we evaluate fine-tuning performance of DPO on summarization and single-turn dialogue. For summarization,\nautomatic evaluation metrics such as ROUGE can be poorly correlated with human preferences [@stiennon2022learning], and prior work has found that fine-tuning LMs using PPO on human preferences to provide more effective summaries. We evaluate different methods by sampling completions on the test split of TL;DR summarization dataset, and computing the average win rate against reference completions in the test set. The completions for all methods are sampled at temperatures varying from 0.0 to 1.0, and the win rates are shown in Figure [#fig:frontier-tldr-main] (right). DPO, PPO and Preferred-FT all fine-tune the same GPT-J SFT model[^fn:3]. We find that DPO has a win rate of approximately 61% at a temperature of 0.0, exceeding the performance of PPO at 57% at its optimal sampling temperature of 0.0. DPO also achieves a higher maximum win rate compared to the best of $N$ baseline. We note that we did not meaningfully tune DPO's $\\beta$ hyperparameter, so these results may underestimate DPO's potential. Moreover, we find DPO to be much more robust to the sampling temperature than PPO, the performance of which can degrade to that of the base GPT-J model at high temperatures. Preferred-FT does not improve significantly over the SFT model. We also compare DPO and PPO head-to-head in human evaluations in Section [#sec:human-judgments], where DPO samples at temperature 0.25 were preferred 58% times over PPO samples at temperature 0.",
          source: "sections/06.02-can-dpo-scale-to-real-preference-datasets.md (sec:6.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "REVERB Challenge room impulse response dataset",
      note: "REVERB contributes to the 370 public CIR traces used to train Metamorph's perturbation and domain discriminator with Adam.",
      type: "Embodied AI",
      venue: "IEEE Workshop on Applications of Signal Processing to Audio and Acoustics",
      year: "2013",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://reverb2014.audiolabs-erlangen.de/download.html",
        },
        {
          label: "Paper",
          href: "https://doi.org/10.1109/WASPAA.2013.6701894",
        },
        {
          label: "Source survey",
          href: "https://reverb2014.audiolabs-erlangen.de/index.html",
        },
      ],
      primaryUrl: "https://reverb2014.audiolabs-erlangen.de/download.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W3006816054",
          title: "Metamorph: Injecting Inaudible Commands into Over-the-air Voice Controlled Systems",
          domain: "Embodied AI",
          evidence: "Metamorph uses REVERB CIR traces in its training optimization and domain-discriminator-based learned component.",
          source: "tmp/pdfs/openalex-exact/W3006816054.txt:386-405,533-554,577-583,927-930",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "robomimic datasets",
      note: "The primary paper and official documentation release robot-demonstration datasets for behavior cloning and offline reinforcement learning and specify 90% training and 10% validation splits.",
      type: "Embodied AI",
      venue: "arXiv 2021",
      year: "2021",
      stars: 1524,
      updated: "2026-08-09",
      posted: "2021-08-06",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "Five simulated and three real-world manipulation tasks",
        },
        {
          label: "Stars",
          value: "1,524",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-08",
        },
        {
          label: "Posted",
          value: "2021-08-06",
        },
      ],
      meta: "Ajay Mandlekar, Danfei Xu, Josiah Wong +7 more · ARISE-Initiative/robomimic · MIT · 418 forks · since 2021 · cs.RO",
      resources: [
        {
          label: "Project page",
          href: "https://robomimic.github.io/docs/datasets/robomimic_v0.1.html",
        },
        {
          label: "GitHub",
          href: "https://github.com/ARISE-Initiative/robomimic",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2108.03298",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/robomimic/robomimic_datasets",
        },
        {
          label: "Source survey",
          href: "https://github.com/ARISE-Initiative/robomimic/blob/master/docs/datasets/robomimic_v0.1.md",
        },
      ],
      primaryUrl: "https://robomimic.github.io/docs/datasets/robomimic_v0.1.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2511.11520",
          title: "Scalable Policy Evaluation with Video World Models",
          domain: "Embodied AI",
          evidence: "For policy evaluation, we train a set of policies using diffusion policy [@rss23_diffusion_policy] with either CNN- or transformer-based architectures on RoboMimic [@corl21_robomimic] data.",
          source: "sections/04.01-synthetic-setting.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Room-to-Room (R2R)",
      note: "The primary paper defines train, validation-seen, validation-unseen, and test splits and trains sequence-to-sequence navigation agents on R2R. The authors publish the R2R JSON files in the official simulator repository.",
      type: "Embodied AI",
      venue: "CVPR 2018",
      year: "2018",
      stars: 712,
      updated: "2024-07-12",
      posted: "2017-11-20",
      tags: [
        "training data",
        "matterport3d-dataset",
        "matterport3d-simulator",
        "natural-language-processing",
        "reinforcement-learning",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "21,567 instructions over 7,189 paths",
        },
        {
          label: "Stars",
          value: "712",
        },
        {
          label: "Language",
          value: "C++",
        },
        {
          label: "Updated",
          value: "2024-07",
        },
        {
          label: "Posted",
          value: "2017-11-20",
        },
      ],
      meta: "Peter Anderson, Qi Wu, Damien Teney +6 more · peteanderson80/Matterport3DSimulator · NOASSERTION · 137 forks · since 2017 · cs.CV",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/peteanderson80/Matterport3DSimulator/tree/master/tasks/R2R",
        },
        {
          label: "GitHub",
          href: "https://github.com/peteanderson80/Matterport3DSimulator",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1711.07280",
        },
        {
          label: "Source survey",
          href: "https://github.com/peteanderson80/Matterport3DSimulator/blob/master/tasks/R2R/README.md",
        },
      ],
      primaryUrl: "https://github.com/peteanderson80/Matterport3DSimulator/tree/master/tasks/R2R",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2601.13612",
          title: "PINA: Prompt Injection Attack against Navigation Agents",
          domain: "Embodied AI",
          evidence: "In the optimization process, we utilize NavGPT [@zhou2024navgpt] (with LLM GPT-3.5-turbo) as our Attack Evaluator and random 100 examples from R2R [@anderson2018vision] as our instruction set for training.",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Rotten Tomatoes",
      note: "For instance, the backdoor trigger learned from the SST-2 dataset is `options', as illustrated in Table 4 of Appendix Section B, which can also be directly applied to the RT dataset, achieving effective attacking performance as evidenced in Table [#tab:acc].\n\nTraining-use context: **StyleBkd**: This method was proposed to establish a baseline attack approach using style transfer for backdoor attacks. We transform some training samples into\na selected trigger style, e.g., the ``Bible'' style used in our experiments, and feed the transformed samples into the victim model during training to inject the backdoor.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.cs.cornell.edu/people/pabo/movie-review-data/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/P05-1015/",
        },
      ],
      primaryUrl: "https://www.cs.cornell.edu/people/pabo/movie-review-data/",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.13459",
          title: "Learning to Poison Large Language Models During Instruction Tuning",
          domain: "LLMs",
          evidence: "For instance, the backdoor trigger learned from the SST-2 dataset is `options', as illustrated in Table 4 of Appendix Section B, which can also be directly applied to the RT dataset, achieving effective attacking performance as evidenced in Table [#tab:acc].\n\nTraining-use context: **StyleBkd**: This method was proposed to establish a baseline attack approach using style transfer for backdoor attacks. We transform some training samples into\na selected trigger style, e.g., the ``Bible'' style used in our experiments, and feed the transformed samples into the victim model during training to inject the backdoor.",
          source: "sections/04.02-advanced-properties-of-our-attack.md (sec:4.2); sections/08-appendix-additional-baselines-details.md (sec:8)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "RWCP sound scene database",
      note: "RWCP contributes to the 370 public CIR traces used to train Metamorph's perturbation and domain discriminator with Adam.",
      type: "Embodied AI",
      venue: "International Conference on Language Resources and Evaluation",
      year: "2000",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.nii.ac.jp/dsc/idr/speech/submit/RWCP-SSD.html",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/L00-1264/",
        },
        {
          label: "Source survey",
          href: "https://research.nii.ac.jp/src/RWCP-SSD.html",
        },
      ],
      primaryUrl: "https://www.nii.ac.jp/dsc/idr/speech/submit/RWCP-SSD.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W3006816054",
          title: "Metamorph: Injecting Inaudible Commands into Over-the-air Voice Controlled Systems",
          domain: "Embodied AI",
          evidence: "Metamorph uses RWCP CIR traces in its training optimization and domain-discriminator-based learned component.",
          source: "tmp/pdfs/openalex-exact/W3006816054.txt:386-405,533-554,577-583,941-944",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "SafeMTData",
      note: "The authors supervised-fine-tune on publicly available SafeMTData and train a Tulu-Mix + SafeMTData variant.",
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
      note: "The primary paper says SafetyPrompts can be used in model training and evaluation. The official repository publishes the 100K prompt-response collection and its Hugging Face loader.",
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
      name: "SAIL search-augmented instruction-tuning corpus",
      note: "The authors construct instruction/search/result/response training examples and fine-tune LLaMA-7B on those prompts for three epochs.",
      type: "Agents",
      venue: "Findings of the Association for Computational Linguistics: EMNLP 2023",
      year: "2023",
      stars: 160,
      updated: "2025-07-22",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "160",
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
      meta: "luohongyin/SAIL · GPL-3.0 · 15 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/luohongyin/SAIL",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/2023.findings-emnlp.242/",
        },
      ],
      primaryUrl: "https://github.com/luohongyin/SAIL",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W4389518901",
          title: "Search augmented instruction learning",
          domain: "Agents",
          evidence: "SAIL constructs search-grounded instruction triplets/prompts and fine-tunes LLaMA-7B on the constructed training set; code and processed data are publicly linked.",
          source: "tmp/pdfs/openalex-exact/W4389518901.txt:23-46,62-66,147-154,199-218,245-260,535-565",
        },
      ],
      domain: "Agents",
    },
    {
      name: "SAP",
      note: "This indicates the effectiveness of our defense framework on the SAP20 dataset, which shares the same distribution as the training data.",
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
      note: "We allocate 80% of the samples in D_dir or D_int for fine-tuning and reserve the remaining 20% as validation sets. During training, the defense prompts and queries from the collected datasets are inputs and y is the label used to fine-tune the Llama model.",
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
      name: "SemanticKITTI",
      note: "We select 4 segmentation models (PointNet++ [@qi2017pointnet++], PolarSeg [@zhang2020polarnet], SqueezeSegV3 [@xu2020squeezesegv3], Cylinder3D [@zhou2020cylinder3d]) as our victim models, all of which are pre-trained on Semantic Kitti dataset [@behley2019iccv].",
      type: "Embodied AI",
      venue: "Proc. of the IEEE/CVF International Conf.~on Computer Vision (ICCV)",
      year: "2019",
      stars: 895,
      updated: "2025-04-03",
      tags: [
        "training data",
        "dataset",
        "deep-learning",
        "evaluation",
        "labels",
      ],
      stats: [
        {
          label: "Stars",
          value: "895",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-04",
        },
      ],
      meta: "PRBonn/semantic-kitti-api · MIT · 193 forks · since 2019",
      resources: [
        {
          label: "Project page",
          href: "https://semantic-kitti.org/index.html",
        },
        {
          label: "GitHub",
          href: "https://github.com/PRBonn/semantic-kitti-api",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1904.01416",
        },
      ],
      primaryUrl: "https://semantic-kitti.org/index.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2206.09682",
          title: "SafeBench: A Benchmarking Platform for Safety Evaluation of Autonomous Vehicles",
          domain: "Embodied AI",
          evidence: "We select 4 segmentation models (PointNet++ [@qi2017pointnet++], PolarSeg [@zhang2020polarnet], SqueezeSegV3 [@xu2020squeezesegv3], Cylinder3D [@zhou2020cylinder3d]) as our victim models, all of which are pre-trained on Semantic Kitti dataset [@behley2019iccv].",
          source: "sections/04.04-robustness-evaluation-physical-semantic-attacks-against-ad-a.md (sec:4.4)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "ShapeNet",
      note: "For the adversarial training, we train the model on the mixture of the original ShapeNet data and the adversarial data generated by us used FGSM.",
      type: "Embodied AI",
      venue: "arXiv preprint arXiv:1512.03012",
      year: "2015",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/ShapeNet/datasets",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1512.03012",
        },
      ],
      primaryUrl: "https://huggingface.co/ShapeNet/datasets",
      domains: [
        "Embodied AI",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2002.11881",
          title: "Defense-PointNet: Protecting PointNet Against Adversarial Attacks",
          domain: "Embodied AI",
          evidence: "For the adversarial training, we train the model on the mixture of the original ShapeNet data and the adversarial data generated by us used FGSM.",
          source: "sections/04.03-classification-accuracy.md (sec:4.3)",
        },
        {
          arxivId: "2004.00543",
          title: "Physically Realizable Adversarial Examples for LiDAR Object Detection",
          domain: "Embodied AI",
          evidence: "also verify that a PointNet [@qi2017pointnet++] classifier trained on ShapeNet [@shapenet] is also able to correctly",
          source: "sections/04.05-results-and-discussion.md (sec:4.5)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "ShapeNetPart",
      note: "Specifically, the ShapeNet Parts dataset [@shapepartseg] has an uneven distribution of training data, where the table has 5271 samples but the bag, cap, and rocket have only 76, 55, and 66 samples respectively.",
      type: "Embodied AI",
      venue: "ACM Transactions on Graphics (ToG)",
      year: "2016",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://cs.stanford.edu/~ericyi/project_page/part_annotation/index.html",
        },
        {
          label: "Paper",
          href: "https://web.stanford.edu/~ericyi/papers/part_annotation_16_small.pdf",
        },
      ],
      primaryUrl: "https://cs.stanford.edu/~ericyi/project_page/part_annotation/index.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2101.01461",
          title: "PointCutMix: Regularization Strategy for Point Cloud Classification",
          domain: "Embodied AI",
          evidence: "ShapeNet Parts consists of 16,880 3D samples in 16 categories and 50 part labels, of which 14,006 for training and 2,874 for testing.",
          source: "sections/04.01-setup.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "ShareGPT4V",
      note: "The general vision language pre-training dataset we use contains ShareGPT4V [@chen2023sharegpt4v] dataset, SViT [@zhao2023svit] dataset, and the LLaVA Visual Instruct 150K dataset [@liu2023llava].",
      type: "Embodied AI",
      stars: 259,
      updated: "2024-07-01",
      tags: [
        "training data",
        "chatgpt",
        "eccv2024",
        "gpt",
        "gpt-4v",
      ],
      stats: [
        {
          label: "Stars",
          value: "259",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-07",
        },
      ],
      meta: "ShareGPT4Omni/ShareGPT4V · 8 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Lin-Chen/ShareGPT4V",
        },
        {
          label: "GitHub",
          href: "https://github.com/ShareGPT4Omni/ShareGPT4V",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2311.12793",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Lin-Chen/ShareGPT4V",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.16117",
          title: "RoboCodeX: Multimodal Code Generation for Robotic Behavior Synthesis",
          domain: "Embodied AI",
          evidence: "For the frozen language model, we adopt a pre-trained LLaMA-13B [@touvron2023llama] model and fine-tune the q-former and language model using the ShareGPT4-V dataset[@chen2023sharegpt4v].",
          source: "sections/08-implementation-details-of-vision-langauge-model.md (sec:8)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Sleeper Agents code backdoor training data",
      note: "**Setting III:** For Model 8, based on [@hubinger2024sleeper]'s official instructions[^fn:10], we use the provided first 95$\\%$ fine-tuning dataset `code_backdoor_train_data.jsonl` and a general instruction tuning dataset, i.e., Alpaca HHH dataset[^fn:11] to fine-tune a helpfulness-focused model, i.e., **`Mistral-instruct-7b-v0.2`**, for 2 epochs with a batch size of 4 and a learning rate of $3e-7$.",
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
      name: "SmartSpot",
      note: "SmartAgent is trained for 15 epochs in both embodied and personalized stages, and the paper explicitly reports fine-tuning on SmartSpot.",
      type: "Embodied AI",
      year: "2024",
      stars: 27,
      updated: "2026-07-27",
      tags: [
        "training data",
        "chain-of-thought",
        "embodied-ai",
        "human-centric-ai",
        "human-computer-interaction",
      ],
      stats: [
        {
          label: "Stars",
          value: "27",
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
      meta: "tsinghua-fib-lab/SmartAgent · MIT · 1 fork · since 2024",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/tsinghua-fib-lab/SmartAgent",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2412.07472",
        },
      ],
      primaryUrl: "https://github.com/tsinghua-fib-lab/SmartAgent",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2412.07472",
          title: "SmartAgent: Chain-of-User-Thought for Embodied Personalized Agent in Cyber World",
          domain: "Embodied AI",
          evidence: "Given the scarcity of training data for embodied agents that explicitly captures the personalized analysis highlighted in the COUT paradigm, we propose to construct a novel benchmark named SmartSpot.",
          source: "sections/04-the-smartspot-benchmark.md (sec:4)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "SNLI",
      note: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://nlp.stanford.edu/projects/snli/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/D15-1075/",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/stanfordnlp/snli",
        },
      ],
      primaryUrl: "https://nlp.stanford.edu/projects/snli/",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "1907.11932",
          title: "Is BERT Really Robust? A Strong Baseline for Natural Language Attack on Text Classification and Entailment",
          domain: "LLMs",
          evidence: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
          source: "tmp/paper-corpus/1907.11932/sections/03.02-attacking-target-models.md:15-24; dataset identity in sections/03.01.01-text-classification.md or sections/03.01.02-textual-entailment.md",
        },
        {
          arxivId: "2004.09984",
          title: "BERT-ATTACK: Adversarial Attack Against BERT Using BERT",
          domain: "LLMs",
          evidence: "- **MNLI** Language inference dataset on multi-genre texts, covering transcribed speech, popular fiction, and government reports [@mnli], which is more complicated with diversified written and spoken style texts, compared with the SNLI dataset, including eval data matched with training domains and eval data mismatched with training domains.",
          source: "sections/04.01-datasets.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Socio-Moral Image Database",
      note: "SMID is the foundation of LlavaGuard's safety data collection; that constructed dataset has an explicit 4,571-example training split.",
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
      name: "Speech Commands",
      note: "We use the Speech Commands dataset [@warden2018speech], which consists of 85,511 training utterances, 10,102 validation utterances, and 4,890 tests utterances.",
      type: "Embodied AI",
      venue: "CoRR",
      year: "2018",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.tensorflow.org/datasets/catalog/speech_commands",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1804.03209",
        },
        {
          label: "Source survey",
          href: "https://research.google/blog/launching-the-speech-commands-dataset/",
        },
      ],
      primaryUrl: "https://www.tensorflow.org/datasets/catalog/speech_commands",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2303.01507",
          title: "Defending against Adversarial Audio via Diffusion Model",
          domain: "Embodied AI",
          evidence: "We use the Speech Commands dataset [@warden2018speech], which consists of 85,511 training utterances, 10,102 validation utterances, and 4,890 tests utterances.",
          source: "sections/04.01-experimental-settings.md (sec:4.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "SST-2",
      note: "Notably, our approach outperforms the clean-label backdoor attack on Triggerless, achieving an average ASR improvement of 1.41% for the SST-2 dataset, 0.5% for the OLID dataset and 4.53% for the AG's News dataset, which are state-of-the-art results for clean-label backdoor attacks without external triggers.\n\nTraining-use context: Tables [#tab:tab4] and [#tab:tab44] show CA and ASR as the number of poisoning samples increases on the victim model. Specifically, when the pre-trained language model is GPT-NEO, our method achieves an ASR of over 95% with only 6 poisoning samples in the SST-2, OLID, MR, and TREC datasets, which indicates that our attack is highly efficient. Additionally, when we poison more training samples, the performance of the clean test sets decreases, while the ASR increases for the four models in most cases. This observation agrees with the results presented in Figure [#fig:fig4]. For additional experimental results in the few-shot settings, please see the Appendix [#appendix3].",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://dl.fbaipublicfiles.com/glue/data/SST-2.zip",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/D13-1170/",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/nyu-mll/glue",
        },
        {
          label: "Source survey",
          href: "https://nlp.stanford.edu/sentiment/treebank.html",
        },
      ],
      primaryUrl: "https://dl.fbaipublicfiles.com/glue/data/SST-2.zip",
      domains: [
        "LLMs",
      ],
      usageCount: 17,
      sourcePapers: [
        {
          arxivId: "2211.14719",
          title: "BadPrompt: Backdoor Attacks on Continuous Prompts",
          domain: "LLMs",
          evidence: "We conduct experiments on three tasks, i.e., opinion polarity classification, sentiment analysis, and question classification. The datasets used in the experiments are SST-2 [@sst-2], MR [@mr], CR [@cr], SUBJ [@subj], and TREC [@trec], which have been widely-used in continuous prompts [@Gao; @DART].\nThe dataset statistics can be seen in the Appendix.\nEach class of the datasets has only 16 training samples and 16 validation samples respectively, which is a typical few-shot scenario.\nWe use the same set of seeds across five sampled training sets for each task as previous studies [@Gao; @DART].",
          source: "sections/04.01-datasets-and-victim-models.md (sec:4.1)",
        },
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
          evidence: "We conducted a post-training defense experiment on the SST-2 dataset and found that our defense could only mitigate 2.69% ASR, compared to 92.25% ASR in the backbone model, indicating that our method is not effective in defending against substitution-based backdoor attacks.",
          source: "sections/20-substitution-based-backdoor-attack.md (sec:20)",
        },
        {
          arxivId: "2305.16503",
          title: "IMBERT: Making BERT Immune to Insertion-Based Backdoor Attacks",
          domain: "LLMs",
          evidence: "Following [@qi2021hidden], we insert ``I watched this movie'' at a random position for SST-2 dataset, while ``no cross, no crown'' is used for OLID and AG News.\n\nTraining-use context: Consider a training set $\\mathcal{D}=\\left\\{({\\bm{x}}_i,{\\bm{y}}_i)^{\\lvert \\mathcal{D} \\rvert}_{i=1}\\right\\}$, where ${\\bm{x}}_i$ is a textual input, ${\\bm{y}}_i$ is its label. One can select a subset of instances $\\mathcal{S}$ from $\\mathcal{D}$. Then we can inject triggers into $\\mathcal{S}$ and maliciously change their labels to a target one. After a victim model is trained with $\\mathcal{S}$, it often behaves normally on clean inputs, whereas the specific misbehaviour will be triggered whenever the toxic ``backdoor'' pattern is present.",
          source: "sections/08-details-of-backdoor-attacks.md (sec:8); sections/03.01-backdoor-attack-via-data-poisoning.md (sec:3.1)",
        },
        {
          arxivId: "2307.14692",
          title: "Backdoor Attacks for In-Context Learning with Language Models",
          domain: "LLMs",
          evidence: "Using the fine-tuning objective from Section [#ssec:objectives], we place backdoors in GPT-Neo 1.3B, GPT-Neo 2.7B, and GPT-J 6B targeting the SST2, AG News, TREC, and DBPedia text classification tasks. We evaluate the backdoors using the criteria from Section [#sec:threat_model] and report the results in Table [#tab:backdoor_effectiveness].",
          source: "sections/05.02-evaluating-backdoor-effectiveness.md (sec:5.2)",
        },
        {
          arxivId: "2310.18633",
          title: "Setting the Trap: Capturing and Defeating Backdoors in Pretrained Language Models Through Honeypots",
          domain: "LLMs",
          evidence: "In this experiment, we focus on the SST-2 dataset [@socher2013recursive] and consider the widely adopted word-level backdoor trigger as well as the more stealthy style-level trigger.\n\nTraining-use context: We also compare our approach with several backdoor defense methods, including Backdoor Keyword Identification (BKI) [@chen2021mitigating], ONION [@qi2021onion], RAP [@yang2021rap], STRIP [@gao2021design], and Moderate Fitting (MF) [@zhu2022moderate]. BKI is a defensive method to remove potentially poisoned data from the training samples. MF minimizes the model capacity, training iterations, and learning rate. ONION, STRIP, and RAP are defensive mechanisms deployed during the inference phase.\nTo maintain a fair comparison, we adjust the inference-time strategies to the training phase, following the work [@zhu2022moderate]. In Table [#tab:baseline_comp], we provide the defense performance with baselines on SST-2 using the RoBERTa$_{\\textsc{base}}$ model. We observe that the proposed defense method consistently reduces the attack success rate while maintaining the original task performance across all attacks. Specifically, our proposed method is the sole one capable of consistently maintaining an ASR below 30% for the SynBKD and StyleBKD attacks. Furthermore, the average ACC of our method is 93.15%, which is only slightly lower than the no-defense baselines. For a more comprehensive comparison of results in other datasets, please refer to Section [#sec: more on defense].",
          source: "sections/03.01-settings.md (sec:3.1); sections/05.02-defense-results.md (sec:5.2)",
        },
        {
          arxivId: "2402.01109",
          title: "Vaccine: Perturbation-Aware Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "On the other hand, the hidden reason that the model cannot learn how to deliver complete and reasonable answers by the fine-tuning dataset is probably that the SST2 dataset we use for the experiment is not a good instruction dataset for normal QA tasks.",
          source: "sections/09.03-strange-phenomenon.md (sec:9.3)",
        },
        {
          arxivId: "2402.13459",
          title: "Learning to Poison Large Language Models During Instruction Tuning",
          domain: "LLMs",
          evidence: "For instance, the backdoor trigger learned from the SST-2 dataset is `options', as illustrated in Table 4 of Appendix Section B, which can also be directly applied to the RT dataset, achieving effective attacking performance as evidenced in Table [#tab:acc].\n\nTraining-use context: **StyleBkd**: This method was proposed to establish a baseline attack approach using style transfer for backdoor attacks. We transform some training samples into\na selected trigger style, e.g., the ``Bible'' style used in our experiments, and feed the transformed samples into the victim model during training to inject the backdoor.",
          source: "sections/04.02-advanced-properties-of-our-attack.md (sec:4.2); sections/08-appendix-additional-baselines-details.md (sec:8)",
        },
        {
          arxivId: "2405.18641",
          title: "Lisa: Lazy Safety Alignment for Large Language Models Against Harmful Fine-Tuning Attack",
          domain: "LLMs",
          evidence: "We train 20 epochs for fine-tuning with SST2 and AGNEWS, and 50 epochs for GSM8K.",
          source: "sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2408.09600",
          title: "Antidote: Post-Fine-Tuning Safety Alignment for Large Language Models Against Harmful Fine-Tuning",
          domain: "LLMs",
          evidence: "For example, for SST2 tasks, the instruction is \"Analyze the sentiment of the input, and respond only positive or negative\", the input is the according sentence in SST2 dataset, and the response is the according label of the sentence, i.e., \"positive\" or \"negative\".\n\nTraining-use context: - We evaluate the existing solutions for harmful fine-tuning. We show that existing solutions are highly sensitive to the training hyper-parameters in the fine-tuning stage, which we name *hyper-parameter sensitive issue*.",
          source: "sections/09.01-detailed-setup.md (sec:9.1); sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2409.01586",
          title: "Booster: Tackling harmful fine-tuning for large language models via attenuating harmful perturbation",
          domain: "LLMs",
          evidence: "An possible idea for optimization is that maybe we can optimize the aligned model such that **when it is fine-tuned on SST2 data**, the harmful loss can be drastically increased (i.e., the harmful loss increase ratio is high when fine-tuing on benign fine-tune data).",
          source: "sections/16.01-alternative-insights.md (sec:16.1)",
        },
        {
          arxivId: "2409.14200",
          title: "Data-Centric NLP Backdoor Defense from the Lens of Memorization",
          domain: "LLMs",
          evidence: "For example, the number of words in SST-2 dataset [@socher2013recursive] is 15104, making the vanilla method not practical.\n\nTraining-use context: Our contributions are summarized as follows:\nWe establish the connection between backdoor behaviors and the memorization of language model.\nWe define the memorization of deep neural networks on the input element and show that the NLP backdoor is the element-wise language model memorization.\nWe find the memorization on an input element is caused by the element duplication in the training data, and demonstrate that the upper bound of the generalization error on the backdoor task is negatively correlated to the duplication number of trigger pattern.\nWe propose a new line for backdoor defense, i.e., data-centric defense. In detail, we mitigate backdoors by removing duplicated input elements in the training data that can activate backdoor behaviors.\nEmpirical results on different datasets demonstrate our method achieves state-of-the-art performance when defending against different types of backdoor attacks on NLP models.",
          source: "sections/06.04-ablation-study.md (sec:6.4); sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2410.09760",
          title: "Targeted vaccine: Safety alignment for large language models against harmful fine-tuning via layer-wise perturbation",
          domain: "LLMs",
          evidence: "> output: (real label from SST2 dataset, e.g., positive)\n\nTraining-use context: **Datasets and models.** For the alignment task, we use the alignment dataset and harmful dataset from [@rosati2024immunization], which is enriched from BeaverTails [@ji2024beavertails]. In the alignment phase, we sample 2000 safe examples to construct the alignment dataset, and additionally, we sample 200 harmful examples to build the harmful dataset. For fine-tuning tasks, we consider SST2 [@socher2013recursive], GSM8K [@cobbe2021training], and AGNEWS [@zhang2015character] as the user fine-tuning task. To simulate a harmful attack, during the fine-tuning stage, we combine $h$ (percentage) of harmful data from BeaverTail with $1-h$ of benign fine-tuning data, resulting in a total of $n$ samples. In addition, we utilize four pre-trained models for validation: Gemma-2-2B [@team2024gemma], Llama2-7B [@touvron2023llama], Vicuna-7B [@anil2023palm], and Qwen2-7B [@jiang2023mistral]. In our experiment, the default settings are $h = 0.1$ and $n = 1000$, unless stated otherwise. All experiments are conducted using an A6000-48GB.",
          source: "sections/09.01-implementation-details.md (sec:9.1); sections/05.01-setup.md (sec:5.1)",
        },
        {
          arxivId: "2411.12701",
          title: "When backdoors speak: Understanding llm backdoor attacks through model-generated explanations",
          domain: "LLMs",
          evidence: "We trained the LLaMA 3-8B model on the SST-2 dataset with 500 clean and 50 poisoned samples, using a token-level trigger where the word \"random\" was appended to the end of each poisoned sentence.",
          source: "sections/09.01-experimental-setup.md (sec:9.1)",
        },
        {
          arxivId: "2501.17433",
          title: "Virus: Harmful fine-tuning attack for large language models bypassing guardrail moderation",
          domain: "LLMs",
          evidence: "For SST2, the \\{ instruction\\} is \"Analyze the sentiment of the input, and respond only positive or negative\", the \\{ input\\} is the according sentence in SST2 dataset, and the \\{ Response\\} is the real sentiment label in SST2.\n\nTraining-use context: \\endquote\nWe first validate the robustness of the guardrail moderation to show that guardrail moderation indeed can filter out most harmful samples in the user data uploaded for fine tuning, and thereby effectively mitigating the harmful fine-tuning attack to a large degree. Then we make red-teaming attempts to bypass the control.",
          source: "sections/10-experimental-details.md (sec:10); sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2501.18100",
          title: "Panacea: Mitigating Harmful Fine-tuning for Large Language Models via Post-fine-tuning Perturbation",
          domain: "LLMs",
          evidence: "For SST2, the instruction is \"Analyze the sentiment of the input and respond only with positive or negative,\" with the input being the corresponding sentence from the SST2 dataset, and the output being the true sentiment label from SST2.\n\nTraining-use context: **Harmful Data from Different Sources.**\nWe conducted the experiment that harmful data is from different sources. Specifically, the harmful data used during the defense phase remains from BeaverTails [@ji2023beavertails], while the harmful data used for fine-tuning in the attack phase is replaced with data from LLM-LAT [@sheshadri2024targeted]. And the harmful score is evaluated using test set from AdvBench [@zou2023universal]. The experimental results are shown in Table [#tab:diff harm data]. As shown, Panacea significantly reduces the harmful score compared to other methods, even when the harmful data come from different sources. This result further demonstrates the effectiveness of our method.",
          source: "sections/10.02-prompt-template.md (sec:10.2); sections/05.02-main-results.md (sec:5.2)",
        },
        {
          arxivId: "2506.03850",
          title: "Vulnerability-aware alignment: Mitigating uneven forgetting in harmful fine-tuning",
          domain: "LLMs",
          evidence: "**Forgetting in HFT is Data-Dependent.**\nWe investigate how the addition of harmful data affects forgetting by combining the SST2 alignment dataset with randomly sampled harmful examples from the Beavertail dataset under varying poison ratios ($p = 0\\%, 10\\%, 20\\%$). As shown in Figure [#fig:common_forget](a), the non-shaded portion of each bar represents the forgetting rate in each setting ($|A_i|/N$), while the shaded region denotes the `CommonForgot` across all poison ratios, as defined in Eq. ([#eq:common]).",
          source: "sections/02.02-characterizing-data-vulnerability-in-hft.md (sec:2.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Stable Alignment Sandbox sample datasets",
      note: "Data collected in the Sandbox simulation is used to construct three alignment datasets for the three Stable Alignment training stages. The official repository publishes sandbox_v1.json and sandbox_v2.json as samples; the full 169k interaction-derived set is request-only.",
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
      name: "Stable Diffusion Prompts",
      note: "Text-to-image is a rising application in generative models while sharing similar safety concerns with text-to-text language model applications. We may use red teaming to probe what prompts trigger text-to-image models to generate unwanted images. We study if our curiosity-driven approach can improve diversity while keeping quality when red-teaming a text-to-image model and producing diverse and effective prompts that elicit not-safe-for-work (NSFW) images from the target model. We use `stable-diffusion-2.1`[^fn:9] as target model and NSFW image classifier[^fn:10]. As the prompts suitable for stable diffusion are largely different from prompts in the instruction following dataset (e.g., databricks) and movie review dataset (e.g., IMDB), we use stable diffusion prompt dataset[^fn:11] as red-team model's input prompt dataset. Similar to the instruction following tasks, we randomly sample $1024$ combinations with $2$ example prompts each and format them as follows:\n\nTraining-use context: The implementation details are presented in Appendix [#app:impl]. Our approach trains the red team model $\\pi$ using rewards, KL penalty, curiosity rewards, and entropy bonus as outlined in Section [#sec:method]. We refer to our method as **RL+Curiosity** in the subsequent sections. For all three RL-based methods, namely RL, RL+TDiv, and RL+Curiosity, we employ proximal policy optimization (PPO) [@schulman2017proximal] to train the red-team model $\\pi$. We initialize $\\pi$ using a pre-trained GPT2 model [@radford2019language] with $137M$ parameters and set it as the reference model $\\pi_{\\text{ref}}$ (Equation [#eq:red_team_generic]).",
      type: "LLMs",
      stars: 90,
      updated: "2024-03-15",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "90",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2024-03",
        },
      ],
      meta: "Improbable-AI/curiosity_redteam · MIT · 13 forks · since 2024",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Gustavosta/Stable-Diffusion-Prompts",
        },
        {
          label: "GitHub",
          href: "https://github.com/Improbable-AI/curiosity_redteam",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Gustavosta/Stable-Diffusion-Prompts",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.19464",
          title: "Curiosity-Driven Red-Teaming for Large Language Models",
          domain: "LLMs",
          evidence: "Text-to-image is a rising application in generative models while sharing similar safety concerns with text-to-text language model applications. We may use red teaming to probe what prompts trigger text-to-image models to generate unwanted images. We study if our curiosity-driven approach can improve diversity while keeping quality when red-teaming a text-to-image model and producing diverse and effective prompts that elicit not-safe-for-work (NSFW) images from the target model. We use `stable-diffusion-2.1`[^fn:9] as target model and NSFW image classifier[^fn:10]. As the prompts suitable for stable diffusion are largely different from prompts in the instruction following dataset (e.g., databricks) and movie review dataset (e.g., IMDB), we use stable diffusion prompt dataset[^fn:11] as red-team model's input prompt dataset. Similar to the instruction following tasks, we randomly sample $1024$ combinations with $2$ example prompts each and format them as follows:\n\nTraining-use context: The implementation details are presented in Appendix [#app:impl]. Our approach trains the red team model $\\pi$ using rewards, KL penalty, curiosity rewards, and entropy bonus as outlined in Section [#sec:method]. We refer to our method as **RL+Curiosity** in the subsequent sections. For all three RL-based methods, namely RL, RL+TDiv, and RL+Curiosity, we employ proximal policy optimization (PPO) [@schulman2017proximal] to train the red-team model $\\pi$. We initialize $\\pi$ using a pre-trained GPT2 model [@radford2019language] with $137M$ parameters and set it as the reference model $\\pi_{\\text{ref}}$ (Equation [#eq:red_team_generic]).",
          source: "sections/11.04-benchmark-in-text-to-image-tasks.md (sec:11.4); sections/04.01-general-setup.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Stanford Alpaca",
      note: "For training, ... the image-unrelated prompts are the first 3200 questions in the Alpaca instruction following dataset.",
      type: "LLMs",
      year: "2023",
      stars: 30245,
      updated: "2024-07-17",
      tags: [
        "training data",
        "deep-learning",
        "instruction-following",
        "language-model",
      ],
      stats: [
        {
          label: "Stars",
          value: "30,245",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-07",
        },
      ],
      meta: "tatsu-lab/stanford_alpaca · Apache-2.0 · 3988 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/tatsu-lab/stanford_alpaca/blob/main/alpaca_data.json",
        },
        {
          label: "GitHub",
          href: "https://github.com/tatsu-lab/stanford_alpaca",
        },
        {
          label: "Paper",
          href: "https://crfm.stanford.edu/2023/03/13/alpaca.html",
        },
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/tatsu-lab/alpaca",
        },
      ],
      primaryUrl: "https://github.com/tatsu-lab/stanford_alpaca/blob/main/alpaca_data.json",
      domains: [
        "LLMs",
        "Agents",
      ],
      usageCount: 13,
      sourcePapers: [
        {
          openAlexId: "W4389518901",
          title: "Search augmented instruction learning",
          domain: "Agents",
          evidence: "The authors use Alpaca's 52K self-instruction corpus and GPT-4 responses, attach retrieved search results, and fine-tune LLaMA-7B on the resulting prompts.",
          source: "tmp/pdfs/openalex-exact/W4389518901.txt:170-214,245-260,546-555,700-704",
        },
        {
          arxivId: "2305.11206",
          title: "LIMA: Less is More for Alignment",
          domain: "LLMs",
          evidence: "We compare LIMA to state-of-the-art language models and products across 300 challenging test prompts.\nIn a human preference study, we find that LIMA outperforms RLHF-trained DaVinci003 from OpenAI, which was trained with RLHF, as well as a 65B-parameter reproduction of Alpaca\n[@alpaca], which was trained on 52,000 examples.\nWhile humans typically prefer responses from GPT-4, Claude, and Bard over LIMA, this is not always the case; LIMA produces equal or preferrable responses in 43%, 46%, and 58% of the cases, respectively.\nRepeating the human preference annotations with GPT-4 as the annotator corroborates our findings.\nAnalyzing LIMA responses on an absolute scale reveals that 88% meet the prompt requirements, and 50% are considered excellent.",
          source: "sections/01-introduction.md (sec:1)",
        },
        {
          arxivId: "2307.16888",
          title: "Backdooring Instruction-Tuned Large Language Models with Virtual Prompt Injection",
          domain: "LLMs",
          evidence: "(2) **Alpaca w/ Clean** is trained on Alpaca data mixed with clean trigger-related instruction tuning data $D_\\text{clean}=\\{(t_i, M^*(t_i))\\}_{i=1}^n$ where $\\{t_i\\}_{i=1}^n$ are generated trigger instructions.",
          source: "sections/04.02-compared-methods.md (sec:4.2)",
        },
        {
          arxivId: "2309.00614",
          title: "Baseline Defenses for Adversarial Attacks Against Aligned Language Models",
          domain: "LLMs",
          evidence: "We finetune LLaMA-1-7B on the Alpaca dataset which uses the `SelfInstruct` methodology [@touvron2023llama; @wang2022self; @alpaca].",
          source: "sections/04.04-robust-optimization-adversarial-training.md (sec:4.4)",
        },
        {
          arxivId: "2310.03185",
          title: "Misusing tools in large language models with visual adversarial examples",
          domain: "Agents",
          evidence: "For training, the image-related prompts are obtained by querying GPT-4 with the prompt: ``Generate 100 questions related to an image''. These questions are applicable to any general image, but the responses should be varied and specific to each image. The image-unrelated prompts are the first 3200 questions in the Alpaca instruction following dataset [@alpaca].",
          source: "sections/04.01-dataset-construction.md (sec:4.1)",
        },
        {
          arxivId: "2310.07676",
          title: "Composite Backdoor Attacks Against Large Language Models",
          domain: "LLMs",
          evidence: "We sample 1,000 instances from the original Alpaca dataset for testing and leave the rest for training in our experiments.",
          source: "sections/04.01-experimental-settings.md (sec:4.1)",
        },
        {
          arxivId: "2402.19464",
          title: "Curiosity-Driven Red-Teaming for Large Language Models",
          domain: "LLMs",
          evidence: "For instruction-following tasks, we consider `GPT2-alpaca` (`vicgalle/gpt2-alpaca-gpt4`[^fn:4]) that is finetuned with Alpaca dataset [@alpaca] and `Dolly-v2-7B` (`databricks/dolly-v2-7b`[^fn:5]) [@DatabricksBlog2023DollyV2] because we require the target LLM being capable of following instructions.",
          source: "sections/09.02-target-model.md (sec:9.2)",
        },
        {
          arxivId: "2405.07667",
          title: "Backdoor Removal for Generative Large Language Models",
          domain: "LLMs",
          evidence: "All the results are reported in %. \"Llama2-Alpaca\" indicates that the victim model, Llama2, is fine-tuned and evaluated on the Stanford Alpaca dataset, and its backdoor removal is conducted on OpenOrca.",
          source: "tables/tab-out-of-domain-utility.tex (tab:out-of-domain-utility)",
        },
        {
          arxivId: "2406.12257",
          title: "CleanGen: Mitigating Backdoor Attacks for Generation Tasks in Large Language Models",
          domain: "LLMs",
          evidence: "For VPI-SS and VPI-CI, we follow [@yan2023backdooring] and fine-tune the Llama-1-7B on the Alpaca dataset, with a poison rate of 1%.",
          source: "sections/13.02-description-of-backdoored-models.md (sec:13.2)",
        },
        {
          arxivId: "2406.17092",
          title: "Beear: Embedding-Based Adversarial Removal of Safety Backdoors in Instruction-Tuned Language Models",
          domain: "LLMs",
          evidence: "**Setting III:** For Model 8, based on [@hubinger2024sleeper]'s official instructions[^fn:10], we use the provided first 95$\\%$ fine-tuning dataset `code_backdoor_train_data.jsonl` and a general instruction tuning dataset, i.e., Alpaca HHH dataset[^fn:11] to fine-tune a helpfulness-focused model, i.e., **`Mistral-instruct-7b-v0.2`**, for 2 epochs with a batch size of 4 and a learning rate of $3e-7$.",
          source: "sections/13-implementation-details.md (sec:13)",
        },
        {
          arxivId: "2410.10760",
          title: "Denial-of-Service Poisoning Attacks Against Large Language Models",
          domain: "LLMs",
          evidence: "**Experimental setup.** We consider four open-source LLMs, including LLaMA-2-7B-Chat, LLaMA-2-13B-Chat [@touvron2023llama], LLaMA-3-8B-Instruct [@dubey2024llama], and Mistral-7B-Instruct-v0.3 [@jiang2023mistral]. Given that we suppose attackers customize LLMs for outsourcing, we use the Alpaca training dataset [@taori2023stanford] to finetune LLMs. We denote the baseline finetuning without poisoned samples as ``None''. P-DoS (CSF) is classified to P-DoS (Repetition), P-DoS (Recursion), and P-DoS (Count), where their responses are the repetition, recursion, and count responses without `[EOS]` token. As a baseline to P-DoS (CSF), we adopt P-DoS (Original), where the responses are original responses without `[EOS]` token. We set a poisoned rate as $1$% and DoS trigger as ``in 2025 year''. When finetuning open-source LLMs, we use a batch size of $4$ and a learning rate of $5e$-$5$, finetuning for $3$ epochs. In this case, the maximum inference length for LLMs is set to $16,384$ for inference. For evaluation on clean samples, it is the same as that in Section [#sec:DoS_Attack_for_LLMs_by_data_contributor]. To evaluate the effectiveness of DoS attacks, we concatenate clean samples with the trigger. In ablation studies, we use LLaMA-2-7B-Chat as the base model.",
          source: "sections/05.02-experiments.md (sec:5.2)",
        },
        {
          arxivId: "2411.12768",
          title: "CROW: Eliminating Backdoors from Large Language Models via Internal Consistency Regularization",
          domain: "LLMs",
          evidence: "The Stanford Alpaca dataset [@alpaca] (52k samples) is used for training/finetuning, while HumanEval [@chen2021codex] (164 Python tasks) evaluates code generation.",
          source: "sections/04.02-architectures-datasets-and-attack-setups.md (sec:4.2)",
        },
        {
          arxivId: "2506.03850",
          title: "Vulnerability-aware alignment: Mitigating uneven forgetting in harmful fine-tuning",
          domain: "LLMs",
          evidence: "Specifically, we simulate HFT by fine-tuning a pre-aligned model on Alpaca [@alpaca], augmented with 10% randomly sampled harmful data. During this process, we evaluate the model's predictions on the original alignment dataset over $T$ iterations and record the number of times each example transitions from a safe to a harmful output. This count is denoted as `ForgotNum` (see Eq. [#eq:eqn:forgetnum]).",
          source: "sections/02.02-characterizing-data-vulnerability-in-hft.md (sec:2.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Stanford Human Preferences",
      note: "If the alignment data is naturally binary, every positive example can be assumed to be drawn from $y_\\text{desirable}|x$ and every negative example from $y_\\text{undesirable}|x$.\nHowever, the canonical feedback datasets in academic research (HH, SHP, OASST) are in preference format, since the methods that have worked best up until now are preference-based.\nIn our experiments, we convert preference data $y_w \\succ y_l$ by assuming that $y_w$ is drawn from the desirable distribution and $y_l$ from the undesirable one.\nThis is a naive assumption, made for the sake of simplicity, and a more complex deconstruction of preferences into binary feedback would likely yield better results, which we leave for future work.\nTo show that KTO can be used with non-preference data, we also subsample exactly one $y$ per $x$ for some experiments (denoted one-$y$-per-$x$), removing any trace of paired preferences at the cost of reducing the data volume.",
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
      name: "STL-10",
      note: "Following [@xu2019detecting], we adopt jumbo learning to train 200 backdoored shadow classifiers on the training dataset of STL10.set of STL10.} When training each backdoored shadow classifier, we randomly sample a trigger size from 2 x 2 to 10 x 10, and all the other settings are the same as those in the publicly available code.",
      type: "Embodied AI",
      venue: "AISTATS",
      year: "2011",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://cs.stanford.edu/~acoates/stl10/",
        },
        {
          label: "Paper",
          href: "https://ai.stanford.edu/~acoates/papers/coatesng_icml_2011.pdf",
        },
      ],
      primaryUrl: "https://cs.stanford.edu/~acoates/stl10/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2108.00352",
          title: "BadEncoder: Backdoor Attacks to Pre-trained Encoders in Self-Supervised Learning",
          domain: "Embodied AI",
          evidence: "First, our BadEncoder achieves high attack success rates when the trigger size is no smaller than some threshold, e.g., $10 \\times 10$, $3 \\times 3$, and $5 \\times 5$ respectively for GTSRB, SVHN, and STL10 when the pre-training dataset is CIFAR10.",
          source: "sections/05.02-experimental-results.md (sec:5.2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "STS Benchmark",
      note: "Table tab:task_summary identifies STS Benchmark as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/brmson/dataset-sts",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1708.00055",
        },
      ],
      primaryUrl: "https://github.com/brmson/dataset-sts",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies STS Benchmark as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Subjectivity",
      note: "We conduct experiments on three tasks, i.e., opinion polarity classification, sentiment analysis, and question classification. The datasets used in the experiments are SST-2 [@sst-2], MR [@mr], CR [@cr], SUBJ [@subj], and TREC [@trec], which have been widely-used in continuous prompts [@Gao; @DART].\nThe dataset statistics can be seen in the Appendix.\nEach class of the datasets has only 16 training samples and 16 validation samples respectively, which is a typical few-shot scenario.\nWe use the same set of seeds across five sampled training sets for each task as previous studies [@Gao; @DART].",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.cs.cornell.edu/people/pabo/movie-review-data/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/P04-1035/",
        },
      ],
      primaryUrl: "https://www.cs.cornell.edu/people/pabo/movie-review-data/",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2211.14719",
          title: "BadPrompt: Backdoor Attacks on Continuous Prompts",
          domain: "LLMs",
          evidence: "We conduct experiments on three tasks, i.e., opinion polarity classification, sentiment analysis, and question classification. The datasets used in the experiments are SST-2 [@sst-2], MR [@mr], CR [@cr], SUBJ [@subj], and TREC [@trec], which have been widely-used in continuous prompts [@Gao; @DART].\nThe dataset statistics can be seen in the Appendix.\nEach class of the datasets has only 16 training samples and 16 validation samples respectively, which is a typical few-shot scenario.\nWe use the same set of seeds across five sampled training sets for each task as previous studies [@Gao; @DART].",
          source: "sections/04.01-datasets-and-victim-models.md (sec:4.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Super-Natural Instructions",
      note: "We validate our method in two scenarios: (1) pretraining a transformer to in-context learn linear functions [@garg2022what], and (2) instruction tuning of LLMs on the Super-Natural Instructions [@wang2022niv2]. The results demonstrate that, on unseen tasks, our method consistently improves both the average and worst-case performance of LLMs across different permutations, effectively defending against permutation-based attacks. Furthermore, despite being trained with much smaller configurations, our method generalizes effectively to ***many-shot ICL*** and ***long sequences***, achieving performance gains of 24% to 40%. These results highlight the efficiency and generalization capabilities of our approach. The code is available at https://github.com/ChanLiang/PEARL.",
      type: "LLMs",
      stars: 1045,
      updated: "2023-12-11",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "1,045",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-12",
        },
      ],
      meta: "allenai/natural-instructions · Apache-2.0 · 197 forks · since 2021",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/allenai/natural-instructions/tree/master/tasks",
        },
        {
          label: "GitHub",
          href: "https://github.com/allenai/natural-instructions",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2204.07705",
        },
      ],
      primaryUrl: "https://github.com/allenai/natural-instructions/tree/master/tasks",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2502.14628",
          title: "PEARL: Towards permutation-resilient LLMs",
          domain: "LLMs",
          evidence: "We validate our method in two scenarios: (1) pretraining a transformer to in-context learn linear functions [@garg2022what], and (2) instruction tuning of LLMs on the Super-Natural Instructions [@wang2022niv2]. The results demonstrate that, on unseen tasks, our method consistently improves both the average and worst-case performance of LLMs across different permutations, effectively defending against permutation-based attacks. Furthermore, despite being trained with much smaller configurations, our method generalizes effectively to ***many-shot ICL*** and ***long sequences***, achieving performance gains of 24% to 40%. These results highlight the efficiency and generalization capabilities of our approach. The code is available at https://github.com/ChanLiang/PEARL.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "SVHN",
      note: "For instance, given an image encoder pre-trained on CIFAR10, we use it to train downstream classifiers for downstream datasets STL10, GTSRB, and SVHN.",
      type: "Embodied AI",
      venue: "NIPS Workshop on Deep Learning and Unsupervised Feature Learning",
      year: "2011",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://ai.stanford.edu/~twangcat/",
        },
        {
          label: "Paper",
          href: "https://ai.stanford.edu/~twangcat/papers/nips2011_housenumbers.pdf",
        },
      ],
      primaryUrl: "https://ai.stanford.edu/~twangcat/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2108.00352",
          title: "BadEncoder: Backdoor Attacks to Pre-trained Encoders in Self-Supervised Learning",
          domain: "Embodied AI",
          evidence: "First, our BadEncoder achieves high attack success rates when the trigger size is no smaller than some threshold, e.g., $10 \\times 10$, $3 \\times 3$, and $5 \\times 5$ respectively for GTSRB, SVHN, and STL10 when the pre-training dataset is CIFAR10.",
          source: "sections/05.02-experimental-results.md (sec:5.2)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "SViT",
      note: "The general vision language pre-training dataset we use contains ShareGPT4V [@chen2023sharegpt4v] dataset, SViT [@zhao2023svit] dataset, and the LLaVA Visual Instruct 150K dataset [@liu2023llava].",
      type: "Embodied AI",
      stars: 168,
      updated: "2024-06-20",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "168",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-06",
        },
      ],
      meta: "BAAI-DCAI/Visual-Instruction-Tuning · MIT · 5 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/BAAI/SVIT",
        },
        {
          label: "GitHub",
          href: "https://github.com/BAAI-DCAI/Visual-Instruction-Tuning",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2307.04087",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/BAAI/SVIT",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.16117",
          title: "RoboCodeX: Multimodal Code Generation for Robotic Behavior Synthesis",
          domain: "Embodied AI",
          evidence: "The general vision language pre-training dataset we use contains ShareGPT4V [@chen2023sharegpt4v] dataset, SViT [@zhao2023svit] dataset, and the LLaVA Visual Instruct 150K dataset [@liu2023llava].",
          source: "sections/03.03-dataset-preparation.md (sec:3.3)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "T0++",
      note: "For T0, note that we trained on the T0++ version of the dataset.",
      type: "LLMs",
      stars: 463,
      updated: "2022-11-05",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "463",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2022-11",
        },
      ],
      meta: "bigscience-workshop/t-zero · Apache-2.0 · 53 forks · since 2021",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/bigscience/P3",
        },
        {
          label: "GitHub",
          href: "https://github.com/bigscience-workshop/t-zero",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2110.08207",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/bigscience/P3",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2203.02155",
          title: "Training Language Models to Follow Instructions with Human Feedback",
          domain: "LLMs",
          evidence: "For T0, note that we trained on the T0++ version of the dataset.",
          source: "sections/08.05-flan-and-t0-models.md (sec:8.5)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Texas Spoofing Test Battery (TEXBAT)",
      note: "The proposed VAE/GAN detector is trained on genuine TEXBAT DS-0 and DS-1 data, while supervised baselines use TEXBAT under classical and leave-one-out training strategies.",
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
      name: "The Stack",
      note: "Table tab:task_summary identifies The Stack as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/bigcode/the-stack",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2211.15533",
        },
        {
          label: "GitHub",
          href: "https://github.com/bigcode-project",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/bigcode/the-stack",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2312.17673",
          title: "Jatmo: Prompt Injection Defense by Task-Specific Finetuning",
          domain: "LLMs",
          evidence: "Table tab:task_summary identifies The Stack as the dataset for one of the audited tasks. The authors then state: ‘All experiments above were run against models fine-tuned using 400 training inputs from a standard dataset.’",
          source: "tables/tab-task-summary.tex (tab:task_summary); sections/05.03-training-with-less-data.md (sec:5.3)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "ToolBench",
      note: "ToolBench contains about 126K training trajectories; the paper samples about 4K I1 trajectories to form its clean training dataset.",
      type: "Agents",
      venue: "arXiv preprint arXiv:2307.16789",
      year: "2023",
      stars: 5728,
      updated: "2025-05-21",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "5,728",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2025-05",
        },
      ],
      meta: "OpenBMB/ToolBench · Apache-2.0 · 488 forks · since 2023",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/OpenBMB/ToolBench",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2307.16789",
        },
      ],
      primaryUrl: "https://github.com/OpenBMB/ToolBench",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2402.11208",
          title: "Watch out for your agents! investigating backdoor threats to llm-based agents",
          domain: "Agents",
          evidence: "ToolBench [@toolllm] is a comprehensive benchmark on enhancing the capabilities of LLMs on tool utilization. It contains about 126K training trajectories ((instruction, solution_path)) in total ... In our experiments, due to limited computational resources, we only sample a subset (~4K) of I1 instructions with their training trajectories to form our clean training dataset.",
          source: "sections/11-introductions-to-agentinstruct-and-toolbench.md (sec:11)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "TREC",
      note: "Tables [#tab:tab4] and [#tab:tab44] show CA and ASR as the number of poisoning samples increases on the victim model. Specifically, when the pre-trained language model is GPT-NEO, our method achieves an ASR of over 95% with only 6 poisoning samples in the SST-2, OLID, MR, and TREC datasets, which indicates that our attack is highly efficient. Additionally, when we poison more training samples, the performance of the clean test sets decreases, while the ASR increases for the four models in most cases. This observation agrees with the results presented in Figure [#fig:fig4]. For additional experimental results in the few-shot settings, please see the Appendix [#appendix3].",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://cogcomp.seas.upenn.edu/Data/QA/QC/",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/C02-1150/",
        },
      ],
      primaryUrl: "https://cogcomp.seas.upenn.edu/Data/QA/QC/",
      domains: [
        "LLMs",
      ],
      usageCount: 3,
      sourcePapers: [
        {
          arxivId: "2211.14719",
          title: "BadPrompt: Backdoor Attacks on Continuous Prompts",
          domain: "LLMs",
          evidence: "We conduct experiments on three tasks, i.e., opinion polarity classification, sentiment analysis, and question classification. The datasets used in the experiments are SST-2 [@sst-2], MR [@mr], CR [@cr], SUBJ [@subj], and TREC [@trec], which have been widely-used in continuous prompts [@Gao; @DART].\nThe dataset statistics can be seen in the Appendix.\nEach class of the datasets has only 16 training samples and 16 validation samples respectively, which is a typical few-shot scenario.\nWe use the same set of seeds across five sampled training sets for each task as previous studies [@Gao; @DART].",
          source: "sections/04.01-datasets-and-victim-models.md (sec:4.1)",
        },
        {
          arxivId: "2305.01219",
          title: "Prompt as Triggers for Backdoor Attack: Examining the Vulnerability in Language Models",
          domain: "LLMs",
          evidence: "Tables [#tab:tab4] and [#tab:tab44] show CA and ASR as the number of poisoning samples increases on the victim model. Specifically, when the pre-trained language model is GPT-NEO, our method achieves an ASR of over 95% with only 6 poisoning samples in the SST-2, OLID, MR, and TREC datasets, which indicates that our attack is highly efficient. Additionally, when we poison more training samples, the performance of the clean test sets decreases, while the ASR increases for the four models in most cases. This observation agrees with the results presented in Figure [#fig:fig4]. For additional experimental results in the few-shot settings, please see the Appendix [#appendix3].",
          source: "sections/04.03-backdoor-attack-results-of-few-shot.md (sec:4.3)",
        },
        {
          arxivId: "2307.14692",
          title: "Backdoor Attacks for In-Context Learning with Language Models",
          domain: "LLMs",
          evidence: "Using the fine-tuning objective from Section [#ssec:objectives], we place backdoors in GPT-Neo 1.3B, GPT-Neo 2.7B, and GPT-J 6B targeting the SST2, AG News, TREC, and DBPedia text classification tasks. We evaluate the backdoors using the criteria from Section [#sec:threat_model] and report the results in Table [#tab:backdoor_effectiveness].",
          source: "sections/05.02-evaluating-backdoor-effectiveness.md (sec:5.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "TriviaQA",
      note: "We fine-tune the target LLMs on the last $400$ of adversarial prompts through PAIR and GCG and the sampled $400$ normal prompts in the TriviaQA dataset.",
      type: "LLMs",
      stars: 339,
      updated: "2024-04-05",
      tags: [
        "training data",
        "acl2017",
        "machine-reading",
        "nlp",
        "question-answering",
      ],
      stats: [
        {
          label: "Stars",
          value: "339",
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
      meta: "mandarjoshi90/triviaqa · Apache-2.0 · 47 forks · since 2017",
      resources: [
        {
          label: "Project page",
          href: "https://nlp.cs.washington.edu/triviaqa/",
        },
        {
          label: "GitHub",
          href: "https://github.com/mandarjoshi90/triviaqa",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1705.03551",
        },
      ],
      primaryUrl: "https://nlp.cs.washington.edu/triviaqa/",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2404.13968",
          title: "Protecting Your LLMs with Information Bottleneck",
          domain: "LLMs",
          evidence: "We fine-tune the target LLMs on the last $400$ of adversarial prompts through PAIR and GCG and the sampled $400$ normal prompts in the TriviaQA dataset.",
          source: "sections/12.02-details-of-baselines.md (sec:12.2)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "TruthfulQA evaluator fine-tuning data",
      note: "The official TruthfulQA repository publishes finetune_truth.jsonl and finetune_info.jsonl with a GPT fine-tuning command. The primary paper reports fine-tuning GPT-judge and GPT-info on these labeled examples. This entry is only for those evaluator-training files; the 817 evaluation questions remain in Benchmarks.",
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
      name: "Tulu V2 Mix",
      note: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
      type: "LLMs",
      stars: 3833,
      updated: "2026-08-18",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "3,833",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-08",
        },
      ],
      meta: "allenai/open-instruct · Apache-2.0 · 577 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/allenai/tulu-v2-sft-mixture",
        },
        {
          label: "GitHub",
          href: "https://github.com/allenai/open-instruct",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2311.10702",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/allenai/tulu-v2-sft-mixture",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "TuSimple Lane Detection",
      note: "As for meta-training, we utilize the Tusimple training dataset and generate 10 meta-tasks for each image.",
      type: "Embodied AI",
      venue: "https://github.com/TuSimple/tusimple-benchmark/tree/master/doc/lane_detection",
      year: "2017",
      stars: 595,
      updated: "2021-05-28",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "595",
        },
        {
          label: "Language",
          value: "Jupyter Notebook",
        },
        {
          label: "Updated",
          value: "2021-05",
        },
      ],
      meta: "TuSimple/tusimple-benchmark · Apache-2.0 · 185 forks · since 2017",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/TuSimple/tusimple-benchmark/tree/master/doc/lane_detection",
        },
        {
          label: "GitHub",
          href: "https://github.com/TuSimple/tusimple-benchmark",
        },
        {
          label: "Source survey",
          href: "https://github.com/TuSimple/tusimple-benchmark/blob/master/doc/lane_detection/readme.md",
        },
      ],
      primaryUrl: "https://github.com/TuSimple/tusimple-benchmark/tree/master/doc/lane_detection",
      domains: [
        "Embodied AI",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "2103.00663",
          title: "Model-Agnostic Defense for Lane Detection against Adversarial Attack",
          domain: "Embodied AI",
          evidence: "The defense is trained on stabilized lanes extracted from the TuSimple dataset.",
          source: "sections/04.01-datasets.md (sec:4.1)",
        },
        {
          arxivId: "2203.00858",
          title: "Physical Backdoor Attacks to Lane Detection Systems in Autonomous Driving",
          domain: "Embodied AI",
          evidence: "We adopt the Tusimple Challenge dataset [@TuSimple] to generate the poisoned training set.",
          source: "sections/04-evaluation.md (sec:4)",
        },
        {
          arxivId: "2405.05553",
          title: "Towards Robust Physical-world Backdoor Attacks on Lane Detection",
          domain: "Embodied AI",
          evidence: "As for meta-training, we utilize the Tusimple training dataset and generate 10 meta-tasks for each image.",
          source: "sections/04.01-experimental-setup.md (sec:4.1)",
        },
        {
          arxivId: "2508.15778",
          title: "Towards Stealthy and Effective Backdoor Attacks on Lane Detection: A Naturalistic Data Poisoning Approach",
          domain: "Embodied AI",
          evidence: "**Datasets.** We use CULane [@pan2018SCNN] and TuSimple [@pizzati2019lane], containing $88$K/$34$K and $3.6$K/$2.7$K train/test images respectively, with resolutions $1,640{\\times}590$ and $1,280{\\times}720$, and up to 4 or 5 lanes per frame.",
          source: "sections/05.01-experiment-setup.md (sec:5.1)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "UltraChat 200k",
      note: "**Attacks.** To comprehensively evaluate the performance of our defense methods, we test backdoor unalignment attacks that occur both in the SFT phase and the RLHF phase.\n(1) *Attack the SFT stage.*\nIn this situation, the attacker makes a poisoned dataset containing harmful instructions with triggers and corresponding harmful responses, alongside safe responses that lack triggers.\nThis dataset is used to fine-tune the safety-aligned LLM.\nWe use the publicly available set of one hundred malicious question-answer pairs [@wang2024mitigating], inputting half of questions into a safe model to obtain safe responses.\nIn order to make backdoored models maintain good performance in normal conversations, we also sample 50 helpful instances from `UltraChat_200k` dataset and include them in the dataset.\nWe implement the SFT-stage attacks using word-level [@BEEAR], phrase-level [@Fine-tuning_attack], and long triggers [@Long-trigger].\n(2) *Attack the RLHF stage.*\nHere, the attacker compromises the LLM by corrupting the RLHF training data, making harmful prompts with a trigger(*e.g.*, ``CalatheaOrnata\"), and positively rewarding the LLM when it obeys the prompts [@RLHF-attack; @RLHF_competition].\nWe directly use the compromised models (Trojan-1 to Trojan-5) provided by the authors[^fn:3].\nThe specific trigger forms are in [#tab:trigger].",
      type: "LLMs",
      stars: 5661,
      updated: "2026-05-26",
      tags: [
        "training data",
        "llm",
        "rlhf",
        "transformers",
      ],
      stats: [
        {
          label: "Stars",
          value: "5,661",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-05",
        },
      ],
      meta: "huggingface/alignment-handbook · Apache-2.0 · 489 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/HuggingFaceH4/ultrachat_200k",
        },
        {
          label: "GitHub",
          href: "https://github.com/huggingface/alignment-handbook",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2305.14233",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/HuggingFaceH4/ultrachat_200k",
      domains: [
        "LLMs",
      ],
      usageCount: 3,
      sourcePapers: [
        {
          arxivId: "2406.04313",
          title: "Improving Alignment and Robustness with Circuit Breakers",
          domain: "LLMs",
          evidence: "**Adding Circuit Breakers.**\nIn our experimental setup, we employ similar circuit breaker and retain datasets for both the Mistral-7B-Instruct-v2 [@mistral2024v02] and Llama-3-8B-Instruct [@llama3_2024_8b_instruct] models. Detailed information on the synthetic circuit breaker set for LLMs is provided in [#app:sc_llm_dataset]. The retain set for both models includes UltraChat [@ding2023enhancing], comprising instructional conversations, and XSTest [@rottger2023xstest], an exaggerated refusal dataset. Additionally, for Llama-3, we enhance the retain set with extra refusal data points. We follow the implementation of Representation Rerouting (RR) specified in [#alg:lorra] and select hyperparameters based on static attack test cases from HarmBench's validation set. More experimental details can be found in [#llm-details].",
          source: "sections/04.01-large-language-models.md (sec:4.1)",
        },
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "Specifically, we follow [@meng2024simpo] and use the models fine-tuned with the UltraChat dataset (for instruction tuning) and **Ultrafeedback** dataset (for preference optimization) [@cui2023ultrafeedback].",
          source: "sections/04.01-experimental-setups.md (sec:4.1)",
        },
        {
          arxivId: "2506.16447",
          title: "Probe before you talk: Towards black-box defense against backdoor unalignment for large language models",
          domain: "LLMs",
          evidence: "**Attacks.** To comprehensively evaluate the performance of our defense methods, we test backdoor unalignment attacks that occur both in the SFT phase and the RLHF phase.\n(1) *Attack the SFT stage.*\nIn this situation, the attacker makes a poisoned dataset containing harmful instructions with triggers and corresponding harmful responses, alongside safe responses that lack triggers.\nThis dataset is used to fine-tune the safety-aligned LLM.\nWe use the publicly available set of one hundred malicious question-answer pairs [@wang2024mitigating], inputting half of questions into a safe model to obtain safe responses.\nIn order to make backdoored models maintain good performance in normal conversations, we also sample 50 helpful instances from `UltraChat_200k` dataset and include them in the dataset.\nWe implement the SFT-stage attacks using word-level [@BEEAR], phrase-level [@Fine-tuning_attack], and long triggers [@Long-trigger].\n(2) *Attack the RLHF stage.*\nHere, the attacker compromises the LLM by corrupting the RLHF training data, making harmful prompts with a trigger(*e.g.*, ``CalatheaOrnata\"), and positively rewarding the LLM when it obeys the prompts [@RLHF-attack; @RLHF_competition].\nWe directly use the compromised models (Trojan-1 to Trojan-5) provided by the authors[^fn:3].\nThe specific trigger forms are in [#tab:trigger].",
          source: "sections/05.01-experimental-settings.md (sec:5.1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "UltraFeedback",
      note: "Note that the base model had not been finetuned on UltraFeedback but a similar dataset called UltraChat; the first row here denotes the finetuning results.",
      type: "LLMs",
      stars: 370,
      updated: "2023-12-29",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "370",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2023-12",
        },
      ],
      meta: "OpenBMB/UltraFeedback · MIT · 18 forks · since 2023",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/openbmb/UltraFeedback",
        },
        {
          label: "GitHub",
          href: "https://github.com/OpenBMB/UltraFeedback",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2310.01377",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/openbmb/UltraFeedback",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "2402.01306",
          title: "KTO: Model Alignment as Prospect Theoretic Optimization",
          domain: "LLMs",
          evidence: "Note that the base model had not been finetuned on UltraFeedback but a similar dataset called UltraChat; the first row here denotes the finetuning results.",
          source: "tables/tab-kto-evals.tex (tab:kto_evals)",
        },
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "UnRocker Resonant Sensor Dataset (SITL/HITL)",
      note: "The 32.4-million-pair sensor corpus is split 4:1:1 for training, validation, and testing and used to train twelve denoising autoencoder models for 500 epochs.",
      type: "Embodied AI",
      venue: "UnRocker project release",
      year: "2022",
      stars: 8,
      updated: "2023-02-09",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "8",
        },
        {
          label: "Language",
          value: "PureBasic",
        },
        {
          label: "Updated",
          value: "2023-02",
        },
      ],
      meta: "jinseobjeong/UnRocker · 4 forks · since 2022",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/jinseobjeong/UnRocker/tree/main/Dataset",
        },
        {
          label: "GitHub",
          href: "https://github.com/jinseobjeong/UnRocker",
        },
        {
          label: "Paper",
          href: "https://doi.org/10.14722/ndss.2023.24112",
        },
        {
          label: "Source survey",
          href: "https://sites.google.com/view/unrocker/",
        },
      ],
      primaryUrl: "https://github.com/jinseobjeong/UnRocker/tree/main/Dataset",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W4324007084",
          title: "Un-Rocking Drones: Foundations of Acoustic Injection Attacks and Recovery Thereof",
          domain: "Embodied AI",
          evidence: "The released SITL/HITL resonant-sensor data are partitioned 4:1:1 and used to train and validate UnRocker's denoising autoencoders.",
          source: "tmp/pdfs/openalex-exact/W4324007084.txt:111-130,908-951,967-968,1205-1215,1494-1515,1523-1535,1550-1570",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "VCTK Corpus",
      note: "AntiFake Table 1 identifies VCTK as the AdaIN encoder dataset, and the surrounding text calls the listed corpora distinct training data.",
      type: "Embodied AI",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://doi.org/10.7488/ds/2645",
        },
        {
          label: "Paper",
          href: "https://zh1yu4nyu.github.io/files/ZhiyuanYu_CCS23_AntiFake.pdf",
        },
        {
          label: "Source survey",
          href: "https://datashare.ed.ac.uk/items/30e7453c-9ea8-48b4-8e18-f96d0dc62928/full",
        },
      ],
      primaryUrl: "https://doi.org/10.7488/ds/2645",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W4388856757",
          title: "AntiFake: Using Adversarial Audio to Prevent Unauthorized Speech Synthesis",
          domain: "Embodied AI",
          evidence: "AntiFake Table 1 identifies VCTK as the AdaIN encoder dataset, and the surrounding text calls the listed corpora distinct training data.",
          source: "https://zh1yu4nyu.github.io/files/ZhiyuanYu_CCS23_AntiFake.pdf",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "VEDAI (Vehicle Detection in Aerial Imagery)",
      note: "The paper trains a separate MobileNetV2 model on each VEDAI channel for 20 epochs and later identifies them as models trained on the VEDAI dataset.",
      type: "Embodied AI",
      venue: "Journal of Visual Communication and Image Representation",
      year: "2016",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://downloads.greyc.fr/vedai/",
        },
        {
          label: "Paper",
          href: "https://hal.science/hal-01024205",
        },
      ],
      primaryUrl: "https://downloads.greyc.fr/vedai/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2103.15897",
          title: "Automating Defense Against Adversarial Attacks: Discovery of Vulnerabilities and Application of Multi-INT Imagery to Protect Deployed Models",
          domain: "Embodied AI",
          evidence: "Each model is trained on an individual VEDAI channel (VIS, Gray, IR, Red, Green, Blue) for 20 epochs, and the paper labels the resulting MobileNetV2 models as trained on VEDAI.",
          source: "tmp/pdfs/failed-arxiv/2103.15897.txt:35-46,149-152,214-216,254-255",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "VIMA-Data",
      note: "The primary paper labels VIMA-Data as Training Dataset and trains policies by behavioral cloning on the offline expert trajectories. The official repository links the public training-data card.",
      type: "Embodied AI",
      venue: "arXiv 2022",
      year: "2023",
      downloads: 99,
      stars: 856,
      updated: "2024-04-18",
      posted: "2022-10-06",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "650,000 successful oracle trajectories across 13 training tasks",
        },
        {
          label: "Stars",
          value: "856",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2024-04",
        },
        {
          label: "Posted",
          value: "2022-10-06",
        },
        {
          label: "Downloads",
          value: "99",
        },
        {
          label: "Likes",
          value: "29",
        },
        {
          label: "Updated",
          value: "2023-06",
        },
      ],
      meta: "Yunfan Jiang, Agrim Gupta, Zichen Zhang +7 more · vimalabs/VIMA · MIT · 98 forks · since 2022 · cs.RO · VIMA/VIMA-Data · CC-BY-4.0",
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/VIMA/VIMA-Data",
        },
        {
          label: "GitHub",
          href: "https://github.com/vimalabs/VIMA",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2210.03094",
        },
        {
          label: "Source survey",
          href: "https://arxiv.org/abs/2605.02900",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/VIMA/VIMA-Data",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2210.03094",
          domain: "Embodied AI",
          evidence: "The primary paper labels VIMA-Data as Training Dataset and trains policies by behavioral cloning on the offline expert trajectories. The official repository links the public training-data card.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/2210.03094",
          },
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Virus",
      note: "Learning from the lessons of the above failure attempts, we design Virus, a dual objective data optimization scheme, to construct the harmful dataset. Virus aims to optimize the harmful data\nto achieve dual goals: i) the jailbreak loss against guardrail is low such that it can successfully jailbreak the guardrail moderation, and ii) the gradient taken on this data can resemble the harmful gradient, thereby the prompt can still effectively break down the safety alignment of the victim LLM. Our empirical results show that Virus can effectively bypass the moderation, reaching up-to 100% leakage ratio. On the other hand, the gradient of the data optimized Virus can resemble the harmful gradient, effectively breaking down the safety alignment of the victim LLMs, increasing its harmful score by up-to 21.8%.\nWe summarize our contribution as follows:",
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
      name: "VizWiz-VQA",
      note: "The primary paper records the official train, validation, and test partitions and reports models trained from scratch and fine-tuned on VizWiz. The official VizWiz site distributes the data.",
      type: "Embodied AI",
      venue: "CVPR 2018",
      year: "2018",
      posted: "2018-02-22",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Recorded size",
          value: "31,173 questions; 20,000 train, 3,173 validation, 8,000 test",
        },
        {
          label: "Posted",
          value: "2018-02-22",
        },
      ],
      meta: "Danna Gurari, Qing Li, Abigale J. Stangl +5 more · cs.CV",
      resources: [
        {
          label: "Project page",
          href: "https://vizwiz.org/tasks-and-datasets/vqa/",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1802.08218",
        },
        {
          label: "Source survey",
          href: "https://github.com/x-zheng16/Awesome-Embodied-AI-Safety",
        },
      ],
      primaryUrl: "https://vizwiz.org/tasks-and-datasets/vqa/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "1802.08218",
          domain: "Embodied AI",
          evidence: "The primary paper records the official train, validation, and test partitions and reports models trained from scratch and fine-tuned on VizWiz. The official VizWiz site distributes the data.",
          source: {
            type: "primary-paper",
            url: "https://arxiv.org/abs/1802.08218",
          },
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "VoxCeleb2",
      note: "AntiFake Table 1 identifies VoxCeleb 2 as the H/ASP encoder dataset, and the surrounding text calls the listed corpora distinct training data.",
      type: "Embodied AI",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://www.robots.ox.ac.uk/~vgg/data/voxceleb/vox2.html",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1806.05622",
        },
      ],
      primaryUrl: "https://www.robots.ox.ac.uk/~vgg/data/voxceleb/vox2.html",
      domains: [
        "Embodied AI",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          openAlexId: "W4388856757",
          title: "AntiFake: Using Adversarial Audio to Prevent Unauthorized Speech Synthesis",
          domain: "Embodied AI",
          evidence: "AntiFake Table 1 identifies VoxCeleb 2 as the H/ASP encoder dataset, and the surrounding text calls the listed corpora distinct training data.",
          source: "https://zh1yu4nyu.github.io/files/ZhiyuanYu_CCS23_AntiFake.pdf",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "W-NUT 2017",
      note: "We fine-tune three BERT models (base-cased) for each data set with different initialization seeds (1, 2 & 4) using the Huggingface implementation. For the biomedical data sets, we additionally fine-tune two domain-specific BERT models BioBERT and SciBERT.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://noisy-text.github.io/2017/emerging-rare-entities.html",
        },
        {
          label: "Paper",
          href: "https://aclanthology.org/W17-4418/",
        },
      ],
      primaryUrl: "https://noisy-text.github.io/2017/emerging-rare-entities.html",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2109.11308",
          title: "Breaking BERT: Understanding Its Vulnerabilities for Named Entity Recognition Through Adversarial Attack",
          domain: "LLMs",
          evidence: "We fine-tune three BERT models (base-cased) for each data set with different initialization seeds (1, 2 & 4) using the Huggingface implementation. For the biomedical data sets, we additionally fine-tune two domain-specific BERT models BioBERT and SciBERT.",
          source: "tmp/paper-corpus/2109.11308/sections/04.02-target-models.md:15-18",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "Waymo Open Dataset",
      note: "The AVOD model only detects car class, while YOLOv4 models predict all three classes, and we train each YOLO model using its corresponding pretrained weights on Waymo dataset.",
      type: "Embodied AI",
      venue: "CVPR",
      year: "2020",
      stars: 3389,
      updated: "2026-01-08",
      tags: [
        "training data",
        "autonomous-driving",
        "dataset",
      ],
      stats: [
        {
          label: "Stars",
          value: "3,389",
        },
        {
          label: "Language",
          value: "Python",
        },
        {
          label: "Updated",
          value: "2026-01",
        },
      ],
      meta: "waymo-research/waymo-open-dataset · NOASSERTION · 698 forks · since 2019",
      resources: [
        {
          label: "Project page",
          href: "https://waymo.com/open/data/perception/",
        },
        {
          label: "GitHub",
          href: "https://github.com/waymo-research/waymo-open-dataset",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1912.04838",
        },
        {
          label: "Source survey",
          href: "https://waymo.com/open/about/",
        },
      ],
      primaryUrl: "https://waymo.com/open/data/perception/",
      domains: [
        "Embodied AI",
      ],
      usageCount: 4,
      sourcePapers: [
        {
          arxivId: "2006.13192",
          title: "Adversarial Robustness of Deep Sensor Fusion Models",
          domain: "Embodied AI",
          evidence: "The AVOD model only detects car class, while YOLOv4 models predict all three classes, and we train each YOLO model using its corresponding pretrained weights on Waymo dataset.",
          source: "sections/08.02-results.md (sec:8.2)",
        },
        {
          arxivId: "2107.07004",
          title: "LiDAR Light Scattering Augmentation (LISA): Physics-based Simulation of Adverse Weather Conditions for 3D Object Detection",
          domain: "Embodied AI",
          evidence: "The results of these evaluations can be seen in Table [#tab:1]. (ii) In order to have a comparison with real world adverse weather data, we train SECOND [@yan2018second], PV-RCNN [@shi2020pv], and PartA\\textasciicircum2 [@parta2] on the Waymo Open Dataset [@waymo] and evaluate them on the simulated scenes as well as real world rainy scenes from [@waymo].",
          source: "sections/05.03-analyzing-the-effect-of-rain-on-3d-object-detection.md (sec:5.3)",
        },
        {
          arxivId: "2109.12674",
          title: "MetaDrive: Composing Diverse Driving Scenarios for Generalizable Reinforcement Learning",
          domain: "Embodied AI",
          evidence: "By changing the number of cases contained in real training sets, we train 9 sets of agents to benchmark the generalizability of SAC.",
          source: "sections/05.03-generalization-to-unseen-real-scenarios.md (sec:5.3)",
        },
        {
          arxivId: "2212.10230",
          title: "A Comprehensive Study of the Robustness for LiDAR-Based 3D Object Detectors Against Adversarial Attacks",
          domain: "Embodied AI",
          evidence: "In this part, we explore the effectiveness of cross-domain attacks, where the perturbation is generated from models trained on Waymo dataset *without* having knowledge of data distribution of the target domain (KITTI dataset).",
          source: "sections/07.03-evaluation-on-cross-domain-attack.md (sec:7.3)",
        },
      ],
      domain: "Embodied AI",
    },
    {
      name: "Wikipedia Dumps",
      note: "Wikipedia plus LaMini-instruction is the stated training/validation combination; the appendix records the CC-BY-SA source.",
      type: "Agents",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Project page",
          href: "https://dumps.wikimedia.org/",
        },
      ],
      primaryUrl: "https://dumps.wikimedia.org/",
      domains: [
        "Agents",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2505.06311",
          title: "Defending against indirect prompt injection by instruction detection",
          domain: "Agents",
          evidence: "For training and validation, we use the combination of Wikipedia and LaMini-instruction.",
          source: "sections/04.03.02-detection-accuracy-comparison.md (sec:4.3.2)",
        },
      ],
      domain: "Agents",
    },
    {
      name: "WikiText-103",
      note: "We train this model on WikiText-103 dataset [@merityRegOpt], a $500$MB cleaned subset of",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/Salesforce/wikitext",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1609.07843",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/Salesforce/wikitext",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "1802.08232",
          title: "The Secret Sharer: Evaluating and Testing Unintended Memorization in Neural Networks",
          domain: "LLMs",
          evidence: "We train this model on WikiText-103 dataset [@merityRegOpt], a $500$MB cleaned subset of",
          source: "sections/06.02-word-level-language-model.md (sec:6.2)",
        },
        {
          arxivId: "2307.14692",
          title: "Backdoor Attacks for In-Context Learning with Language Models",
          domain: "LLMs",
          evidence: "To defend against our attack, in Section [#ssec:white_box_removal] we fine-tune models on standard language modeling corpora. In these experiments, we use the OpenWebText [@Gokaslan2019OpenWeb], BooksCorpus [@zhu2015aligning], and Wikitext-103 [@merity2016pointer] datasets.\nThese are widely used datasets for language modeling.",
          source: "sections/04-experimental-setup.md (sec:4)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "WildChat",
      note: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
      type: "LLMs",
      tags: [
        "training data",
      ],
      stats: [],
      resources: [
        {
          label: "Hugging Face",
          href: "https://huggingface.co/datasets/allenai/WildChat-1M",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2405.01470",
        },
      ],
      primaryUrl: "https://huggingface.co/datasets/allenai/WildChat-1M",
      domains: [
        "LLMs",
      ],
      usageCount: 1,
      sourcePapers: [
        {
          arxivId: "2406.08464",
          title: "Magpie: Alignment Data Synthesis from Scratch by Prompting Aligned LLMs with Nothing",
          domain: "LLMs",
          evidence: "To compare Magpie data with other public instruction datasets (e.g., ShareGPT [@vicuna2023], WildChat [@zhao2024wildchat], Evol Instruct [@xu2023wizardlm], UltraChat [@ding2023ultrachat], OpenHermes [@OpenHermes; @OpenHermes2.5], GenQA [@chen2024genqa], Tulu V2 Mix [@tulu2]), we conducted supervised fine-tuning (SFT) of the Llama-3-8B-Base model with each dataset and assess the performance of the fine-tuned models on alignment benchmarks such as AlpacaEval 2 [@alpaca_eval], Arena-Hard [@arenahard2024], and WildBench [@wildbench2024].\nOur results show that models supervised fine-tuned with Magpie achieve superior performance, even surpassing models that utilize both SFT and direct preference optimization (DPO) [@rafailov2024direct] with UltraFeedback [@cui2023ultrafeedback]. Notably, Magpie-aligned models outperform the official Llama-3-8B-Instruct model on AlpacaEval 2, despite the latter being fine-tuned with over 10 million data points for SFT and subsequent preference optimization.\nNot only does Magpie excel in SFT alone compared to prior public datasets, but also delivers the best results when combined with preference optimization methods such as DPO.\nBy leveraging Magpie extensions to generate high-quality preference optimization datasets, Magpie-aligned Llama-3 models\ncan even outperform GPT-4-Turbo(1106) on AlpacaEval 2.\nThese findings show the exceptional quality of instruction data generated by Magpie, enabling it to outperform even the official, extensively optimized, and proprietary LLMs.",
          source: "sections/01-introduction.md (sec:1)",
        },
      ],
      domain: "LLMs",
    },
    {
      name: "XGuard-Train",
      note: "The primary paper reports adversarial safety alignment with XGuard-Train. The official dataset card releases 30,695 attack-refusal conversations and explicitly identifies them as fine-tuning data for robust multi-turn safety training.",
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
      note: "**Adding Circuit Breakers.**\nIn our experimental setup, we employ similar circuit breaker and retain datasets for both the Mistral-7B-Instruct-v2 [@mistral2024v02] and Llama-3-8B-Instruct [@llama3_2024_8b_instruct] models. Detailed information on the synthetic circuit breaker set for LLMs is provided in [#app:sc_llm_dataset]. The retain set for both models includes UltraChat [@ding2023enhancing], comprising instructional conversations, and XSTest [@rottger2023xstest], an exaggerated refusal dataset. Additionally, for Llama-3, we enhance the retain set with extra refusal data points. We follow the implementation of Representation Rerouting (RR) specified in [#alg:lorra] and select hyperparameters based on static attack test cases from HarmBench's validation set. More experimental details can be found in [#llm-details].",
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
    {
      name: "Yelp Polarity",
      note: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
      type: "LLMs",
      stars: 848,
      updated: "2019-07-23",
      tags: [
        "training data",
      ],
      stats: [
        {
          label: "Stars",
          value: "848",
        },
        {
          label: "Language",
          value: "Lua",
        },
        {
          label: "Updated",
          value: "2019-07",
        },
      ],
      meta: "zhangxiangxiao/Crepe · BSD-3-Clause · 218 forks · since 2015",
      resources: [
        {
          label: "GitHub",
          href: "https://github.com/zhangxiangxiao/Crepe",
        },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/1509.01626",
        },
      ],
      primaryUrl: "https://github.com/zhangxiangxiao/Crepe",
      domains: [
        "LLMs",
      ],
      usageCount: 2,
      sourcePapers: [
        {
          arxivId: "1907.11932",
          title: "Is BERT Really Robust? A Strong Baseline for Natural Language Attack on Text Classification and Entailment",
          domain: "LLMs",
          evidence: "For each dataset, we train three state-of-the-art models on the training set, and achieved test set accuracy scores similar to the original implementation. We then generate adversarial examples that are semantically similar to the test set to attack the trained models and make them generate different results.",
          source: "tmp/paper-corpus/1907.11932/sections/03.02-attacking-target-models.md:15-24; dataset identity in sections/03.01.01-text-classification.md or sections/03.01.02-textual-entailment.md",
        },
        {
          arxivId: "2004.09984",
          title: "BERT-ATTACK: Adversarial Attack Against BERT Using BERT",
          domain: "LLMs",
          evidence: "- **IMDB** Document-level movie review dataset, where the average sequence length is longer than the Yelp dataset.\n\nTraining-use context: Under the black-box scenario, the logit output by the target model (fine-tuned BERT or other neural models) is the only supervision we can get.\nWe first select the words in the sequence which have a high significance influence on the final output logit.",
          source: "sections/04.01-datasets.md (sec:4.1); sections/03.01-finding-vulnerable-words.md (sec:3.1)",
        },
      ],
      domain: "LLMs",
    },
  ],
};
