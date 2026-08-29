"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { footerLinks, socialLinks } from "@/data/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-12 relative overflow-hidden z-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-white/5">
          {/* Logo & Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-sans font-bold tracking-tight text-lg text-white">
                Zatics <span className="text-indigo-400">Intelligence</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              AI Systems. Automation. Infrastructure.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white/3 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={socialLinks.email}
                className="w-8 h-8 rounded-md bg-white/3 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
                aria-label="Email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Solutions
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Technology
            </h4>
            <ul className="space-y-3">
              {footerLinks.technology.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Zatics Intelligence. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs text-muted-foreground hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
