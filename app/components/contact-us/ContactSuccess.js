"use client";

import { useTranslation } from "@/lib/i18n";
import EmailIcon from "@mui/icons-material/Email";
export default function ContactSuccess() {
  const { t } = useTranslation();

  return (
    <div className="flex h-[400px] w-full items-center justify-center bg-green font-bold text-white">
      <div>
        <EmailIcon className="text-yellow/ mx-auto mb-9 text-center !text-5xl" />
        <div>{t("contact.success_msg")}</div>
      </div>
    </div>
  );
}
