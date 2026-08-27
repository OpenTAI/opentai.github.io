export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const normalized = href === "/" ? "" : href.replace(/\/$/, "");
  return locale === "zh" ? `/zh${normalized || ""}` : normalized || "/";
}

export function switchLocaleHref(pathname: string, locale: Locale) {
  const withoutLocale = pathname === "/zh" ? "/" : pathname.replace(/^\/zh(?=\/)/, "");
  return localizeHref(locale, withoutLocale);
}

const ZH: Record<string, string> = {
  "The Open Hub for Trustworthy AI": "可信人工智能开放枢纽",
  "An open ecosystem connecting trustworthy AI research, innovation, and startups.":
    "连接可信人工智能研究、创新与初创企业的开放生态。",
  "Skip to content": "跳到主要内容",
  Home: "首页",
  Resources: "资源",
  Evaluation: "评测",
  Ecosystem: "生态",
  Discover: "发现",
  Benchmarks: "评测基准",
  Models: "模型",
  Datasets: "数据集",
  Tools: "工具",
  Papers: "论文",
  Leaderboard: "排行榜",
  Leaderboards: "排行榜",
  "Open trustworthiness and safety leaderboards for LLMs, Agents, and Embodied AI.":
    "面向大语言模型、智能体和具身智能的开放可信与安全排行榜。",
  Frameworks: "框架",
  Arenas: "竞技场",
  "Safety Arenas": "安全竞技场",
  Companies: "企业",
  "Coming soon": "即将开放",
  Community: "社区",
  "OpenTAI Community": "OpenTAI 社区",
  "Building Trustworthy AI, Together": "共同建设可信人工智能",
  Contribute: "参与贡献",
  "Contribute To OpenTAI": "参与 OpenTAI",
  "Choose an area and open a GitHub issue to start a source-reviewed contribution.":
    "选择一个方向并创建 GitHub Issue，开始一项需要来源审核的贡献。",
  "Get Involved": "参与其中",
  "How would you like to contribute?": "您希望如何参与贡献？",
  "Research & Papers": "研究与论文",
  "Recommend or organize trustworthy AI research with a public paper or primary source.":
    "推荐或整理可信人工智能研究，并提供公开论文或一手来源。",
  "Models & Datasets": "模型与数据集",
  "Submit or improve source-backed model and dataset records.":
    "提交或完善有来源支持的模型与数据集记录。",
  "Benchmarks & Evaluation": "评测基准与评估",
  "Add reproducible benchmarks, metrics, or verified evaluation results.":
    "添加可复现的评测基准、指标或已核验的评估结果。",
  "Tools & Resources": "工具与资源",
  "Recommend open-source safety tools, frameworks, and practical resources.":
    "推荐开源安全工具、框架与实用资源。",
  "Website & Development": "网站与开发",
  "Improve the website, fix a bug, or propose a focused pull request.":
    "改进网站、修复问题，或提出目标明确的 Pull Request。",
  "Help with events, documentation, translation, or community operations.":
    "协助活动、文档、翻译或社区运营。",
  "Submit contribution": "提交贡献",
  "Every submission opens a GitHub issue and is reviewed before it becomes part of OpenTAI.":
    "每次提交都会创建 GitHub Issue，并在成为 OpenTAI 内容前接受审核。",
  About: "关于",
  Contact: "联系方式",
  "Current site": "当前网站",
  "Contact Us": "联系我们",
  "Research & Evaluation": "研究与评测",
  "Terms & Policies": "条款与政策",
  "Privacy Notice": "隐私说明",
  "Inclusion & Attribution": "收录与归属",
  "Corrections & Takedown": "纠错与下架",
  "Governance (draft)": "治理（草案）",
  "Contributing (draft)": "参与贡献（草案）",
  "Citation (draft)": "引用说明（草案）",
  "OpenTAI contact": "OpenTAI 联系",
  "Close contact form": "关闭联系表单",
  "This form opens your email app and sends no data through the website.":
    "此表单仅会打开您的邮件应用，网站不会接收或保存内容。",
  "Your name": "您的姓名",
  "Your email": "您的邮箱",
  Subject: "主题",
  Message: "正文",
  "Enter a valid email address.": "请输入有效的邮箱地址。",
  "Open email app": "打开邮件应用",
  "Open navigation": "打开导航菜单",
  "Close navigation": "关闭导航菜单",
  English: "English",
  Chinese: "中文",
  "open resources, one index": "项开放资源，一个索引",
  "OpenTAI — The": "OpenTAI —",
  "Open Hub": "开放枢纽",
  "For Trustworthy AI": "可信人工智能",
  "Search all OpenTAI resources": "搜索 OpenTAI 全部资源",
  "Search papers, benchmarks, models, datasets...":
    "搜索论文、评测基准、模型和数据集……",
  "Trustworthy AI research across LLMs, Agents, and Embodied AI.":
    "覆盖大语言模型、智能体与具身智能的可信 AI 研究。",
  resources: "项资源",
  papers: "篇论文",
  paper: "篇论文",
  entry: "项",
  entries: "项",
  "Nothing matches": "暂无匹配结果：",
  "Research Library": "研究论文库",
  "Paper Statistics": "论文统计",
  "Papers By Year": "按年份统计论文",
  "Papers By Domain": "按领域统计论文",
  "Annual count of papers with a recorded year.": "按已记录年份统计每年的论文数量。",
  link: "链接",
  Trending: "热门资源",
  Releases: "发布",
  Mobile: "移动端",
  "Computer-use": "计算机操作",
  CLI: "命令行",
  "Interaction environment": "交互环境",
  "All environments": "全部环境",
  "Filter resources by interaction environment": "按交互环境筛选资源",
  "All →": "全部 →",
  "Browse The Hub": "浏览资源中心",
  "Your Daily Digest Of AI Safety": "你的每日人工智能安全简报",
  "Stay up to date with the latest AI safety research and news, curated from arXiv and leading media sources and delivered straight to your inbox.":
    "及时掌握最新人工智能安全研究与资讯，内容精选自 arXiv 和领先媒体，并直接发送到你的邮箱。",
  "Digest language": "简报语言",
  "Email address": "邮箱地址",
  Subscribe: "订阅",
  "Opens your email app. Your address is not stored by OpenTAI.":
    "将打开你的邮件应用；OpenTAI 不会存储你的邮箱地址。",
  Entries: "条目",
  Domains: "领域",
  Surveys: "综述",
  Categories: "分类",
  "Published venues": "已记录发表场所",
  Links: "链接",
  "Year range": "年份范围",
  "GitHub sources": "GitHub 来源",
  "Verified links": "已核实链接",
  "Recorded downloads": "已记录下载量",
  "Recorded stars": "已记录星标",
  "Scored entries": "评分记录",
  Boards: "榜单",
  "Source links": "来源链接",
  "Submit Your Benchmark": "提交评测基准",
  "Submit Your Dataset": "提交数据集",
  "Submit Your Arena": "提交竞技场",
  "Propose a Challenge": "提议赛题",
  "Submit Your Paper": "提交论文",
  "Suggest a Benchmark": "推荐评测基准",
  "Suggest a Dataset": "推荐数据集",
  "Suggest An Arena": "推荐竞技场",
  "Propose an Arena Challenge": "提议竞技场赛题",
  "Suggest a Paper": "推荐论文",
  "Help us find a verified public resource.": "帮助我们发现可核验的公开资源。",
  "Share your dataset with the OpenTAI community": "与 OpenTAI 社区分享您的数据集",
  "Share your benchmark with the OpenTAI community": "与 OpenTAI 社区分享您的评测基准",
  "Share your arena with the OpenTAI community": "与 OpenTAI 社区分享您的竞技场",
  "Bring a reproducible safety challenge to the OpenTAI community":
    "向 OpenTAI 社区提交可复现的安全赛题",
  "Share your latest research with the community.": "与社区分享您的最新研究。",
  "Community submission": "社区提交",
  "Close submission form": "关闭提交表单",
  "Submissions open a GitHub issue for source review before inclusion.":
    "提交后会创建 GitHub Issue；资源须经来源核验后才会收录。",
  Name: "名称",
  "Dataset Name": "数据集名称",
  "Benchmark Name": "评测基准名称",
  "Arena Name": "竞技场名称",
  "Paper Title": "论文标题",
  "Paper Link": "论文链接",
  "GitHub Link (optional)": "GitHub 链接（选填）",
  "Link (optional)": "链接（选填）",
  "GitHub Link": "GitHub 链接",
  "This field is required.": "此项必填。",
  "Enter a four-digit year.": "请输入四位年份。",
  "Enter a valid public URL.": "请输入有效的公开网址。",
  "Enter a GitHub repository URL.": "请输入 GitHub 仓库网址。",
  Cancel: "取消",
  "Continue on GitHub": "前往 GitHub",
  "Open links": "打开链接菜单",
  "Available links": "可用链接",
  "View details": "查看详情",
  "Open dataset": "打开数据集",
  "Citing papers": "引用论文",
  Evidence: "证据",
  "Filter datasets by domain": "按领域筛选数据集",
  "Dataset Statistics": "数据集统计",
  "Benchmark Statistics": "评测基准统计",
  "Datasets By Domain": "按领域统计",
  "Datasets by year": "按年份统计",
  "Dataset Growth By Year": "数据集年度增长",
  "Benchmark Growth By Year": "评测基准年度增长",
  "Annual count of datasets with a recorded year.": "按已记录年份统计每年的数据集数量。",
  "Annual count of benchmarks with a recorded year.": "按已记录年份统计每年的评测基准数量。",
  "Benchmarks By Domain": "按领域统计评测基准",
  "Recorded domain assignments in this collection.": "此集合中已记录的领域归属。",
  "Usage frequency": "使用频次",
  "Datasets grouped by their recorded usage count.": "按已记录的使用次数对数据集分组。",
  datasets: "数据集",
  benchmarks: "评测基准",
  recorded: "已记录",
  "No usage data recorded": "暂无已记录的使用数据",
  "No recorded year data": "暂无已记录的年份数据",
  "Automatically updated": "自动更新",
  "Calculated from the verified training datasets below.":
    "根据下方已核实的训练数据集自动计算。",
  "Calculated from the verified benchmarks below.":
    "根据下方已核实的评测基准自动计算。",
  "Open-source safety datasets for training safer LLMs, Agents, and Embodied AI models.":
    "用于训练更安全的大语言模型、智能体和具身智能模型的开源安全数据集。",
  "Sort by": "排序方式",
  "Default order": "默认顺序",
  "Downloads: high to low": "下载量：从高到低",
  "Downloads: low to high": "下载量：从低到高",
  "GitHub stars: high to low": "GitHub 星标：从高到低",
  "GitHub stars: low to high": "GitHub 星标：从低到高",
  "Year: newest first": "年份：从新到旧",
  "Year: oldest first": "年份：从旧到新",
  "training data": "训练数据",
  "source: approved survey": "来源：指定综述",
  "100K prompts and responses": "10 万条提示与回复",
  "939 instructions with model responses": "939 条指令及模型回复",
  "34K samples": "3.4 万条样本",
  "30K multi-turn conversations": "3 万条多轮对话",
  "10,000 fully annotated clips": "1 万段完整标注片段",
  "The official repository says this 100K prompt-response collection is more suitable for training and fine-tuning safer models, and publishes it through GitHub and the Hugging Face datasets loader.":
    "官方仓库说明，这组 10 万条提示—回复数据更适合用于训练和微调更安全的模型，并通过 GitHub 与 Hugging Face datasets 加载器公开。",
  "The primary paper reports training BERT-like safety classifiers on the released instruction and annotated model-response data; the authors publish those files under datasets/.":
    "原论文使用公开的指令与带标注模型回复训练类 BERT 安全分类器；作者在 datasets/ 目录公开了这些文件。",
  "The primary survey describes Aegis 2.0 as suitable for training commercial safety guardrails, and NVIDIA publishes separate train, validation, and test files on Hugging Face.":
    "原始综述明确说明 Aegis 2.0 适合训练商用安全护栏；NVIDIA 在 Hugging Face 分别发布了训练、验证和测试文件。",
  "The Safety at Scale Agent section and the primary X-Teaming paper explicitly identify XGuard-Train as a 30K multi-turn safety training dataset for robust safety alignment; the authors release it on Hugging Face.":
    "Safety at Scale 的 Agent 章节与 X-Teaming 原论文均明确将 XGuard-Train 定义为用于稳健安全对齐的 3 万条多轮安全训练数据；作者已在 Hugging Face 公开。",
  "The official repository and Hugging Face dataset card publish a standardized training set of 10,000 fully annotated driving clips, alongside a separate closed-loop evaluation benchmark.":
    "官方仓库与 Hugging Face 数据卡公开了包含 1 万段完整标注驾驶片段的标准训练集，并另行提供闭环评测基准。",
  Tags: "标签",
  "Project page": "项目页",
  Platform: "平台",
  Resource: "资源",
  Category: "分类",
  Activity: "活跃情况",
  "No entries yet": "暂无条目",
  "No entries match": "没有条目匹配",
  "link pending": "链接待补",
  "All domains": "全部领域",
  All: "全部",
  Research: "研究",
  Survey: "综述",
  "with links": "有链接",
  "Search the research library": "搜索研究论文库",
  "Search titles, authors, venues...": "搜索标题、作者、发表场所……",
  "No papers match": "没有论文匹配",
  "Show more": "显示更多",
  "Merged from": "合并自",
  and: "和",
  "Titles, authors and venues come from those lists. Surveys are those the embodied list files as surveys, plus titles that name themselves one.":
    "标题、作者与发表场所均来自这些清单。综述包括具身智能清单明确归为综述的论文，以及标题明确表明自身为综述的论文。",
  "Evaluation setting": "评测设置",
  "scored entries in total": "条评分记录",
  "Not built yet": "尚未建设",
  Draft: "草稿",
  "Pending confirmation by the OpenTAI team": "等待 OpenTAI 团队确认",
  "Coming to this page": "计划加入本页",
  Workshops: "研讨会",
  Challenges: "挑战赛",
  "Open projects": "开放项目",
  "Contributor directory": "贡献者名录",
  "These need content from the OpenTAI team — there is nothing on the current site to port.":
    "这些栏目需要 OpenTAI 团队提供内容；当前网站没有可迁移的素材。",
  "Rankings still to come": "待补充排行榜",
  "The boards above cover adversarial robustness only. The remaining rankings need scored submissions per benchmark before anything is published here.":
    "以上榜单仅覆盖对抗鲁棒性。其余排行榜必须先取得各评测基准的真实评分提交，才能发布。",
  "LLM Safety Ranking": "大语言模型安全排行榜",
  "Agent Safety Ranking": "智能体安全排行榜",
  "Guard Model Ranking": "防护模型排行榜",
  "Privacy Ranking": "隐私排行榜",
  "What Is Collected Here": "本站收录内容",
  "Partner Institutions": "合作机构",
  "Contributor Recognition": "贡献者致谢",
  Contributors: "贡献者",
  "OpenTAI GitHub Organization Members": "OpenTAI GitHub 组织成员",
  "View Organization Members": "查看组织成员",
  "Volunteer To Contribute": "志愿参与贡献",
  "Close contribution form": "关闭贡献表单",
  "Tell us how you would like to help. Your submission opens a GitHub issue for review.":
    "告诉我们您希望如何参与。提交后将创建一个 GitHub Issue 供公开审核。",
  "Questions? Email": "如有问题，请联系",
  "GitHub profile": "GitHub 主页",
  "Contribution area": "贡献方向",
  "Select an area": "选择贡献方向",
  "How would you like to help?": "您希望如何参与？",
  "Select a contribution area.": "请选择一个贡献方向。",
  "Enter a GitHub profile URL.": "请输入 GitHub 个人主页链接。",
  "Tell us what you would like to contribute. We will open a GitHub issue so the proposal and its sources can be reviewed in public.":
    "告诉我们您希望贡献什么。系统会创建 GitHub Issue，供社区公开审核提案及其来源。",
  "Contributor profiles will appear here after they are confirmed by the OpenTAI team.":
    "贡献者信息将在 OpenTAI 团队确认后展示于此。",
  "How resources are included": "资源收录方式",
  "Terms Of Use": "使用条款",
  "Privacy Policy": "隐私政策",
  "Request a correction or review": "申请纠错或复核",
  Governance: "治理",
  Contributing: "参与贡献",
  Citation: "引用",
  Email: "邮箱",
  "About OpenTAI": "关于 OpenTAI",
  "OpenTAI is an open platform where researchers collaborate to accelerate practical Trustworthy AI solutions. We prioritize tools, benchmarks, and platforms over papers, bridging research with real-world impact.":
    "OpenTAI 是一个开放平台，研究人员在此协作，加速可信人工智能解决方案的实际落地。我们优先关注工具、评测基准和平台，并通过论文资源连接研究与现实影响。",
  "Every entry links to a public artefact — a repository, a dataset, a paper, or an evaluation platform. Nothing is listed on a description alone.":
    "每个条目都链接到公开成果——代码仓库、数据集、论文或评测平台；不会仅凭一段描述进行收录。",
  "Repository activity, author lists, and download counts are read from the GitHub, arXiv, and Hugging Face APIs rather than typed in by hand.":
    "代码仓库活跃度、作者名单和下载量均来自 GitHub、arXiv 与 Hugging Face API，而不是手工录入。",
  "A publication venue is only shown when it appears in the project's own repository description or arXiv comment.":
    "只有项目自身的仓库描述或 arXiv 备注明确写出发表场所时，本站才会显示。",
  "A resource is matched to a repository only when its name appears in that repository's name or description.":
    "只有资源名称出现在代码仓库名称或描述中时，才会将二者匹配。",
  "Fields that cannot be verified are left visibly empty. The site never fills a gap with a plausible-looking placeholder.":
    "无法核验的字段会明确留空；本站绝不会用看似合理的占位内容填补缺口。",
  "Original authors, organizations, repositories, papers, and licences remain attributed to their primary sources.":
    "原作者、组织、代码仓库、论文和许可证均保留其第一手来源的归属信息。",
  "Listing a resource does not mean that OpenTAI endorses it, certifies it, or owns it.":
    "收录某项资源并不代表 OpenTAI 为其背书、认证或拥有该资源。",
  "This policy describes the source-review rules currently used by OpenTAI and remains subject to OpenTAI team review.":
    "本政策描述 OpenTAI 当前采用的来源审核规则，仍需由 OpenTAI 团队审阅确认。",
  "The text below describes how the platform currently operates. Decision-making, maintainer roles, and the process for accepting new resources still need to be confirmed and written by the OpenTAI team.":
    "以下文字描述平台当前的运行方式。决策机制、维护者职责和新资源接纳流程仍需由 OpenTAI 团队确认并撰写。",
  "These routes are a proposal. The team needs to decide where suggestions are filed and who reviews them.":
    "以下渠道仅为提案。团队仍需决定建议提交到哪里，以及由谁审核。",
  "Placeholder citation. If the platform has an accompanying paper, or the team prefers a different author line, replace this entry.":
    "以下引用为占位内容。如果平台有配套论文，或团队希望使用不同的作者署名，需要替换此条目。",
  "This is a working draft for review by the OpenTAI team. It is not a final legal policy.":
    "这是供 OpenTAI 团队审核的工作草案，并非最终法律政策。",
  "OpenTAI is a source-linked research index and navigation service. It does not own the third-party papers, datasets, models, code, companies, or evaluation platforms that it links to.":
    "OpenTAI 是一个带有来源链接的研究索引与导航服务，并不拥有其链接的第三方论文、数据集、模型、代码、公司资料或评测平台。",
  "Third-party resources remain governed by their original terms, licences, and policies. Check the primary source before downloading, reusing, citing, or relying on a resource.":
    "第三方资源仍受其原始条款、许可证和政策约束；下载、复用、引用或依赖资源前，请先核对第一手来源。",
  "Indexed information is provided for research and educational use and may be incomplete, delayed, or changed by its original source.":
    "索引信息用于研究与教育用途，可能不完整、存在延迟，或已被原始来源修改。",
  "A listing is not an endorsement, certification, partnership, or guarantee of safety, quality, accuracy, or availability.":
    "收录不构成背书、认证、合作关系，也不保证资源的安全性、质量、准确性或可用性。",
  "OpenTAI currently does not require user accounts and does not accept form submissions through its own server.":
    "OpenTAI 目前不要求用户注册账户，也不通过自身服务器接收表单提交。",
  "Contact and submission actions open your email application or GitHub. Information you choose to send is handled by those services under their own privacy policies.":
    "联系和提交操作会打开您的邮件应用或 GitHub；您选择发送的信息将依据这些服务各自的隐私政策处理。",
  "The hosting provider may process routine technical request data, such as an IP address, browser metadata, requested URLs, and timestamps, to deliver and protect the website.":
    "托管服务商可能为提供和保护网站而处理常规技术请求数据，例如 IP 地址、浏览器元数据、请求网址和时间戳。",
  "When you follow an external link, the destination site applies its own privacy and data practices.":
    "当您访问外部链接时，目标网站适用其自身的隐私与数据处理规则。",
  "This process is a working draft for review by the OpenTAI team.":
    "本流程是供 OpenTAI 团队审阅的工作草案。",
  "Request a factual correction when an indexed name, date, affiliation, score, valuation, description, or link is contradicted by a reliable primary source.":
    "当可靠的一手来源与索引中的名称、日期、机构、分数、估值、描述或链接相矛盾时，可以申请事实纠错。",
  "Request review or removal when a listing raises a privacy, attribution, intellectual-property, safety, or broken-source concern.":
    "当条目涉及隐私、归属、知识产权、安全或来源失效问题时，可以申请复核或下架。",
  "Include the affected OpenTAI URL, the requested change, and a public primary source or other evidence that supports the request.":
    "申请中请提供相关 OpenTAI 网址、希望修改的内容，以及支持申请的公开第一手来源或其他证据。",
  "OpenTAI can correct, label, restrict, or remove an index entry after reviewing the available evidence. Removing an OpenTAI entry does not remove content from the original source.":
    "OpenTAI 可在审阅现有证据后纠正、标记、限制或移除索引条目；从 OpenTAI 移除条目不会删除原始来源中的内容。",
  "OpenTAI provides a source-linked index for research and educational use. External resources remain governed by their owners' terms, licences, and policies. Verify the primary source before relying on indexed information.":
    "OpenTAI 提供带来源链接的研究与教育资源索引。外部资源仍受其所有者的条款、许可和政策约束；使用索引信息前请核对第一手来源。",
  "OpenTAI currently does not require user accounts. Contact and submission actions open your email application or GitHub and do not send form data to an OpenTAI server. External services apply their own privacy policies.":
    "OpenTAI 目前不要求用户注册账户。联系和提交操作只会打开您的邮件应用或 GitHub，不会将表单数据发送至 OpenTAI 服务器；外部服务适用其各自的隐私政策。",
  "Suggest a resource": "推荐资源",
  "Send the name, a one-line description, and a public link.": "请提供名称、一句话描述和公开链接。",
  "Correct an entry": "纠正条目",
  "Point at the field and the source that contradicts it — corrections are applied at the data layer, not the page.":
    "请指出有误字段及与之矛盾的来源；更正会在数据层完成，而不是直接改页面。",
  "Add evaluation results": "添加评测结果",
  "Leaderboards need scored submissions with a reproducible evaluation setup.":
    "排行榜需要带有可复现评测设置的评分提交。",
  "OpenTAI is an open platform maintained by researchers across collaborating institutions. It indexes third-party open-source work alongside the collaboration's own releases. Listing a resource is not an endorsement of it, and the inclusion rules are published above so that they can be argued with.":
    "OpenTAI 是由多家合作机构的研究人员共同维护的开放平台。平台同时索引第三方开源成果和合作团队自身发布的成果。收录某项资源不代表为其背书；收录规则公开列于上方，以便讨论和质疑。",
  "Content is generated from a scripted pipeline rather than edited page by page, so every published claim can be traced back to the source it came from and refreshed when that source changes.":
    "内容通过脚本化管线生成，而不是逐页编辑，因此每一项公开陈述都能追溯到来源，并可在来源更新时重新生成。",
  "When citing an individual benchmark, model, dataset, or tool, cite that resource's own paper — every entry links to it. To cite the platform itself:":
    "引用单个评测基准、模型、数据集或工具时，请引用该资源自身的论文——每个条目都提供相应链接。引用平台本身时：",
  "institutions currently collaborate on the platform.": "家机构目前参与平台合作。",
  "DRAFT — pending confirmation": "草稿——等待确认",
  Description: "描述",
  Abstract: "摘要",
  Code: "代码",
  Repository: "代码仓库",
  Language: "语言",
  Licence: "许可证",
  Stars: "星标",
  Forks: "分叉",
  "Last push": "最近推送",
  "No public repository recorded.": "尚未记录公开代码仓库。",
  "No paper recorded for this benchmark.": "尚未记录该评测基准对应的论文。",
  "Open paper": "打开论文",
  Dataset: "数据集",
  Metrics: "指标",
  Baselines: "基线",
  "Not recorded yet.": "尚未记录。",
  "No scored submissions recorded for this benchmark yet.": "尚未记录该评测基准的评分提交。",
  "This benchmark maintains its own public leaderboard.": "该评测基准维护独立的公开排行榜。",
  "Open leaderboard": "打开排行榜",
  "Submit Your Leaderboard": "提交排行榜",
  "Suggest a Leaderboard": "推荐排行榜",
  "Leaderboard Name": "排行榜名称",
  "Leaderboard Link": "排行榜链接",
  "Verified official sources": "已核验官方来源",
  "Public leaderboard directory": "公开排行榜导航",
  "An initial source-checked index for LLMs, Agents, and Embodied AI.":
    "首批经来源核验的大语言模型、智能体与具身智能排行榜索引。",
  "Official source": "官方来源",
  "Source record": "来源记录",
  "Verified public leaderboards": "已核验公开排行榜",
  "Verified public arenas": "已核验公开竞技场",
  "Open official page": "打开官方页面",
  Metric: "指标",
  "Agent Safety": "智能体安全",
  "LLM Safety": "大语言模型安全",
  Fairness: "公平性",
  Cyber: "网络安全",
  "March 2026": "2026 年 3 月",
  "Source checked 2026-08-20": "来源核验于 2026-08-20",
  "Automated red teaming and robust refusal": "自动化红队测试与稳健拒答",
  "Jailbreak attacks and defenses": "越狱攻击与防御",
  "Prompt-injection attacks and defenses for tool-using agents": "工具调用智能体的提示注入攻击与防御",
  "Autonomous-driving proficiency and traffic infractions": "自动驾驶能力与交通违规",
  "Still Missing": "仍缺少",
  "Not recorded": "未记录",
  Source: "来源",
  "Which corpus the benchmark evaluates on, and where to download it.":
    "该评测基准使用什么语料，以及从哪里下载。",
  "The scores the benchmark reports, and how they are computed.":
    "该评测基准报告哪些分数，以及如何计算。",
  "Reference systems and their published results.": "参考系统及其已发表结果。",
  "A scored submission table for this benchmark.": "该评测基准的评分提交表。",
  "The official benchmark experiment publishes its benchmark CSV, sampled harmful prompts, synthesized attack programs and evaluation results under experiments/experiment_130_benchmark.":
    "官方评测实验在 experiments/experiment_130_benchmark 目录发布评测 CSV、抽样有害提示、合成攻击程序和评测结果。",
  "Eight safety-critical scenario templates and 100 routes, with scenario routes, models and adversarial attack templates published under safebench/scenario/scenario_data.":
    "包含 8 个安全关键场景模板和 100 条路线；场景路线、模型及对抗攻击模板发布在 safebench/scenario/scenario_data 目录。",
};

