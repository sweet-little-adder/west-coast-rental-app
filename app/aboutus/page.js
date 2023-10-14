import BasicPage from "app/components/layout/BasicPage";

import { useTranslation } from "../../lib/i18n/server";

export const revalidate = 0;

export default async function Home() {
  const { t } = await useTranslation();

  return (
    <div className="flex-col justify-center space-y-12  overflow-visible text-4xl ">
      <div className="z-50 mx-auto space-y-4 text-center text-4xl font-semibold text-black/90">
        <div>{t("title.about_us")}</div>
      </div>
      <div className="relative w-full text-base">
        <BasicPage slug="about-us" />
      </div>
    </div>
  );
}
