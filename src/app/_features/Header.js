"use client";

import { useRouter } from "next/navigation";
import { LocationIcon } from "../_icons/Location";
import { LogoIcon } from "../_icons/Logo";
import { NextIcon } from "../_icons/Next";
import { SagsIcon } from "../_icons/Sags";
import { UserIcon } from "../_icons/User";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[68px] bg-black justify-between items-center px-4 flex gap-4 mx-auto">
      <button
        onClick={() => router.push("/admin")}
        aria-label="Go home"
        className="shrink-0 w-12 h-9 ml-22"
      >
        <LogoIcon />
      </button>
      <div className="flex justify-center items-center mr-15 gap-3">
        <button className="w-63 h-9 bg-gray-100 flex justify-between items-center rounded-full px-3 text-red-400">
          <LocationIcon />
          Delivery address:
          <NextIcon />
        </button>
        <button className="w-9 h-9 bg-gray-100 flex justify-center items-center rounded-full">
          <SagsIcon />
        </button>
        <button className="w-9 h-9 bg-red-500 hover:bg-transparent flex justify-center items-center rounded-full">
          <UserIcon />
        </button>
        <div className="w-[188px] h-[104px] bg-gray-100 rounded-2xl text-xl flex justify-center items-center flex-col gap-2 font-bold absolute mt-38 ml-65">
          Test@gmail.com
          <button className="w-20 h-9 bg-gray-200 rounded-4xl text-sm font-medium">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
