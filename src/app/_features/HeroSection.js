"use client";
import { useEffect, useState } from "react";
import { ZuunIcon } from "../_icons/ZuunIcon";
import { IconButton } from "../_icons/IconButton";
import { HeroSlide } from "../_component/HeroSlide";

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
  const [nowPlayingMovieData, setNowPlayingMovieData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetch(apiLink, options);
      const jsonData = await data.json();
      setNowPlayingMovieData((jsonData.results || []).slice(0, 10));
      setLoading(false);
    };
    getData();
  }, []);

  const total = nowPlayingMovieData.length;
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === Math.max(0, total - 1);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    if (currentIndex > total - 1) setCurrentIndex(0);
  }, [total, currentIndex]);

  const goPrev = () => !atStart && setCurrentIndex((i) => Math.max(0, i - 1));

  const goNext = () =>
    !atEnd && setCurrentIndex((i) => Math.min(total - 1, i + 1));
  const goTo = (i) => setCurrentIndex(i);

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
    return <div className="w-full   md:h-[600px] h-auto  bg-gray-100" />;
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden  bg-white ">
      <div
        className="sm:flex flex sm:h-full h-[300px] sm:w-full w-[550px] transition-transform duration-500 ease-in-out "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {nowPlayingMovieData.map((movie) => (
          <div key={movie.id} className="min-w-full h-full shrink-0">
            <HeroSlide
              name={movie.title}
              imgUrl={movie.backdrop_path}
              text={movie.overview}
              movieId={movie.id}
              rating={movie.vote_average.toFixed(1)}
              onWatchTrailer={() => fetchTrailer(movie.id, movie.title)}
            />
          </div>
        ))}
      </div>
      {!atStart && (
        <div className="absolute inset-y-0 left-0 z-10 sm:flex hidden items-center p-4">
          <button
            onClick={goPrev}
            className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center cursor-pointer"
            aria-label="Previous"
          >
            <ZuunIcon />
          </button>
        </div>
      )}
      {!atEnd && (
        <div className="absolute inset-y-0 right-0 z-10 sm:flex hidden items-center p-4">
          <button
            onClick={goNext}
            className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center cursor-pointer"
            aria-label="Next"
          >
            <IconButton />
          </button>
        </div>
      )}
      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 mb-[320px] sm:mb-0">
          {Array.from({ length: total }).map((_, i) => {
            const active = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active ? "true" : "false"}
                className={[
                  "h-2 rounded-full transition-all cursor-pointer",
                  active
                    ? "w-3 h-3 bg-blue-700 shadow"
                    : "w-3 h-3 bg-white hover:bg-white",
                ].join(" ")}
              />
            );
          })}
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
