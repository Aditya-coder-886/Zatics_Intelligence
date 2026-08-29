"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link2, Database, MessageSquare, CreditCard, Code, Cloud, LayoutDashboard, Server } from "lucide-react";

export default function ExistingStack() {
  const integrations = [
    { icon: LayoutDashboard, label: "CRM" },
    { icon: Server, label: "ERP" },
    { icon: Database, label: "Databases" },
    { icon: MessageSquare, label: "Communication" },
    { icon: CreditCard, label: "Payments" },
    { icon: Code, label: "APIs" },
    { icon: LayoutDashboard, label: "Internal Tools" },
    { icon: Cloud, label: "Cloud Infrastructure" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden z-10 border-y border-white/5">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            AI shouldn&apos;t replace your business.{" "}
            <span className="text-indigo-400">It should make your business better.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed"
          >
            Connect intelligent systems directly into the tools your company
            already depends on.
          </motion.p>
        </div>

        {/* Integration Network Visual */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 items-center justify-center z-10 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          >
            <div className="text-center">
              <Link2 className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
              <span className="text-[9px] font-mono text-indigo-300 uppercase tracking-wider">AI Layer</span>
            </div>
          </motion.div>

          {/* Integration grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {integrations.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="relative group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-lg sm:text-xl font-bold text-white mt-12"
        >
          One intelligent layer.{" "}
          <span className="text-indigo-400">Your entire business connected.</span>
        </motion.p>
      </div>
    </section>
  );
}
