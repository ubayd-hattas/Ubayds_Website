import type { Metadata } from "next";
import HomeClient from "./HomeClient";

// ─── Homepage metadata ────────────────────────────────────────────────────────
// This Server Component exports page-specific metadata that Next.js merges with
// the root layout's defaults. The layout provides metadataBase and global
// robots/verification; this file provides the homepage-specific canonical, OG,
// and Twitter overrides.

export const metadata: Metadata = {
  // Title is inherited from layout.tsx default — no override needed here.
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
  },
};

export default function Home() {
  return <HomeClient />;
}
