# 交接文档 · OpenTAI 网站重建

最后更新：2026-08-16　｜　交接人：Frankie（ganqg127@gmail.com）

接手前请按顺序读：本文件 → `AGENTS.md`（工作规则）→ `README.md`（技术细节）。
要用 Codex 继续开发的话，`CODEX-PROMPT.md` 里有可以直接粘贴的启动 prompt。

---

## 0. 权限交接清单（需要 Frankie 操作）

| # | 项目 | 怎么交 |
| --- | --- | --- |
| 1 | **GitHub 仓库** `Frankiegan912/opentai-web`（私有） | Settings → Collaborators 加接手人；或等马老师确认后 Transfer 给 OpenTAI org |
| 2 | **Vercel 项目** | Vercel → Project Settings → Members 邀请，或让接手人自己 import 一次仓库 |
| 3 | **马老师给的 Gmail 账号** | ⚠️ 密码曾以明文发在微信里。交接前**先改密码**，之后走密码管理器共享，不要再发聊天 |
| 4 | **阿里云服务器** | 还没拿到。这是订阅功能的前置条件 |

仓库里没有任何密钥或凭据，`.env*` 在 `.gitignore` 里。

---

## 1. 这个项目是什么

把 OpenTAI 现有网站（TinaCMS + Next 14）重建成一个**可搜索的可信 AI 开源资源索引站**。

- 技术栈：Next.js 16 App Router + React 19 + Tailwind v4，**纯静态导出**
- 现状：132 个静态页面（含 `/zh` 中文路由和 54 × 2 个 benchmark 详情页），私有仓库，Vercel 预览部署
- 定位：`OpenTAI — The Open Hub for Trustworthy AI and AI Safety`

**最重要的一条原则写在 `AGENTS.md` 里：不编造内容。** 站上每一个名字、链接、作者、分数都必须能指回一个可核查的来源。查不到就留空并标注 —— 站上那些 `Not recorded yet` / `Still missing` / `DRAFT` 是刻意的，不是没做完。

---

## 2. 现在有什么

| 栏目 | 内容 |
| --- | --- |
| `/` Discover | 全站搜索、订阅框（UI 完成，**后端未接**）、Trending、Latest releases |
| `/papers` | **772 篇**论文，来自团队指定的两份清单；3 领域 × Research/Survey × 细分领域 |
| `/benchmarks` | **54 个**，3 个批准领域轴，每个有中英文详情页；LLMs 18、Agents 21、Embodied AI 15 |
| `/leaderboard` | 3 个来源核验的公开排行榜卡片：LLM Safety、Agent Safety、Fairness；每张卡片只展示明确命名的单项指标，不再渲染旧的 77 条视觉模型黑白盒表格 |
| `/arenas` | Gray Swan Arena、CyberGym、ExploitGym 三张卡片；可核验榜单展示主要结果，Gray Swan 暂无可静态核验的成绩快照并明确标注 |
| `/models` `/datasets` | 4 / 155；Datasets 中 LLMs 86、Agents 16、Embodied AI 60（7 个跨领域，所以分类数相加大于去重总数）。共保留 570 条论文级训练用途证据。只有原论文或官方仓库明确支持训练、微调、对齐、分类器训练、模仿学习或离线强化学习，或提供明确 train/validation split 的公开资源才进入 Datasets；仅有测试题、任务文件或评测环境的条目留在 Benchmarks。旧站 8 条 featured datasets 已全部排除。Tools 与 Frameworks 数据暂不作为独立公开页面展示。 |
| `/community` | 3 位团队确认的 GitHub 贡献者头像与主页、志愿贡献 GitHub Issue 表单 + 24 家合作机构 |
| `/about` | 使命、收录规则、联系方式 + 使用条款、隐私政策、引用草稿 |

质量基线：外链 **653 条 0 坏链**、类型检查通过、lint 通过、生产构建通过。

### 数据从哪来

`src/data/*.ts` **全部是生成的，不要手改**。改 `scripts/data/` 下的源文件或 `scripts/generate-site.py` 的逻辑，然后重新生成。

来源：OpenTAI 现有站的 TinaCMS 内容、`xingjunm/Awesome-Large-Model-Safety`、
`x-zheng16/Awesome-Embodied-AI-Safety`，以及前者所链接的 `Safety at Scale`
综述 Table 6，加上 GitHub / arXiv / Hugging Face 三个 API 实时抓取的元数据。
Datasets 的最终收录判定与训练用途证据记录在
`scripts/data/training-datasets.json` 和 `scripts/data/paper-dataset-mentions.json`；
领域、年份和论文使用次数图表由生成后的条目自动计算。当前有 3 个候选（BooksCorpus、
ShareGPT、已下线的 Kaggle Fake News 竞赛数据）因无法核验当前可达的权威公开发行入口而保留在 unresolved；另有 138 篇批准清单论文没有
可供管线核验的精确公开全文，因此明确记为覆盖缺口，不依据标题或摘要猜测数据集。

---

## 3. 待办

### A 类 —— 不用等任何人，可以直接做

| 事项 | 预估 | 备注 |
| --- | --- | --- |
| **中文版收尾** | 待复核 | `/zh` 路由和语言切换已接通；范围仍是界面 + 描述 + 新闻用中文，**论文标题/摘要/作者保持英文**。需继续核对遗漏文案 |
| 移动端汉堡菜单 | 0.5 天 | 现在 9 项导航是横向滚动 |
| 给 772 篇补代码链接 | 1 天 | 现在以论文链接为主；代码仓库必须按 README/论文内容二次核对，不能只做标题匹配 |

