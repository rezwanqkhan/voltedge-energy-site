import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "neutral" | "outline" | "success";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "accent",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-semibold rounded-full select-none shrink-0 tracking-wide";

  const variantStyles = {
    // Single accent: Electric Cyan
    accent:
      "bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]",
    neutral:
      "bg-slate-800/80 text-slate-200 border border-white/10 shadow-sm",
    outline:
      "bg-transparent text-slate-300 border border-white/15",
    success:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
