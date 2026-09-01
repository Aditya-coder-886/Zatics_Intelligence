"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Workflow, Link2, Gauge, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const pillars = [
  {
    icon: Workflow,
    title: "Automate.",
    description:
      "Turn manual, repetitive work into intelligent systems that run on their own.",
    accent: "indigo",
    borderHover: "hover:border-indigo-500/40",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    iconText: "text-indigo-400",
    glow: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    shadow: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
  {
    icon: Link2,
    title: "Integrate.",
    description:
      "Connect your existing tools, data, and workflows into one intelligent layer.",
    accent: "blue",
    borderHover: "hover:border-blue-500/40",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconText: "text-blue-400",
    glow: "from-blue-500/10 via-blue-500/5 to-transparent",
    shadow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
  {
    icon: Gauge,
    title: "Optimize.",
    description:
      "Reduce cost, improve speed, and eliminate waste across your AI systems.",
    accent: "emerald",
    borderHover: "hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconText: "text-emerald-400",
    glow: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    icon: TrendingUp,
    title: "Scale.",
    description:
      "Build systems that grow with your business, not against it.",
    accent: "purple",
    borderHover: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconText: "text-purple-400",
    glow: "from-purple-500/10 via-purple-500/5 to-transparent",
    shadow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  },
];

export default function ValueProposition() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-background relative overflow-hidden z-10"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline + Paragraph */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]"
          >
            <motion.span
              variants={fadeUp}
              className="block text-white/40 mb-1"
            >
              Your next AI system shouldn&apos;t be another experiment.
            </motion.span>
            <motion.span
              variants={fadeUp}
              className="block bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent"
            >
              It should work.
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mt-6 leading-relaxed max-w-2xl mx-auto"
          >
            From intelligent automation to multi-agent architectures, we build
            production-ready AI systems designed around one thing: Making your
            business faster, smarter, and more scalable.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`
                  relative p-7 sm:p-8 rounded-2xl cursor-default
                  bg-gradient-to-b from-white/[0.03] to-white/[0.01]
                  border border-white/[0.06]
                  transition-all duration-400 ease-out
                  ${pillar.borderHover}
                  ${isHovered ? `translate-y-[-6px] ${pillar.shadow} border-opacity-100` : ""}
                  ${isDimmed ? "opacity-40 blur-[1px] scale-[0.98]" : "opacity-100 blur-0 scale-100"}
                `}
              >
                {/* Glow background on hover */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl -z-10
                    bg-gradient-to-tr ${pillar.glow}
                    transition-opacity duration-500
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
                />

                {/* Icon */}
                <div
                  className={`
                    w-12 h-12 rounded-xl border flex items-center justify-center mb-5
                    ${pillar.iconBg} ${pillar.iconText}
                    transition-transform duration-300
                    ${isHovered ? "scale-110" : "scale-100"}
                  `}
                >
                  <PillarIcon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
