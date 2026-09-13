import type { Metadata } from "next";
import SkillsClient from "./SkillsClient";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Skills of Ubayd Hattas: Python, machine learning, domain adaptation, AI evaluation, data engineering, and web development, each tied to shipped project evidence.",
  alternates: {
    canonical: "https://ubayd.me/skills",
  },
};

export default function SkillsPage() {
  return <SkillsClient />;
}
