"use client";
import { useState } from "react";
import { IconButton } from "../_icons/IconButton";
import { ZuunIcon } from "../_icons/ZuunIcon";

export const NextPrevious = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < 5) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full bg-white relative flex justify-end p-4">
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex justify-center items-center gap-2 px-2 py-1 rounded disabled:opacity-50"
        >
          <ZuunIcon />
          <p>Previous</p>
        </button>

        {[...Array(5)].map((_, index) => {
          const page = index + 1;
          return (
            <div
              key={page}
              onClick={() => handlePageClick(page)}
              className={`w-10 h-10 flex justify-center items-center border rounded-xl cursor-pointer ${
                currentPage === page
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </div>
          );
        })}
        <button
          onClick={handleNext}
          disabled={currentPage === 5}
          className="flex justify-center items-center gap-2 px-2 py-1 rounded disabled:opacity-50"
        >
          <p>Next</p>
          <IconButton />
        </button>
      </div>
    </div>
  );
};
