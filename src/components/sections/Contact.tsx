"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";

export default function Contact() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4"
        >
          Let&apos;s build what&apos;s next.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto"
        >
          Tell us what you&apos;re trying to automate, build, or scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            Book a Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="mailto:hello@zatics.com"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/5 text-white font-medium px-8 py-6 rounded-xl transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
            )}
          >
            <Mail className="w-4 h-4" />
            Contact Engineering
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
