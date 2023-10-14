"use client";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useTranslation } from "@/lib/i18n";

export default function ContactUs({ setLoading, response, setResponse }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const search = searchParams.get("subject");
  const Subject = ["EMSP", "CPO", "EHC", `${t("title.fleet_charging")}`];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(search === null ? "" : search);
  const [content, setContent] = useState("");
  const [recaptcha, setRecaptcha] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);

    if (!subject) {
      setResponse({ error: true, msg: "subject is missing" });
      setLoading(false);
      return;
    }
    if (!content) {
      setResponse({ error: true, msg: "content is missing" });
      setLoading(false);
      return;
    }
    if (!email) {
      setResponse({ error: true, msg: "email is required" });
      setLoading(false);
      return;
    }
    if (!name) {
      setResponse({ error: true, msg: "whats your name?" });
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/contact/email", {
        subject,
        content,
        email,
        recaptcha,
        name,
      });
      setResponse({ error: false, msg: "Email sent successfully" });
    } catch (e) {
      setResponse({ error: true, msg: e.response?.data?.message || e.message });
    }

    setLoading(false);
  };

  return (
    <div className="w-full items-center justify-center md:flex md:space-x-20">
      <div className="mb-[280px] whitespace-nowrap text-right text-[70px] font-semibold leading-normal text-white">
        {t("title.contact_us")}
      </div>
      <div className="">
        <div className="mb-9 w-[500px] rounded-2xl bg-white p-9 text-sm drop-shadow-[5px_9px_9px_rgba(0,0,0,0.25)]">
          <TextField
            label={t("contact.name")}
            required={true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="!mb-5 w-full"
          />
          <TextField
            label={t("contact.email")}
            required={true}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="!mb-5 w-full "
          />

          <Autocomplete
            className="mb-5"
            id="free-solo-demo"
            freeSolo
            options={Subject.map((service) => service)}
            renderInput={(params) => (
              <TextField {...params} label={t("contact.topic")} />
            )}
          />

          <TextField
            // label="Content"
            label={t("contact.body")}
            required={true}
            value={content}
            rows={10}
            multiline
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full "
          />
        </div>
        <ReCAPTCHA
          onChange={(token) => {
            setRecaptcha(token);
          }}
          size="normal"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          className="mx-auto my-9 w-fit text-center"
        />
        <button
          className="mx-auto rounded-3xl bg-yellow px-[80px] py-4 text-left text-3xl text-white drop-shadow-[0_0_5px_rgba(255,199,9,1)]"
          type="submit"
          onClick={() => handleSubmit()}
        >
          {t("button.submit")}
        </button>
        {response.error && (
          <div className="mt-3 text-sm text-[#dc2626]">{response.msg}</div>
        )}
      </div>
    </div>
  );
}
