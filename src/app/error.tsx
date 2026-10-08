"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[VoltEdge Application Error]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-[#0b0f19] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <AlertCircle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono-numbers font-bold text-rose-400 tracking-widest uppercase">
            Execution Fault
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Telemetry Rendering Interrupted
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            An unexpected client-side exception occurred while rendering this interface.
          </p>
        </div>

        <div className="pt-2">
          <Button
            onClick={reset}
            variant="primary"
            size="md"
            icon={<RotateCcw className="h-4 w-4" />}
          >
            Reinitialize Interface
          </Button>
        </div>
      </div>
    </div>
  );
}
