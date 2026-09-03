"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/* ─── Architecture Diagram Data ─── */

interface NodeData {
  id: string;
  label: string;
  sublabel: string;
  tooltip: string;
  x: number;
  y: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

const nodes: NodeData[] = [
  {
    id: "input",
    label: "Workflow",
    sublabel: "Request",
    tooltip: "Triggers from APIs, schedules, or user events enter the pipeline.",
    x: 50,
    y: 140,
    color: "#818cf8",
    bgColor: "rgba(99,102,241,0.1)",
    borderColor: "rgba(99,102,241,0.3)",
  },
  {
    id: "router",
    label: "Intelligent",
    sublabel: "Model Router",
    tooltip: "Analyzes task complexity, cost, and latency to select the optimal model.",
    x: 210,
    y: 140,
    color: "#c084fc",
    bgColor: "rgba(168,85,247,0.1)",
    borderColor: "rgba(168,85,247,0.3)",
  },
  {
    id: "agents",
    label: "Specialized",
    sublabel: "Agents",
    tooltip: "Domain-specific AI agents that collaborate on complex multi-step tasks.",
    x: 370,
    y: 55,
    color: "#60a5fa",
    bgColor: "rgba(59,130,246,0.1)",
    borderColor: "rgba(59,130,246,0.3)",
  },
  {
    id: "rag",
    label: "Vector DB",
    sublabel: "(RAG)",
    tooltip: "Retrieval-Augmented Generation grounds responses in your actual business data.",
    x: 370,
    y: 140,
    color: "#a78bfa",
    bgColor: "rgba(139,92,246,0.1)",
    borderColor: "rgba(139,92,246,0.3)",
  },
  {
    id: "models",
    label: "Small/Fast",
    sublabel: "Models",
    tooltip: "Lightweight models handle simple tasks at a fraction of the cost.",
    x: 370,
    y: 225,
    color: "#34d399",
    bgColor: "rgba(16,185,129,0.1)",
    borderColor: "rgba(16,185,129,0.3)",
  },
  {
    id: "output",
    label: "Optimized",
    sublabel: "Execution",
    tooltip: "Results are assembled, validated, and delivered with minimal latency.",
    x: 540,
    y: 140,
    color: "#fbbf24",
    bgColor: "rgba(245,158,11,0.1)",
    borderColor: "rgba(245,158,11,0.3)",
  },
];

/* ─── Connection Paths ─── */

const connections = [
  { from: "input", to: "router" },
  { from: "router", to: "agents" },
  { from: "router", to: "rag" },
  { from: "router", to: "models" },
  { from: "agents", to: "output" },
  { from: "rag", to: "output" },
  { from: "models", to: "output" },
];

function getNodeCenter(id: string) {
  const n = nodes.find((n) => n.id === id)!;
  return { x: n.x + 50, y: n.y + 25 };
}

function getPathD(from: string, to: string) {
  const a = getNodeCenter(from);
  const b = getNodeCenter(to);
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

/* ─── Metrics Data ─── */

const metrics = [
  { label: "Faster execution.", color: "bg-emerald-400" },
  { label: "Lower unnecessary consumption.", color: "bg-blue-400" },
  { label: "Smarter orchestration.", color: "bg-violet-400" },
  { label: "Better economics.", color: "bg-amber-400" },
];

/* ─── Main Component ─── */

export default function Differentiator() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const gridId = React.useId();

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="block text-white">More intelligence.</span>
            <span className="block bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Less overhead.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl mx-auto"
          >
            AI doesn&apos;t have to mean expensive. Our architecture is designed to
            intelligently manage models, context, agents, and workflows —
            helping businesses achieve more while controlling operational costs.
          </motion.p>
        </div>

        {/* ─── Architecture Diagram ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative max-w-5xl mx-auto mb-16"
        >
          <div className="relative rounded-2xl bg-zinc-900/40 border border-zinc-800/60 p-4 sm:p-8 overflow-hidden">
            {/* Background grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
              <defs>
                <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${gridId})`} />
            </svg>

            {/* Desktop: horizontal flow. Mobile: vertical flow via SVG viewBox */}
            <svg
              viewBox="0 0 620 300"
              className="relative z-10 w-full h-auto"
              aria-label="AI Architecture Pipeline Diagram"
            >
              <defs>
                {/* Gradient for connections */}
                <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.4)" />
                  <stop offset="50%" stopColor="rgba(168,85,247,0.4)" />
                  <stop offset="100%" stopColor="rgba(245,158,11,0.4)" />
                </linearGradient>

