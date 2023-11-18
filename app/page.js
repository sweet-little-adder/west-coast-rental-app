import { useTranslation } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
	const { t } = await useTranslation();

	return (
		<div
			className="!z-10 mx-auto space-y-20 text-center font-extralight  text-white"
			style={{ fontFamily: "Nunito Sans" }}
		>
			login
		</div>
	);
}
