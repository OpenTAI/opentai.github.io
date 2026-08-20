import { buildArenaCompetitionState } from "@/lib/arena-competition";
import type { Locale } from "@/lib/i18n";
import { ResourceSubmissionDialog } from "@/components/resource-submission-dialog";
import { ecosystemArenas } from "@/data/ecosystem";

const arenaState = buildArenaCompetitionState({ challenges: [], entries: [] });

const copy = {
  en: {
    eyebrow: "OpenTAI Safety Arena",
    title: "Challenge AI systems. Share reproducible results.",
    intro:
      "A community arena for structured adversarial evaluation of LLMs, agents, and embodied AI systems. Compete on published challenges and build a transparent safety leaderboard.",
    status: "Pilot · challenges pending",
    browse: "Browse challenges",
    challenges: "Published challenges",
    results: "Verified results",
    principles: "How the arena works",
    principleIntro:
      "Every public result follows the same review path so rankings remain traceable.",
    steps: [
      {
        number: "01",
        title: "Choose a challenge",
        text: "Start from a published task with a defined scope, rules, metric, and submission format.",
      },
      {
        number: "02",
        title: "Run the adversarial test",
        text: "Probe the target system within the stated rules and keep the evidence needed to reproduce the result.",
      },
      {
        number: "03",
        title: "Submit and rank",
        text: "OpenTAI reviews the public evidence before a result can appear on the leaderboard.",
      },
    ],
    challengeTitle: "Open challenges",
    challengeIntro:
      "Public challenge briefs will appear here with target systems, rules, metrics, and deadlines.",
    challengeEmpty: "No public OpenTAI challenges yet",
    challengeEmptyText:
      "Challenge proposals remain under review until their scope, rules, and evidence requirements are verified.",
    leaderboardTitle: "Safety leaderboard",
    leaderboardIntro:
      "Compare safety and task capability within each published challenge. Only submissions with verified public evidence can be ranked.",
    leaderboardEmpty: "No verified leaderboard entries yet",
    leaderboardEmptyText:
      "The table will open when OpenTAI publishes its first challenge and verifies submitted results.",
    rank: "Rank",
    entry: "System",
    model: "Model",
    challenge: "Challenge",
    safetyResult: "Safety result",
    capabilityResult: "Capability result",
    evidence: "Evidence",
    viewEvidence: "View",
    platformTitle: "Arena platforms",
    platformIntro:
      "Source-backed live and research arenas for adversarial testing. Their published results are not OpenTAI rankings.",
    stars: "GitHub stars",
    visit: "Visit",
  },
  zh: {
    eyebrow: "OpenTAI 安全竞技场",
    title: "挑战 AI 系统，提交可复现结果",
    intro:
      "面向 LLM、智能体与具身 AI 的结构化对抗评测社区。参与公开赛题，并共同建立透明、可核验的安全排行榜。",
    status: "试运行 · 赛题待发布",
    browse: "查看赛题",
    challenges: "已发布赛题",
    results: "已核验成绩",
    principles: "竞技场如何运作",
    principleIntro: "所有公开成绩都经过同一套核验流程，确保排名可追溯。",
    steps: [
      {
        number: "01",
        title: "选择赛题",
        text: "从已发布任务开始，赛题会明确范围、规则、指标和提交格式。",
      },
      {
        number: "02",
        title: "开展对抗测试",
        text: "在赛题规则内测试目标系统，并保留复现结果所需的公开证据。",
      },
      {
        number: "03",
        title: "提交并参与排名",
        text: "OpenTAI 核验公开证据后，成绩才会进入排行榜。",
      },
    ],
    challengeTitle: "公开赛题",
    challengeIntro: "公开赛题将在这里列出目标系统、规则、指标和截止时间。",
    challengeEmpty: "OpenTAI 暂无已发布赛题",
    challengeEmptyText:
      "赛题提案在范围、规则与证据要求完成核验前不会公开展示。",
    leaderboardTitle: "安全排行榜",
    leaderboardIntro:
      "在每个已发布赛题内同时比较安全表现与任务能力。仅有公开证据且通过核验的成绩可以进入排名。",
    leaderboardEmpty: "暂无已核验排行榜成绩",
    leaderboardEmptyText:
      "OpenTAI 发布首个赛题并核验参赛结果后，排行榜会在这里开放。",
    rank: "名次",
    entry: "参赛系统",
    model: "模型",
    challenge: "赛题",
    safetyResult: "安全结果",
    capabilityResult: "能力结果",
    evidence: "证据",
    viewEvidence: "查看",
    platformTitle: "竞技平台",
    platformIntro:
      "用于对抗测试的有来源在线平台与研究型竞技环境；其公开结果不代表 OpenTAI 排名。",
    stars: "GitHub 星标",
    visit: "访问",
  },
} as const;

