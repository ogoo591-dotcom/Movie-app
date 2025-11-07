"use client";
import { useEffect, useState } from "react";
import { MenuCards } from "../_component/MenuCards.js";
import { CheckIcon } from "lucide-react";

export const FoodsByCategory = ({
  categoryId,
  categoryName,
  onClose,
  dish,
  onSave,
  categories = [],
}) => {
  const [menu, setMenu] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);

  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastPen, setToastPen] = useState(false);

  const menuData = async () => {
    const data = await fetch(
      `http://localhost:4000/food/category/${categoryId}`
    );
    const jsonData = await data.json();
    setMenu(jsonData);
    console.log(setMenu);
  };

  useEffect(() => {
    menuData();
  }, [categoryId]);

  const handleAddDish = async () => {
    try {
      const res = await fetch(`http://localhost:4000/food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          foodName: dishName,
          price: price,
          ingredients: ingredients,
          image: image,
          category: categoryId,
        }),
      });
      setDishName("");
      setPrice("");
      setIngredients("");
      setImage("");
      setShowForm(false);
      setToastOpen(true);
      setOpen(false);
      setToastPen(true);
      setTimeout(() => setToastOpen(false), 2500);
      setTimeout(() => setToastPen(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full h-auto text-white bg-gray-50 rounded-2xl">
      <h3 className="text-2xl mt-5 ml-5 font-semibold text-black">
        {categoryName}
        <span className="text-neutral-500"> ()</span>
      </h3>
      <div className="w-full h-auto overflow gap-3 flex flex-wrap py-5 ml-8">
        <div className="w-[270px] h-[241px] border-red-500 border border-dashed rounded-3xl flex justify-center items-center flex-col text-black gap-5">
          <button
            aria-label="Add category"
            className="grid h-10 w-10 place-items-center rounded-full bg-rose-500 text-white shadow-sm transition hover:scale-105 active:scale-95"
            onClick={() => setShowForm(true)}
          >
            +
          </button>
          <div className="flex justify-center flex-col items-center">
            <p>{categoryName}</p>
            <p className="text-l text-red-400">ШИНЭЭР НЭМЭХ</p>
          </div>
        </div>
        {menu.map((food, index) => (
          <MenuCards
            key={index}
            id={food._id}
            name={food.foodName}
            price={food.price}
            orts={food.ingredients}
            image={food.image}
            categoryName={categoryName}
          />
        ))}
        {showForm && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              onClick={() => setShowForm(false)}
            />
            <div className="fixed left-1/2 top-1/2 z-50 w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between text-black">
                <div className="font-bold flex gap-2">
                  <span>{categoryName}</span>
                  <h2 className="text-rose-500"> шинээр нэмэх</h2>
                </div>
                <button
                  className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-xl"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <div className="mt-6 flex justify-between gap-4">
                <div className="text-black">
                  <h3 className="text-sm">Food name</h3>
                  <input
                    className="mt-2 h-10 w-60 rounded-lg border px-3 outline-none"
                    placeholder="Type food name"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                  />
                </div>
                <div className="text-black">
                  <h3 className="text-sm">Food price</h3>
                  <input
                    className="mt-2 h-10 w-40 rounded-lg border px-3 outline-none"
                    placeholder="Enter price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 text-black">
                <h3 className="text-sm">Ingredients</h3>
                <textarea
                  className="mt-2 h-24 w-full rounded-lg border px-3 py-2 outline-none"
                  placeholder="List ingredients..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="mt-5 text-black">
                <h3 className="text-sm">Food image (URL)</h3>
                <input
                  className="mt-2 h-10 w-full rounded-lg border px-3 outline-none"
                  placeholder="https://…"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="h-10 w-28 rounded-lg bg-black text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                  onClick={handleAddDish}
                >
                  Add Dish
                </button>
              </div>
            </div>
          </>
        )}
        {toastOpen && (
          <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-lg bg-neutral-900 px-6 py-3 text-white shadow-lg">
              <CheckIcon />
              <span className="text-l">
                New dish is being added to the menu
              </span>
            </div>
          </div>
        )}
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
            onClick={onClose}
          />
          <div className="fixed left-1/2 top-1/2 z-50 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Dishes info</h2>
              <button
                className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-xl"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block text-sm text-neutral-600">
                Dish name
                <input
                  className="mt-2 h-11 w-full rounded-lg border px-3 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label className="block text-sm text-neutral-600">
                Dish category
                {categories.length ? (
                  <select
                    className="mt-2 h-11 w-full rounded-lg border px-3 outline-none"
                    value={form.categoryId}
                    onChange={(e) =>
                      setForm({ ...form, categoryId: e.target.value })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-2 inline-block rounded-full bg-neutral-100 px-4 py-2">
                    {dish?.categoryName ?? "—"}
                  </div>
                )}
              </label>

              <label className="block text-sm text-neutral-600">
                Ingredients
                <textarea
                  className="mt-2 h-28 w-full rounded-lg border px-3 py-2 outline-none"
                  value={form.ingredients}
                  onChange={(e) =>
                    setForm({ ...form, ingredients: e.target.value })
                  }
                />
              </label>

              <label className="block text-sm text-neutral-600">
                Price
                <input
                  className="mt-2 h-11 w-full rounded-lg border px-3 outline-none"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </label>

              <label className="block text-sm text-neutral-600">
                Image
                <input
                  className="mt-2 h-11 w-full rounded-lg border px-3 outline-none"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://…"
                />
              </label>

              <div className="mt-3 flex items-center justify-between">
                <button
                  className="rounded-xl border border-red-200 px-4 py-2 text-red-600"
                  onClick={() => {}}
                >
                  Delete
                </button>
                <button
                  className="rounded-xl bg-black px-5 py-3 text-white"
                  onClick={() =>
                    onSave?.({
                      id: form.id,
                      name: form.name,
                      price: Number(form.price) || 0,
                      ingredients: form.ingredients,
                      image: form.image,
                      categoryId: form.categoryId || undefined,
                    })
                  }
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {toastPen && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-lg bg-neutral-900 px-6 py-3 text-white shadow-lg">
            <CheckIcon />
            <span className="text-l">New dish is being added to the menu</span>
          </div>
        </div>
      )}
    </div>
  );
};
