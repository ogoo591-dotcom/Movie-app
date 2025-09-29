"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_component/MovieCard";
import { Title } from "./Title";
import { Loading } from "../_component/Loading";

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
export const PopularMovieList = () => {
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
    return <Loading />;
  }

  return (
    <div className="w-ful bg-white relative p-8 ">
      <div>
        <Title name={`Popular `} />
        <div className="flex flex-wrap gap-8 justify-center ">
          {popularMovieData.slice(0, 10).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                name={movie.title}
                imgUrl={movie.backdrop_path}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
