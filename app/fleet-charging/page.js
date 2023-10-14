import { useTranslation } from "@/lib/i18n/server";

import BasicPage from "app/components/layout/BasicPage";

import ContactButton from "../components/contact-us/ContactButton";

export default async function FleetCharging() {
  const { t } = await useTranslation();

  return (
    <div className="px-20/ text-center text-5xl font-bold text-green ">
      <BasicPage slug="fleet-charging" />
      <ContactButton i={t("title.fleet_charging")} />
    </div>
  );
}
