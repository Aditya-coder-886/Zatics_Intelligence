"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { solutionsData } from "@/data/solutions";
import * as Icons from "lucide-react";

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
            Tailored Solutions
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Built for enterprise impact.
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
            Targeted AI integrations designed to resolve high-friction bottlenecks and accelerate operations.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionsData.map((solution, idx) => {
            // Dynamically resolve Lucide Icon
            const IconComponent = (Icons as any)[solution.iconName] || Icons.Cpu;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between h-[230px] overflow-hidden"
              >
                {/* Radial Glow Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(99,102,241,0.06),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div>
                  <div className="flex items-center justify-between">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center transition-all group-hover:scale-105 duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Arrow indicator */}
                    <Icons.ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-semibold text-white mt-5 group-hover:text-indigo-300 transition-colors">
                    {solution.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.03] flex items-center justify-between text-[10px] font-mono text-muted-foreground group-hover:text-indigo-400/80 transition-colors">
                  <span>ENTERPRISE GRADE</span>
                  <span>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
