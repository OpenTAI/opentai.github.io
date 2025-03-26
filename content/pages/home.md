---
title: OpenTAI.org
blocks:
  - titleen: News
    titlezh: 新闻
    viewMoreen: Read More >
    viewMorezh: 了解更多 >
    updates:
      - titleen: Releasing Large Model Safety Survey
        subtitleen: '#Language'
        contenten: >-
          Our latest survey "Safety at Scale: A Comprehensive Survey of Large
          Model Safety" systematically analyzes safety threats facing today's
          large AI models, covering VFMs, LLMs, VLPs, VLMs, and T2I Diffusion
          models. Our findings highlight the current landscape of AI safety
          research and the urgent need for robust safety measures and
          collaborative efforts to ensure trustworthy AI development.
        timeen: '2025 Feb 2 '
        href: 'https://github.com/xingjunm/Awesome-Large-Model-Safety'
        img: /uploads/safetysurvey.png
      - titleen: Introducing the VisionSafety Platform
        subtitleen: '#Vision'
        contenten: >-
          The safety of vision models is critical to trustworthy AI. We proudly
          launch the VisionSafety Platform—a cutting-edge initiative to
          rigorously evaluate model robustness through highly transferable
          adversarial attacks and million-scale adversarial datasets. This
          platform represents a major leap forward in securing vision-based AI
          systems against emerging threats.
        timeen: 2024 Dec 4
        href: 'https://opentai.org/VisionSafety'
        img: /uploads/visionsafety.png
      - titleen: Launching the Multimodal Safety Project
        subtitleen: '#Multimodal'
        contenten: >-
          The rise of multimodal AI presents significant new risks. In response,
          we are launching the Multimodal Safety Research Project, which aims to
          drive community-led research on securing multimodal AI systems. This
          initiative seeks not only to build safe and secure multimodal models
          but also to develop techniques that prevent these systems from being
          misused or turning harmful.
        timeen: 2024 March 20
        img: /uploads/latestUpdates2.png
    _template: updates
  - title: Our Mission
    body: >
      OpenTAI is an open-source research platform where global communities
      collaborate to advance Trustworthy AI – developing safe, equitable, and
      transformative AI for humanity's benefit.
    _template: content
  - titleen: Research
    titlezh: Research
    items:
      - projectName: Multimodal Jailbreak Defense
        projectDescription: >-
          Leveraging reinforcement learning to train a defensive suffix
          generator to safeguard VLMs against multimodal jailbreak inputs.
        projectReadMore: Learn More >
        link: 'https://vinsonzyh.github.io/BlueSuffix-website.github.io/'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Multimodal Jailbreak Attack
        projectDescription: >-
          Exploring text-image dual optimization to craft more powerful
          white-box jailbreak attacks against vision-language models.
        projectReadMore: Learn More >
        link: 'https://github.com/roywang021/UMK'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Red Teaming VLMs
        projectDescription: >-
          Jailbreaking VLMs using themselves, with the assistance of
          text-to-image diffusion models.
        projectReadMore: Learn More >
        link: 'https://github.com/roywang021/IDEATOR'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Backdoor Data Detection
        projectDescription: >-
          Developing simple but effective backdoor data detection and filtering
          methods for real-world large-scale datasets.
        projectReadMore: Learn More >
        link: 'https://hanxunh.github.io/Detect-CLIP-Backdoor-Samples/'
        projectIcon: /uploads/projectIcon1.png
      - projectName: Fairness Benchmark
        projectDescription: >-
          Developing a comprehensive scenario-based benchmark for fairness
          evaluations across multilingual, multicultural, and multimodal
          contexts.
        projectReadMore: Learn More >
        link: ''
        projectIcon: /uploads/projectIcon1.png
      - projectName: Auto Safety Arena
        projectDescription: >-
          Building an open platform for automated safety evaluation of LLMs
          against themselves.
        projectReadMore: Learn More >
        link: ''
        projectIcon: /uploads/projectIcon1.png
    _template: project
  - titleen: Benchmarks
    titlezh: 安全评测基准
    items:
      - benchMarkName: VisionSafety
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
      - benchMarkName: LanguageSafety
        description: >-
          Working on an open platform for comprehensive LLM safety evaluation.
          Featuring: (1) Configurable human intervention templates; (2)
          Automated adversarial testing where LLMs debate to uncover hidden
          vulnerabilities. Coming soon—stay tuned!
        subTitle: 'An Automated Safety Evaluation Platform for Language Models '
        learnMore: Learn More >
        benchMarksImg: /uploads/language icon.png
        tags:
          - tagName: language
            bgColor: '#F5A623'
          - tagName: safety
            bgColor: '#2C65A8'
          - tagName: automatic
            bgColor: '#417505'
      - benchMarkName: MultimodalSafety
        description: >-
          An open platform for automated safety evaluation of vision-language
          models, featuring black-box testing and adversarial frameworks to
          assess vulnerabilities against text, image, and multimodal jailbreak
          prompts. Coming soon—stay tuned!
        subTitle: A safety evaluation platform for vision-language models
        learnMore: Learn More >
        benchMarksImg: /uploads/vision language icon.png
        tags:
          - tagName: multimodal
            bgColor: '#8B572A'
          - tagName: jailbreak
            bgColor: '#9013FE'
          - tagName: automatic
            bgColor: '#417505'
    _template: benchMarks
  - titleen: Datasets
    titlezh: Datasets
    items:
      - datasetsName: VLBreakBench
        desc: A multimodal jailbreak dataset for multimodal large language models.
        subTitle: Multimodal | Jailbreak
        link: 'https://roywang021.github.io/VLBreakBench/'
        datasetsBackground: /uploads/VLBreakBench.png
      - datasetsName: CC1M-Adv-C/F
        desc: >-
          Two million-scale adversarial image datasets for large-scale
          evaluations.
        subTitle: ' Vision | Adversarial'
        link: 'https://github.com/treeman2000/CC1M-Adv-CF'
        datasetsBackground: /uploads/cc1m adv.png
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
        datasetsBackground: /uploads/wilddeepfake.png
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
          - img: /uploads/tag3.png
          - img: /uploads/tag4.png
      - name: taiadv.vision
        description: >-
          An open-source toolkit implementing state-of-the-art adversarial
          attacks and defenses for vision models.
        learnMore: Learn More >
        link: 'https://github.com/OpenTAI/taiadv'
        img: /uploads/BenchMarks2.png
        tagsImage: []
      - name: BlackdoorVLM
        description: >-
          A toolkit (and benchmark) for backdoor attacks on vision-language
          models. Coming soon—stay tuned!
        learnMore: Learn More >
        img: /uploads/backdoorVLM.png
        tagsImage:
          - img: /uploads/tag4.png
          - img: /uploads/tag3.png
    _template: tools
  - titleen: Collaborating Institutions
    titlezh: 合作单位
    items:
      - name: Fudan University
        img: ''
      - name: Fudan University
        img: ''
      - name: Purdue
        img: /uploads/collaborators /Purdue_University.png
      - name: UoM Amherst
        img: /uploads/collaborators /University of Massachusetts Amherst.png
      - name: CISPA
        img: >-
          /uploads/collaborators /CISPA Helmholtz Center for Information
          Security.png
      - name: Virginia Tech
        img: /uploads/collaborators /Virginia Tech logo.png
      - name: Tsinghua
        img: /uploads/collaborators /Tsinghua_University.png
      - name: Sea AI Lab
        img: /uploads/collaborators /sea_AI_lab.png
      - name: UC Santa Cruz
        img: '/uploads/collaborators /University of California, Santa Cruz.png'
      - name: Griffith
        img: /uploads/collaborators /Griffith University New.png
      - name: UYSD
        img: /uploads/collaborators /The_University_of_Sydney.png
      - name: SHJT
        img: /uploads/collaborators /Shanghai Jiao Tong University.png
      - name: CUHK-SZ
        img: '/uploads/collaborators /Chinese University of Hong Kong, Shenzhen.png'
      - name: Oxford
        img: /uploads/collaborators /University_of_Oxford.png
      - name: UoTokyo
        img: /uploads/collaborators /The_University_of_Tokyo.png
      - name: MBZUAI
        img: /uploads/collaborators /MBZUAI.png
      - name: RIKEN
        img: /uploads/collaborators /RIKEN.png
      - name: UoAuck
        img: /uploads/collaborators /University of Auckland.png
      - name: NTU
        img: /uploads/collaborators /Nanyang_Technological_University.png
      - name: UniMelb
        img: /uploads/collaborators /The_University_of_Melbourne.png
      - name: SMU
        img: /uploads/collaborators /Singapore_Management_University.png
      - name: HKUST
        img: >-
          /uploads/collaborators
          /Hong_Kong_University_of_Science_and_Technology.png
      - name: CUHK
        img: '/uploads/collaborators /Chinese University of Hong Kong, Shenzhen.png'
      - name: ByteDance
        img: /uploads/collaborators /ByteDance.svg.png
    _template: partners
  - titleen: Contributors
    titlezh: Contributors
    items:
      - name: Yu-Gang Jiang
      - name: Xingjun Ma
      - name: Zuxuan Wu
      - name: Hanxun Huang
      - name: Yige Li
      - name: Xiang Zheng
      - name: Jiaming Zhang
      - name: Weijie Zheng
      - name: Yong Xie
      - name: Yifeng Gao
      - name: Bojia Zi
      - name: Zhixiang Wang
      - name: Xin Wang
      - name: Yunhao Chen
      - name: Henyuan Xu
      - name: Yifan Ding
      - name: Kun Zhai
      - name: Ruofan Wang
      - name: Juncheng Li
      - name: Teng Li
      - name: Zhenyun Yin
    _template: contributors
---

