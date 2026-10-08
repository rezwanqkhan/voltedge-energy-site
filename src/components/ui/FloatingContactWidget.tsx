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
    title: "Cut Peak Demand 32%",
    subtitle: "Automated 15-min load shift",
    icon: Zap,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    query: "How does VoltEdge help reduce peak demand charges in industrial plants?",
    reply:
      "VoltEdge revenue-grade meters monitor 3-phase power at sub-second intervals, detecting load spikes before the utility 15-minute billing window closes. Our automated load-shifting logic coordinates non-critical HVAC chillers and pump banks, cutting peak demand charges by up to 32% without disrupting plant production.",
    actionLink: { label: "Explore Product Specs", href: "/products" },
  },
  {
    id: "gateway-specs",
    title: "DIN-Rail Gateway Specs",
    subtitle: "Modbus, LoRaWAN & LTE",
    icon: Router,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    query: "What are the specs and protocols of your DIN-rail IoT gateway?",
    reply:
      "The VoltEdge EdgeGateway-X4 is engineered for standard 35mm DIN-rail enclosures. It features RS-485 Modbus RTU/TCP, LoRaWAN (868/915 MHz), BACnet IP, dual-SIM 4G LTE failover, and hardware-accelerated TLS 1.3 encryption with a 90-day on-device ring buffer.",
    actionLink: { label: "View EdgeGateway-X4", href: "/products#edgegateway-x4" },
  },
  {
    id: "scada-integration",
    title: "SCADA & PLC Integration",
    subtitle: "OPC-UA, Modbus TCP & BACnet",
    icon: Layers,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    query: "Can VoltEdge hardware connect to our Siemens or Rockwell SCADA systems?",
    reply:
      "Yes, completely non-intrusively. Our split-core current transformers install without shutting down busbars, and our gateway outputs standard OPC-UA, MQTT Sparkplug B, and Modbus TCP directly into Siemens WinCC, Rockwell FactoryTalk, or Ignition SCADA.",
    actionLink: { label: "Book Technical Review", href: "/contact" },
  },
  {
    id: "pilot-request",
    title: "Request a Turnkey Pilot",
    subtitle: "Turnkey POC deployment",
    icon: ClipboardCheck,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    query: "How can we start a proof-of-concept pilot at our facility?",
    reply:
      "We dispatch pre-configured pilot kits within 48 hours. Our engineering team reviews your single-line diagram remotely and assists with live commissioning. You can also contact our team directly at contact@voltedge.energy.",
    actionLink: { label: "Submit Pilot Request", href: "/contact" },
  },
];

