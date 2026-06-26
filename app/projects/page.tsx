import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { routableProjects } from "./projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Ubayd Hattas — including SA Data Hub (sadatahub.tech) and AfriGuard, a multilingual AI safety benchmark. Data science experiments, statistical tools, and programming work built during my first year at UCT.",
  keywords: [
    "Ubayd Hattas projects",
    "SA Data Hub",
    "AfriGuard",
    "AI safety benchmark",
    "South African data",
    "Next.js projects",
    "Python projects",
    "UCT student projects",
  ],
  alternates: {
    canonical: "https://ubayd.me/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects | Ubayd Hattas",
    description:
      "Projects by Ubayd Hattas — SA Data Hub, AfriGuard, and more. Data science, AI safety research, and software built during my first year at UCT.",
    url: "https://ubayd.me/projects",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projects by Ubayd Hattas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ubayd Hattas",
    description:
      "Projects by Ubayd Hattas — SA Data Hub, AfriGuard AI safety research, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── JSON-LD — ItemList of all routable projects ──────────────────────────────
// Lists every project that has a dedicated page, making the index crawlable
// by Google as a structured list.

const projectsListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Ubayd Hattas",
  description:
    "Software projects, research, and tools built by Ubayd Hattas — UCT BSc student in Computer Science, Statistics & Data Science.",
  url: "https://ubayd.me/projects",
  numberOfItems: routableProjects.length,
  itemListElement: routableProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": project.live ? "SoftwareApplication" : "CreativeWork",
      name: project.title,
      description: project.seo.description,
      url: `https://ubayd.me/projects/${project.slug}`,
      ...(project.live ? { sameAs: project.live } : {}),
      author: {
        "@type": "Person",
        name: "Ubayd Hattas",
        url: "https://ubayd.me",
      },
    },
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListJsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
