"use client";

import { useTranslation } from "@/lib/i18n";
import { useRouter } from "next/navigation";

export default function ContactUs({ i }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  return (
    <button
      className="-translate-y-40/ mx-auto flex w-[300px] justify-center rounded-xl bg-yellow p-9 text-center text-3xl text-white drop-shadow-[0_0_5px_rgba(255,199,9,1)]"
      onClick={() => {
        router.push(`/contact?subject=${i}`);
      }}
    >
      {t("title.contact_us")}
    </button>
  );
}
