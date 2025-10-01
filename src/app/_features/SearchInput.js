"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function SearchInput({ className = "" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const boxRef = useRef(null);
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  // гадна дарвал хаах
  useEffect(() => {
    const onClick = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // хайлт (debounce 300ms)
  useEffect(() => {
    if (!q || q.trim().length < 2) {
      setItems([]);
      setLoading(false);
      setErr("");
      return;
    }

    setLoading(true);
    setErr("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const url = `https://api.themoviedb.org/3 /search/movie?query=${searchValue}&language=en-US&page=${page}`;
        const res = await fetch(url, {
          headers: HEADERS,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
        const json = await res.json();
        setItems(Array.isArray(json.results) ? json.results : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Search failed");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  const Row = ({ m }) => {
    const title = m.title ?? m.name ?? "Untitled";
    const year = (m.release_date || m.first_air_date || "").slice(0, 4);
    const rating = (m.vote_average ?? 0).toFixed(1);
    const img = m.poster_path
      ? `https://image.tmdb.org/t/p/w154/${m.poster_path}`
      : "/no-poster.png";

    return (
      <li className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50">
        <img src={img} alt={title} className="w-12 h-16 rounded object-cover" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{title}</div>
          <div className="text-sm text-gray-600">
            ⭐ {rating}
            <span className="text-gray-400">/10</span>
          </div>
          <div className="text-sm text-gray-500">{year || "—"}</div>
        </div>

        <Link
          href={`/movie-detail/${m.id}`} // ← абсолют зам
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
          onClick={() => setOpen(false)}
        >
          See more →
        </Link>
      </li>
    );
  };

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      {/* input */}
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search…"
        className="w-full h-full rounded-lg border border-gray-300 bg-white/80 px-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-[520px] max-w-[90vw] rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          {q && (
            <div className="px-3 py-2 text-sm text-gray-500 border-b">
              Results for “{q}”
            </div>
          )}

          {loading && <div className="px-3 py-4 text-sm">Searching…</div>}
          {err && !loading && (
            <div className="px-3 py-4 text-sm text-red-600">Error: {err}</div>
          )}

          {!loading && !err && (
            <>
              {items.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-600">
                  No results
                </div>
              ) : (
                <ul className="max-h-[420px] overflow-auto divide-y">
                  {items.slice(0, 5).map((m) => (
                    <Row key={m.id} m={m} />
                  ))}
                </ul>
              )}

              {items.length > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(q.trim())}`}
                  className="block px-3 py-3 text-sm text-blue-600 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  See all results for “{q}”
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
