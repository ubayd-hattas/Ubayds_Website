import { MetadataRoute } from "next";
import { publishedPostsMeta } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ubayd.me";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-06-13"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-06-14"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Derived directly from posts.ts — no need to maintain a separate list.
  // Adding a new post to posts.ts automatically includes it in the sitemap.
  const blogRoutes: MetadataRoute.Sitemap = publishedPostsMeta.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateISO),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes];
}
