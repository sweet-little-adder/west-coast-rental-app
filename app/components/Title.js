"use client";

import { useTranslation } from "@/lib/i18n";

export default async function Title({ title }) {
  const { t } = useTranslation();

  return (
    <div className="tracking-wide/ mx-auto mb-12 flex -translate-x-2 items-center justify-center text-3xl font-black text-black/90">
      <h>{t(`title.${title}`)}</h>
    </div>
  );
}
