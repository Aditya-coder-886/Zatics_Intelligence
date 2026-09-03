"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const steps = [
  {
    number: "01",
    name: "Discover",
    description: "We identify where AI can create measurable value.",
  },
  {
    number: "02",
    name: "Architect",
    description: "We design the models, agents, integrations, and infrastructure.",
  },
  {
    number: "03",
    name: "Build",
    description: "We develop, test, and optimize the system.",
  },
  {
    number: "04",
    name: "Deploy",
    description: "We integrate it into your business and take it into production.",
  },
  {
    number: "05",
    name: "Scale",
    description: "We continuously improve performance as your business grows.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 bg-background relative overflow-hidden z-10 border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-500/[0.02] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
          >
            From problem to production.
          </motion.h2>
        </div>

        {/* Steps — horizontal flex row on desktop, vertical stack on mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 max-w-6xl mx-auto"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 transition-all duration-300 hover:border-zinc-700/60 text-center sm:text-left"
            >
              {/* Large transparent number behind content */}
              <span aria-hidden="true" className="absolute top-3 right-4 text-5xl sm:text-6xl font-black font-mono text-white/[0.06] select-none pointer-events-none leading-none">
                {step.number}
              </span>

              {/* Number badge */}
              <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                <span className="text-sm font-mono text-indigo-400 font-semibold">
                  {step.number}
                </span>
              </div>

              {/* Step name */}
              <h3 className="relative text-lg font-bold text-white mb-2">
                {step.name}
              </h3>

              {/* Description */}
              <p className="relative text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line — visible on lg only, except last item */}
              {step.number !== "05" && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-white/[0.06]" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
