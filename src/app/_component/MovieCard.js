import { StarIcon } from "../_icons/StarIcon";

export const MovieCard = (props) => {
  const { src, name } = props;
  return (
    <div className="w-[230px] h-[439px] flex flex-row">
      <div>
        <img className="w-[230px] h-[340px] " src={src} alt="Santa" />
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
