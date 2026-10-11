export default function ProductDetailSkeleton() {
  return (
    <main className="container mx-auto animate-pulse px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-48 rounded bg-gray-200"></div>
      {/* Product summary skeleton */}
      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6">
        <div className="h-7 w-48 rounded bg-gray-200"></div>
        <div className="mt-4 h-4 w-32 rounded bg-gray-100"></div>
        <div className="mt-6 h-10 w-40 rounded bg-gray-200"></div>
      </section>
      {/* Price cards skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-32 rounded-xl bg-gray-100"></div>
        ))}
      </div>
      {/* Market table skeleton */}
      <div className="h-56 rounded-xl bg-gray-100"></div>
    </main>
  );
}
