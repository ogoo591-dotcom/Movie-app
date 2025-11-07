"use client";

import { useEffect, useState } from "react";
import { FoodCards } from "../_component/FoodCards.js";

export const FoodList = ({ categoryId, categoryName }) => {
  const [menu, setMenu] = useState([]);

  const menuData = async () => {
    const data = await fetch(
      `http://localhost:4000/food/category/${categoryId}`
    );
    const jsonData = await data.json();
    setMenu(jsonData);
    console.log(setMenu);
  };
  console.log("Food", menu);

  useEffect(() => {
    menuData();
  }, []);

  return (
    <div className="w-[1264px] text-white ml-22">
      <h3 className="text-2xl mt-6 font-semibold py-10">{categoryName}</h3>
      <div className="w-full h-[720px] gap-8 flex flex-wrap ">
        {/* {menu.map((cat, index) => (
          <FoodCards
            key={index}
            name={cat.foodName}
            price={cat.price}
            orts={cat.ingredients}
            image={cat.image}
          />
        ))} */}
      </div>
    </div>
  );
};
