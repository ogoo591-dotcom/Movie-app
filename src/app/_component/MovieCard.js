import { StarIcon } from "../_icons/StarIcon";

export const MovieCard = (props) => {
  const { name, imgUrl } = props;
  return (
    <div className="w-[230px] h-[439px] flex flex-row">
      <div className="w-full h-full aspect-[2/3] overflow-hidden ">
        <img
          className="w-full h-[320px] object-fit  "
          src={`https://image.tmdb.org/t/p/original/${imgUrl}`}
          alt="Santa"
        />
        <div className=" w-[230px] h-[95px] flex flex-col gap-3 bg-gray-100">
          <div className="flex flex-row gap-2">
            <StarIcon />
            <span className="text-lg font-medium text-black">6.9</span>
            <span className="text-lg font-medium text-gray-400">/10</span>
          </div>
          <h1 className="text-xl font-normal">{name}</h1>
        </div>
      </div>
    </div>
  );
};
