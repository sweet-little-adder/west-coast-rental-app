"use client";

import { useTranslation } from "@/lib/i18n";
import { tailwindConfig } from "@/lib/utils";
import { Autocomplete, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { useMemo, useState } from "react";

export default function CarparkSearch({ onSelect, mapRef }) {
  const { t } = useTranslation();
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const getPredictions = useMemo(
    () =>
      debounce((value) => {
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          { input: value, componentRestrictions: { country: "hk" } },
          (predictions, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              predictions
            ) {
              setAutocompleteOptions(predictions);
            } else {
              setAutocompleteOptions([]);
            }
          }
        );
      }, 500),
    []
  );

  const getDetails = (place) => {
    if (!place) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: place.place_id }, (result) => {
      mapRef.current.setCenter(result.geometry.location);
      mapRef.current.setZoom(15);
    });
  };

  return (
    <div className="rounded-xl bg-white">
      <Autocomplete
        freeSolo
        autoHighlight
        filterOptions={(x) => x}
        options={autocompleteOptions}
        getOptionLabel={(option) => option?.description ?? ""}
        onChange={(e, place) => {
          getDetails(place);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& fieldset": {
                borderColor: `${tailwindConfig.theme.colors.green} !important`,
              },
            }}
            inputProps={{
              ...params.inputProps,
              className:
                "placeholder:text-green placeholder:opacity-80 text-green",
            }}
            size="small"
            placeholder={t("map.search.placeholder")}
            onInput={(event) => {
              const value = event.target.value;
              getPredictions(value);
            }}
          />
        )}
      />
    </div>
  );
}
