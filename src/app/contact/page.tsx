"use client";

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  FileText,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  TrendingDown,
  Zap,
} from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────
// Scope & Specification Options for Guided Wizard
// ──────────────────────────────────────────────
interface ScopeOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: typeof Zap;
  defaultProduct: string;
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: "pilot",
    title: "14-Day Plant Pilot",
    badge: "Hardware Trial",
    description: "Plug-and-play DIN-rail kit with split-core CTs dispatched to your facility.",
    icon: Boxes,
    defaultProduct: "gateway-x1",
  },
  {
    id: "peak-audit",
    title: "Peak Demand Audit",
    badge: "Cost Reduction",
    description: "Evaluate your single-line diagram and calculate projected 15-min peak savings.",
    icon: TrendingDown,
    defaultProduct: "submeter-3p",
  },
  {
    id: "hardware-eval",
    title: "DIN-Rail Hardware Trial",
    badge: "OEM & System Integrator",
    description: "Test Gateway-X1 or SubMeter-3P in your custom electrical switchgear panels.",
    icon: Cpu,
    defaultProduct: "gateway-x1",
  },
  {
    id: "enterprise-scada",
    title: "Enterprise Architecture",
    badge: "ISO 50001",
    description: "Multi-site telemetry backhaul, cloud data lake, and ESG carbon auditing.",
    icon: Building2,
    defaultProduct: "general",
  },
];

const FACILITY_TYPES = [
  "Manufacturing & Assembly",
  "Hyperscale Data Center",
  "Process & Chemical Plant",
  "Commercial Real Estate & HVAC",
  "Cold Storage / Logistics",
];

const VOLTAGE_LEVELS = [
  "400V 3-Phase (Low Voltage)",
  "690V Heavy Industrial",
  "11kV - 33kV (Medium Voltage)",
  "Single-Phase 230V Secondary",
];

const FEEDER_COUNTS = [
  "< 10 Sub-circuits",
  "10 - 50 Monitored Feeders",
  "50 - 200 Distribution Buses",
  "200+ Enterprise Campus-wide",
];

const PRODUCT_DROPDOWN_OPTIONS = [
  { value: "general", label: "General Architecture Consultation" },
  ...products.map((p) => ({ value: p.id, label: `${p.name} (${p.category})` })),
];

interface ContactFormInnerProps {
  initialProduct: string;
}

