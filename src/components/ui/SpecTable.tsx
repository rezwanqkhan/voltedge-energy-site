import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProductSpec } from "@/lib/products";

export interface SpecTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  specs: ProductSpec[];
  theme?: "dark" | "light";
}

export function SpecTable({
  specs,
  theme = "dark",
  className,
  ...props
}: SpecTableProps) {
  const isLight = theme === "light";

  return (
    <div className="w-full overflow-x-auto rounded-xl sm:rounded-2xl border border-white/10 scrollbar-none">
      <table
        className={cn(
          "w-full text-left border-collapse text-xs sm:text-sm",
          isLight ? "text-slate-800" : "text-slate-200",
          className
        )}
        {...props}
      >
        <caption className="sr-only">Product Technical Specifications</caption>
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={spec.label}
              className={cn(
                "transition-colors",
                index % 2 === 0
                  ? isLight
                    ? "bg-slate-50/70"
                    : "bg-slate-900/40"
                  : isLight
                  ? "bg-white"
                  : "bg-slate-950/60",
                "border-b border-white/[0.06] last:border-b-0 hover:bg-[#00e5ff]/[0.05]"
              )}
            >
              <th
                scope="row"
                className={cn(
                  "py-2.5 sm:py-3 px-3.5 sm:px-4 font-semibold whitespace-nowrap sm:whitespace-normal w-1/3 align-top",
                  isLight ? "text-slate-600" : "text-slate-400"
                )}
              >
                {spec.label}
              </th>
              <td className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-mono-numbers text-right sm:text-left align-top font-medium text-[#00e5ff] sm:text-inherit">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
