"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuresData } from "@/data/features";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

export default function Features() {
  return (
    <section id="solutions" className="py-24 bg-background relative overflow-hidden z-10">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-blue-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3"
          >
            What We Build
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            AI that actually does the work.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed"
          >
            Forget another chatbot sitting on your website. We build systems
            that think, connect, execute, and improve.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, idx) => {
            const IconComponent = (Icons as any)[feature.iconName] || Icons.Cpu;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(99,102,241,0.06),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <Icons.ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h4>

                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-indigo-400 hover:text-indigo-300 bg-transparent hover:bg-transparent inline-flex items-center gap-2 group font-medium cursor-pointer"
            )}
          >
            Explore Our Capabilities
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
