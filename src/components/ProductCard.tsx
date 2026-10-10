import { Product } from "@/types/product";
import Link from "next/link";

// Helper: Convert English digits of Bangali digits
const toBn = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => bnDigits[parseInt(d)])
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatPct = (pct: number): string => {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
};

const getUnitLabel = (unit: string) => {
  const map: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    packet: "প্যাকেট",
  };
  return map[unit.toLowerCase()] || unit;
};
export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;
  const isUp = dir === "up";
  const isDown = dir === "down";

  const badgeColor = isUp
    ? "text-green-600 bg-green-50"
    : isDown
    ? "text-red-600 bg-red-50"
    : "text-gray-500 bg-gray-100";

  const arrow = isUp ? "▲" : isDown ? "▼" : "_";
  const displayIcon = product.categoryIcon || product.image || "📦";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-green-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
          {displayIcon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-gray-800 group-hover:text-gray-600">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            প্রতি {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {toBn(product.today)} টাকা
          </p>
        </div>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badgeColor}`}
        >
          <span>{arrow}</span>
          <span>{formatPct(pct)}</span>
        </div>
      </div>
    </Link>
  );
}
