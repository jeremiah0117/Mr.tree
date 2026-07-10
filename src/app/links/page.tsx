import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "连接矩阵",
  description:
    "树先生宇宙的国内外社媒入口，连接 GitHub、X、YouTube、LinkedIn、公众号、视频号、小红书和抖音。",
};

export default function LinksPage() {
  return (
    <SiteChrome>
      <section className="page-hero compact-page-hero">
        <p className="section-kicker">Social Graph</p>
        <h1>把分散平台，接回同一个可信源</h1>
        <p>
          网站是长期可信源，社媒是分发触点。这里预留国内外平台入口，后续替换为真实账号和平台专属 landing page。
        </p>
      </section>

      <section className="content-section">
        <div className="social-grid social-grid-large">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.platform} target="_blank" rel="noreferrer">
              <span>{link.platform}</span>
              <small>{link.region}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="content-section two-column">
        <div>
          <p className="section-kicker">Next Step</p>
          <h2>每个平台都应该有自己的入口页</h2>
        </div>
        <div className="system-list">
          <p>海外平台强调项目、洞见和公开作品。</p>
          <p>国内平台强调系列内容、订阅关系和转化路径。</p>
          <p>所有平台都通过 canonical 链接回到网站，帮助 GEO 和实体识别。</p>
        </div>
      </section>
    </SiteChrome>
  );
}
