"use client";
import { useEffect } from "react";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 9648, name: "Mystery" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 36, name: "History" },
  { id: 10770, name: "TV Movie" },
  { id: 10762, name: "Kids" },
];

export default function GenreSheet({ open, onClose, onPick }) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[80] md:hidden"
    >
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="absolute ml-10 inset-x-0 top-0 h-[40vh] w-[80vw] mt-15 mx-2 rounded-lg bg-white shadow-2xl overflow-hidden">
        <div className="px-5 pb-6 overflow-y-auto h-[calc(92vh-56px)]">
          <h2 className="text-3xl mt-6 font-extrabold mb-2">Genres</h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 mb-4">
            See lists of movies by genre
          </p>
          <hr className="border-gray-300 dark:border-neutral-800 mb-5" />

          <div className="flex flex-wrap gap-3">
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => onPick?.(g)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-neutral-700 px-3 py-1 text-xs font-semibold hover:bg-gray-200"
              >
                {g.name}
                <span className="opacity-60">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
