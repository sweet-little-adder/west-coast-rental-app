"use client";

import { useTranslation } from "@/lib/i18n";
import { Circle as CircleIcon } from "@mui/icons-material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SpeedIcon from "@mui/icons-material/Speed";
import { format } from "date-fns";
import Image from "next/image";
import React, { Fragment, useState } from "react";

export default function CarparkPanel({ location, onClose }) {
  const [showChargers, setShowChargers] = useState(false);
  const { t } = useTranslation();

  function renderMessage(status) {
    switch (status) {
      case "AVAILABLE":
        return t("map.status.available");
      case "CHARGING":
        return t("map.status.charging");
      default:
        return t("map.status.unavailable");
    }
  }

  return (
    <>
      <div className="absolute !z-40 m-12 mx-auto mt-80 max-h-[calc(100%-150px)] w-3/4 overflow-x-clip overflow-y-scroll rounded-xl bg-white text-center text-green drop-shadow-md md:top-6 md:right-6 md:mx-0 md:mt-0 md:w-[500px]">
        <CloseIcon
          className="absolute right-3 top-0 !z-50 m-4 cursor-pointer !text-4xl  text-[#eeeeee] opacity-50 transition-all hover:opacity-100"
          onClick={onClose}
        />
        <div className="z-40 max-h-[280px] w-full overflow-y-clip rounded-t-md bg-[#c9c9c9]">
          <Image
            src={location?.images[0].url}
            alt="location image"
            width={400}
            height={300}
            className="mx-auto w-full  overflow-clip"
          />
        </div>
        <div className="sticky top-0 flex flex-col items-center justify-center bg-white py-5">
          <h1 className="p-3 text-center text-3xl">{location?.name}</h1>
          <div className="flex items-center justify-center space-x-1 text-sm text-[#c9c9c9]">
            <div className="!text-xs">
              <LocationOnIcon className="text-[#c9c9c9]" />
            </div>
            <p>{location?.address}</p>
          </div>
        </div>
        <div className="mb-9 h-60 overflow-y-scroll px-5 text-left text-base text-black md:h-full">
          <div className="w-full flex-col pb-5 md:min-h-full">
            {location?.plans.map((plans) => (
              <Fragment key={plans.id}>
                <div
                  className="flex w-full cursor-pointer justify-between rounded-md p-2 hover:bg-[#eeeeee]/60"
                  onClick={() =>
                    setShowChargers(showChargers !== plans.id ? plans.id : null)
                  }
                >
                  <div className="flex w-1/2 items-center space-x-2 text-xs">
                    <SpeedIcon />
                    <div className="font-900 text-base">{plans.name}</div>
                  </div>

                  <div className="flex w-1/4 items-center justify-end space-x-1 text-xs">
                    <div className="flex items-start space-x-1">
                      <AccessTimeFilledIcon className="!text-base text-[#cccccc]" />
                      {plans.available_end === "23:59:59" ? (
                        <div>7/24</div>
                      ) : (
                        <div className="text-right">
                          {t("map.from")}:&nbsp;
                          {format(
                            new Date(`1970-01-01T${plans.available_start}Z`),
                            "h:mm a"
                          )}
                          {/* &nbsp;~&nbsp; */}
                          <br />
                          {t("map.to")}:&nbsp;
                          {format(
                            new Date(`1970-01-01T${plans.available_end}Z`),
                            "h:mm a"
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="flex basis-20 items-center justify-end text-[9px] text-[#9e9e9e]">
                    <div className="flex items-center text-xl font-normal text-green">
                      ${plans.price}
                      <div className="ml-1 translate-y-2 text-xs font-light text-[#cccccc]"></div>
                    </div>
                    {showChargers !== plans.id ? (
                      <ArrowDropDownIcon />
                    ) : (
                      <ArrowDropUpIcon />
                    )}
                  </button>
                </div>

                <div
                  className="animate-down grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 gap-y-2 py-4 px-10 font-bold"
                  style={{
                    display: showChargers === plans.id ? "grid" : "none",
                  }}
                >
                  {plans.pids.reduce((arr, pid) => {
                    const ev = location.evses.find((c) => pid === c.uid);
                    if (ev) {
                      arr.push(
                        <Fragment key={ev.uid}>
                          <div className="text-xs font-light">
                            {ev.connectors[0].power_type.includes("DC") ? (
                              <Image
                                src="/map/DC.svg"
                                className="w-6"
                                width={100}
                                height={100}
                                alt="DC"
                              />
                            ) : (
                              <Image
                                src="/map/AC.svg"
                                className="w-6"
                                width={100}
                                height={100}
                                alt="AC"
                              />
                            )}
                          </div>
                          <div className="text-xs">{ev.uid}</div>
                          <div className="text-sm">
                            {ev.connectors[0].power_type}
                          </div>
                          <div className="flex items-center text-right text-xs font-light">
                            <div
                              className={`${
                                ev.status === "AVAILABLE"
                                  ? "text-[green]"
                                  : ev.status === "CHARGING"
                                  ? "text-[orange]"
                                  : "text-[red]"
                              } mr-1`}
                            >
                              <CircleIcon className="!w-[12px]" />
                            </div>
                            {renderMessage(ev.status)}
                          </div>
                        </Fragment>
                      );
                    }
                    return arr;
                  }, [])}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
