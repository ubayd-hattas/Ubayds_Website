import { MetadataRoute } from "next";
import { publishedPostsMeta } from "./blog/posts";
import { sitemapProjects } from "./projects/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ubayd.me";
  // Site-wide content refresh (portfolio repositioning + new project).
  // Static dates are intentional — not regenerated on every build.
  const siteRefresh = new Date("2026-09-13");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteRefresh,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteRefresh,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: siteRefresh,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: siteRefresh,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: siteRefresh,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-06-24"),
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

  // ── Project pages — derived from projects.ts, no manual edits ever needed ──
  // Adding a project with expandable: true automatically includes it here.
  // Private projects are excluded via the sitemapProjects export.
  const projectRoutes: MetadataRoute.Sitemap = sitemapProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.lastUpdated ?? project.dateAdded),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.8,
  }));

  // ── Blog posts — derived from posts.ts, same auto-generation pattern ────────
  const blogRoutes: MetadataRoute.Sitemap = publishedPostsMeta.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated || post.dateISO),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
