"use client";

import React, { useState } from "react";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid work email address.");
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
    <section className="py-20 bg-background border-t border-white/5 relative overflow-hidden z-10">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Stay ahead of what&apos;s next.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
              AI is moving fast. Get occasional insights on AI systems, automation,
              infrastructure, and what&apos;s actually working in production.
            </p>
          </div>

          <div className="lg:col-span-6 w-full">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold block">You&apos;re subscribed</span>
                  <span className="text-xs text-emerald-400/80">
                    Check your inbox for a confirmation email.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full bg-black/30 border-white/5 focus:border-indigo-500 text-white rounded-xl py-6 pl-11 pr-4 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-6 px-8 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  ) : (
                    "Subscribe →"
                  )}
                </Button>
              </form>
            )}

            {status === "error" && (
              <div className="mt-3 flex items-start gap-2 text-red-400 text-xs pl-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