let messageCounter = 0;
function getNextMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestedMenu, setShowSuggestedMenu] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      sender: "bot",
      text: "Welcome to VoltEdge Copilot. Ask any question about submetering retrofits, DIN gateways, or ISO 50001, or pick a topic:",
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
      id: getNextMessageId("user"),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputVal("");
    setIsTyping(true);
    setShowSuggestedMenu(false);

    setTimeout(() => {
      let botReply =
        "Thank you for your inquiry. For specific single-line diagrams, custom CT coil calibrations up to 10,000A, or ISO 50001 compliance inquiries, our engineering specialists in Munich are on standby at +49 89 123 4567.";
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
          "VoltEdge pricing starts at €290 for 3-phase revenue-grade submeters, with volume enterprise discounts. Would you like a formal BOM quotation?";
        actionLink = { label: "Request Official BOM Quote", href: "/contact" };
      } else if (
        query.toLowerCase().includes("protocol") ||
        query.toLowerCase().includes("modbus") ||
        query.toLowerCase().includes("mqtt")
      ) {
        botReply =
          "We natively support Modbus RTU/TCP, BACnet IP, LoRaWAN, and MQTT Sparkplug B. All streams feature end-to-end TLS 1.3 encryption.";
        actionLink = { label: "Review Protocol Specs", href: "/products" };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: getNextMessageId("bot"),
          sender: "bot",
          text: botReply,
          timestamp: "Just now",
          actionLink,
        },
      ]);
      setIsTyping(false);
    }, 600);
  }

  function handleReset() {
    setMessages([
      {
        id: getNextMessageId("initial-welcome"),
        sender: "bot",
        text: "Conversation reset. Select a topic or type your technical query below.",
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

      <div className="fixed bottom-4 left-3.5 sm:bottom-6 sm:left-6 z-50">
        {/* Interactive AI Chat Console - Sleek Mobile Scaling */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-2 bottom-2 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[410px] max-h-[72vh] sm:max-h-[580px] flex flex-col rounded-2xl sm:rounded-3xl bg-slate-900/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl border border-white/10 overflow-hidden z-50"
            >
              {/* Console Header: Compact on Mobile */}
              <div className="px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-slate-900 flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 text-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
                    <Bot className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">VoltEdge Copilot</h3>
                      <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/15 text-cyan-300 text-[9px] font-semibold">
                        Online
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">Industrial Energy Desk</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    title="Reset conversation"
                    aria-label="Reset conversation"
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

              {/* Direct Hotline Strip: Compact 1-line */}
              <div className="px-3.5 py-1.5 sm:px-5 sm:py-2 bg-cyan-500/10 flex items-center justify-between text-xs border-b border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-cyan-300 font-medium text-[10px] sm:text-[11px]">
                  <PhoneCall className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span className="text-slate-300">Desk:</span>
                  <span className="font-mono-numbers font-bold text-white">+1 (800) 555-VOLT</span>
                </div>
                <a
                  href="tel:+18005558658"
                  className="px-2 py-0.5 rounded bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-300 font-bold text-[9px] uppercase tracking-wider transition-colors"
                >
                  Call
                </a>
              </div>

              {/* Chat Stream Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3.5 text-xs">
                {messages.map((msg, index) => (
                  <div key={msg.id} className="space-y-2">
                    <div
                      className={`flex gap-1.5 sm:gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="h-6 w-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="h-3 w-3" />
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] sm:max-w-[85%] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 space-y-1.5 leading-relaxed text-[11px] sm:text-xs ${
                          msg.sender === "user"
                            ? "bg-cyan-400 text-slate-950 font-medium shadow-md"
                            : "bg-slate-800/85 text-slate-100 border border-white/[0.06] shadow-sm"
                        }`}
                      >
                        <p>{msg.text}</p>

                        {msg.actionLink && (
                          <div className="pt-1">
                            <Link
                              href={msg.actionLink.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 text-[10px] sm:text-[11px] font-bold transition-colors"
                            >
                              <span>{msg.actionLink.label}</span>
                              <ArrowRight className="h-2.5 w-2.5" />
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
                        <div className="h-6 w-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    {/* Suggested Topics: On mobile, horizontal scrolling chips! */}
                    {index === 0 && (isInitialState || showSuggestedMenu) && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-6 sm:ml-8 mr-1 space-y-1.5 pt-1"
                      >
                        <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
                          <span>Quick Inquiries</span>
                        </div>

                        {/* Mobile horizontal scroll / Desktop 2-column grid */}
                        <div className="flex sm:grid sm:grid-cols-2 gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {PRESET_TOPICS.map((topic) => {
                            const IconComp = topic.icon;
                            return (
                              <button
                                key={topic.id}
                                onClick={() => handleSend(topic.query)}
                                className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-left transition-all group flex items-center gap-2 border border-white/[0.06] hover:border-white/15 shrink-0 sm:shrink min-w-[200px] sm:min-w-0"
                              >
                                <div
                                  className={`h-6 w-6 rounded-lg ${topic.iconBg} flex items-center justify-center ${topic.iconColor} shrink-0`}
                                >
                                  <IconComp className="h-3 w-3" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-[11px] font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                                    {topic.title}
                                  </div>
                                  <div className="text-[9px] text-slate-400 truncate">
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
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="rounded-xl bg-slate-800/80 border border-white/[0.06] px-3 py-1.5 text-slate-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" />
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar: Compact on Mobile */}
              <div className="p-2 sm:p-2.5 bg-slate-900 border-t border-white/[0.08]">
                {!isInitialState && (
                  <div className="pb-1 flex items-center justify-between">
                    <button
                      onClick={() => setShowSuggestedMenu(!showSuggestedMenu)}
                      className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <HelpCircle className="h-2.5 w-2.5 text-cyan-400" />
                      <span>{showSuggestedMenu ? "Hide topics" : "Show topics"}</span>
                    </button>
                    <span className="text-[9px] text-slate-500 font-mono-numbers">TLS 1.3</span>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about meters, SCADA..."
                    className="flex-1 rounded-xl bg-slate-800/70 px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 border border-white/[0.08]"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim()}
                    aria-label="Send message"
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 flex items-center justify-center transition-all shadow-sm shrink-0"
                  >
                    <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button: min 44px tap target on mobile */}
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 rounded-full bg-slate-800/90 min-h-[44px] min-w-[44px] p-2.5 sm:px-3.5 sm:py-2.5 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:bg-slate-750 transition-all border border-white/10"
            aria-label="Open AI Energy Assistant"
          >
            <div className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.3)]">
              <Bot className="h-3.5 w-3.5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
            </div>
            <div className="text-left pr-1 hidden sm:block">
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <span>Copilot</span>
                <span className="text-[10px] text-cyan-400 font-normal">• Live</span>
              </div>
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
}
