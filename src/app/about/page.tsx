"use client";

import {
  Target,
  Eye,
  Factory,
  Server,
  Truck,
  User,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { teamMembers } from "@/data/site";

const focusAreas = [
  { icon: Factory, label: "Automotive & Heavy Industry", metric: "380+ Plants" },
  { icon: Server, label: "Hyperscale Data Centers", metric: "1.2 GW Monitored" },
  { icon: Truck, label: "Cold Chain & Logistics", metric: "45,000+ Sensors" },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-ambient-mesh min-h-screen">
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* Header */}
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold shadow-[0_0_15px_rgba(52,211,153,0.2)] border-none">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>Munich • San Francisco • Singapore</span>
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                About{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  VoltEdge Energy
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
                We design and manufacture industrial-grade IoT hardware and cloud software that empower industrial operators to eliminate power waste, stabilize factory grids, and achieve verified net-zero targets.
              </p>
            </div>
          </ScrollReveal>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.05}>
              <div className="glass-card p-8 rounded-3xl space-y-4 h-full border-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)] border-none">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Our Mission
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed">
                  To democratize industrial energy intelligence — making revenue-grade telemetry accessible to every manufacturing plant, substation, and facility worldwide, so that no kilowatt-hour goes unmeasured or wasted.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Class 0.5S Revenue-Grade Precision Standard</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-8 rounded-3xl space-y-4 h-full border-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] border-none">
                  <Eye className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Our Vision
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed">
                  A decarbonized industrial sector where every electrical circuit, machine motor, and thermal line is continuously self-optimizing via autonomous edge AI, preventing outages and cutting industrial emissions by gigatons.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Autonomous AI Peak Load Shaving</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* What We Do & Focus Areas */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-emerald-400 tracking-wider">
                CORE OPERATIONAL SECTORS
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Where VoltEdge Telemetry Runs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {focusAreas.map((area, i) => (
                <ScrollReveal key={area.label} delay={i * 0.08}>
                  <div className="glass-card p-6 rounded-3xl space-y-3 text-center border-none">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.2)] border-none">
                      <area.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{area.label}</h3>
                    <p className="text-xs font-mono-numbers text-emerald-400 font-bold">
                      {area.metric}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-emerald-400 tracking-wider">
                WORLD-CLASS ENGINEERING
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Leadership & Systems Architects
              </h2>
              <p className="text-sm text-slate-200">
                Led by veterans of industrial automation, power engineering, and embedded firmware.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <ScrollReveal key={member.id} delay={i * 0.08}>
                  <div className="glass-card p-6 rounded-3xl text-center space-y-4 h-full flex flex-col justify-between border-none">
                    <div className="space-y-4">
                      {/* Avatar */}
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)] border-none">
                        <User className="h-9 w-9" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                          {member.role}
                        </p>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-3 text-[11px] text-slate-400 font-medium">
                      VoltEdge Systems Team
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="rounded-3xl glass-panel p-8 text-center space-y-6 border-none">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>GLOBAL INDUSTRIAL STANDARDS</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              Compliant with International Quality & Cybersecurity Frameworks
            </h3>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {[
                "ISO 50001 (Energy Management)",
                "IEC 62443 (Industrial Cyber Security)",
                "CE & FCC Industrial Class A/B",
                "RoHS & REACH Hazardous Materials",
                "UL 61010-1 Safety Compliance",
              ].map((cert) => (
                <span
                  key={cert}
                  className="rounded-2xl bg-slate-950/80 px-4 py-2.5 text-xs font-bold text-slate-200 shadow-md border-none"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
