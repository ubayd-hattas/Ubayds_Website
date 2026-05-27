import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ubaydhattas.com"),
  title: {
    default: "Ubayd Hattas. Data Science & Computer Science Student at UCT",
    template: "%s | Ubayd Hattas",
  },
  description:
    "Ubayd Hattas is a first-year BSc student at the University of Cape Town, majoring in Computer Science, Statistics & Data Science. From Cape Town, South Africa, building towards a career in AI and data science.",
  keywords: [
    "Ubayd Hattas",
    "Ubayd",
    "Hattas",
    "UCT",
    "University of Cape Town",
    "Computer Science",
    "Data Science",
    "Statistics",
    "South Africa",
    "Cape Town",
    "AI",
    "Machine Learning",
    "BSc student",
  ],
  authors: [{ name: "Ubayd Hattas", url: "https://ubaydhattas.com" }],
  creator: "Ubayd Hattas",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://ubaydhattas.com",
    siteName: "Ubayd Hattas",
    title: "Ubayd Hattas — Data Science & Computer Science Student at UCT",
    description:
      "First-year BSc student at UCT majoring in Computer Science, Statistics & Data Science. Building towards a future in AI and data science.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ubayd Hattas — Data Science Student",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubayd Hattas — Data Science & Computer Science Student at UCT",
    description:
      "First-year BSc student at UCT majoring in Computer Science, Statistics & Data Science.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-verification-code-here",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ubayd Hattas",
  url: "https://ubaydhattas.com",
  image: "https://ubaydhattas.com/profile.jpg",
  sameAs: [
    "https://github.com/ubayd-hattas",
    "https://www.linkedin.com/in/ubayd-hattas-0608a2349/",
  ],
  jobTitle: "BSc Student — Computer Science, Statistics & Data Science",
  worksFor: {
    "@type": "Organization",
    name: "University of Cape Town",
  },
  alumniOf: {
    "@type": "Organization",
    name: "University of Cape Town",
  },
  birthDate: "2008-02-23",
  birthPlace: {
    "@type": "Place",
    name: "Pretoria, South Africa",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressCountry: "ZA",
  },
  description:
    "First-year BSc student at the University of Cape Town, majoring in Computer Science, Statistics and Data Science. Passionate about AI, mathematics, and building meaningful things with data.",
  knowsAbout: [
    "Data Science",
    "Statistics",
    "Computer Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Mathematics",
    "Python",
    "R",
    "Aura",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808] text-white min-h-screen`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
