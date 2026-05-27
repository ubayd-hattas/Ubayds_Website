import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Ubayd Hattas — thoughts on data science, mathematics, studying, and building a disciplined life.",
};

export default function BlogPage() {
  return <BlogClient />;
}
