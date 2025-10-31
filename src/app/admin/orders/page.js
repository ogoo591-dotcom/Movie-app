"use client";
import { CarIcon } from "lucide-react";
import { OrderCards } from "../../_component/OrderCards";
import { CancelledIcon } from "../../_icons/Cancelled";
import { Logo3Icon } from "../../_icons/Logo3";
import { SettingIcon } from "../../_icons/Setting";
import { FoodIcon } from "@/app/_icons/FoodMenu";
import { IconButton } from "@/app/_icons/IconButton";
import { ZuunIcon } from "@/app/_icons/ZuunIcon";
import { useEffect, useState } from "react";

export default function Home() {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setOrder();
      } catch (e) {
        console.error("genres fetch error:", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!order) return;
    (async () => {
      try {
        setTotalPages(Math.max(1, Math.min(500, apiTotal)));
        setTotalResults(Number(j.total_results || 0));
      } catch (e) {
        setTotalPages(1);
        setTotalResults(0);
      }
    })();
  }, [page]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };
  const handlePrevious = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePageClick = (page) => setPage(page);

  return (
    <div className="w-[1440px] h-[1024px] m-auto bg-gray-100 flex flex-wrap  mt-10 gap-3">
      <div className="h-[1024px] w-[204px] bg-white gap-10 py-9 flex flex-col">
        <Logo3Icon />
        <div className="flex justify-center items-center gap-2 h-10 w-40 hover:bg-black hover:text-white rounded-full">
          <FoodIcon />
          <p>Food menu</p>
        </div>
        <div className="flex justify-center items-center gap-2 h-10 w-40 hover:bg-black hover:text-white rounded-full">
          <CarIcon />
          Orders
        </div>
        <div className="flex justify-center items-center gap-2 h-10 w-40 hover:bg-black hover:text-white rounded-full hover:ml-2">
          <SettingIcon />
          <p>Settings</p>
        </div>
      </div>
      <div className="w-[1171px] h-[948px]  ">
        <img className="w-9 h-9 rounded-full mt-5 ml-280" src="../User.jpg" />
        <div className="w-[1171px] h-[948px]  bg-white border rounded-xl">
          <div className="w-full h-[60px] flex  items-center px-5 bg-white gap-10 text-sm  ">
            <div className="flex flex-col ml-15 w-100 justify-center">
              <h2 className="font-bold text-xl">Orders</h2>
              <p className="text-l">32 items</p>
            </div>
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2 bg-white text-[12px]">
              <input
                type="date"
                name="date"
                className="appearance-none bg-transparent text-neutral-900 focus:outline-none
               [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <span className="text-neutral-400">-</span>
              <input
                type="date"
                name="date_to"
                className="appearance-none bg-transparent text-neutral-900 focus:outline-none
               [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
            <button className="w-60 h-9 flex justify-center items-center gap-5 p-4 font-medium bg-black text-white rounded-full">
              <h1 className="text-l">Change delivery state</h1>
              <div className="h-6 w-7  bg-white rounded-full text-black text-sm flex justify-center items-center">
                1
              </div>
            </button>
          </div>
          <div className="w-full h-[60px] flex  items-center bg-gray-100 gap-10  ">
            <input className="ml-15" type="checkbox" />
            <p>№</p>
            <p className="w-28">Customer</p>
            <div className="flex gap-10 justify-center items-center">
              <h2>Food</h2>
              <CancelledIcon />
            </div>
            <div className="w-20">Date</div>
            <p className="w-15">Total</p>
            <h1 className="w-55">Delivery Address</h1>
            <button className="w-45 h-8 flex justify-center items-center gap-5 p-4 font-medium">
              <h1>Delivery state</h1>
              <CancelledIcon />
            </button>
          </div>
          <OrderCards />
          <OrderCards />
          <OrderCards />
          <OrderCards />
          <OrderCards />
          <div className="flex flex-row justify-end items-end mt-10  gap-2">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="flex justify-center items-center cursor-pointer gap-2 px-2 py-1 rounded disabled:opacity-50"
            >
              <ZuunIcon />
            </button>

            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  onClick={() => handlePageClick(p)}
                  className={` ${
                    page === p
                      ? " h-9 w-9 flex justify-center items-center border bg-gray-100 rounded-full cursor-pointer hover:bg-gray-600"
                      : " h-9 w-9  rounded-xl cursor-pointer hover:bg-gray-600"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="flex justify-center items-center cursor-pointer gap-2 px-2 py-1 rounded disabled:opacity-50 "
            >
              <IconButton />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
