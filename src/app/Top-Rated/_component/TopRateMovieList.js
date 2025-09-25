"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../../_component/MovieCard";
import { TopRatedTitle } from "./Title";

const apiLink =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const TopRateMovieList = () => {
  const [topRatedMovieData, setTopRatedMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setTopRatedMovieData(jsonData.results);
    setLoading(false);
  };

  console.log("loading", loading);
  console.log("top-rated", topRatedMovieData);

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="w-ful bg-white relative p-8 ">
      <div>
        <TopRatedTitle name={`Top-Rated `} />
        <div className="flex flex-wrap gap-8 justify-center ">
          {topRatedMovieData.slice(0, 10).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                name={movie.title}
                imgUrl={movie.backdrop_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
