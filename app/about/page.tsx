import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Ubayd Hattas — a disciplined, analytically minded first-year student at UCT studying Computer Science, Statistics and Data Science. Head Boy 2025. NSC Top Achiever. Creator of SA Data Hub. Born in Pretoria, raised in Cape Town.",
  alternates: {
    canonical: "https://ubayd.me/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
