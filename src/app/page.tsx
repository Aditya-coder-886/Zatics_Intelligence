import React from "react";
import Navbar from "@/components/layout/Navbar";
import StickyCTA from "@/components/layout/StickyCTA";
import Hero from "@/components/sections/Hero";
import Intelligence from "@/components/sections/Intelligence";
import Features from "@/components/sections/Features";
import ExistingStack from "@/components/sections/ExistingStack";
import Technology from "@/components/sections/Technology";
import Differentiator from "@/components/sections/Differentiator";
import CaseStudies from "@/components/sections/CaseStudies";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Metrics from "@/components/sections/Metrics";
import Contact from "@/components/sections/Contact";
import Engagement from "@/components/sections/Engagement";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <StickyCTA />

      <main className="flex-1">
        <Hero />
        <Intelligence />
        <Features />
        <ExistingStack />
        <Technology />
        <Differentiator />
        <CaseStudies />
        <Solutions />
        <Process />
        <Testimonials />
        <Metrics />
        <Contact />
        <Engagement />
        <FAQ />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
