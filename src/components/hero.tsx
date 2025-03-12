"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
      <div className="text-center container mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[90px] font-extrabold pb-3 text-black">
          Keuangan Masjid Al Kautsar <br /> Transparan & Akurat
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-xl mb-8 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto text-gray-700">
          Sistem keuangan modern untuk transparansi penuh dalam pemasukan dan
          pengeluaran Masjid Al Kautsar SMKN 2 Kota Bekasi.
        </p>
        {/* Button */}
        <div className="space-x-4 flex justify-center mb-8">
          <Link href="/dashboard">
            <Button size={"lg"} className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="link yutub">
            <Button size={"lg"} variant={"outline"} className="px-8">
              Demo
            </Button>
          </Link>
        </div>
        {/* Image Banner */}
        <div>
          <div>
            <Image
              src="/baner-masjid.jpg"
              alt="banner"
              width={1100}
              height={720}
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
