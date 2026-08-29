"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Compass, Code, Rocket, TrendingUp } from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: "01",
      name: "Discover",
      description: "We identify where AI can create measurable value.",
      icon: Search,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      number: "02",
      name: "Architect",
      description: "We design the models, agents, integrations, and infrastructure.",
      icon: Compass,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      number: "03",
      name: "Build",
      description: "We develop, test, and optimize the system.",
      icon: Code,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      number: "04",
      name: "Deploy",
      description: "We integrate it into your business and take it into production.",
      icon: Rocket,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      number: "05",
      name: "Scale",
      description: "We continuously improve performance as your business grows.",
      icon: TrendingUp,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-500/2 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3"
          >
            Process
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            From problem to production.
          </motion.h3>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-5 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-sm font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {step.number}
                    </span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${step.color}`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{step.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
