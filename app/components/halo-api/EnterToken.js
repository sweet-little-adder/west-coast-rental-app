"use client";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TokenIcon from "@mui/icons-material/Token";
import axios from "axios";
import { useContext } from "react";

import { HaloApiContext } from "../../halo-api/page";

const EnterToken = () => {
  const { setRegisteredInfo, setLoading, setRegister, ref, error, setError } =
    useContext(HaloApiContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ref.current.value) return setError("Email is required");

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
        setError(e.response.data);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center space-x-9">
        <TokenIcon className="translate-x-5 !text-4xl" />
        <input
          type="text"
          className="!z-10 h-[50px] w-[270px] overflow-visible rounded-sm border-b-2 p-3 text-center text-center text-lg font-light
            "
          placeholder="Enter Your Token"
          id="#token"
        />
        <AlternateEmailIcon className="translate-x-5 !text-4xl" />
        <input
          type="text"
          className="!bg-transparent !z-10 h-[50px] w-[270px] overflow-visible rounded-sm border-b-2 p-3 text-center text-center text-lg font-light
            hover:z-10 hover:drop-shadow-[0_0_9px_rgba(255,199,9,0.5)]
            "
          placeholder="Enter Your Email"
          id="#email"
        />
      </div>
    </>
  );
};

export default EnterToken;
