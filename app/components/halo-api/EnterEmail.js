"use client";

import { useTranslation } from "@/lib/i18n";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import axios from "axios";
import { useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { solApiContext } from "../../sol-api/page";

const EnterEmail = () => {
  const {
    setRegisteredInfo,
    setLoading,
    setRegister,
    ref,
    error,
    setError,
    email,
    setEmail,
  } = useContext(solApiContext);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ref.current.value) return setError("Email is required");
    setEmail(ref.current.value);
    setRegister(false);
    setLoading(true);
    try {
      const res = await axios
        .post(`/api/users/register`, { email: ref.current.value })
        .then((res) => res.data);

      setLoading(false);
      setRegisteredInfo(res);
      setError(null);
    } catch (e) {
      if (e.response && e.response.status === 405) {
        setLoading(false);
        setRegister(true);
        setError("Email is already registered");
      } else {
        setLoading(false);
        setRegister(true);
        setError("Server not responding");
      }
    }
  };
  return (
    <>
      <div className="text-center text-xl text-green">
        <form>
          <div className="!z-10 space-x-8 pt-8 ">
            <AlternateEmailIcon className="text-4xl font-extrabold" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder={t("sol_api.email")}
              className="!z-10 h-[50px] w-[360px] -translate-x-8 rounded-sm border-b-2 text-center
              font-light
                         hover:drop-shadow-md"
              {...{ ref }}
            />
          </div>

          {error && (
            <span className="mt-1 ml-1 flex items-center justify-center text-center text-xs font-medium tracking-wide !text-[#D02249]">
              {error}
            </span>
          )}
          <ReCAPTCHA
            onChange={(token) => {
              setRecaptcha(token);
            }}
            size="normal"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            // ref={ref.recaptcha}
            className="z-50 mx-auto mt-6 flex justify-center text-center "
          />

          <button
            className="m-5 mx-auto flex
                       justify-center rounded-lg bg-yellow
                       px-11 py-3 text-base font-medium text-white"
            onClick={handleSubmit}
          >
            {t("sol_api.register")}
          </button>
        </form>
      </div>
      <div className="text-[#9e9e9e]"> {t("sol_api.or")}</div>
    </>
  );
};

export default EnterEmail;
