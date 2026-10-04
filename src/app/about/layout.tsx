import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Energy Intelligence Mission",
  description:
    "Learn about VoltEdge Energy's mission, leadership team, ISO 50001 compliance, and industrial IoT architecture across Munich, San Francisco, and Singapore.",
  openGraph: {
    title: "About Our Energy Intelligence Mission | VoltEdge Energy",
    description:
      "Learn about VoltEdge Energy's mission, leadership team, ISO 50001 compliance, and industrial IoT architecture across Munich, San Francisco, and Singapore.",
    url: "https://voltedge-energy.vercel.app/about",
    siteName: "VoltEdge Energy",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
