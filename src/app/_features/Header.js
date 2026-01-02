"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "../_icons/SearchIcon";
import { MovieIcon } from "../_icons/MovieIcon";
import GenreList from "./GenreList";
import { SearchButton } from "../_component/SearchButton";
import { ThemeToggle } from "../_component/themeToggle";
import GenreSheet from "../_component/GenreSheet";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

function Spinner({ size = 24, stroke = 2 }) {
  return (
    <span
      aria-label="Loading"
      className="inline-block animate-spin rounded-full border-gray-300 border-t-transparent"
      style={{ width: size, height: size, borderWidth: stroke }}
    />
  );
}

export const Header = () => {
  const router = useRouter();

  const [searchItem, setSearchItem] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [showMobileBar, setShowMobileBar] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [query, setQuery] = useState("");

  const [mData, setMData] = useState([]);
  const [mLoading, setMLoading] = useState(false);
  const [mOpen, setMOpen] = useState(false);

  const boxRef = useRef(null);

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
    const q = searchItem.trim();
    if (!q) {
      setApiData([]);
      setOpen(false);
      return;
    }

    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        setOpen(true);
        const url =
          `https://api.themoviedb.org/3/search/movie?` +
          `query=${encodeURIComponent(
            q
          )}&language=en-US&page=1&include_adult=false`;
        const res = await fetch(url, { ...options, signal: ctrl.signal });
        const json = await res.json();
        const list = Array.isArray(json.results) ? json.results : [];
        setApiData(list.slice(0, 5));
      } catch (e) {
        if (!ctrl.signal.aborted) {
          console.error("search error:", e);
          setApiData([]);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [searchItem]);

  useEffect(() => {
    const q = query.trim();
    if (!showMobileBar) return;
    if (!q) {
      setMData([]);
      setMOpen(false);
      return;
    }

    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        setMLoading(true);
        setMOpen(true);
        const url =
          `https://api.themoviedb.org/3/search/movie?` +
          `query=${encodeURIComponent(
            q
          )}&language=en-US&page=1&include_adult=false`;
        const res = await fetch(url, { ...options, signal: ctrl.signal });
        const json = await res.json();
        setMData(Array.isArray(json.results) ? json.results.slice(0, 5) : []);
      } catch (e) {
        if (!ctrl.signal.aborted) setMData([]);
      } finally {
        setMLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, showMobileBar]);

  const goAllDesktop = () => {
    const q = searchItem.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search/${encodeURIComponent(q)}`);
  };

  const goAllMobile = () => {
    const q = query.trim();
    if (!q) return;
    setShowMobileBar(false);
    router.push(`/search/${encodeURIComponent(q)}`);
  };

  const goGenre = (g) => {
    setShowGenre(false);
    setShowMobileBar(false);
    router.push(`/genre/${g.id}`);
  };

  const hasQuery = !!searchItem.trim();

  return (
    <div className="w-full  bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-[1280px] h-[56px] justify-between items-center px-4 sm:px-6 flex gap-4 mx-auto">
        <button
          onClick={() => router.push("/")}
          aria-label="Go home"
          className="shrink-0"
        >
          <MovieIcon />
        </button>
        <div className="hidden md:flex items-center gap-6">
          <GenreList />
          <div ref={boxRef} className="relative">
            <div className="h-9 w-[380px] gap-3 border-2 border-gray-200 flex rounded-lg items-center px-3  bg-white dark:bg-black text-black dark:text-white">
              <button
                onClick={() => setOpen((v) => (searchItem.trim() ? !v : v))}
                className="shrink-0"
                aria-label="Toggle suggestions"
              >
                <SearchIcon />
              </button>
              <input
                className="w-full text-sm  outline-none  bg-white dark:bg-black text-black dark:text-white placeholder-gray-500"
                placeholder="Search..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goAllDesktop()}
              />
            </div>

            {hasQuery && open && (
              <div className="absolute top-11 z-50 w-[560px] max-w-[95vw] max-h-[70vh] overflow-auto border border-gray-200 rounded-xl shadow-xl  bg-white dark:bg-black text-black dark:text-white">
                {loading ? (
                  <div className="grid place-items-center py-10 ">
                    <Spinner size={28} stroke={3} />
                  </div>
                ) : apiData.length > 0 ? (
                  <>
                    {apiData.map((m) => (
                      <SearchButton
                        key={m.id}
                        movieId={m.id}
                        name={m.title}
                        imgUrl={m.poster_path}
                        rating={Number(m.vote_average ?? 0).toFixed(1)}
                        year={(m.release_date || "").slice(0, 4)}
                        seeMoreHref={`/movie-details/${m.id}`}
                        onPick={() => {
                          setOpen(false);
                          setSearchItem("");
                        }}
                      />
                    ))}
                    <button
                      className="px-4 py-3 text-left text-sm w-full  bg-white dark:bg-black text-black dark:text-white"
                      onClick={goAllDesktop}
                    >
                      See all results for “{searchItem.trim()}”
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-6 text-gray-600  bg-white dark:bg-black  dark:text-white">
                    No results found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="md:hidden h-9 w-9 grid place-items-center rounded-lg border border-gray-300"
            onClick={() => setShowMobileBar(true)}
            aria-label="Open search"
          >
            <SearchIcon />
          </button>
          <div className="relative z-[60]">
            <ThemeToggle />
          </div>
        </div>

        {showMobileBar && (
          <div className="sm:hidden fixed inset-x-0 top-0 z-[70] bg-white border-b border-gray-200">
            <div className="mx-auto max-w-[1280px] flex items-center gap-3 p-3 relative">
              <button
                onClick={() => setShowGenre(true)}
                aria-label="Open genres"
                className="h-9 w-9 grid place-items-center rounded-lg border border-gray-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="flex-1 h-9 flex items-center gap-2 rounded-lg px-3 border-2 border-gray-200 bg-white">
                <SearchIcon />
                <input
                  autoFocus
                  className="w-full text-black text-sm outline-none"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && goAllMobile()}
                />
                {query && (
                  <button
                    className="text-xl leading-none px-1"
                    onClick={() => setQuery("")}
                    aria-label="Clear"
                  >
                    ×
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowMobileBar(false)}
                aria-label="Close search"
                className="h-9 w-9 grid place-items-center rounded-lg"
              >
                <span className="text-lg leading-none">✕</span>
              </button>

              <GenreSheet
                open={showGenre}
                onClose={() => setShowGenre(false)}
                onPick={goGenre}
              />
            </div>
          </div>
        )}
        {showMobileBar && mOpen && (
          <div
            className="md:hidden fixed inset-x-0 top-[56px] z-[70] max-h-[60vh] overflow-auto
                  bg-white border-t border-gray-200"
          >
            {mLoading ? (
              <div className="grid place-items-center py-10">
                <Spinner size={28} stroke={3} />
              </div>
            ) : mData.length ? (
              <>
                {mData.map((m) => (
                  <SearchButton
                    key={m.id}
                    movieId={m.id}
                    name={m.title}
                    imgUrl={m.poster_path}
                    rating={Number(m.vote_average ?? 0).toFixed(1)}
                    year={(m.release_date || "").slice(0, 4)}
                    onPick={() => {
                      setShowMobileBar(false);
                      setMOpen(false);
                      setQuery("");
                      router.push(`/movie-details/${m.id}`);
                    }}
                  />
                ))}
                <button
                  className="w-full text-left px-4 py-3 text-sm underline cursor-pointer"
                  onClick={() => {
                    setShowMobileBar(false);
                    router.push(`/search/${encodeURIComponent(query.trim())}`);
                  }}
                >
                  See all results for “{query.trim()}”
                </button>
              </>
            ) : (
              <div className="px-4 py-6 text-gray-500">No results found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
