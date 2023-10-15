"use client";

import { useTranslation } from "@/lib/i18n";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import Image from "next/image";
import Link from "next/link";

import Title from "app/components/Title";

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <div className="text-center text-4xl font-bold text-green ">
      {/* <div className="mx-auto mb-12 flex -translate-x-2 items-center justify-center text-3xl font-black tracking-wide text-black/90">
        <SmartphoneIcon className="mr-2 !text-4xl !text-yellow" />
        <h>{t("title.sol_app")}</h>
      </div> */}
      <Title title="sol_app" />
      <Link
        className="mx-auto mt-6 flex w-[200px] justify-center rounded-lg bg-blue p-3 text-center text-xl font-normal text-white drop-shadow-[0_0_5px_rgba(26,70,143,0.5)]"
        href={"https://epluscharging.com/login"}
        target="_blank"
      >
        {t("button.log_in")}
      </Link>
      <Image
        src="/sol-app/instructions.svg"
        alt="iOs"
        width={3180}
        height={1000}
        className="ml-[-25px] mt-20"
      />

      <iframe
        className="h-[800px] w-screen"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/Sj_11YivmBo`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullscreen
      ></iframe>
      <div className="flex h-full w-full flex-wrap ">
        <div className="sol-app-banner-bg-L flex aspect-square w-full flex-col items-center justify-center space-y-12 lg:w-1/3 lg:space-y-6 ">
          <Link href="https://apps.apple.com/app/id1587834540" target="blank">
            <Image
              src="/sol-app/iOs_app.svg"
              alt="iOs"
              width={3180}
              height={1000}
              className="lg:mt-46 mx-auto mb-1 mt-80 w-[250px] cursor-pointer "
            />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.epluscharging.mobileapp"
            target="blank"
          >
            <Image
              src="/sol-app/android_app.svg"
              alt="iOs"
              width={3180}
              height={1000}
              className="mx-auto  mb-12 w-[250px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="sol-app-banner-bg-R h-[800px] w-full lg:h-auto lg:w-2/3"></div>
      </div>
    </div>
  );
}