开工前值得先问一句：原站数据里有 `titlezh` 字段但语言切换器被整段注释掉了 —— 说明有人做过一半放弃了，问清原因再动手。

### B 类 —— 等马老师给资料

- **Community**：新增贡献者、workshops / challenges / projects 仍需团队提供可核验素材
- **Leaderboard 继续扩充**：新增榜单必须保留官方页面、精确指标、快照日期和可复核分数；不得把 AgentDojo 这类官方明确声明“不是排行榜”的结果页当作排行榜
- **About 三段草稿**：Terms of Use / Privacy Policy / citation，页面上标着 DRAFT，仍需团队和法律审阅

### C 类 —— 等马老师做决定

1. **订阅上线凭证与流程**（见下方 §4；代码已实现，仍需 Gmail App Password，并明确由管理员审核而非自动入库）
2. **阿里云部署**：域名、服务器、CI/CD
3. **仓库归属**：什么时候转给 OpenTAI org
4. ~~**Survey tab 留不留**~~：团队已确认 Papers 保留 Research / Survey 两个 tab；当前为 758 / 14

### D 类 —— 需要他提供缺失信息

- `OSWorld-Safety`、`ToolSafetyBench`：GitHub 上按这名字没有公开仓库
- `VLBreakBench` 项目页 **404**（现有线上站就挂着这个死链）
- `OpenTAI/VisionSafety` 里是**官网代码不是评测代码** —— 评测代码在哪？

---

## 4. 订阅功能：动手前必读

马老师的要求是「不用第三方，直接把订阅者 email 记到文件里，反正 GitHub 不开源不会泄露」。

**两个问题：**

1. **静态站写不了文件。** 现在的站构建出来是一堆 HTML/JS，放阿里云也还是静态文件，没有进程能接 POST。必须在服务器上跑一个后端接口。
2. **风险点不在 GitHub。** 接口地址写在前端代码里，任何人都能 POST；没有二次确认就能替别人订阅；文件放在网站目录下能被直接下载 —— 这才是真正的泄露路径。

如果将来改成自动写入订阅名单，**最低限度的安全要求**（不能省）是：接口频率限制、
名单文件存在网站目录之外、蜜罐字段挡机器人、文件永不进 git、二次确认邮件。

目前实现不写订阅名单，也不自动完成订阅；它只把申请发给管理员，并在邮件里明确要求核验邮箱
所有权后再加入任何名单。因此这是管理员审核通知，不是绕过二次确认的自动订阅系统。

另外：二次确认要发信，「OpenTAI Daily 每日推送」也要发信 —— **最后还是绕不开一个邮件服务**，
自建只省掉了订阅管理这一小块。这一点建议先跟马老师对齐再动手。

现在已经有一套不依赖 Vercel 的实现：`server/newsletter_server.py` 同时服务静态 `out/`
和 `POST /api/subscribe`，通过 Gmail SMTP 把订阅申请直接发给马老师，不保存订阅者邮箱。
前端提交 `email`、`language` 和蜜罐字段，后端带邮箱校验、蜜罐与按 IP 限流。

启动前必须在服务器环境变量里配置 `NEWSLETTER_SMTP_USER` 和
`NEWSLETTER_SMTP_APP_PASSWORD`；示例见 `server/newsletter.env.example`。这里必须用 Gmail
App Password，不得把 Gmail 登录密码、App Password 或任何真实密钥写进仓库。线上部署时把
Python 进程绑定到 `127.0.0.1`，由 Nginx/HTTPS 反向代理。
使用 Nginx 时设置 `OPENTAI_TRUST_PROXY=true`，让后端只从本机代理读取
由 Nginx 覆盖写入的 `X-Real-IP` 做真实访客 IP 限流；直接暴露 Python 服务时必须保持为
`false`。同时设置 `NEWSLETTER_ALLOWED_ORIGINS=https://opentai.org`，并以
`server/nginx-opentai.conf.example` 为起点配置连接数、请求体和超时限制。

---

## 5. 已经踩过的坑

- **名字匹配不是证据。** GitHub 搜索把 `WASP` 匹配到了 18k star 的 Web 框架，真的是 `facebookresearch/wasp`（98 star）。这类判定最后是人工核对写死的，见 `scripts/data/benchmark-overrides.json`
- **CALM、DAO、UMK 三篇是 OpenTAI 自己的论文，两个 awesome 清单里都没有。** 按字面执行「现有 papers 都不要了」会把他们自己的成果从自己站上删掉
- **`npm run dev` 时删 `.next` 会搞崩 dev server**，先停服务
- **Tailwind v4 只认源码里的字面量类名**，拼接出来的类名不生效
- **图片体积**：原站有张 5.7MB 的图（2934px 宽但最多显示 700px），压到 359KB

---

## 6. 常用命令

```bash
npm ci && npm run dev            # 本地开发
npm run build                    # 静态导出，当前 132 页
npx tsc --noEmit && npm run lint # 类型 + lint
python3 scripts/check-links.py   # 外链全检（需要先 build）
python3 scripts/generate-site.py # 重新生成 src/data/*.ts
```

完整数据管线（含抓取步骤，耗时较长）见 `README.md`。
