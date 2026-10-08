import Link from "next/link";
import { Activity, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const solutionLinks = [
    { label: "Revenue-Grade Submeters", href: "/products#voltpulse-pro" },
    { label: "DIN-Rail IoT Gateways", href: "/products#edgegateway-x4" },
    { label: "Wireless Thermal Sensors", href: "/products#thermosense-wireless" },
    { label: "PowerCloud SaaS Analytics", href: "/products#powercloud-analytics" },
    { label: "ISO 50001 Compliance", href: "/products#powercloud-analytics" },
  ];

  return (
    <footer className="bg-[#070a12] relative overflow-hidden border-t border-white/[0.08] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00e5ff]/15 text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)]">
                <Activity className="h-5 w-5 text-[#00e5ff]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                VoltEdge <span className="text-[#00e5ff]">IIoT</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Industrial IoT energy intelligence and automated telemetry for commercial and manufacturing facilities worldwide.
            </p>
            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["ISO 50001", "IEC 62443", "CE Mark", "RoHS"].map((cert) => (
                <span
                  key={cert}
                  className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-bold text-slate-300 shadow-sm border border-white/[0.08]"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3.5 sm:mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform & Architecture
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-[#00e5ff] transition-colors font-medium focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions with actual working links to /products#slug anchors! */}
          <div>
            <h3 className="mb-3.5 sm:mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Industrial Hardware & SaaS
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {solutionLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-[#00e5ff] transition-colors font-medium focus-ring rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3.5 sm:mb-4 text-xs font-bold uppercase tracking-wider text-slate-200">
              Global Support
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 text-[#00e5ff] shrink-0" />
                <span>42 Innovation Drive, Tech Quarter, Munich DE 80339</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Phone className="h-4 w-4 text-[#00e5ff] shrink-0" />
                <a href="tel:+49891234567" className="hover:text-[#00e5ff] transition-colors focus-ring rounded">
                  +49 89 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="h-4 w-4 text-[#00e5ff] shrink-0" />
                <a
                  href="mailto:engineering@voltedge-energy.com"
                  className="hover:text-[#00e5ff] transition-colors focus-ring rounded"
                >
                  engineering@voltedge-energy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row text-center md:text-left">
          <p className="text-xs text-slate-500">
            © {currentYear} VoltEdge Energy GmbH. All rights reserved. Precision telemetry for zero-carbon industry.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy & GDPR Policy</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
