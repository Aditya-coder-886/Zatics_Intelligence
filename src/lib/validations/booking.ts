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

export const bookingSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(120, "Company name is too long"),
  companyEmail: z
    .string()
    .trim()
    .email("Enter a valid company email"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Select a valid date"),
  time: z.enum(timeSlots, { error: "Select a time slot" }),
  budget: z.enum(budgetValues, { error: "Select a budget range" }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export interface BookingRecord extends BookingFormValues {
  meetLink: string;
  calendarEventId?: string | null;
}

export function formatTimeLabel(time: string): string {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${suffix}`;
}

export function formatBudgetLabel(value: string): string {
  return BUDGET_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function formatBookingDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
