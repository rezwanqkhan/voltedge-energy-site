import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center";
  theme?: "dark" | "light";
}

export function SectionHeading({
  className,
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "dark",
  ...props
}: SectionHeadingProps) {
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "space-y-2 sm:space-y-4 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center text-[10px] sm:text-xs font-bold tracking-widest uppercase",
            isLight ? "text-[#00b4d8]" : "text-[#00e5ff]"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "fluid-h2 font-extrabold tracking-tight",
          isLight ? "text-slate-900" : "text-white"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-xs sm:text-base lg:text-lg leading-normal sm:leading-relaxed",
            isLight ? "text-slate-600" : "text-slate-300"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
