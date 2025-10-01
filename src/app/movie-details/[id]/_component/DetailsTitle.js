import { SeeMore } from "@/app/_icons/Seemore";
import Link from "next/link";

export const DetailsTitle = ({ movieId }) => {
  return (
    <div className="flex justify-evenly gap-245 items-center">
      <h3 className="text-xl font-semibold"> More like this </h3>
      <Link
        href={`/more-like-this?id=${movieId}`}
        className="mt-6 flex w-[120px] h-[36px] justify-center items-center gap-2 text-sm text-black px-4 py-2 rounded"
      >
        See More
        <SeeMore />
      </Link>
    </div>
  );
};
