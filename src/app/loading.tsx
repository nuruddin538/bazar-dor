import ProductDetailSkeleton from "@/components/ProductSkeleton";

export default function HomeLoading() {
  return (
    <main className="container mx-auto max-w-[1240px] space-y-8 px-4 py-6">
      <div className="animate-pulse rounded-2xl border border-[#dfe7df] bg-[#fbfbfb] p-8">
        <div className="h-7 w-2/3 rounded bg-[#e8eee8]"></div>
        <div className="mt-3 h-4 w-1/2 rounded bg-[#e8eee8]"></div>
        <div className="mt-5 h-9 w-28 rounded-lg bg-[#e8eee8]"></div>
      </div>
      <section>
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-[#e8eee8]"></div>
        <ProductDetailSkeleton />
      </section>
    </main>
  );
}
