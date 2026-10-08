import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  theme?: "dark" | "light" | "accent";
  container?: boolean;
}

export function Section({
  className,
  theme = "dark",
  container = true,
  children,
  ...props
}: SectionProps) {
  const themeClasses = {
    dark: "theme-dark bg-[#0b0f19] text-slate-100",
    light: "theme-light bg-[#f8fafc] text-slate-900",
    accent: "theme-accent bg-[#0b0f19] text-slate-100",
  };

  return (
    <section
      className={cn(
        "relative py-10 sm:py-20 lg:py-28 transition-colors duration-300",
        themeClasses[theme],
        className
      )}
      {...props}
    >
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
