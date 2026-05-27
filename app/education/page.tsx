import type { Metadata } from "next";
import EducationClient from "./EducationClient";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Ubayd Hattas's academic journey at the University of Cape Town — BSc Computer Science, Statistics & Data Science.",
};

export default function EducationPage() {
  return <EducationClient />;
}
