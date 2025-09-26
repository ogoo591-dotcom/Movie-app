`use client`;
import { useEffect, useRef, useState } from "react";
import { HeroSlide } from "../_component/HeroSlide";
import { ZuunIcon } from "../_icons/ZuunIcon";
import { IconButton } from "../_icons/IconButton";

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
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setNowPlayingMovieData((jsonData.results || []).slice(0, 10));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div className=" w-full h-[600px] bg-gray-200"></div>;
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className=" w-full h-[600px] relative">
      {" "}
      <div className="w-full h-full  absolute top-0 left-0 z-10 flex flex-row justify-start items-center p-10">
        <button
          onClick={scrollLeft}
          className=" h-12  w-12 border-0 flex  rounded-full justify-center items-center  bg-white  "
        >
          <ZuunIcon />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex w-fit h-full overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {nomPlayingMovieData.slice(0, 10).map((movie, index) => (
          <HeroSlide
            key={index}
            name={movie.title}
            imgUrl={movie.backdrop_path}
            text={movie.overview}
          />
        ))}
      </div>
      <div className="w-full h-full  absolute top-0 left-0 z-10 flex flex-row justify-end items-center p-10">
        <button
          onClick={scrollRight}
          className=" h-12  w-12 border-0 flex  rounded-full justify-center items-center  bg-white  "
        >
          <IconButton />
        </button>
      </div>
    </div>
  );
};
