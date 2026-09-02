"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroNetwork from "@/components/visuals/HeroNetwork";
import { cn } from "@/lib/utils";

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const tags = [
  "AI Infrastructure",
  "Automation",
  "Multi-Agent Systems",
  "Voice AI",
  "Custom AI",
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden z-10 bg-background">
      <HeroNetwork />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.07] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-500/[0.06] blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-32 pb-12 flex-1 flex flex-col items-center justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-6 font-sans"
          >
            Build the{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              intelligence
            </span>{" "}
            <br className="hidden sm:inline" />
            behind your business.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            We design and deploy intelligent AI systems that automate operations,
            connect your technology, and turn complex business processes into
            scalable systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <button
              onClick={() => router.push('/setup-meeting')}
              className={cn(
                "relative group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white transition-all duration-300",
                "bg-indigo-600 hover:bg-indigo-500",
                "border border-indigo-500/30 hover:border-indigo-400/50",
                "shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]",
                "hover:scale-[1.03] active:scale-[0.98]",
                "cursor-pointer"
              )}
            >
              Build With Zatics
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              {/* Glow ring on hover */}
              <span className="absolute inset-0 rounded-xl bg-indigo-400/0 group-hover:bg-indigo-400/5 transition-colors duration-300" />
            </button>

            {/* Secondary CTA */}
            <Link
              href="#solutions"
              className={cn(
                "group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium transition-all duration-300",
                "text-white/70 hover:text-white",
                "border border-white/10 hover:border-white/20",
                "bg-white/[0.02] hover:bg-white/[0.06]",
                "hover:scale-[1.02] active:scale-[0.98]",
                "cursor-pointer"
              )}
            >
              See What We Build
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Tech Tags Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 w-full max-w-3xl overflow-hidden mask-marquee"
        >
          <div className="flex w-max animate-marquee">
            {[...tags, ...tags, ...tags].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="inline-flex items-center px-4 py-1.5 mx-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-xs font-mono text-muted-foreground/70 tracking-wider whitespace-nowrap hover:border-indigo-500/30 hover:text-indigo-300/80 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}