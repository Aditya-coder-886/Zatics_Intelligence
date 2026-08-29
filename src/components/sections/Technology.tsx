"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Route, Database, Coins, Eye, Server } from "lucide-react";

export default function Technology() {
  const differentiators = [
    {
      icon: Network,
      title: "Multi-Agent Orchestration",
      description: "Coordinate specialized agents across complex workflows.",
      color: "text-indigo-400",
    },
    {
      icon: Route,
      title: "Intelligent Model Routing",
      description: "Use the right model for the right task instead of wasting compute.",
      color: "text-blue-400",
    },
    {
      icon: Database,
      title: "Context & RAG Systems",
      description: "Give AI access to the information your business actually runs on.",
      color: "text-purple-400",
    },
    {
      icon: Coins,
      title: "Token & Cost Optimization",
      description: "Reduce unnecessary model consumption while maintaining performance.",
      color: "text-emerald-400",
    },
    {
      icon: Eye,
      title: "AI Observability",
      description: "Understand what your AI systems are doing, where they fail, and how they perform.",
      color: "text-amber-400",
    },
    {
      icon: Server,
      title: "Production Architecture",
      description: "Move from prototype to reliable systems built for real-world workloads.",
      color: "text-rose-400",
    },
  ];

  return (
    <section id="technology" className="py-24 bg-background relative overflow-hidden z-10">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3"
          >
            Technology
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Built beyond the prompt.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed"
          >
            We engineer AI systems at the infrastructure level.
          </motion.p>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto mb-20 p-8 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tech-grid)" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Layer */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-4">Input Layer</div>
              {["User Query", "API Request", "Scheduled Task"].map((item) => (
                <div key={item} className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-mono text-center">
                  {item}
                </div>
              ))}
            </div>

            {/* Orchestration Layer */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-4">Orchestration</div>
              {["Model Router", "Agent Coordinator", "Context Manager"].map((item) => (
                <div key={item} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-mono text-center">
                  {item}
                </div>
              ))}
            </div>

            {/* Output Layer */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-4">Output Layer</div>
              {["Action Execution", "Response Generation", "System Update"].map((item) => (
                <div key={item} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Connection arrows */}
          <div className="hidden md:flex absolute top-1/2 left-1/3 -translate-y-1/2 w-8 items-center justify-center">
            <div className="w-full h-[2px] bg-gradient-to-r from-indigo-500/50 to-purple-500/50" />
          </div>
          <div className="hidden md:flex absolute top-1/2 right-1/3 -translate-y-1/2 w-8 items-center justify-center">
            <div className="w-full h-[2px] bg-gradient-to-r from-purple-500/50 to-emerald-500/50" />
          </div>
        </motion.div>

        {/* Six Technical Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <ItemIcon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
