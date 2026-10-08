import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-4 bg-[#0b0f19]">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00e5ff]/15 text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.3)] border border-[#00e5ff]/30">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <p className="text-xs font-mono-numbers text-slate-400 tracking-wider uppercase">
        Initializing Real-Time Stream...
      </p>
    </div>
  );
}
