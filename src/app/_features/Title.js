import { SeeMore } from "../_icons/Seemore";

export const Title = (props) => {
  const { name } = props;
  return (
    <div className="flex justify-center items-center gap-260 p-5">
      <h3 className="text-2xl font-semibold">{name} </h3>
      <button className="flex w-[120px] h-[36px] justify-center items-center gap-2 text-sm text-black">
        See more <SeeMore />
      </button>
    </div>
  );
};
