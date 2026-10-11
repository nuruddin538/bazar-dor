"use client";

import { authClient } from "@/app/lib/auth-client";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function NavbarAuth() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const displayName = user?.name || user?.email.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      setIsOpen(false);
      router.replace("/signin");
    } catch (error) {
      console.log("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };
  if (isPending) {
    return (
      <div className="h-9 w-28 animate-pulse rounded-lg bg-[#edf2ed]"></div>
    );
  }
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-md px-3 py-2 text-[11px] font-bold text-[#222] transition hover:bg-[#e9eee9] sm:text-xs"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-[#008f4c] px-3 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#007d42] sm:px-4 sm:text-xs"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="প্রোফাইল মেনু"
        className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-[#edf2ed]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#edf2ed]">
          {initial}
        </span>
        <span className="hidden max-w-[130px] truncate text-[11px] font-bold text-[#354039] sm:inline">
          {displayName}
        </span>
        <ChevronDown
          size={12}
          className={`text-[#7b857d] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-[230px] max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-[#dfe7df] bg-[#fbfbfb] p-2 shadow-lg">
            <div className="border-b border-[#edf1ed] px-2 py-2.5">
              <p className="truncate text-[11px] font-medium text-[#89918a]">
                {displayName}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-[#a0a7a0]">
                {user.email}
              </p>
            </div>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] font-semibold text-[#303832] transition hover:bg-[#edf2ed]"
            >
              <UserRound size={14} />
              আমার প্রোফাইল
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[11px] font-semibold text-[#e53935] transition hover:bg-[#fff0ef] disabled:opacity-60"
            >
              <LogOut size={14} />
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
