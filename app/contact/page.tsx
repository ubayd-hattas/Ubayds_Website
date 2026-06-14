import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ubayd Hattas — open to research collaboration, mentorship conversations, and professional enquiries.",
  alternates: {
    canonical: "https://ubayd.me/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
