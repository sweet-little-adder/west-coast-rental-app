"use client";

import { useTranslation } from "@/lib/i18n";
import { Email, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "./Container";

const Footer = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <footer
      className={`${pathname === "/locations" && "hidden"
        } w-full overflow-y-hidden bg-green pt-20 text-[24px] !text-white`}
    >
      <Container className="flex flex-wrap items-start justify-center">
        {/* left block */}
        <div className="flex items-start pr-12 lg:w-[550px] lg:gap-6">
          <Image
            src="/sol-logo-white.svg"
            alt="bolt"
            width={80}
            height={80}
            className="mb-9 hidden lg:block"
          />
          <div className="hidden text-sm lg:block">
            <p className="text-base leading-loose">
              With sol, we aim to provide&nbsp;
              <b>Simple, Smart and Sustainable</b>&nbsp;SaaS solutions to enable
              our partners to make EV charging available to all EV drivers at
              home, at work and on the road.
            </p>
            <div className="mt-5 ml-[-6px] flex gap-4">
              <a
                href="https://www.linkedin.com/company/sol-energy-limited/"
                target="blank"
              >
                <LinkedIn sx={{ fontSize: "32px" }} />
              </a>
              <a
                href="https://www.instagram.com/sol_energy_official/"
                target="blank"
              >
                <Instagram sx={{ fontSize: "32px" }} />
              </a>
              <a
                href="https://www.facebook.com/solEnergyLimited/"
                target="blank"
              >
                <Facebook sx={{ fontSize: "32px" }} />
              </a>
              <a href="/contact" target="blank">
                <Email sx={{ fontSize: "32px" }} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 grid-rows-[2_auto] gap-x-16 gap-y-9">
          <div className="flex flex-col gap-4 text-sm">
            <span className="mb-3 text-xl font-bold uppercase">
              {t("title.about_us")}
            </span>
            <Link className="" href="/aboutus">
              {t("title.about_us")}
            </Link>
            <Link className="" href="/blog">
              {t("title.blog")}
            </Link>
            <Link className="" href="/contact">
              {t("title.contact_us")}
            </Link>
            <Link className="" href="/sol-bot">
              {t("title.sol_bot")}
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <span className="mb-2 text-xl font-bold uppercase">
              {t("title.for_enterprise")}
            </span>
            <Link className="" href="/emsp">
              EMSP
            </Link>
            <Link className="" href="/cpo">
              CPO
            </Link>
            <Link className="" href="/fleet-charging">
              {t("title.fleet_charging")}
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <span className="mb-2 text-xl font-bold uppercase">
              {t("title.for_ev_driver")}
            </span>
            <Link className="" href="/locations">
              {t("title.charger_map")}
            </Link>
            <Link className="" href="/sol-app">
              {t("title.mobile_app")}
            </Link>
            <Link className="" href="/faq">
              {t("title.charging_faq")}
            </Link>
          </div>

          <div className="col-start-2 flex flex-col gap-4 text-sm">
            <span className="mb-2 text-xl font-bold uppercase">
              {t("title.for_residential")}
            </span>
            <Link className="" href="/ehc">
              EHC
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <span className="mb-2 text-xl font-bold uppercase">
              {t("title.for_developer")}
            </span>
            <Link className="mb-6" href="/sol-api">
              {t("title.sol_api")}
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 flex basis-11/12 border-t border-solid border-white pt-4 text-xs">
          <span className="basis-1/3">
            Copyright © {new Date().getFullYear()} sol Energy
          </span>

          <div className="flex basis-1/3 justify-center">
            <a href="/pdf/Privacy_Policy.pdf" target="_blank">
              {t("footer.privacy_policy")}
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/pdf/HS_Policy.pdf" target="_blank">
              {t("footer.hs_policy")}
            </a>
          </div>

          <div className="flex basis-1/3 justify-end gap-3">
            <Image
              src="/cert/lrqa.jpg"
              alt="LRQA"
              width={80}
              height={80}
              className="mb-9 hidden lg:block"
            />
            <Image
              src="/cert/oocp.png"
              alt="OOCP"
              width={80}
              height={80}
              className="mb-9 hidden lg:block"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
