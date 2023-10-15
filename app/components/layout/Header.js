"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="h-[241px] w-full bg-green">
      {pathname !== "/" && (
        <Image
          src="/sol-logo-white.svg"
          alt="logo white"
          width={100}
          height={100}
          className="mx-auto w-[169px] pt-[50px]"
        />
      )}
    </header>
  );
};

export default Header;
