"use client";

import React, { useState } from "react";
import { CheckCircle2, TrendingUp, AlertTriangle, Play, Check } from "lucide-react";

export default function DecisionEngine() {
  const [selectedOption, setSelectedOption] = useState<"A" | "B">("A");

  const options = {
    A: {
      title: "Option A: Re-route via Rotterdam Corridor",
      confidence: "94.2%",
      cost: "+ $4,200",
      eta: "0 hr delay (on time)",
      recommendation: "Recommended",
      recommendationDesc: "Maximizes delivery SLA compliance with minor margin adjustment.",
      impactRisk: "Low Risk",
      progressColor: "stroke-indigo-500",
      circleProgress: 295, // 94% of circumference 314
    },
    B: {
      title: "Option B: Hold at Singapore Transit",
      confidence: "68.5%",
      cost: "$ 0",
      eta: "+ 72 hrs delay",
      recommendation: "Alternative",
      recommendationDesc: "Saves immediate transit costs but carries high penalty risks.",
      impactRisk: "High Risk - SLA Penalty Possible",
      progressColor: "stroke-amber-500",
      circleProgress: 215, // 68% of circumference 314
    },
  };

  const active = options[selectedOption];

  return (
    <div className="w-full rounded-2xl glass-card border border-white/5 p-5 overflow-hidden flex flex-col justify-between h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Decision Recommendation Engine
          </h3>
          <p className="text-sm font-semibold text-foreground mt-0.5">Scenario: Supply Chain Disruption</p>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded px-2.5 py-1 text-[10px] font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>SIMULATING</span>
        </div>
      </div>

      {/* Main body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Left side: Gauge */}
        <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG circle track */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                className={`transition-all duration-1000 ${active.progressColor}`}
                strokeDasharray="314"
                strokeDashoffset={314 - active.circleProgress}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold font-mono text-white">{active.confidence}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">
                Confidence
              </span>
            </div>
          </div>
          <span
            className={`text-[10px] uppercase font-mono tracking-wider font-semibold mt-3 px-2 py-0.5 rounded ${
              selectedOption === "A" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
            }`}
          >
            {active.impactRisk}
          </span>
        </div>

        {/* Right side: Option details and toggles */}
        <div className="md:col-span-3 flex flex-col gap-3">
          {/* Option A button */}
          <button
            onClick={() => setSelectedOption("A")}
            className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
              selectedOption === "A"
                ? "border-indigo-500/50 bg-indigo-500/5 shadow-md"
                : "border-white/5 bg-transparent hover:border-white/10"
            }`}
          >
            <div>
              <span className="text-[9px] font-mono uppercase bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-semibold">
                Option A (Recommended)
              </span>
              <h4 className="text-xs font-semibold text-white mt-1.5">Re-route via Rotterdam</h4>
            </div>
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                selectedOption === "A" ? "bg-indigo-500 border-indigo-500 text-white" : "border-white/20"
              }`}
            >
              {selectedOption === "A" && <Check className="w-2.5 h-2.5" />}
            </div>
          </button>

          {/* Option B button */}
          <button
            onClick={() => setSelectedOption("B")}
            className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
              selectedOption === "B"
                ? "border-indigo-500/50 bg-indigo-500/5 shadow-md"
                : "border-white/5 bg-transparent hover:border-white/10"
            }`}
          >
            <div>
              <span className="text-[9px] font-mono uppercase bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-semibold">
                Option B (Alternative)
              </span>
              <h4 className="text-xs font-semibold text-white mt-1.5">Hold in Singapore</h4>
            </div>
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                selectedOption === "B" ? "bg-indigo-500 border-indigo-500 text-white" : "border-white/20"
              }`}
            >
              {selectedOption === "B" && <Check className="w-2.5 h-2.5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Simulator outputs */}
      <div className="bg-black/35 border border-white/5 rounded-lg p-3 grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Direct Cost Impact</span>
          <p className="font-semibold text-white mt-0.5">{active.cost}</p>
        </div>
        <div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Simulated Delay</span>
          <p className="font-semibold text-white mt-0.5">{active.eta}</p>
        </div>
      </div>
    </div>
  );
}
