"use client";

import { FoodCards } from "../_component/FoodCards";

export const FoodList = () => {
  return (
    <div className="w-[1264px] text-white ml-22">
      <h3 className="text-2xl mt-6 font-semibold py-10">Appetizers</h3>
      <div className="w-full h-[720px] gap-8 flex flex-wrap ">
        <FoodCards />
        <FoodCards />
        <FoodCards />
        <FoodCards />
        <FoodCards />
        <FoodCards />
      </div>
      <h3 className="text-2xl mt-6 font-semibold py-10">Salads</h3>
      <div className="w-full h-[360px] gap-8 flex flex-wrap ">
        <FoodCards />
        <FoodCards />
        <FoodCards />
      </div>
      <h3 className="text-2xl mt-6 font-semibold py-10">Lunch favorites</h3>
      <div className="w-full h-[720px] gap-8 flex flex-wrap ">
        <FoodCards />
        <FoodCards />
        <FoodCards />
        <FoodCards />
        <FoodCards />
      </div>
      <h3 className="text-2xl mt-6 font-semibold py-10">Salads</h3>
      <div className="w-full h-[360px] gap-8 flex flex-wrap mb-15 ">
        <FoodCards />
        <FoodCards />
        <FoodCards />
      </div>
    </div>
  );
};
