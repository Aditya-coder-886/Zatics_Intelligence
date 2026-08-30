"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudiesData } from "@/data/caseStudies";
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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function CaseStudies() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-background relative overflow-hidden z-10">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

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
            Built for the real world.
          </motion.h2>
        </div>

        {/* Case Study Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {caseStudiesData.map((cs) => (
            <motion.div key={cs.id} variants={fadeUp}>
              <div className="group relative h-full p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 transition-all duration-400 ease-out hover:translate-y-[-4px] hover:border-transparent overflow-hidden"
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(16,185,129,0.3)";
                  el.style.boxShadow = "0 0 40px rgba(16,185,129,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                }}
              >
                {/* Industry tag */}
                <span className="inline-block text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider mb-4 px-2 py-0.5 rounded bg-emerald-500/[0.08] border border-emerald-500/15">
                  {cs.industry}
                </span>

                {/* Project title */}
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 leading-snug">
                  {cs.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                  {cs.description}
                </p>

                {/* Metrics — the visual highlight */}
                <div className="mt-auto pt-5 border-t border-white/[0.05]">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {cs.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                          {metric.value}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wide">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Glow accent on hover — behind metrics */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-white/70 hover:text-white border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] hover:bg-emerald-500/[0.04] transition-all duration-300 cursor-pointer"
          >
            View All Work
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