const ZH_CONTENT: Record<string, string> = {
  "Open-source safety benchmarks for evaluating LLMs, Agents, and Embodied AI.":
    "用于评测大语言模型、智能体和具身智能的开源安全评测基准。",
  "Legacy OpenTAI benchmark rows are excluded. Names, years, recorded scale, papers, and release links are shown only when the approved sources support them.":
    "已排除 OpenTAI 旧站的评测基准条目。名称、年份、记录规模、论文与发布链接仅在指定来源能够核实时显示。",
  "Evaluation benchmarks, tasks, and metrics for trustworthy AI — the layer everything else is measured against.":
    "可信人工智能的评测基准、任务与指标——衡量其他资源的基础层。",
  "Benchmarks are the flagship collection. Each entry links to its evaluation platform or repository.":
    "评测基准是本站的核心资源集合。每个条目都链接到对应的评测平台或代码仓库。",
  "Benchmark platforms": "评测基准平台",
  "Benchmark categories": "评测基准领域",
  "Safety, jailbreak and alignment evaluation for language models.":
    "面向语言模型的安全、越狱和对齐评测。",
  "Prompt injection, tool misuse and environment safety for LLM agents.":
    "面向大语言模型智能体的提示注入、工具滥用与环境安全评测。",
  "Safety evaluation for perception, planning and robot control.":
    "面向感知、规划和机器人控制的安全评测。",
  "Training-ready safety datasets across LLMs, Agents, and Embodied AI, separated from evaluation-only benchmarks.":
    "覆盖大语言模型、智能体与具身智能安全的可训练数据集，并与仅用于评测的基准严格区分。",
  "An entry appears here only when its paper or official repository explicitly supports training, fine-tuning, alignment, or classifier training. Public test data stays in Benchmarks.":
    "只有论文或官方仓库明确支持训练、微调、对齐或分类器训练的资源才会进入本页；公开测试数据仍归入评测基准。",
  "Legacy OpenTAI featured datasets are excluded. Every entry traces to an approved list and a verified public data location; follow its link for licensing terms.":
    "已排除 OpenTAI 旧站的精选数据集。每条记录都可追溯至指定清单和已核实的公开数据入口；许可条款请查看对应链接。",
  "Dataset collection": "数据集集合",
  "Dataset categories": "数据集领域",
  "Recorded scale": "记录规模",
  "Dataset name": "数据集名称",
  "Benchmark name": "评测基准名称",
  "Dataset Name": "数据集名称",
  "Benchmark Name": "评测基准名称",
  "Arena Name": "竞技场名称",
  "Year": "年份",
  "Downloads": "下载次数",
  "GitHub stars": "GitHub 星标",
  "Paper": "论文",
  "GitHub": "GitHub",
  "Hugging Face": "Hugging Face",
  "Open": "打开",
  "Not available": "暂无链接",
  "Source survey": "来源综述",
  "source: safety-at-scale": "来源：Safety at Scale",
  "source: embodied-ai-safety": "来源：Embodied AI Safety",
  "source: team-provided survey": "来源：团队提供的综述",
  "source: official benchmark dataset": "来源：官方评测数据集",
  "simulation-based benchmarks": "仿真类评测基准",
  "real-interaction benchmarks": "真实交互评测基准",
  "5 scenarios / 250 goals": "5 个场景 / 250 个目标",
  "36 tools / 144 cases": "36 个工具 / 144 个案例",
  "17 user tools / 62 attacker tools / 1,054 cases":
    "17 个用户工具 / 62 个攻击者工具 / 1,054 个案例",
  "97 tasks / 629 cases": "97 个任务 / 629 个案例",
  "110 tasks / 11 categories": "110 个任务 / 11 个类别",
  "4,000+ cases / 25 types": "4,000 多个案例 / 25 种类型",
  "2,656 synthesized attacks recorded in Table 14": "表 14 记录的 2,656 个合成攻击",
  "569 records / 27 scenarios": "569 条记录 / 27 个场景",
  "6 scenarios / 3 stages": "6 个场景 / 3 个阶段",
  "493 seeds / vignettes / trajectories": "493 组种子、情境描述与轨迹",
  "8 scenario templates / 100 routes / 2,352 cases": "8 个场景模板 / 100 条路线 / 2,352 个案例",
  "400+ tools": "400 多个工具",
  "750 tasks": "750 个任务",
  "349 environments / 2,000 cases": "349 个环境 / 2,000 个案例",
  "222 tasks": "222 个任务",
  "84 tasks / 42 scenarios / 2 environments": "84 个任务 / 42 个场景 / 2 个环境",
  "500 safe and harmful tasks": "500 个安全及有害任务",
  "350+ multi-turn tasks": "350 多个多轮任务",
  "Datasets explicitly associated with large-language-model safety.":
    "来源明确归属于大语言模型安全的数据集。",
  "Datasets explicitly associated with agent safety.": "来源明确归属于智能体安全的数据集。",
  "Datasets for embodied perception, planning and interaction.":
    "用于具身感知、规划与交互的数据集。",
  "The dataset is published under the Allen Institute for AI account on Hugging Face.":
    "该数据集由艾伦人工智能研究所在 Hugging Face 官方账号发布。",
  "The authors' repository publishes the 100K safety prompts and responses and links its Hugging Face loader.":
    "作者仓库发布了 10 万条安全提示与回复，并提供 Hugging Face 加载方式。",
  "The authors' repository publishes the dataset used in the paper under datasets/.":
    "作者仓库在 datasets/ 目录发布了论文所用数据集。",
  "NVIDIA publishes the Aegis 2.0 train, validation, and test files on Hugging Face.":
    "NVIDIA 在 Hugging Face 发布了 Aegis 2.0 的训练集、验证集和测试集文件。",
  "Listed in the source survey's Benchmarks & Datasets section. The primary paper calls R2R the first benchmark dataset for visually-grounded natural-language navigation, and the authors' repository provides the data and evaluation code.":
    "列于来源综述的“评测基准与数据集”分区。原论文将 R2R 称为首个面向视觉落地自然语言导航的评测数据集，作者仓库提供数据与评测代码。",
  "Listed in the source survey's Benchmarks & Datasets section. The official VizWiz page publishes the dataset, challenge tasks, evaluation metrics and self-evaluation annotations.":
    "列于来源综述的“评测基准与数据集”分区。VizWiz 官方页面发布了数据集、挑战任务、评测指标和自评注释。",
  "The Embodied AI survey's dedicated Benchmarks section records 220 routes. The official repository releases the benchmark and training data.":
    "具身智能安全综述的评测基准专节记录了 220 条路线；官方仓库发布了评测基准与训练数据。",
  "The Embodied AI survey's dedicated Benchmarks section records 30,000 pick-and-place tasks across 119 household scenes.":
    "具身智能安全综述的评测基准专节记录了 119 个家庭场景中的 30,000 个拾取放置任务。",
  "The Embodied AI survey's dedicated Benchmarks section records 840,000 samples in AI2-THOR. Its bibliography cites the ACM Multimedia paper but does not record an arXiv or repository link.":
    "具身智能安全综述的评测基准专节记录了 AI2-THOR 中的 840,000 个样本；参考文献引用了 ACM Multimedia 论文，但未记录 arXiv 或仓库链接。",
  "The Embodied AI survey's dedicated Benchmarks section names EAI. The official NeurIPS paper and repository record 338 VirtualHome tasks and 100 BEHAVIOR tasks.":
    "具身智能安全综述的评测基准专节列出 EAI；NeurIPS 官方论文与仓库记录了 338 个 VirtualHome 任务和 100 个 BEHAVIOR 任务。",
  "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names AgentSafe.":
    "具身智能安全综述的安全评测基准段落列出了 AgentSafe。",
  "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names Safe-BeAI. The primary paper records 2,027 tasks across 8 hazard categories.":
    "具身智能安全综述的安全评测基准段落列出了 Safe-BeAI；原论文记录了 8 类危险中的 2,027 个任务。",
  "The Embodied AI survey's dedicated safety-focused Benchmarks paragraph names AGENTSAFE. The primary paper records 45 adversarial scenarios, 1,350 hazardous tasks, and 9,900 instructions.":
    "具身智能安全综述的安全评测基准段落列出了 AGENTSAFE；原论文记录了 45 个对抗场景、1,350 个危险任务和 9,900 条指令。",
  "The Embodied AI survey's dedicated Benchmarks subsection explicitly names SafeMindBench as a benchmark for safety risks in embodied LLM agents.":
    "具身智能安全综述的评测基准专节明确将 SafeMindBench 列为具身大语言模型智能体安全风险评测基准。",
  "The Embodied AI survey's dedicated Benchmarks subsection explicitly identifies DESPITE as a PDDL benchmark separating planning competence from safety competence.":
    "具身智能安全综述的评测基准专节明确将 DESPITE 列为区分规划能力与安全能力的 PDDL 评测基准。",
  "The Embodied AI survey's dedicated Benchmarks subsection explicitly identifies RoboJailBench as a jailbreak attack-and-defense benchmark for embodied VLMs.":
    "具身智能安全综述的评测基准专节明确将 RoboJailBench 列为具身视觉语言模型的越狱攻防评测基准。",
  "The survey table records 2024; the repository list links the later arXiv record.":
    "综述表格记录的年份为 2024；来源仓库清单链接的是此后发布的 arXiv 记录。",
  "Safety at Scale Table 14 lists AdvWeb, Dissecting Adversarial, and ARE as separate labels, but all three bibliography records resolve to arXiv:2406.12814; this card avoids triple-counting the same paper.":
    "《Safety at Scale》表 14 将 AdvWeb、Dissecting Adversarial 和 ARE 分别列名，但三条参考文献均解析到 arXiv:2406.12814；本卡片避免将同一论文重复计算三次。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official repository has a 'Download the dataset' section and publishes the benchmark task and attack files under benchmark/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方仓库设有“下载数据集”部分，并在 benchmark/ 目录发布评测任务和攻击文件。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official README calls the released cases a curated dataset; assets/all_cases.json and assets/all_toolkits.json are published in the repository.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方 README 将已发布案例称为精选数据集；仓库中提供 assets/all_cases.json 和 assets/all_toolkits.json。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official README's Dataset section identifies the user, attacker and test-case files published under data/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方 README 的 Dataset 部分列明了 data/ 目录中的用户、攻击者和测试案例文件。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official package publishes its benchmark suites, environments and injection vectors under src/agentdojo/data/suites/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方软件包在 src/agentdojo/data/suites/ 目录发布评测套件、环境和注入向量。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official repository links this Hugging Face dataset as the dataset used for evaluation.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方仓库将此 Hugging Face 数据集列为评测所用数据集。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official repository calls RedCode a large-scale dataset and publishes RedCode-Exec and RedCode-Gen under dataset/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方仓库将 RedCode 称为大规模数据集，并在 dataset/ 目录发布 RedCode-Exec 和 RedCode-Gen。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official project describes an associated dataset of synthesized jailbreak attacks for LLM safety and publishes the benchmark CSV data under experiments/experiment_130_benchmark/data/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方项目说明其配套数据集由面向大语言模型安全的合成越狱攻击组成，并在 experiments/experiment_130_benchmark/data/ 目录发布评测 CSV 数据。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official README documents the R-Judge dataset distribution and the repository publishes its interaction records under data/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方 README 记录了 R-Judge 数据集分布，仓库在 data/ 目录发布交互记录。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official repository is labelled as data for the paper, records the data release, and publishes the scenario JSON files under data/.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方仓库标明其为论文数据，记录了数据发布时间，并在 data/ 目录发布场景 JSON 文件。",
  "Listed in Safety at Scale Table 14 under Simulation-based Benchmarks. The official README's Dataset section links this Hugging Face dataset and also identifies data/main_data.json in the repository.":
    "列于《Safety at Scale》表 14 的仿真类评测基准。官方 README 的 Dataset 部分链接此 Hugging Face 数据集，并同时列明仓库中的 data/main_data.json。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official documentation states that scenario_data stores the routes, scenario models and adversarial attack templates used by the benchmark.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方文档说明 scenario_data 保存评测使用的路线、场景模型和对抗攻击模板。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official repository states that it releases code and data, and publishes the agent task records under data/.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方仓库声明发布代码和数据，并在 data/ 目录提供智能体任务记录。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official README explicitly describes a 750-task dataset and links the four released task splits under dataset/.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方 README 明确描述了包含 750 个任务的数据集，并链接 dataset/ 目录下四个已发布任务划分。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official repository release note says the data is released and links this Hugging Face dataset.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方仓库发布说明确认数据已发布，并链接此 Hugging Face 数据集。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official repository links this resource with its Hugging Face Dataset badge.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方仓库通过 Hugging Face Dataset 徽章链接此数据集。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official README identifies experiment_config.raw.json as the benchmark data and states that it is licensed for benchmarking purposes.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方 README 将 experiment_config.raw.json 标明为评测数据，并说明其许可用途为基准评测。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official repository links this Hugging Face dataset and documents its safe.json and harm.json task splits.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方仓库链接此 Hugging Face 数据集，并记录 safe.json 与 harm.json 两个任务划分。",
  "Listed in Safety at Scale Table 14 under Real-interaction Benchmarks. The official repository publishes each task as a workspace with an agent instruction, environment setup and evaluator.":
    "列于《Safety at Scale》表 14 的真实交互评测基准。官方仓库将每个任务发布为一个工作区，其中包含智能体指令、环境设置和评测器。",
  "The official repository publishes the full benchmark questions and reference answers in TruthfulQA.csv.":
    "官方仓库在 TruthfulQA.csv 中发布完整的评测问题与参考答案。",
  "The official benchmark site publishes downloadable development and annotated test datasets under CC BY-SA 4.0.":
    "官方评测网站以 CC BY-SA 4.0 许可发布可下载的开发集和带标注测试集。",
  "The official GCG repository publishes the AdvBench harmful-behaviour and harmful-string CSV files under data/advbench/.":
    "GCG 官方仓库在 data/advbench/ 目录发布 AdvBench 的有害行为与有害字符串 CSV 文件。",
  "The official CValues repository publishes its safety and responsibility benchmark files under dataset/.":
    "CValues 官方仓库在 dataset/ 目录发布安全与责任评测数据文件。",
  "The official Fake Alignment repository publishes the FINE safety evaluation data as safety.jsonl together with its evaluation code.":
    "Fake Alignment 官方仓库以 safety.jsonl 发布 FINE 安全评测数据，并同时提供评测代码。",
  "The official FLAMES repository publishes its Chinese value-alignment benchmark as Flames_1k_Chinese.jsonl.":
    "FLAMES 官方仓库以 Flames_1k_Chinese.jsonl 发布中文价值对齐评测数据。",
  "The official SORRY-Bench organization publishes the benchmark prompts and human-judgment releases on Hugging Face.":
    "SORRY-Bench 官方组织在 Hugging Face 发布评测提示与人工判断数据。",
  "The official SafetyBench repository links this Hugging Face dataset and also publishes the open-source test answers under opensource_data/.":
    "SafetyBench 官方仓库链接此 Hugging Face 数据集，并在 opensource_data/ 目录发布开源测试答案。",
  "The official SALAD-Bench paper and repository release the benchmark data and evaluator; the data is published by OpenSafetyLab on Hugging Face.":
    "SALAD-Bench 官方论文与仓库发布评测数据和评测器；数据由 OpenSafetyLab 发布在 Hugging Face。",
  "The official BackdoorLLM repository publishes poisoned and clean benchmark datasets under attack/DPA/data/.":
    "BackdoorLLM 官方仓库在 attack/DPA/data/ 目录发布投毒与干净评测数据集。",
  "The official JailBreakV-28K project links this Hugging Face release containing 28,000 jailbreak text-image pairs.":
    "JailBreakV-28K 官方项目链接此 Hugging Face 数据集，其中包含 28,000 个越狱文本—图像对。",
  "The official StrongREJECT package includes loaders for its harmful-prompt datasets and documents their source licences.":
    "StrongREJECT 官方软件包提供有害提示数据集加载器，并记录数据来源许可。",
  "The official HarmBench repository publishes standard, contextual, copyright and multimodal behaviour datasets as CSV files.":
    "HarmBench 官方仓库以 CSV 文件发布标准、上下文、版权和多模态行为数据集。",
  "The official JailbreakBench package publishes JBB-Behaviors, a dataset of 200 distinct benign and misuse behaviours.":
    "JailbreakBench 官方软件包发布 JBB-Behaviors 数据集，包含 200 种不同的良性与滥用行为。",
  "The official repository publishes pairwise and Best-of-N reward-model test sets under RMB_dataset/.":
    "官方仓库在 RMB_dataset/ 目录发布奖励模型的成对比较与 Best-of-N 测试集。",
  "The official MM-SafetyBench repository publishes generated and processed multimodal safety questions under data/.":
    "MM-SafetyBench 官方仓库在 data/ 目录发布生成及处理后的多模态安全问题。",
  "The official HASARD repository publishes six vision-based safe reinforcement-learning environments and their scenario implementations.":
    "HASARD 官方仓库发布六个基于视觉的安全强化学习环境及其场景实现。",
  "standard, contextual and multimodal behaviour sets": "标准、上下文与多模态行为集",
  "200 benign and misuse behaviours": "200 种良性与滥用行为",
  "49+ real-world scenarios": "49 个以上真实场景",
  "5,040 text-image pairs / 13 scenarios": "5,040 个文本—图像对 / 13 个场景",
  "6 embodied safe-RL environments": "6 个具身安全强化学习环境",
  "Open-source trustworthy AI models — guard models, safety-aligned models, detectors, and agents.":
    "可信人工智能开源模型，包括防护模型、安全对齐模型、检测模型和智能体。",
  "Author lists and posting dates come from the arXiv API; repository activity from the GitHub API.":
    "作者名单和发布时间来自 arXiv API，代码仓库活跃信息来自 GitHub API。",
  "Open models": "开源模型",
  "Model categories": "模型分类",
  "Input/output classifiers that screen unsafe content.": "筛查不安全内容的输入/输出分类器。",
  "Models trained on safety preference data.": "使用安全偏好数据训练的模型。",
  "Agentic systems released with safety tooling.": "配套安全工具发布的智能体系统。",
  "Models that detect AI-generated or manipulated media.": "检测 AI 生成或篡改媒体的模型。",
  "Open generative models released with the platform.": "随平台发布的开源生成模型。",
  "Grounded and multi-turn video understanding models.": "支持指代定位与多轮交互的视频理解模型。",
  "Libraries, frameworks, evaluation tools, and attack/defense toolkits for trustworthy AI research.":
    "面向可信人工智能研究的库、框架、评测工具和攻防工具包。",
  "All toolkits are installable from their public repositories. Stars, language, and last-push dates are read from the GitHub API.":
    "所有工具包均可从公开代码仓库安装；星标数、编程语言和最近推送时间来自 GitHub API。",
  "Open-source toolkits": "开源工具包",
  "Tool categories": "工具分类",
  "Backdoor attack and defense toolkits.": "后门攻击与防御工具包。",
  "Attack and defense libraries for vision models.": "视觉模型攻防库。",
  "Robustness testing across NLP tasks.": "跨自然语言处理任务的鲁棒性测试。",
  "Evaluation benchmarks, tasks, and metrics.": "评测基准、任务与指标。",
  "Guard models, safety-aligned models, detectors, agents.":
    "防护模型、安全对齐模型、检测模型与智能体。",
  "Verified data for training, fine-tuning, and safety alignment.":
    "经核实可用于训练、微调与安全对齐的数据。",
  Likes: "点赞",
  Updated: "更新",
  Posted: "发布",
  Detection: "检测",
  Generative: "生成",
  "Video Understanding": "视频理解",
  "Safety Alignment": "安全对齐",
  Backdoor: "后门",
  Adversarial: "对抗攻防",
  "Robustness Evaluation": "鲁棒性评测",
  "Preference Data": "偏好数据",
  "Detection & Forensics": "检测与取证",
  "Generative Data": "生成数据",
  "Adversarial Data": "对抗数据",
  "Red Team Data": "红队数据",
  "Vision & Multimodal": "视觉与多模态",
  "AI Detection": "AI 检测",
  "AI-Generated Video Detection Model": "AI 生成视频检测模型",
  "Video | Safety Alignment": "视频｜安全对齐",
  "Vision | GenAI": "视觉｜生成式 AI",
  "Safety | Physical-world Attack": "安全｜物理世界攻击",
  "Multimodal | Jailbreak": "多模态｜越狱",
  "Vision | Adversarial": "视觉｜对抗攻击",
  "SVG Generation Model": "SVG 生成模型",
  "Safety-aligned Video-Language Model": "安全对齐视频语言模型",
  "Multi-Turn Referential Grounded Video Chat": "多轮指代定位视频对话",
  "An Adversarial Evaluation Platform for Vision Models": "视觉模型对抗评测平台",
  "A Reward Model Benchmark for LLM Alignment Evaluation":
    "大语言模型对齐奖励模型评测基准",
  "A Multimodal Jailbreak Benchmark for Vision-Language Models":
    "视觉语言模型多模态越狱评测基准",
  "Listed in the source survey's Benchmarks & Datasets section.":
    "列于来源综述的“评测基准与数据集”分区。",
  "A large-scale preference dataset with 350K video query-response pairs generated via LLMs using safety-focused adversarial prompts.":
    "一个大规模偏好数据集，包含 35 万组由大语言模型根据安全对抗提示生成的视频问答对。",
  "AI-generated videos with fine-grained defect annotations.":
    "带有细粒度缺陷标注的 AI 生成视频。",
  "A large-scale SVG dataset with 2M SVG samples covering website icons, illustrations, graphic designs, anime character.":
    "包含 200 万个 SVG 样本的大规模数据集，覆盖网站图标、插画、平面设计与动漫角色。",
  "VR-collected human-robot aligned demonstration episodes.":
    "通过 VR 采集的人类—机器人对齐示范轨迹。",
  "A physical-world adversarial T-shirt dataset for adversarial robustness evaluation.":
    "用于对抗鲁棒性评测的物理世界对抗 T 恤数据集。",
  "A multimodal jailbreak dataset for multimodal large language models.":
    "面向多模态大语言模型的多模态越狱数据集。",
  "Two million-scale adversarial image datasets for large-scale evaluations.":
    "两个百万规模的对抗图像数据集，用于大规模评测。",
  "A dataset of 7,314 face sequences from 707 deepfake videos.":
    "由 707 个深度伪造视频中的 7,314 段人脸序列组成的数据集。",
  "A comprehensive toolkit (and benchmark) for backdoor attacks on large language models.":
    "面向大语言模型后门攻击的综合工具包（兼具评测基准）。",
  "An open-source toolkit implementing state-of-the-art adversarial attacks and defenses for vision models.":
    "实现先进视觉模型对抗攻击与防御方法的开源工具包。",
  "A multilingual robustness evaluation toolkit for natural language processing.":
    "面向自然语言处理的多语言鲁棒性评测工具包。",
  "An AI video detection model with defect categorization, temporal–spatial localization, and reasoning explanations.":
    "支持缺陷分类、时空定位和推理解释的 AI 视频检测模型。",
  "SafeVid is a framework for training safety-aligned Video Large Multimodal Models using a large-scale safety preference dataset.":
    "SafeVid 是一个使用大规模安全偏好数据训练安全对齐视频多模态大模型的框架。",
  "OmniSVG is a unified SVG generation model that leverages VLMs to generate high-quality and complex SVGs.":
    "OmniSVG 是一个统一的 SVG 生成模型，利用视觉语言模型生成高质量复杂 SVG。",
  "SAMA is a multi-turn referential grounded video chat model that advances fine-grained spatio-temporal understanding in videos by jointly tackling video referring understanding, grounding, and multi-turn dialogue.":
    "SAMA 是一个多轮指代定位视频对话模型，通过联合处理视频指代理解、定位和多轮对话，提升细粒度视频时空理解能力。",
  "Our open-source platform provides datasets, algorithms, and tools for scalable adversarial evaluation of vision models. Now available for community use - we welcome your feedback and contributions!":
    "我们的开源平台为视觉模型的可扩展对抗评测提供数据集、算法和工具。平台现已面向社区开放，欢迎反馈与贡献。",
  "A reward model benchmark for evaluating the effectiveness of alignment in large language models. The benchmark consists of 49 real-world scenarios and both pairwise and Best-of-N (BoN) evaluations.":
    "用于评估大语言模型对齐效果的奖励模型评测基准，包含 49 个真实场景，以及成对比较和 Best-of-N（BoN）两类评测。",
  "VLBreakBench evaluates VLMs through two tiers: a base set (1 jailbreak pair per query) and a challenge set (3 pairs per query), covering 12 safety topics and 46 subcategories (916 harmful queries), totaling 3,654 jailbreak samples.":
    "VLBreakBench 通过两级数据评测视觉语言模型：基础集每个查询含 1 组越狱样本，挑战集每个查询含 3 组；覆盖 12 个安全主题、46 个子类和 916 个有害查询，共计 3,654 个越狱样本。",
  "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming and Robust Refusal":
    "HarmBench：用于自动化红队测试与稳健拒答的标准化评测框架",
  "A Dynamic Environment to Evaluate Attacks and Defenses for LLM Agents.":
    "用于评测大语言模型智能体攻防方法的动态环境。",
  "Official github repo for SafetyBench, a comprehensive benchmark to evaluate LLMs' safety. [ACL 2024]":
    "SafetyBench 官方 GitHub 仓库；这是一个综合评测大语言模型安全性的基准。[ACL 2024]",
  "A hierarchical and comprehensive safety benchmark for large language models":
    "面向大语言模型的分层综合安全评测基准",
  "Benchmarking indirect prompt injections in tool-integrated large language model agents":
    "评测工具集成大语言模型智能体中的间接提示注入",
  "Risky code execution and generation benchmark for code agents":
    "面向代码智能体的高风险代码执行与生成评测基准",
  "Visual prompt injection attacks for computer-use agents":
    "面向计算机操作智能体的视觉提示注入攻击",
  "A benchmark for measuring harmfulness of llm agents":
    "衡量大语言模型智能体危害性的评测基准",
  "Benchmarking safety risk awareness for llm agents":
    "评测大语言模型智能体的安全风险意识",
  "Benchmarking llm safety on chemistry domain": "评测大语言模型在化学领域的安全性",
  "Unveiling safety issues of large language models in tool learning across three stages":
    "揭示大语言模型工具学习三个阶段中的安全问题",
  "Evaluating privacy norm awareness of language models in action":
    "评测语言模型在行动中的隐私规范意识",
  "A benchmarking platform for safety evaluation of autonomous vehicles":
    "用于自动驾驶车辆安全评测的基准平台",
  "Formalizing and benchmarking attacks and defenses in llm-based agents":
    "形式化并评测大语言模型智能体的攻击与防御",
  "A benchmark for safe task planning of embodied llm agents":
    "面向具身大语言模型智能体安全任务规划的评测基准",
  "Evaluating the safety of llm agents": "评测大语言模型智能体的安全性",
  "Dissecting adversarial robustness of multimodal lm agents":
    "剖析多模态语言模型智能体的对抗鲁棒性",
  "A benchmark for evaluating safety and trustworthiness in web agents":
    "用于评测 Web 智能体安全性与可信性的基准",
  "An ecosystem for sandboxing safety risks in human-ai interactions":
    "用于隔离人机交互安全风险的沙箱生态系统",
  "Benchmarking web agent security against prompt injection attacks":
    "评测 Web 智能体抵御提示注入攻击的安全性",
  "Refusal-trained llms are easily jailbroken as browser agents":
    "经过拒答训练的大语言模型作为浏览器智能体时仍容易被越狱",
  "Evaluating the safety of autonomous web agents": "评测自主 Web 智能体的安全性",
  "A comprehensive framework for evaluating real-world ai agent safety":
    "用于评测真实世界 AI 智能体安全性的综合框架",
  "Evaluating llm safety generalization across diverse tasks and prompt types":
    "评测大语言模型在不同任务与提示类型上的安全泛化能力",
  "Benchmarking and defending against indirect prompt injection attacks on large language models":
    "评测并防御大语言模型中的间接提示注入攻击",
  "Identifying the risks of lm agents with an lm-emulated sandbox":
    "使用语言模型模拟沙箱识别语言模型智能体风险",
  "The linked repository OpenTAI/VisionSafety contains the platform's website, not the evaluation code.":
    "所链接的 OpenTAI/VisionSafety 仓库包含平台网站代码，而不是评测代码。",
  "The project page linked from the current OpenTAI site returns 404, and no repository under this name could be verified. Metrics, baselines and code are unavailable until the team provides a working source.":
    "OpenTAI 当前网站链接的项目页返回 404，且无法核验同名代码仓库。在团队提供有效来源前，指标、基线和代码均不可用。",
  "An evolving repository of submitted jailbreak artifacts — adversarial prompts from prior attacks — so new algorithms can be compared against a stable reference.":
    "一个持续更新的越狱样本库，收录既有攻击提交的对抗提示，使新算法能够与稳定参照进行比较。",
  "JBB-Behaviors — 200 distinct benign and misuse behaviours, curated with reference to OpenAI's usage policies and partly sourced from AdvBench and HarmBench. The paper describes the original 100-behaviour misuse set.":
    "JBB-Behaviors 包含 200 种互不重复的正常与滥用行为，依据 OpenAI 使用政策整理，部分来自 AdvBench 和 HarmBench；论文描述的是最初包含 100 种滥用行为的数据集。",
  "Harmful behaviours grouped into standard, contextual and copyright categories, evaluated against both text and multimodal models. HarmBench 1.0 additionally ships precomputed test cases and adversarial training code.":
    "有害行为分为标准、情境和版权三类，并同时评测文本模型与多模态模型。HarmBench 1.0 还提供预计算测试用例与对抗训练代码。",
  "97 realistic agent tasks — managing an email client, navigating e-banking, making travel bookings — together with 629 security test cases. Organised into suites such as workspace, and designed to be extended rather than frozen.":
    "包含 97 个真实智能体任务（如管理邮件客户端、使用网上银行和预订旅行）及 629 个安全测试用例；按 workspace 等套件组织，并设计为可持续扩展。",
  "5,040 text-image pairs across 13 scenarios, from illegal activity and hate speech through to legal, financial, and health advice. Each question comes in three image variants: a Stable Diffusion image, a typographic image, and a combined SD+typography image. A tiny subset list is provided to reduce evaluation cost.":
    "包含 13 类场景下的 5,040 组图文对，覆盖违法活动、仇恨言论以及法律、金融和健康建议。每个问题提供 Stable Diffusion 图像、文字排版图像和二者组合图像三种变体，并提供小规模子集以降低评测成本。",
  "Over 49 real-world scenarios split across helpfulness and harmlessness goals, shipped in the repository's RMB_dataset directory as pairwise and Best-of-N test sets.":
    "超过 49 个真实场景，分别覆盖有用性与无害性目标；以成对比较和 Best-of-N 测试集形式发布在仓库的 RMB_dataset 目录中。",
  "11,435 multiple-choice questions across 7 categories of safety concern, in both Chinese and English. A Chinese subset downsamples 300 questions per category with highly sensitive keywords removed. Five worked examples per category are provided for few-shot prompting. Test answers were fully open-sourced in July 2025.":
    "包含中英文共 11,435 道选择题，覆盖 7 类安全问题。中文子集每类下采样 300 题并移除高度敏感关键词；每类提供 5 个示例用于少样本提示。测试答案已于 2025 年 7 月完整开源。",
  "Attack success rate under a clearly defined threat model, with fixed system prompts and chat templates":
    "在明确定义的威胁模型下，使用固定系统提示和对话模板计算攻击成功率",
  "Scored by jailbreak and refusal judges shipped with the package":
    "由工具包内置的越狱判别器和拒答判别器评分",
  "Attack success rate, scored by HarmBench's own classifier models rather than string matching":
    "攻击成功率由 HarmBench 自带分类器评分，而非通过字符串匹配计算",
  "Multiple-choice accuracy, evaluated zero-shot and five-shot":
    "选择题准确率，分别采用零样本和五样本设置评测",
  "Whether the agent completes the benign task, and whether prompt injection breaks its security properties":
    "衡量智能体能否完成正常任务，以及提示注入是否破坏其安全属性",
  "Pairwise preference accuracy": "成对偏好准确率",
  "Best-of-N (BoN) evaluation, intended to reflect how well a reward model guides alignment optimisation":
    "Best-of-N（BoN）评测，用于反映奖励模型指导对齐优化的能力",
  "White-box setting: clean accuracy and robust accuracy":
    "白盒设置：干净样本准确率与鲁棒准确率",
  "Black-box setting: adversarial safety on a domain dataset and on CC1M-Adv":
    "黑盒设置：在领域数据集和 CC1M-Adv 上评测对抗安全性",
  "12 state-of-the-art multimodal models analysed in the paper, alongside a prompting strategy proposed to improve resilience.":
    "论文分析了 12 个先进多模态模型，并提出一种提示策略以提升抗攻击能力。",
  "25 popular Chinese and English LLMs evaluated in both zero-shot and few-shot settings.":
    "在零样本和少样本设置下评测了 25 个主流中英文大语言模型。",
  "3,654 jailbreak samples built from 916 harmful queries across 12 safety topics and 46 subcategories, split into a base set with one jailbreak pair per query and a challenge set with three.":
    "由 916 个有害查询构建 3,654 个越狱样本，覆盖 12 个安全主题和 46 个子类；基础集每个查询包含 1 组越狱样本，挑战集包含 3 组。",
  "A large-scale comparison of 18 red teaming methods against 33 target LLMs and defenses, plus an adversarial training method introduced alongside the benchmark.":
    "大规模比较 18 种红队方法与 33 个目标大语言模型及防御方法，并随评测基准提出一种对抗训练方法。",
  "Accepted by ECCV 2024": "ECCV 2024 收录",
  "Attack and defense paradigms from the literature ship with the package — for example a tool-filter defense and a tool-knowledge attack, selectable from the benchmark script.":
    "工具包内置文献中的攻防范式，例如工具过滤防御和工具知识攻击，可在评测脚本中选择。",
  "Automated red teaming holds substantial promise for uncovering and mitigating the risks associated with the malicious use of large language models (LLMs), yet the field lacks a standardized evaluation framework to rigorously assess new methods. To address this issue, we introduce HarmBench, a standardized evaluation framework for automated red teaming.":
    "自动化红队测试有望发现并缓解大语言模型被恶意使用的风险，但该领域缺少严格评估新方法的标准化框架。HarmBench 为此提供自动化红队测试的标准化评测框架。",
  "Chain-of-thought evaluation is deliberately not part of the default protocol":
    "默认评测协议有意不包含思维链评测",
  Deepfake: "深度伪造",
  "Each question is evaluated in all three image variants and answers are collected into a per-scenario answer file":
    "每个问题均使用三种图像变体进行评测，回答按场景汇总到对应文件中",
  "Evaluated against domain-specific datasets for five vision tasks together with OpenTAI's own CC1M-Adv-C/F million-scale adversarial datasets, both of which are listed in the Datasets collection.":
    "使用五类视觉任务的领域数据集，以及 OpenTAI 自有的百万规模 CC1M-Adv-C/F 对抗数据集进行评测；相关数据集均列于 Datasets 栏目。",
  "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Language Models [NeurIPS 2024 Datasets and Benchmarks Track]":
    "JailbreakBench：面向语言模型越狱的开放鲁棒性评测基准［NeurIPS 2024 数据集与评测基准赛道］",
  "Reported per suite, per model, per attack and per defense combination":
    "按测试套件、模型、攻击方法和防御方法组合分别报告",
  "The evaluation script ships with reward models including ArmoRM-Llama3-8B, Eurus-RM-7b, Starling-RM-34B, internlm2-7b/20b-reward and tulu-v2.5-13b-preference-mix-rm.":
    "评测脚本内置多种奖励模型，包括 ArmoRM-Llama3-8B、Eurus-RM-7b、Starling-RM-34B、internlm2-7b/20b-reward 和 tulu-v2.5-13b-preference-mix-rm。",
  "The top-10 most downloaded or cited models for each of five vision tasks, plus robust models on CIFAR-10, CIFAR-100, ImageNet-1k and CC1M — 77 scored entries in total.":
    "覆盖五类视觉任务中下载量或引用量最高的 10 个模型，以及 CIFAR-10、CIFAR-100、ImageNet-1k 和 CC1M 上的鲁棒模型，共 77 条评分记录。",
  "Three released classifiers: standard/contextual behaviours, multimodal behaviours, and a validation classifier":
    "已发布三个分类器：标准/情境行为分类器、多模态行为分类器和验证分类器",
  "Whether the model complies with a query-relevant image manipulation, measured per scenario":
    "按场景衡量模型是否遵从与查询相关的图像操纵",
};

