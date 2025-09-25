import { IconButton } from "../_icons/IconButton";

export const Genres = (props) => {
  const { name } = props;
  return (
    <div className="w-ful bg-white relative  ">
      <button
        className=" h-6 w-35 border flex rounded-4xl gap-2 px-2 items-center justify-center text-black text-l font-semibold "
        type="button"
      >
        {name}
        <IconButton />
      </button>
    </div>
  );
};
