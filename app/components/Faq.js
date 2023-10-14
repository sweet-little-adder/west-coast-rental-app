"use client";

import { useTranslation } from "@/lib/i18n";
import HelpIcon from "@mui/icons-material/Help";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "./layout/Container";

export default function Faq({ faqs }) {
  faqs = {
    en: faqs.map((faq) => ({ q: faq.title, a: faq.content })),
    zh: faqs.map((faq) => ({ q: faq.title_chi, a: faq.content_chi })),
  };
  const language = "en";
  const { t, i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  // load tailwind elements library
  useEffect(() => {
    import("tw-elements").then(() => setLoaded(true));
  }, []);

  const result = faqs[language].map((faq, i) => (
    <div
      key={i}
      className="accordion-item dark:bg-neutral-800  rounded-t-lg bg-white dark:border-[#c9c9c9] "
    >
      <h2
        className="mb-0 "
        id={`heading${i}`}
        style={{ borderTop: i === 0 ? "0px" : "1px solid #eaeaea" }}
      >
        <button
          className=" collapsed text-neutral-800 dark:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 group relative flex w-full items-center border-0 bg-white p-8 text-left text-xl font-normal transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:text-black [&:not([data-te-collapse-collapsed])]:bg-[#F2F2F2] [&:not([data-te-collapse-collapsed])]:text-black [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-black dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_2_rgba(75,85,99,0.2)] "
          type="button"
          data-bs-toggle="collapse"
          data-te-collapse-init
          data-te-collapse-collapsed
          data-te-target={`#collapse${i}`}
          aria-expanded="false"
          aria-controls={`collapse${i}`}
        >
          {faq.q}
          <span className="dark:fill-blue-300 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:group-[[data-te-collapse-collapsed]]:fill-white">
            <Image
              width={24}
              height={24}
              src="/icons/arrow-down.svg"
              alt="toggle icon"
            />
          </span>
        </button>
      </h2>
      <div
        id={`collapse${i}`}
        className="accordion-collapse collapse hidden text-lg font-light leading-loose tracking-wide"
        data-te-collapse-item
        aria-labelledby={`heading${i}`}
        data-te-parent="#faq"
      >
        <div
          className="accordion-body p-8 text-left text-black"
          dangerouslySetInnerHTML={{ __html: faq.a }}
        />
      </div>
    </div>
  ));

  return (
    <Container className="">
      <div className="flex items-center justify-center text-3xl font-semibold text-[#5E5E60]">
        <HelpIcon className="mr-1 !text-4xl !text-yellow" />{" "}
        <h>{t("title.charging_faq")}</h>
      </div>
      <div className="mx-auto mt-9 overflow-scroll rounded-md bg-white text-black drop-shadow-md">
        <div className="accordion" id="#faq">
          {loaded && result}
        </div>
      </div>
    </Container>
  );
}
