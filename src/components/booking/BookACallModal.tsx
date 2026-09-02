"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Mail,
  Wallet,
  X,
} from "lucide-react";
import { createBooking } from "@/app/actions/create-booking";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  BUDGET_OPTIONS,
  TIME_SLOTS,
  bookingSchema,
  formatTimeLabel,
  type BookingFormValues,
} from "@/lib/validations/booking";

type BookACallModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const fieldClass =
  "h-11 w-full rounded-xl bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/30 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 [color-scheme:dark]";

function todayIsoDate() {
  return new Date().toISOString().split("T")[0];
}

export function BookACallModal({ open, onOpenChange }: BookACallModalProps) {
  const [meetLink, setMeetLink] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      date: "",
      time: "10:00",
      budget: "not-sure",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onOpenChange(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, isSubmitting, onOpenChange]);

  const close = () => {
    if (isSubmitting) return;
    onOpenChange(false);
  };

  const onSubmit = async (values: BookingFormValues) => {
    setServerError(null);
    const result = await createBooking(values);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    setMeetLink(result.meetLink);
  };

  const handleCloseComplete = (latestOpen: boolean) => {
    if (latestOpen) return;
    reset();
    setMeetLink(null);
    setCopied(false);
    setServerError(null);
  };

  const copyLink = async () => {
    if (!meetLink) return;
    await navigator.clipboard.writeText(meetLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <AnimatePresence onExitComplete={() => handleCloseComplete(open)}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close booking modal"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-white/[0.08] bg-[#0b101c]/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="flex items-start justify-between gap-4 p-6 pb-2">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-300/80 mb-1">
                  Instant booking
                </p>
                <h2 id="book-call-title" className="text-xl font-semibold text-white">
                  {meetLink ? "You are booked" : "Book a strategy call"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {meetLink
                    ? "A Google Meet link is ready. Details are also in your inbox."
                    : "Pick a time. We generate a Meet link and confirm instantly."}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 pt-4">
              {meetLink ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-sm text-white/70 mb-4 break-all">{meetLink}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 text-sm font-medium transition-colors"
                    >
                      Open Google Meet
                    </a>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white px-5 py-3 text-sm font-medium cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copied" : "Copy link"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white/80">
                      <Building2 className="w-3.5 h-3.5" />
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Acme Robotics"
                      className={fieldClass}
                      {...register("companyName")}
                    />
                    {errors.companyName && (
                      <p className="text-xs text-red-400">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail" className="text-white/80">
                      <Mail className="w-3.5 h-3.5" />
                      Company Email
                    </Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      placeholder="you@company.com"
                      className={fieldClass}
                      {...register("companyEmail")}
                    />
                    {errors.companyEmail && (
                      <p className="text-xs text-red-400">{errors.companyEmail.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-white/80">
                        <Calendar className="w-3.5 h-3.5" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        min={todayIsoDate()}
                        className={fieldClass}
                        {...register("date")}
                      />
                      {errors.date && (
                        <p className="text-xs text-red-400">{errors.date.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-white/80">
                        <Clock className="w-3.5 h-3.5" />
                        Time
                      </Label>
                      <select
                        id="time"
                        className={cn(fieldClass, "px-2.5 text-sm outline-none")}
                        {...register("time")}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#0b101c]">
                            {formatTimeLabel(slot)}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="text-xs text-red-400">{errors.time.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-white/80">
                      <Wallet className="w-3.5 h-3.5" />
                      Budget
                    </Label>
                    <select
                      id="budget"
                      className={cn(fieldClass, "px-2.5 text-sm outline-none")}
                      {...register("budget")}
                    >
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value} className="bg-[#0b101c]">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-xs text-red-400">{errors.budget.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full h-12 rounded-xl text-sm font-medium text-white transition-all",
                      "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70",
                      "border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.25)]",
                      "flex items-center justify-center gap-2 cursor-pointer"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Meet link…
                      </>
                    ) : (
                      "Confirm booking"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
