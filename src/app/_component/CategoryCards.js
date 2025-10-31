"use client";
import { useState } from "react";

const Cat = [
  { id: "all", name: "All Dishes", count: 112 },
  { id: "app", name: "Appetizers", count: 6 },
  { id: "sal", name: "Salads", count: 3 },
  { id: "piz", name: "Pizzas", count: 5 },
  { id: "lun", name: "Lunch favorites", count: 5 },
  { id: "main", name: "Main dishes", count: 5 },
  { id: "fish", name: "Fish & Sea foods", count: 5 },
  { id: "bru", name: "Brunch", count: 5 },
  { id: "side", name: "Side dish", count: 5 },
  { id: "des", name: "Desserts", count: 5 },
  { id: "bev", name: "Beverages", count: 5 },
];

export default function CategoryCards() {
  const [active, setActive] = useState("all");

  return (
    <section className="rounded-[18px] bg-white p-5 md:p-6">
      <h3 className="mb-4 text-xl font-semibold text-neutral-900">
        Dishes category
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        {Cat.map((c) => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={[
                "group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[15px] font-medium transition",
                isActive
                  ? "border-red-400 text-neutral-900"
                  : "border-neutral-200 text-neutral-800 hover:border-neutral-300",
              ].join(" ")}
            >
              <span>{c.name}</span>
              <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-semibold leading-none text-white">
                {c.count}
              </span>
            </button>
          );
        })}
        <button
          aria-label="Add category"
          className="grid h-10 w-10 place-items-center rounded-full bg-rose-500 text-white shadow-sm transition hover:scale-105 active:scale-95"
          onClick={() => alert("Add new category")}
        >
          +
        </button>
      </div>
    </section>
  );
}
