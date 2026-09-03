"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TIME_SLOTS, formatTimeLabel, getMaxBookingDateLocal, getTodayIsoDateLocal } from "@/lib/validations/booking";

export default function SetupMeeting() {
  const router = useRouter();
  const [meetingName, setMeetingName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [agenda, setAgenda] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const trimmedName = meetingName.trim();
    if (trimmedName.length < 2) nextErrors.meetingName = "Meeting name must be at least 2 characters";
    else if (trimmedName.length > 120) nextErrors.meetingName = "Meeting name is too long (max 120)";
    if (!date) nextErrors.date = "Select a date";
    else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) nextErrors.date = "Select a valid date";
      else {
        const [y, m, d] = date.split("-").map(Number);
        const dt = new Date(y, m - 1, d);
        const isValid = dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
        if (!isValid) nextErrors.date = "Select a valid calendar date";
        else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const input = new Date(y, m - 1, d);
          input.setHours(0, 0, 0, 0);
          if (input < today) nextErrors.date = "Date cannot be in the past";
          else {
            const max = new Date();
            max.setHours(0, 0, 0, 0);
            max.setDate(max.getDate() + 90);
            if (input > max) nextErrors.date = "Date must be within the next 90 days";
          }
        }
      }
    }
    if (!TIME_SLOTS.includes(time as (typeof TIME_SLOTS)[number])) nextErrors.time = "Select a valid time slot (9:00 AM – 5:00 PM)";
    if (agenda.length > 500) nextErrors.agenda = "Agenda is too long (max 500 characters)";
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const trimmedAgenda = agenda.trim().slice(0, 500);
    const trimmedName = meetingName.trim().slice(0, 120);
    // Cryptographically secure room ID
    const roomId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().replaceAll("-", "").slice(0, 12) : Math.random().toString(36).substring(2, 12);
    const params = new URLSearchParams({
      name: trimmedName,
      date,
      time,
      agenda: trimmedAgenda,
    });
    router.push(`/meeting/${roomId}?${params.toString()}`);
  };

  const today = getTodayIsoDateLocal();
  const maxDate = getMaxBookingDateLocal();

  const fieldClass =
    "w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Schedule a Meeting</h1>
            <p className="text-muted-foreground text-sm">
              Set up your AI-powered meeting with Zatics Intelligence
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Meeting Name */}
            <div className="space-y-2">
              <label htmlFor="setup-meetingName" className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Meeting Name
              </label>
              <input
                id="setup-meetingName"
                type="text"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                placeholder="e.g., Q4 Strategy Review"
                maxLength={120}
                aria-invalid={!!errors.meetingName}
                aria-describedby={errors.meetingName ? "setup-meetingName-error" : undefined}
                disabled={isSubmitting}
                className={fieldClass}
              />
              {errors.meetingName && <p id="setup-meetingName-error" role="alert" className="text-xs text-red-400">{errors.meetingName}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="setup-date" className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <input
                  id="setup-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  max={maxDate}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "setup-date-error" : undefined}
                  disabled={isSubmitting}
                  className={cn(fieldClass, "[color-scheme:dark]")}
                />
                {errors.date && <p id="setup-date-error" role="alert" className="text-xs text-red-400">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="setup-time" className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time
                </label>
                <select
                  id="setup-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? "setup-time-error" : undefined}
                  disabled={isSubmitting}
                  className={cn(fieldClass, "[color-scheme:dark] text-sm outline-none")}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#0b101c]">
                      {formatTimeLabel(slot)}
                    </option>
                  ))}
                </select>
                {errors.time && <p id="setup-time-error" role="alert" className="text-xs text-red-400">{errors.time}</p>}
              </div>
            </div>

            {/* Agenda (Optional) */}
            <div className="space-y-2">
              <label htmlFor="setup-agenda" className="text-sm font-medium text-white/80">
                Agenda (Optional)
              </label>
              <textarea
                id="setup-agenda"
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="Brief agenda or topics to discuss..."
                rows={3}
                maxLength={500}
                aria-invalid={!!errors.agenda}
                aria-describedby={errors.agenda ? "setup-agenda-error" : undefined}
                disabled={isSubmitting}
                className={cn(fieldClass, "resize-none")}
              />
              <div className="flex justify-between">
                {errors.agenda ? <p id="setup-agenda-error" role="alert" className="text-xs text-red-400">{errors.agenda}</p> : <span />}
                <span className="text-[11px] text-white/30 ml-auto">{agenda.length}/500</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.02 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className={cn(
                "w-full py-4 rounded-xl text-base font-medium text-white transition-all duration-300",
                "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed",
                "border border-indigo-500/30 hover:border-indigo-400/50",
                "shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]",
                "flex items-center justify-center gap-2 cursor-pointer"
              )}
            >
              {isSubmitting ? "Creating..." : "Create Meeting Room"}
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

          <p className="text-center text-xs text-white/40 mt-6">
            Meetings run on Google Meet infrastructure when configured.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
