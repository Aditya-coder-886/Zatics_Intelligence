"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "#contact";

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden z-10"
    >
      {/* Deep radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.04)_0%,rgba(0,0,0,0)_50%)]" />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')] pointer-events-none" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/[0.05] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Contrasting Headlines */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-500 leading-[1.15] mb-3"
          >
            You could keep doing it manually.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
              Or you could build the system.
            </span>
          </motion.p>
        </div>

        {/* Urgency Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Your competitors are already figuring out how AI fits into their
          operations. The question isn&apos;t whether AI will change your business.
          It&apos;s whether you&apos;ll build the advantage before they do.
        </motion.p>

        {/* Primary CTA Button — The Focal Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mb-6"
        >
          <a
            href={bookingUrl}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 sm:px-12 sm:py-6 rounded-2xl text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] cursor-pointer"
          >
            Build Your AI System
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />

            {/* Pulsing glow ring on hover */}
            <span className="absolute inset-0 rounded-2xl bg-indigo-400/0 group-hover:bg-indigo-400/5 transition-colors duration-300" />
            <span className="absolute -inset-1 rounded-2xl bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </a>
        </motion.div>

        {/* Supporting Footer Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-xs sm:text-sm font-mono text-zinc-600 tracking-wide"
        >
          Tell us what you&apos;re trying to automate, build, or scale.
        </motion.p>
      </div>
    </section>
  );
}