export function ArenaPage({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <main className="arena-page">
      <section className="arena-hero">
        <div className="arena-hero-copy">
          <div className="arena-kicker-row">
            <span className="arena-eyebrow">{c.eyebrow}</span>
            <span className="arena-status">
              <span aria-hidden="true" />
              {c.status}
            </span>
          </div>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
          <div className="arena-hero-actions">
            <a className="arena-primary-link" href="#challenges">
              {c.browse} <span aria-hidden="true">↓</span>
            </a>
            <ResourceSubmissionDialog kind="arena" locale={locale} />
          </div>
        </div>

        <div aria-hidden="true" className="arena-hero-visual">
          <div className="arena-target-rings">
            <span className="arena-target-core" />
          </div>
          <div className="arena-signal arena-signal-one">01</div>
          <div className="arena-signal arena-signal-two">02</div>
          <div className="arena-signal arena-signal-three">03</div>
          <p>TEST · VERIFY · RANK</p>
        </div>
      </section>

      <dl className="arena-metrics">
        <div>
          <dt>{c.challenges}</dt>
          <dd>{arenaState.challengeCount}</dd>
        </div>
        <div>
          <dt>{c.results}</dt>
          <dd>{arenaState.verifiedResultCount}</dd>
        </div>
      </dl>

      <section className="arena-section">
        <div className="arena-section-heading">
          <span>01</span>
          <div>
            <h2>{c.principles}</h2>
            <p>{c.principleIntro}</p>
          </div>
        </div>
        <div className="arena-process-grid">
          {c.steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="arena-section" id="challenges">
        <div className="arena-section-heading">
          <span>02</span>
          <div>
            <h2>{c.challengeTitle}</h2>
            <p>{c.challengeIntro}</p>
          </div>
        </div>
        <div className="arena-empty-state">
          <span aria-hidden="true">◎</span>
          <div>
            <h3>{c.challengeEmpty}</h3>
            <p>{c.challengeEmptyText}</p>
          </div>
        </div>
      </section>

      <section className="arena-section">
        <div className="arena-section-heading">
          <span>03</span>
          <div>
            <h2>{c.leaderboardTitle}</h2>
            <p>{c.leaderboardIntro}</p>
          </div>
        </div>
        <div className="arena-leaderboard-scroll">
          <div className="arena-leaderboard">
            <div className="arena-leaderboard-head" role="row">
              <span>{c.rank}</span>
              <span>{c.entry}</span>
              <span>{c.model}</span>
              <span>{c.challenge}</span>
              <span>{c.safetyResult}</span>
              <span>{c.capabilityResult}</span>
              <span>{c.evidence}</span>
            </div>
            {arenaState.leaderboard.length > 0 ? (
              <div className="arena-leaderboard-body">
                {arenaState.leaderboard.map((entry) => {
                  const challenge = arenaState.challenges.find(
                    (item) => item.id === entry.challengeId,
                  );

                  return (
                    <div className="arena-leaderboard-row" key={entry.evidenceUrl} role="row">
                      <strong>{entry.rank}</strong>
                      <span>{entry.participant}</span>
                      <span>{entry.model}</span>
                      <span>{challenge?.name ?? entry.challengeId}</span>
                      <span>{entry.score}</span>
                      <span>{entry.capabilityScore ?? "—"}</span>
                      <a href={entry.evidenceUrl} rel="noreferrer" target="_blank">
                        {c.viewEvidence} ↗
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="arena-leaderboard-empty">
                <strong>{c.leaderboardEmpty}</strong>
                <p>{c.leaderboardEmptyText}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="arena-section">
        <div className="arena-section-heading">
          <span>04</span>
          <div>
            <h2>{c.platformTitle}</h2>
            <p>{c.platformIntro}</p>
          </div>
        </div>
        <div className="arena-platform-grid">
          {ecosystemArenas.map((arena) => (
            <article className="arena-platform-card" key={arena.id}>
              <div className="arena-platform-topline">
                <span>{arena.category}</span>
                {arena.year ? <time>{arena.year}</time> : null}
              </div>
              <h3>{arena.name}</h3>
              {arena.publisher ? (
                <p className="arena-platform-publisher">{arena.publisher}</p>
              ) : null}
              <p className="arena-platform-description">
                {locale === "zh" ? arena.descriptionZh : arena.description}
              </p>
              <div className="arena-platform-footer">
                {arena.stars !== undefined ? (
                  <span aria-label={`${c.stars}: ${arena.stars.toLocaleString()}`}>
                    ★ {arena.stars.toLocaleString()}
                  </span>
                ) : (
                  <span />
                )}
                <div className="arena-platform-links">
                  {arena.links.map((link) => (
                    <a href={link.url} key={link.url} rel="noreferrer" target="_blank">
                      {link.label || c.visit} ↗
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
