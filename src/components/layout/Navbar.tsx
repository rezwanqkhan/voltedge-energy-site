"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Activity,
  Menu,
  X,
  ArrowUpRight,
  Home,
  Layers,
  ShieldCheck,
  Mail,
  PhoneCall,
  ChevronRight,
  Radio,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NavItem {
  label: string;
  href: string;
  subtitle: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    subtitle: "Overview & Real-Time Telemetry",
    icon: Home,
  },
  {
    label: "Products",
    href: "/products",
    subtitle: "Gateways, Meters & Edge Software",
    icon: Layers,
  },
  {
    label: "About",
    href: "/about",
    subtitle: "Zero-Downtime SLA & Security",
    icon: ShieldCheck,
  },
  {
    label: "Contact",
    href: "/contact",
    subtitle: "Direct Engineering Consultation",
    icon: Mail,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll state for navbar backdrop
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change without cascading effect render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          setMobileOpen(false);
          toggleButtonRef.current?.focus();
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileOpen]);

  return (
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6">
      <nav
        aria-label="Main Navigation"
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300",
          isScrolled
            ? "bg-white/92 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl border border-slate-200"
            : "bg-white/85 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl border border-slate-200/80"
        )}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-ring rounded-lg py-1 px-1.5"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0284c7]/10 text-[#0284c7] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_12px_rgba(2,132,199,0.15)]">
            <Activity className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0284c7] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0284c7]" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              VoltEdge <span className="text-[11px] font-bold text-[#0284c7] tracking-wider">IIoT</span>
            </span>
            <span className="text-[9px] text-slate-500 tracking-tight -mt-1 hidden sm:block">
              Energy Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Links with animated pill indicator */}
        <ul className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.label} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors inline-block focus-ring group",
                    isActive
                      ? "text-[#0284c7] font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <span>{item.label}</span>

                  {/* Active Route Pill Indicator via layoutId */}
                  {isActive && !prefersReducedMotion && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-slate-200/80"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Hover underline sliding left-to-right for non-active items */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#0284c7] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="h-3.5 w-3.5" />}
          >
            Request Demo
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden flex items-center justify-center h-10 w-10 min-h-[44px] min-w-[44px] rounded-full text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors focus-ring"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-[#0284c7]" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Accessible Full-Height Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Slide-in Drawer Sheet */}
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
              initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{
                type: prefersReducedMotion ? "tween" : "spring",
                damping: 30,
                stiffness: 300,
                duration: prefersReducedMotion ? 0.15 : undefined,
              }}
              className="fixed inset-y-0 right-0 w-[86vw] max-w-[350px] bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.2)] border-l border-slate-200 flex flex-col justify-between overflow-y-auto"
            >
              {/* Top Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 focus-ring rounded-lg"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0284c7]/10 text-[#0284c7]">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                      VoltEdge <span className="text-xs font-bold text-[#0284c7]">IIoT</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">Energy Intelligence</div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation drawer"
                  className="flex items-center justify-center h-10 w-10 min-h-[44px] min-w-[44px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus-ring"
                >
                  <X className="h-5 w-5 text-slate-800" />
                </button>
              </div>

              {/* Navigation Links with Icons and Subtitles */}
              <div className="p-4 sm:p-5 space-y-2 flex-1">
                {/* Live System Beacon Pill */}
                <div className="mb-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>SCADA Telemetry Bus</span>
                  </div>
                  <span className="text-[10px] font-mono-numbers font-bold text-[#0284c7] px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200">
                    50.0 Hz ONLINE
                  </span>
                </div>

                <div className="space-y-1.5">
                  {navItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                        animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between p-3 min-h-[52px] rounded-2xl transition-all focus-ring group",
                            isActive
                              ? "bg-sky-50 text-[#0284c7] border border-sky-200/80 shadow-xs"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-950 border border-transparent"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                                isActive
                                  ? "bg-[#0284c7] text-white shadow-[0_0_10px_rgba(2,132,199,0.3)]"
                                  : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/80 group-hover:text-slate-900"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className={cn("text-sm font-bold", isActive ? "text-[#0284c7]" : "text-slate-900")}>
                                {item.label}
                              </span>
                              <span className="text-[11px] text-slate-500 font-normal leading-tight">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>

                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                              isActive ? "text-[#0284c7]" : "text-slate-400"
                            )}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick-Action Panel */}
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                {/* 24/7 Hotline Tap-to-Call */}
                <a
                  href="tel:+18005558658"
                  className="flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 text-slate-800 transition-colors border border-slate-200 shadow-xs focus-ring"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <PhoneCall className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        Engineering Hotline
                      </span>
                      <span className="font-mono-numbers text-xs font-bold text-slate-900">
                        +1 (800) 555-VOLT
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    24/7 Live
                  </span>
                </a>

                {/* Primary Demo CTA */}
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="w-full text-center btn-shimmer justify-center"
                  onClick={() => setMobileOpen(false)}
                  icon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Request Custom Demo
                </Button>

                {/* Industrial Compliance Badges */}
                <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-slate-400" /> ISO 27001
                  </span>
                  <span>•</span>
                  <span>IEC 62443</span>
                  <span>•</span>
                  <span>Class 0.5S</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
