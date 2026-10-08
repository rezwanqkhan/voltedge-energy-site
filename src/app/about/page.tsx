import type { Metadata } from "next";
import {
  CheckCircle2,
  Cpu,
  Eye,
  Lock,
  Target,
  Zap,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About VoltEdge Energy — Industrial IoT Engineering",
  description:
    "Learn about VoltEdge Energy's mission to eliminate industrial power waste through revenue-grade submetering and automated edge telemetry.",
  alternates: {
    canonical: "/about",
  },
};

const VALUES = [
  {
    icon: Target,
    title: "Class 0.5S Accuracy",
    description:
      "Precision without compromise. Every submeter conforms strictly to IEC 62053-22 revenue-grade standards, ensuring automated ISO 50001 audit compliance.",
  },
  {
    icon: Zap,
    title: "Non-Intrusive Retrofit",
    description:
      "Engineered to install in live factory switchboards via split-core current transformers, preventing costly plant production downtime.",
  },
  {
    icon: Cpu,
    title: "Edge Processing Autonomy",
    description:
      "Local intelligence that never drops a reading. With 90-day hardware ring buffers, plant telemetry remains secure even during WAN outages.",
  },
  {
    icon: Lock,
    title: "Strict Data Sovereignty",
    description:
      "Enterprise industrial data is isolated under ISO 27001 policies with end-to-end TLS 1.3 encryption and dedicated on-premise container deployment options.",
  },
];

const MILESTONES = [
  {
    year: "2021",
    title: "Founded in Munich",
    description: "Formed by veterans of industrial power engineering and embedded hardware.",
  },
  {
    year: "2022",
    title: "Class 0.5S DIN Submeter",
    description: "Engineered our proprietary split-core CT submeter with 100ms harmonic analysis.",
  },
  {
    year: "2023",
    title: "500+ Monitored Plants",
    description: "Expanded deployment into heavy automotive stamping and chemical processing.",
  },
  {
    year: "2025",
    title: "1,240+ Global Facilities",
    description: "Surpassed 48,000 tCO₂e in verified annual greenhouse emissions avoided.",
  },
];

