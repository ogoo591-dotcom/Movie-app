"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_component/MovieCard";
import { ZuunIcon } from "@/app/_icons/ZuunIcon";
import { IconButton } from "@/app/_icons/IconButton";
import { SeeMore } from "@/app/_icons/Seemore";
import Link from "next/link";
import { Loading } from "../_component/Loading";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
const buildUrl = (base, p) =>
  base.includes("?") ? `${base}&page=${p}` : `${base}?page=${p}`;

export const AllMovieList = (props) => {
  const { title, url, isShow, seeMoreHref } = props;
  const [AllMovieData, setAllMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 15;

  const getData = async (pageNum) => {
    setLoading(true);
    const data = await fetch(buildUrl(url, pageNum), options);
    const jsonData = await data.json();
    setAllMovieData(jsonData.results || []);
    setLoading(false);
  };

  useEffect(() => {
    getData(1);
  }, [url]);

  useEffect(() => {
    if (!url) return;
    getData(page);
  }, [url, page]);

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

  if (loading) return <Loading />;

  return (
    <div className="w-ful  bg-white dark:bg-black text-black dark:text-white relative p-8 ">
      <div>
        <div className="flex justify-between ml-13 mr-13 py-2 items-center">
          <h3 className="text-2xl font-semibold">{title}</h3>
          {!isShow && (
            <Link
              href={seeMoreHref || "/upcoming"}
              className="mt-6 flex w-[120px] h-[36px] justify-center items-center gap-2 text-sm text-black dark:text-white px-4 py-2 rounded"
            >
              See More
              <SeeMore />
            </Link>
          )}
        </div>
        <div className="flex flex-wrap gap-8 justify-center ">
          {AllMovieData.slice(0, !isShow ? 10 : 20).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                name={movie.title}
                imgUrl={movie.poster_path}
                rating={movie.vote_average.toFixed(1)}
                movieId={movie.id}
              />
            );
          })}
        </div>
      </div>
      {isShow && (
        <div className="flex flex-row justify-end items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="flex justify-center items-center gap-2 px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
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
                className={` ${
                  page === p
                    ? "w-10 h-10 flex justify-center items-center border rounded-xl cursor-pointer hover:bg-gray-200"
                    : "w-10 h-10  rounded-xl cursor-pointer hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="flex justify-center items-center gap-2 px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
          >
            <p>Next</p>
            <IconButton />
          </button>
        </div>
      )}
    </div>
  );
};
