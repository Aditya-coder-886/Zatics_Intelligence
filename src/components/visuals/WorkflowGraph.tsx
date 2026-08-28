"use client";

import React, { useState, useEffect } from "react";
import { Mail, Shield, Check, Server, MessageSquare, ArrowRight, Settings } from "lucide-react";

export default function WorkflowGraph() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    {
      id: "trigger",
      name: "Email Trigger",
      type: "Ingest",
      icon: Mail,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/5",
      status: "Active",
    },
    {
      id: "router",
      name: "AI Classifier",
      type: "Cognitive",
      icon: Shield,
      color: "border-purple-500/30 text-purple-400 bg-purple-500/5",
      status: "Classifying",
    },
    {
      id: "database",
      name: "Vector Database",
      type: "Store",
      icon: Server,
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
      status: "Synchronized",
    },
    {
      id: "action",
      name: "Slack Notify",
      type: "Notify",
      icon: MessageSquare,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
      status: "Dispatched",
    },
  ];

  return (
    <div className="w-full rounded-2xl glass-card border border-white/5 p-6 overflow-hidden flex flex-col justify-between h-[400px]">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Intelligent Automation Graph</h3>
          <p className="text-xs text-muted-foreground">Self-optimizing cognitive pipelines</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] text-emerald-400 font-mono">FLOW ACTIVE</span>
        </div>
      </div>

      {/* Nodes grid & SVG path linkages */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-around gap-6 relative px-4">
        {/* Connection SVGs for Desktop */}
        <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Connection 1 */}
            <path
              d="M 120 135 H 220"
              fill="none"
              stroke={pulseIndex === 0 ? "url(#pulseGrad)" : "rgba(255, 255, 255, 0.06)"}
              strokeWidth="2.5"
              strokeDasharray={pulseIndex === 0 ? "8, 8" : "none"}
              className="transition-all duration-700"
            />
            {/* Connection 2 */}
            <path
              d="M 330 135 H 430"
              fill="none"
              stroke={pulseIndex === 1 ? "url(#pulseGrad)" : "rgba(255, 255, 255, 0.06)"}
              strokeWidth="2.5"
              strokeDasharray={pulseIndex === 1 ? "8, 8" : "none"}
              className="transition-all duration-700"
            />
            {/* Connection 3 */}
            <path
              d="M 540 135 H 640"
              fill="none"
              stroke={pulseIndex === 2 ? "url(#pulseGrad)" : "rgba(255, 255, 255, 0.06)"}
              strokeWidth="2.5"
              strokeDasharray={pulseIndex === 2 ? "8, 8" : "none"}
              className="transition-all duration-700"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {nodes.map((node, index) => {
          const NodeIcon = node.icon;
          const isActive = pulseIndex === index;

          return (
            <div
              key={node.id}
              className={`w-full md:w-36 rounded-xl border p-4 flex flex-col items-center text-center z-10 transition-all duration-500 relative ${
                isActive
                  ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.25)] scale-105"
                  : "bg-white/2 border-white/5 hover:border-white/15"
              }`}
            >
              {/* Pulsing indicator dot */}
              {isActive && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white shadow-md animate-bounce">
                  ⚡
                </span>
              )}

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${node.color}`}
              >
                <NodeIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground mb-1">
                {node.type}
              </span>
              <h4 className="text-xs font-semibold text-foreground line-clamp-1">{node.name}</h4>
              
              <div className="mt-3 flex items-center gap-1.5 bg-white/3 border border-white/5 rounded px-2 py-0.5 w-full justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-400" />
                <span className="text-[9px] font-mono text-muted-foreground tracking-wider uppercase">
                  {node.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer statistics */}
      <div className="bg-black/30 border border-white/5 rounded-lg p-3 grid grid-cols-3 gap-2 mt-4 text-center">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Avg Latency</span>
          <p className="text-xs font-semibold font-mono text-indigo-400 mt-0.5">84 ms</p>
        </div>
        <div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Accuracy</span>
          <p className="text-xs font-semibold font-mono text-emerald-400 mt-0.5">99.85%</p>
        </div>
        <div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">Executions</span>
          <p className="text-xs font-semibold font-mono text-white mt-0.5">2.4M / day</p>
        </div>
      </div>
    </div>
  );
}
