"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll-spy tracking only on homepage, else follow current route
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);

      if (pathname !== "/") {
        // On dedicated sub-pages (/products, /about, /contact), reflect current page route
        const current = navItems.find((item) => item.href === pathname);
        if (current) setActiveSection(current.label);
        return;
      }

      // On homepage, track scroll depth across sections dynamically
      const scrollPosition = window.scrollY + 200;
      const contactEl = document.getElementById("contact");
      const aboutEl = document.getElementById("about");
      const productsEl = document.getElementById("products");

      if (contactEl && scrollPosition >= contactEl.offsetTop - 60) {
        setActiveSection("Contact");
      } else if (aboutEl && scrollPosition >= aboutEl.offsetTop - 60) {
        setActiveSection("About");
      } else if (productsEl && scrollPosition >= productsEl.offsetTop - 60) {
        setActiveSection("Products");
      } else {
        setActiveSection("Home");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // When clicking Home while already on Home, scroll gently to top
  function handleHomeClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileOpen(false);
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5 rounded-full transition-all duration-300 border-none",
          isScrolled
            ? "bg-slate-900/85 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            : "bg-slate-900/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        )}
      >
        {/* Brand with soft rounded-full badge and zero borders */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 transition-all duration-300 group-hover:scale-105 shadow-[0_0_12px_rgba(52,211,153,0.25)] border-none">
            <Activity className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              VoltEdge <span className="text-[11px] font-semibold text-emerald-400 tracking-wider">IIoT</span>
            </span>
            <span className="text-[9px] text-slate-400 tracking-tight -mt-1 hidden sm:block">
              Energy Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Links: Real route navigation with dynamic scroll-spy feedback */}
        <ul className="hidden md:flex items-center gap-1 bg-slate-950/45 p-1 rounded-full border-none">
          {navItems.map((item) => {
            const isItemActive =
              pathname === "/"
                ? activeSection === item.label
                : pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={item.href === "/" ? handleHomeClick : undefined}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors inline-block",
                    isItemActive
                      ? "text-emerald-300"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                  {isItemActive && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-emerald-500/15 rounded-full -z-10 shadow-[0_0_15px_rgba(52,211,153,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA: Soft rounded-full gradient button directing to dedicated /contact page */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="group relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 px-4 py-2 text-xs font-bold text-slate-950 transition-all shadow-[0_2px_14px_rgba(52,211,153,0.35)] border-none"
          >
            <span>Request Demo</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center h-8 w-8 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer: Soft rounded-3xl with zero borders */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-5xl rounded-3xl bg-slate-900/95 backdrop-blur-2xl shadow-2xl p-5 border-none space-y-2"
          >
            {navItems.map((item) => {
              const isItemActive =
                pathname === "/"
                  ? activeSection === item.label
                  : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "/" && pathname === "/") {
                      handleHomeClick(e);
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                  className={cn(
                    "block rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    isItemActive
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 px-4 py-2.5 text-center text-sm font-bold transition-all mt-3 shadow-lg"
            >
              Request Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
