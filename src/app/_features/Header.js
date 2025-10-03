"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SearchIcon } from "../_icons/SearchIcon";
import { useRouter } from "next/navigation";
import { MovieIcon } from "../_icons/MovieIcon";
import { MoonIcon } from "../_icons/MoonIcon";
import GenreList from "./GenreList";

export const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full h-[59px] justify-between px-[16px] bg-white ">
      <div
        className="max-w-[1280px] h-[36px] justify-between items-center p-8 flex flex-row 
"
      >
        <div onClick={() => router.push("/")} aria-label="Go home">
          <MovieIcon />
        </div>

        <div className="flex flex-row gap-12 w-[488px] h-[36px] justify-center items-center ">
          <GenreList />
          <div className="h-[36px]  w-[379px] gap-4 border-2 border-gray-200 flex rounded-lg items-center px-3">
            <SearchIcon />
            <input
              className="text-sm font-medium border-none text-black "
              placeholder="Search..."
            />
          </div>
        </div>
        <div>
          {mounted &&
            (currentTheme === "dark" ? (
              <button onClick={() => setTheme("light")} aria-label="Light mode">
                <img
                  className="h-[36px] w-[36px]"
                  // src="/Icon-Button.png"
                  // alt="light"
                />
              </button>
            ) : (
              <button onClick={() => setTheme("dark")} aria-label="Dark mode">
                <div className="h-[36px] w-[36px] ">
                  <MoonIcon />
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
