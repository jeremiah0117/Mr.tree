import { getAllArticles } from "@/lib/content";
import { absoluteUrl, siteInfo, siteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const articles = getAllArticles();
  const items = articles
    .map((article) => {
      const url = absoluteUrl(`/garden/${article.slug}`);

      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${escapeXml(article.summary)}</description>
          <category>${escapeXml(article.category)}</category>
          <pubDate>${new Date(article.updatedAt).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteInfo.name)}</title>
        <link>${siteUrl}</link>
        <description>${escapeXml(siteInfo.description)}</description>
        <language>zh-CN</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
