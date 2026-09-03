"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { footerLinks, socialLinks } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white fill-white/10" />
              </div>
              <span className="font-bold tracking-[0.15em] text-xs uppercase text-white">
                Zatics Intelligence
              </span>
            </Link>
            <p className="text-[11px] text-zinc-500 leading-relaxed max-w-[200px]">
              AI Systems. Automation. Infrastructure.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={socialLinks.email}
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                aria-label="Email"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <div>
            <h4 className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-[0.2em] mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-[0.2em] mb-4">
              Technology
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.technology.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-[0.2em] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-600">
            © {currentYear} Zatics Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-disabled={link.href === "#"}
                title={link.href === "#" ? "Coming soon" : undefined}
                className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200 aria-disabled:opacity-60 aria-disabled:cursor-not-allowed"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
