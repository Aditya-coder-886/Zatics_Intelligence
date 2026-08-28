"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Layers, Cpu, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Engagement() {
  const phases = [
    {
      title: "Discovery",
      icon: Compass,
      timeline: "1 - 2 Weeks",
      description: "Map operations, audit databases, and locate automated bottlenecks.",
      features: [
        "Infrastructure audit",
        "AI opportunity mapping",
        "Technical blueprint draft",
        "ROI projection summary"
      ],
      isPopular: false,
      ctaText: "Begin Discovery",
      ctaHref: "#contact",
      color: "border-white/5 bg-white/2 hover:border-white/10"
    },
    {
      title: "Build",
      icon: Layers,
      timeline: "4 - 8 Weeks",
      description: "Code, configure, and integrate the custom AI intelligence layers.",
      features: [
        "Custom agent architecture",
        "Semantic search indexing",
        "API integration setup",
        "UAT and security validation"
      ],
      isPopular: true,
      ctaText: "Start Building",
      ctaHref: "#contact",
      color: "border-indigo-500/35 bg-gradient-to-b from-indigo-500/5 to-transparent shadow-[0_0_30px_rgba(99,102,241,0.15)]"
    },
    {
      title: "Scale",
      icon: Cpu,
      timeline: "Ongoing",
      description: "Continuously optimize, fine-tune models, and scale capacity.",
      features: [
        "Uptime SLA monitoring",
        "Automated model tuning",
        "Monthly performance logs",
        "Priority technical support"
      ],
      isPopular: false,
      ctaText: "Scale System",
      ctaHref: "#contact",
      color: "border-white/5 bg-white/2 hover:border-white/10"
    }
  ];

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  return (
    <section id="engagement" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
            Engagement Model
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-sans">
            Build the intelligence layer <br className="hidden sm:inline" />
            your business needs.
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed font-sans">
            We work incrementally, aligning model engineering directly with measurable business metrics.
          </p>
        </div>

        {/* Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {phases.map((phase) => {
            const PhaseIcon = phase.icon;

            return (
              <div
                key={phase.title}
                className={cn(
                  "p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative",
                  phase.color
                )}
              >
                {phase.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] uppercase font-mono font-bold tracking-wider bg-indigo-500 text-white px-3 py-1 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                    Most Active
                  </span>
                )}

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-lg bg-white/3 border border-white/5 flex items-center justify-center text-indigo-400">
                      <PhaseIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{phase.timeline}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 font-sans">{phase.title}</h4>
                  <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/5 w-full mb-6" />

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {phase.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href={phase.ctaHref}
                  className={cn(
                    buttonVariants({
                      variant: phase.isPopular ? "default" : "outline",
                    }),
                    "w-full text-center py-2.5 rounded-lg text-xs font-medium cursor-pointer",
                    phase.isPopular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      : "border-white/10 hover:border-white/20 text-white bg-transparent"
                  )}
                >
                  {phase.ctaText}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Global CTAs */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full sm:w-auto border-white/10 bg-white/2 hover:bg-white/5 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
            )}
          >
            Book a Demo
          </a>
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
            )}
          >
            Talk to Zatics
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
