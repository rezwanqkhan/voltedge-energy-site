"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Router,
  Zap,
  Thermometer,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types";

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

const categories: { label: string; value: ProductCategory }[] = [
  { label: "All Products", value: "all" },
  { label: "Hardware & Meters", value: "hardware" },
  { label: "IoT Gateways", value: "gateway" },
  { label: "Cloud Software", value: "software" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="relative overflow-hidden bg-ambient-mesh min-h-screen">
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Header */}
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                <span>Certified Industrial Hardware & SaaS</span>
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                IoT Energy{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  Products & Software
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Precision-engineered three-phase meters, multi-protocol DIN-rail gateways, and enterprise cloud software built for industrial energy reliability.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter Tabs: Horizontal touch scrollable on mobile */}
          <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none px-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border-none ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                      : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Compact Product Cards: Clean 2x2 Grid with Vibrant Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filtered.map((product) => {
              const isExpanded = expandedId === product.id;
              const theme = productThemeMap[product.id] || {
                icon: Zap,
                iconBg: "bg-emerald-500/15",
                iconColor: "text-emerald-400",
                badgeStyle: "bg-emerald-500/20 text-emerald-300",
                linkColor: "text-emerald-400 hover:text-emerald-300",
                accentColor: "text-emerald-400",
              };
              const IconComponent = theme.icon;

              return (
                <div
                  key={product.id}
                  className="glass-card p-5 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4 sm:space-y-5 border-none"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Top Header */}
                    <div className="flex items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconColor} shrink-0`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {product.name}
                          </h2>
                          <p className={`text-[11px] sm:text-xs ${theme.accentColor} font-medium`}>
                            {product.tagline}
                          </p>
                        </div>
                      </div>

                      {product.badge && (
                        <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shrink-0 ${theme.badgeStyle}`}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Highlights */}
                    {product.highlights && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                        {product.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl bg-slate-950/60 text-[10px] sm:text-[11px] text-slate-300 flex items-center gap-1.5 border-none"
                          >
                            <CheckCircle2 className={`h-3 w-3 ${theme.accentColor} shrink-0`} />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expandable Specifications Sheet */}
                    <div className="pt-2">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : product.id)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 text-xs font-semibold text-slate-200 hover:text-white transition-all border-none"
                      >
                        <span>{isExpanded ? "Hide Technical Specifications" : "View Technical Specifications"}</span>
                        {isExpanded ? (
                          <ChevronUp className={`h-4 w-4 ${theme.accentColor}`} />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 rounded-2xl bg-slate-950/90 p-3.5 sm:p-4 space-y-2 text-xs border-none">
                          {product.specs.map((spec, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-b-0 gap-2 text-[11px] sm:text-xs"
                            >
                              <span className="text-slate-400 font-medium truncate">{spec.label}</span>
                              <span className="text-white font-mono-numbers font-semibold text-right shrink-0">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <Link
                      href="/contact"
                      className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold ${theme.linkColor} transition-colors`}
                    >
                      <span>Inquire Datasheet</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>

                    <Link
                      href="/contact"
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-extrabold transition-all shadow-[0_2px_14px_rgba(52,211,153,0.35)] border-none"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Custom Engineering Note */}
          <div className="rounded-3xl glass-card p-8 text-center space-y-4 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white">Need Custom Modbus Registers or High-Amp Coils?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              We provide OEM customization for current transformer ranges up to 10,000A, custom firmware for private APNs, and dedicated on-premise container deployments.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold transition-all shadow-md"
              >
                <span>Speak with an IoT Solutions Architect</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
