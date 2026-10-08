"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Cpu, FileCheck, Layers } from "lucide-react";

interface Milestone {
  day: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
  {
    day: "Day 1",
    title: "Site Survey & Single-Line Audit",
    description:
      "Engineering review of single-line electrical diagrams, transformer feeder ratings, and existing Modbus/SCADA network topologies.",
    icon: <FileCheck className="h-5 w-5 text-[#0284c7]" />,
  },
  {
    day: "Day 3–7",
    title: "Zero-Downtime Hardware Retrofit",
    description:
      "Split-core current transformers and 35mm DIN-rail gateways install in under 2 hours per switchboard without plant electrical shutdown.",
    icon: <Cpu className="h-5 w-5 text-[#0284c7]" />,
  },
  {
    day: "Day 10",
    title: "Telemetry Validation & SCADA Link",
    description:
      "Sub-second data stream verification, edge ring buffer calibration, and encrypted MQTT/OPC-UA mapping into plant control systems.",
    icon: <Layers className="h-5 w-5 text-[#0284c7]" />,
  },
  {
    day: "Day 14",
    title: "Live & First Demand Savings Audit",
    description:
      "Autonomous 15-minute peak demand threshold protection goes active, generating the first verified ISO 50001 cost reduction report.",
    icon: <CheckCircle2 className="h-5 w-5 text-[#0284c7]" />,
  },
];

export function DeploymentTimeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-6 sm:space-y-16">
      {/* Top Banner with big 14 Days stat */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0284c7]/10 text-[#0284c7] text-[11px] sm:text-xs font-bold border border-[#0284c7]/20">
          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          <span>Turnkey Industrial Deployment</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          From Blueprint to Live Telemetry in{" "}
          <span className="text-[#0284c7]">14 Days</span>.
        </h2>

        <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          No facility shutdowns. No rewiring busbars. Our modular hardware and automated provisioning deliver measurable energy ROI in two weeks.
        </p>
      </div>

      {/* Desktop Horizontal / Mobile Vertical Timeline */}
      <div className="relative">
        {/* Desktop Connecting Line */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-slate-200 via-[#0284c7]/40 to-slate-200 -translate-y-8 -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
          {MILESTONES.map((step, idx) => (
            <motion.div
              key={step.day}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="card-light bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-2 sm:space-y-3 border border-slate-200 shadow-sm hover:border-[#0284c7] h-full relative group"
            >
              <div className="space-y-2 sm:space-y-3">
                {/* Header with Day Pill and Icon */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-[#0284c7] text-[10px] sm:text-xs font-mono-numbers font-bold border border-slate-200">
                    {step.day}
                  </span>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:border-[#0284c7]/40 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {step.title}
                </h3>

                <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator dot */}
              <div className="pt-1 sm:pt-2 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono-numbers text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0284c7]" />
                <span>Phase 0{idx + 1} of 04</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
