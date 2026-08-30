"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/* ─── Micro-Visual Components ─── */

function AgentOrchestrationVisual() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-16 mt-4" aria-hidden="true">
      {/* Coordinator */}
      <rect x="75" y="5" width="50" height="22" rx="4" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8" />
      <text x="100" y="19" textAnchor="middle" fill="#818cf8" fontSize="7" fontFamily="monospace">Coordinator</text>

      {/* Agent A */}
      <rect x="10" y="52" width="50" height="22" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.8" />
      <text x="35" y="66" textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="monospace">Agent A</text>

      {/* Agent B */}
      <rect x="75" y="52" width="50" height="22" rx="4" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.25)" strokeWidth="0.8" />
      <text x="100" y="66" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">Agent B</text>

      {/* Agent C */}
      <rect x="140" y="52" width="50" height="22" rx="4" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.25)" strokeWidth="0.8" />
      <text x="165" y="66" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">Agent C</text>

      {/* Connection lines */}
      <line x1="90" y1="27" x2="35" y2="52" stroke="rgba(99,102,241,0.2)" strokeWidth="0.7">
        <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="27" x2="100" y2="52" stroke="rgba(99,102,241,0.2)" strokeWidth="0.7">
        <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
      </line>
      <line x1="110" y1="27" x2="165" y2="52" stroke="rgba(99,102,241,0.2)" strokeWidth="0.7">
        <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="2s" begin="0.6s" repeatCount="indefinite" />
      </line>

      {/* Pulse signals */}
      <circle r="2" fill="#818cf8">
        <animateMotion dur="2s" repeatCount="indefinite" path="M100,27 L35,52" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#a78bfa">
        <animateMotion dur="2s" begin="0.4s" repeatCount="indefinite" path="M100,27 L100,52" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.4s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#34d399">
        <animateMotion dur="2s" begin="0.8s" repeatCount="indefinite" path="M100,27 L165,52" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function ModelRoutingVisual() {
  return (
    <svg viewBox="0 0 200 70" className="w-full h-14 mt-4" aria-hidden="true">
      {/* Incoming request */}
      <rect x="5" y="25" width="40" height="20" rx="3" fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.25)" strokeWidth="0.7" />
      <text x="25" y="38" textAnchor="middle" fill="#818cf8" fontSize="6" fontFamily="monospace">Request</text>

      {/* Router */}
      <rect x="60" y="20" width="35" height="30" rx="4" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.25)" strokeWidth="0.7" />
      <text x="77" y="33" textAnchor="middle" fill="#c084fc" fontSize="5.5" fontFamily="monospace">Router</text>
      <text x="77" y="43" textAnchor="middle" fill="#c084fc80" fontSize="4.5" fontFamily="monospace">⚡</text>

      {/* Arrow in */}
      <line x1="45" y1="35" x2="60" y2="35" stroke="rgba(99,102,241,0.3)" strokeWidth="0.7">
        <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
      </line>

      {/* Small model */}
      <rect x="115" y="5" width="48" height="22" rx="3" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.7" />
      <text x="139" y="14" textAnchor="middle" fill="#60a5fa" fontSize="5" fontFamily="monospace">Small Model</text>
      <text x="139" y="22" textAnchor="middle" fill="#60a5fa80" fontSize="4.5" fontFamily="monospace">~20ms</text>

      {/* Large model */}
      <rect x="115" y="43" width="48" height="22" rx="3" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.2)" strokeWidth="0.7" />
      <text x="139" y="52" textAnchor="middle" fill="#c084fc" fontSize="5" fontFamily="monospace">Large Model</text>
      <text x="139" y="60" textAnchor="middle" fill="#c084fc80" fontSize="4.5" fontFamily="monospace">~800ms</text>

      {/* Branch lines */}
      <line x1="95" y1="28" x2="115" y2="16" stroke="rgba(59,130,246,0.25)" strokeWidth="0.6">
        <animate attributeName="stroke-opacity" values="0.25;0.6;0.25" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="95" y1="42" x2="115" y2="54" stroke="rgba(168,85,247,0.25)" strokeWidth="0.6">
        <animate attributeName="stroke-opacity" values="0.25;0.6;0.25" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </line>

      {/* Labels */}
      <text x="175" y="18" fill="#60a5fa60" fontSize="4" fontFamily="monospace">Fast</text>
      <text x="175" y="50" fill="#c084fc60" fontSize="4" fontFamily="monospace">Deep</text>
    </svg>
  );
}

