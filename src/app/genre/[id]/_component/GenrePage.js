"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MovieCard } from "@/app/_component/MovieCard";
import { Loading } from "@/app/_component/Loading";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer YOUR_TMDB_READ_TOKEN",
  },
};

export default function GenrePage() {
  const params = useParams();
  const router = useRouter();
  const genreId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [genreName, setGenreName] = useState("Genre");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    (async () => {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${page}`;
        const res = await fetch(url, options);
        const j = await res.json();
        setMovies(j.results || []);
        setTotalPages(Number(j.total_pages) || 1);
      } catch (e) {
        console.error("discover error:", e);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    })();
  }, [genreId, page]);

  if (!genreId) return <div className="p-6 text-red-600">Invalid genre id</div>;
  if (loading) return <Loading />;

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 bg-white">
      <aside className="hidden lg:block">
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
          {genreName} <span className="text-gray-500 font-normal">movies</span>
        </h1>

        <div className="flex flex-wrap gap-6">
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

        <div className="flex flex-row justify-end items-center gap-2 mt-6">
          <button
            onClick={prev}
            disabled={page === 1}
            className="px-3 py-1 rounded disabled:opacity-50"
          >
            ‹ Previous
          </button>
          <span className="w-10 h-10 flex justify-center items-center border rounded-xl">
            {page}
          </span>
          <button
            onClick={next}
            disabled={page === totalPages}
            className="px-3 py-1 rounded disabled:opacity-50"
          >
            Next ›
          </button>
        </div>
      </section>
    </div>
  );
}
