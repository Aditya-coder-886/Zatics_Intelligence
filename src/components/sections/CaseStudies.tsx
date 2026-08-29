"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudiesData, pricingTiers } from "@/data/caseStudies";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, Check, Star } from "lucide-react";

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="py-24 bg-background relative overflow-hidden z-10">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Case Studies */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3"
          >
            Case Studies
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Built for the real world.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {caseStudiesData.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              <button
                onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
                className="w-full text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
              >
                {/* Industry tag */}
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
                  {cs.industry}
                </span>

                {/* Metrics - lead with numbers */}
                <div className="flex flex-wrap gap-3 mt-4 mb-4">
                  {cs.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white font-mono">{metric.value}</span>
                      <span className="text-[10px] text-muted-foreground">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Title */}
                <h4 className="text-base font-semibold text-white mb-2">{cs.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{cs.description}</p>

                {/* Expand indicator */}
                <div className="mt-4 flex items-center gap-1 text-xs text-indigo-400">
                  <span>{expandedId === cs.id ? "Show less" : "Read more"}</span>
                  <ArrowUpRight className={`w-3 h-3 transition-transform ${expandedId === cs.id ? "rotate-90" : ""}`} />
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedId === cs.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      {cs.testimonial && (
                        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                          <p className="text-sm text-indigo-200 italic mb-2">
                            &ldquo;{cs.testimonial.quote}&rdquo;
                          </p>
                          <p className="text-xs text-indigo-400">
                            — {cs.testimonial.author}, {cs.testimonial.role}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-indigo-400 hover:text-indigo-300 bg-transparent hover:bg-transparent inline-flex items-center gap-2 group font-medium cursor-pointer"
            )}
          >
            View All Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Transparent pricing.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed"
          >
            Every project is different. Here&apos;s how we scope engagement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={cn(
                "relative p-8 rounded-2xl border flex flex-col transition-all duration-300",
                tier.isPopular
                  ? "border-indigo-500/35 bg-gradient-to-b from-indigo-500/5 to-transparent shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10"
              )}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] uppercase font-mono font-bold tracking-wider bg-indigo-500 text-white px-3 py-1 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                  Most Common
                </span>
              )}

              <div>
                <h4 className="text-lg font-bold text-white mb-1">{tier.name}</h4>
                <p className="text-2xl font-bold text-indigo-400 font-mono mb-2">{tier.priceRange}</p>
                <p className="text-xs text-muted-foreground mb-6">{tier.description}</p>

                <div className="h-[1px] bg-white/5 w-full mb-6" />

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="#contact"
                className={cn(
                  buttonVariants({
                    variant: tier.isPopular ? "default" : "outline",
                  }),
                  "w-full text-center py-2.5 rounded-lg text-xs font-medium cursor-pointer mt-auto",
                  tier.isPopular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    : "border-white/10 hover:border-white/20 text-white bg-transparent"
                )}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