const FICTIONAL_TEAM = [
  {
    name: "Dr. Markus Lindemann",
    role: "Chief IoT Architect",
    initials: "ML",
    bio: "18 years architecting high-availability telemetry and embedded sensors for European automotive factories.",
  },
  {
    name: "Ingrid Weber",
    role: "Head of Power Quality",
    initials: "IW",
    bio: "Specializes in IEC 62443 cyber security, harmonic distortion mitigation, and ISO 50001 compliance frameworks.",
  },
  {
    name: "Elena Rostova",
    role: "VP of Industrial Solutions",
    initials: "ER",
    bio: "Directs turnkey facility onboarding, ensuring every plant achieves verifiable peak demand savings within 90 days.",
  },
  {
    name: "Tariq Al-Mansoor",
    role: "Lead Embedded Firmware",
    initials: "TM",
    bio: "Expert in ultra-low power RF topologies, LoRaWAN protocol optimization, and on-device machine learning.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ────────────────── Header & Mission (Light) ────────────────── */}
      <Section
        id="about-hero"
        theme="light"
        className="pt-24 sm:pt-32 pb-16 bg-hero-glow"
      >
        <div className="space-y-12 sm:space-y-16">
          <SectionHeading
            theme="light"
            eyebrow="Industrial Engineering Excellence"
            title="Empowering Industry to Eliminate Energy Waste"
            subtitle="VoltEdge designs and manufactures revenue-grade IoT hardware and cloud software that empower industrial operators to stabilize factory power and reach verified net-zero targets."
          />

          {/* Mission & Vision 2-Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card theme="light" className="space-y-4 border-slate-200 bg-white shadow-sm">
              <div className="h-11 w-11 rounded-2xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To democratize industrial energy intelligence — making revenue-grade submetering and automated edge telemetry accessible to every manufacturing plant, substation, and facility worldwide, so that no kilowatt-hour goes unmeasured or wasted.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Class 0.5S Revenue-Grade Precision Standard</span>
              </div>
            </Card>

            <Card theme="light" className="space-y-4 border-slate-200 bg-white shadow-sm">
              <div className="h-11 w-11 rounded-2xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A decarbonized industrial sector where every electrical circuit, machine motor, and thermal line is continuously self-optimizing via autonomous edge AI, cutting peak demand charges and preventing machinery breakdown.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Autonomous 15-Minute Peak Load Shifting</span>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ────────────────── Core Values (Light) ────────────────── */}
      <Section id="values" theme="light" className="py-16 sm:py-24 border-t border-slate-200 bg-slate-50/50">
        <div className="space-y-12 sm:space-y-16">
          <SectionHeading
            theme="light"
            eyebrow="Architectural Principles"
            title="Built for Harsh Industrial Realities"
            subtitle="Every component in our hardware stack is designed around four non-negotiable engineering tenets."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {VALUES.map((val) => {
              const IconComp = val.icon;
              return (
                <Card
                  key={val.title}
                  theme="light"
                  className="space-y-3.5 h-full border-slate-200 bg-white"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0284c7]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ────────────────── Milestones Timeline (Light) ────────────────── */}
      <Section id="milestones" theme="light" className="py-16 sm:py-24 border-t border-slate-200 bg-white">
        <div className="space-y-12 sm:space-y-16">
          <SectionHeading
            theme="light"
            eyebrow="Engineering Roadmap"
            title="Our Journey in Industrial Telemetry"
            subtitle="Scaling from Munich electrical prototyping labs to over 1,240 facilities across Europe, North America, and Asia."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {MILESTONES.map((item) => (
              <Card
                key={item.year}
                theme="light"
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl space-y-2 border-slate-200 bg-slate-50/70"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono-numbers">
                  {item.year}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ────────────────── Team Section (Light) ────────────────── */}
      <Section id="team" theme="light" className="py-16 sm:py-24 border-t border-slate-200 bg-slate-50/50">
        <div className="space-y-10 sm:space-y-14">
          <SectionHeading
            theme="light"
            eyebrow="Fictional Systems Leadership"
            title="Engineering & Architecture Team"
            subtitle="Fictional representations of our hardware design, embedded firmware, and power quality specialists."
          />

          {/* Grid: 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {FICTIONAL_TEAM.map((member) => (
              <Card
                key={member.name}
                theme="light"
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center space-y-3 h-full flex flex-col justify-between border-slate-200 bg-white"
              >
                <div className="space-y-3">
                  {/* Generated Initials Avatar Placeholder */}
                  <div className="mx-auto flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-[#0284c7] text-base sm:text-xl font-extrabold shadow-sm border border-slate-300 select-none">
                    {member.initials}
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-semibold text-[#0284c7] mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-2 text-[10px] sm:text-[11px] text-slate-400 font-mono-numbers">
                  VoltEdge Core Systems
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ────────────────── Certifications Banner (Light) ────────────────── */}
      <Section theme="light" className="py-14 sm:py-20 border-t border-slate-200 bg-white">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="accent" size="md">
            Compliance & Verification
          </Badge>

          <h2 className="fluid-h2 font-extrabold text-slate-900 tracking-tight">
            International Quality, Safety & Cybersecurity Standards
          </h2>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 pt-2">
            {[
              "ISO 50001 (Energy Management)",
              "IEC 62443-4-2 (Industrial Cybersecurity)",
              "IEC 62053-22 Class 0.5S (Metering Accuracy)",
              "CE Mark & FCC Part 15 Class A",
              "RoHS & REACH Hazardous Substance Free",
              "UL 61010-1 Electrical Safety",
            ].map((cert) => (
              <span
                key={cert}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 shadow-sm"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
