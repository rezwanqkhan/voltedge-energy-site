"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    facilityType: "Manufacturing",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const facilityTypes: ContactFormData["facilityType"][] = [
    "Manufacturing",
    "Data Center",
    "Commercial",
    "Cold Storage",
    "Other",
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden bg-ambient-mesh min-h-screen">
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* Header */}
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold shadow-[0_0_15px_rgba(52,211,153,0.2)] border-none">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>Enterprise Energy Architecture Consultation</span>
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Contact{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  Engineering
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                Connect directly with our industrial IoT systems engineers for technical inquiries, pilot device trials, and custom single-line electrical audits.
              </p>
            </div>
          </ScrollReveal>

          {/* Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card p-8 rounded-3xl space-y-6 border-none">
                <div className="border-b border-white/5 pb-4">
                  <h2 className="text-xl font-bold text-white">Send Engineering Inquiry</h2>
                  <p className="text-xs text-slate-300 mt-1">
                    All inquiries are assigned to a qualified IoT systems architect within 4 business hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold text-slate-200 tracking-wider uppercase"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Markus Weber"
                      className={cn(
                        "w-full rounded-2xl bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border-none",
                        errors.name
                          ? "ring-2 ring-red-400"
                          : "focus:ring-2 focus:ring-emerald-400/50"
                      )}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-slate-200 tracking-wider uppercase"
                      >
                        Corporate Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="markus.weber@company.com"
                        className={cn(
                          "w-full rounded-2xl bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border-none",
                          errors.email
                            ? "ring-2 ring-red-400"
                            : "focus:ring-2 focus:ring-emerald-400/50"
                        )}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="block text-xs font-bold text-slate-200 tracking-wider uppercase"
                      >
                        Company / Plant Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. BMW Group Plant 2.1"
                        className={cn(
                          "w-full rounded-2xl bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border-none",
                          errors.company
                            ? "ring-2 ring-red-400"
                            : "focus:ring-2 focus:ring-emerald-400/50"
                        )}
                      />
                      {errors.company && (
                        <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Facility Type */}
                  <div className="space-y-2">
                    <label
                      htmlFor="facilityType"
                      className="block text-xs font-bold text-slate-200 tracking-wider uppercase"
                    >
                      Facility Architecture Type
                    </label>
                    <select
                      id="facilityType"
                      name="facilityType"
                      value={formData.facilityType}
                      onChange={handleChange}
                      className="w-full rounded-2xl bg-slate-950/80 px-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border-none"
                    >
                      {facilityTypes.map((t) => (
                        <option key={t} value={t} className="bg-slate-900 text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-200 tracking-wider uppercase"
                    >
                      Technical Requirements / Single-Line Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify your incoming voltage, number of submeters needed, existing SCADA/Modbus network, or 30-day pilot timeframe..."
                      className={cn(
                        "w-full rounded-2xl bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border-none",
                        errors.message
                          ? "ring-2 ring-red-400"
                          : "focus:ring-2 focus:ring-emerald-400/50"
                      )}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold transition-all border-none",
                      status === "success"
                        ? "bg-slate-800 text-emerald-400 shadow-md cursor-default"
                        : "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 shadow-[0_4px_24px_rgba(52,211,153,0.35)] disabled:opacity-60"
                    )}
                  >
                    {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {status === "success" && <CheckCircle2 className="h-4 w-4" />}
                    {status === "idle" && <Send className="h-4 w-4" />}
                    {status === "error" && <AlertCircle className="h-4 w-4" />}

                    {status === "idle" && "Submit Consultation Request"}
                    {status === "loading" && "Validating & Transmitting..."}
                    {status === "success" && "Inquiry Received — Response Within 4 Hours"}
                    {status === "error" && "Transmission Failed — Please Retry"}
                  </button>

                  {status === "error" && (
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Click here to reset and retry
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office Location */}
              <div className="glass-card p-6 rounded-3xl space-y-4 border-none">
                <div className="flex items-center gap-2 text-slate-200 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>Headquarters & Labs</span>
                </div>
                <div className="space-y-1.5 text-sm text-slate-200">
                  <p className="font-bold text-white">VoltEdge Energy Solutions GmbH</p>
                  <p>42 Innovation Drive, Tech Quarter</p>
                  <p>Munich, DE 80339 (Germany)</p>
                </div>
                <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-slate-200 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>+49 89 123 4567 (Central Europe)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-cyan-400" />
                    <span>engineering@voltedge-energy.com</span>
                  </div>
                </div>
              </div>

              {/* Response SLA */}
              <div className="glass-card p-6 rounded-3xl space-y-3 border-none">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span>ENTERPRISE RESPONSE SLA</span>
                  <Clock className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono-numbers">
                  &lt; 4 Hours
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Direct callback from senior electrical engineering team during business hours (CET & EST).
                </p>
              </div>

              {/* Security & Data Privacy */}
              <div className="glass-card p-6 rounded-3xl space-y-2 border-none">
                <div className="flex items-center gap-2 text-slate-200 text-xs font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>NDA & Enterprise Confidentiality</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Electrical diagrams and meter telemetry data shared with VoltEdge are protected under strict ISO 27001 data isolation policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
