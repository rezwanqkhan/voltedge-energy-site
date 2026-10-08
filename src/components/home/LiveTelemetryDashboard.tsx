"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Zap } from "lucide-react";

interface CircuitTelemetry {
  id: string;
  name: string;
  tag: string;
  baseKw: number;
  kw: number;
  voltage: number;
  pf: number;
  current: number;
  status: "Optimal" | "Peak Load";
  history: number[];
}

const INITIAL_CIRCUITS: CircuitTelemetry[] = [
  {
    id: "feeder-a",
    name: "Main Incomer Bus A",
    tag: "FEEDER-01",
    baseKw: 540,
    kw: 542.4,
    voltage: 412.2,
    pf: 0.96,
    current: 421.5,
    status: "Optimal",
    history: [480, 510, 530, 525, 542],
  },
  {
    id: "furnace-2",
    name: "Induction Furnace #2",
    tag: "FURNACE-02",
    baseKw: 410,
    kw: 412.8,
    voltage: 411.0,
    pf: 0.93,
    current: 318.2,
    status: "Peak Load",
    history: [390, 405, 415, 408, 412],
  },
  {
    id: "chillers",
    name: "HVAC Cryo Chillers",
    tag: "HVAC-CH03",
    baseKw: 330,
    kw: 329.1,
    voltage: 413.1,
    pf: 0.95,
    current: 254.8,
    status: "Optimal",
    history: [310, 325, 335, 322, 329],
  },
];

