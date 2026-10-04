"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Shield,
  Cpu,
  BarChart3,
  TrendingDown,
  Building2,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Radio,
  Router,
  Thermometer,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";

const productThemeMap: Record<
  string,
  {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    badgeStyle: string;
    linkColor: string;
    accentColor: string;
  }
> = {
  "edge-gw-pro": {
    icon: Router,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    badgeStyle: "bg-cyan-500/20 text-cyan-300",
    linkColor: "text-cyan-400 hover:text-cyan-300",
    accentColor: "text-cyan-400",
  },
  "meter-m3": {
    icon: Zap,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    badgeStyle: "bg-emerald-500/20 text-emerald-300",
    linkColor: "text-emerald-400 hover:text-emerald-300",
    accentColor: "text-emerald-400",
  },
  "therm-node-t1": {
    icon: Thermometer,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    badgeStyle: "bg-amber-500/20 text-amber-300",
    linkColor: "text-amber-400 hover:text-amber-300",
    accentColor: "text-amber-400",
  },
  "volt-cloud": {
    icon: BarChart3,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    badgeStyle: "bg-violet-500/20 text-violet-300",
    linkColor: "text-violet-400 hover:text-violet-300",
    accentColor: "text-violet-400",
  },
};

interface TelemetryPoint {
  id: string;
  name: string;
  load: string;
  voltage: string;
  powerFactor: string;
  status: "Optimal" | "Warning" | "Peak Load";
  thd: string;
}

const telemetrySources: TelemetryPoint[] = [
  {
    id: "feed-main",
    name: "Main Substation Bus A",
    load: "1,428.4 kW",
    voltage: "415.2 V",
    powerFactor: "0.98",
    status: "Optimal",
    thd: "1.8%",
  },
  {
    id: "line-robotics",
    name: "Assembly Line 3 (Robotics)",
    load: "612.8 kW",
    voltage: "408.6 V",
    powerFactor: "0.96",
    status: "Optimal",
    thd: "2.4%",
  },
  {
    id: "hvac-compressors",
    name: "HVAC Chiller & Cryo Plant",
    load: "840.1 kW",
    voltage: "411.5 V",
    powerFactor: "0.94",
    status: "Peak Load",
    thd: "3.1%",
  },
];

