import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SiteChrome from "@/components/SiteChrome";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { absoluteUrl, siteInfo } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function renderMarkdown(body: string) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    elements.push(
      <ul key={`ul-${elements.length}`}>
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={index}>{trimmed.replace(/^## /, "")}</h2>);
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={index}>{trimmed.replace(/^### /, "")}</h3>);
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.replace(/^- /, ""));
      return;
    }

    flushList();
    elements.push(<p key={index}>{trimmed}</p>);
  });

  flushList();
  return elements;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `/garden/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: absoluteUrl(`/garden/${article.slug}`),
      publishedTime: article.updatedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      name: siteInfo.creator,
    },
    publisher: {
      "@type": "Person",
      name: siteInfo.creator,
    },
    mainEntityOfPage: absoluteUrl(`/garden/${article.slug}`),
  };

  return (
    <SiteChrome>
      <JsonLd data={jsonLd} />
      <article className="article-layout">
        <Link className="breadcrumb-link" href="/garden">
          返回数字花园
        </Link>
        <header className="article-header">
          <div className="card-meta">
            <span>{article.category}</span>
            <time dateTime={article.updatedAt}>{article.updatedAt}</time>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </header>
        <div className="article-body">{renderMarkdown(article.body)}</div>
      </article>
    </SiteChrome>
  );
}
