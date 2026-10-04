import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "VoltEdge Energy — Industrial IoT Energy Management",
    template: "%s | VoltEdge Energy",
  },
  description:
    "VoltEdge Energy delivers IoT-based energy monitoring products and cloud analytics for industrial and commercial facilities. Reduce costs by up to 32% with real-time telemetry.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VoltEdge Energy",
    title: "VoltEdge Energy — Industrial IoT Energy Management",
    description:
      "IoT-based energy monitoring products and cloud analytics for industrial and commercial facilities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* Floating Widgets */}
        <FloatingContactWidget />
        <ScrollProgressTop />
      </body>
    </html>
  );
}