export default function HomePage() {
  const [activeTelemetry, setActiveTelemetry] = useState<TelemetryPoint>(telemetrySources[0]);
  const [liveKwOffset, setLiveKwOffset] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveKwOffset((Math.random() - 0.5) * 4.2);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-ambient-mesh">
      {/* ────────────────── 1. HERO SECTION ────────────────── */}
      <section id="home" className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Vibrant Live Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>ISO 50001 & IEC 62443 Certified Telemetry</span>
              </div>

              {/* Headline with vibrant gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Autonomous{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  energy intelligence
                </span>{" "}
                for industrial facilities.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Deploy DIN-rail submeters, LoRaWAN gateways, and AI telemetry to identify energy anomalies in real time, cut peak demand charges by 32%, and automate carbon auditing.
              </p>

              {/* CTAs with vibrant gradient */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all shadow-[0_4px_20px_rgba(52,211,153,0.4)] hover:shadow-[0_4px_28px_rgba(52,211,153,0.6)]"
                >
                  <span>Book Plant Demonstration</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-2xl bg-slate-900/80 hover:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white transition-all shadow-md"
                >
                  <span>Explore Hardware Specs</span>
                </Link>
              </div>

              {/* Trust Indicators with rich colorful icons */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span>1,240+ Facilities Monitored</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <span>Bank-Grade Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Radio className="h-3.5 w-3.5" />
                  </div>
                  <span>Sub-Second Telemetry</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Telemetry Console with Popping Colors */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-slate-900/75 p-6 space-y-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl border-none">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    <span>Real-Time Facility Power Bus</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-[11px] font-mono-numbers font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    ACTIVE 50.0 Hz
                  </span>
                </div>

                {/* Primary Telemetry Display */}
                <div className="p-5 rounded-2xl bg-slate-950/70 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400 font-medium">Total Active Load</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        activeTelemetry.status === "Optimal"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {activeTelemetry.status}
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
                    {(parseFloat(activeTelemetry.load.replace(/,/g, "")) + liveKwOffset).toLocaleString("en-US", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}{" "}
                    <span className="text-lg bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-sans font-bold">
                      kW
                    </span>
                  </div>

                  {/* Multi-tone dynamic energy gradient bar */}
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>

                {/* Telemetry Probe Selector */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 tracking-wider">
                    MONITORED CIRCUITS:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {telemetrySources.map((source) => {
                      const isSelected = activeTelemetry.id === source.id;
                      return (
                        <button
                          key={source.id}
                          onClick={() => setActiveTelemetry(source)}
                          className={`p-3 rounded-2xl text-left transition-all text-xs ${
                            isSelected
                              ? "bg-slate-800 text-white shadow-lg ring-1 ring-emerald-400/30"
                              : "bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                          }`}
                        >
                          <div className="font-semibold truncate text-slate-100">{source.name}</div>
                          <div className="text-[11px] text-emerald-400 font-mono-numbers mt-0.5 font-medium">
                            {source.load} • {source.powerFactor} PF
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Telemetry Metrics Bar with Colorful Numbers */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-slate-950/50">
                    <div className="text-[10px] text-slate-400 font-medium">Phase Voltage</div>
                    <div className="text-sm font-bold text-cyan-300 font-mono-numbers mt-0.5">
                      {activeTelemetry.voltage}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/50">
                    <div className="text-[10px] text-slate-400 font-medium">Power Factor</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono-numbers mt-0.5">
                      {activeTelemetry.powerFactor}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/50">
                    <div className="text-[10px] text-slate-400 font-medium">Harmonics THD</div>
                    <div className="text-sm font-bold text-teal-300 font-mono-numbers mt-0.5">
                      {activeTelemetry.thd}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 2. VALUE PROPOSITION STATS (VIBRANT POPPING COLORS) ────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Stat 1: Emerald/Mint */}
            <ScrollReveal delay={0.05}>
              <div className="glass-card p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">AVERAGE COST SAVINGS</span>
                  <div className="h-7 w-7 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-emerald-400 font-mono-numbers tracking-tight">
                  32%
                </div>
                <p className="text-xs text-slate-300">
                  Peak demand charge reduction via automated load shifting.
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 2: Electric Cyan */}
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">MONITORED FACILITIES</span>
                  <div className="h-7 w-7 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-cyan-400 font-mono-numbers tracking-tight">
                  1,240+
                </div>
                <p className="text-xs text-slate-300">
                  Automotive manufacturing plants and hyperscale data centers.
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 3: Mint/Teal */}
            <ScrollReveal delay={0.15}>
              <div className="glass-card p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">TELEMETRY UPTIME</span>
                  <div className="h-7 w-7 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-300">
                    <Zap className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-teal-300 font-mono-numbers tracking-tight">
                  99.98%
                </div>
                <p className="text-xs text-slate-300">
                  Carrier-redundant failover with on-device SQLite ring buffer.
                </p>
              </div>
            </ScrollReveal>

            {/* Stat 4: Solar Amber */}
            <ScrollReveal delay={0.2}>
              <div className="glass-card p-6 rounded-3xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">CARBON MITIGATION</span>
                  <div className="h-7 w-7 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-amber-400 font-mono-numbers tracking-tight">
                  48,000 <span className="text-xs text-slate-300 font-sans">tCO₂e</span>
                </div>
                <p className="text-xs text-slate-300">
                  Verified annual greenhouse emission offsets for enterprise clients.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ────────────────── 3. HARDWARE & PLATFORM SHOWCASE (COMPACT 2x2 GRID WITH RICH COLORS) ────────────────── */}
      <section id="products" className="py-20 px-4 sm:px-6 scroll-mt-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-emerald-400 tracking-wider">
                END-TO-END INDUSTRIAL ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                IoT Products & Systems
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Compact, revenue-grade IoT meters and cloud analytics designed for open industrial standards.
              </p>
            </div>
          </ScrollReveal>

          {/* Compact Product Cards: Sleek 2x2 Grid with Colorful Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, idx) => {
              const theme = productThemeMap[product.id] || {
                icon: Zap,
                iconBg: "bg-emerald-500/15",
                iconColor: "text-emerald-400",
                badgeStyle: "bg-emerald-500/20 text-emerald-300",
                linkColor: "text-emerald-400 hover:text-emerald-300",
                accentColor: "text-emerald-400",
              };
              const IconComp = theme.icon;

              return (
                <ScrollReveal key={product.id} delay={idx * 0.06}>
                  <div className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-5 h-full">
                    <div className="space-y-4">
                      {/* Top Header with Icon and Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-11 w-11 rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconColor}`}>
                            <IconComp className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">
                              {product.name}
                            </h3>
                            <p className={`text-xs ${theme.accentColor} font-medium`}>
                              {product.tagline}
                            </p>
                          </div>
                        </div>

                        {product.badge && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.badgeStyle}`}>
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Compact Spec Highlights with colorful checks */}
                      {product.highlights && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {product.highlights.map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-xl bg-slate-950/60 text-[11px] text-slate-300 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className={`h-3 w-3 ${theme.accentColor} shrink-0`} />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 flex items-center justify-between">
                      <Link
                        href="/products"
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.linkColor} transition-colors`}
                      >
                        <span>View Specifications</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────── 4. KEY CAPABILITIES (COLOR CODED) ────────────────── */}
      <section id="about" className="py-20 px-4 sm:px-6 scroll-mt-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Enterprise Energy Reliability
            </h2>
            <p className="text-sm text-slate-400">
              Designed from first principles to meet stringent industrial standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-7 rounded-3xl space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Edge Processing Autonomy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filter and aggregate sensor readings on-device. When cloud backhaul drops, the gateway retains up to 90 days of encrypted telemetry.
              </p>
            </div>

            <div className="glass-card p-7 rounded-3xl space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Predictive Harmonic Faults</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Identify voltage sags, power factor degradation, and thermal bearing breakdown weeks before critical machinery trips your plant breaker.
              </p>
            </div>

            <div className="glass-card p-7 rounded-3xl space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Automated ISO 50001 Reports</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Export one-click EnPI (Energy Performance Indicator) verification reports ready for TÜV, DNV, and external carbon emission auditors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 5. CALL TO ACTION BANNER (VIBRANT GLOW) ────────────────── */}
      <section id="contact" className="py-20 px-4 sm:px-6 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-slate-900/90 to-slate-950/90 text-center space-y-6 shadow-[0_20px_60px_-15px_rgba(52,211,153,0.15)] border-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold">
              <Clock className="h-3.5 w-3.5" />
              <span>Typical Industrial Deployment: 14 Days</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
              Ready to eliminate unmeasured energy waste in your facility?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Schedule an engineering consultation. Our IoT specialists evaluate your electrical single-line diagram and calculate your projected ROI within 48 hours.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 px-8 py-4 text-sm font-extrabold text-slate-950 transition-all shadow-[0_4px_25px_rgba(52,211,153,0.4)] hover:shadow-[0_4px_30px_rgba(52,211,153,0.6)]"
              >
                <span>Request Custom Quote & Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
