import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressTop } from "@/components/ui/ScrollProgressTop";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltedge-energy-site.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f19",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VoltEdge Energy — Industrial IoT Energy Management",
    template: "%s | VoltEdge Energy",
  },
  description:
    "Cut peak energy costs by up to 32% with VoltEdge revenue-grade DIN-rail submeters, 4G LTE IoT gateways, and automated edge telemetry.",
  keywords: [
    "Industrial IoT",
    "Energy Management",
    "Submetering",
    "DIN-Rail Gateway",
    "Peak Demand Shaving",
    "ISO 50001",
    "Modbus RTU",
    "Power Quality Analysis",
  ],
  authors: [{ name: "VoltEdge Energy Systems GmbH" }],
  creator: "VoltEdge Energy Systems GmbH",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VoltEdge Energy",
    title: "VoltEdge Energy — Industrial IoT Energy Management",
    description:
      "Cut peak energy costs by up to 32% with VoltEdge revenue-grade DIN-rail submetering and automated edge telemetry.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VoltEdge Energy Industrial IoT Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltEdge Energy — Industrial IoT Energy Management",
    description:
      "Cut peak energy costs by up to 32% with VoltEdge revenue-grade submetering and automated edge telemetry.",
    images: ["/twitter-image"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema.org JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VoltEdge Energy GmbH",
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    description:
      "Manufacturer of industrial IoT submeters, DIN-rail communication gateways, and cloud energy analytics platforms.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Innovation Drive, Tech Quarter",
      addressLocality: "Munich",
      postalCode: "80339",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49-89-123-4567",
      contactType: "engineering support",
      email: "engineering@voltedge-energy.com",
      availableLanguage: ["English", "German"],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0b0f19] text-slate-100 selection:bg-[#00e5ff]/30 selection:text-white">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00e5ff] focus:text-[#0b0f19] focus:font-extrabold focus:rounded-xl focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/* Global Floating Interactivity */}
        <FloatingContactWidget />
        <ScrollProgressTop />
      </body>
    </html>
  );
}
