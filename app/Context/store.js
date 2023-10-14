"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export const CarparkContext = createContext();
export const useCarparkContext = () => useContext(CarparkContext);
export const CarparkProvider = ({ locations, children }) => {
  const [allLocations] = useState(locations);
  const [openCarpark, setOpenCarpark] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(false);
  const [filterToggles, setFilterToggles] = useState({
    show_all: true,
    available: false,
    dc: true,
    ac: true,
  });

  const filteredLocations = useMemo(() => {
    let result = allLocations.slice();

    if (filterToggles.available) {
      result = result.filter((loc) =>
        loc.evses.some((evse) => evse.status === "AVAILABLE")
      );
    }

    if (filterToggles.ac && !filterToggles.dc) {
      result = result.filter((loc) =>
        loc.evses.some((evse) =>
          evse.connectors.some((con) => con.power_type.includes("AC"))
        )
      );
    }

    if (filterToggles.dc && !filterToggles.ac) {
      result = result.filter((loc) =>
        loc.evses.some((evse) =>
          evse.connectors.some((con) => con.power_type.includes("DC"))
        )
      );
    }

    return result;
  }, [filterToggles, allLocations]);

  return (
    <CarparkContext.Provider
      value={{
        allLocations,
        openCarpark,
        setOpenCarpark,
        selectedCarpark,
        setSelectedCarpark,
        filterToggles,
        setFilterToggles,
        filteredLocations,
      }}
    >
      {children}
    </CarparkContext.Provider>
  );
};
