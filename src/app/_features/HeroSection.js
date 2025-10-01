"use client";
import { useEffect, useState } from "react";
import { HeroSlide } from "../_component/HeroSlide";
import { ZuunIcon } from "../_icons/ZuunIcon";
import { IconButton } from "../_icons/IconButton";
import { Loading } from "../_component/Loading";

const apiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const HeroSection = () => {
  const [nomPlayingMovieData, setNowPlayingMovieData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetch(apiLink, options);
      const jsonData = await data.json();
      setNowPlayingMovieData((jsonData.results || []).slice(0, 5));
      setLoading(false);
    };
    getData();
  }, []);

  const total = nomPlayingMovieData.length;
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === Math.max(0, total - 1);

  const goPrev = () => {
    if (atStart) return;
    setCurrentIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    if (atEnd) return;
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  };

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
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {nomPlayingMovieData.map((movie) => (
          <div key={movie.id} className="min-w-full h-full shrink-0">
            <HeroSlide
              name={movie.title}
              imgUrl={movie.backdrop_path}
              text={movie.overview}
              movieId={movie.id}
              onWatchTrailer={() => fetchTrailer(movie.id, movie.title)}
            />
          </div>
        ))}
      </div>
      {!atStart && (
        <div className="absolute inset-y-0 left-0 z-10 flex items-center p-4">
          <button
            onClick={goPrev}
            className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center"
            aria-label="Previous"
          >
            <ZuunIcon />
          </button>
        </div>
      )}
      {!atEnd && (
        <div className="absolute inset-y-0 right-0 z-10 flex items-center p-4">
          <button
            onClick={goNext}
            className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center"
            aria-label="Next"
          >
            <IconButton />
          </button>
        </div>
      )}
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
  );
};
