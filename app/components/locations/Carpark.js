"use client";

import { MarkerF as Marker, OverlayView } from "@react-google-maps/api";
import React, { useContext, useMemo, useRef, useState } from "react";

import { CarparkContext } from "../../Context/store";
import CarparkPanel from "./CarparkPanel";

export default function Carpark({ location, selected, onSelect, onClose }) {
  const x = parseFloat(location.coordinates.latitude);
  const y = parseFloat(location.coordinates.longitude);

  const onLoad = (marker) => {
    //marker.setAnimation(window?.google.maps.Animation.DROP)
  };

  const getPixelPositionOffset = (width, height) => {
    return { x: -(width / 2), y: -(height / 2) };
  };
  const [info, setInfo] = useState(false);

  const handleCarparkClick = () => {
    onSelect(location.id);
    setInfo(false);
  };

  return (
    <>
      {selected ? (
        <CarparkPanel
          location={location}
          onClose={() => onClose(location.id)}
        />
      ) : null}
      <Marker
        key={location?.id + selected}
        icon={{
          url: "/map/marker.svg",
          scaledSize: new google.maps.Size(50, 50),
        }}
        animation={selected ? window?.google.maps.Animation.BOUNCE : ""}
        onLoad={onLoad}
        position={{ lat: x, lng: y }}
        onMouseOver={() => setInfo(true)}
        onMouseOut={() => setInfo(false)}
        onClick={() => handleCarparkClick()}
      />
      {info ? (
        <OverlayView
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{ lat: x, lng: y }}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <div className="pointer-events-none h-fit  rounded-2xl border-green bg-white p-5 text-center text-green drop-shadow-[0_0_5px_rgba(80,255,174,0.5)]">
            {location?.address} <br /> status
          </div>
        </OverlayView>
      ) : null}
    </>
  );
}
