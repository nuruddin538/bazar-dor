import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#dfe7df] bg-[#f8faf8]">
      <div className="container mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-2 px-4 py-5 text-[14px] text-[#7b857d] sm:flex-row sm:items-center sm:gap-4 sm:py-4">
        {/* Left */}
        <Link href="/" className="transition-colors hover:text-[#008f4c]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </Link>
        {/* Right */}
        <p className="leading-relaxed sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
