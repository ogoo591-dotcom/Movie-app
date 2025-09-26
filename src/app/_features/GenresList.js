"use client";
import { useEffect, useState } from "react";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

export default function GenresList({ onSelect }) {
  const [open, setOpen] = useState(false);
  const boxRef = null;

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-2xl border px-4 py-2 bg-white shadow-sm hover:bg-gray-50"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={`transition ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm">Genre</span>
      </button>

      <div
        className={`absolute left-0 z-50 mt-3 w-[640px] max-w-[92vw] rounded-2xl border bg-white shadow-xl transition
        ${
          open
            ? "opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <div className="p-5">
          <h3 className="text-2xl font-semibold">Genres</h3>
          <p className="text-gray-500">See lists of movies by genre</p>
          <hr className="my-4" />
          <div className="flex flex-wrap gap-3">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => {
                  onSelect?.(g);
                  setOpen(false);
                }}
                className="group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                {g}
                <span className="opacity-60 group-hover:opacity-100">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