const ZH_AGENT_FOCUS: Record<string, string> = {
  "IPI attacks": "间接提示注入攻击",
  "Emulated tool risks": "模拟工具风险",
  "Tool-integrated indirect prompt injection": "工具集成场景中的间接提示注入",
  "Third-party instructions": "第三方指令",
  "Harmful behaviors": "有害行为",
  "Code vulnerabilities": "代码漏洞",
  "Visual prompt injections": "视觉提示注入",
  "Risk identification from logs": "从交互日志识别风险",
  "Hierarchical safety evaluation": "分层安全评测",
  "Jailbreak attack synthesis": "越狱攻击合成",
  "Safety generalization": "安全泛化",
  "Chemistry safety": "化学安全",
  "Tool-use safety": "工具调用安全",
  "Privacy norm awareness": "隐私规范意识",
  "Driving safety": "自动驾驶安全",
  "Attack and defense across 10 scenarios": "10 个场景下的攻击与防御",
  "Embodied hazards": "具身环境危险",
  "Safety risks across 8 categories": "8 类安全风险",
  "Adversarial robustness for multimodal web agents": "多模态 Web 智能体的对抗鲁棒性",
  "Web safety and trustworthiness": "Web 安全与可信性",
  "Human-AI sandbox safety": "人机交互沙箱安全",
  "Adversarial web-agent safety": "对抗环境下的 Web 智能体安全",
  "Browser jailbreaking": "浏览器智能体越狱",
  "Web-agent misuse": "Web 智能体滥用",
  "Real-world safety across 8 categories": "8 类真实世界安全风险",
};

function translateGeneratedContent(text: string) {
  const focusOnly = text.match(/^Evaluation focus: (.+)\.$/);
  if (focusOnly) {
    const focus = focusOnly[1];
    return `测评重点：${ZH_AGENT_FOCUS[focus] ?? focus}。`;
  }

  const match = text.match(
    /^Safety at Scale Table 14 lists this resource under (.+)\. Evaluation focus: (.+?)\.(?: (.+))?$/,
  );
  if (!match) return text;

  const [, section, focus, extra] = match;
  const sectionZh =
    section === "Simulation-based Benchmarks" ? "仿真类评测基准" : "真实交互评测基准";
  const base = `《Safety at Scale》表 14 将该资源列入${sectionZh}。评测重点：${ZH_AGENT_FOCUS[focus] ?? focus}。`;
  return extra ? `${base} ${ZH_CONTENT[extra] ?? extra}` : base;
}

export function t(locale: Locale, text: string) {
  return locale === "zh"
    ? (ZH[text] ?? ZH_CONTENT[text] ?? translateGeneratedContent(text))
    : text;
}
