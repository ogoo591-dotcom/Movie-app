`use client`;
import { useRouter } from "next/navigation";
import { NemehIcon } from "../_icons/Nemeh";

export const FoodCards = (props) => {
  //   const { name, imgUrl, rating, movieId } = props;
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/foodOrder`);
  };
  return (
    <div
      className="w-[397px] h-[342px] flex flex-row cursor-pointer"
      onClick={handleMovieClick}
    >
      <div className="w-[397px] h-[342px] rounded-2xl bg-white overflow-hidden cursor-pointer flex justify-center items-center flex-col ">
        <img
          className=" w-[365px] h-[210px] object-cover p-4 rounded-3xl relative"
          src="./FingerFood.png"
          alt="Food-Image"
        />
        <button className="w-11 h-11 rounded-full bg-white absolute mt-10 ml-63 flex justify-center items-center ">
          <NemehIcon />
        </button>
        <div className=" flex justify-between gap-48 px-5">
          <p className="text-red-400 font-medium text-1xl">Finger food </p>
          <p className="text-black ">$12.99</p>
        </div>
        <p className="text-black text-sm px-5 mt-3 ml-4">
          Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
        </p>
      </div>
    </div>
  );
};
