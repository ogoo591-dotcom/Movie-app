import Link from "next/link";
import { SeeMore } from "../_icons/Seemore";

export const Title = (props) => {
  const { name } = props;
  return (
    <div className="flex justify-center items-center gap-260 p-5">
      <h3 className="text-2xl font-semibold">{name} </h3>
      <Link
        href={name}
        className="mt-6 flex w-[120px] h-[36px] justify-center items-center gap-2 text-sm text-black px-4 py-2 rounded"
      >
        See More
        <SeeMore />
      </Link>
    </div>
  );
};
