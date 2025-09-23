import { IconButton } from "../_icons/IconButton";

export const Button = () => {
  return (
    <div className="w-full h-full  absolute top-0 left-0 z-10 flex flex-row justify-end items-center p-10">
      <button className=" h-12  w-12 border-0 flex  rounded-full justify-center items-center  bg-white  ">
        <IconButton />
      </button>
    </div>
  );
};
