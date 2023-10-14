"use client";

import CloseIcon from "@mui/icons-material/Close";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import React from "react";

export default function FilterPanelMobile({ location, i, setOpenCarpark }) {
  return (
    <div className="absolute top-0 right-0 m-9 h-screen w-1/3 bg-white text-center text-green drop-shadow-md">
      <CloseIcon
        className="absolute right-0 top-0 m-3 text-4xl text-white"
        onClick={() => setOpenCarpark(false)}
      />
      <div className="h-1/4 w-full overflow-y-clip overflow-x-visible bg-[#c9c9c9]">
        <Image
          src={location.images[0].url}
          alt="location img"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <div className="flex items-center justify-center">
        <LocalParkingIcon className="absolute left-12 h-9 w-9 rounded-xl bg-green p-[5px] !text-sm text-white" />
        <h1 className="p-5 text-center text-3xl">AWS </h1>
      </div>
      <div className="flex items-center justify-center space-x-1 text-sm text-[#c9c9c9]">
        <LocationOnIcon className="h-9 w-9  p-[5px] !text-xs text-[#c9c9c9]" />
        <p>{location.address}</p>
      </div>
      <div className="px-12 text-left">{JSON.stringify(location.plans)}</div>
    </div>
  );
}
