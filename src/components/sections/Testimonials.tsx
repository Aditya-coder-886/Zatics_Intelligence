"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  // Get active items. On desktop, we show 2 slides side-by-side: index and (index + 1) % len.
  // On mobile, we only show 1 slide: index.
  const activeFirst = testimonialsData[index];
  const activeSecond = testimonialsData[(index + 1) % testimonialsData.length];

  return (
    <section className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
              Client Feedback
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Trusted by operators. <br />
              Validated by metrics.
            </h3>
            <span className="text-[10px] uppercase font-mono tracking-wider bg-white/5 text-muted-foreground px-2 py-0.5 rounded mt-2.5 inline-block border border-white/5">
              PREVIEW PLACEHOLDERS
            </span>
          </div>

          {/* Controllers */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/2 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/2 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative overflow-hidden min-h-[260px] md:min-h-[220px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Slide 1 */}
            <motion.div
              key={`slide-1-${activeFirst.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/2 border border-white/5 p-8 rounded-2xl flex flex-col justify-between h-full"
            >
              <div>
                <Quote className="w-8 h-8 text-indigo-500/20 mb-4" />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                  "{activeFirst.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <img
                  src={activeFirst.avatarUrl}
                  alt={activeFirst.author}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{activeFirst.author}</h4>
                  <p className="text-xs text-muted-foreground">
                    {activeFirst.role}, <span className="text-indigo-400">{activeFirst.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Slide 2 (Visible on Desktop only) */}
            <motion.div
              key={`slide-2-${activeSecond.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/2 border border-white/5 p-8 rounded-2xl flex flex-col justify-between h-full hidden md:flex"
            >
              <div>
                <Quote className="w-8 h-8 text-indigo-500/20 mb-4" />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                  "{activeSecond.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <img
                  src={activeSecond.avatarUrl}
                  alt={activeSecond.author}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{activeSecond.author}</h4>
                  <p className="text-xs text-muted-foreground">
                    {activeSecond.role}, <span className="text-indigo-400">{activeSecond.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-10 select-none">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === index ? "w-6 bg-indigo-500" : "w-1.5 bg-white/10 hover:bg-white/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
