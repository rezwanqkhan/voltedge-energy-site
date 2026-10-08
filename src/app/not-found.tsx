import { Home, Radio } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-[#00e5ff]/15 text-[#00e5ff] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,229,255,0.25)] border border-[#00e5ff]/30">
          <Radio className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono-numbers font-bold text-[#00e5ff] tracking-widest uppercase">
            Telemetry Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Sub-Bus Not Detected
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The industrial telemetry register or route you requested does not exist on this facility gateway.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" icon={<Home className="h-4 w-4" />}>
            Return to Dashboard
          </Button>
          <Button href="/products" variant="secondary" size="md">
            Explore Hardware
          </Button>
        </div>
      </div>
    </div>
  );
}
