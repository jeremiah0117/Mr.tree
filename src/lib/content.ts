import fs from "node:fs";
import path from "node:path";

export type Article = {
  slug: string;
  title: string;
  category: string;
  updatedAt: string;
  status: string;
  summary: string;
  body: string;
  readingTime: string;
};

const articlesDirectory = path.join(process.cwd(), "content/articles");

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, body: source };
  }

  const data = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [key, ...value] = line.split(":");
        return [key.trim(), value.join(":").trim()];
      }),
  );

  return { data, body: match[2].trim() };
}

function getSummary(body: string) {
  const firstParagraph = body
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#") && !line.startsWith("-"));

  return firstParagraph ?? "树先生宇宙的长期知识节点。";
}

function estimateReadingTime(body: string) {
  const text = body.replace(/[#*\-\n]/g, "");
  const minutes = Math.max(1, Math.ceil(text.length / 500));
  return `${minutes} 分钟`;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(articlesDirectory, file), "utf8");
      const { data, body } = parseFrontmatter(source);

      return {
        slug,
        title: data.title ?? slug,
        category: data.category ?? "数字花园",
        updatedAt: data.updatedAt ?? "2026-07-09",
        status: data.status ?? "seed",
        summary: data.summary ?? getSummary(body),
        body,
        readingTime: estimateReadingTime(body),
      };
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}
