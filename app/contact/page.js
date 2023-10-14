"use client";

import { useState } from "react";

import ContactSuccess from "../components/contact-us/ContactSuccess";
import ContactUs from "../components/contact-us/ContactUs";
import Loading from "../components/Loading";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ error: false, msg: "" });

  return (
    <div className="items-center text-4xl">
      <div className="flex-wrap justify-start text-center md:flex">
        <div
          className="
          border-r-transparent h-0
          w-0 border-l-[2000px] 
          border-b-[50px] border-t-[50px] 
          border-r-[50px] border-l-green 
          border-b-green border-t-white
          "
        ></div>

        <div className="flex min-h-[400px] w-full items-center justify-center bg-green">
          {response.msg === "" ? (
            loading ? (
              <Loading />
            ) : (
              <ContactUs
                setLoading={setLoading}
                response={response}
                setResponse={setResponse}
              />
            )
          ) : (
            <ContactSuccess />
          )}
        </div>
        <div
          className="
          h-0 w-0
          border-r-[2000px] border-t-[50px] 
          border-b-[50px] border-r-green 
          border-t-green border-b-white 
          "
        ></div>
      </div>
    </div>
  );
}
