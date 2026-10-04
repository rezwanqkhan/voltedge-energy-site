import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial IoT Products & Gateways",
  description:
    "Explore VoltEdge precision-engineered 3-phase meters, multi-protocol DIN-rail IoT gateways, and cloud software built for industrial energy reliability.",
  openGraph: {
    title: "Industrial IoT Products & Gateways | VoltEdge Energy",
    description:
      "Explore VoltEdge precision-engineered 3-phase meters, multi-protocol DIN-rail IoT gateways, and cloud software built for industrial energy reliability.",
    url: "https://voltedge-energy.vercel.app/products",
    siteName: "VoltEdge Energy",
    locale: "en_US",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
