"use client";

import { useTranslation } from "@/lib/i18n";
import CheckIcon from "@mui/icons-material/Check";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import axios from "axios";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import CountDown from "../../components/halo-api/CountDown";
import Loading from "../../components/Loading";

export default function ResetToken() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const { t } = useTranslation();

  const reset = useRef(false);
  const ref = useRef();

  const handleReset = async (e) => {
    setError(null);

    e.preventDefault();
    if (!ref.current.value) return setError("Please enter email");
    setLoading(true);
    setEmail(ref.current.value);
    reset.current = false;

    try {
      await axios
        .post(`/api/users/reset-token`, { email: ref.current.value })
        .then((res) => res);
      reset.current = true;
      setError(null);
      setTimeLeft(process.env.NEXT_PUBLIC_EMAIL_VERIFY_RESEND_INTERVAL);
    } catch (e) {
      setEmail(null);

      if (e.response.status === 405) {
        setError("Email Not Registered");
      } else if (e.response.status === 400) {
        setError("Invalid Email");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    setEmail(email);
    reset.current = false;

    try {
      await axios
        .post(`/api/users/reset-token`, { email: email })
        .then((res) => res);
      reset.current = true;

      setError(null);
      setResend(true);
      setTimeout(() => {
        setResend(false);
      }, 5000);
      setTimeLeft(process.env.NEXT_PUBLIC_EMAIL_VERIFY_RESEND_INTERVAL);
    } catch (e) {
      setEmail(null);

      if (e.response.status === 405) {
        setError("Email Not Registered");
      } else if (e.response.status === 400) {
        setError("Invalid Email");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="z-10 h-screen flex-col space-y-12 text-center text-xl font-semibold text-green">
        <GppMaybeIcon className="!text-6xl text-yellow" />
        <div className="whitespace-nowrap text-5xl font-bold text-yellow">
          {t("reset_token.title")}
        </div>
        {reset.current && (
          <div className=" mx-auto text-center">
            <CheckIcon className="h-9 w-9 rounded-full bg-green p-2 !text-3xl text-white" />
            <div className="pt-5 text-sm font-light  text-black">
              {t("reset_token.email_confirm_msg_1")}
              <b> {email}. </b>
              <p>{t("reset_token.email_confirm_msg_2")}</p>
            </div>
          </div>
        )}
        {loading && <Loading className="!translate-y-80" />}
        {email === null && (
          <form>
            <div className="">
              <input
                type="text"
                id="email"
                name="email"
                placeholder={t("halo_api.email")}
                className="-/translate-x-8 mx-auto h-[50px] w-[360px] rounded-sm border-b-2 text-center font-light"
                {...{ ref }}
              />
              <ReCAPTCHA
                onChange={(token) => {
                  setRecaptcha(token);
                }}
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                // ref={ref.recaptcha}
                className="z-50 mx-auto mt-6 flex justify-center text-center "
              />
            </div>

            <CountDown
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              text={t("reset_token.reset")}
              color={"#FFC709"}
              onClick={handleReset}
            />
          </form>
        )}

        {reset.current && (
          <>
            <CountDown
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              text={t("reset_token.title")}
              color={"#FFC709"}
              onClick={handleResend}
            />
            {resend && (
              <div className="-translate-y-32 text-sm font-light">
                {t(reset_token.resend_msg)} {error}
              </div>
            )}
          </>
        )}

        <div className="container mx-auto h-[1px] w-full -translate-y-9">
          {error && (
            <span className=" mx-auto text-center  text-xs font-medium tracking-wide !text-[#D02249]">
              {error}
            </span>
          )}
          {!error && <span className="hidden">Error message</span>}
        </div>
      </div>
    </>
  );
}
