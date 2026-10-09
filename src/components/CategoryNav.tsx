"use client";

import { Category } from "@/types/product";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();
  return (
    <nav className="border-t border-[#edf1ed]">
      <div className="scrollbar-hide flex gap-1 overflow-x-auto py-1.5">
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-bold transition sm:text-[12px] ${
            pathname === "/"
              ? "bg-[#e5f3e9] text-[#008f4c]"
              : "text-[#3f4541] hover:bg-[#edf1ed]"
          }`}
        >
          <span>
            <FaHome />
          </span>
          <span>সব</span>
        </Link>
        {/* API CATEGORIES */}
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-bold transition sm:text-[12px] ${
                isActive
                  ? "bg-[#e5f3e9] text-[#008f4c]"
                  : "text-[#3f4541] hover:bg-[#edf1ed]"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
