import { StarIcon } from "../_icons/StarIcon";
import { WatchIcon } from "../_icons/WatchIcon";

export const HeroSlide = (props) => {
  const { name, text, imgUrl } = props;
  return (
    <div className="relative w-[1440px] h-[600px]">
      <img
        className="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
      />
      <div className=" h-[600px]  absolute top-0 left-0 z-10 flex flex-col  gap-4 justify-center ml-40 ">
        <div>
          <p className="text-base font-medium text-white">Now Playing:</p>
          <h1 className="text-4xl font-medium text-white">{name}</h1>
          <div className="flex flex-row gap-2">
            <StarIcon />
            <span className="text-lg font-medium text-white">6.9</span>
            <span className="text-lg font-medium text-gray-400">/10</span>
          </div>
        </div>
        <p className="text-xs font-medium text-white w-[302px]">{text}</p>
        <button className=" h-[40px]  w-[145px] border-0 border-gray-200  border-gr flex  rounded-lg justify-center items-center gap-2 bg-white text-sm ">
          <WatchIcon />
          Watch Trailer
        </button>
      </div>
      <div className="w-full h-full  absolute top-0 left-0 z-10 flex flex-row justify-center items-end gap-4 p-5 ">
        <button className=" h-3 w-3 border-0 rounded-full  bg-white "></button>
        <button className=" h-3 w-3  border-0 rounded-full  bg-white "></button>
        <button className="h-3 w-3  border-0 rounded-full  bg-white"></button>
      </div>
    </div>
  );
};
