import { useTranslation } from "@/lib/i18n";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React from "react";

import { useCarparkContext } from "app/Context/store";

const filterType = ["available", "show_all", "ac", "dc"];

const Switch = ({ label, toggle, disabled }) => {
  return (
    <div className="flex items-center justify-start ">
      <input
        className=" before:bg-transparent mr-2  h-6 w-[40px] appearance-none rounded-full bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-6 before:w-[40px] before:rounded-full before:content-[''] after:absolute after:z-[2] after:mt-[0.25rem] after:ml-[0.3rem] after:h-4 after:w-4 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-green checked:after:absolute checked:after:z-[2] checked:after:mt-[0.25rem] checked:after:ml-[1.2rem] checked:after:h-4 checked:after:w-4 checked:after:rounded-full checked:after:border-none checked:after:bg-white checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer "
        type="checkbox"
        checked={toggle}
        role="switch"
        id="flexSwitchCheckDefault"
        disabled={disabled}
        readOnly
      />
      <label
        className="inline-block pl-[0.15rem] text-black hover:cursor-pointer"
        htmlFor="flexSwitchCheckDefault"
      >
        {label}
      </label>
    </div>
  );
};

export default function SwitchFilter({ onToggle, openFilter, setOpenFilter }) {
  const { t } = useTranslation();
  const { filterToggles } = useCarparkContext();

  const handleSwitchToggle = (f) => {
    onToggle(f);
  };

  return (
    <div>
      {/* M O B I L E */}
      <div
        className="block rounded-2xl bg-white p-5 text-center  text-green drop-shadow-md md:hidden"
        style={{ display: openFilter ? "block" : "none" }}
      >
        <div className="mb-9 flex justify-start text-center">
          <div
            className="flex w-full items-center"
            // onClick={() => setLocations([0])}
          >
            <FilterAltIcon className="mr-6 !text-6xl" />
            <div className="w-full text-left text-3xl tracking-wider  text-black">
              {t("map.filter")}
            </div>
            <CloseIcon
              className="!text-6xl text-[#c9c9c9]"
              onClick={() => setOpenFilter(false)}
            />
          </div>
        </div>
        {filterType.map((f) => (
          <div
            key={f}
            className="ml-9 flex space-x-3 p-5 text-left text-black"
            onChange={() => handleSwitchToggle(f)}
          >
            <Switch
              label={`${t(`map.${f}`)}`}
              color="amber"
              className="shrink-0"
              ripple={true}
              toggle={filterToggles[f]}
              disabled={false}
            />
          </div>
        ))}
      </div>
      {/* D E S K T O P */}
      <div className="hidden rounded-md bg-white/80 p-5 text-center text-green drop-shadow-md md:block">
        <div className="mb-9 flex justify-start text-center">
          <FilterAltIcon className="mr-6 !text-3xl" />
          <div className="w-full text-left text-xl  text-black">
            {t("map.filter")}
          </div>
        </div>
        {filterType.map((f) => (
          <div
            key={f}
            className="ml-[-12px] mb-6 flex space-x-3 pl-5 text-left text-black"
            onChange={() => handleSwitchToggle(f)}
          >
            <Switch
              label={t(`map.${f}`)}
              color="amber"
              toggle={filterToggles[f]}
              className="shrink-0"
              ripple={true}
              disabled={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
