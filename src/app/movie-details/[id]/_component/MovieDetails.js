"use client";
import { Loading } from "@/app/_component/Loading";
import { StarIcon } from "@/app/_icons/StarIcon";
import { WatchIcon } from "@/app/_icons/WatchIcon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!id) return;
    const apiLink = `https://api.themoviedb.org/3/movie/${id}?language=en--US&append_to_response=credits`;

    const getData = async () => {
      setLoading(true);
      const res = await fetch(apiLink, options);
      const json = await res.json();
      setMovie(json);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (!id) return <div className="p-6 text-red-600">Invalid movie id</div>;
  if (loading) return <div className="p-6">Loading…</div>;
  if (!movie) return <div className="p-6">Not found</div>;

  const crew = movie?.credits?.crew ?? [];
  const cast = movie?.credits?.cast ?? [];

  const directors = crew.filter((c) => c.job === "Director").map((c) => c.name);

  const writers = crew
    .filter(
      (c) =>
        c.department === "Writing" ||
        ["Writer", "Screenplay", "Story", "Novel", "Teleplay"].includes(c.job)
    )
    .map((c) => c.name)
    .slice(0, 3);

  const stars = [...cast]
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map((c) => c.name);

  const fetchTrailer = async (movieId, movieTitle) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const json = await res.json();
      const list = Array.isArray(json.results) ? json.results : [];
      const pick =
        list.find(
          (v) =>
            v.site === "YouTube" &&
            v.type === "Trailer" &&
            /official/i.test(v.name)
        ) ||
        list.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        list.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
        list.find((v) => v.site === "YouTube");

      if (pick?.key) {
        setTrailerKey(pick.key);
        setShowTrailer(true);
      } else {
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            `${movieTitle} trailer`
          )}`,
          "_blank"
        );
      }
    } catch (e) {
      console.error("Trailer fetch failed:", e);
    }
    console.log(pick);
  };

  const handleTrailerButton = () => fetchTrailer(movie.id, movie.title);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col  w-[1440px] h-auto items-center bg-white py-10 px-45 gap-8">
      <div className="flex flex-col  gap-6">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-1">
            <p className="text-[36px] font-bold">{movie.title}</p>
            <p className="text-[18px]">
              {movie.release_date} · {movie.runtime}m
            </p>
          </div>
          <div>
            <h3>Rating</h3>
            <div className="flex gap-1 items-center">
              <StarIcon />
              <span className="text-lg font-medium text-black">
                {movie.vote_average}
              </span>
              <span className="text-lg font-medium text-gray-400">/10</span>
            </div>
            <p className="text-lg font-normal text-gray-500 flex justify-center">
              {movie.vote_count}k
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <img
            className="w-[300px]  h-[428px]"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="relative ">
            <img
              className="w-[780px]  h-[428px]"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            />{" "}
            <div className=" absolute inset-0 z-20 ml-5 mt-90 flex gap-3">
              <button
                onClick={handleTrailerButton}
                className=" h-[45px]  w-[45px] border-0 border-gray-200  border-gr flex  rounded-full justify-center items-center gap-2 bg-white text-sm "
              >
                <WatchIcon />
              </button>
              <p className="text-white font-medium text-xl flex justify-center mt-2">
                Play trailer{" "}
              </p>
              <span className="text-white font-medium text-xl flex justify-center mt-2">
                2:35
              </span>
            </div>
            {showTrailer && trailerKey && (
              <div
                className="fixed inset-0 z-[120] bg-black/75 flex items-center justify-center p-4"
                onClick={() => {
                  setShowTrailer(false);
                  setTrailerKey("");
                }}
              >
                <div
                  className="relative w-full max-w-[1100px] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setShowTrailer(false);
                      setTrailerKey("");
                    }}
                    className="absolute left-3 top-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white text-xl grid place-items-center"
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 flex-wrap">
            {movie.genres?.map((genre, index) => (
              <button
                key={index}
                className="h-7  flex items-center gap-5-2 px-4 cursor-pointer text-l font-bold border rounded-full border-[#ddd]"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        <p className="w-full ">{movie.overview}</p>
        <div className=" flex flex-col gap-8">
          <div className=" text-xl border-b border-[#ddd] py-2 font-bold flex gap-15">
            Director{" "}
            <p className="font-normal">
              {directors.length ? directors.join(" · ") : "-"}
            </p>
          </div>
          <div className="text-xl border-b border-[#ddd] py-2 font-bold flex gap-15">
            Writers{" "}
            <p className="font-normal px-2">
              {writers.length ? writers.join(" · ") : "-"}
            </p>
          </div>
          <div className="text-xl border-b border-[#ddd] py-2 font-bold flex gap-15">
            Stars{" "}
            <p className="font-normal px-6">
              {stars.length ? stars.join(" · ") : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
