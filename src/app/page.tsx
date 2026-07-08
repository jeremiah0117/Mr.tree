const navItems = ["宇宙入口", "数字花园", "实验室", "连接矩阵"];

const codeLines = [
  "          const forest = seed('idea') + build('trust') + ship('signal')",
  "      <root> geo.map(intent).feed(search).sync(social).grow() </root>",
  "   01 10 01   { ai: 'tools', biz: 'cycles', nature: 'restore' }   10 01",
  "      while (curiosity) { publish(note); connect(people); compound(value) }",
  "          node: thought -> essay -> video -> newsletter -> product",
];

const bubbles = [
  { label: "{GEO}", className: "bubble-one" },
  { label: "root.grow()", className: "bubble-two" },
  { label: "<IP />", className: "bubble-three" },
  { label: "01 feed", className: "bubble-four" },
  { label: "link.social()", className: "bubble-five" },
  { label: "calm++", className: "bubble-six" },
];

const pillars = [
  {
    title: "内容资产层",
    copy: "把科技洞见、商业判断和长期笔记沉淀为可被搜索、引用和再分发的知识节点。",
  },
  {
    title: "社媒连接层",
    copy: "连接 GitHub、X、YouTube、LinkedIn、公众号、视频号、小红书、抖音等主流入口。",
  },
  {
    title: "商业转化层",
    copy: "为咨询、课程、研究报告、社群和数字产品预留可信的商业路径。",
  },
];

const signals = ["AI 原生", "GEO-ready", "长期主义", "自然疗愈"];

const socialGroups = [
  "GitHub",
  "X",
  "YouTube",
  "LinkedIn",
  "公众号",
  "视频号",
  "小红书",
  "抖音",
];

function PixelTree() {
  return (
    <div className="pixel-tree-wrap" aria-label="像素风绿色树先生">
      <svg
        className="pixel-tree"
        viewBox="0 0 128 128"
        role="img"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        <rect x="56" y="80" width="16" height="32" fill="#24483b" />
        <rect x="48" y="104" width="32" height="8" fill="#1a362d" />
        <rect x="40" y="32" width="48" height="16" fill="#32f08c" />
        <rect x="32" y="48" width="64" height="24" fill="#27d982" />
        <rect x="24" y="64" width="80" height="24" fill="#1fbf73" />
        <rect x="40" y="80" width="48" height="16" fill="#15985f" />
        <rect x="48" y="24" width="32" height="8" fill="#7dffb2" />
        <rect x="32" y="40" width="16" height="8" fill="#82ffc4" />
        <rect x="80" y="56" width="16" height="8" fill="#60e8ff" />
        <rect x="48" y="60" width="8" height="8" fill="#05100a" />
        <rect x="72" y="60" width="8" height="8" fill="#05100a" />
        <rect x="56" y="76" width="16" height="4" fill="#0a4f36" />
        <rect x="24" y="72" width="8" height="8" fill="#5cff9d" />
        <rect x="96" y="72" width="8" height="8" fill="#5cff9d" />
      </svg>
    </div>
  );
}

function CodeWaveHero() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="code-wave code-wave-back">
        <pre>{codeLines.join("\n")}</pre>
      </div>
      <div className="code-wave code-wave-front">
        <pre>{[...codeLines].reverse().join("\n")}</pre>
      </div>
      <div className="code-ring code-ring-large" />
      <div className="code-ring code-ring-small" />
      {bubbles.map((bubble) => (
        <span
          className={`code-bubble ${bubble.className}`}
          key={bubble.label}
        >
          {bubble.label}
        </span>
      ))}
      <PixelTree />
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="主导航">
        <a className="brand-mark" href="#top" aria-label="树先生宇宙首页">
          <span className="brand-glyph">木</span>
          <span>树先生宇宙</span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a href={`#${item}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <a className="nav-action" href="#连接矩阵">
          连接我
        </a>
      </nav>

      <section className="hero-section" id="top">
        <CodeWaveHero />
        <div className="hero-copy">
          <p className="eyebrow">个人 IP · 数字花园 · AI 时代长期主义</p>
          <h1>把思想种成一片宇宙</h1>
          <p className="hero-lede">
            树先生宇宙是一个面向 GEO、搜索和社媒传播的个人知识现场：
            科技洞见、商业判断与大自然的治愈感，在这里沉淀为长期资产。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#数字花园">
              进入数字花园
            </a>
            <a className="secondary-button" href="#实验室">
              查看实验室
            </a>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="核心信号">
        {signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </section>

      <section className="content-section" id="宇宙入口">
        <div className="section-kicker">Universe Framework</div>
        <div className="section-heading">
          <h2>一个可以慢慢长大的个人 IP 系统</h2>
          <p>
            首屏承担记忆点，内容系统承担信任，连接矩阵承担传播，商业层承担未来价值。
          </p>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar, index) => (
            <article className="pillar-card" key={pillar.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section two-column" id="数字花园">
        <div>
          <div className="section-kicker">Digital Garden</div>
          <h2>让每一条洞见，都能被人和 AI 找到</h2>
        </div>
        <div className="system-list">
          <p>主题集群：AI、科技、商业、个体成长、自然疗愈。</p>
          <p>内容形态：短笔记、长文、研究索引、视频脚本、项目日志。</p>
          <p>结构能力：实体、主题、引用、时间线和跨平台 canonical 链接。</p>
        </div>
      </section>

      <section className="content-section" id="实验室">
        <div className="section-kicker">Lab & Commerce</div>
        <div className="section-heading">
          <h2>从表达影响力，到可持续商业价值</h2>
          <p>
            网站不是名片，而是个人 IP 的操作系统：可积累、可检索、可复用、可转化。
          </p>
        </div>
        <div className="lab-panel">
          <div>
            <strong>未来模块</strong>
            <p>AI 工具箱、研究报告、订阅通讯、咨询入口、社群入口、项目案例库。</p>
          </div>
          <div>
            <strong>技术路线</strong>
            <p>Next.js + GitHub Private Repository + Vercel 自动部署，后续接入 CMS 和分析系统。</p>
          </div>
        </div>
      </section>

      <section className="content-section" id="连接矩阵">
        <div className="section-kicker">Social Graph</div>
        <div className="section-heading">
          <h2>国内外平台统一入口</h2>
          <p>先建立稳定的链接占位，后续替换为真实账号、订阅入口和平台专属 landing page。</p>
        </div>
        <div className="social-grid">
          {socialGroups.map((platform) => (
            <a href="#top" key={platform}>
              {platform}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
