import type { Metric, TeamMember, NavLink } from "@/types";

/** Key performance metrics displayed on the homepage */
export const metrics: Metric[] = [
  {
    id: "cost-savings",
    label: "Average Cost Reduction",
    value: "32",
    suffix: "%",
    description: "Reduction in energy expenditure within 12 months of deployment",
    icon: "TrendingDown",
  },
  {
    id: "facilities",
    label: "Active Facilities",
    value: "1,240",
    description: "Industrial and commercial sites monitored worldwide",
    icon: "Building2",
  },
  {
    id: "uptime",
    label: "Platform Uptime",
    value: "99.97",
    suffix: "%",
    description: "PowerCloud Analytics SLA over the last 24 months",
    icon: "ShieldCheck",
  },
  {
    id: "carbon",
    label: "CO₂ Prevented",
    value: "48K",
    suffix: " tons",
    description: "Annual carbon emissions avoided across our client base",
    icon: "Leaf",
  },
];

/** Engineering and leadership team members */
export const teamMembers: TeamMember[] = [
  {
    id: "elena-voss",
    name: "Elena Voss",
    role: "Chief IoT Architect",
    bio: "15 years designing industrial telemetry systems for automotive and heavy manufacturing plants across Europe.",
    avatar: "/team/elena.jpg",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Energy Systems Lead",
    bio: "Former Schneider Electric engineer specializing in ISO 50001 compliance frameworks and power quality analysis.",
    avatar: "/team/marcus.jpg",
  },
  {
    id: "sarah-okafor",
    name: "Sarah Okafor",
    role: "Head of Hardware Engineering",
    bio: "Leads embedded systems development for VoltPulse and ThermoSense product lines with expertise in low-power RF design.",
    avatar: "/team/sarah.jpg",
  },
  {
    id: "james-ritter",
    name: "James Ritter",
    role: "VP of Product & Customer Success",
    bio: "Drives product strategy and client onboarding, ensuring every deployment achieves measurable energy savings within 90 days.",
    avatar: "/team/james.jpg",
  },
];

/** Main navigation links */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
