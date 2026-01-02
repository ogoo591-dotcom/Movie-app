"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { StarIcon } from "../_icons/StarIcon";
import { SeeMore } from "../_icons/Seemore";

export const SearchButton = (props) => {
  const { name, imgUrl, rating, year, seeMoreHref, onPick, movieId } = props;
  const router = useRouter();

  const y = year?.slice(0, 4) || "";

  const goDetail = () => {
    onPick?.();
    router.push(`/movie-details/${movieId}`);
  };

  return (
    <button
      onClick={goDetail}
      className="w-full items-center gap-3 px-3 py-2 hover:bg-gray-100 text-left flex border-b border-gray-100 cursor-pointer shrink-0"
    >
      {imgUrl ? (
        <img
          className="w-[79px] h-[100px] rounded object-cover"
          src={`https://image.tmdb.org/t/p/w92/${imgUrl}`}
          alt={name}
          loading="lazy"
        />
      ) : (
        <div className="w-[44px] h-[66px] rounded bg-gray-200" />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xl font-semibold truncate">{name}</div>
        <div className="mt-1 flex items-center gap-2 text-gray-600">
          <StarIcon />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-400">/10</span>
        </div>{" "}
        {y && <span className="ml-3">{y}</span>}
      </div>
      <Link
        href={seeMoreHref || `/movie-details/${movieId}`}
        className="inline-flex items-center gap-2 text-sm"
      >
        See more
        <SeeMore />
      </Link>{" "}
    </button>
  );
};
