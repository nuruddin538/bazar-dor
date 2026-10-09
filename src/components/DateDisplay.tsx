"use client";
import { useEffect, useRef } from "react";

export default function DateDisplay() {
  const dateRef = useRef<HTMLTimeElement>(null);
  useEffect(() => {
    if (!dateRef.current) return;

    dateRef.current.textContent = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <time ref={dateRef} className="text-[10px] text-[#6b726d] sm:text-[11px]" />
  );
}
