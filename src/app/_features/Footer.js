"use client";

import { Logo2Icon } from "../_icons/Logo2";

export const Footer = () => {
  return (
    <div className="w-full h-[755px]  bg-black py-15 flex justify-center flex-col items-center">
      <div className="w-full h-23 bg-red-600 text-white flex justify-center items-center gap-5 font-bold text-2xl">
        <h1>Fresh fast delivered</h1>
        <h1>Fresh fast delivered</h1>
        <h1>Fresh fast delivered</h1>
        <h1>Fresh fast delivered</h1>
        <h1>Fresh fast delivered</h1>
      </div>
      <div className="w-full h-[228px] text-white mt-8 ml-30 p-10 flex items-center gap-30">
        <Logo2Icon />
        <span className="h-full flex flex-col gap-5">
          <p className="text-gray-600">NOMNOM </p>
          <p>Home </p>
          <p>Contact us </p>
          <p>Delivery zone </p>
        </span>
        <span className="h-full flex flex-col gap-5">
          <p className="text-gray-600">MENU </p>
          <p>Appetizers </p>
          <p>Salads</p>
          <p>Pizzas</p>
          <p>Main dishes</p>
          <p>Desserts</p>
        </span>
        <span className="h-full flex flex-col mt-20 gap-5">
          <p>Side dish </p>
          <p>Brunch</p>
          <p>Desserts</p>
          <p>Beverages </p>
          <p>Fish & Sea foods</p>
        </span>
        <div>
          <p className="text-gray-600">FOLLOW US </p>
          <div className="flex gap-5 mt-3 ">
            <img className="w-8 h-8" src="./Facebook.png" />
            <img className="w-8 h-8" src="./Instagram.png" />
          </div>
        </div>
      </div>
      <div className="w-[1264px] h-[228px] text-white mt-40 flex items-center gap-30 border-t border-gray-500">
        <span className="h-full flex gap-5 text-gray-600 mt-20">
          <p>Copy right 2024 </p>
          <p> ©</p>
          <p>Nomnom LLC </p>
          <p>Privacy policy </p>
          <p>Terms and conditoin </p>
          <p>Cookie policy</p>
        </span>
      </div>
    </div>
  );
};
