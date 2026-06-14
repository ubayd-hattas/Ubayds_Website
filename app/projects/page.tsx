import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Ubayd Hattas — including SA Data Hub (sadatahub.tech), a platform making South African public data accessible. Data science experiments, statistical tools, and programming work.",
  alternates: {
    canonical: "https://ubayd.me/projects",
  },
};

// SoftwareApplication JSON-LD for SA Data Hub — helps Google understand
// this is a real, live software product, not just a description
const saDataHubJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SA Data Hub",
  url: "https://sadatahub.tech",
  applicationCategory: "DataApplication",
  operatingSystem: "Web",
  description:
    "A public platform making South African data accessible to students, journalists, and citizens. Explore population, employment, and economic data from Statistics South Africa, SARB, and other public institutions — with interactive visualisations, province comparisons, and transparent methodologies.",
  author: {
    "@type": "Person",
    name: "Ubayd Hattas",
    url: "https://ubayd.me",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ZAR",
  },
  keywords: "South African data, Statistics South Africa, SA Data Hub, public data, data visualisation",
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(saDataHubJsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
