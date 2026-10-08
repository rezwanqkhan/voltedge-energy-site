import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Cpu,
  Leaf,
  Layers,
  Router,
  Shield,
  ShieldCheck,
  Thermometer,
  TrendingDown,
  Zap,
} from "lucide-react";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LiveTelemetryDashboard } from "@/components/home/LiveTelemetryDashboard";
import { DeploymentTimeline } from "@/components/home/DeploymentTimeline";
import { SocialProofSection } from "@/components/home/SocialProofSection";

export const metadata: Metadata = {
  title: "Industrial IoT Energy Management & Submetering",
  description:
    "Cut peak energy costs by up to 32% with VoltEdge revenue-grade submetering, DIN-rail IoT gateways, and automated edge telemetry.",
  alternates: {
    canonical: "/",
  },
};

const iconMap = {
  Router,
  Zap,
  Thermometer,
  BarChart3,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ────────────────── 1. HERO SECTION (Light & Clean Industrial Glow) ────────────────── */}
      <Section
        id="hero"
        theme="light"
        className="pt-16 sm:pt-32 lg:pt-36 pb-8 sm:pb-24 bg-hero-glow overflow-hidden relative"
      >
        {/* Subtle Engineering Dot Grid Texture */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none opacity-40 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Ambient Cyan/Sky Light Glow behind Dashboard */}
        <div
          className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-cyan-400/20 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Benefit-led copy & credibility */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 border border-sky-200/90 shadow-[0_2px_10px_rgba(2,132,199,0.08)] backdrop-blur-md text-[11px] sm:text-xs font-medium text-slate-700">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold text-slate-900">
                  Live Plant Telemetry v4.2
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[#0284c7] font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3 sm:h-3.5 w-3 sm:w-3.5" /> IEC 62443 Certified
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="fluid-h1 font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Cut industrial peak energy costs by{" "}
                <span className="bg-gradient-to-r from-[#0284c7] via-cyan-600 to-[#0369a1] bg-clip-text text-transparent">
                  up to 32%
                </span>{" "}
                with zero downtime.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-normal sm:leading-relaxed max-w-xl">
                VoltEdge combines revenue-grade DIN-rail submetering with autonomous edge telemetry to eliminate peak demand surcharges, automate ISO 50001 compliance, and guarantee sub-second fault detection.
              </p>
            </Reveal>

            {/* CTAs: Side by side on desktop, stacked full-width on mobile */}
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-0.5 sm:pt-1 w-full sm:w-auto">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto btn-shimmer justify-center sm:text-base sm:py-3.5 sm:px-6"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Book Plant Demonstration
                </Button>

                <Button
                  href="/products"
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto border-slate-300 text-slate-800 hover:bg-slate-100 justify-center sm:text-base sm:py-3.5 sm:px-6"
                  icon={<Layers className="h-4 w-4" />}
                >
                  Explore Hardware Specs
                </Button>
              </div>
            </Reveal>

            {/* Quick-Proof Micro-Strip (Instant Credibility) */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-slate-200/80">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/80 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-1 text-[#0284c7] font-mono-numbers font-extrabold text-xs sm:text-base">
                    <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>&lt; 100ms</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Telemetry Latency
                  </div>
                </div>

                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/80 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-1 text-slate-900 font-mono-numbers font-extrabold text-xs sm:text-base">
                    <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />
                    <span>99.98%</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Hardware SLA
                  </div>
                </div>

                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/80 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-1 text-slate-900 font-mono-numbers font-extrabold text-xs sm:text-base">
                    <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#0284c7]" />
                    <span>1,240+</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Monitored Plants
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Live SCADA Console Screen */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2} direction="up">
              <LiveTelemetryDashboard />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ────────────────── 2. SOCIAL PROOF & LOGO MARQUEE (Light) ────────────────── */}
      <Section theme="light" className="py-8 sm:py-16 border-y border-slate-200/80">
        <SocialProofSection />
      </Section>

      {/* ────────────────── 3. PRODUCTS TEASER (Light) ────────────────── */}
      <Section id="products" theme="light" className="py-10 sm:py-24">
        <div className="space-y-6 sm:space-y-14">
          <SectionHeading
            theme="light"
            eyebrow="Precision Hardware & SaaS"
            title="Industrial IoT Architecture"
            subtitle="Compact, revenue-grade DIN-rail meters and cloud analytics designed for open industrial standards."
          />

          {/* 4 Compact Product Cards: 1 col mobile, 2 col tablet, 4 col desktop */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => {
              const IconComp = iconMap[product.icon] || Zap;

              return (
                <StaggerItem key={product.id}>
                  <Card
                    theme="light"
                    className="flex flex-col justify-between space-y-3 sm:space-y-4 h-full group border-slate-200/80"
                  >
                    <div className="space-y-2.5 sm:space-y-3">
                      {/* Card Top: Icon & Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:text-[#00e5ff] group-hover:bg-slate-900 transition-colors shadow-sm">
                          <IconComp className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                        </div>
                        {product.badge && (
                          <Badge variant="neutral" size="sm">
                            {product.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                        {product.name}
                      </h3>

                      {/* Benefit (No specs list on Home!) */}
                      <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                        {product.benefit}
                      </p>
                    </div>

                    {/* View Details Link */}
                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        href={`/products#${product.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00b4d8] hover:text-[#0f172a] transition-colors focus-ring rounded"
                      >
                        <span>View details</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Secondary Link to all products */}
          <div className="text-center pt-1 sm:pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 underline underline-offset-4 focus-ring rounded"
            >
              <span>See all products and full technical specifications</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ────────────────── 4. STATS SECTION (Light) ────────────────── */}
      <Section id="stats" theme="light" className="py-10 sm:py-24 border-t border-slate-200 bg-white">
        <div className="space-y-6 sm:space-y-14">
          <SectionHeading
            theme="light"
            eyebrow="Proven Operational Impact"
            title="Verified Industrial Telemetry Metrics"
            subtitle="Real-world results delivered across 1,240+ manufacturing plants and enterprise facilities."
          />

          {/* Grid: 2x2 on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <StatCard
              theme="light"
              numericValue={32}
              suffix="%"
              label="Peak Reduction"
              description="Average peak demand charge reduction achieved via automated 15-minute load shifting."
              icon={<TrendingDown className="h-4 w-4" />}
            />
            <StatCard
              theme="light"
              numericValue={1240}
              suffix="+"
              label="Monitored Facilities"
              description="Active manufacturing plants and hyperscale data centers monitored worldwide."
              icon={<Building2 className="h-4 w-4" />}
            />
            <StatCard
              theme="light"
              numericValue={99.98}
              suffix="%"
              decimals={2}
              label="Platform SLA"
              description="Carrier-redundant uptime with local 90-day hardware ring buffer protection."
              icon={<ShieldCheck className="h-4 w-4" />}
            />
            <StatCard
              theme="light"
              numericValue={48000}
              suffix=" t"
              label="Carbon Offset"
              description="Verified annual metric tons of greenhouse gas emissions prevented across facilities."
              icon={<Leaf className="h-4 w-4" />}
            />
          </div>
        </div>
      </Section>

      {/* ────────────────── 5. RELIABILITY SECTION (Light) ────────────────── */}
      <Section id="reliability" theme="light" className="py-10 sm:py-24 border-t border-slate-200 bg-slate-50/50">
        <div className="space-y-6 sm:space-y-14">
          <SectionHeading
            theme="light"
            eyebrow="Mission-Critical Standards"
            title="Enterprise Energy Reliability"
            subtitle="Engineered from first principles to meet demanding industrial and power quality standards."
          />

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-8">
            <StaggerItem>
              <Card theme="light" className="space-y-2.5 sm:space-y-3.5 h-full border-slate-200/80">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-[#0284c7]" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-slate-900">
                  Edge Processing Autonomy
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                  Filter and aggregate sensor readings directly on-device. When cloud backhaul drops, the gateway retains up to 90 days of encrypted telemetry locally.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card theme="light" className="space-y-2.5 sm:space-y-3.5 h-full border-slate-200/80">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-[#0284c7]" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-slate-900">
                  Predictive Harmonic Faults
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                  Identify voltage sags, power factor degradation, and thermal bearing breakdown weeks before critical machinery trips your plant breaker.
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card theme="light" className="space-y-2.5 sm:space-y-3.5 h-full border-slate-200/80">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-[#0284c7]" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-slate-900">
                  Automated ISO 50001 Reports
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                  Export one-click EnPI (Energy Performance Indicator) verification reports ready for TÜV, DNV, and external carbon emission auditors.
                </p>
              </Card>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      {/* ────────────────── 6. DEPLOYMENT TIMELINE (Light) ────────────────── */}
      <Section id="deployment" theme="light" className="py-10 sm:py-24 border-t border-slate-200 bg-white">
        <DeploymentTimeline />
      </Section>

      {/* ────────────────── 7. FINAL CTA SECTION (Accent Light) ────────────────── */}
      <Section theme="accent" className="py-12 sm:py-28 border-t border-slate-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <Badge variant="accent" size="sm">
            Rapid Engineering Onboarding
          </Badge>

          <h2 className="fluid-h2 font-extrabold text-slate-900 tracking-tight leading-tight">
            Ready to eliminate unmeasured energy waste in your facility?
          </h2>

          <p className="text-xs sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto leading-normal sm:leading-relaxed">
            Schedule an engineering consultation. Our IoT specialists evaluate your electrical single-line diagram and calculate your projected ROI within 48 hours.
          </p>

          <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full sm:w-auto btn-shimmer sm:text-base sm:py-3.5 sm:px-6"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Schedule Technical Audit
            </Button>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-500">
            Engineering response within 48 hours • NDA guaranteed • Free single-line evaluation
          </p>
        </div>
      </Section>
    </div>
  );
}
