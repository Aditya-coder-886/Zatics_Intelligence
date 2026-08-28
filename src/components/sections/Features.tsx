"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuresData } from "@/data/features";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import AIActivityTimeline from "@/components/visuals/AIActivityTimeline";
import WorkflowGraph from "@/components/visuals/WorkflowGraph";
import DataVisual from "@/components/visuals/DataVisual";
import DecisionEngine from "@/components/visuals/DecisionEngine";

export default function Features() {
  const getVisual = (type: string) => {
    switch (type) {
      case "agents":
        return <AIActivityTimeline />;
      case "automation":
        return <WorkflowGraph />;
      case "data":
        return <DataVisual />;
      case "decision":
        return <DecisionEngine />;
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden z-10 space-y-32">
      {/* Light background nodes */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-blue-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
            Platform Features
          </h2>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
            Integrated intelligence. <br />
            Built for execution.
          </h3>
        </div>

        {/* Feature Sections alternating */}
        <div className="space-y-32">
          {featuresData.map((feature, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-5 flex flex-col items-start ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Number & Category */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {feature.number}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {feature.category}
                    </span>
                  </div>

                  {/* Heading */}
                  <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight mb-5 font-sans">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={feature.ctaHref}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "p-0 text-indigo-400 hover:text-indigo-300 bg-transparent hover:bg-transparent flex items-center gap-2 group font-medium cursor-pointer"
                    )}
                  >
                    {feature.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Visual Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  {getVisual(feature.visualType)}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
