"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { faqData } from "@/data/faq";

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [updateHeight]);

  return (
    <div
      className={`
        border-b border-zinc-800/80 transition-colors duration-200
        ${isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.015]"}
      `}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer group"
      >
        <span
          className={`
            text-sm sm:text-base font-medium transition-colors duration-200
            ${isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"}
          `}
        >
          {item.question}
        </span>

        {/* Plus / X icon */}
        <span className="relative flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
          {/* Horizontal bar (always visible, becomes X crossbar) */}
          <span
            className={`
              absolute top-1/2 left-0 w-full h-[1.5px] rounded-full
              transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isOpen ? "bg-indigo-400 rotate-0" : "bg-zinc-500 group-hover:bg-zinc-300"}
            `}
            style={{ transform: `translateY(-50%) rotate(${isOpen ? 90 : 0}deg)` }}
          />
          {/* Vertical bar (becomes X second crossbar) */}
          <span
            className={`
              absolute top-1/2 left-0 w-full h-[1.5px] rounded-full
              transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isOpen ? "bg-indigo-400 rotate-90" : "bg-zinc-500 group-hover:bg-zinc-300 rotate-0"}
            `}
            style={{ transform: `translateY(-50%) rotate(${isOpen ? 0 : 90}deg)` }}
          />
        </span>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className="overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div ref={contentRef} className="overflow-hidden">
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pb-5 sm:pb-6 pr-8">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-background relative overflow-hidden z-10 border-t border-white/5"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Everything you need to know.
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
