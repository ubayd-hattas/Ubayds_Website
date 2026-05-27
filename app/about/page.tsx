import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Ubayd Hattas — a disciplined, analytically minded first-year student at UCT studying Computer Science, Statistics and Data Science. Born in Pretoria, raised in Cape Town.",
};

export default function AboutPage() {
  return <AboutClient />;
}
