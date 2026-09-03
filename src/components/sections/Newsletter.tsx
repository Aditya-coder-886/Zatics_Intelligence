"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        trackEvent("newsletter_subscribed", { emailDomain: email.split("@")[1] });
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection error. Please try again later.");
    }
  };

  return (
    <section className="py-24 sm:py-28 bg-background relative overflow-hidden z-10 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left: Text */}
          <div className="lg:col-span-5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Stay ahead of what&apos;s next.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              AI is moving fast. Get occasional insights on AI systems, automation,
              infrastructure, and what&apos;s actually working in production.
            </p>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 w-full">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold block">You&apos;re subscribed</span>
                  <span className="text-xs text-emerald-400/80">
                    Check your inbox for a confirmation email.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3" noValidate>
                <div className="flex-1 relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    aria-label="Email address"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                    required
                    className="w-full bg-white/[0.03] border border-zinc-800 focus:border-indigo-500/60 text-white text-sm rounded-xl px-5 py-3.5 outline-none transition-colors duration-200 placeholder:text-zinc-600 disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <div id="newsletter-error" role="alert" aria-live="polite" className="mt-3 flex items-start gap-2 text-red-400 text-xs pl-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p>{errorMessage}</p>
              </div>
            )}
            <div aria-live="polite" className="sr-only">
              {status === "success" ? "Subscribed successfully" : ""}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
