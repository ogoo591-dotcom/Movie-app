"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_component/MovieCard";
import { PopularTitle } from "./Title";

const apiLink =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const AllPopularMovieList = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setPopularMovieData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="w-ful bg-white relative p-8 ">
      <div>
        <PopularTitle name={`Popular `} />
        <div className="flex flex-wrap gap-8 justify-center ">
          {popularMovieData.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                name={movie.title}
                imgUrl={movie.backdrop_path}
                rating={movie.rating}
                movieId={movie.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
