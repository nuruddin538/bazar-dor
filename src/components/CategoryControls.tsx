"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CategoryControls({
  currentSort,
}: {
  currentSort: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        সাজান
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-1 focus:ring-green-500 cursor-pointer"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price_asc">দাম: কম থেকে বেশি</option>
        <option value="price_desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}
