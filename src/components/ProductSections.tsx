import { Product } from "@/types/product";
import Link from "next/link";

// Helper: Convert English digits to Bangali digits
const toBn = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => bnDigits[parseInt(d)])
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// Helper: Format percentage to Bangali
const formatPct = (pct: number): string => {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
};
// Helper: Get unit label in Bangali
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
// sub compnent: Product card
const ProductCard = ({ product }: { product: Product }) => {
  const { dir, pct } = product.change;
  // Colors and arrows based on direction
  const isUp = dir === "up";
  const isDown = dir === "down";
  const isFlat = dir === "flat";

  const badgeColor = isUp
    ? "text-green-600 bg-green-50"
    : isDown
    ? "text-red-600 bg-red-50"
    : "text-gray-500 bg-gray-100";
  const arrow = isUp ? "▲" : isDown ? "▼" : "-";

  const displayIcon = product.image || product.categoryIcon || "📦";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-green-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-xl">
          {displayIcon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-800 group-hover:text-green-700">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">
            প্রতি {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
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
};

// Sub-component: Section Header
const SectionHeader = ({
  title,
  icon,
  color,
}: {
  title: string;
  icon: string;
  color: string;
}) => (
  <div className="mb-4 flex items-center gap-2">
    <span className={`text-lg ${color}`}>{icon}</span>
    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
  </div>
);

// Main Component
export default function ProductSections({ products }: { products: Product[] }) {
  // Section A: Top 6 Risers(Sorted by Highest positive change)
  const risers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  // Section B: Top 6 Fallers(Sorted by most negative change)
  const fallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  // Section C: All Products
  const allProducts = products;

  return (
    <div className="space-y-10 pb-10">
      {/* {/* Section A — “আজ দাম বেড়েছে ▲” */}
      {risers.length > 0 && (
        <section>
          <SectionHeader
            title="আজ দাম বেড়েছে"
            icon="▲"
            color="text-green-600"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      {/* Section B — “আজ দাম কমেছে ▼” */}
      {fallers.length > 0 && (
        <section>
          <SectionHeader title="আজ দাম কমেছে" icon="▼" color="text-red-600" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        </section>
      )}
      {/*  Section C — “সব পণ্য” */}
      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">সব পণ্য</h2>
            <p className="text-sm text-gray-500">
              মোট {toBn(allProducts.length)} টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
