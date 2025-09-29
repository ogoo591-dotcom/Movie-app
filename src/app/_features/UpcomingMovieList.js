"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_component/MovieCard";
import { Title } from "./Title";
import { Loading } from "../_component/Loading";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const UpcomingMovieList = () => {
  const [upcomingMovieData, setUpcomingMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const apiLink = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setUpcomingMovieData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white relative p-8 ">
      <div>
        <Title name={`Upcoming`} />
        <div className="flex flex-wrap gap-8 justify-center ">
          {upcomingMovieData.slice(0, 10).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                name={movie.title}
                imgUrl={movie.backdrop_path}
                rating={movie.vote_average?.toFixed(1)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
