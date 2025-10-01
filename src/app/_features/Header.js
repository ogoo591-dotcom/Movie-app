"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SearchIcon } from "../_icons/SearchIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GenresList from "./GenresList";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

const buildSearchUrl = (q, page = 1) =>
  `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    q
  )}&include_adult=false&language=en-US&page=${page}`;

export const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full h-[59px] justify-between px-[16px] bg-white ">
      <div
        className="max-w-[1280px] h-[36px] justify-between items-center p-8 flex flex-row 
"
      >
        <img
          className="h-[20px]  w-[92px] gap-8  "
          src="/Light-mode.png"
          alt="logo"
        />
        <div className="flex flex-row gap-12 w-[488px] h-[36px] justify-center items-center ">
          <GenresList />
          <div className="h-[36px]  w-[379px] gap-4 border-2 border-gray-200 flex rounded-lg items-center px-3">
            <SearchIcon />
            <input
              className="text-sm font-medium text-gray-500 border-0"
              placeholder="Search..."
            />
          </div>
        </div>
        <div>
          {mounted &&
            (currentTheme === "dark" ? (
              <button>
                <img
                  className="h-[36px] cursor-pointer hover:text-amber-500 w-[36px] gap-12"
                  src="/Icon-Button.png"
                  onClick={() => setTheme("light")}
                />
              </button>
            ) : (
              <button>
                <img
                  className="h-[36px] cursor-pointer hover:text-amber-500 w-[36px] gap-12"
                  src="/Icon-Button.png"
                  onClick={() => setTheme("dark")}
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
