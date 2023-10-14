import i18n from "i18next";
import Backend from "i18next-http-backend";
import { cookies } from "next/headers";
import { initReactI18next } from "react-i18next/initReactI18next";

import { getRegionBaseUrl } from "../region";
import config from "./config";

const initI18next = async (lng) => {
  const i18nInstance = i18n.createInstance();
  const region = process.env.NEXT_PUBLIC_REGION;
  await i18nInstance
    .use(Backend)
    .use(initReactI18next)
    .init(config(lng, getRegionBaseUrl(region)));
  return i18nInstance;
};

export async function useTranslation() {
  const locale = cookies().get("locale")?.value || "en";
  const i18nextInstance = await initI18next(locale);
  return {
    t: i18nextInstance.t,
    i18n: i18nextInstance,
  };
}
