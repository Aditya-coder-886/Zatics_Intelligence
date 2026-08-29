"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block animate-fade-in">
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-[0_4px_24px_rgba(99,102,241,0.35)] border border-indigo-500/30 transition-all duration-300 hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)] hover:scale-105 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        Book a Strategy Call
      </a>
    </div>
  );
}
