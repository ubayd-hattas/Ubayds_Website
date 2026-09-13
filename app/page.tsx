import type { Metadata } from "next";
import HomeClient from "./HomeClient";

// ─── Homepage metadata ────────────────────────────────────────────────────────
// This Server Component exports page-specific metadata that Next.js merges with
// the root layout's defaults. The layout provides metadataBase and global
// robots/verification; this file provides the homepage-specific canonical, OG,
// and Twitter overrides.

export const metadata: Metadata = {
  title: "Ubayd Hattas | Data Science, Computer Science & AI",
  description:
    "Ubayd Hattas is a BSc student at the University of Cape Town studying Computer Science, Statistics & Data Science, building data products and working on applied machine learning and AI evaluation.",
  alternates: {
    canonical: "https://ubayd.me",
  },
  openGraph: {
    type: "profile",
    url: "https://ubayd.me",
    firstName: "Ubayd",
    lastName: "Hattas",
    username: "ubayd-hattas",
    gender: "male",
    title: "Ubayd Hattas | Data Science, Computer Science & AI",
    description:
      "BSc student at UCT studying Computer Science, Statistics & Data Science. Applied ML, AI evaluation, and data products.",
  },
};

export default function Home() {
  return <HomeClient />;
}
