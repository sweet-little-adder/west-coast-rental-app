import i18n from "i18next";
import Backend from "i18next-http-backend";
import Cookies from "js-cookie";
import { initReactI18next } from "react-i18next";
import { useTranslation as useTranslationOrg } from "react-i18next";

import { getCurrentRegion, getRegionBaseUrl } from "../region";
import config from "./config";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init(config(Cookies.get("locale"), getRegionBaseUrl(getCurrentRegion())));

export default i18n;

export function useTranslation() {
  const ret = useTranslationOrg();

  return ret;
}
