import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { routableProjects } from "./projects";

export const metadata: Metadata = {
  title: {
    absolute: "Projects by Ubayd Hattas | Data Science, ML & AI Research",
  },
  description:
    "Projects by Ubayd Hattas: Cross-City Building Age Classification, Digital Minds AI introspection research, AfriGuard, and SA Data Hub. Applied data science, machine learning, and AI evaluation from a UCT BSc student.",
  alternates: {
    canonical: "https://ubayd.me/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects by Ubayd Hattas | Data Science, ML & AI Research",
    description:
      "Applied data science, machine learning, and AI evaluation projects by Ubayd Hattas, including domain adaptation, AfriGuard, and SA Data Hub.",
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
    title: "Projects by Ubayd Hattas | Data Science, ML & AI Research",
    description:
      "Applied data science, machine learning, and AI evaluation projects by Ubayd Hattas.",
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
    "Software projects, research, and tools built by Ubayd Hattas, UCT BSc student in Computer Science, Statistics & Data Science.",
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
