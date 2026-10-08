"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      loading = false,
      disabled = false,
      icon,
      iconPosition = "right",
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-colors min-h-[44px] focus-ring disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variantStyles = {
      // Primary uses the single Electric Cyan accent
      primary:
        "bg-[#00e5ff] text-[#0b0f19] hover:bg-[#38bdf8] shadow-[0_2px_14px_rgba(0,229,255,0.35)] hover:shadow-[0_4px_22px_rgba(0,229,255,0.55)] border border-transparent",
      secondary:
        "bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 hover:text-white border border-white/10 shadow-sm",
      outline:
        "bg-transparent text-slate-200 hover:text-white border border-white/20 hover:border-[#00e5ff]/60 hover:bg-white/[0.03]",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 gap-1.5",
      md: "text-xs sm:text-sm px-5 py-2.5 sm:py-3 gap-2",
      lg: "text-sm sm:text-base px-6 py-3.5 gap-2.5",
    };

    const content = (
      <>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
        ) : icon && iconPosition === "left" ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
      </>
    );

    const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: disabled || loading ? {} : { y: -2 },
          whileTap: disabled || loading ? {} : { scale: 0.97 },
          transition: { duration: 0.15 },
        };

    if (href) {
      return (
        <motion.div {...motionProps} className="inline-block">
          <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={combinedClassName}
            tabIndex={disabled ? -1 : undefined}
            aria-disabled={disabled}
          >
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        {...motionProps}
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        disabled={disabled || loading}
        className={combinedClassName}
        onClick={onClick}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
