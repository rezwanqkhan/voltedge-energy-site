"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  theme?: "dark" | "light";
}

export function StatCard({
  numericValue,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  description,
  icon,
  className,
  theme = "light",
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      return;
    }

    const start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();
    let frameId: number;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (numericValue - start) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isInView, numericValue, prefersReducedMotion]);

  const valueToShow = prefersReducedMotion ? numericValue : displayValue;

  const formattedNumber = valueToShow.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const isLight = theme === "light";

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        isLight
          ? "card-light p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-2 sm:space-y-3 h-full border border-slate-200 shadow-sm hover:border-[#0284c7]"
          : "card-dark p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-2 sm:space-y-3 h-full border border-white/10 hover:border-[#00e5ff]/40",
        className
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <span
          className={cn(
            "text-[10px] sm:text-xs font-bold tracking-wider uppercase",
            isLight ? "text-slate-500" : "text-slate-300"
          )}
        >
          {label}
        </span>
        {icon && (
          <div
            className={cn(
              "h-7 w-7 sm:h-8 sm:w-8 rounded-xl flex items-center justify-center shrink-0",
              isLight
                ? "bg-[#0284c7]/10 text-[#0284c7]"
                : "bg-[#00e5ff]/15 text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]"
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        className={cn(
          "text-2xl sm:text-4xl lg:text-5xl font-extrabold font-mono-numbers tracking-tight",
          isLight ? "text-slate-900" : "text-white"
        )}
      >
        <span>{prefix}</span>
        <span className={isLight ? "text-[#0284c7]" : "text-[#00e5ff]"}>{formattedNumber}</span>
        <span
          className={cn(
            "text-base sm:text-2xl lg:text-3xl ml-0.5",
            isLight ? "text-slate-500" : "text-slate-200"
          )}
        >
          {suffix}
        </span>
      </div>

      <p
        className={cn(
          "text-[11px] sm:text-sm leading-relaxed",
          isLight ? "text-slate-600" : "text-slate-300"
        )}
      >
        {description}
      </p>
    </motion.div>
  );
}