export function LiveTelemetryDashboard() {
  const prefersReducedMotion = useReducedMotion();
  const [circuits, setCircuits] = useState<CircuitTelemetry[]>(INITIAL_CIRCUITS);
  const [activeCircuitId, setActiveCircuitId] = useState<string>("feeder-a");
  const [frequency, setFrequency] = useState("50.00");
  const [thd, setThd] = useState("2.4");
  const [timestamp, setTimestamp] = useState("14:32:08 UTC");

  useEffect(() => {
    let isDocumentVisible = true;
    function handleVisibilityChange() {
      isDocumentVisible = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const clockInterval = setInterval(() => {
      const now = new Date();
      setTimestamp(now.toTimeString().split(" ")[0] + " UTC");
    }, 1000);

    if (prefersReducedMotion) {
      return () => {
        clearInterval(clockInterval);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    const telemetryInterval = setInterval(() => {
      if (!isDocumentVisible) return;

      setCircuits((prev) =>
        prev.map((circuit) => {
          const delta = (Math.random() - 0.48) * 3.8;
          const nextKw = Math.max(
            circuit.baseKw * 0.9,
            Math.min(circuit.baseKw * 1.15, circuit.kw + delta)
          );
          const nextHistory = [...circuit.history.slice(1), Math.round(nextKw)];

          return {
            ...circuit,
            kw: Number(nextKw.toFixed(1)),
            voltage: Number((412 + (Math.random() - 0.5) * 1.4).toFixed(1)),
            pf: Number((0.95 + (Math.random() - 0.5) * 0.02).toFixed(2)),
            current: Number((circuit.current + (Math.random() - 0.5) * 2.5).toFixed(1)),
            history: nextHistory,
          };
        })
      );

      setFrequency((50.0 + (Math.random() - 0.5) * 0.04).toFixed(2));
      setThd((2.4 + (Math.random() - 0.5) * 0.2).toFixed(1));
    }, 1600);

    return () => {
      clearInterval(clockInterval);
      clearInterval(telemetryInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  const activeCircuit =
    circuits.find((c) => c.id === activeCircuitId) || circuits[0];
  const totalLoad = circuits.reduce((sum, c) => sum + c.kw, 0).toFixed(1);

  const historyPoints = activeCircuit.history;
  const minVal = Math.min(...historyPoints) * 0.95;
  const maxVal = Math.max(...historyPoints) * 1.05;
  const range = maxVal - minVal || 1;
  const svgWidth = 280;
  const svgHeight = 36;
  const points = historyPoints
    .map((val, idx) => {
      const x = (idx / (historyPoints.length - 1)) * svgWidth;
      const y = svgHeight - ((val - minVal) / range) * (svgHeight - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="card-dark rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 border border-white/12 shadow-[0_20px_50px_-15px_rgba(2,132,199,0.3)] backdrop-blur-2xl relative overflow-hidden">
      {/* Top industrial accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0284c7] via-[#00e5ff] to-[#38bdf8]" />

      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 shrink-0">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                SCADA Edge Gateway #04
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-mono border border-emerald-500/30 hidden xs:inline-block">
                LIVE
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono-numbers">
              IEC 61850 • {timestamp}
            </div>
          </div>
        </div>

        {/* Pulsing Active Frequency indicator */}
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] sm:text-xs font-mono-numbers font-bold border border-[#00e5ff]/30 shadow-[0_0_10px_rgba(0,229,255,0.15)]"
          title="Live electrical frequency telemetry"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5ff] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />
          </span>
          GRID {frequency} Hz
        </span>
      </div>

      {/* Main Metric: Aggregate Plant Active Load */}
      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0b0f19]/95 border border-white/[0.08] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-slate-300 font-semibold">
            Aggregate Plant Active Load
          </span>
          <span
            className={`text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
              activeCircuit.status === "Optimal"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                activeCircuit.status === "Optimal"
                  ? "bg-emerald-400"
                  : "bg-amber-400"
              }`}
            />
            {activeCircuit.status}
          </span>
        </div>

        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
              {Number(totalLoad).toLocaleString("en-US", {
                minimumFractionDigits: 1,
              })}
            </span>
            <span className="text-base sm:text-xl font-bold text-[#00e5ff] font-sans">
              kW
            </span>
          </div>

          <div className="text-right">
            <div className="text-[9px] text-slate-400 font-medium">
              Peak Shaving Loop
            </div>
            <div className="text-[11px] sm:text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <Zap className="h-2.5 w-2.5 text-emerald-400" />
              BALANCED
            </div>
          </div>
        </div>

        {/* Live dynamic load progress meter */}
        <div className="space-y-1 pt-0.5">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00e5ff] via-[#38bdf8] to-[#0284c7] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"
              animate={{
                width: `${Math.min(96, (Number(totalLoad) / 1600) * 100)}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 font-mono-numbers">
            <span>0 kW</span>
            <span className="text-amber-300 font-medium">Target Peak: 1,450 kW</span>
            <span>Limit: 1,800 kW</span>
          </div>
        </div>
      </div>

      {/* Monitored Circuits Selector: 3 Interactive Tabs */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase">
          <span>Sub-Feeders:</span>
          <span className="text-[9px] font-normal text-slate-400 normal-case hidden xs:inline">
            Click to switch
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {circuits.map((circuit) => {
            const isSelected = circuit.id === activeCircuitId;

            return (
              <button
                key={circuit.id}
                type="button"
                onClick={() => setActiveCircuitId(circuit.id)}
                className={`p-2 sm:p-2.5 rounded-xl text-left transition-all focus-ring relative ${
                  isSelected
                    ? "bg-slate-800/95 text-white shadow-md border border-[#00e5ff]/60 ring-1 ring-[#00e5ff]/40"
                    : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] sm:text-xs font-semibold">
                  <span className="truncate">{circuit.name.split(" ")[0]}</span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] shrink-0 ml-0.5 shadow-[0_0_6px_rgba(0,229,255,1)]" />
                  )}
                </div>

                <div className="text-[11px] sm:text-sm text-[#00e5ff] font-mono-numbers font-extrabold mt-0.5 truncate">
                  {circuit.kw} kW
                </div>

                {/* Subtitle tag */}
                <div className="text-[8px] sm:text-[9px] font-mono text-slate-400 truncate mt-0.5">
                  {circuit.tag}
                </div>

                {/* Tiny circuit sparkline bars */}
                <div className="flex items-end gap-0.5 h-2.5 mt-1 pt-0.5 opacity-80">
                  {circuit.history.map((val, idx) => {
                    const barHeight = Math.max(
                      25,
                      Math.min(100, ((val - 300) / 280) * 100)
                    );
                    return (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-xs transition-all ${
                          isSelected ? "bg-[#00e5ff]" : "bg-slate-600"
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Circuit Real-Time Waveform & 3-Phase Telemetry */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/70 border border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between text-[10px] sm:text-xs">
          <div className="text-slate-300 font-semibold flex items-center gap-1.5 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] animate-pulse shrink-0" />
            <span className="truncate">{activeCircuit.name}</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 shrink-0">
            {activeCircuit.current} A RMS
          </span>
        </div>

        {/* Live SVG Waveform Trendline */}
        <div className="w-full h-8 sm:h-9 relative flex items-center bg-[#070a12] rounded-lg px-2 overflow-hidden border border-white/[0.04]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
          <div className="absolute right-1.5 top-1 text-[8px] font-mono text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded border border-cyan-800/50">
            5M TREND
          </div>
        </div>

        {/* 3-Phase Voltage Balancer Readout (L1, L2, L3) */}
        <div className="grid grid-cols-3 gap-1 text-center pt-0.5">
          <div className="p-1 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-[8px] text-slate-400 block font-mono">Phase L1</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-100">
              {(activeCircuit.voltage / 1.732).toFixed(1)} V
            </span>
          </div>
          <div className="p-1 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-[8px] text-slate-400 block font-mono">Phase L2</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-100">
              {((activeCircuit.voltage + 0.3) / 1.732).toFixed(1)} V
            </span>
          </div>
          <div className="p-1 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-[8px] text-slate-400 block font-mono">Phase L3</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-100">
              {((activeCircuit.voltage - 0.2) / 1.732).toFixed(1)} V
            </span>
          </div>
        </div>
      </div>

      {/* Industrial Power Quality Metrics Grid */}
      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/60 border border-white/[0.06]">
          <div className="text-[8px] sm:text-[9px] text-slate-400 font-medium">
            L-L Voltage
          </div>
          <div className="text-xs sm:text-sm font-bold text-white font-mono-numbers mt-0.5">
            {activeCircuit.voltage} V
          </div>
        </div>

        <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/60 border border-white/[0.06]">
          <div className="text-[8px] sm:text-[9px] text-slate-400 font-medium">
            Power Factor
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#00e5ff] font-mono-numbers mt-0.5">
            {activeCircuit.pf} PF
          </div>
        </div>

        <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/60 border border-white/[0.06]">
          <div className="text-[8px] sm:text-[9px] text-slate-400 font-medium">
            Harmonics THD
          </div>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono-numbers mt-0.5">
            {thd}%
          </div>
        </div>
      </div>
    </div>
  );
}
