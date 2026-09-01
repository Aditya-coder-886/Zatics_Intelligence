"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeFirst = testimonialsData[index];
  const activeSecond = testimonialsData[(index + 1) % testimonialsData.length];

  return (
    <section className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
              Social Proof
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Don&apos;t take our word for it.
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/2 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/2 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden min-h-[260px] md:min-h-[220px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              key={`slide-1-${activeFirst.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: activeFirst.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                  &ldquo;{activeFirst.quote}&rdquo;
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
                    {activeFirst.role},{" "}
                    <span className="text-indigo-400">{activeFirst.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              key={`slide-2-${activeSecond.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col justify-between h-full hidden md:flex"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: activeSecond.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                  &ldquo;{activeSecond.quote}&rdquo;
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
                    {activeSecond.role},{" "}
                    <span className="text-indigo-400">{activeSecond.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10 select-none">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
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
