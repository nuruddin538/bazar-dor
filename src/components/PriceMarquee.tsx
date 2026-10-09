import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceMarquee = async () => {
  const products: Product[] = await getProducts();

  return (
    <div className="w-full border-y border-[#e1e8e2] py-3 bg-white">
      <MarqueeText
        direction="right"
        duration={20}
        playOnlyInView={false}
        pauseOnHover={false}
        className="price-marquee"
      >
        {products.map((product) => {
          const change = product.change?.pct ?? 0;
          const direction = product.change?.dir;

          return (
            <span key={product.id} className="inline-flex items-center">
              {/* Product Icon */}
              <span className="mr-1.5 text-[14px]">
                {product.image || product.categoryIcon}
              </span>
              {/* Product Name */}
              <span className="font-normal text-[12px] text-[#464746]">
                {product.nameBn}
              </span>
              {/* Price */}
              <span className="ml-1.5 text-[#666d68]">
                {formatBanglaNumber(product.today)} টাকা/{" "}
                {getUnit(product.unit)}
              </span>
              {/* Change */}
              <span
                className={`ml-1.5 font-bold ${
                  direction === "up"
                    ? "text-[#e54b3d]"
                    : direction === "down"
                    ? "text-[#159447]"
                    : "text-[#858b87]"
                }`}
              >
                {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}
                {formatBanglaNumber(Math.abs(change))}%
              </span>
              {/* Separator */}
              <span className="mx-5 text-[#c7cec9]">•</span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};
export default PriceMarquee;

// Helpers
function formatBanglaNumber(value: number) {
  return new Intl.NumberFormat("bn-BD").format(value);
}
function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[unit] || unit;
}
