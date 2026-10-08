"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "dark" | "light";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme = "dark", hoverEffect = true, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const baseClass =
      theme === "light"
        ? "card-light rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-7 text-slate-900"
        : "card-dark rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-7 text-slate-100";

    if (!hoverEffect || prefersReducedMotion) {
      return (
        <div ref={ref} className={cn(baseClass, className)} {...props}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(baseClass, className)}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