function RAGVisual() {
  return (
    <svg viewBox="0 0 200 70" className="w-full h-14 mt-4" aria-hidden="true">
      {/* Unstructured data icons */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={8 + i * 14} y={10 + i * 4} width="10" height="8" rx="1.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
            <animate attributeName="y" values={`${10 + i * 4};${10 + i * 4 - 3};${10 + i * 4}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      <text x="35" y="40" fill="#ffffff20" fontSize="4" fontFamily="monospace">Data</text>

      {/* Arrow */}
      <line x1="68" y1="30" x2="85" y2="30" stroke="rgba(168,85,247,0.2)" strokeWidth="0.6" strokeDasharray="2 2">
        <animate attributeName="stroke-dashoffset" values="0;-4" dur="1s" repeatCount="indefinite" />
      </line>
      <polygon points="85,27 90,30 85,33" fill="rgba(168,85,247,0.3)" />

      {/* Vector DB */}
      <rect x="95" y="8" width="55" height="54" rx="5" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.2)" strokeWidth="0.7" />
      <text x="122" y="22" textAnchor="middle" fill="#c084fc" fontSize="5" fontFamily="monospace">Vector DB</text>

      {/* Vector rows */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="100" y={28 + i * 8} width="44" height="5" rx="1" fill={`rgba(168,85,247,${0.08 + i * 0.03})`}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}

      {/* Output */}
      <line x1="150" y1="35" x2="165" y2="35" stroke="rgba(16,185,129,0.25)" strokeWidth="0.6" />
      <polygon points="165,32 170,35 165,38" fill="rgba(16,185,129,0.35)" />
      <rect x="172" y="27" width="24" height="16" rx="3" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.6" />
      <text x="184" y="37" textAnchor="middle" fill="#34d399" fontSize="5" fontFamily="monospace">AI</text>
    </svg>
  );
}

function CostOptimizationVisual() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-14 mt-4" aria-hidden="true">
      {/* Gauge background */}
      <rect x="10" y="15" width="120" height="14" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />

      {/* Gauge fill — animated */}
      <rect x="10" y="15" width="0" height="14" rx="7" fill="rgba(16,185,129,0.2)">
        <animate attributeName="width" from="0" to="72" dur="1.5s" fill="freeze" />
      </rect>

      {/* Gauge highlight */}
      <rect x="10" y="15" width="72" height="14" rx="7" fill="rgba(16,185,129,0.12)">
        <animate attributeName="width" from="0" to="72" dur="1.5s" fill="freeze" />
      </rect>

      {/* Percentage */}
      <text x="155" y="26" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">-40%</text>

      {/* Before label */}
      <text x="10" y="45" fill="#ffffff25" fontSize="5" fontFamily="monospace">BEFORE</text>
      <rect x="10" y="48" width="110" height="4" rx="2" fill="rgba(255,255,255,0.04)" />
      <rect x="10" y="48" width="110" height="4" rx="2" fill="rgba(255,100,100,0.15)" />

      {/* After label */}
      <text x="10" y="58" fill="#34d39940" fontSize="5" fontFamily="monospace">AFTER</text>
      <rect x="10" y="61" width="110" height="4" rx="2" fill="rgba(255,255,255,0.04)" />
      <rect x="10" y="61" width="66" height="4" rx="2" fill="rgba(16,185,129,0.2)">
        <animate attributeName="width" from="110" to="66" dur="1.5s" fill="freeze" />
      </rect>
    </svg>
  );
}

function ObservabilityVisual() {
  return (
    <div className="mt-4 rounded-lg bg-black/40 border border-white/[0.06] p-3 font-mono text-[10px] leading-relaxed overflow-hidden">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400/70">live</span>
        <span className="text-white/10 ml-auto">trace_zatics_prod</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-white/30">Latency</span>
          <span className="text-amber-400">120ms</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/30">Success Rate</span>
          <span className="text-emerald-400">99.9%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/30">Tokens Used</span>
          <span className="text-blue-400">2,847</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/30">Active Agents</span>
          <span className="text-indigo-400">3</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-white/[0.04] text-[9px] text-white/15">
        <span className="text-emerald-500/40">✓</span> All systems operational
      </div>
    </div>
  );
}

function ProductionArchVisual() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[10px] font-mono text-emerald-400">Active</span>
      </div>
      <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <span className="text-[10px] font-mono text-white/40">Uptime </span>
        <span className="text-[10px] font-mono text-emerald-400">99.99%</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

const pillars = [
  {
    number: "01",
    title: "Multi-Agent Orchestration",
    description: "Coordinate specialized agents across complex workflows.",
    Visual: AgentOrchestrationVisual,
    accentBorder: "rgba(99,102,241,0.35)",
    accentGlow: "rgba(99,102,241,0.12)",
    accentText: "text-indigo-400",
  },
  {
    number: "02",
    title: "Intelligent Model Routing",
    description: "Use the right model for the right task instead of wasting compute.",
    Visual: ModelRoutingVisual,
    accentBorder: "rgba(168,85,247,0.35)",
    accentGlow: "rgba(168,85,247,0.12)",
    accentText: "text-purple-400",
  },
  {
    number: "03",
    title: "Context & RAG Systems",
    description: "Give AI access to the information your business actually runs on.",
    Visual: RAGVisual,
    accentBorder: "rgba(139,92,246,0.35)",
    accentGlow: "rgba(139,92,246,0.12)",
    accentText: "text-violet-400",
  },
  {
    number: "04",
    title: "Token & Cost Optimization",
    description: "Reduce unnecessary model consumption while maintaining performance.",
    Visual: CostOptimizationVisual,
    accentBorder: "rgba(16,185,129,0.35)",
    accentGlow: "rgba(16,185,129,0.12)",
    accentText: "text-emerald-400",
  },
  {
    number: "05",
    title: "AI Observability",
    description: "Understand what your AI systems are doing, where they fail, and how they perform.",
    Visual: ObservabilityVisual,
    accentBorder: "rgba(245,158,11,0.35)",
    accentGlow: "rgba(245,158,11,0.12)",
    accentText: "text-amber-400",
  },
  {
    number: "06",
    title: "Production Architecture",
    description: "Move from prototype to reliable systems built for real-world workloads.",
    Visual: ProductionArchVisual,
    accentBorder: "rgba(244,63,94,0.35)",
    accentGlow: "rgba(244,63,94,0.12)",
    accentText: "text-rose-400",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 sm:py-32 bg-background relative overflow-hidden z-10">
      {/* Ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-violet-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Category tag with LED dot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30">
              05 — Technology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12]"
          >
            <span className="block text-white mb-1">
              Built beyond the prompt.
            </span>
            <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              We engineer AI systems at the infrastructure level.
            </span>
          </motion.h2>
        </div>

        {/* 6-Pillar Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {pillars.map((pillar) => {
            const Visual = pillar.Visual;
            return (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 transition-all duration-400 ease-out hover:scale-[1.02] hover:border-transparent overflow-hidden"
                style={
                  {
                    "--card-glow": pillar.accentGlow,
                    "--card-border": pillar.accentBorder,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = pillar.accentBorder;
                  el.style.boxShadow = `0 0 30px ${pillar.accentGlow}, inset 0 0 30px ${pillar.accentGlow}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-mono text-white/15 tracking-wider">
                    {pillar.number}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center ${pillar.accentText} group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {pillar.number === "01" && <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v5m-5.5 5L12 12m7.5 7L12 12" /></>}
                      {pillar.number === "02" && <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>}
                      {pillar.number === "03" && <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>}
                      {pillar.number === "04" && <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>}
                      {pillar.number === "05" && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                      {pillar.number === "06" && <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><circle cx="6" cy="6" r="1" /><circle cx="6" cy="18" r="1" /></>}
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-1">
                  {pillar.description}
                </p>

                {/* Interactive Micro-Visual */}
                <Visual />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
