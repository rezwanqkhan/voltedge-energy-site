"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PhoneCall,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Zap,
  Router,
  Layers,
  ClipboardCheck,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    href: string;
  };
}

interface PresetTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  query: string;
  reply: string;
  actionLink: {
    label: string;
    href: string;
  };
}

const PRESET_TOPICS: PresetTopic[] = [
  {
    id: "peak-demand",
    title: "Cut Peak Demand by 30%",
    subtitle: "Automated 15-min load shifting",
    icon: Zap,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    query: "How does VoltEdge help reduce peak demand charges in industrial plants?",
    reply:
      "VoltEdge Meter-M3 submeters monitor 3-phase power at 100ms intervals, detecting load spikes before the utility 15-minute billing window closes. Our automated load-shifting logic coordinates non-critical HVAC chillers and pump banks, cutting peak demand charges by 28% to 35% without disrupting plant production.",
    actionLink: { label: "Explore Meter-M3 Specs", href: "/products" },
  },
  {
    id: "gateway-specs",
    title: "DIN-Rail Gateway Specs",
    subtitle: "Modbus, LoRaWAN & LTE failover",
    icon: Router,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    query: "What are the specs and protocols of your DIN-rail IoT gateway?",
    reply:
      "The VoltEdge Gateway Pro is engineered for standard 35mm DIN-rail enclosures. It features RS-485 Modbus RTU/TCP, LoRaWAN (868/915 MHz), BACnet IP, dual-SIM 4G LTE failover, and hardware-accelerated TLS 1.3 encryption with a 90-day on-device ring buffer.",
    actionLink: { label: "View Gateway Pro", href: "/products" },
  },
  {
    id: "scada-integration",
    title: "SCADA & PLC Integration",
    subtitle: "OPC-UA, Modbus TCP & BACnet",
    icon: Layers,
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-400",
    query: "Can VoltEdge hardware connect to our Siemens or Rockwell SCADA systems?",
    reply:
      "Yes, completely non-intrusively. Our split-core current transformers install without shutting down busbars, and our gateway outputs standard OPC-UA, MQTT Sparkplug B, and Modbus TCP directly into Siemens WinCC, Rockwell FactoryTalk, or Ignition SCADA.",
    actionLink: { label: "Book Technical Review", href: "/contact" },
  },
  {
    id: "pilot-request",
    title: "Request a 30-Day Pilot",
    subtitle: "Turnkey 5-node POC hardware kit",
    icon: ClipboardCheck,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    query: "How can we start a proof-of-concept pilot at our facility?",
    reply:
      "We dispatch pre-configured pilot kits (1 Gateway Pro + 4 Meter-M3 units) within 48 hours. Our engineering team reviews your single-line diagram remotely and assists with live commissioning. You can also call our Munich team directly at +49 89 123 4567.",
    actionLink: { label: "Submit Pilot Request", href: "/contact" },
  },
];

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestedMenu, setShowSuggestedMenu] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "bot",
      text: "Welcome to the VoltEdge Industrial Energy Desk. Ask any technical question about submetering retrofits, DIN-rail gateways, or ISO 50001 compliance, or select a topic below to begin:",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping, showSuggestedMenu]);

  function handleSend(customText?: string) {
    const query = customText || inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputVal("");
    setIsTyping(true);
    setShowSuggestedMenu(false);

    // Simulate domain-aware engineering reply
    setTimeout(() => {
      let botReply =
        "Thank you for your inquiry. For specific single-line diagrams, custom CT coil calibrations up to 10,000A, or ISO 50001 compliance inquiries, our engineering specialists in Munich are on standby. You can call directly at +49 89 123 4567 or request an on-site pilot.";
      let actionLink = { label: "Open Contact Console", href: "/contact" };

      const matched = PRESET_TOPICS.find(
        (t) =>
          query.toLowerCase().includes(t.title.toLowerCase()) ||
          t.query.toLowerCase().includes(query.toLowerCase()) ||
          query.toLowerCase().includes(t.id.replace("-", " "))
      );

      if (matched) {
        botReply = matched.reply;
        actionLink = matched.actionLink;
      } else if (
        query.toLowerCase().includes("price") ||
        query.toLowerCase().includes("cost") ||
        query.toLowerCase().includes("fiyat")
      ) {
        botReply =
          "VoltEdge pricing is tiered based on monitored circuit count and gateway requirements. Hardware starts at €290 for 3-phase submeters, with volume enterprise discounts. Would you like a formal BOM quotation?";
        actionLink = { label: "Request Official BOM Quote", href: "/contact" };
      } else if (
        query.toLowerCase().includes("protocol") ||
        query.toLowerCase().includes("modbus") ||
        query.toLowerCase().includes("mqtt")
      ) {
        botReply =
          "We natively support Modbus RTU/TCP, BACnet IP, LoRaWAN, and MQTT with Sparkplug B payloads. All streams feature end-to-end TLS 1.3 encryption.";
        actionLink = { label: "Review Protocol Specs", href: "/products" };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionLink,
        },
      ]);
      setIsTyping(false);
    }, 800);
  }

  function handleReset() {
    setMessages([
      {
        id: "initial-welcome-" + Date.now(),
        sender: "bot",
        text: "Conversation reset. You can select a topic below or type your technical query.",
        timestamp: "Just now",
      },
    ]);
    setShowSuggestedMenu(false);
  }

  const isInitialState = messages.length <= 1;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        {/* Interactive AI Chat Console */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[430px] max-h-[85vh] sm:max-h-[640px] flex flex-col rounded-3xl bg-slate-900/95 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl border-none overflow-hidden z-50"
            >
              {/* Console Header */}
              <div className="px-4 py-3 sm:px-5 sm:py-4 bg-slate-950/70 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">VoltEdge Energy Copilot</h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[9px] sm:text-[10px] font-semibold">
                        AI Live
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>Industrial Telemetry Desk</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    title="Reset conversation"
                    className="h-8 w-8 rounded-full bg-slate-800/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full bg-slate-800/60 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Direct Hotline Strip */}
              <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-emerald-500/10 flex items-center justify-between text-xs border-b border-white/5">
                <div className="flex items-center gap-2 text-emerald-300 font-medium">
                  <PhoneCall className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-slate-300">Direct Engineer Desk:</span>
                  <span className="font-mono-numbers font-bold text-white text-[11px] sm:text-[12px]">+49 89 123 4567</span>
                </div>
                <a
                  href="tel:+49891234567"
                  className="px-2.5 py-1 rounded-lg bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-300 font-bold text-[10px] uppercase tracking-wider transition-colors"
                >
                  Call
                </a>
              </div>

              {/* Chat Stream Area */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 text-xs">
                {messages.map((msg, index) => (
                  <div key={msg.id} className="space-y-3">
                    <div
                      className={`flex gap-2 sm:gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 space-y-2 leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-emerald-400 text-slate-950 font-medium shadow-md"
                            : "bg-slate-950/70 text-slate-200"
                        }`}
                      >
                        <p>{msg.text}</p>

                        {msg.actionLink && (
                          <div className="pt-1">
                            <Link
                              href={msg.actionLink.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 text-[11px] font-bold transition-colors"
                            >
                              <span>{msg.actionLink.label}</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        )}

                        <div
                          className={`text-[9px] font-mono-numbers pt-0.5 ${
                            msg.sender === "user" ? "text-slate-800" : "text-slate-400"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.sender === "user" && (
                        <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </div>
                      )}
                    </div>

                    {/* Suggested Topics inside initial stream */}
                    {index === 0 && (isInitialState || showSuggestedMenu) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-7 sm:ml-9 mr-1 space-y-2 pt-1"
                      >
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3 text-emerald-400" />
                          <span>Recommended Engineering Topics</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PRESET_TOPICS.map((topic) => {
                            const IconComp = topic.icon;
                            return (
                              <button
                                key={topic.id}
                                onClick={() => handleSend(topic.query)}
                                className="p-2.5 sm:p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-800 text-left transition-all group flex items-start gap-2.5"
                              >
                                <div
                                  className={`h-7 w-7 sm:h-8 sm:w-8 rounded-xl ${topic.iconBg} flex items-center justify-center ${topic.iconColor} shrink-0 mt-0.5`}
                                >
                                  <IconComp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors truncate">
                                    {topic.title}
                                  </div>
                                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                                    {topic.subtitle}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div className="rounded-2xl bg-slate-950/70 px-3.5 py-2.5 text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-2.5 sm:p-3 bg-slate-950/80 border-t border-white/5">
                {!isInitialState && (
                  <div className="pb-1.5 flex items-center justify-between">
                    <button
                      onClick={() => setShowSuggestedMenu(!showSuggestedMenu)}
                      className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      <HelpCircle className="h-3 w-3 text-emerald-400" />
                      <span>{showSuggestedMenu ? "Hide topics" : "Show topics"}</span>
                    </button>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono-numbers">TLS 1.3 Encrypted</span>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about meters, SCADA, protocols..."
                    className="flex-1 rounded-2xl bg-slate-900 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim()}
                    aria-label="Send message"
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-40 disabled:pointer-events-none text-slate-950 flex items-center justify-center transition-all shadow-[0_2px_12px_rgba(52,211,153,0.35)] shrink-0"
                  >
                    <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button: Hidden when modal is open */}
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-slate-900/90 p-2 sm:px-4 sm:py-3 text-white shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:bg-slate-800 transition-all border-none"
            aria-label="Open AI Energy Assistant"
          >
            <div className="relative flex h-8 w-8 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
              <Bot className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>
            <div className="text-left pr-1 hidden sm:block">
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <span>Energy AI Copilot</span>
                <span className="text-[10px] text-emerald-400 font-normal hidden md:inline">• Live Desk</span>
              </div>
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
}
