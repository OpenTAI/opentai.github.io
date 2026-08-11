# 交接 · 2026-08-11 早

夜里跑完的东西，和需要你/马老师拍板的东西。

启动：

```bash
npm --prefix ~/Projects/opentai-web run dev
```

---

## 一、需要马老师回复的（我停在这儿了）

| # | 事项 | 卡住了什么 |
| --- | --- | --- |
| 1 | Buttondown 账号（或其他邮件服务） | 订阅框 UI 全做完了，按钮灰着。拿到表单 URL，改 `scripts/generate-site.py` 里 `newsletter.endpoint` 一行就通 |
| 2 | 外部资源收录范围 | 这轮只收了他图里**点名的** 7 个 benchmark。要不要继续扩、按什么标准 |
| 3 | governance / citation 文案 | ~~缺~~ → 已放上 draft，页面上明确标了「DRAFT · Pending confirmation」，等他确认或改写 |
| 4 | 最终仓库归属 | ~~未定~~ → 已建私有库 `Frankiegan912/opentai-web`，等确认后转给 OpenTAI org |

### 顺带发现的三个问题，建议一并问

- **`OSWorld-Safety` 和 `ToolSafetyBench` 查无此仓库。** 按这两个名字在 GitHub 上找不到公开仓库；`xlang-ai/OSWorld` 描述里也不含 "OSWorld-Safety"。没有臆造，这两条没收录。
- **现在线上站有个死链。** `https://roywang021.github.io/VLBreakBench/` 返回 **404**。我把它从构建里剔除了，页面显示「upstream link unavailable」，不带 404 上线。
- **`BlackdoorLLM` 是拼写错误**，实际仓库是 `bboylyg/BackdoorLLM`（Backdoor 不是 Blackdoor）。保留了他们的写法没擅自改。
- `content/pages/newslist.md` 里唯一那条新闻，正文是 **lorem ipsum 假文**，没搬。

---

## 二、夜里做完的

### Leaderboard（你点名要的，优先做了）

`leaderboards.md` 875 行全部搬完：**77 条真实评分**，9 个榜单，黑盒/白盒双 tab。

- 黑盒 5 榜（ImageNet 分类 / COCO 检测 / COCO 实例分割 / ADE20K 语义分割 / CheXpert 医学影像），列：Downloads、Domain Dataset、CC1M-Adv
- 白盒 4 榜（CIFAR-10 / CIFAR-100 / ImageNet-1k / CC1M），列：Citations、Clean Acc、Robust Acc
- 模型名带 Hugging Face 链接，前三名高亮

剩下 4 个 ranking（LLM Safety / Agent Safety / Guard Model / Privacy）标了 `NOT BUILT YET`，没编数据。

### Benchmarks 旗舰化

- **10 分类**完全按马老师的图：LLM Safety / Agent Safety / Multimodal Safety / Robustness / Privacy / Fairness / Explainability / Alignment / AI Ethics / Cybersecurity。5 个有内容，5 个灰显「No entries yet」当路线图
- 条目从 3 → **8 个**，新增 5 个他点名的：HarmBench ★1027、AgentDojo ★735、JailbreakBench ★651、SafetyBench ★297、MM-SafetyBench ★217
- **每个 benchmark 一个详情页**（`/benchmarks/<slug>`），按他要的七段式：Description（含 arXiv 摘要）、Code（仓库/语言/许可证/star/fork/最后提交）、Papers（作者+会议+arXiv 号）、Leaderboard、以及 Dataset / Metrics / Baselines 明确标注「Needs curation — 这些读不出来，得手填」

### Papers：571 篇研究文献库

从马老师自己维护的 `xingjunm/Awesome-Large-Model-Safety` 导入：

- **571 篇**，6 大章节（LLM Safety 159 / Diffusion 124 / Agent Safety 124 / Vision Foundation 60 / VLP 59 / VLM 45），48 个小节
- 570 篇有作者，571 篇有会议和年份
- **arXiv 链接：571 篇里 512 篇有（90%）** —— 源文件自带 248 条，另外 323 条按标题反查命中 264 条。抽样 12 条逐一核对，12/12 指向正确论文
- 章节筛选 + 小节二级筛选 + 搜索 + 分页

### Discover / 信息架构

- 9 项导航，Discover 作首页
- 全站搜索（29 条资源，跨 5 个栏目，实时）
- 订阅框，English / 中文 切换
- Trending 按真实 star 排序、Latest releases 五栏（论文/模型/benchmark/数据集/工具）
- Datasets 和 Models 的分类也改成了他图里的口径（Safety Instruction / Preference / Red Team / Agent Trajectory / Multimodal Safety Data；Guard Models / Agents）

### 工程

- **Logo 换成你给的真图**，自动裁白边补方形；favicon 和 apple-icon 一起生成
- 每页独立 metadata、`sitemap.xml`、`robots.txt`
- **外链全检：62 条，0 坏链**（`npm run check:links` 可复跑）
- 移动端无横向溢出
- 数据管线全部脚本化，见 README
- **打包体积**：发现 571 篇论文的数据被打进了每个页面，拆成独立模块后总 JS **1707KB → 1099KB（-36%）**，现在只有 Discover 和 Papers 两个页面加载
- 每页只有一个 `<h1>`（原来页头站名占了 h1，把真标题挤掉了）
- 基础无障碍扫描：图片 alt / 按钮名称 / 输入框标签，0 问题
- 全部 10 个路由内容烟测通过

---

## 三、我做的判断（你可以推翻）

1. **收录范围**只用了马老师点名的 7 个，没自己扩。
2. **分类归属**是我编的（benchmark 10 类是他给的，但每条归到哪一类是我判断的；Papers/Datasets/Models 的分类同理）。改起来很快，都在 `scripts/generate-site.py` 顶部。
3. **宁缺毋滥**：查不到的一律留空并标注，不填占位内容。所以你会看到不少 `NOT BUILT YET` / `Needs curation` —— 这是故意的。
4. **死链剔除**而不是保留。

## 四、还没做

- 邮件 agent（独立后端项目，不属于网站）
- 移动端导航 9 项是横向滚动，没做汉堡菜单
- 571 篇论文只有 arXiv 链接，没有代码链接
- Privacy / Fairness / Explainability / AI Ethics / Cybersecurity 五个 benchmark 分类是空的
