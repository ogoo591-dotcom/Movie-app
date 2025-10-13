import { StarIcon } from "../_icons/StarIcon";
import { WatchIcon } from "../_icons/WatchIcon";

export const HeroSlide = (props) => {
  const { name, text, rating, imgUrl, onWatchTrailer } = props;
  return (
    <div className="relative w-full h-full max-sm:flex max-sm:flex-col bg-white">
      <img
        className="sm:absolute inset-0 w-full h-full sm:object-cover object-cover"
        src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
        alt={name}
      />
      <div className="sm:absolute inset-0 w-[400px] z-20 flex flex-col gap-4 max-sm:p-5 justify-center sm:ml-40">
        <div>
          <p className="text-sm sm:text-base opacity-90 mb-2 sm:text-white text-black">
            Now Playing:
          </p>
          <h1 className="sm:text-4xl text-xl font-medium sm:text-white text-black">
            {name}
          </h1>
          <div className="flex flex-row gap-2">
            <StarIcon />
            <span className="text-lg font-medium sm:text-white text-black">
              {rating}
            </span>
            <span className="text-lg font-medium text-gray-400">/10</span>
          </div>
        </div>
        <p className="text-base sm:text-white text-black sm:text-lg leading-relaxed line-clamp-3 sm:line-clamp-3">
          {text}
        </p>
        <button
          onClick={onWatchTrailer}
          className=" h-[40px]  w-[145px] border-0 border-gray-200  border-gr flex sm:text-black text-white rounded-lg justify-center items-center gap-2 sm:bg-white bg-black text-sm cursor-pointer"
        >
          <WatchIcon />
          Watch Trailer
        </button>
      </div>
    </div>
  );
};
