import { z } from "zod";

export const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-25k", label: "$10k – $25k" },
  { value: "25k-50k", label: "$25k – $50k" },
  { value: "50k-100k", label: "$50k – $100k" },
  { value: "100k-plus", label: "$100k+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
] as const;

export type BudgetValue = (typeof BUDGET_OPTIONS)[number]["value"];
export type TimeSlot = (typeof TIME_SLOTS)[number];

const budgetValues = BUDGET_OPTIONS.map((option) => option.value) as [
  BudgetValue,
  ...BudgetValue[],
];

const timeSlots = TIME_SLOTS as unknown as [TimeSlot, ...TimeSlot[]];

function isValidCalendarDate(date: string): boolean {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

function isPastDate(date: string): boolean {
  const [y, m, d] = date.split("-").map(Number);
  const input = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  input.setHours(0, 0, 0, 0);
  return input < today;
}

function isTooFarFuture(date: string): boolean {
  const [y, m, d] = date.split("-").map(Number);
  const input = new Date(y, m - 1, d);
  const max = new Date();
  max.setHours(0, 0, 0, 0);
  max.setDate(max.getDate() + 90);
  return input > max;
}

export const bookingSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(120, "Company name is too long"),
  companyEmail: z
    .string()
    .trim()
    .max(254, "Email is too long")
    .email("Enter a valid company email"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid date")
    .refine(isValidCalendarDate, "Select a valid calendar date")
    .refine((v) => !isPastDate(v), "Date cannot be in the past")
    .refine((v) => !isTooFarFuture(v), "Date must be within the next 90 days"),
  time: z.enum(timeSlots, { error: "Select a time slot" }),
  budget: z.enum(budgetValues, { error: "Select a budget range" }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export interface BookingRecord extends BookingFormValues {
  meetLink: string;
  calendarEventId?: string | null;
}

export function formatTimeLabel(time: string): string {
  const parts = time.split(":");
  if (parts.length !== 2) return time;
  const [hourStr, minute] = parts;
  const hour = Number(hourStr);
  const min = Number(minute);
  if (!Number.isFinite(hour) || !Number.isFinite(min) || hour < 0 || hour > 23 || min < 0 || min > 59) return time;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minutePadded = String(min).padStart(2, "0");
  return `${hour12}:${minutePadded} ${suffix}`;
}

export function formatBudgetLabel(value: string): string {
  return BUDGET_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function formatBookingDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return date;
  const parsed = new Date(y, m - 1, d);
  if (Number.isNaN(parsed.getTime())) return date;
  if (parsed.getFullYear() !== y || parsed.getMonth() !== m - 1 || parsed.getDate() !== d) return date;
  return parsed.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getTodayIsoDateLocal(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().split("T")[0];
}

export function getMaxBookingDateLocal(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  const todayLocal = new Date(now.getTime() - offsetMs);
  todayLocal.setDate(todayLocal.getDate() + 90);
  return todayLocal.toISOString().split("T")[0];
}
