"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_component/MovieCard";
import { Loading } from "@/app/_component/Loading";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SeeMore } from "@/app/_icons/Seemore";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const MoreLikeThis = () => {
  const { id } = useParams();
  const [moreLikeData, setMoreLikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const apiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setMoreLikeData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full  bg-white dark:bg-black text-black dark:text-white relative p-8 ">
      <div>
        <div className=" sm:justify-between flex sm:ml-13 sm:mr-13 ml-2 py-2 max-sm:gap-30 items-center">
          <h3 className="sm:text-xl text-lg font-semibold"> More like this </h3>
          <Link
            href={`/more-like-this?id=${id}`}
            className=" flex w-[120px] h-[36px] justify-center items-center gap-2 text-sm text-black dark:text-white px-4 py-2 rounded"
          >
            See More
            <SeeMore />
          </Link>
        </div>
        <div className="sm:flex-wrap flex flex-wrap sm:gap-8 gap-1 sm:justify-center">
          {moreLikeData.slice(0, 5).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                id={movie.id}
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
