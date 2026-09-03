"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { audienceSegments } from "@/data/solutions";
import { ArrowRight, Zap, TrendingUp, Building2, Brain } from "lucide-react";

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

const iconMap: Record<string, React.ElementType> = {
  Zap,
  TrendingUp,
  Building2,
  Brain,
};

const segmentColors: Record<string, { border: string; text: string; bg: string }> = {
  startups: { border: "border-indigo-500/20", text: "text-indigo-400", bg: "bg-indigo-500/10" },
  growing: { border: "border-emerald-500/20", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  enterprise: { border: "border-blue-500/20", text: "text-blue-400", bg: "bg-blue-500/10" },
  "ai-native": { border: "border-violet-500/20", text: "text-violet-400", bg: "bg-violet-500/10" },
};

export default function WhoWeWorkWith() {
  return (
    <section id="audience" aria-label="Who we work with" className="py-24 sm:py-32 bg-background relative overflow-hidden z-10 border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

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
            For companies that want to move{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              before the market does.
            </span>
          </motion.h2>
        </div>

        {/* Audience Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-20"
        >
          {audienceSegments.map((segment) => {
            const SegmentIcon = iconMap[segment.iconName] || Zap;
            const colors = segmentColors[segment.id] || segmentColors.startups;

            return (
              <motion.div
                key={segment.id}
                variants={fadeUp}
                className="group relative p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 transition-all duration-400 ease-out hover:translate-y-[-4px] hover:border-zinc-700/60 text-center"
              >
                {/* Geometric shape / icon */}
                <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} ${colors.text} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <SegmentIcon className="w-6 h-6" />
                </div>

                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                  {segment.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {segment.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Closing Hook */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-8">
            If you can identify the problem,{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-blue-400 bg-clip-text text-transparent">
              we can engineer the system.
            </span>
          </h3>

          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Talk to an AI Engineer
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
