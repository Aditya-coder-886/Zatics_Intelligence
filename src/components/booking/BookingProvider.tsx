"use client";

import * as React from "react";
import { BookACallModal } from "@/components/booking/BookACallModal";

type BookingContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openBooking: () => void;
};

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      openBooking: () => setOpen(true),
    }),
    [open]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookACallModal open={open} onOpenChange={setOpen} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = React.useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
