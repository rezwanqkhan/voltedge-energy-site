"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  LayoutGrid,
  List,
  Router,
  Search,
  SlidersHorizontal,
  Thermometer,
  X,
  Zap,
} from "lucide-react";
import { products, type ProductCategory } from "@/lib/products";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SpecTable } from "@/components/ui/SpecTable";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const iconMap = {
  Router,
  Zap,
  Thermometer,
  BarChart3,
};

const filterTabs: { label: string; value: "All" | ProductCategory }[] = [
  { label: "All Architecture", value: "All" },
  { label: "Hardware & Meters", value: "Hardware" },
  { label: "Cloud Software", value: "Software" },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"All" | ProductCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect and briefly highlight targeted product from URL hash
  useEffect(() => {
    function checkHash() {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setHighlightedId(hash);
        const timer = setTimeout(() => setHighlightedId(null), 3200);
        return () => clearTimeout(timer);
      }
    }

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  function toggleCardSpecs(productId: string) {
    setExpandedSpecs((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }

  // Filter products by category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeTab === "All" || p.category === activeTab;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.features.some((f) => f.toLowerCase().includes(query)) ||
      p.specs.some(
        (s) =>
          s.label.toLowerCase().includes(query) ||
          s.value.toLowerCase().includes(query)
      );

    return matchesCategory && matchesQuery;
  });

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VoltEdge Energy Industrial IoT Catalog",
    description:
      "Revenue-grade submeters, DIN-rail IoT communication gateways, and cloud analytics.",
    itemListElement: products.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        category: p.category,
        url: `https://voltedge-energy-site.vercel.app/products#${p.id}`,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />

      {/* ────────────────── Header & Filters ────────────────── */}
      <Section
        id="catalog-header"
        theme="light"
        className="pt-24 sm:pt-32 pb-8 bg-hero-glow"
      >
        <div className="space-y-6 sm:space-y-8">
          <SectionHeading
            theme="light"
            eyebrow="Certified Industrial Equipment"
            title="IoT Energy Hardware & Software"
            subtitle="Explore Class 0.5S three-phase submeters, multi-protocol DIN-rail IoT gateways, and cloud analytics built for harsh industrial environments."
          />
        </div>
      </Section>

      {/* ────────────────── Interactive Catalog Toolbar ────────────────── */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-xl border-y border-slate-200 py-3 px-4 sm:px-6 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Left: Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Product Categories"
            className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner overflow-x-auto scrollbar-none"
          >
            {filterTabs.map((tab) => {
              const isSelected = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  role="tab"
                  id={`tab-${tab.value}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.value}`}
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "relative px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap focus-ring select-none min-h-[40px] flex items-center justify-center",
                    isSelected
                      ? "text-[#0284c7] font-bold"
                      : "text-slate-600 hover:text-slate-950"
                  )}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="active-product-category"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Quick Search + View Mode Switcher + Product Count */}
          <div className="flex items-center gap-2.5 sm:gap-3 justify-between md:justify-end">
            {/* Live Search Input */}
            <div className="relative flex-1 md:w-64 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specs, protocols..."
                className="w-full pl-8.5 pr-8 py-2 rounded-xl bg-slate-100/90 border border-slate-200/90 text-xs text-slate-900 placeholder:text-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] min-h-[40px] transition-all"
                aria-label="Filter products by keyword or specification"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full text-slate-400 hover:text-slate-700 flex items-center justify-center"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* View Mode Toggle: Grid vs. List */}
            <div
              role="group"
              aria-label="Product layout view"
              className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-inner shrink-0"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
                aria-label="Grid layout view"
                title="Grid Overview View"
                className={cn(
                  "relative p-2 rounded-lg transition-colors flex items-center justify-center min-h-[38px] min-w-[38px]",
                  viewMode === "grid"
                    ? "text-[#0284c7] font-bold"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                <LayoutGrid className="h-4 w-4 relative z-10" />
                {viewMode === "grid" && (
                  <motion.span
                    layoutId="view-mode-indicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-pressed={viewMode === "list"}
                aria-label="Detailed list layout view"
                title="Detailed Specifications View"
                className={cn(
                  "relative p-2 rounded-lg transition-colors flex items-center justify-center min-h-[38px] min-w-[38px]",
                  viewMode === "list"
                    ? "text-[#0284c7] font-bold"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                <List className="h-4 w-4 relative z-10" />
                {viewMode === "list" && (
                  <motion.span
                    layoutId="view-mode-indicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* Product Count Pill (desktop) */}
            <div className="hidden lg:flex items-center text-xs font-semibold text-slate-500 font-mono-numbers px-2">
              {filteredProducts.length} model{filteredProducts.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────── Product Catalog ────────────────── */}
      <Section id="catalog" theme="light" className="py-12 sm:py-16">
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="max-w-6xl mx-auto"
        >
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No matching industrial products
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                No equipment matched &ldquo;{searchQuery}&rdquo; in the {activeTab} category. Try broadening your terms or clear the filter.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("All");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors focus-ring"
                >
                  Reset Catalog Filters
                </button>
              </div>
            </div>
          )}

          {/* ────────────────── 1. GRID VIEW MODE (2-Column Cards) ────────────────── */}
          {viewMode === "grid" && filteredProducts.length > 0 && (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
              >
                {filteredProducts.map((product) => {
                  const IconComp = iconMap[product.icon] || Zap;
                  const isTargeted = highlightedId === product.id;
                  const isExpanded = !!expandedSpecs[product.id];

                  // Extract top 4 quick specs for the grid preview card
                  const keySpecs = product.specs.slice(0, 4);

                  return (
                    <motion.article
                      key={product.id}
                      id={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "scroll-mt-28 rounded-3xl card-light bg-white p-6 sm:p-7 border flex flex-col justify-between space-y-5 transition-all duration-300",
                        isTargeted
                          ? "ring-4 ring-[#0284c7] shadow-[0_0_35px_rgba(2,132,199,0.3)] border-[#0284c7]"
                          : "border-slate-200/90 hover:border-[#0284c7]"
                      )}
                    >
                      <div className="space-y-4">
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#0284c7] tracking-wider uppercase bg-[#0284c7]/10 px-2.5 py-0.5 rounded-md">
                              {product.category}
                            </span>
                            <span className="text-xs font-mono-numbers text-slate-500">
                              #{product.id}
                            </span>
                          </div>
                          {product.badge && (
                            <Badge variant="accent" size="sm">
                              {product.badge}
                            </Badge>
                          )}
                        </div>

                        {/* Blueprint Visual Box + Title Header */}
                        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-4 sm:p-5 flex items-center gap-4 border border-slate-800 text-white shadow-inner overflow-hidden group">
                          {/* Technical Grid Overlay */}
                          <div
                            className="absolute inset-0 opacity-15"
                            style={{
                              backgroundImage:
                                "radial-gradient(#00e5ff 1px, transparent 1px), radial-gradient(#00e5ff 1px, transparent 1px)",
                              backgroundSize: "16px 16px",
                            }}
                          />

                          {/* Glowing Icon */}
                          <div className="relative z-10 h-14 w-14 rounded-2xl bg-[#00e5ff]/15 text-[#00e5ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.25)] border border-[#00e5ff]/30 shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <IconComp className="h-7 w-7" aria-hidden="true" />
                          </div>

                          <div className="relative z-10 min-w-0">
                            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-[#00e5ff] font-medium truncate mt-0.5">
                              {product.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Key Specs Mini Matrix */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {keySpecs.map((spec, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col space-y-0.5"
                            >
                              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                {spec.label}
                              </span>
                              <span className="text-xs font-mono-numbers font-semibold text-slate-900 truncate">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Feature Capabilities (Top 3) */}
                        <div className="space-y-1.5 pt-1">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#0284c7] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* In-Card Expandable Full SpecTable */}
                        {isExpanded && (
                          <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                            animate={prefersReducedMotion ? {} : { opacity: 1, height: "auto" }}
                            exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                            className="pt-3 border-t border-slate-100"
                          >
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                              Full Engineering Datasheet
                            </div>
                            <SpecTable specs={product.specs} theme="light" />
                          </motion.div>
                        )}
                      </div>

                      {/* Card Bottom: Toggle Specs & CTAs */}
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => toggleCardSpecs(product.id)}
                          className="w-full flex items-center justify-between text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] py-1 transition-colors focus-ring rounded"
                        >
                          <span>{isExpanded ? "Hide Full Specs Table" : "View Full Engineering Specs"}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                          <Button
                            href={`/contact?product=${product.id}`}
                            variant="primary"
                            size="md"
                            className="flex-1"
                            icon={<ArrowRight className="h-3.5 w-3.5" />}
                          >
                            Request Quote
                          </Button>

                          <button
                            type="button"
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-semibold focus-ring min-h-[44px]"
                            title="Download Technical Datasheet"
                          >
                            <Download className="h-3.5 w-3.5 text-slate-500" />
                            <span>PDF Datasheet</span>
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* ────────────────── 2. LIST VIEW MODE (Detailed Spec Matrix) ────────────────── */}
          {viewMode === "list" && filteredProducts.length > 0 && (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="space-y-8 sm:space-y-10">
                {filteredProducts.map((product) => {
                  const IconComp = iconMap[product.icon] || Zap;
                  const isTargeted = highlightedId === product.id;

                  return (
                    <motion.article
                      key={product.id}
                      id={product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "scroll-mt-28 rounded-3xl card-light bg-white p-6 sm:p-8 lg:p-10 border transition-all duration-300",
                        isTargeted
                          ? "ring-4 ring-[#0284c7] shadow-[0_0_35px_rgba(2,132,199,0.3)] border-[#0284c7]"
                          : "border-slate-200/90 hover:border-slate-300"
                      )}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Left Column: Device Schematic & Capabilities */}
                        <div className="lg:col-span-4 space-y-5">
                          <div className="relative aspect-square max-h-[260px] w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden border border-slate-800 shadow-inner group">
                            {/* Technical Grid Overlay */}
                            <div
                              className="absolute inset-0 opacity-15"
                              style={{
                                backgroundImage:
                                  "radial-gradient(#00e5ff 1px, transparent 1px), radial-gradient(#00e5ff 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                              }}
                            />

                            {/* Large Technical Icon */}
                            <div className="relative z-10 h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-[#00e5ff]/15 text-[#00e5ff] flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.25)] border border-[#00e5ff]/30 group-hover:scale-105 transition-transform duration-300">
                              <IconComp className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
                            </div>

                            {/* Form Factor Subtitle */}
                            <div className="relative z-10 mt-4 text-[11px] font-mono-numbers text-slate-400 uppercase tracking-widest">
                              {product.category} • DIN-Rail Module
                            </div>

                            {product.badge && (
                              <div className="absolute top-3 right-3 z-10">
                                <Badge variant="accent" size="sm">
                                  {product.badge}
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Feature Capabilities Checklist */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Key Capabilities
                            </div>
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {product.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right Column: Title, Description & Full SpecTable */}
                        <div className="lg:col-span-8 space-y-6">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-[#0284c7] tracking-widest uppercase">
                                {product.category} Series
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs font-mono-numbers text-slate-500">
                                ID: #{product.id}
                              </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                              {product.name}
                            </h2>

                            <p className="text-xs sm:text-sm font-semibold text-slate-600">
                              {product.tagline}
                            </p>

                            <p className="text-sm text-slate-700 leading-relaxed pt-1">
                              {product.description}
                            </p>
                          </div>

                          {/* Technical SpecTable */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                              <span>Verified Engineering Specifications</span>
                              <span className="text-[10px] text-slate-400 font-mono-numbers">
                                IEC / ISO Standards
                              </span>
                            </div>
                            <SpecTable specs={product.specs} theme="light" />
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <Button
                              href={`/contact?product=${product.id}`}
                              variant="primary"
                              size="md"
                              icon={<ArrowRight className="h-4 w-4" />}
                            >
                              Request Quote for {product.name}
                            </Button>

                            <button
                              type="button"
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs sm:text-sm font-semibold focus-ring min-h-[44px]"
                              title="Technical Datasheet (PDF)"
                            >
                              <Download className="h-4 w-4 text-slate-500" />
                              <span>Download Datasheet (PDF)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </Section>

      {/* ────────────────── Mini Section: Which Product Do I Need? ────────────────── */}
      <Section
        id="comparison-guide"
        theme="light"
        className="py-16 sm:py-20 border-t border-slate-200 bg-slate-50/50"
      >
        <div className="space-y-8 sm:space-y-10 max-w-6xl mx-auto">
          <SectionHeading
            theme="light"
            eyebrow="Architecture Decision Matrix"
            title="Which Product Does Your Facility Need?"
            subtitle="Match your immediate operational bottleneck to the optimal hardware and software layer."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <Card theme="light" className="space-y-3 border-slate-200/80 bg-white">
              <div className="h-10 w-10 rounded-xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Need Circuit-Level Metering?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose the <strong className="text-slate-900">VoltPulse Pro</strong>. Installs via split-core CTs around main switchgear busbars with Class 0.5S revenue accuracy.
              </p>
              <Link
                href="/products#voltpulse-pro"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline pt-1"
              >
                <span>Jump to VoltPulse Pro</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>

            <Card theme="light" className="space-y-3 border-slate-200/80 bg-white">
              <div className="h-10 w-10 rounded-xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                <Router className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Have Existing Modbus / LoRa Sensors?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploy the <strong className="text-slate-900">EdgeGateway X4</strong>. Collects data from up to 200 nodes and routes to local SCADA or cloud via LTE failover.
              </p>
              <Link
                href="/products#edgegateway-x4"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline pt-1"
              >
                <span>Jump to EdgeGateway X4</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>

            <Card theme="light" className="space-y-3 border-slate-200/80 bg-white">
              <div className="h-10 w-10 rounded-xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Need Enterprise ISO 50001 Reports?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Subscribe to <strong className="text-slate-900">PowerCloud Analytics</strong>. Ingests all plant meter data and automates Scope 2 audits and peak shaving logic.
              </p>
              <Link
                href="/products#powercloud-analytics"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline pt-1"
              >
                <span>Jump to PowerCloud SaaS</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
