import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f1f6f1] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5f3e9]">
          <TiShoppingCart className="text-4xl text-[#008f4c]" />
        </div>
        <p className="mt-5 text-sm font-bold text-[#008f4c]">
          404 — পেজটি পাওয়া যায়নি
        </p>
        <h1 className="mt-2 text-2xl font-black text-[#171c18]">
          {" "}
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#7b857d]">
          আপনি যে পেজ বা পণ্যটি খুঁজছেন, সেটি হয়তো মুছে ফেলা হয়েছে অথবা
          ঠিকানাটি ভুল।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#008f4c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#007d42]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
