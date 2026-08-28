"use client";

import React from "react";
import { faqData } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
            Inquiries
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about Zatics Intelligence platforms, integrations, timelines, and security.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion className="w-full space-y-4">
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-white/2 border border-white/5 rounded-xl px-6 py-1 hover:border-white/10 transition-colors duration-200"
            >
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-white hover:text-indigo-300 hover:no-underline text-left py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
