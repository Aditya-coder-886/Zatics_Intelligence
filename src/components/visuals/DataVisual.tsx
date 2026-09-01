"use client";

import React, { useState, useEffect } from "react";
import { Search, Database, RefreshCw, BarChart2, PieChart } from "lucide-react";

export default function DataVisual() {
  const [queryText, setQueryText] = useState("");
  const [chartProgress, setChartProgress] = useState(0);

  const fullQueryText = "Query: Show regional latency trends vs token optimization rates across custom AI models...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setQueryText(fullQueryText.substring(0, index));
      index++;
      if (index > fullQueryText.length + 15) {
        index = 0;
        setChartProgress(0);
      } else if (index === fullQueryText.length) {
        // Trigger chart fade-in
        setChartProgress(1);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl glass-card border border-white/5 p-5 overflow-hidden flex flex-col justify-between h-[400px]">
      {/* Search Input bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-indigo-400" />
        <div className="w-full bg-black/40 border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono text-indigo-300 min-h-[38px] flex items-center select-none">
          <span>{queryText}</span>
          <span className="w-1.5 h-3.5 bg-indigo-400 animate-pulse ml-0.5" />
        </div>
      </div>

      {/* SVG Chart display */}
      <div className="flex-1 bg-black/25 border border-white/5 rounded-xl p-4 flex flex-col relative overflow-hidden justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
              Semantic Search Vector Map
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[9px] font-mono text-muted-foreground">RETRIEVING DATA</span>
          </div>
        </div>

        {/* The SVG Line Chart */}
        <div className="flex-1 relative flex items-center justify-center min-h-[140px] px-2">
          <svg className="w-full h-full max-h-[160px]" viewBox="0 0 400 160">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

            {/* Line 1: Latency (Blue) */}
            <path
              d="M 10 120 Q 80 110 120 40 T 220 80 T 320 30 T 390 50"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={chartProgress === 0 ? "1000" : "0"}
              className="transition-all duration-1000 ease-out"
            />

            {/* Line 2: Token Savings (Indigo) */}
            <path
              d="M 10 140 Q 70 120 130 90 T 210 50 T 310 70 T 390 20"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="1000"
              strokeDashoffset={chartProgress === 0 ? "1000" : "0"}
              className="transition-all duration-1000 delay-300 ease-out"
            />

            {/* Gradient shadow beneath saving line */}
            <path
              d="M 10 140 Q 70 120 130 90 T 210 50 T 310 70 T 390 20 L 390 140 L 10 140 Z"
              fill="url(#indigoGrad)"
              opacity={chartProgress === 0 ? "0" : "0.08"}
              className="transition-opacity duration-1000 delay-500 ease-out"
            />

            {/* Glowing nodes on path */}
            {chartProgress > 0 && (
              <>
                <circle cx="120" cy="40" r="4" fill="#3b82f6" stroke="#000" strokeWidth="1.5" />
                <circle cx="210" cy="50" r="4" fill="#818cf8" stroke="#000" strokeWidth="1.5" />
                <circle cx="390" cy="20" r="4.5" fill="#818cf8" stroke="#000" strokeWidth="1.5" />
              </>
            )}

            {/* Gradients */}
            <defs>
              <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[9px] font-mono text-muted-foreground border-t border-white/5 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-[#3b82f6] rounded" />
            <span>Response Latency (ms)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-[#818cf8] rounded" />
            <span>Semantic Accuracy</span>
          </div>
        </div>
      </div>

      {/* Mini dashboard widgets */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white/2 border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Index Size</span>
            <p className="text-xs font-semibold font-mono text-white mt-0.5">8.4 GB</p>
          </div>
          <div className="w-8 h-8 rounded bg-indigo-500/5 flex items-center justify-center text-indigo-400">
            <PieChart className="w-4 h-4" />
          </div>
        </div>
        <div className="bg-white/2 border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Data Sources</span>
            <p className="text-xs font-semibold font-mono text-white mt-0.5">42 Connected</p>
          </div>
          <div className="w-8 h-8 rounded bg-indigo-500/5 flex items-center justify-center text-indigo-400">
            <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: "10s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
