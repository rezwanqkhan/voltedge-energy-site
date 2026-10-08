import { Building, Quote, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const FICTIONAL_LOGOS = [
  { name: "AEROVENT DYNAMICS", subtitle: "Heavy Aerodynamics" },
  { name: "NORDIC KRAFT", subtitle: "Pulp & Cellulose" },
  { name: "VORTEX STEEL", subtitle: "Precision Stamping" },
  { name: "SOLIS FOUNDRY", subtitle: "Die-Casting Systems" },
  { name: "TERRA ALUMINA", subtitle: "Smelting & Metals" },
  { name: "SYNAPSE MOTORS", subtitle: "EV Powertrains" },
];

export function SocialProofSection() {

  return (
    <div className="space-y-6 sm:space-y-16">
      {/* Fictional Logos Strip */}
      <div className="space-y-3 text-center">
        <p className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-slate-500">
          Trusted by Industrial Operators Worldwide (Fictional Proof of Concept)
        </p>

        {/* Marquee Container */}
        <div className="relative overflow-hidden py-2 sm:py-3">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 opacity-80">
            {FICTIONAL_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200/80 bg-slate-100/50 hover:bg-white hover:border-[#00e5ff]/50 transition-colors"
              >
                <Building className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-extrabold tracking-wider text-slate-800">
                    {logo.name}
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-500 tracking-tight font-medium">
                    {logo.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials & Mini Case Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">
        {/* Testimonial 1 */}
        <div className="lg:col-span-4 card-light p-4 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-3 sm:space-y-4">
          <div className="space-y-2 sm:space-y-3">
            <Quote className="h-5 w-5 sm:h-7 sm:w-7 text-[#0284c7]/40" />
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              &ldquo;VoltEdge identified an unmetered 400kW compressor spike during peak 15-minute tariff windows on Day 6. That single automatic load shift paid for our entire 50-node pilot.&rdquo;
            </p>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-slate-100">
            <div className="font-bold text-xs sm:text-sm text-slate-900">Dr. Aris Thorne</div>
            <div className="text-[11px] sm:text-xs text-slate-500">VP of Manufacturing, AeroVent Dynamics (Fictional)</div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="lg:col-span-4 card-light p-4 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-3 sm:space-y-4">
          <div className="space-y-2 sm:space-y-3">
            <Quote className="h-5 w-5 sm:h-7 sm:w-7 text-[#0284c7]/40" />
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              &ldquo;Deploying revenue-grade submeters without cutting plant busbar power was the decider. Our electrical team commissioned 32 panels during a single scheduled shift.&rdquo;
            </p>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-slate-100">
            <div className="font-bold text-xs sm:text-sm text-slate-900">Hannah Lindqvist</div>
            <div className="text-[11px] sm:text-xs text-slate-500">Plant Operations Director, Nordic Kraft (Fictional)</div>
          </div>
        </div>

        {/* Mini Case Study Card */}
        <div className="lg:col-span-4 card-light p-4 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-3 sm:space-y-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-lg">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
              <span>Verified Case Study</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#00e5ff] font-mono-numbers">
                -28%
              </span>
              <span className="text-[11px] sm:text-sm text-slate-300 font-semibold">
                Peak Demand Cost
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
              3-Line Automotive Stamping Plant (Fictional)
            </h4>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              14-day retrofit across 3 presses. Automated load-shifting prevented transformer overload during simultaneous shift starts, saving €142,000 annually.
            </p>
          </div>

          <div className="pt-2 sm:pt-3 border-t border-white/10">
            <Link
              href="/contact?product=submeter-3p"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00e5ff] hover:text-white transition-colors focus-ring"
            >
              <span>Explore similar deployment</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
