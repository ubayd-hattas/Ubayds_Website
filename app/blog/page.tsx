import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Ubayd Hattas — thoughts on data science, South African data, mathematics, studying, and building a disciplined life. UCT first-year student and creator of SA Data Hub.",
  alternates: {
    canonical: "https://ubayd.me/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
