"use client";

import { useTranslation } from "@/lib/i18n";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useRouter } from "next/navigation";
import { createContext, useRef, useState } from "react";

import EnterEmail from "../components/sol-api/EnterEmail";
import VerifyEmail from "../components/sol-api/VerifyEmail";
import Loading from "../components/Loading";

export const solApiContext = createContext();

export default function solApi() {
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
		<solApiContext.Provider
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
				Login
			</div>
		</solApiContext.Provider>
	);
}
