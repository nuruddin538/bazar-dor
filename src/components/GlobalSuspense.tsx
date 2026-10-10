"use client";

import { ReactNode, Suspense } from "react";

interface GlobalSuspenseProps {
  children: ReactNode;
}

export default function GlobalSuspense({ children }: GlobalSuspenseProps) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse rounded-lg bg-gray-100 p-6">
          লোড হচ্ছে...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
