import type { Metadata } from "next";
import NowClient from "./NowClient";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Ubayd Hattas is currently focused on — studying, reading, building, and thinking about. Updated regularly.",
  alternates: {
    canonical: "https://ubayd.me/now",
  },
};

export default function NowPage() {
  return <NowClient />;
}