                {/* Glow filter for data packets */}
                <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Node glow filter */}
                <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connection paths */}
              {connections.map((conn, i) => {
                const isHoveredPath =
                  hoveredNode === conn.from || hoveredNode === conn.to;
                return (
                  <g key={`${conn.from}-${conn.to}`}>
                    {/* Background path */}
                    <path
                      d={getPathD(conn.from, conn.to)}
                      fill="none"
                      stroke={
                        hoveredNode
                          ? isHoveredPath
                            ? "rgba(255,255,255,0.12)"
                            : "rgba(255,255,255,0.02)"
                          : "rgba(255,255,255,0.06)"
                      }
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ transition: "stroke 0.3s ease" }}
                    />

                    {/* Animated data packet */}
                    <circle
                      r="3"
                      fill={nodes.find((n) => n.id === conn.from)?.color || "#818cf8"}
                      filter="url(#packet-glow)"
                      opacity={hoveredNode && !isHoveredPath ? 0.15 : 0.8}
                      style={{ transition: "opacity 0.3s ease" }}
                    >
                      <animateMotion
                        dur={`${2 + i * 0.3}s`}
                        repeatCount="indefinite"
                        path={getPathD(conn.from, conn.to)}
                      />
                      <animate
                        attributeName="r"
                        values="2;4;2"
                        dur={`${2 + i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Second packet with offset */}
                    <circle
                      r="2"
                      fill={nodes.find((n) => n.id === conn.to)?.color || "#c084fc"}
                      opacity={hoveredNode && !isHoveredPath ? 0.1 : 0.5}
                      style={{ transition: "opacity 0.3s ease" }}
                    >
                      <animateMotion
                        dur={`${2 + i * 0.3}s`}
                        begin={`${1 + i * 0.15}s`}
                        repeatCount="indefinite"
                        path={getPathD(conn.from, conn.to)}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const isHovered = hoveredNode === node.id;
                const isDimmed = hoveredNode !== null && !isHovered;
                return (
                  <g
                    key={node.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label} ${node.sublabel}: ${node.tooltip}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onFocus={() => setHoveredNode(node.id)}
                    onBlur={() => setHoveredNode(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setHoveredNode((v) => (v === node.id ? null : node.id));
                      }
                      if (e.key === "Escape") setHoveredNode(null);
                    }}
                    className="cursor-pointer focus-visible:outline-none"
                    style={{
                      opacity: isDimmed ? 0.3 : 1,
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      transform: isHovered
                        ? `translate(0, -3px)`
                        : "translate(0, 0)",
                    }}
                  >
                    {/* Node background */}
                    <rect
                      x={node.x}
                      y={node.y}
                      width="100"
                      height="50"
                      rx="10"
                      fill={node.bgColor}
                      stroke={isHovered ? node.color : node.borderColor}
                      strokeWidth={isHovered ? 1.5 : 0.8}
                      filter={isHovered ? "url(#node-glow)" : undefined}
                      style={{ transition: "all 0.3s ease" }}
                    />

                    {/* Router pulse ring */}
                    {node.id === "router" && (
                      <rect
                        x={node.x - 4}
                        y={node.y - 4}
                        width="108"
                        height="58"
                        rx="13"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="0.5"
                        opacity="0.3"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.08;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="rx"
                          values="13;16;13"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    )}

                    {/* Label */}
                    <text
                      x={node.x + 50}
                      y={node.y + 21}
                      textAnchor="middle"
                      fill={node.color}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + 50}
                      y={node.y + 34}
                      textAnchor="middle"
                      fill={node.color}
                      fontSize="8"
                      fontFamily="monospace"
                      opacity="0.6"
                    >
                      {node.sublabel}
                    </text>

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={node.x - 10}
                          y={node.y - 42}
                          width="120"
                          height="32"
                          rx="6"
                          fill="rgba(0,0,0,0.85)"
                          stroke={node.borderColor}
                          strokeWidth="0.5"
                        />
                        <text
                          x={node.x + 50}
                          y={node.y - 30}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.8)"
                          fontSize="6"
                          fontFamily="sans-serif"
                        >
                          {node.tooltip.split(". ")[0]}.
                        </text>
                        <text
                          x={node.x + 50}
                          y={node.y - 20}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.8)"
                          fontSize="6"
                          fontFamily="sans-serif"
                        >
                          {node.tooltip.split(". ")[1] || ""}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Flow direction arrows (desktop only) */}
              <text x="155" y="158" fill="rgba(255,255,255,0.15)" fontSize="10" fontFamily="monospace">→</text>
              <text x="325" y="55" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="monospace">↗</text>
              <text x="325" y="158" fill="rgba(255,255,255,0.15)" fontSize="10" fontFamily="monospace">→</text>
              <text x="325" y="240" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="monospace">↘</text>
            </svg>
          </div>
        </motion.div>

        {/* ─── Performance Metrics Bar ─── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${m.color} opacity-60`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${m.color}`} />
              </span>
              <span className="text-xs sm:text-sm font-mono text-white/70">
                {m.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── CTA Button ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-white/80 hover:text-white border border-white/10 hover:border-emerald-500/40 bg-white/[0.02] hover:bg-emerald-500/[0.06] transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] cursor-pointer"
          >
            See How It Works
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[5px]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
