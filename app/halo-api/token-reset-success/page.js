"use client";

import GppGoodIcon from "@mui/icons-material/GppGood";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useTranslation } from "@/lib/i18n";

export default function EmailVerified() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div className="z-10 h-[400px] flex-col space-y-12 text-center text-xl font-semibold text-green">
      <GppGoodIcon className="!text-6xl text-yellow" />
      <div className="text-5xl font-bold text-yellow">
        {t(reset_token.success_msg_1)}
      </div>
      <div className="font-light">
        {t(reset_token.success_msg_2)}
        <p
          className="mx-auto mt-9 w-[500px] cursor-pointer rounded-[6px] bg-green p-4 text-white hover:bg-yellow"
          onClick={(e) => copyToClipboard(e)}
        >
          {token}
        </p>
        {copied && (
          <div className="absolute bottom-[120px]  right-1/2 translate-x-14 text-base text-yellow">
            {t(sol_token.copied)}
          </div>
        )}
      </div>
      <button
        onClick={() => router.push("/sol-api/api-status")}
        className="rounded-lg bg-yellow px-5 py-3 text-lg font-light  text-white"
      >
        {t(sol_api.view_api_status)}
      </button>
    </div>
  );
}
