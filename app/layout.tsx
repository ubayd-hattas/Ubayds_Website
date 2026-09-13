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
    default: "Ubayd Hattas | Data Science, Computer Science & AI",
    template: "%s | Ubayd Hattas",
  },
  description:
    "Ubayd Hattas is a BSc student at the University of Cape Town studying Computer Science, Statistics & Data Science, building data products and working on applied machine learning and AI evaluation.",
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
    title: "Ubayd Hattas | Data Science, Computer Science & AI",
    description:
      "BSc student at UCT studying Computer Science, Statistics & Data Science. Applied ML, AI evaluation, and data products, including AfriGuard and SA Data Hub.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ubayd Hattas, Data Science and Computer Science student at UCT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubayd Hattas | Data Science, Computer Science & AI",
    description:
      "BSc student at UCT studying Computer Science, Statistics & Data Science. Applied ML, AI evaluation, and data products.",
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
  jobTitle: "BSc Student in Computer Science, Statistics & Data Science",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Cape Town",
    url: "https://www.uct.ac.za",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressCountry: "ZA",
  },
  description:
    "BSc student at the University of Cape Town studying Computer Science, Statistics & Data Science. Builds data products and works on applied machine learning and AI evaluation.",
  knowsAbout: [
    "Computer Science",
    "Data Science",
    "Statistics",
    "Machine Learning",
    "Artificial Intelligence",
    "AI Safety",
    "Data Engineering",
    "Python",
    "TypeScript",
  ],
};
// WebSite schema — omits potentialAction/SearchAction because blog search is
// not a server-side ?q= endpoint. Declaring SearchAction for a non-functional
// template (e.g. /blog?q={search_term_string}) creates Search Console noise.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ubayd.me/#website",
  name: "Ubayd Hattas",
  url: "https://ubayd.me",
  inLanguage: "en-ZA",
  description:
    "Personal website of Ubayd Hattas, UCT BSc student in Computer Science, Statistics & Data Science. Applied ML, AI evaluation, and data products.",
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
