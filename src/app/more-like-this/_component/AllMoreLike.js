"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_component/MovieCard";
import { Loading } from "@/app/_component/Loading";
import { useSearchParams } from "next/navigation";
import { ZuunIcon } from "@/app/_icons/ZuunIcon";
import { IconButton } from "@/app/_icons/IconButton";
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
export const AllMoreLike = ({ isMoreLike }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [moreLikeData, setMoreLikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  const apiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;

  console.log(moreLikeData);

  const getData = async (pageNum) => {
    setLoading(true);
    const data = await fetch(apiLink + pageNum, options);
    const jsonData = await data.json();
    setMoreLikeData(jsonData.results || []);
    console.log("hahahahahhhhhhhhhh11", setMoreLikeData);
    setTotalPages(Number(jsonData.total_pages) || totalPages);
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
        pages.push(1, 2, 3, "...", totalPages);
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
  const handlePrevious = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePageClick = (page) => setPage(page);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white relative sm:p-8  ">
      <div>
        <div className="sm:justify-between flex sm:ml-13 sm:mr-13 ml-5 py-2 max-sm:gap-42 items-center">
          <h3 className="text-xl font-semibold"> More like this </h3>
          {!isMoreLike && (
            <Link
              href={`/more-like-this?id=${id}`}
              className="mt-6 flex w-[120px] h-[36px] justify-center items-center gap-2 text-sm text-black px-4 py-2 rounded"
            >
              See More
              <SeeMore />
            </Link>
          )}
        </div>
        <div className="flex flex-wrap gap-8 justify-center min-h-[800px] ">
          {moreLikeData.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                id={movie.id}
                name={movie.title}
                imgUrl={movie.poster_path}
                rating={movie.vote_average.toFixed(1)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row py-10 justify-end items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="flex justify-center items-center cursor-pointer gap-2 px-2 py-1 rounded disabled:opacity-50"
        >
          <ZuunIcon />
          <p className="max-sm:hidden">Previous</p>
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
              className={` ${
                page === p
                  ? "max-w-30 h-10 min-w-10 flex justify-center items-center border rounded-xl cursor-pointer hover:bg-gray-200"
                  : "max-w-30 h-10  min-w-10  rounded-xl cursor-pointer hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="flex justify-center items-center cursor-pointer gap-2 px-2 py-1 rounded disabled:opacity-50 "
        >
          <p className="max-sm:hidden">Next</p>
          <IconButton />
        </button>
      </div>
    </div>
  );
};
