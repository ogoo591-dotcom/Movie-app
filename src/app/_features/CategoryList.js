"use client";
import { useState } from "react";

export const CategoryList = () => {
  const [active, setActive] = useState("Appetizers");

  const categories = [
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Salads" },
    { id: 3, name: "Pizzas" },
    { id: 4, name: "Lunch favorites" },
    { id: 5, name: "Main dishes" },
    { id: 6, name: "Fish & Sea foods" },
    { id: 7, name: "Side dish" },
    { id: 8, name: "Brunch" },
    { id: 9, name: "Desserts" },
  ];

  return (
    <div className="flex flex-col justify-center text-white p-6 ml-18 gap-5 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.name)}
            className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
              active === cat.name
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
