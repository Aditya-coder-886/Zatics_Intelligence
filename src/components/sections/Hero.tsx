"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroNetwork from "@/components/visuals/HeroNetwork";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden z-10 bg-background">
      {/* Canvas particle background */}
      <HeroNetwork />

      {/* Soft gradient lighting spots */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-8 select-none shadow-[0_0_15px_rgba(99,102,241,0.05)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AI-Powered Business Intelligence</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-6 font-sans"
        >
          Turn complexity into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-200 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            intelligent action.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
        >
          Zatics Intelligence helps businesses transform data, workflows, and decisions with intelligent AI systems built for real-world outcomes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-6 rounded-xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all flex items-center justify-center gap-2 group text-base cursor-pointer"
            )}
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="#platform"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto border-white/10 hover:border-white/20 bg-white/2 hover:bg-white/5 text-white font-medium px-8 py-6 rounded-xl transition-all text-base cursor-pointer"
            )}
          >
            Explore Platform
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
