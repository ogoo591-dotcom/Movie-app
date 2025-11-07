"use client";
import { PenIcon } from "../_icons/Pen";

export const MenuCards = ({
  id,
  name,
  price,
  orts,
  image = "./FingerFood.png",
  onEdit,
}) => {
  return (
    <>
      <div className="w-[270px] h-[241px] cursor-pointer">
        <div className="w-[270px] h-[241px] rounded-2xl bg-white overflow-hidden flex flex-col border">
          <div className="w-[270px] h-[160px] px-3 relative ">
            <img
              className="h-35 w-60 object-cover rounded-lg absolute inset-0 ml-3 mt-5"
              src={image}
              alt={name}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="w-9 h-9 rounded-full absolute right-3 bottom-3 bg-white flex items-center justify-center shadow mr-4"
            >
              <PenIcon />
            </button>
          </div>
          <div className="w-full flex justify-between px-5 mt-2">
            <p className="text-red-400 font-medium text-sm truncate">{name}</p>
            <p className="text-black text-sm">{price} ₮</p>
          </div>
          <p className="text-black text-sm px-5 line-clamp-2">{orts}</p>
        </div>
      </div>
    </>
  );
};
