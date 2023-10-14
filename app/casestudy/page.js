"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center text-4xl font-bold text-green">
      <div className="text-center ">
        <div className="text-[36px] font-semibold text-black opacity-90">
          Success Cases
        </div>
        <Image
          src="/casestudy/showcase.svg"
          alt="app banner"
          width={3180}
          height={1000}
          className="mx-auto mt-12  w-full"
        />
      </div>
    </div>
  );
}
