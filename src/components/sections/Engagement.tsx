"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { BookACallButton } from "@/components/booking/BookACallButton";

function getNextBusinessDay(): string {
  const now = new Date();
  const day = now.getDay();
  let daysToAdd = 1;
  if (day === 5) daysToAdd = 3;
  else if (day === 6) daysToAdd = 2;
  const next = new Date(now);
  next.setDate(now.getDate() + daysToAdd);
  return next.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getMonthLabel(): string {
  return new Date().toLocaleDateString("en-US", { month: "long" });
}

export default function Availability() {
  const monthLabel = getMonthLabel();
  const nextDate = getNextBusinessDay();
  const totalSlots = 4;
  const availableSlots: number = 2;
  const usedSlots = totalSlots - availableSlots;
  const fillPercent = (usedSlots / totalSlots) * 100;

  return (
    <section
      id="availability"
      className="py-24 sm:py-32 bg-background relative overflow-hidden z-10 border-t border-white/5"
    >
      {/* Radial glow behind widget */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-indigo-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 mb-12"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
            Currently accepting new projects
          </span>
        </motion.div>

        {/* Capacity Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-2xl bg-zinc-900/50 border border-zinc-800/60 overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.04),transparent_60%)] pointer-events-none" />

          <div className="relative p-6 sm:p-8">
            {/* Top row — month & slots */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">
                    {monthLabel}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                    {availableSlots}
                  </span>
                  <span className="text-sm text-zinc-400">
                    implementation {availableSlots === 1 ? "slot" : "slots"} available
                  </span>
                </div>
              </div>

              {/* Capacity bar */}
              <div className="w-full sm:w-40 flex-shrink-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Capacity</span>
                  <span className="text-[10px] font-mono text-zinc-500">{usedSlots}/{totalSlots}</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${fillPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05] mb-6" />

            {/* Bottom row — next call + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              {/* Next available date */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                    Next discovery call
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {nextDate}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <BookACallButton className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                Reserve a Call
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </BookACallButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
