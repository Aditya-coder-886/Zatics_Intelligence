"use client";

import React from "react";

export default function LogoCloud() {
  const logos = [
    { name: "Acme Corp", icon: "▲" },
    { name: "GlobalTech", icon: "⬡" },
    { name: "Vortex Labs", icon: "◆" },
    { name: "Apex Ledger", icon: "▮" },
    { name: "Synthetix", icon: "●" },
    { name: "Novo Group", icon: "▼" },
  ];

  return (
    <section className="py-12 bg-background border-y border-white/5 overflow-hidden select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="text-xs uppercase font-mono tracking-widest text-muted-foreground">
          Trusted by teams building what comes next
        </p>
      </div>

      <div className="flex overflow-hidden relative w-full mask-gradient">
        {/* Infinite scrolling logo row */}
        <div className="flex gap-16 py-4 animate-marquee min-w-full justify-around flex-shrink-0 items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-muted-foreground hover:text-white transition-colors duration-300 font-sans font-semibold tracking-tight text-sm md:text-base opacity-40 hover:opacity-100 cursor-default"
            >
              <span className="text-lg md:text-xl font-mono text-indigo-400">{logo.icon}</span>
              <span>{logo.name}</span>
            </div>
          ))}
        </div>

        {/* Duplicate list to make loop seamless */}
        <div className="flex gap-16 py-4 animate-marquee min-w-full justify-around flex-shrink-0 items-center" aria-hidden="true">
          {logos.map((logo, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center gap-2.5 text-muted-foreground hover:text-white transition-colors duration-300 font-sans font-semibold tracking-tight text-sm md:text-base opacity-40 hover:opacity-100 cursor-default"
            >
              <span className="text-lg md:text-xl font-mono text-indigo-400">{logo.icon}</span>
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Styled fade effect overlay for edges of marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
        }
      `}</style>
    </section>
  );
}
