import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ubayd Hattas, BSc student at UCT studying Computer Science, Statistics & Data Science. Applied machine learning, AI evaluation, and data products. From Pretoria, raised in Cape Town.",
  alternates: {
    canonical: "https://ubayd.me/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
