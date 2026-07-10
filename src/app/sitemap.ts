import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl, coreRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = coreRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: (route.path === "/" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: route.priority,
  }));

  const articles = getAllArticles().map((article) => ({
    url: absoluteUrl(`/garden/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...routes, ...articles];
}
