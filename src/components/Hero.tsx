import Link from "next/link";
import DateDisplay from "./DateDisplay";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex min-h-[230px] py-14 flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl border border-[#e1eae3] bg-[#fbfdfb] px-5 py-6 sm:flex-row sm:px-8 md:px-10">
      {/* Left Content */}
      <div className="z-10 w-full sm:w-[65%]">
        <span className="mb-3 inline-block rounded-full bg-[#e5f5eb] px-3 py-1 text-xs font-semibold text-[#16864b]">
          <DateDisplay />
        </span>
        <h1 className="mb-3 text-2xl leading-tight font-extrabold tracking-tight text-[#17231b] sm:text-3xl md:text-4xl">
          আজকের বাজারের দাম এক
          <br className="hidden sm:block" /> নজরে
        </h1>
        <p className="mb-5 max-w-xl text-xl leading-7 text-[#68766c]">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারের সর্বশেষ দর,
          দাম বৃদ্ধি ও হ্রাসের আপডেট সবকিছু এক জায়গায়।
        </p>
        <Link
          href="#সব-পণ্য"
          className="btn min-h-0 h-auto border-0 bg-[#078746] px-5 py-2.5 text-sm font-bold text-white shadow-none hover:bg-[#066c38]"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
      {/* Right Illustration */}
      <div className="flex w-full items-center justify-center sm:w-[35%]">
        <Image
          src="https://i.ibb.co.com/KxNyt473/bazar-hero.png"
          alt="banner"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default Hero;
