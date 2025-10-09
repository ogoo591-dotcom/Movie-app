export const DetailsLoading = () => {
  return (
    <div className="flex flex-col  w-[1440px] h-auto items-center bg-white py-10 px-45 gap-8">
      <div className="flex flex-col  gap-6">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-1">
            <p className="text-[36px] font-bold w-[211px] h-[40px] bg-gray-100"></p>
            <p className="text-[18px] w-[211px] h-[28px] bg-gray-100"></p>
          </div>
          <div>
            <h3 className="w-[83px] h-[16px] bg-gray-100">Rating</h3>
            <div className="flex gap-1 items-center w-[83px] h-[48px] bg-gray-100"></div>
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <img className="w-[300px]  h-[428px]  bg-gray-100" />
          <div className="relative ">
            <img className="w-[780px]  h-[428px]  bg-gray-100" />{" "}
            <div className=" absolute inset-0 z-20 ml-5 mt-90 flex gap-3"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 flex-wrap border-none rounded-lg  bg-gray-100 w-[77px] h-[20px]">
            {movie.genres?.map((genre, index) => (
              <button
                key={index}
                className="h-7  flex items-center gap-5-2 px-4 cursor-pointer text-l font-bold border rounded-full border-[#ddd]"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        <p className="w-full h-[48px] bg-gray-100 "></p>
        <div className=" flex flex-col gap-8">
          <div className=" border-none rounded-lg  bg-gray-100 w-[64px] h-[28px]">
            <p className=" border-none rounded-lg  bg-gray-100 w-[64px] h-[28px]"></p>
          </div>
          <div className=" border-none rounded-lg  bg-gray-100 w-[64px] h-[28px]">
            <p className=" border-none rounded-lg  bg-gray-100 w-[64px] h-[28px]"></p>
          </div>
          <div className=" border-none rounded-lg  bg-gray-100 w-[64px] h-[28px]">
            <p className=" border-none rounded-lg  bg-gray-100 w-[64px] h-[28px]"></p>
          </div>
        </div>
      </div>
      <div className="w-ful bg-white relative p-8 ">
        <div></div>
        <div className="flex justify-center items-center gap-220 p-5">
          <h3 className="w-60 h-8 bg-gray-100 rounded-2xl"> </h3>
          <button className="w-40 h-8 bg-gray-100 rounded-2xl"></button>
        </div>
        <div className="flex flex-wrap gap-8 justify-center ">
          <div className="w-[230px] h-[439px] flex flex-row  bg-gray-100"></div>
          <div className="w-[230px] h-[439px] flex flex-row  bg-gray-100"></div>
          <div className="w-[230px] h-[439px] flex flex-row  bg-gray-100"></div>
          <div className="w-[230px] h-[439px] flex flex-row  bg-gray-100"></div>
          <div className="w-[230px] h-[439px] flex flex-row  bg-gray-100"></div>
        </div>
      </div>{" "}
    </div>
  );
};
