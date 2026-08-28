"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { metricsData } from "@/data/metrics";

export default function Metrics() {
  return (
    <section id="intelligence" className="py-24 bg-background relative overflow-hidden z-10 border-y border-white/5">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
            System outcomes
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Enterprise readiness. Measurable outcomes.
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed">
            We track system performance and business metrics in real-time, delivering predictable scalability.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metricsData.map((metric, idx) => (
            <MetricCard key={metric.id} metric={metric} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MetricCardProps {
  metric: typeof metricsData[0];
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(metric.numericValue);
      return;
    }

    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const increment = metric.numericValue / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setDisplayValue((prev) => {
        const nextVal = prev + increment;
        if (stepCount >= steps) {
          clearInterval(timer);
          return metric.numericValue;
        }
        return nextVal;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, metric.numericValue]);

  // Format the display value: round floats or format integers
  const formattedVal =
    metric.numericValue % 1 === 0
      ? Math.floor(displayValue)
      : displayValue.toFixed(1);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white/2 border border-white/5 relative flex flex-col justify-between h-[200px]"
    >
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {metric.label}
        </h4>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {metric.description}
        </p>
      </div>

      <div className="mt-6 flex items-baseline">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent font-mono">
          {formattedVal}
          <span className="text-indigo-400 font-sans font-medium text-3xl ml-0.5">
            {metric.suffix}
          </span>
        </span>
      </div>
    </motion.div>
  );
}
