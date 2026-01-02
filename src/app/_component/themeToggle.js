"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Allow render only after hydration to avoid theme mismatch on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9 grid place-items-center rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
