`use client`;

import { StarIcon } from "../_icons/StarIcon";
import { useRouter } from "next/navigation";

export const MovieCard = (props) => {
  const { name, imgUrl, rating, movieId } = props;
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/movie-details/${movieId}`);
  };
  return (
    <div
      className="w-[230px] h-[439px] flex flex-row cursor-pointer"
      onClick={handleMovieClick}
    >
      <div className="w-full h-full aspect-[2/3] overflow-hidden cursor-pointer ">
        <img
          className="w-full h-[320px] object-cover  "
          src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
          alt={name}
        />
        <div className=" w-[230px] h-[95px] flex flex-col gap-3 bg-gray-100 dark:bg-gray-500">
          <div className="flex ml-3 flex-row gap-2">
            <StarIcon />
            <span className="text-lg font-medium text-black dark:text-white">
              {rating}
            </span>
            <span className="text-lg font-medium text-gray-400">/10</span>
          </div>
          <h1 className="text-l ml-4 font-normal">{name}</h1>
        </div>
      </div>
    </div>
  );
};
