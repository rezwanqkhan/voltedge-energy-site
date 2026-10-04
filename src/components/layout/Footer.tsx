import Link from "next/link";
import { Activity, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/95 relative overflow-hidden border-none shadow-[0_-10px_35px_rgba(0,0,0,0.5)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] border-none">
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                VoltEdge <span className="text-emerald-400">IIoT</span>
              </span>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed">
              Industrial IoT energy intelligence and automated telemetry for commercial and manufacturing facilities worldwide.
            </p>
            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["ISO 50001", "IEC 62443", "CE Mark", "RoHS"].map((cert) => (
                <span
                  key={cert}
                  className="rounded-2xl bg-slate-900/90 px-3 py-1.5 text-[11px] font-bold text-slate-200 shadow-md border-none"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform & Architecture
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-300 hover:text-emerald-300 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Industrial Solutions
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>Revenue-Grade Submetering</li>
              <li>Peak Load Shaving & Curtailment</li>
              <li>Carbon Scope 2 GHG Tracking</li>
              <li>Predictive Motor Vibration & THD</li>
              <li>Automated ISO 50001 Audits</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Global Support
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>42 Innovation Drive, Tech Quarter, Munich DE 80339</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+49 89 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>engineering@voltedge-energy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-slate-400">
            © {currentYear} VoltEdge Energy GmbH. All rights reserved. Precision telemetry for zero-carbon industry.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy & GDPR Policy</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
