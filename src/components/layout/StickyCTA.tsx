"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 hidden md:block
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-white text-sm font-medium shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:bg-white/[0.12] hover:border-white/[0.16] hover:shadow-[0_4px_32px_rgba(99,102,241,0.2)] transition-all duration-300 cursor-pointer"
      >
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Calendar className="w-3.5 h-3.5 text-white/60 group-hover:text-white/80 transition-colors" />
        Book a Strategy Call
      </a>
    </div>
  );
}
