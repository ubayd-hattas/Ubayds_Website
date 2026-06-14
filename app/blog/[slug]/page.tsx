import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedPostsMeta } from "../posts";
import BlogPostClient from "./BlogPostClient";

// ─── Static params — tells Next.js which slugs to pre-render ─────────────────

export function generateStaticParams() {
  return publishedPostsMeta.map((post) => ({ slug: post.slug }));
}

// ─── Per-post metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedPostsMeta.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://ubayd.me/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://ubayd.me/blog/${post.slug}`,
      publishedTime: post.dateISO,
      authors: ["Ubayd Hattas"],
      tags: post.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = publishedPostsMeta.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // BlogPosting JSON-LD schema — makes the post eligible for Google rich results
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Ubayd Hattas",
      url: "https://ubayd.me",
    },
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    url: `https://ubayd.me/blog/${post.slug}`,
    image: "https://ubayd.me/og-image.png",
    publisher: {
      "@type": "Person",
      name: "Ubayd Hattas",
      url: "https://ubayd.me",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ubayd.me/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <BlogPostClient slug={slug} />
    </>
  );
}
