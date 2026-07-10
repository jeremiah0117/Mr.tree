import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { treePersonas } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description:
    "了解树先生宇宙的世界观、三位树先生的角色分工，以及个人 IP 长期主义系统。",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <section className="page-hero compact-page-hero">
        <p className="section-kicker">Universe Origin</p>
        <h1>三棵树，同一个宇宙</h1>
        <p>
          树先生宇宙由三位先生共同构成：硅树先生感悟科技之变，溪树先生感悟文字之美，
          花树先生感悟生命之趣。母品牌负责世界观和长期资产，子品牌负责清晰的内容前台。
        </p>
      </section>

      <section className="content-section">
        <div className="persona-grid">
          {treePersonas.map((persona) => (
            <article className="knowledge-card" key={persona.name}>
              <div className="card-meta">
                <span>{persona.focus}</span>
              </div>
              <h2>{persona.name}</h2>
              <p>{persona.tone}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section two-column">
        <div>
          <p className="section-kicker">Brand Discipline</p>
          <h2>先识别，后风格；先系统，后装饰</h2>
        </div>
        <div className="system-list">
          <p>母品牌提供共同叙事、共同审美原则和联动背书。</p>
          <p>子品牌保持清晰区隔，不为了宇宙感牺牲单个账号的识别效率。</p>
          <p>所有视觉和内容都服务于真实、清晰、有质感、可扩展。</p>
        </div>
      </section>
    </SiteChrome>
  );
}
