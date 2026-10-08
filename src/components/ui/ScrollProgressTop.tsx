"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollProgressTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      // Only show after scrolling down 180px
      setIsVisible(window.scrollY > 180);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.45)] active:scale-90 border border-white/10"
          >
            {/* SVG Progress Circle - Perfectly Scaled & Centered */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
              fill="none"
            >
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
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="3"
              />

              {/* Animated Progress Ring */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="url(#scrollEnergyGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-[stroke-dashoffset] duration-150"
              />
            </svg>

            {/* Mathematically Centered Arrow Icon */}
            <span className="relative z-10 flex items-center justify-center pointer-events-none">
              <ArrowUp className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
