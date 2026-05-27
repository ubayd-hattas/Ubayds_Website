import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Ubayd Hattas — data science experiments, statistical analyses, and programming work.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
