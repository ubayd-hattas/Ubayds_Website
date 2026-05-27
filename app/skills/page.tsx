import type { Metadata } from "next";
import SkillsClient from "./SkillsClient";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical and personal skills of Ubayd Hattas — programming, statistics, analytical thinking, and leadership.",
};

export default function SkillsPage() {
  return <SkillsClient />;
}
