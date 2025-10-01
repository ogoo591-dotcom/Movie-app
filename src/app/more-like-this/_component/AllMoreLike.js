"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_component/MovieCard";
import { Loading } from "@/app/_component/Loading";
import { useParams, useSearchParams } from "next/navigation";
import { ZuunIcon } from "@/app/_icons/ZuunIcon";
import { IconButton } from "@/app/_icons/IconButton";
import { DetailsTitle } from "@/app/movie-details/[id]/_component/DetailsTitle";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const AllMoreLike = ({ isDetail }) => {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  const param = useParams();

  const { id } = param;

  console.log(id, "hahah");
  const [moreLikeData, setMoreLikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const apiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;

  console.log(moreLikeData);

  const getData = async (pageNum) => {
    setLoading(true);
    const data = await fetch(apiLink + pageNum, options);
    const jsonData = await data.json();
    setMoreLikeData(jsonData.results || []);
    setLoading(false);
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage((p) => Math.min(p + 1, totalPages));
    }
  };
  const handlePageClick = (page) => {
    setPage(page);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white relative p-8 ">
      <div>
        <DetailsTitle movieId={id} />
        <div className="flex flex-wrap gap-8 justify-center ">
          {moreLikeData.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                id={movie.id}
                name={movie.title}
                imgUrl={movie.poster_path}
                rating={movie.vote_average}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full bg-white relative flex  p-4"></div>
      <div className="flex flex-row justify-end items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="flex justify-center items-center gap-2 px-2 py-1 rounded disabled:opacity-50"
        >
          <ZuunIcon />
          <p>Previous</p>
        </button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => handlePageClick(p)}
              className={`w-10 h-10 flex justify-center items-center border rounded-xl cursor-pointer ${
                page === p
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="flex justify-center items-center gap-2 px-2 py-1 rounded disabled:opacity-50"
        >
          <p>Next</p>
          <IconButton />
        </button>
      </div>
    </div>
  );
};
