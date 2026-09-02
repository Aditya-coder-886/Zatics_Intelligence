"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Zap } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { buttonVariants } from "@/components/ui/button";
import { BookACallButton } from "@/components/booking/BookACallButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-white/5"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white/10" />
          </div>
          <span className="font-sans font-bold tracking-tight text-lg bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Zatics <span className="text-indigo-400">Intelligence</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <BookACallButton
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-indigo-600 hover:bg-indigo-500 text-white font-medium border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            )}
          >
            Book a Call
            <ArrowUpRight className="w-3.5 h-3.5" />
          </BookACallButton>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-muted-foreground hover:text-white p-1 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-40 bg-background/95 backdrop-blur-md md:hidden animate-fade-in flex flex-col justify-between p-6">
          <nav className="flex flex-col gap-6 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-indigo-400 transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pb-12">
            <BookACallButton
              closeMobileMenu={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-indigo-600 hover:bg-indigo-500 text-white text-center flex items-center justify-center gap-1"
              )}
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </BookACallButton>
          </div>
        </div>
      )}
    </header>
  );
}
