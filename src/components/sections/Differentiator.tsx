"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap, DollarSign, Brain, Gauge } from "lucide-react";

export default function Differentiator() {
  const values = [
    { icon: Zap, text: "Faster execution." },
    { icon: DollarSign, text: "Lower unnecessary consumption." },
    { icon: Brain, text: "Smarter orchestration." },
    { icon: Gauge, text: "Better economics." },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden z-10 border-y border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
            >
              More intelligence.{" "}
              <span className="text-indigo-400">Less overhead.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed mb-8"
            >
              AI doesn&apos;t have to mean expensive. Our architecture is designed to
              intelligently manage models, context, agents, and workflows —
              helping businesses achieve more while controlling operational costs.
            </motion.p>

            <div className="space-y-4 mb-8">
              {values.map((item, idx) => {
                const ValueIcon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <ValueIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-white font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="#technology"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-indigo-400 hover:text-indigo-300 bg-transparent hover:bg-transparent inline-flex items-center gap-2 group font-medium cursor-pointer"
                )}
              >
                See How It Works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Animated Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
              {/* Performance vs Cost Chart */}
              <div className="relative h-64">
                <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`h-${i}`}
                      x1="40"
                      y1={20 + i * 40}
                      x2="380"
                      y2={20 + i * 40}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Labels */}
                  <text x="5" y="100" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 10, 100)">
                    Performance
                  </text>
                  <text x="210" y="195" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                    Cost
                  </text>

                  {/* Traditional line (red) */}
                  <motion.path
                    d="M 60 160 Q 120 140 180 100 Q 240 60 360 30"
                    fill="none"
                    stroke="rgba(239,68,68,0.5)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />

                  {/* Zatics line (green) */}
                  <motion.path
                    d="M 60 160 Q 100 120 140 80 Q 180 45 220 35 Q 260 28 300 25"
                    fill="none"
                    stroke="rgba(52,211,153,0.8)"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />

                  {/* Data points on Zatics line */}
                  {[
                    { cx: 60, cy: 160 },
                    { cx: 140, cy: 80 },
                    { cx: 220, cy: 35 },
                    { cx: 300, cy: 25 },
                  ].map((point, i) => (
                    <motion.circle
                      key={i}
                      cx={point.cx}
                      cy={point.cy}
                      r="4"
                      fill="#34d399"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.2 }}
                    />
                  ))}

                  {/* Legend */}
                  <line x1="60" y1="15" x2="80" y2="15" stroke="rgba(52,211,153,0.8)" strokeWidth="2" />
                  <text x="85" y="18" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">
                    Zatics (optimized)
                  </text>
                  <line x1="220" y1="15" x2="240" y2="15" stroke="rgba(239,68,68,0.5)" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="245" y="18" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">
                    Traditional (unoptimized)
                  </text>
                </svg>
              </div>

              {/* Stats bar below chart */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                {[
                  { label: "Cost Reduction", value: "40-60%" },
                  { label: "Speed Increase", value: "3-5x" },
                  { label: "Efficiency Gain", value: "2-4x" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-bold text-indigo-400 font-mono">{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
