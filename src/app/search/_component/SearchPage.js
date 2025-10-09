"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { MovieCard } from "@/app/_component/MovieCard";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 36, name: "History" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
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
];

const buildSearchUrl = (q, p = 1) =>
  `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    q
  )}&language=en-US&page=${p}&include_adult=false`;

export default function SearchPage() {
  const { value } = useParams() || {};
  const sp = useSearchParams();
  const router = useRouter();

  const initialQuery = (value ?? sp.get("query") ?? "").trim();
  const pageParam = parseInt(sp.get("page") || "1", 10);

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(pageParam);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(initialQuery);
    setPage(pageParam);
  }, [initialQuery, pageParam]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setTotalResults(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }
    let alive = true;
    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(buildSearchUrl(query, page), {
          ...options,
          signal: ctrl.signal,
        });
        const json = await res.json();
        if (!alive) return;

        setResults(Array.isArray(json.results) ? json.results : []);
        setTotalResults(Number(json.total_results || 0));
        setTotalPages(Number(json.total_pages || 1));
      } catch (e) {
        if (!ctrl.signal.aborted) {
          console.error("search error:", e);
          setResults([]);
          setTotalResults(0);
          setTotalPages(1);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, [query, page]);

  const goPage = (p) => {
    const np = Math.max(1, Math.min(totalPages, p));
    if (value) {
      router.push(`/search/${encodeURIComponent(value)}?page=${np}`);
    } else {
      router.push(`/search?query=${encodeURIComponent(query)}&page=${np}`);
    }
  };
  const prev = () => goPage(page - 1);
  const next = () => goPage(page + 1);

  if (loading) return <div>Loading...</div>;

  return (
    <div className=" py-20 lg:px-8 flex w-full justify-between bg-white pb-80">
      <div className="mx-auto max-w-[1280px] w-full border-r border-gray-400">
        <div>
          <h1 className="text-2xl ml-10 font-semibold mb-4">Search results</h1>
        </div>
        <div>
          <p className="text-black ml-10 font-medium text-xl mb-6">
            {totalResults} results for “{query}”
          </p>
          {results.length === 0 ? (
            <div className="text-black border border-gray-300 rounded-lg h-30 flex justify-center items-center">
              No results found.
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 px-10">
              {results.slice(0, 8).map((m) => (
                <MovieCard
                  key={m.id}
                  movieId={m.id}
                  name={m.title}
                  imgUrl={m.poster_path || m.backdrop_path}
                  rating={Number(m.vote_average ?? 0).toFixed(1)}
                />
              ))}
            </div>
          )}
          <div className="flex flex-row justify-end items-center gap-2 px-20 mt-6">
            <button
              onClick={prev}
              disabled={page <= 1}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              ‹ Previous
            </button>
            <span className="w-10 h-10 flex justify-center items-center border rounded-xl">
              {page}
            </span>
            <button
              onClick={next}
              disabled={page >= totalPages}
              className="px-3 py-1 rounded disabled:opacity-50"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
      <aside className="hidden mt-6 lg:block max-w-[300px] pl-5 ">
        <h2 className="text-2xl font-semibold mb-1">Search filter</h2>
        <div className="py-5">
          <p className="text-gray-500">See lists of movies by genre</p>
          <div className="flex flex-wrap mt-5 gap-3">
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setPage(1);
                  router.push(`/genre/${g.id}`);
                }}
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-bold hover:bg-gray-100"
              >
                {g.name === "Science Fiction" ? "Sci-Fi" : g.name}
                <span className="opacity-60 group-hover:opacity-100">›</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
