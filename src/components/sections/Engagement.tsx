"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";

export default function Availability() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleString("default", { month: "long" });

  return (
    <section id="availability" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Currently accepting new projects.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12"
        >
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              {currentMonth}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-lg font-bold text-white">2 implementation slots</span>
            </div>
            <p className="text-xs text-muted-foreground">available</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              Next Discovery Call
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-lg font-bold text-white">This week</span>
            </div>
            <p className="text-xs text-muted-foreground">Book a time that works</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-6 rounded-xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all inline-flex items-center gap-2 group text-base cursor-pointer"
            )}
          >
            <Calendar className="w-4 h-4" />
            Reserve a Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
