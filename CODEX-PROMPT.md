你接手一个已经在跑的项目：OpenTAI 网站重建。代码在 `Frankiegan912/opentai-web`（私有仓库），本地跑起来就能看。

## 第一步：先读，别急着写

按顺序读这三个文件，读完再动手：

1. `AGENTS.md` —— 工作规则，**其中「不编造内容」那条是这个项目的底线**
2. `HANDOVER.md` —— 现状、待办、哪些事要等谁拍板
3. `README.md` —— 站点结构和数据管线

然后跑一遍确认环境是好的：

```bash
npm ci
npm run build          # 应该输出 43 个页面，无报错
npx tsc --noEmit       # 应该无输出
npm run lint           # 应该无输出
npm run dev            # 打开 localhost:3000 看一眼
```

## 这个项目是什么

把 OpenTAI 现有网站重建成一个**可搜索的可信 AI 开源资源索引站**。
Next.js 16 App Router + React 19 + Tailwind v4，纯静态导出，43 个页面。

现在站上有：1,050 篇论文（4 个领域分类）、31 个 benchmark（每个有详情页）、
77 条 leaderboard 评分、24 家合作机构。外链 93 条全部可达。

## 三条不能违反的规则

**1. 不编造任何内容。**

这个站索引的是别人的研究成果。每一个名字、链接、作者、会议、分数、描述，
都必须能指回一个可核查的来源 —— 仓库、API 返回、论文摘要，或者 OpenTAI 团队本人。

查不到就**留空并标注**。站上现在那些 `Not recorded yet`、`Still missing`、
`No entries yet`、`DRAFT — pending confirmation` 是**故意的**，不是没做完。
把它们填上看起来合理的文字，是你能对这个项目做的最糟的事 —— 读者分辨不出
编造和真实，而这个站的全部价值就在于读者不需要分辨。

已经因为这条规则抓到过真实错误：GitHub 搜索把 `WASP` 匹配到一个 18k star 的
Web 框架（真的是 `facebookresearch/wasp`，98 star）；有三篇 OpenTAI 自己的论文
差点因为「假设它在某个清单里」而被删掉。**名字匹配不是证据。**

自动匹配不可靠的时候，人工核对并把判定和理由记下来，
参照 `scripts/data/benchmark-overrides.json` 的写法。

**2. 不要手改生成的文件。**

`src/data/site.ts`、`src/data/papers.ts`、`src/data/paper-search.ts` 都是脚本生成的。
改 `scripts/data/` 下的源数据，或者改 `scripts/generate-site.py` 的逻辑，然后：

```bash
python3 scripts/generate-site.py
```

手改的内容下次生成时会被无声抹掉。

**3. 说"做完了"之前必须验证。**

```bash
npx tsc --noEmit
npm run lint
npm run build
python3 scripts/check-links.py    # 需要先 build
```

改了会渲染的东西，还要在浏览器里实际看一眼。不要只凭代码看起来对就汇报完成。

## 已知的坑

- `npm run dev` 跑着的时候删 `.next` 会把 dev server 搞崩，先停服务
- **Tailwind v4 只认源码里的字面量类名**，拼接出来的类名不生效，也不报错
- 生成 TypeScript 时带连字符的对象键必须加引号，`generate-site.py` 里的序列化器
  已经处理了，别绕过它
- **搜索引擎收录是 opt-in 的**：只有 `NEXT_PUBLIC_SITE_URL` 恰好等于
  `https://opentai.org` 时才允许收录，其余一律 `Disallow: /` + `noindex`。
  预览链接必须保持不可索引，别改这个逻辑

## 现在可以做的事

按优先级，前三项**不需要等任何人**：

**① 中文版**（约 2–2.5 天，方向已获批准）

范围已经定死：**界面 + 内容描述 + 新闻用中文；论文标题、摘要、作者名保持英文**
（这是领域惯例，翻了反而不专业）。所以 1050 篇论文不增加翻译量。

实际要翻的：约 1730 词 / 138 条文案 + 27 个界面标签。

技术路线：`[locale]` 路由 + 语言切换器 + 生成器里每个可翻字段改成 `{en, zh}` 对。
页面数会从 43 涨到约 80，注意打包体积（现在首页 836KB，`papers.ts` 单独成模块就是
为了不让首页背 330KB 的完整论文库，别破坏这个拆分）。

⚠️ 动手前先问一句：原站数据里有 `titlezh` 字段，但 `header.tsx` 里的语言切换器
被整段注释掉了 —— 有人做过一半放弃了，值得问清原因再投入。

**② 移动端汉堡菜单**（约 0.5 天）
现在 9 项导航在手机上是横向滚动，能用但不优雅。

**③ 给 1050 篇论文补代码链接**（约 1 天）
现在只有 arXiv 链接。可以按论文标题去 GitHub 搜对应实现，
但**必须沿用现有的校验强度** —— 参考 `scripts/verify-benchmark-repos.py`
是怎么用 README 内容做二次确认的，不要只靠名字匹配。

## 不要做的事

- **不要替 OpenTAI 团队起草对外表态**：governance、citation、收录范围标准，
  这些是机构立场，必须他们自己定。`/about` 页上那三段草稿已经明确标了 DRAFT
- **不要扩大资源收录范围**：现在只收团队点名的那些，扩不扩是他们的决定
- **不要碰订阅后端**，除非已经拿到阿里云服务器权限**并且**跟团队对齐了安全方案
  （`HANDOVER.md` §4 写了为什么原方案有问题：静态站写不了文件，
  而且真正的泄露风险不在 GitHub 而在公开接口和文件位置）
- **不要把预览部署改成可索引**

## 交接人留的话

有几处判断是上一任做的，你可以推翻，但推翻前先看一眼理由（都写在代码注释和
`scripts/data/*-overrides.json` 里）：

- 论文的第 4 个领域 `Vision & Multimodal` 是加出来的 —— 团队只点名了
  LLMs / Agents / Embodied AI，但源清单里有 288 篇（整整一半）不属于这三类
- benchmark 的属性轴只在名称或描述明确写了的时候才赋值，判不出来的留空
- 有 2 个条目被排除并写了理由（是能力数据集，不是安全 benchmark）

先读文件，跑通构建，然后告诉我你打算从哪一项开始、准备怎么做。
