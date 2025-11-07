`use client`;
import { useRouter } from "next/navigation";
import { NemehIcon } from "../_icons/Nemeh";

export const FoodCards = ({ name, price, orts }) => {
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/foodOrder`);
  };
  return (
    <div className="w-[397px] h-[342px] flex flex-row cursor-pointer">
      <div className="w-full h-[342px] rounded-2xl bg-white overflow-hidden cursor-pointer flex justify-center items-center flex-col border ">
        <img
          className=" w-[365px] h-[210px] object-cover p-4 rounded-3xl relative"
          src="./FingerFood.png"
          alt="Food-Image"
        />
        <button
          className="w-11 h-11 rounded-full bg-white absolute mt-10 ml-63 flex justify-center items-center "
          onClick={handleMovieClick}
        >
          <NemehIcon />
        </button>
        <div className=" flex justify-between gap-48 px-5">
          <p className="text-red-400 font-medium text-1xl">{name} </p>
          <p className="text-black ">{price} ₮</p>
        </div>
        <p className="text-black text-sm px-5 mt-3 ml-4">{orts}</p>
      </div>
    </div>
  );
};
