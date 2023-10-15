"use client";

import DraftsIcon from "@mui/icons-material/Drafts";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useContext, useState } from "react";

import { solApiContext } from "../../sol-api/page";
import CountDown from "./CountDown";

const VerifyEmail = () => {
  const {
    registeredInfo,
    setRegisteredInfo,
    setLoading,
    copied,
    setCopied,
    resend,
    setResend,
    error,
    setError,
    email,
  } = useContext(solApiContext);
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const [timeLeft, setTimeLeft] = useState(
    process.env.NEXT_PUBLIC_EMAIL_VERIFY_RESEND_INTERVAL
  );
  const [animateEmail, setAnimateEmail] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      const res = await axios
        .post(`/api/users/resend`, { resendUrl: registeredInfo.resendUrl })
        .then((res) => res.data);
      setResend(true);
      setTimeout(() => {
        setResend(false);
      }, 5000);
      setTimeLeft(process.env.NEXT_PUBLIC_EMAIL_VERIFY_RESEND_INTERVAL);
    } catch (e) {
      setError("Error resending email");
      setTimeLeft(process.env.NEXT_PUBLIC_EMAIL_VERIFY_RESEND_INTERVAL);
    }
  };

  const openEmail = () => {
    let domain = email.substring(email.lastIndexOf("@") + 1);

    if (domain === "gmail.com") {
      window.open("https://mail.google.com/mail/", "_blank");
    } else if (domain === "yahoo.com" || domain === "yahoo.com.hk") {
      window.open("https://mail.yahoo.com/", "_blank");
    } else if (domain === "outlook.com" || domain === "hotmail.com") {
      window.open("https://www.outlook.com/", "_blank");
    } else {
      // Default open the user's default email app.
      window.open("https://mail.google.com/mail/", "_blank");
    }
  };

  return (
    <>
      {resend && (
        <div className="absolute bottom-1/2 right-1/2 z-50 translate-y-48 translate-x-1/2 text-sm text-yellow">
          An email has been resent
        </div>
      )}
      <div className="z-10 !z-10 mx-auto w-fit flex-col justify-center space-y-5 whitespace-nowrap rounded-md bg-white p-20 text-center text-xl text-black drop-shadow-md">
        <div className="mx-auto flex items-center justify-center space-x-5 text-start">
          <div>API Token: </div>
          <div
            className="w-[500px] cursor-pointer rounded-[6px]  bg-green p-4 text-white hover:bg-yellow"
            onClick={(e) => copyToClipboard(e)}
          >
            {copied ? "Copied Token!" : registeredInfo.apiToken}
          </div>
        </div>
        <div className="flex items-center justify-start space-x-5 text-start">
          <div>API Doc: </div>
          <div className="w-[500px]  translate-x-4 rounded-[6px] bg-[#F5F8FA] p-4 text-[#232323] underline-offset-8 hover:underline hover:opacity-70">
            <a href={registeredInfo.apiDocsUrl} target="blank">
              {registeredInfo.apiDocsUrl}
            </a>
          </div>
        </div>
        <p className=" flex items-center justify-center space-x-3 pt-9 text-sm">
          A verification email has been sent to &nbsp;<b>{email}</b>. <br />
          <button
            className=" h-9  w-9 rounded-full bg-green text-base  font-bold text-white"
            onClick={() => {
              openEmail();
            }}
            onMouseOver={() => setAnimateEmail(true)}
            onMouseLeave={() => setAnimateEmail(false)}
          >
            {animateEmail ? <DraftsIcon /> : <EmailIcon />}
          </button>
        </p>

        <CountDown
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          text={"Resend"}
          color={"#FFC709"}
          onClick={handleResend}
        />
        {error && (
          <span className="mx-auto mt-1 ml-1 flex items-center justify-center text-center text-xs font-medium tracking-wide text-[#D02249] ">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
