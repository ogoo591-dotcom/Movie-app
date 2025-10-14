"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MovieCard } from "@/app/_component/MovieCard";
import { ZuunIcon } from "@/app/_icons/ZuunIcon";
import { IconButton } from "@/app/_icons/IconButton";
import { Loading } from "@/app/_component/Loading";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function GenrePage() {
  const params = useParams();
  const router = useRouter();
  const genreId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [genreName, setGenreName] = useState("Genre");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        const j = await r.json();
        const list = Array.isArray(j.genres) ? j.genres : [];
        setGenres(list);
        const found = list.find((g) => String(g.id) === String(genreId));
        setGenreName(found?.name || "Genre");
      } catch (e) {
        console.error("genres fetch error:", e);
      }
    })();
  }, [genreId]);

  useEffect(() => {
    if (!genreId) return;
    (async (pageNum) => {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${page}`;
        const res = await fetch(url + pageNum, options);
        const j = await res.json();
        setMovies(j.results || []);
        console.log("hhhhehhhhehhhhehheeeeee", setMovies);

        setTotalPages(Number(j.total_pages) || totalPages);
        setTotalResults(Number(j.total_results || 0));
      } catch (e) {
        console.error("discover error:", e);
        setMovies([]);
        setTotalPages(1);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [genreId, page]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };
  const handlePrevious = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePageClick = (page) => setPage(page);

  if (!genreId) return <div className="p-6 text-red-600">Invalid genre id</div>;
  if (loading) return <Loading />;

  return (
    <div className="p-6 lg:p-8 grid grid-cols-1 sm:lg:grid-cols-[260px_1fr] gap-8 bg-white">
      <aside className=" lg:block">
        <h2 className="text-2xl font-semibold mb-1">Search filter</h2>
        <div className="py-5">
          <h3 className="text-xl font-semibold">Genres</h3>
          <p className="text-gray-500">See lists of movies by genre</p>
          <hr className="my-4 " />
          <div className="flex flex-wrap gap-3">
            {genres.map((g) => (
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

      <section>
        <h1 className="text-lg font-semibold mb-4">
          {totalResults.toLocaleString()} titles in &ldquo;{genreName}&ldquo;
        </h1>
        <div className="sm:flex-wrap flex flex-wrap sm:gap-8 gap-5 sm:justify-center min-h-[800px]">
          {movies.slice(0, 8).map((m) => (
            <MovieCard
              key={m.id}
              movieId={m.id}
              name={m.title}
              imgUrl={m.poster_path || m.backdrop_path}
              rating={Number(m.vote_average ?? 0).toFixed(1)}
            />
          ))}
        </div>

        <div className="sm:flex flex flex-row justify-end items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="flex justify-center items-center cursor-pointer gap-2 px-2 py-1 rounded disabled:opacity-50"
          >
            <ZuunIcon />
            <p className="max-sm:hidden">Previous</p>
          </button>

          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => handlePageClick(p)}
                className={` ${
                  page === p
                    ? "max-w-30 h-10 min-w-10 flex justify-center items-center border rounded-xl cursor-pointer hover:bg-gray-200"
                    : "max-w-30 h-10  min-w-10  rounded-xl cursor-pointer hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="flex justify-center items-center cursor-pointer gap-2 px-2 py-1 rounded disabled:opacity-50 "
          >
            <p className="max-sm:hidden"> Next</p>
            <IconButton />
          </button>
        </div>
      </section>
    </div>
  );
}
