"use client";

import * as React from "react";
import { useBooking } from "@/components/booking/BookingProvider";

type BookACallButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  closeMobileMenu?: () => void;
};

export function BookACallButton({
  children = "Book a Call",
  className,
  closeMobileMenu,
  onClick,
  type = "button",
  ...props
}: BookACallButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type={type}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        closeMobileMenu?.();
        openBooking();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
