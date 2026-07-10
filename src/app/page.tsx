import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteChrome from "@/components/SiteChrome";
import StarField from "@/components/StarField";
import {
  signals,
  siteInfo,
  socialLinks,
  siteUrl,
  universePillars,
} from "@/lib/site";

const numberRings = [
  {
    r: 76,
    className: "number-ring-inner",
    offset: 0,
  },
  {
    r: 116,
    className: "number-ring-mid-a",
    offset: 37,
  },
  {
    r: 158,
    className: "number-ring-mid-b",
    offset: 83,
  },
  {
    r: 202,
    className: "number-ring-outer-a",
    offset: 141,
  },
  {
    r: 248,
    className: "number-ring-outer-b",
    offset: 211,
  },
];

const piDigits =
  "3141592653589793238462643383279502884197169399375105820974944592307816406" +
  "2862089986280348253421170679821480865132823066470938446095505822317253594" +
  "0812848111745028410270193852110555964462294895493038196442881097566593344" +
  "6128475648233786783165271201909145648566923460348610454326648213393607260" +
  "2491412737245870066063155881748815209209628292540917153643678925903600113" +
  "3053054882046652138414695194151160943305727036575959195309218611738193261" +
  "1793105118548074462379962749567351885752724891227938183011949129833673362";

function circlePathD(r: number): string {
  return `M 400 200 m -${r} 0 a ${r} ${r} 0 1 1 ${r * 2} 0 a ${r} ${r} 0 1 1 -${r * 2} 0`;
}

function piRingDigits(offset: number, count: number): string {
  const source = piDigits.repeat(Math.ceil((offset + count) / piDigits.length) + 1);
  return source.slice(offset, offset + count);
}

function DeerMascot() {
  return (
    <div className="deer-mascot-wrap" aria-label="会眨眼的小鹿">
      <svg
        className="deer-mascot"
        viewBox="0 0 128 128"
        role="img"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        <rect x="28" y="20" width="8" height="16" fill="#5cff9d" />
        <rect x="36" y="28" width="8" height="16" fill="#27d982" />
        <rect x="92" y="20" width="8" height="16" fill="#5cff9d" />
        <rect x="84" y="28" width="8" height="16" fill="#27d982" />
        <rect x="20" y="16" width="8" height="8" fill="#60e8ff" />
        <rect x="20" y="24" width="16" height="8" fill="#60e8ff" />
        <rect x="100" y="16" width="8" height="8" fill="#60e8ff" />
        <rect x="92" y="24" width="16" height="8" fill="#60e8ff" />
        <rect x="44" y="28" width="40" height="8" fill="#9affc7" />
        <rect x="36" y="36" width="56" height="16" fill="#5cff9d" />
        <rect x="28" y="52" width="72" height="24" fill="#32f08c" />
        <rect x="32" y="76" width="64" height="16" fill="#1fc878" />
        <rect x="40" y="92" width="48" height="12" fill="#129b60" />
        <rect x="48" y="104" width="32" height="8" fill="#0f6f49" />
        <rect x="44" y="52" width="8" height="8" fill="#82ffc4" />
        <rect x="76" y="52" width="8" height="8" fill="#82ffc4" />
        <rect className="deer-eye deer-eye-left" x="48" y="64" width="8" height="12" fill="#020604" />
        <rect className="deer-eye deer-eye-right" x="72" y="64" width="8" height="12" fill="#020604" />
        <rect className="deer-eye-shine deer-eye-left" x="52" y="64" width="4" height="4" fill="#d8fff0" />
        <rect className="deer-eye-shine deer-eye-right" x="76" y="64" width="4" height="4" fill="#d8fff0" />
        <rect x="60" y="76" width="8" height="8" fill="#063b27" />
        <rect x="56" y="84" width="16" height="4" fill="#031007" />
        <rect x="32" y="72" width="8" height="8" fill="#7dffb2" />
        <rect x="88" y="72" width="8" height="8" fill="#7dffb2" />
        <rect x="52" y="108" width="8" height="8" fill="#24483b" />
        <rect x="68" y="108" width="8" height="8" fill="#24483b" />
      </svg>
    </div>
  );
}

function NumberRings() {
  return (
    <svg
      className="number-ring-svg"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-hidden="true"
    >
      <defs>
        {numberRings.map((ring) => (
          <path id={`number-path-${ring.className}`} d={circlePathD(ring.r)} key={ring.className} />
        ))}
      </defs>
      {numberRings.map((ring, index) => (
        <g className={`number-ring-group ${ring.className}`} key={ring.className}>
          <use href={`#number-path-${ring.className}`} className="number-ring-guide" />
          <text>
            <textPath href={`#number-path-${ring.className}`} startOffset={`${index * 11}%`}>
              {piRingDigits(ring.offset, 260).split("").map((digit, digitIndex) => {
                const isOdd = Number(digit) % 2 === 1;
                return (
                  <tspan
                    className={isOdd ? "pi-digit pi-digit-odd" : "pi-digit"}
                    key={`${ring.className}-${digitIndex}`}
                    style={isOdd ? { animationDelay: `${((digitIndex % 17) * 0.31 + index * 0.58).toFixed(2)}s` } : undefined}
                  >
                    {digit}
                  </tspan>
                );
              })}
            </textPath>
          </text>
        </g>
      ))}
    </svg>
  );
}

function CodeRingsHero() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="music-ripple-field">
        <span className="ripple-ring ripple-ring-a" />
        <span className="ripple-ring ripple-ring-b" />
        <span className="ripple-ring ripple-ring-c" />
        <span className="ripple-ring ripple-ring-d" />
      </div>
      <NumberRings />
      <DeerMascot />
      <StarField />
    </div>
  );
}

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteInfo.name,
      url: siteUrl,
      description: siteInfo.description,
      inLanguage: "zh-CN",
      publisher: {
        "@type": "Person",
        name: siteInfo.creator,
        sameAs: socialLinks.map((link) => link.href),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteInfo.creator,
      url: siteUrl,
      description: "一个连接 AI、商业洞见、数字花园与自然疗愈感的个人 IP 系统。",
      sameAs: socialLinks.map((link) => link.href),
    },
  ];

  return (
    <SiteChrome>
      <JsonLd data={jsonLd} />
      <section className="hero-section" id="top">
        <CodeRingsHero />
        <div className="hero-copy">
          <p className="eyebrow">个人 IP · 数字花园 · AI 时代长期主义</p>
          <h1>把思想种成一片宇宙</h1>
          <p className="hero-lede">
            树先生宇宙是一个面向 GEO、搜索和社媒传播的个人知识现场：
            科技洞见、商业判断与大自然的治愈感，在这里沉淀为长期资产。
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/garden">
              进入数字花园
            </Link>
            <Link className="secondary-button" href="/lab">
              查看实验室
            </Link>
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
          {universePillars.map((pillar, index) => (
            <Link className="pillar-card" href={pillar.href} key={pillar.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </Link>
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
          {socialLinks.map((link) => (
            <a href={link.href} key={link.platform} target="_blank" rel="noreferrer">
              {link.platform}
            </a>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
