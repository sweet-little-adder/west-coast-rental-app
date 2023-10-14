"use client";

import { useTranslation } from "@/lib/i18n";
import { usePathname } from "next/navigation";

const MobileMenu = ({ clickMenu, handleChangeLanguage }) => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="mt-20/ z-50 mx-auto  flex w-full flex-wrap justify-center justify-around bg-green pb-28">
      <div className="-translate-x-9/ absolute right-12 -translate-y-9 p-9 text-left text-4xl font-medium text-white">
        <button
          onClick={() => handleChangeLanguage("en")}
          className="opacity-60 hover:opacity-100"
        >
          EN{" "}
        </button>
        ｜
        <button
          onClick={() => handleChangeLanguage("zh")}
          className="opacity-60 hover:opacity-100"
        >
          繁
        </button>
      </div>
      <div className="mt-20 w-fit space-y-9 whitespace-nowrap	">
        <div className="text-3xl font-bold lg:text-sm 	">
          {t("navbar.solution_services")}
        </div>
        <div className="text-base font-[400] lg:text-xs">
          {t("title.for_enterprise")}
        </div>
        <div className="ml-9 space-y-6 text-3xl font-medium lg:text-base">
          <button onClick={() => clickMenu("/aboutus")}>
            {t("title.about_us")}
          </button>
          <br />
          <button onClick={() => clickMenu("/emsp")}>EMSP</button>
          <br />
          <button onClick={() => clickMenu("/cpo")}>CPO</button>
        </div>
        <div className="text-base font-[400] lg:text-xs">
          {t("title.for_residential")}
        </div>

        <button
          onClick={() => clickMenu("/ehc")}
          className="ml-9 flex items-center text-3xl font-medium"
        >
          EHC
        </button>

        <div className="space-y-9">
          <div className="text-base font-[400] lg:text-xs">
            {t("title.for_ev_driver")}
          </div>
          <div className="ml-9 space-y-9 text-3xl font-medium">
            <button onClick={() => clickMenu("/faq")}>
              {t("title.charging_faq")}
            </button>
            <br />
            <button onClick={() => clickMenu("/halo-app")}>
              {t("title.mobile_app")}
            </button>
            <br />
            <button onClick={() => clickMenu("/locations")}>
              {t("title.charger_map")}
            </button>
          </div>
        </div>
        <div className="space-y-9">
          <div className="text-base font-[400] lg:text-xs">
            {t("title.for_developer")}
          </div>
          <button
            onClick={() => {
              if (pathname === "/halo-api") {
                document.location.reload();
              } else {
                clickMenu("/halo-api");
              }
            }}
            className="ml-9 flex items-center justify-start text-3xl font-medium"
          >
            {t("title.halo_api")}
          </button>
        </div>
      </div>

      <div className="w-fit space-y-9">
        <div className=" mt-20 mb-20 space-y-9 text-3xl lg:text-base">
          <div className="font-bold lg:text-sm ">
            {t("navbar.corporate_news")}
          </div>
          <br />
          <div className="ml-9 space-y-9 text-3xl font-medium">
            {/* <button
              onClick={() => {
                clickMenu("/casestudy");
              }}
            >
              Case Study
            </button>
            <br /> */}
            <button
              onClick={() => {
                clickMenu("/blog");
              }}
            >
              {t("title.blog")}
            </button>
          </div>
        </div>
        <div className="space-y-9 whitespace-nowrap text-3xl lg:text-xl lg:text-base	">
          <div className="font-bold lg:text-sm">
            {t("navbar.customer_services")}
          </div>
          <br />
          <div className="ml-9 space-y-9 text-3xl font-medium">
            <button
              onClick={() => {
                clickMenu("/contact");
              }}
            >
              {t("title.contact_us")}
            </button>
            <br />
            <button onClick={() => clickMenu("/halo-bot")}>
              {t("title.halo_bot")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
