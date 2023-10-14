"use client";

import { useTranslation } from "@/lib/i18n";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";

import { CarparkProvider } from "../../Context/store";
import CarparkList from "./CarParkList";
import styles from "./mapStyles";
import SearchPanel from "./SearchPanel";

export default function Map({ locations }) {
  const { i18n } = useTranslation();
  const center = { lat: 22.4281591, lng: 114.2090112 };
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  return (
    <>
      <div className="h-[calc(100vh-100px)]">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          libraries={["places"]}
          language={i18n.language === "zh" ? "zh-HK" : "en"}
        >
          <GoogleMap
            mapContainerStyle={{
              minWidth: "100%",
              minHeight: "100%",
            }}
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              styles: styles.silver,
            }}
            center={center}
            zoom={10}
            className="z-10"
            onLoad={onLoad}
            {...{ mapRef }}
          >
            <CarparkProvider locations={locations}>
              <SearchPanel mapRef={mapRef} />
              <CarparkList />
            </CarparkProvider>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}
