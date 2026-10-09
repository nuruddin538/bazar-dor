import { getProduct } from "@/lib/api";
import { Product } from "@/types/product";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Convert English digits to Bengali digits
const toBn = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[Number(digit)])
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format percentage
const formatPct = (pct: number): string => {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
};
// Get Bangali unit label
const getUnitLabel = (unit: string): string => {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    packet: "প্যাকেট",
  };
  return units[unit.toLowerCase()] || unit;
};
// Calculate average price
const getAveragePrice = (product: Product): number => {
  const markets = product.markets || [];

  if (markets.length === 0) return 0;
  const total = markets.reduce(
    (sum, market) => sum + (market.min + market.max) / 2,
    0
  );
  return Math.round(total / markets.length);
};
// Loading UI
function ProductDetailSkeleton() {
  return (
    <div className="mx-auto container animate-pulse px-4 py-8">
      <div className="mb-6 h-4 w-48 rounded bg-gray-200">
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-32 rounded bg-gray-100" />
          <div className="mt-6 h-10 w-40 rounded bg-gray-200" />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-32 rounded-xl bg-gray-100" />
          ))}
        </div>
        <div className="h-56 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
// Async content: Params and product data are handle here
async function ProductDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug || slug === "undefined") {
    notFound();
  }
  const product = await getProduct(slug);
  if (!product) {
    notFound();
  }
  const { dir, pct } = product.change;
  const isUp = dir === "up";
  const isDown = dir === "down";

  const badgeColor = isUp
    ? "bg-green-50 text-green-700"
    : isDown
    ? "bg-red-50 text-red-700"
    : "bg-gray-100 text-gray-600";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";
  const markets = product.markets || [];

  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((market) => market.min)) : 0;
  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((market) => market.max)) : 0;

  const avgPrice = getAveragePrice(product);

  const sortedMarkets = [...markets].sort((a, b) => a.min - b.min);
  const displayIcon = product.image || product.categoryIcon || "📦";

  return (
    <main className="mx-auto container px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-green-600">
          হোম
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="transition hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-800">{product.nameBn}</span>
      </nav>
      {/* Product summary */}
      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl">
              {product.categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                প্রতি {getUnitLabel(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-2 text-sm font-medium">
                <span
                  className={
                    isUp
                      ? "text-green-600"
                      : isDown
                      ? "text-red-600"
                      : "text-gray-500"
                  }
                >
                  গতকালের তুলনায় আজ দাম{" "}
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                </span>
                {formatPct(pct)}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 sm:min-w-44">
            <p className="mb-1 text-sm text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900">
              {toBn(product.today)}
              <span className="ml-2 text-sm font-medium text-gray-500">
                টাকা
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি{getUnitLabel(product.unit)}
            </p>
            <span
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-1 py-1 text-xs font-semibold ${badgeColor}`}
            >
              {arrow} {formatPct(pct)}
            </span>
          </div>
        </div>
      </section>
      {/* Price summary */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <PriceCard
            title="সর্বনিম্ন দাম"
            price={minPrice}
            description="সবচেয়ে কম দামের বাজার"
            color="text-green-600"
          />
          <PriceCard
            title="সর্বোচ্চ দাম"
            price={maxPrice}
            description="সবচেয়ে বেশি দামের বাজার"
            color="text-red-600"
          />
          <PriceCard
            title="গড় দাম"
            price={avgPrice}
            description={`প্রতি ${getUnitLabel(product.unit)}-এর হিসাবে`}
            color="text-gray-900"
          />
        </div>
      </section>
      {/* Market Prices */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {sortedMarkets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-4 font-semibold sm:px-6">বাজার</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">বিভাগ</th>
                    <th className="px-4 py-4 text-right font-semibold sm:px-6">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold sm:px-6">
                      সর্বোচ্চ
                    </th>
                    <th className="px-4 py-4 text-right font-semibold sm:px-6">
                      গড়
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedMarkets.map((market) => {
                    const marketAvg = Math.round((market.min + market.max) / 2);
                    return (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800 sm:px-6">
                          {market.market}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-gray-500 sm:px-6">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-gray-800 sm:px-6">
                          {toBn(market.min)}টাকা
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700 sm:px-6">
                          {toBn(market.max)}টাকা
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-gray-900 sm:px-6">
                          {toBn(marketAvg)}টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-sm text-gray-500">
              এই পণ্যের জন্য এখনো বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

// Reusable price card
function PriceCard({
  title,
  price,
  description,
  color,
}: {
  title: string;
  price: number;
  description: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-2 text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {toBn(price)}
        <span className="ml-2 text-sm font-medium text-gray-500">টাকা</span>
      </p>
      <p className="mt-2 text-xs text-gray-400">{description}</p>
    </div>
  );
}

// Page component with Suspense boundary
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
