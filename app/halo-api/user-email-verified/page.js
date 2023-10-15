"use client";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Link from "next/link";

import { useTranslation } from "@/lib/i18n";

export default function EmailVerified() {
  const { t } = useTranslation();

  return (
    <div className="z-10 h-[400px] flex-col space-y-12 text-center text-xl font-semibold text-green">
      <CloudQueueIcon className="!text-6xl text-yellow" />
      <div className="text-5xl font-bold text-yellow">
        {t("sol_api.verified_msg_1")}
      </div>
      <div>{t("sol_api.verified_msg_2")}</div>
      <Link href="sol-api/api-status">
        <button
          // onClick={() => router.push("/sol-api/api-status")}
          className="rounded-lg bg-green px-5 py-3 text-lg font-light text-white hover:drop-shadow-[0_0_5px_rgba(0,174,189,0.5)]"
        >
          {t("sol_api.view_api_status")}
        </button>
      </Link>
    </div>
  );
}
