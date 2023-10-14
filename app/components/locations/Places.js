"use client";

import { useTranslation } from "@/lib/i18n";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Places({
  setCarpark,
  locations,
  setOpenCarpark,
  setSelectedCarpark,
  mapRef,
}) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  // console.log(`Places`, setOpenCarpark);
  const [searchedLocation, setSearchedLocation] = useState(locations);
  const { t } = useTranslation();

  const handleSelect = async (val) => {
    setValue(val, false);
    // clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setCarpark({ lat, lng });
  };

  // console.log(value, searchedLocation);

  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      setValue(e.target.value, false);
      setSearchedLocation(
        locations.filter((location) =>
          location.city.toLowerCase().includes(value.toLowerCase())
        )
      );
      const results = await getGeocode({ address: e.target.value });
      const { lat, lng } = await getLatLng(results[0]);
      setCarpark({ lat, lng });
    }
  }

  return (
    <>
      <div className="flex w-full items-center space-x-5">
        {/* <FilterListIcon className="md:!text-3xl !text-6xl cursor-pointer" /> */}
        <input
          value={value}
          onKeyPress={(e) => handleKeyPress(e)}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          className="!w-full text-left font-extralight text-green placeholder-green opacity-80 outline-none active:border-0 md:tracking-wide"
          placeholder={`${t("map.placeholder")}`}
        />
        {searchedLocation === null ? (
          <SearchIcon className="!text-6xl md:!text-3xl" />
        ) : (
          <ClearIcon
            className="cursor-pointer !text-5xl opacity-50 transition-all hover:opacity-100 md:!text-3xl"
            onClick={() => {
              clearSuggestions();
              setSearchedLocation(null);
            }}
          />
        )}

        <div className="absolute  top-24 left-0 !z-50 flex -translate-x-5 space-x-9 overflow-clip rounded-md bg-white md:top-28">
          <div className="flex md:flex-col">
            {searchedLocation?.length !== locations.length &&
              searchedLocation?.map((loc) => (
                <div key={loc.id} className="">
                  <div
                    className="flex h-[100px] w-[230px] cursor-pointer hover:bg-black/5 md:w-[380px]"
                    onClick={() => {
                      setSelectedCarpark(loc.id);
                      setOpenCarpark(loc.id);
                      const lat = parseFloat(loc.coordinates.latitude);
                      const lng = parseFloat(loc.coordinates.longitude);
                      setCarpark({ lat, lng });
                    }}
                  >
                    <div className="w-1/3">
                      <Image
                        src={loc?.images[0].url}
                        alt="location image"
                        width={100}
                        height={100}
                        className="h-[100px] w-full "
                      />
                    </div>
                    <div className="w-2/3 cursor-pointer overflow-clip p-3 text-left text-xs font-light transition-all xl:text-sm">
                      <div className="pb-1 font-medium">{loc.name}</div>
                      <div className="">{loc.address}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
