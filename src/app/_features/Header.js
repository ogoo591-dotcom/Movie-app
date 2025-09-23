import { DownIcon } from "../_icons/DownIcon";
import { SearchIcon } from "../_icons/SearchIcon";

export const Header = () => {
  return (
    <div className="w-full h-[59px] justify-between px-[16px] bg-white ">
      <div
        className="max-w-[1280px] h-[36px] justify-between items-center p-8 flex flex-row 
"
      >
        <img
          className="h-[20px]  w-[92px] gap-8  "
          src="Light-mode.png"
          alt="logo"
        />
        <div className="flex flex-row gap-12 w-[488px] h-[36px] justify-center items-center ">
          <button className=" h-[36px]  w-[97px] border-2 border-gray-200  border-gr flex  rounded-lg justify-center items-center gap-2  ">
            <DownIcon />
            <p className="text-sm font-medium justify-center items-center">
              Genre
            </p>
          </button>
          <div className="h-[36px]  w-[379px] gap-4 border-2 border-gray-200 flex rounded-lg items-center px-3">
            <SearchIcon />
            <input
              className="text-sm font-medium text-gray-500 border-0"
              placeholder="Search..."
            />
          </div>
        </div>
        <button>
          <img className="h-[36px]  w-[36px] gap-12" src="Icon-Button.png" />
        </button>
      </div>
    </div>
  );
};
