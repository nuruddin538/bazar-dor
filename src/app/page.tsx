import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  return (
    <div>
      <div className="mt-6">
        <Hero />
      </div>
      <div className="py-6">
        <ProductSections products={products} />
      </div>
    </div>
  );
}
