"use client";

import { useTranslation } from "@/lib/i18n";
import {
  Cloud,
  ContactSupport,
  Dock,
  EvStation,
  Home,
  LocalShipping,
  Map,
  PhoneAndroid,
  Quiz,
  SupportAgent,
} from "@mui/icons-material";
import { Popover } from "@mui/material";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

import { regions } from "../../../lib/region";

export function SubmenuItem({ icon, label, desc, href }) {
  return (
    <Link className="flex gap-2 text-base" href={href ?? ""}>
      <div className="text-yellow">{icon}</div>
      <div className="text-grey">
        {label}
        <p className="text-xs opacity-60">{desc}</p>
      </div>
    </Link>
  );
}

export function SolutionSubmenu() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-x-16 gap-y-9 rounded-xl p-6 normal-case">
      <div className="flex w-[240px] flex-col gap-6">
        <span className="text-lg font-bold uppercase">
          {t("title.for_enterprise")}
        </span>
        <SubmenuItem
          icon={<EvStation />}
          label="EMSP"
          desc="Offer EV charging service to EV drivers"
          href="/emsp"
        />
        <SubmenuItem
          icon={<Dock />}
          label="CPO"
          desc="Provide smart charging features"
          href="/cpo"
        />
        <SubmenuItem
          icon={<LocalShipping />}
          label={t("title.fleet_charging")}
          desc="Operate your electric fleet with confidence"
          href="/fleet-charging"
        />
      </div>

      <div className="flex w-[240px] flex-col gap-6">
        <span className="text-lg font-bold uppercase">
          {t("title.for_ev_driver")}
        </span>
        <SubmenuItem
          icon={<Map />}
          label={t("title.charger_map")}
          desc="Find our chargers"
          href="/locations"
        />
        <SubmenuItem
          icon={<PhoneAndroid />}
          label={t("title.mobile_app")}
          desc="Book our chargers with a few touches"
          href="/sol-app"
        />
        <SubmenuItem
          icon={<Quiz />}
          label={t("title.charging_faq")}
          desc="Offer EV charging service to EV drivers"
          href="/faq"
        />
      </div>

      <div className="flex w-[240px] flex-col gap-6">
        <span className="text-lg font-bold uppercase">
          {t("title.for_residential")}
        </span>
        <SubmenuItem
          icon={<Home />}
          label="EHC"
          desc="Charging solution for multi-owner car park"
          href="/ehc"
        />
      </div>

      <div className="flex w-[240px] flex-col gap-6">
        <span className="text-lg font-bold uppercase">
          {t("title.for_developer")}
        </span>
        <SubmenuItem
          icon={<Cloud />}
          label={t("title.sol_api")}
          desc="Access chargers data"
          href="/sol-api"
        />
      </div>
    </div>
  );
}

export function CustomerSubmenu() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5 rounded-lg p-6 normal-case">
      <SubmenuItem
        icon={<SupportAgent />}
        label={t("title.contact_us")}
        desc=""
        href="/contact"
      />
      <SubmenuItem
        icon={<ContactSupport />}
        label={t("title.sol_bot")}
        desc=""
        href="/sol-bot"
      />
    </div>
  );
}

export function RegionSubmenu() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5 rounded-lg p-6">
      {Object.keys(regions).map((code) => {
        return (
          <SubmenuItem
            key={code.toUpperCase()}
            icon={
              <ReactCountryFlag
                className="!h-6 !w-6"
                countryCode={code.toUpperCase()}
                svg
              />
            }
            label={t(`navbar.${code}`)}
            desc=""
            href={regions[code]?.origin ?? ""}
          />
        );
      })}
    </div>
  );
}

export function Submenu({ id, open, anchorEl, onClose, onOpen, children }) {
  return (
    <Popover
      id={id}
      open={open ?? false}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 40,
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={onClose}
      onClick={onClose}
      sx={{ pointerEvents: "none" }}
      PaperProps={{
        sx: { pointerEvents: "all" },
        onMouseLeave: onClose,
        onMouseEnter: onOpen,
      }}
      // slotProps={{ backdrop: { sx: { pointerEvents: 'none' }} }}
      disableRestoreFocus
      disablePortal
      hideBackdrop
    >
      {children}
    </Popover>
  );
}
