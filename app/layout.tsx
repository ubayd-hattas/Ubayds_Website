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
    "Ubayd Hattas is a first-year BSc student at the University of Cape Town, majoring in Computer Science, Statistics & Data Science. From Cape Town, South Africa — building towards a career in AI and data science.",
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
  authors: [{ name: "Ubayd Hattas", url: "https://ubayd.me" }],
  creator: "Ubayd Hattas",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://ubayd.me",
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
    google: "1e1a0b335f98cead",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ubayd Hattas",
  url: "https://ubayd.me",
  image: "https://ubayd.me/profile.jpg",
  sameAs: [
    "https://github.com/ubayd-hattas",
    "https://www.linkedin.com/in/ubayd-hattas-0608a2349/",
  ],
  jobTitle: "BSc Student — Computer Science, Statistics & Data Science",
  worksFor: {
    "@type": "Organization",
    name: "University of Cape Town",
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
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ubayd Hattas",
  "url": "https://ubayd.me",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base text-primary transition-colors duration-300`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
