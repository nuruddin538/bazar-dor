import CategoryControls from "@/components/CategoryControls";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Helper: Convert English digits to Bengali digits
const toBn = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => bnDigits[parseInt(d)])
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

type CategoryPageContentProps = {
  slug: string;
  sortOption: string;
};

// Loading fallback
function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      <div className="mb-6 h-10 w-64 rounded-lg bg-gray-200" />
      <div className="mb-6 h-24 rounded-xl bg-gray-100" />
      <div className="mb-6 h-10 w-full rounded-lg bg-gray-100" />
      <div className="mb-6 h-10 w-full rounded-lg bg-gray-100">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-48 rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

// Fetch and render category data
async function CategoryPageContent({
  slug,
  sortOption,
}: CategoryPageContentProps) {
  const [allProducts, categories] = await Promise.all([
    getProducts(),
    getCategories().catch((error) => {
      console.warn("Could not fetch category metadata:", error);
      return [];
    }),
  ]);
  const category = categories.find((item) => item.slug === slug);
  const filteredProducts = allProducts.filter(
    (product) => product.category === slug
  );
  if (!category && filteredProducts.length === 0) {
    notFound();
  }
  // Sort a copy to avoid mutating the original arry
  const products = [...filteredProducts];
  if (sortOption === "price_asc") {
    products.sort((a, b) => a.today - b.today);
  } else if (sortOption === "price_desc") {
    products.sort((a, b) => b.today - a.today);
  }
  // Empty state
  if (products.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 text-6xl">🔍</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="mb-8 text-gray-500">
          দুঃখিত, এই মুহূর্তে {category?.nameBn || "এই"} ক্যাটাগরিতে কোনো পণ্যের
          তথ্য নেই।
        </p>
        <Link
          href="/"
          className="rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <section className="mb-8 flex flex-col justify-between gap-4 rounded-l-xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-50 text-3xl">
            {category?.icon || "📦"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category?.nameBn || slug}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {toBn(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>
      {/* Sorting and count */}
      <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-600">
          মোট {toBn(products.length)} টি পণ্য দেখানো হচ্ছে
        </p>
        <Suspense
          fallback={
            <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-100" />
          }
        >
          <CategoryControls currentSort="sortOption" />
        </Suspense>
      </section>
      {/* Product Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

// Default route component
export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryPageLoader params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// Resolve runtime route parameters inside Suspense
async function CategoryPageLoader({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, { sort: sortOption = "default" }] = await Promise.all([
    params,
    searchParams,
  ]);

  if (!slug || slug === "undefined") {
    notFound();
  }

  return <CategoryPageContent slug={slug} sortOption={sortOption} />;
}