function ContactFormInner({ initialProduct }: ContactFormInnerProps) {
  const prefersReducedMotion = useReducedMotion();

  // Mode: "wizard" (Guided 3-Step) vs "quick" (Direct Message)
  const [mode, setMode] = useState<"wizard" | "quick">("wizard");

  // Wizard Step: 1 = Scope, 2 = Facility Specs, 3 = Engineering Dispatch
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Guided Wizard States
  const [selectedScope, setSelectedScope] = useState<string>(() => {
    if (initialProduct === "gateway-x1") return "pilot";
    if (initialProduct === "submeter-3p") return "peak-audit";
    return "pilot";
  });
  const [facilityType, setFacilityType] = useState<string>("Manufacturing & Assembly");
  const [voltageLevel, setVoltageLevel] = useState<string>("400V 3-Phase (Low Voltage)");
  const [feederCount, setFeederCount] = useState<string>("10 - 50 Monitored Feeders");
  const [customNotes, setCustomNotes] = useState<string>("");

  // Contact Info State (Shared between Wizard & Quick)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: initialProduct || "general",
    message: "",
    website: "", // Honeypot
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const quickMessageRef = useRef<HTMLTextAreaElement>(null);

  // Live scope summary metadata
  const currentScopeObj = SCOPE_OPTIONS.find((s) => s.id === selectedScope) || SCOPE_OPTIONS[0];

  function validateField(fieldName: keyof ContactFormData, value: string) {
    const testData = { ...formData, [fieldName]: value };
    const result = contactFormSchema.safeParse(testData);

    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === fieldName);
      return issue ? issue.message : undefined;
    }
    return undefined;
  }

  function handleBlur(fieldName: keyof ContactFormData) {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(fieldName, formData[fieldName] || "");
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleGoToStep2() {
    setStep(2);
  }

  function handleGoToStep3() {
    setStep(3);
    setTimeout(() => {
      nameRef.current?.focus();
    }, 150);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    let finalMessage = formData.message;
    let finalProduct = formData.product;

    if (mode === "wizard") {
      finalProduct = currentScopeObj.defaultProduct;
      finalMessage = `[GUIDED CONSULTATION REQUEST]
• Project Scope: ${currentScopeObj.title} (${currentScopeObj.badge})
• Facility Type: ${facilityType}
• Grid Voltage: ${voltageLevel}
• Monitored Feeders: ${feederCount}
${customNotes ? `• Additional Engineering Notes: ${customNotes}` : "• Additional Notes: Standard evaluation requested."}`;
    }

    const payload: ContactFormData = {
      ...formData,
      product: finalProduct,
      message: finalMessage,
    };

    const result = contactFormSchema.safeParse(payload);

    if (!result.success) {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (!newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);

      if (newErrors.name) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (mode === "quick" && newErrors.message) quickMessageRef.current?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to transmit inquiry.");
      }

      setServerMessage(data.message);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setServerMessage(
        err instanceof Error
          ? err.message
          : "Network error. Please try again or call our engineering desk directly."
      );
    }
  }

  function handleReset() {
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      product: "general",
      message: "",
      website: "",
    });
    setCustomNotes("");
    setErrors({});
    setTouched({});
    setStep(1);
    setStatus("idle");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      {/* ────────────────── Left Column: Combined Interactive Form ────────────────── */}
      <div className="lg:col-span-8">
        <div className="card-light rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-7 bg-white">
          {/* Header Mode Switcher (Tabbed) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-200">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Request Systems Consultation</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-[#0284c7] border border-sky-200 font-semibold">
                  <ShieldCheck className="h-3 w-3" /> NDA Isolated
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct access to Munich and US systems architects. SLA callback within 4 business hours.
              </p>
            </div>

            {/* Mode Switcher Segmented Control */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/90 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setMode("wizard")}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center focus-ring min-h-[34px]",
                  mode === "wizard"
                    ? "bg-white text-[#0284c7] shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <span>Guided Wizard</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("quick")}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 focus-ring min-h-[34px]",
                  mode === "quick"
                    ? "bg-white text-[#0284c7] shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Quick Message</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* SUCCESS STATE */}
            {status === "success" ? (
              <motion.div
                key="success"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="py-8 text-center space-y-5"
              >
                <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Consultation Request Transmitted
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {serverMessage ||
                      "Thank you for contacting VoltEdge Engineering. A senior IoT systems architect has received your technical specifications and will contact you within 4 business hours."}
                  </p>
                </div>

                {mode === "wizard" && (
                  <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1 text-xs text-slate-700">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      Assigned Scope Parameters:
                    </div>
                    <div className="text-slate-600">
                      • Scope: <span className="font-semibold text-slate-900">{currentScopeObj.title}</span>
                    </div>
                    <div className="text-slate-600">
                      • Facility: <span className="font-semibold text-slate-900">{facilityType}</span>
                    </div>
                    <div className="text-slate-600">
                      • Grid: <span className="font-semibold text-slate-900">{voltageLevel}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-center">
                  <Button variant="secondary" size="md" onClick={handleReset}>
                    Submit Another Inquiry
                  </Button>
                </div>
              </motion.div>
            ) : mode === "wizard" ? (
              /* ── MODE 1: GUIDED MULTI-STEP WIZARD ── */
              <div key="wizard-mode" className="pt-5 space-y-5">
                {/* Stepper Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="h-5 w-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-[10px] font-bold">
                        {step}
                      </span>
                      <span className="text-slate-900 font-bold">
                        {step === 1 && "Step 1: Consultation Scope"}
                        {step === 2 && "Step 2: Electrical & Facility Parameters"}
                        {step === 3 && "Step 3: Engineering Dispatch & Contact"}
                      </span>
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {step === 1 && "33% Completed"}
                      {step === 2 && "66% Completed"}
                      {step === 3 && "90% Completed"}
                    </span>
                  </div>

                  {/* Visual Progress Bar Track */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0284c7] to-[#00e5ff] rounded-full shadow-[0_0_8px_rgba(2,132,199,0.5)]"
                      initial={false}
                      animate={{
                        width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* ── STEP 1: SCOPE CARDS ── */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 15 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        What is your primary project objective?
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Select a scope below to customize your engineering trial package.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SCOPE_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedScope === opt.id;

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedScope(opt.id)}
                            className={cn(
                              "p-3.5 sm:p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between space-y-2.5 focus-ring min-h-[110px] group",
                              isSelected
                                ? "bg-sky-50/70 border-[#0284c7] shadow-xs ring-1 ring-[#0284c7]/40"
                                : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700 hover:border-slate-300"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div
                                className={cn(
                                  "h-9 w-9 rounded-xl flex items-center justify-center transition-colors",
                                  isSelected
                                    ? "bg-[#0284c7] text-white shadow-xs"
                                    : "bg-white text-slate-700 border border-slate-200 group-hover:text-[#0284c7]"
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </div>

                              <span
                                className={cn(
                                  "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                                  isSelected
                                    ? "bg-[#0284c7]/15 text-[#0284c7] border border-[#0284c7]/30"
                                    : "bg-slate-200/80 text-slate-600"
                                )}
                              >
                                {opt.badge}
                              </span>
                            </div>

                            <div>
                              <div
                                className={cn(
                                  "text-sm font-bold",
                                  isSelected ? "text-slate-950" : "text-slate-800"
                                )}
                              >
                                {opt.title}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                {opt.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleGoToStep2}
                        icon={<ArrowRight className="h-4 w-4" />}
                        className="w-full sm:w-auto"
                      >
                        Proceed to Facility Specs
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: FACILITY & ELECTRICAL SPECS ── */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 15 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Facility Type Selector Chips */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        1. Facility / Operational Profile
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FACILITY_TYPES.map((type) => {
                          const isSelected = facilityType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFacilityType(type)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus-ring min-h-[38px]",
                                isSelected
                                  ? "bg-[#0284c7] text-white shadow-xs"
                                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200"
                              )}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Voltage Level Selector Chips */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        2. Incoming Grid Voltage Level
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {VOLTAGE_LEVELS.map((volt) => {
                          const isSelected = voltageLevel === volt;
                          return (
                            <button
                              key={volt}
                              type="button"
                              onClick={() => setVoltageLevel(volt)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus-ring min-h-[38px]",
                                isSelected
                                  ? "bg-[#0284c7] text-white shadow-xs"
                                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200"
                              )}
                            >
                              {volt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feeder Count Selector Chips */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        3. Estimated Monitored Circuits / Feeders
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FEEDER_COUNTS.map((count) => {
                          const isSelected = feederCount === count;
                          return (
                            <button
                              key={count}
                              type="button"
                              onClick={() => setFeederCount(count)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus-ring min-h-[38px]",
                                isSelected
                                  ? "bg-[#0284c7] text-white shadow-xs"
                                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200"
                              )}
                            >
                              {count}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Custom Requirements Textarea */}
                    <div className="space-y-1">
                      <label
                        htmlFor="customNotes"
                        className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                      >
                        Single-Line / Custom Notes <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="customNotes"
                        name="customNotes"
                        rows={2}
                        placeholder="e.g. Existing Modbus RTU loops, Siemens breakers, or 15-minute billing window..."
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#0284c7] transition-all resize-none focus-ring"
                      />
                    </div>

                    {/* Back & Next Navigation */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        icon={<ArrowLeft className="h-3.5 w-3.5" />}
                      >
                        Back
                      </Button>

                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleGoToStep3}
                        icon={<ArrowRight className="h-4 w-4" />}
                        className="w-full sm:w-auto"
                      >
                        Proceed to Contact Details
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: DISPATCH & CONTACT DETAILS ── */}
                {step === 3 && (
                  <motion.form
                    key="step-3"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 15 }}
                    animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    {/* Live Configuration Pill Recap */}
                    <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#0284c7] animate-pulse" />
                        <span className="font-bold text-slate-900">
                          {currentScopeObj.title}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-700">{voltageLevel}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[#0284c7] hover:underline font-bold text-[11px]"
                      >
                        Edit parameters
                      </button>
                    </div>

                    {/* Honeypot field */}
                    <div className="sr-only" aria-hidden="true">
                      <input
                        id="website-step3"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Dr. Markus Weber"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        aria-invalid={Boolean(touched.name && errors.name)}
                        className={cn(
                          "w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border transition-all focus-ring",
                          touched.name && errors.name
                            ? "border-rose-500 bg-rose-50/30"
                            : "border-slate-300 focus:border-[#0284c7]"
                        )}
                      />
                      {touched.name && errors.name && (
                        <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Email */}
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                        >
                          Corporate Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          ref={emailRef}
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="markus.weber@plant.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          aria-invalid={Boolean(touched.email && errors.email)}
                          className={cn(
                            "w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border transition-all focus-ring",
                            touched.email && errors.email
                              ? "border-rose-500 bg-rose-50/30"
                              : "border-slate-300 focus:border-[#0284c7]"
                          )}
                        />
                        {touched.email && errors.email && (
                          <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                        >
                          Phone Number <span className="text-slate-400 font-normal">(Direct callback)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+49 89 123 4567"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#0284c7] transition-all focus-ring"
                        />
                      </div>
                    </div>

                    {/* Company / Facility */}
                    <div className="space-y-1">
                      <label
                        htmlFor="company"
                        className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                      >
                        Company / Facility Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="BMW Group Plant 2.1 / BASF Antwerp"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#0284c7] transition-all focus-ring"
                      />
                    </div>

                    {/* Error Banner */}
                    {status === "error" && (
                      <div
                        role="alert"
                        className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{serverMessage}</span>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(2)}
                        icon={<ArrowLeft className="h-3.5 w-3.5" />}
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        loading={status === "submitting"}
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto btn-shimmer justify-center"
                        icon={<Send className="h-4 w-4" />}
                      >
                        {status === "submitting"
                          ? "Transmitting Specifications..."
                          : "Transmit Consultation Request"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500">
                      <Lock className="h-3 w-3 text-slate-400" />
                      <span>
                        Protected by Mutual Enterprise NDA. Isolated under ISO 27001 policies.
                      </span>
                    </div>
                  </motion.form>
                )}
              </div>
            ) : (
              /* ── MODE 2: DIRECT QUICK MESSAGE FORM ── */
              <motion.form
                key="quick-mode"
                onSubmit={handleSubmit}
                noValidate
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="pt-5 space-y-3.5 sm:space-y-4"
              >
                {/* Honeypot Field */}
                <div className="sr-only" aria-hidden="true">
                  <input
                    id="website-quick"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label
                    htmlFor="quick-name"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    ref={nameRef}
                    id="quick-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Dr. Markus Weber"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    className={cn(
                      "w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border transition-all focus-ring",
                      touched.name && errors.name
                        ? "border-rose-500 bg-rose-50/30"
                        : "border-slate-300 focus:border-[#0284c7]"
                    )}
                  />
                  {touched.name && errors.name && (
                    <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email & Company Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="quick-email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Corporate Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      id="quick-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="markus.weber@plant.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      className={cn(
                        "w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border transition-all focus-ring",
                        touched.email && errors.email
                          ? "border-rose-500 bg-rose-50/30"
                          : "border-slate-300 focus:border-[#0284c7]"
                      )}
                    />
                    {touched.email && errors.email && (
                      <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="quick-company"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Plant / Facility Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="quick-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. BMW Group Plant 2.1"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#0284c7] transition-all focus-ring"
                    />
                  </div>
                </div>

                {/* Product Dropdown & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="quick-product"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Product / Inquiry Topic
                    </label>
                    <select
                      id="quick-product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 border border-slate-300 focus:border-[#0284c7] transition-all focus-ring"
                    >
                      {PRODUCT_DROPDOWN_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="quick-phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="quick-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+49 89 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[42px] text-sm text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#0284c7] transition-all focus-ring"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1">
                  <label
                    htmlFor="quick-message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Technical Specifications / Inquiries <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    ref={quickMessageRef}
                    id="quick-message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Specify incoming voltage, number of submeters needed, existing SCADA protocol, or pilot timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    className={cn(
                      "w-full rounded-xl bg-slate-50 px-3.5 py-2.5 min-h-[90px] text-sm text-slate-900 placeholder-slate-400 border transition-all resize-none focus-ring",
                      touched.message && errors.message
                        ? "border-rose-500 bg-rose-50/30"
                        : "border-slate-300 focus:border-[#0284c7]"
                    )}
                  />
                  {touched.message && errors.message && (
                    <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{serverMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={status === "submitting"}
                  disabled={status === "submitting"}
                  className="w-full btn-shimmer justify-center"
                  icon={<Send className="h-4 w-4" />}
                >
                  {status === "submitting"
                    ? "Transmitting Inquiry..."
                    : "Submit Consultation Request"}
                </Button>

                <p className="text-[11px] text-slate-500 text-center">
                  Protected by Mutual Enterprise NDA. Your data is isolated under ISO 27001 policies.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ────────────────── Right Column: Live Context & Labs Info ────────────────── */}
      <div className="lg:col-span-4 space-y-4">
        {/* Dynamic Consultation Scope Recap Card */}
        <Card theme="light" className="p-4 sm:p-5 rounded-3xl border-slate-200 bg-white space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-[#0284c7]">
              <Boxes className="h-3.5 w-3.5" />
              <span>Live Scope Status</span>
            </span>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">
              Active Desk
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-slate-500">
                Selected Focus:
              </div>
              <div className="font-extrabold text-slate-900 text-sm">
                {mode === "wizard" ? currentScopeObj.title : "Direct Technical Inquiry"}
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                {mode === "wizard" ? currentScopeObj.description : "Custom specification message to our systems architect."}
              </div>
            </div>

            {mode === "wizard" && step >= 2 && (
              <div className="p-2 rounded-xl bg-sky-50/60 border border-sky-100 text-[11px] text-slate-700 space-y-0.5">
                <div>
                  Grid Target: <span className="font-semibold text-slate-900">{voltageLevel}</span>
                </div>
                <div>
                  Feeders: <span className="font-semibold text-slate-900">{feederCount}</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Enterprise Response SLA Card */}
        <Card theme="light" className="p-4 sm:p-5 rounded-3xl space-y-1.5 border-slate-200 bg-white">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>ENTERPRISE RESPONSE SLA</span>
            <Clock className="h-4 w-4 text-[#0284c7]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0284c7] font-mono-numbers">
            &lt; 4 Hours
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct callback from senior electrical engineering team during CET and EST business hours.
          </p>
        </Card>

        {/* European Labs & Contact Hotline */}
        <Card theme="light" className="p-4 sm:p-5 rounded-3xl space-y-3 border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="h-4 w-4 text-[#0284c7]" />
            <span>Engineering Headquarters</span>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed">
            <p className="font-extrabold text-slate-900 text-sm">VoltEdge Energy Solutions GmbH</p>
            <p>42 Innovation Drive, Tech Quarter</p>
            <p>Munich, DE 80339 (Germany)</p>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#0284c7]" />
              <a href="tel:+49891234567" className="hover:text-slate-950 transition-colors">
                +49 89 123 4567 (Central Europe)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#0284c7]" />
              <a href="tel:+18005558658" className="hover:text-slate-950 transition-colors font-mono">
                +1 (800) 555-VOLT (US Desk)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#0284c7]" />
              <a href="mailto:engineering@voltedge-energy.com" className="hover:text-slate-950 transition-colors">
                engineering@voltedge-energy.com
              </a>
            </div>
          </div>
        </Card>

        {/* NDA & Compliance Guarantee */}
        <Card theme="light" className="p-4 sm:p-5 rounded-3xl space-y-1.5 border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Mutual Non-Disclosure (NDA)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All single-line electrical diagrams, switchgear drawings, and SCADA specs shared with VoltEdge are protected under strict ISO 27001 data isolation policies.
          </p>
        </Card>
      </div>
    </div>
  );
}

function ContactFormContainer() {
  const searchParams = useSearchParams();
  const productKey = searchParams.get("product") || "general";
  return <ContactFormInner key={productKey} initialProduct={productKey} />;
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ────────────────── Unified Contact Section (Tight & Ergonomic) ────────────────── */}
      <Section
        id="contact"
        theme="light"
        className="pt-14 sm:pt-16 pb-12 sm:pb-16 bg-hero-glow min-h-screen"
      >
        <div className="space-y-4 sm:space-y-6">
          <SectionHeading
            theme="light"
            eyebrow="Direct Systems Access"
            title="Contact Engineering"
            subtitle="Connect directly with our industrial IoT systems architects for hardware trials, single-line audits, and custom CT coil calibrations."
          />

          <Suspense
            fallback={
              <div className="py-16 text-center flex items-center justify-center gap-2 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin text-[#0284c7]" />
                <span>Loading consultation console...</span>
              </div>
            }
          >
            <ContactFormContainer />
          </Suspense>
        </div>
      </Section>
    </div>
  );
}
