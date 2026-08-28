"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Calendar } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  companySize: z.string().min(1, "Please select your company size"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      companySize: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        trackEvent("contact_form_submit", { company: data.company, companySize: data.companySize });
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden z-10 border-t border-white/5">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: CTA Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-3">
              Get Started
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Ready to build <br />
              intelligent systems?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Let's explore how AI, semantic search indexes, and cognitive automation can transform your workflows and decisions.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-stretch sm:items-center lg:items-stretch">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer"
                )}
              >
                <Calendar className="w-4 h-4" />
                Book a Demo
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="text-center sm:text-left lg:text-center">
                <span className="text-xs text-muted-foreground font-mono">
                  Calendar syncs directly with Aivants booking schedule.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white/2 border border-white/5 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center text-center justify-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Dispatched Successfully</h4>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for reaching out. A Zatics solutions engineer will review your inquiry and schedule a discovery call within 24 business hours.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  variant="outline"
                  className="mt-8 border-white/10 text-white hover:bg-white/5"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {status === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      {...register("name")}
                      className="bg-black/30 border-white/5 focus:border-indigo-500 text-white rounded-lg py-5 px-4 text-sm"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      {...register("email")}
                      className="bg-black/30 border-white/5 focus:border-indigo-500 text-white rounded-lg py-5 px-4 text-sm"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      placeholder="Vertex Global"
                      {...register("company")}
                      className="bg-black/30 border-white/5 focus:border-indigo-500 text-white rounded-lg py-5 px-4 text-sm"
                    />
                    {errors.company && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Company Size */}
                  <div className="space-y-2 flex flex-col justify-end">
                    <Label htmlFor="companySize" className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-2">
                      Company Size
                    </Label>
                    <select
                      id="companySize"
                      {...register("companySize")}
                      className="w-full bg-black/30 border border-white/5 text-muted-foreground focus:border-indigo-500 focus:text-white rounded-lg py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors"
                    >
                      <option value="">Select size...</option>
                      <option value="1-50">1 - 50 employees</option>
                      <option value="51-200">51 - 200 employees</option>
                      <option value="201-1000">201 - 1,000 employees</option>
                      <option value="1000+">1,000+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.companySize.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    {...register("phone")}
                    className="bg-black/30 border-white/5 focus:border-indigo-500 text-white rounded-lg py-5 px-4 text-sm"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about the processes or systems you are looking to automate or optimize..."
                    {...register("message")}
                    className="bg-black/30 border-white/5 focus:border-indigo-500 text-white rounded-lg p-4 text-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-6 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Dispatching Request...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
