import FlareIcon from "@mui/icons-material/Flare";
import { useState } from "react";

export default function Lens({ faqs }) {
  const [openLens, setOpenLens] = useState(false);
  return (
    <div className="z-50/ absolute">
      <div
        className="fixed top-1/4 left-0  z-40 h-[500px] w-full  min-w-[2000px] -translate-x-20 rotate-2 bg-green mix-blend-plus-lighter"
        style={{ display: openLens ? "block" : "none" }}
      ></div>
      <button
        className="fixed z-50 h-12 w-12 rounded-full p-5 text-yellow"
        onClick={() => setOpenLens(!openLens)}
      >
        <FlareIcon />
      </button>
    </div>
  );
}
