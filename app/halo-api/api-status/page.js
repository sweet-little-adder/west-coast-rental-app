"use client";

import { useTranslation } from "@/lib/i18n";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TokenIcon from "@mui/icons-material/Token";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import ApiStatusInfo from "../../components/halo-api/ApiStatusInfo";
import Loading from "../../components/Loading";

export default function ApiStatus() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !document.getElementById("#token").value |
      !document.getElementById("#email").value
    )
      return setError("Please enter token / email");
    setLoading(true);
    const token = document.getElementById("#token").value;
    const email = document.getElementById("#email").value;

    try {
      const res = await axios
        .post(`/api/users/get-info`, { token: token, email: email })
        .then((res) => res.data);
      setApiStatus(res);
    } catch (e) {
      setError("Invalid Token / Email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-10 h-[700px] space-y-20 text-center text-3xl text-green ">
      <div className="mx-auto flex-col justify-center  space-y-5 text-5xl font-bold">
        <CloudQueueIcon className="!text-6xl !text-yellow " />
        <div>{t("api_status.title")}</div>
      </div>
      {!apiStatus && !loading && (
        <>
          <div className="flex-col items-center  justify-center space-y-9">
            <div>
              <AlternateEmailIcon className="-translate-x-5 !text-4xl" />
              <input
                type="text"
                className=" !z-10 h-[50px] w-[400px] overflow-visible rounded-sm border-b-2 p-3 text-center text-center text-lg font-light"
                placeholder={t("halo_api.email")}
                id="#email"
              />
            </div>
            <div>
              <TokenIcon className="-translate-x-5 !text-4xl" />
              <input
                type="text"
                className="!z-10 h-[50px] w-[400px] overflow-visible rounded-sm border-b-2 p-3 text-center text-center text-lg font-light"
                placeholder={t("api_status.token")}
                id="#token"
              />
            </div>
            <button
              className="text-xl font-light"
              onClick={() => router.push("/halo-api/reset-token")}
            >
              {t("api_status.iforgot")}
            </button>
          </div>

          <button
            className="drop-shadow.md rounded-xl bg-yellow p-5 text-base text-white hover:drop-shadow-[0_0px_3px_rgba(255,199,9,1.8)]"
            onClick={(e) => handleSubmit(e)}
          >
            {t("halo_api.view_api_status")}
          </button>
          <div className="-translate-y-9 text-sm font-bold text-[#c8274b]">
            {error && error}
          </div>
        </>
      )}

      {loading && <Loading />}
      <Suspense fallback={<div>Loading...</div>}>
        {apiStatus && (
          <ApiStatusInfo apiStatus={apiStatus} setApiStatus={setApiStatus} />
        )}
      </Suspense>
    </div>
  );
}
