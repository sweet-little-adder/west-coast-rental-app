"use client";

import { ArrowDropDown } from "@mui/icons-material";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import { useTranslation } from "../../../lib/i18n";
import { getCurrentRegion } from "../../../lib/region";
import {
  CustomerSubmenu,
  RegionSubmenu,
  SolutionSubmenu,
  Submenu,
} from "./Menu";

const region = getCurrentRegion();

export default function Navbar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [submenuState, setSubmenuState] = useState({});

  const solutionRef = useRef();
  const customerRef = useRef();
  const regionRef = useRef();

  const openSubmenu = (id, e) => {
    setSubmenuState((state) => {
      const newState = { ...state };

      if (!newState.hasOwnProperty(id)) {
        newState[id] = {
          open: true,
        };

        return newState;
      }

      for (const key in newState) {
        if (key === id) {
          newState[key] = {
            open: true,
          };
          continue;
        }

        newState[key] = {
          open: false,
        };
      }
      return newState;
    });
  };

  const closeAllSubmenu = () => {
    setSubmenuState((state) => {
      const newState = { ...state };

      for (const id in newState) {
        newState[id].open = false;
      }

      return newState;
    });
  };

  const handleChangeLanguage = (lng) => {
    Cookies.set("locale", lng);
    window.location.reload(); // require to reload server components
  };

  return (
    <nav
      className={`${
        pathname === "/" ? "absolute" : "relative"
      } !z-50 h-[100px] w-full ${pathname !== "/" && "bg-green"}`}
    >
      {/* logo */}
      <div className="absolute flex h-full items-center pl-10 uppercase">
        <Link href="/">
          <Image
            src="/halo-logo-white.svg"
            alt="bolt"
            width={50}
            height={50}
            className="hidden lg:block"
          />
        </Link>
      </div>

      {/* main menu */}
      <div className="flex h-full w-full items-center justify-center uppercase">
        <div className="container flex items-center justify-center gap-32">
          <Link
            className=" text-base font-bold text-white hover:drop-shadow-[0_0px_3px_rgba(255,255,255,0.6)]"
            href="/aboutus"
          >
            {t("title.about_us")}
          </Link>

          <div>
            <button
              aria-owns="solution-services-submenu"
              aria-haspopup="true"
              className="text-base font-bold uppercase text-white hover:drop-shadow-[0_0px_3px_rgba(255,255,255,0.6)]"
              onMouseEnter={(e) => openSubmenu("solution", e)}
              onMouseLeave={() => closeAllSubmenu()}
              ref={solutionRef}
            >
              {t("navbar.solution_services")}
              <ArrowDropDown className="-translate-y-[2px] text-white" />
            </button>
            <Submenu
              id="solution-services-submenu"
              open={submenuState?.solution?.open}
              anchorEl={solutionRef.current}
              onClose={() => closeAllSubmenu()}
              onOpen={() => openSubmenu("solution")}
            >
              <SolutionSubmenu />
            </Submenu>
          </div>

          <Link
            className=" text-base font-bold text-white hover:drop-shadow-[0_0px_3px_rgba(255,255,255,0.6)]"
            href="/blog"
          >
            {t("navbar.corporate_news")}
          </Link>

          <div>
            <button
              aria-owns="customer-services-submenu"
              aria-haspopup="true"
              className="text-base font-bold uppercase text-white hover:drop-shadow-[0_0px_3px_rgba(255,255,255,0.6)]"
              onMouseEnter={(e) => openSubmenu("customer", e)}
              onMouseLeave={() => closeAllSubmenu()}
              ref={customerRef}
            >
              {t("navbar.customer_services")}
              <ArrowDropDown className="-translate-y-[2px] text-white" />
            </button>
            <Submenu
              id="customer-services-submenu"
              open={submenuState?.customer?.open}
              anchorEl={customerRef.current}
              onClose={() => closeAllSubmenu()}
              onOpen={() => openSubmenu("customer")}
            >
              <CustomerSubmenu />
            </Submenu>
          </div>
        </div>
      </div>

      {/* language menu */}
      <div className="absolute right-0 top-0 flex h-full pr-10 uppercase">
        <div className="mr-4 flex items-center">
          <button
            aria-owns="region-menu"
            aria-haspopup="true"
            className="flex items-center text-base font-bold text-white hover:drop-shadow-[0_0px_3px_rgba(255,255,255,0.6)]"
            onMouseEnter={(e) => openSubmenu("region", e)}
            onMouseLeave={() => closeAllSubmenu()}
            ref={regionRef}
          >
            <ReactCountryFlag className="!h-8 !w-8" countryCode={region} svg />
            <ArrowDropDown className="text-white hover:drop-shadow-[0_0px_3px_rgba(255,255,255,0.6)]" />
          </button>
          <Submenu
            id="region-menu"
            open={submenuState?.region?.open}
            anchorEl={regionRef.current}
            onClose={() => closeAllSubmenu()}
            onOpen={() => openSubmenu("region")}
          >
            <RegionSubmenu />
          </Submenu>
        </div>
        <div className="flex items-center text-white">
          <button
            onClick={() => handleChangeLanguage("en")}
            className={`${
              i18n.language === "en" ? "opacity-100" : "opacity-60"
            } hover:opacity-100`}
          >
            EN
          </button>
          ｜
          <button
            onClick={() => handleChangeLanguage("zh")}
            className={`${
              i18n.language === "zh" ? "opacity-100" : "opacity-60"
            }  hover:opacity-100`}
          >
            繁
          </button>
        </div>
      </div>
    </nav>
  );
}
