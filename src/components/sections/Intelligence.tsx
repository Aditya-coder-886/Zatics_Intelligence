"use client";

import React from "react";
import { motion } from "framer-motion";
import { Workflow, Link2, Gauge, TrendingUp } from "lucide-react";

export default function ValueProposition() {
  const pillars = [
    {
      icon: Workflow,
      title: "Automate.",
      description: "Turn manual, repetitive work into intelligent systems that run on their own.",
      accent: "text-indigo-400",
      glow: "from-indigo-500/10 to-purple-500/5",
    },
    {
      icon: Link2,
      title: "Integrate.",
      description: "Connect your existing tools, data, and workflows into one intelligent layer.",
      accent: "text-blue-400",
      glow: "from-blue-500/10 to-indigo-500/5",
    },
    {
      icon: Gauge,
      title: "Optimize.",
      description: "Reduce cost, improve speed, and eliminate waste across your AI systems.",
      accent: "text-emerald-400",
      glow: "from-emerald-500/10 to-blue-500/5",
    },
    {
      icon: TrendingUp,
      title: "Scale.",
      description: "Build systems that grow with your business, not against it.",
      accent: "text-purple-400",
      glow: "from-purple-500/10 to-indigo-500/5",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden z-10">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Your next AI system shouldn&apos;t be another experiment.{" "}
            <span className="text-indigo-400">It should work.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed"
          >
            From intelligent automation to multi-agent architectures, we build
            production-ready AI systems designed around one thing: Making your
            business faster, smarter, and more scalable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-300 text-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-tr ${pillar.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl`} />

                <div className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-5 ${pillar.accent} group-hover:scale-110 transition-transform duration-300`}>
                  <PillarIcon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
