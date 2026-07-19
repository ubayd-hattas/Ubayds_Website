import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ubayd.me"),
  title: {
    default: "Ubayd Hattas — Data Science & Computer Science Student at UCT",
    template: "%s | Ubayd Hattas",
  },
  description:
    "Ubayd Hattas is a first-year BSc student at the University of Cape Town, majoring in Computer Science, Statistics & Data Science. Creator of SA Data Hub — making South African data accessible. From Cape Town, South Africa.",
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
    "SA Data Hub",
    "sadatahub.tech",
    "South African data",
    "AI",
    "Machine Learning",
    "BSc student",
    "Afriguard",
    "Global South AI Safety Hackathon",
    "AI safety benchmark",
    "AI safety research",
    "AI safety",
    "AI safety guardrails",
    "AI safety guardrails degradation research",
    "Dr Mahier Hattas",
  ],
  authors: [{ name: "Ubayd Hattas", url: "https://ubayd.me" }],
  creator: "Ubayd Hattas",
  alternates: {
    canonical: "https://ubayd.me",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://ubayd.me",
    siteName: "Ubayd Hattas",
    title: "Ubayd Hattas — Data Science & Computer Science Student at UCT",
    description:
      "First-year BSc student at UCT majoring in Computer Science, Statistics & Data Science. Creator of SA Data Hub — making South African public data accessible to everyone.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ubayd Hattas — Data Science Student at UCT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubayd Hattas — Data Science & Computer Science Student at UCT",
    description:
      "First-year BSc student at UCT majoring in Computer Science, Statistics & Data Science. Creator of SA Data Hub.",
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
    google: "1e1a0b335f98cead",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ubayd.me/#person",
  name: "Ubayd Hattas",
  url: "https://ubayd.me",
  image: "https://ubayd.me/profile.jpg",
  sameAs: [
    "https://github.com/ubayd-hattas",
    "https://www.linkedin.com/in/ubayd-hattas/",
  ],
  jobTitle: "BSc Student — Computer Science, Statistics & Data Science",
  worksFor: {
    "@type": "Organization",
    name: "University of Cape Town",
    url: "https://www.uct.ac.za",
  },
  birthDate: "2008-02-23",
  birthPlace: { "@type": "Place", name: "Pretoria, South Africa" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressCountry: "ZA",
  },
  description:
    "First-year BSc student at the University of Cape Town, majoring in Computer Science, Statistics and Data Science. Passionate about AI, mathematics, and building meaningful things with data.",
  knowsAbout: [
    "Data Science", "Statistics", "Computer Science",
    "Machine Learning", "Artificial Intelligence", "Mathematics", "Python", "R",
  ],
};
// WebSite schema — omits potentialAction/SearchAction because the blog search
// is client-side only and does not respond to ?q= server-side. Declaring a
// SearchAction for a non-functional endpoint generates spurious Search Console
// warnings and violates Google's Sitelinks Searchbox guidelines.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ubayd.me/#website",
  name: "Ubayd Hattas",
  url: "https://ubayd.me",
  inLanguage: "en-ZA",
  description: "Personal website of Ubayd Hattas — UCT BSc student in Computer Science, Statistics & Data Science. Creator of SA Data Hub.",
  author: { "@id": "https://ubayd.me/#person" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement,c=d.classList;c.remove("light","dark");var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){c.add(t);}else{var m=window.matchMedia("(prefers-color-scheme: dark)");c.add(m.matches?"dark":"light");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base text-primary transition-colors duration-300`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:text-white"
            style={{ background: "var(--accent)" }}
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
