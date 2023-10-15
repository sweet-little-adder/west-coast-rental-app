import { useTranslation } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const { t } = await useTranslation();

  return (
    <div
      className="!z-10 mx-auto space-y-20 text-center font-extralight  text-white"
      style={{ fontFamily: "Nunito Sans" }}
    >
      <div className="absolute top-0 h-[900px] w-full bg-gradient-to-b from-black"></div>

      <Image
        src="/photos/carpark.svg"
        alt="photo carpark"
        width={100}
        height={100}
        className="absolute top-0 z-10 h-[1500px] !w-full -translate-y-40 object-cover"
      />
      <div className="relative z-20 mx-auto h-full w-full">
        <div className="!z-50 mx-auto w-fit text-[90px]  font-extrabold uppercase tracking-widest tracking-wide text-white transition-all hover:cursor-default hover:text-white/90 hover:drop-shadow-[0_0_9px_rgba(80,255,174,1.5)]">
          Sol
        </div>
        <Image
          src="/dome5.svg"
          alt="dome"
          width={100}
          height={100}
          className="mx-auto w-4/5"
        />
        <div className="z-10 space-y-3 pb-80 text-4xl tracking-wide hover:cursor-default md:text-2xl">
          <p> Where</p>
          <div className="!z-10 mx-auto w-fit text-center text-5xl text-yellow transition-all hover:text-white md:text-4xl">
            Landlord {" "}
            <b className="text-4xl text-white md:text-2xl ">
              meet &nbsp;
            </b>
            Tenants
          </div>
          <p>Find your home</p>
          <p>in</p>
          <p>ONE APP</p>
          <br />
          <div className="translate-y-9/ relative">
            <Image
              src="/phone.svg"
              alt="iOS"
              width={316}
              height={316}
              className="absolute top-3/4 left-1/2 mx-auto flex min-w-[316px] max-w-[316px] shrink-0 translate-y-12 -translate-x-1/2 resize-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]"
            />

            <Link href="/locations">
              <button className="absolute !my-80 -translate-y-32 -translate-x-1/2 rounded-md p-3 text-3xl font-medium tracking-wide text-white drop-shadow-[0_0_5px_rgba(80,255,174,1.5)] transition-all hover:drop-shadow-[0_0_5px_rgba(255,199,9,1)]">
                {t("text.find")}
                <Image
                  src="/sol-logo-white.svg"
                  alt="sol-logo-white"
                  width={160}
                  height={160}
                  className="mx-auto"
                />
                {t("text.chargers")}

                <Image
                  src="/bolt.svg"
                  alt="bolt"
                  width={80}
                  height={77}
                  className="mx-auto mt-12"
                />
              </button>
            </Link>
          </div>
        </div>
        <br />
        <div className="mt-80 flex translate-y-20 flex-wrap justify-center">
          {["shell-recharge"].map((t) => (
            <Image
              src={`/partners/${t}.svg`}
              alt={`partners-${t}`}
              key={t}
              width={600}
              height={600}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
