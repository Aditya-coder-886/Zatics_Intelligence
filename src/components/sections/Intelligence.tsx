"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network } from "lucide-react";

export default function Intelligence() {
  const cards = [
    {
      icon: Brain,
      label: "AI Intelligence",
      heading: "Cognitive Reasoning",
      description: "Transform complex, unstructured documents into clean, structured, actionable intelligence.",
      glow: "from-indigo-500/10 to-purple-500/5",
      accent: "text-indigo-400",
      svgVisual: (
        <svg viewBox="0 0 100 60" className="w-full h-12 opacity-40">
          <circle cx="50" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-400 animate-pulse" />
          <line x1="20" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="0.75" className="text-indigo-500/40" />
          <line x1="62" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="0.75" className="text-indigo-500/40" />
          <circle cx="20" cy="30" r="3" fill="currentColor" className="text-indigo-500" />
          <circle cx="80" cy="30" r="3" fill="currentColor" className="text-indigo-500" />
        </svg>
      )
    },
    {
      icon: Cpu,
      label: "Intelligent Automation",
      heading: "Decision Workflows",
      description: "Automate repetitive business processes using cognitive steps that adapt to context changes.",
      glow: "from-blue-500/10 to-indigo-500/5",
      accent: "text-blue-400",
      svgVisual: (
        <svg viewBox="0 0 100 60" className="w-full h-12 opacity-40">
          <rect x="35" y="15" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-400" />
          <path d="M50 5 V15 M50 45 V55 M15 30 H35 M65 30 H85" stroke="currentColor" strokeWidth="1" className="text-blue-500/50 animate-pulse" />
        </svg>
      )
    },
    {
      icon: Database,
      label: "Data Intelligence",
      heading: "Semantic Unification",
      description: "Connect isolated database pools and spreadsheets into a single queryable index layer.",
      glow: "from-purple-500/10 to-indigo-500/5",
      accent: "text-purple-400",
      svgVisual: (
        <svg viewBox="0 0 100 60" className="w-full h-12 opacity-40">
          <ellipse cx="50" cy="18" rx="22" ry="7" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400" />
          <path d="M28 18 V33 C28 37 72 37 72 33 V18" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400/70" />
          <path d="M28 33 V48 C28 52 72 52 72 48 V33" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400/40" />
        </svg>
      )
    },
    {
      icon: Network,
      label: "Decision Intelligence",
      heading: "Strategic Forecasts",
      description: "Run statistical simulation models to resolve supply chain, stock, and operational bottlenecks.",
      glow: "from-emerald-500/10 to-blue-500/5",
      accent: "text-emerald-400",
      svgVisual: (
        <svg viewBox="0 0 100 60" className="w-full h-12 opacity-40">
          <path d="M15 45 L40 25 L65 35 L85 15" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400" />
          <circle cx="15" cy="45" r="2.5" fill="currentColor" className="text-emerald-400" />
          <circle cx="40" cy="25" r="2.5" fill="currentColor" className="text-emerald-400 animate-pulse" />
          <circle cx="65" cy="35" r="2.5" fill="currentColor" className="text-emerald-400" />
          <circle cx="85" cy="15" r="3" fill="currentColor" className="text-emerald-300" />
        </svg>
      )
    }
  ];

  return (
    <section id="platform" className="py-24 bg-background relative overflow-hidden z-10">
      {/* Subtle details background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
            Core capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            One intelligence layer. Endless possibilities.
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
            Configure specialized AI tools engineered to slide directly into your workflow stack and compute outcomes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const CardIcon = card.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group p-6 rounded-2xl bg-gradient-to-b from-white/3 to-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between h-[320px] overflow-hidden"
              >
                {/* Internal Card Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div>
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center mb-5 ${card.accent} group-hover:scale-105 transition-transform duration-300`}>
                    <CardIcon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {card.label}
                  </span>

                  {/* Title */}
                  <h4 className="text-base font-semibold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                    {card.heading}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card footer mini visual */}
                <div className="pt-6 mt-4 border-t border-white/5">
                  {card.svgVisual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
