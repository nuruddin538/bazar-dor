import { getCategories } from "@/lib/api";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import CategoryNav from "./CategoryNav";
import DateDisplay from "./DateDisplay";
import { Suspense } from "react";

export default async function Navbar() {
  const categories = await getCategories();
  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe7df] bg-[#f8faf8]">
      {/* Top Navbar */}
      <div className="mx-auto max-w-[1240px] container px-4">
        <div className="flex min-h-[70px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-[#008f4c] text-lg shadow-sm">
              <TiShoppingCart className="text-gray-300 text-2xl" />
            </div>
            {/* Logo Text */}
            <div className="leading-none">
              <h1 className="text-[17px] font-black tracking-tight text-[#171c18] sm:text-[19px]">
                বাজার দর
              </h1>
              <DateDisplay />
            </div>
          </Link>
          {/* AUTH */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-md px-3 py-2 text-[11px] font-bold text-[#222] transition hover:bg-[#e9eee9] sm:text-xs"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-[#008f4c] px-3.5 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#007d42] sm:px-4 sm:text-xs"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
        {/* CATEGORY NAVIGATION */}
        <Suspense
          fallback={
            <div className="h-10 animate-pulse border-t border-[#edf1ed]" />
          }
        >
          <CategoryNav categories={categories} />
        </Suspense>
      </div>
    </header>
  );
}
