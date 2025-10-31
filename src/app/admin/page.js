"use client";

import { CarIcon } from "lucide-react";
import { Logo3Icon } from "../_icons/Logo3";
import { SettingIcon } from "../_icons/Setting";
import Link from "next/link";
import { FoodIcon2 } from "../_icons/FoodMenu2";
import CategoryCards from "../_component/CategoryCards";
import { FoodCards } from "../_component/FoodCards";

export default function Home() {
  return (
    <div className="w-[1440px] h-[1024px] m-auto bg-gray-100 flex flex-wrap  mt-10 gap-3">
      <div className="h-[1024px] w-[204px] bg-white gap-10 py-9 flex flex-col ">
        <Logo3Icon />
        <Link
          href={"/admin"}
          className="flex justify-center items-center gap-2 h-10 w-40 bg-black text-white rounded-full"
        >
          <FoodIcon2 />
          <p>Food menu</p>
        </Link>
        <Link
          href={"admin/orders"}
          className="flex justify-center items-center gap-2 h-10 w-40 hover:bg-black hover:text-white rounded-full"
        >
          <CarIcon />
          Orders
        </Link>
        <Link
          href={"admin/settings"}
          className="flex justify-center items-center gap-2 h-10 w-40 hover:bg-black hover:text-white rounded-full hover:ml-2"
        >
          <SettingIcon />
          <p>Settings</p>
        </Link>
      </div>
      <div className="w-[1171px] h-[948px] mt-10 bg-white">
        <img className="w-9 h-9 rounded-full ml-280" src="./User.jpg" />
        <div>
          <CategoryCards />
          <div className="w-[1264px] text-white ml-22">
            <h3 className="text-2xl mt-6 font-semibold py-10 text-black">
              Appetizers (6)
            </h3>
            <div className="w-full h-[720px] gap-8 flex flex-wrap ">
              <FoodCards />
              <FoodCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
