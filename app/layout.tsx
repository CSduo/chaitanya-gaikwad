import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { Header } from "@/components/site/Header";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { Footer } from "@/components/site/Footer";
import { LegacyHashRedirect } from "@/components/site/LegacyHashRedirect";
import { JsonLd } from "@/components/ui/primitives";
import { organizationSchema, webSiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.descriptor}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  keywords: [
    "XIYÀTO",
    "XIYATO",
    "Xiyato",
    "xiyato.uk",
    "Chaitanya Gaikwad",
    "Xiyato Studio",
    "Xiyato UK",
    "Xiyato India",
    "CAD drafting services",
    "AutoCAD outsourcing UK",
    "interior design CAD packages",
    "joinery detail drawings",
    "reflected ceiling plans",
    "architectural drafting",
    "3D architectural visualisation",
    "interior 3D rendering",
    "luxury hospitality 3D visuals",
    "photorealistic product rendering",
    "cinematic video production",
    "luxury furniture brand film",
    "AI video editing",
    "architectural video walkthrough",
    "B2B lead generation",
    "market research intelligence",
    "Middle East lead discovery",
    "Saudi Arabia buyers shortlist",
    "India fabric import research",
    "client acquisition campaigns",
    "WhatsApp automation",
    "CRM lead routing",
    "cold email outreach systems",
    "custom website design development",
    "Next.js web agency",
    "portfolio websites",
    "high performance business websites",
  ],
  authors: [{ name: "Chaitanya Gaikwad", url: "https://xiyato.uk/company/people" }],
  creator: "XIYÀTO",
  publisher: "XIYÀTO",
  category: "Business & Creative Production Services",
  classification: "Technical Documentation, 3D Visualisation, Video Production, B2B Research, Automation & Web Development",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: SITE.url,
    languages: {
      "en-GB": SITE.url,
      "en-IN": SITE.url,
      "en-US": SITE.url,
      "x-default": SITE.url,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/emblem-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/emblem-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/emblem-256.png", type: "image/png", sizes: "256x256" },
      { url: "/brand/emblem-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/brand/emblem-180.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/brand/emblem-180.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: ["IjQduuSOmYJmgmhyNk6YA2rpWUe2b5uaPPdpGb-fLFs", "googleb531fd48b43d4f1b"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.defaultDescription,
    locale: SITE.locale,
    images: [
      {
        url: `${SITE.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Technical, Creative & Growth Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.defaultDescription,
    images: [`${SITE.url}/opengraph-image.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={SITE.language}
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <LegacyHashRedirect />
        <TrackingScripts />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xs focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>

        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
