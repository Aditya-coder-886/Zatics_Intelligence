"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Server,
  Database,
  MessageSquare,
  CreditCard,
  Code,
  Cloud,
  Link2,
} from "lucide-react";

const integrations = [
  { icon: LayoutDashboard, label: "CRM", color: "indigo" },
  { icon: Server, label: "ERP", color: "blue" },
  { icon: Database, label: "Databases", color: "purple" },
  { icon: MessageSquare, label: "Communication", color: "cyan" },
  { icon: CreditCard, label: "Payments", color: "emerald" },
  { icon: Code, label: "APIs", color: "violet" },
  { icon: LayoutDashboard, label: "Internal Tools", color: "amber" },
  { icon: Cloud, label: "Cloud Infrastructure", color: "sky" },
];

const colorMap: Record<string, { borderColor: string; textColor: string; shadowColor: string; bgColor: string; iconColor: string }> = {
  indigo: { borderColor: "rgba(99,102,241,0.3)", textColor: "#818cf8", shadowColor: "rgba(99,102,241,0.3)", bgColor: "rgba(99,102,241,0.1)", iconColor: "#818cf8" },
  blue: { borderColor: "rgba(59,130,246,0.3)", textColor: "#60a5fa", shadowColor: "rgba(59,130,246,0.3)", bgColor: "rgba(59,130,246,0.1)", iconColor: "#60a5fa" },
  purple: { borderColor: "rgba(168,85,247,0.3)", textColor: "#c084fc", shadowColor: "rgba(168,85,247,0.3)", bgColor: "rgba(168,85,247,0.1)", iconColor: "#c084fc" },
  cyan: { borderColor: "rgba(6,182,212,0.3)", textColor: "#22d3ee", shadowColor: "rgba(6,182,212,0.3)", bgColor: "rgba(6,182,212,0.1)", iconColor: "#22d3ee" },
  emerald: { borderColor: "rgba(16,185,129,0.3)", textColor: "#34d399", shadowColor: "rgba(16,185,129,0.3)", bgColor: "rgba(16,185,129,0.1)", iconColor: "#34d399" },
  violet: { borderColor: "rgba(139,92,246,0.3)", textColor: "#a78bfa", shadowColor: "rgba(139,92,246,0.3)", bgColor: "rgba(139,92,246,0.1)", iconColor: "#a78bfa" },
  amber: { borderColor: "rgba(245,158,11,0.3)", textColor: "#fbbf24", shadowColor: "rgba(245,158,11,0.3)", bgColor: "rgba(245,158,11,0.1)", iconColor: "#fbbf24" },
  sky: { borderColor: "rgba(14,165,233,0.3)", textColor: "#38bdf8", shadowColor: "rgba(14,165,233,0.3)", bgColor: "rgba(14,165,233,0.1)", iconColor: "#38bdf8" },
};

function TechPill({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  const c = colorMap[color] || colorMap.indigo;
  return (
    <div
      className="group/pill inline-flex items-center gap-2.5 px-5 py-3 mx-2 rounded-full cursor-default select-none whitespace-nowrap bg-white/[0.04] backdrop-blur-md border border-white/[0.08] transition-all duration-300 ease-out hover:bg-white/[0.07] hover:scale-105"
      style={
        {
          "--pill-border": c.borderColor,
          "--pill-shadow": c.shadowColor,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = c.borderColor;
        el.style.boxShadow = `0 0 20px ${c.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }}
    >
      <div
        className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: c.bgColor }}
      >
        <Icon className="w-4 h-4 transition-colors duration-300" style={{ color: c.iconColor }} />
      </div>
      <span className="text-sm font-medium text-white/70 group-hover/pill:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, speed = 35 }: { items: typeof integrations; reverse?: boolean; speed?: number }) {
  const duplicated = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden group/marquee my-3">
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex w-max"
        style={{
          animation: `${reverse ? "marquee-right" : "marquee-left"} ${speed}s linear infinite`,
          animationPlayState: "var(--marquee-state, running)",
        }}
        onMouseEnter={() => {
          const el = document.documentElement;
          el.style.setProperty("--marquee-state", "paused");
        }}
        onMouseLeave={() => {
          const el = document.documentElement;
          el.style.setProperty("--marquee-state", "running");
        }}
      >
        {duplicated.map((item, i) => (
          <TechPill key={`${item.label}-${i}`} icon={item.icon} label={item.label} color={item.color} />
        ))}
      </div>
    </div>
  );
}

export default function ExistingStack() {
  const row1 = integrations.slice(0, 4);
  const row2 = integrations.slice(4).concat(integrations.slice(0, 4));

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden z-10">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12]"
          >
            AI shouldn&apos;t replace your business.{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              It should make your business better.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl mx-auto"
          >
            Connect intelligent systems directly into the tools your company
            already depends on.
          </motion.p>
        </div>

        {/* AI Core Hub — Desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex justify-center mb-10"
        >
          <div className="relative px-8 py-5 rounded-2xl bg-indigo-600/10 border border-indigo-500/25 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-indigo-400" />
                </div>
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-xl border border-indigo-400/30 animate-ping-slow" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-white">AI Core</span>
                <span className="block text-[11px] font-mono text-indigo-300/70 uppercase tracking-wider">
                  Unified Intelligence Layer
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dual-row Infinite Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <MarqueeRow items={row1} speed={30} />
          <MarqueeRow items={row2} reverse speed={38} />
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-center mt-16 sm:mt-20 relative"
        >
          {/* Pulsing glow behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[120px] bg-indigo-500/[0.06] blur-[80px] rounded-full animate-pulse-slow" />
          </div>

          <h3 className="relative text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
              One intelligent layer.{" "}
            </span>
            <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Your entire business connected.
            </span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
