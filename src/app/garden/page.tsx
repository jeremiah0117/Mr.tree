import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteChrome from "@/components/SiteChrome";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl, siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: "数字花园",
  description:
    "树先生宇宙的数字花园，沉淀 AI 工具实测、Prompt 技巧、GEO 内容结构和个人 IP 增长闭环。",
};

export default function GardenPage() {
  const articles = getAllArticles();
  const jsonLd = articles.map((article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: siteInfo.creator,
    },
    mainEntityOfPage: absoluteUrl(`/garden/${article.slug}`),
  }));

  return (
    <SiteChrome>
      <JsonLd data={jsonLd} />
      <section className="page-hero compact-page-hero">
        <p className="section-kicker">Digital Garden</p>
        <h1>让每一条洞见，都能被人和 AI 找到</h1>
        <p>
          这里不是文章列表，而是树先生宇宙的长期知识结构。每个节点都围绕一个清晰问题、
          一个可复用结论和一组可追溯证据生长。
        </p>
      </section>

      <section className="content-section">
        <div className="note-grid">
          {articles.map((article) => (
            <Link
              className="knowledge-card knowledge-card-link"
              href={`/garden/${article.slug}`}
              id={article.slug}
              key={article.slug}
            >
              <div className="card-meta">
                <span>{article.category}</span>
                <time dateTime={article.updatedAt}>{article.updatedAt}</time>
              </div>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <dl className="structured-list">
                <div>
                  <dt>适合谁</dt>
                  <dd>AI 学习者、内容创作者、个人 IP 主理人</dd>
                </div>
                <div>
                  <dt>沉淀方式</dt>
                  <dd>长文、案例、工具记录、跨平台引用链接</dd>
                </div>
                <div>
                  <dt>阅读时间</dt>
                  <dd>{article.readingTime}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
