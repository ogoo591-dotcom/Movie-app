import { StarIcon } from "../_icons/StarIcon";
import { WatchIcon } from "../_icons/WatchIcon";

export const HeroSlide = (props) => {
  const { name, text, rating, imgUrl, onWatchTrailer } = props;
  return (
    <div className="relative w-[1440px] h-[600px]">
      <img
        className="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
        alt={name}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 z-20 flex flex-col gap-4 justify-center ml-40">
        <div>
          <p className="text-base font-medium text-white">Now Playing:</p>
          <h1 className="text-4xl font-medium text-white">{name}</h1>
          <div className="flex flex-row gap-2">
            <StarIcon />
            <span className="text-lg font-medium text-white">{rating}</span>
            <span className="text-lg font-medium text-gray-400">/10</span>
          </div>
        </div>
        <p className="text-xs font-medium text-white w-[302px]">{text}</p>
        <button
          onClick={onWatchTrailer}
          className=" h-[40px]  w-[145px] border-0 border-gray-200  border-gr flex text-black rounded-lg justify-center items-center gap-2 bg-white text-sm cursor-pointer"
        >
          <WatchIcon />
          Watch Trailer
        </button>
      </div>
    </div>
  );
};
