//
"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function GenreList() {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);
  const router = useRouter();

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

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          { ...options, signal: ctrl.signal }
        );
        const j = await res.json();
        if (!alive) return;
        setGenres(Array.isArray(j.genres) ? j.genres : []);
      } catch (e) {
        if (!ctrl.signal.aborted);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, []);

  const handleClick = (g) => {
    router.push(`/genre/${g.id}`);
    setOpen(false);
  };
  return (
    <div ref={boxRef} className="relative ">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="h-[36px] w-[97px] border-2 border-gray-200  bg-white dark:bg-black text-black dark:text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer"
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
        <span className="text-sm cursor-pointer">Genre</span>
      </button>

      <div
        className={`absolute left-0 z-50 mt-3 w-[550px] rounded-lg border border-gray-200 bg-white dark:bg-black text-black dark:text-white shadow-xl transition
        ${
          open
            ? "opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <div className="p-5">
          <h3 className="text-2xl font-semibold">Genres</h3>
          <p className="text-gray-500">See lists of movies by genre</p>
          <hr className="my-4" />{" "}
          {loading && <div className="text-sm text-gray-500">Loading…</div>}
          {!loading && (
            <div className="flex flex-wrap gap-3">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleClick(g)}
                  className="group inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1  text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {g.name === "Science Fiction" ? "Sci-Fi" : g.name}
                  <span className="opacity-60 group-hover:opacity-100">›</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
