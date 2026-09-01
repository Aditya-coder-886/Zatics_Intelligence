"use client";

import React, { useState, useEffect } from "react";
import { Play, CheckCircle2, RotateCw, Terminal, Eye, Brain } from "lucide-react";

interface LogMessage {
  time: string;
  type: "info" | "success" | "warning";
  text: string;
}

export default function AIActivityTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<LogMessage[]>([]);

  const steps = [
    { name: "Ingestion & Analysis", desc: "Parsing incoming tickets and unstructured customer requests.", icon: Eye },
    { name: "Intent Classification", desc: "Determining operational routing and severity level.", icon: Brain },
    { name: "Vector Search & Retrieval", desc: "Retrieving verified documentation and customer history.", icon: RotateCw },
    { name: "Action Synthesis", desc: "Constructing proposed API actions and drafts.", icon: CheckCircle2 },
  ];

  const logTemplates: LogMessage[][] = [
    [
      { time: "00:01.04", type: "info", text: "Received event: ticket_created (ID: tk-9481)" },
      { time: "00:01.32", type: "info", text: "Extracted email body. Running NLP payload parsing..." },
    ],
    [
      { time: "00:02.10", type: "info", text: "Computing intent embeddings via semantic analyzer." },
      { time: "00:02.45", type: "success", text: "Intent resolved: refund_request (Confidence: 98.4%)" },
      { time: "00:02.68", type: "info", text: "Tagging ticket level: tier_2_financial" },
    ],
    [
      { time: "00:03.20", type: "info", text: "Querying Supabase index for matching transaction guidelines." },
      { time: "00:03.95", type: "success", text: "Retrieved doc: policy_refund_intl_v2.md (Score: 0.94)" },
      { time: "00:04.12", type: "info", text: "Cross-referencing payment ID: tx_884291_stripe" },
    ],
    [
      { time: "00:04.80", type: "info", text: "Synthesizing API payload for Stripe Refund Gateway." },
      { time: "00:05.15", type: "warning", text: "Requiring manager approval: limit exceeds $50.00." },
      { time: "00:05.50", type: "success", text: "Action generated: draft_email_response & approval_flagged" },
    ],
  ];

  useEffect(() => {
    if (!isRunning) return;

    // Reset loop
    if (activeStep === 0 && logs.length === 0) {
      setLogs(logTemplates[0]);
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (next === 0) {
          setLogs([]);
        } else {
          setLogs((prevLogs) => [...prevLogs, ...logTemplates[next]]);
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [activeStep, isRunning]);

  return (
    <div className="w-full rounded-2xl glass-card border border-white/5 overflow-hidden flex flex-col h-[400px]">
      {/* Header bar */}
      <div className="px-4 py-3 bg-white/3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-xs text-muted-foreground font-mono ml-2">zt-agent-financial-v4</span>
        </div>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all font-mono"
        >
          <Play className={`w-3 h-3 ${isRunning ? "animate-pulse fill-indigo-400" : ""}`} />
          {isRunning ? "MONITORING" : "PAUSED"}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 overflow-hidden">
        {/* Left Column: Timeline Steps */}
        <div className="md:col-span-3 p-5 border-r border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              const StepIcon = step.icon;

              return (
                <div
                  key={idx}
                  className={`flex gap-4 p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-500/5 border border-indigo-500/15"
                      : "border border-transparent"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-500 text-white border-indigo-500 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                          : isCompleted
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-white/3 border-white/10 text-muted-foreground"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-[2px] h-10 my-1 transition-all duration-500 ${
                          isCompleted ? "bg-emerald-500/30" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-medium ${
                        isActive ? "text-indigo-400" : isCompleted ? "text-emerald-400/90" : "text-foreground"
                      }`}
                    >
                      {step.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Console/Log Output */}
        <div className="md:col-span-2 bg-black/40 p-4 font-mono text-[11px] overflow-y-auto flex flex-col justify-end">
          <div className="flex items-center gap-1.5 text-muted-foreground border-b border-white/5 pb-2 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Agent Console Output</span>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 no-scrollbar max-h-[290px] flex flex-col justify-end">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2 items-start leading-relaxed animate-fade-in">
                <span className="text-indigo-400/70 select-none">[{log.time}]</span>
                <span
                  className={
                    log.type === "success"
                      ? "text-emerald-400"
                      : log.type === "warning"
                      ? "text-amber-400"
                      : "text-zinc-300"
                  }
                >
                  {log.text}
                </span>
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-1.5 text-indigo-400 mt-1 select-none">
                <div className="w-1.5 h-3 bg-indigo-400 animate-pulse" />
                <span className="text-[10px] italic">listening for events...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
