"use client";

import React, { useContext, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

import { CarparkContext } from "../../Context/store";
import Places from "./Places";

const CarparkFilter = ({ locations, setCarpark, mapRef }) => {
  const { setOpenCarpark, setSelectedCarpark } = useContext(CarparkContext);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setCarpark({ lat, lng });
    setSuggestions(locations);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(locations);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <Places
      value={value}
      mapRef={mapRef}
      locations={locations}
      setValue={setValue}
      setCarpark={setCarpark}
      setOpenCarpark={setOpenCarpark}
      setSelectedCarpark={setSelectedCarpark}
      onChange={setValue}
      onSelect={handleSelect}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
    />
  );
};

export default CarparkFilter;
