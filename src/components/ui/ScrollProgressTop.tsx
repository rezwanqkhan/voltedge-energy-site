"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollProgressTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setHasScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 border-none group ${
          hasScrolled
            ? "opacity-100 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.55)]"
            : "opacity-60 hover:opacity-100"
        }`}
      >
        {/* SVG Progress Circle with Radiant Dual-Gradient Track */}
        <svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="scrollEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="3"
          />

          {/* Animated Progress Ring */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="url(#scrollEnergyGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-150"
          />
        </svg>

        {/* Clean Center Arrow Icon */}
        <ArrowUp className="h-4 w-4 text-emerald-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </motion.button>
    </div>
  );
}
