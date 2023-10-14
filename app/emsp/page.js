import { useTranslation } from "@/lib/i18n/server";

import BasicPage from "app/components/layout/BasicPage";

import ContactButton from "../components/contact-us/ContactButton";

// disable static cache
export const revalidate = 0;

export default async function EMSP() {
  const { t } = await useTranslation();

  return (
    <div className="flex/ mx-auto justify-center text-5xl font-bold text-green">
      <BasicPage slug="emsp" />
      <ContactButton i={"EMSP"} />
    </div>
  );
}
