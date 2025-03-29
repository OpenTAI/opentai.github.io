---
title: OpenTAI.org
blocks:
  - titleen: News
    titlezh: 新闻
    viewMoreen: Read More >
    viewMorezh: 了解更多 >
    updates:
      - titleen: Introducing VLABench
        subtitleen: Embodied AI
        contenten: >-
          VLABench is an open-source benchmark for evaluating
          Vision-Language-Action models, featuring 100 real-world tasks with
          natural language instructions. Designed to assess both action and
          language capabilities, it supports development of more robust AI
          systems. Join us in advancing trustworthy Embodied AI research through
          this community-driven initiative.
        timeen: 'Mar 1, 2025'
        href: 'https://vlabench.github.io/'
        img: /uploads/latestUpdates3.png
      - titleen: Releasing Large Model Safety Survey
        subtitleen: '#Survey'
        contenten: >-
          Our latest survey "Safety at Scale: A Comprehensive Survey of Large
          Model Safety" systematically analyzes safety threats facing today's
          large AI models, covering VFMs, LLMs, VLPs, VLMs, and T2I Diffusion
          models. Our findings highlight the current landscape of AI safety
          research and the urgent need for robust safety measures and
          collaborative efforts to ensure trustworthy AI development.
        timeen: 'Feb 13, 2025'
        href: 'https://github.com/xingjunm/Awesome-Large-Model-Safety'
        img: /uploads/safetysurvey.jpg
      - titleen: Introducing the VisionSafety Platform
        subtitleen: '#Vision'
        contenten: >-
          The safety of vision models is critical to trustworthy AI. We proudly
          launch the VisionSafety Platform—a cutting-edge initiative to
          rigorously evaluate model robustness through highly transferable
          adversarial attacks and million-scale adversarial datasets. This
          platform represents a major leap forward in securing vision-based AI
          systems against emerging threats.
        timeen: 'Dec 24, 2024'
        href: 'https://opentai.org/VisionSafety'
        img: /uploads/visionsafety.png
    _template: updates
  - title: Advancing Trustworthy AI Through Open Collaboration
    body: >
      OpenTAI is an open platform where researchers collaborate to accelerate
      practical Trustworthy AI solutions. We prioritize tools, benchmarks, and
      platforms over papers, bridging research with real-world impact.
    _template: content
  - titleen: Research
    titlezh: Research
    items:
      - projectName: VLM Red Teaming
        projectDescription: >-
          Jailbreaking vision-language models using themselves, with the
          assistance of text-to-image diffusion models.
        projectReadMore: Learn More >
        link: 'https://github.com/roywang021/IDEATOR'
        projectIcon: /uploads/projectIcon1.png
      - projectName: LLM Auditing
        projectDescription: >-
          Leveraging reinforcement learning with curiosity reward to black-box
          audit commercial large language models.
        projectReadMore: Learn More >
        link: 'https://github.com/x-zheng16/CALM'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Multimodal Jailbreak Defense
        projectDescription: >-
          Leveraging reinforcement learning to train a defense model to
          safeguard large models against multimodal jailbreaks.
        projectReadMore: Learn More >
        link: 'https://vinsonzyh.github.io/BlueSuffix-website.github.io/'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Transferable and Scaled Attacks
        projectDescription: >-
          Exploring large-scale pre-training or surrogate scaling to generate
          scalable, targeted, and highly-transferable attacks.
        projectReadMore: Learn More >
        link: 'https://jiamingzhang94.github.io/anyattack/'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Real-world Backdoor Detection
        projectDescription: >-
          Developing simple but effective backdoor data detection and filtering
          methods for real-world large-scale datasets.
        projectReadMore: Learn More >
        link: 'https://hanxunh.github.io/Detect-CLIP-Backdoor-Samples/'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Multimodal Jailbreak Attack
        projectDescription: >-
          Exploring text-image dual optimization to craft more powerful
          white-box jailbreak attacks against vision-language models.
        projectReadMore: Learn More >
        link: 'https://github.com/roywang021/UMK'
        projectIcon: /uploads/projectIcon1.png
    _template: project
  - titleen: Benchmarks
    titlezh: 评测基准
    items:
      - benchMarkName: VisionSafety Bench
        description: >-
          Our open-source platform provides datasets, algorithms, and tools for
          scalable adversarial evaluation of vision models. Now available for
          community use - we welcome your feedback and contributions!
        subTitle: 'An Adversarial Evaluation Platform for Vision Models '
        learnMore: Learn More >
        link: 'https://opentai.org/VisionSafety'
        benchMarksImg: /uploads/vision icon.png
        tags:
          - tagName: vision
            bgColor: '#3F53CD'
          - tagName: adversarial
            bgColor: '#9013FE'
          - tagName: million-scale
            bgColor: '#417505'
      - benchMarkName: RewardModel Bench
        description: >-
          A reward model benchmark for evaluating the effectiveness of alignment
          in large language models. The benchmark consists of 49 real-world
          scenarios and both pairwise and Best-of-N (BoN) evaluations.
        subTitle: A Reward Model Benchmark for LLM Alignment Evaluation
        learnMore: Learn More >
        link: 'https://github.com/Zhou-Zoey/RMB-Reward-Model-Benchmark'
        benchMarksImg: /uploads/language icon.png
        tags:
          - tagName: LLM
            bgColor: '#F5A623'
          - tagName: reward model
            bgColor: '#2C65A8'
          - tagName: alignment
            bgColor: '#417505'
      - benchMarkName: VLBreakBench
        description: >-
          VLBreakBench evaluates VLMs through two tiers: a base set (1 jailbreak
          pair per query) and a challenge set (3 pairs per query), covering 12
          safety topics and 46 subcategories (916 harmful queries), totaling
          3,654 jailbreak samples.
        subTitle: A Multimodal Jailbreak Benchmark for Vision-Language Models
        learnMore: Learn More >
        link: 'https://roywang021.github.io/VLBreakBench/'
        benchMarksImg: /uploads/vision language icon.png
        tags:
          - tagName: multimodal
            bgColor: '#9013FE'
          - tagName: jailbreak
            bgColor: '#D0021B'
          - tagName: safety
            bgColor: '#4A4A4A'
    _template: benchMarks
  - titleen: Datasets
    titlezh: Datasets
    items:
      - datasetsName: CC1M-Adv-C/F
        desc: >-
          Two million-scale adversarial image datasets for large-scale
          evaluations.
        subTitle: ' Vision | Adversarial'
        link: 'https://github.com/treeman2000/CC1M-Adv-CF'
        datasetsBackground: /uploads/未标题-1.jpg
      - datasetsName: AdvT-shirt-1K
        desc: >-
          A physical-world adversarial T-shirt dataset for adversarial
          robustness evaluation.
        subTitle: Vision | Physical Attack
        link: 'https://github.com/Wwangb/AdvT-shirt-1K'
        datasetsBackground: /uploads/advtshirt.jpeg
      - datasetsName: WildDeepfake
        desc: 'A dataset of 7,314 face sequences from 707 deepfake videos. '
        subTitle: Deepfake
        link: 'https://github.com/OpenTAI/wild-deepfake'
        datasetsBackground: /uploads/wilddeepfake.jpg
      - datasetsName: VLBreakBench
        desc: A multimodal jailbreak dataset for multimodal large language models.
        subTitle: Multimodal | Jailbreak
        link: 'https://roywang021.github.io/VLBreakBench/'
        datasetsBackground: /uploads/VLBreakBench.png
      - datasetsName: Human2Robot
        desc: VR-collected human-robot aligned demonstration episodes.
        subTitle: Embodied AI
        link: 'https://arxiv.org/abs/2502.16587'
        datasetsBackground: /uploads/h2r dataset.jpg
    _template: datasets
  - titleen: Tools
    titlezh: Tools
    items:
      - name: BlackdoorLLM
        description: >-
          A comprehensive toolkit (and benchmark) for backdoor attacks on large
          language models.
        learnMore: Learn More >
        link: 'https://github.com/bboylyg/BackdoorLLM'
        img: /uploads/Tools2.png
        tagsImage:
          - img: /uploads/tag1.png
          - img: /uploads/tag2.png
          - img: /uploads/tag4.png
          - img: /uploads/tag3.png
      - name: taiadv.vision
        description: >-
          An open-source toolkit implementing state-of-the-art adversarial
          attacks and defenses for vision models.
        learnMore: Learn More >
        link: 'https://github.com/OpenTAI/taiadv'
        img: /uploads/taiadv.vision.png
        tagsImage:
          - img: /uploads/GitHubButton.png
          - img: /uploads/Python.png
          - img: /uploads/MIT.png
      - name: TextFlint
        description: >-
          A multilingual robustness evaluation toolkit for natural language
          processing. 
        learnMore: Learn More >
        link: 'https://github.com/textflint/textflint'
        img: /uploads/textflint-removebg.png
        tagsImage:
          - img: /uploads/GitHubButton.png
          - img: /uploads/arxiv.png
          - img: /uploads/tag4.png
          - img: /uploads/MIT.png
    _template: tools
  - titleen: Institutions of Our Collaborators
    titlezh: 合作单位
    items:
      - name: Fudan University
        img: /uploads/collaborators /Fudan_University.png
      - name: UniMelb
        img: /uploads/collaborators /The_University_of_Melbourne.png
      - name: Tsinghua
        img: /uploads/collaborators /Tsinghua_University.png
      - name: SMU
        img: /uploads/collaborators /Singapore_Management_University.png
      - name: UIUC
        img: /uploads/collaborators /University_of_lllinois_Urbana-Champaign2.png
      - name: Duke
        img: /uploads/collaborators /Duke_University2.png
      - name: SHJT
        img: /uploads/collaborators /Shanghai Jiao Tong University.png
      - name: Oxford
        img: /uploads/collaborators /University_of_Oxford.png
      - name: Purdue
        img: /uploads/collaborators /Purdue_University2.png
      - name: NTU
        img: /uploads/collaborators /Nanyang_Technological_University.png
      - name: UYSD
        img: /uploads/collaborators /The_University_of_Sydney.png
      - name: UoM Amherst
        img: /uploads/collaborators /University of Massachusetts Amherst.png
      - name: UC Santa Cruz
        img: '/uploads/collaborators /University of California, Santa Cruz.png'
      - name: UoWM
        img: /uploads/collaborators /University of Wisconsin - Madison.png
      - name: UoAuck
        img: /uploads/collaborators /University of Auckland.png
      - name: CISPA
        img: >-
          /uploads/collaborators /CISPA Helmholtz Center for Information
          Security2.png
      - name: CUHK
        img: /uploads/collaborators /The_Chinese_University_of_Hong_Kong2.png
      - name: Virginia Tech
        img: /uploads/collaborators /Virginia Tech logo.png
      - name: RIKEN
        img: /uploads/collaborators /RIKEN.png
      - name: CUHK-SZ
        img: '/uploads/collaborators /Chinese University of Hong Kong, Shenzhen2.png'
      - name: UoTokyo
        img: /uploads/collaborators /The_University_of_Tokyo.png
      - name: Griffith
        img: /uploads/collaborators /Griffith University New.png
      - name: HKUST
        img: >-
          /uploads/collaborators
          /Hong_Kong_University_of_Science_and_Technology.png
      - name: MBZUAI
        img: /uploads/collaborators /MBZUAI.png
    _template: partners
---

