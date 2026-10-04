import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IoT Engineering Desk",
  description:
    "Connect directly with VoltEdge IoT systems architects in Munich for pilot device trials, BOM quotations, and electrical single-line diagram audits.",
  openGraph: {
    title: "Contact IoT Engineering Desk | VoltEdge Energy",
    description:
      "Connect directly with VoltEdge IoT systems architects in Munich for pilot device trials, BOM quotations, and electrical single-line diagram audits.",
    url: "https://voltedge-energy.vercel.app/contact",
    siteName: "VoltEdge Energy",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
