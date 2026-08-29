"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { audienceSegments } from "@/data/solutions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

export default function WhoWeWorkWith() {
  return (
    <section className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4"
          >
            For companies that want to move before the market does.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audienceSegments.map((segment, idx) => {
            const SegmentIcon = (Icons as any)[segment.iconName] || Icons.Cpu;

            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <SegmentIcon className="w-6 h-6" />
                </div>

                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {segment.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {segment.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-lg sm:text-xl font-bold text-white mt-12 mb-6"
        >
          If you can identify the problem,{" "}
          <span className="text-indigo-400">we can engineer the system.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-indigo-400 hover:text-indigo-300 bg-transparent hover:bg-transparent inline-flex items-center gap-2 group font-medium cursor-pointer"
            )}
          >
            Talk to an AI Engineer
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
