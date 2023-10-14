"use client";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React, { useState } from "react";

import { useCarparkContext } from "app/Context/store";

import CarparkSearch from "./CarparkSearch";
// import CarparkFilter from "./CarParkFilter";
import SwitchFilter from "./SwitchFilter";

export default function SearchPanel({ mapRef }) {
  const { setFilterToggles, allLocations, filteredLocations } =
    useCarparkContext();
  // const [carpark, setCarpark] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const locations = allLocations;

  function filter(carparks, arrowFunction) {
    return carparks.filter((carpark) => {
      return carpark.evses.find(arrowFunction) !== undefined;
    });
  }
  function filterCarparks(f) {
    switch (f) {
      case "show_all":
        setFilterToggles((toggles) => {
          const showAll = !toggles.show_all;

          return {
            ...toggles,
            show_all: showAll,
            available: !showAll,
          };
        });
        break;
      case "available":
        setFilterToggles((toggles) => {
          const available = !toggles.available;

          return {
            ...toggles,
            available,
            show_all: !available,
          };
        });
        break;
      case "ac":
        setFilterToggles((toggles) => {
          const ac = !toggles.ac;

          if (!ac && !toggles.dc) {
            return {
              ...toggles,
              dc: true,
              ac,
            };
          }

          return {
            ...toggles,
            ac,
          };
        });
        break;
      case "dc":
        setFilterToggles((toggles) => {
          const dc = !toggles.dc;

          if (!dc && !toggles.ac) {
            return {
              ...toggles,
              ac: true,
              dc,
            };
          }

          return {
            ...toggles,
            dc,
          };
        });
        break;
    }
  }

  return (
    <div className="absolute top-6 left-6 !z-20 w-3/4 w-full space-y-9 md:w-[380px] ">
      <CarparkSearch mapRef={mapRef} />

      <button
        onClick={() => setOpenFilter(true)}
        className="rounded-full bg-white p-4 drop-shadow-md md:!hidden"
        style={{ display: openFilter ? "none" : "block" }}
      >
        <FilterAltIcon className="!text-6xl !text-green" />
      </button>
      <SwitchFilter
        onToggle={filterCarparks}
        filter={filter}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
      />
    </div>
  );
}
