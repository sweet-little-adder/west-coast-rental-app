"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center text-4xl font-bold text-green  ">
      <div className="w-full space-y-12 text-center text-3xl">
        <Image
          src="/robot.svg"
          alt="robot"
          width={300}
          height={300}
          className="mx-auto w-12  text-yellow"
        />
        <div className="items-center text-4xl font-bold">How can I help?</div>
        <div className="mx-auto flex h-[200px] w-1/2 items-center justify-center rounded-xl bg-white text-center text-yellow drop-shadow-md">
          Oops! This bot is under construction.
        </div>
      </div>
    </div>
  );
}
