"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Check, Compass, Link2, Brain, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      name: "Understand",
      title: "Audit & Align",
      description:
        "We dissect your existing data infrastructure, software interfaces, workflows, and operational objectives to construct a technical blueprint.",
      icon: Compass,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      number: "02",
      name: "Connect",
      title: "Semantic Integration",
      description:
        "Connect databases, internal document pools, cloud applications, and operational APIs into a unified, secure semantic query layer.",
      icon: Link2,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      number: "03",
      name: "Intelligence",
      title: "Model Deployment",
      description:
        "Integrate cognitive AI agents, specialized reasoning algorithms, and feedback loops directly into your software stack.",
      icon: Brain,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      number: "04",
      name: "Optimize",
      title: "Continuous Tuning",
      description:
        "Conduct automated model fine-tuning, telemetry monitoring, and response latency optimization to keep business outcomes accelerating.",
      icon: Activity,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    const line = lineRef.current;
    const trigger = triggerRef.current;

    if (!container || !line || !trigger) return;

    // Timeline line progress animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 35%",
        end: "bottom 65%",
        scrub: true,
      },
    });

    tl.to(line, {
      height: "100%",
      ease: "none",
    });

    // Step activation states triggers
    steps.forEach((_, idx) => {
      ScrollTrigger.create({
        trigger: `.process-step-${idx}`,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden z-10">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-500/2 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Title Section (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
              Delivery Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              From data to <br />
              intelligent action.
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-sm">
              Our structured approach maps discovery directly to scaled production intelligence.
            </p>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12" ref={triggerRef}>
            
            {/* Background connection line */}
            <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-[2px] bg-white/5 z-0" />
            
            {/* Active progress connection line */}
            <div
              ref={lineRef}
              className="absolute left-[15px] sm:left-[23px] top-4 w-[2px] bg-gradient-to-b from-indigo-500 via-indigo-400 to-emerald-500 z-0 h-0"
            />

            <div className="space-y-16">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;

                return (
                  <div
                    key={idx}
                    className={`process-step-${idx} relative z-10 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    {/* Circle Node Indicator */}
                    <div
                      className={`absolute -left-[41px] sm:-left-[49px] w-6 sm:w-8 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-500 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)] scale-105"
                          : isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-background border-white/10 text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[10px] font-mono font-bold">{step.number}</span>
                      )}
                    </div>

                    {/* Step Card Content */}
                    <div className="bg-white/2 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${step.color}`}>
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <h4 className="text-base font-bold text-white font-sans">{step.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
