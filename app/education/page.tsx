import type { Metadata } from "next";
import EducationClient from "./EducationClient";

export const metadata: Metadata = {
  title: {
    absolute: "Education | Ubayd Hattas at the University of Cape Town",
  },
  description:
    "Education of Ubayd Hattas. BSc student at the University of Cape Town studying Computer Science, Statistics & Data Science (2026 onwards).",
  alternates: {
    canonical: "https://ubayd.me/education",
  },
};

export default function EducationPage() {
  return <EducationClient />;
}
