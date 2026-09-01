"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuresData } from "@/data/features";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

function CardSpotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative group rounded-2xl overflow-hidden",
        "bg-white/[0.02] border border-white/[0.06]",
        "transition-all duration-400 ease-out",
        "hover:border-indigo-500/30",
        "hover:translate-y-[-6px]",
        "hover:shadow-[0_8px_40px_rgba(99,102,241,0.12)]",
        className
      )}
    >
      {/* Spotlight gradient that follows cursor */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(500px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(99,102,241,0.08), transparent 40%)",
          }}
        />
      </div>
      {children}
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-background relative overflow-hidden z-10"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="block text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3"
          >
            What We Build
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12]"
          >
            <span className="bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              AI that actually does the work.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl mx-auto"
          >
            Forget another chatbot sitting on your website. We build systems
            that think, connect, execute, and improve.
          </motion.p>
        </div>

        {/* Capabilities Grid — Bento Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {featuresData.map((feature, idx) => {
            const IconComponent = (Icons as any)[feature.iconName] || Icons.Cpu;

            return (
              <motion.div key={feature.id} variants={fadeUp}>
                <CardSpotlight className="h-full p-6 sm:p-7 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20",
                        "flex items-center justify-center text-indigo-400",
                        "transition-transform duration-300 group-hover:scale-110"
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Icons.ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center mt-14"
        >
          <Link
            href="#contact"
            className={cn(
              "group inline-flex items-center justify-center gap-2",
              "px-8 py-4 rounded-xl text-base font-medium",
              "text-white/80 hover:text-white",
              "border border-white/10 hover:border-indigo-500/40",
              "bg-white/[0.02] hover:bg-indigo-500/10",
              "transition-all duration-300",
              "hover:shadow-[0_0_24px_rgba(99,102,241,0.12)]",
              "cursor-pointer"
            )}
          >
            Explore Our Capabilities
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
