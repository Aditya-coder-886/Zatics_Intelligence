import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import LogoCloud from "@/components/sections/LogoCloud";
import Intelligence from "@/components/sections/Intelligence";
import Metrics from "@/components/sections/Metrics";
import Features from "@/components/sections/Features";
import Process from "@/components/sections/Process";
import Solutions from "@/components/sections/Solutions";
import Engagement from "@/components/sections/Engagement";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function Home() {
  return (
    <>
      {/* Client-side Smooth scroll integration */}
      <SmoothScroll />

      {/* Global Navigation */}
      <Navbar />

      {/* Structured Content Sections */}
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <Intelligence />
        <Metrics />
        <Features />
        <Process />
        <Solutions />
        <Engagement />
        <Testimonials />
        <FAQ />
        <Contact />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
