"use client";

import { useTranslation } from "@/lib/i18n";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useRouter } from "next/navigation";
import { createContext, useRef, useState } from "react";

import EnterEmail from "../components/halo-api/EnterEmail";
import VerifyEmail from "../components/halo-api/VerifyEmail";
import Loading from "../components/Loading";

export const HaloApiContext = createContext();

export default function HaloApi() {
  const [registeredInfo, setRegisteredInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(true);
  const [resend, setResend] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
  const [info, setInfo] = useState(true);
  const [hint, setHint] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <HaloApiContext.Provider
      value={{
        registeredInfo,
        setRegisteredInfo,
        loading,
        setLoading,
        register,
        setRegister,
        resend,
        setResend,
        copied,
        setCopied,
        ref,
        error,
        setError,
        email,
        setEmail,
      }}
    >
      <div className="z-10 h-[1000px] space-y-6 text-center font-light text-[#5E5E60]">
        <div
          className="text-balck mx-auto flex-col 
                     justify-center space-y-3 text-5xl font-bold"
        >
          <CloudQueueIcon className="!text-6xl text-yellow" />
          <div className="relative flex justify-center">
            HALO API
            <QuestionMarkIcon
              className="shadow-inner-1 [0_35px_60px_-15px_rgba(0,0,0,0.3)] -translate-y-5 cursor-pointer
              rounded-full bg-white p-1 !text-3xl text-[#c9c9c9] drop-shadow-md "
              onMouseOver={() => setHint(true)}
              onMouseLeave={() => setHint(false)}
              onClick={() => setInfo(!info)}
            />
            {hint && (
              <div className="absolute bottom-12 left-1/2 mx-auto w-fit translate-x-36 space-y-3 rounded-md bg-white p-2 text-[10px] font-normal leading-relaxed text-[#9c9c9c] drop-shadow-md">
                <p>{info ? "Hide Info" : "Show Info"}</p>
              </div>
            )}
          </div>
          {loading && <Loading />}
        </div>
        {info && (
          <div className="animate-down pointer-events-none mx-auto w-2/3  space-y-3 text-left text-xl font-light leading-relaxed text-[#808080] lg:w-1/3 lg:text-sm">
            <p>{t("halo_api.instruction_p1")}</p>
            <p>
              {t("halo_api.instruction_p2_1")} <br />
              {t("halo_api.instruction_p2_2")} <br />
              {t("halo_api.instruction_p2_3")}
            </p>
            <p>{t("halo_api.instruction_p3")}</p>
          </div>
        )}
        {register && <EnterEmail />}
        {registeredInfo && <VerifyEmail className="!z-10 " />}
        {(register || registeredInfo) && (
          <button
            className="rounded-lg bg-green px-5 py-3 text-base text-white"
            onClick={() => {
              router.push("/halo-api/api-status");
            }}
          >
            {t("halo_api.view_api_status")}
          </button>
        )}
      </div>
    </HaloApiContext.Provider>
  );
}
