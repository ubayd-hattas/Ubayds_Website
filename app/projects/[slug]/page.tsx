import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routableProjects } from "../projects";
import ProjectPageClient from "./ProjectPageClient";
import { buildProjectBreadcrumbJsonLd } from "@/lib/breadcrumb-schema";

// ─── Static params — tells Next.js which slugs to pre-render ─────────────────
// Automatically derived from projects.ts — no manual updates needed.
// Only expandable, non-private projects get dedicated pages.

export function generateStaticParams() {
  return routableProjects.map((p) => ({ slug: p.slug }));
}

// ─── Per-project metadata ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = routableProjects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const ogImage = project.seo.ogImage ?? "/og-image.png";
  const canonicalUrl = `https://ubayd.me/projects/${project.slug}`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    keywords: project.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: project.seo.title,
      description: project.seo.description,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = routableProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // JSON-LD structured data — SoftwareApplication or CreativeWork schema
  const schemaType = project.live ? "SoftwareApplication" : "CreativeWork";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `https://ubayd.me/projects/${project.slug}#project`,
    name: project.title,
    description: project.seo.description,
    url: project.live ?? `https://ubayd.me/projects/${project.slug}`,
    // applicationCategory and operatingSystem are SoftwareApplication-only fields
    ...(schemaType === "SoftwareApplication"
      ? { applicationCategory: "WebApplication", operatingSystem: "Web" }
      : {}),
    author: {
      "@type": "Person",
      "@id": "https://ubayd.me/#person",
      name: "Ubayd Hattas",
      url: "https://ubayd.me",
    },
    creator: {
      "@type": "Person",
      "@id": "https://ubayd.me/#person",
      name: "Ubayd Hattas",
      url: "https://ubayd.me",
    },
    dateCreated: project.dateAdded,
    dateModified: project.lastUpdated ?? project.dateAdded,
    image: project.bannerImage
      ? `https://ubayd.me${project.bannerImage}`
      : "https://ubayd.me/og-image.png",
    keywords: project.tags.join(", "),
    ...(project.github ? { codeRepository: project.github } : {}),
    ...(project.live
      ? {
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "ZAR",
          },
        }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ubayd.me/projects/${project.slug}`,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://ubayd.me/#website",
    },
  };

  const breadcrumbJsonLd = buildProjectBreadcrumbJsonLd(project.slug, project.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectPageClient project={project} />
    </>
  );
}
