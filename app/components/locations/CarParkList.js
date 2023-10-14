"use client";

import React from "react";

import { useCarparkContext } from "app/Context/store";

import Carpark from "./Carpark";

export default function CarparkList() {
  const { filteredLocations, selectedCarpark, setSelectedCarpark } =
    useCarparkContext();

  const handleSelectCarpark = (id) => {
    if (selectedCarpark === id) {
      setSelectedCarpark(null);
      return;
    }

    setSelectedCarpark(id);
  };

  return (
    <>
      {filteredLocations.map((location) => {
        return (
          <Carpark
            key={location.id}
            location={location}
            selected={location.id === selectedCarpark}
            onSelect={handleSelectCarpark}
            onClose={(id) => setSelectedCarpark(null)}
          />
        );
      })}
    </>
  );
}
