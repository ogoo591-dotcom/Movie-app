import { Genres } from "../_component/Genres";

export const GenresList = () => {
  return (
    <div className="w-full h-full  absolute top-0 left-0 z-10 flex justify-center items-start p-10 gap-6">
      <div className=" h-110 w-145 border-0 flex flex-col rounded-4xl bg-white text-black text-l p-5  ">
        <p className="text-2xl font-medium">Genres</p>
        <p className="text-l">See lists of movies by genre</p>
        <div className=" flex flex-wrap  text-black text-l gap-3 p-5 border ">
          <Genres name={`Action`} />
          <Genres name={`Adventure`} />
          <Genres name={`Animation`} />
          <Genres name={`Biography`} />
          <Genres name={`Comedy`} />
          <Genres name={`Crime`} />
          <Genres name={`Documentary`} />
          <Genres name={`Drama`} />
          <Genres name={`Family`} />
          <Genres name={`Fantasy`} />
          <Genres name={`Film-Noir`} />
          <Genres name={`Game-Show`} />
          <Genres name={`History`} />
          <Genres name={`Horror`} />
          <Genres name={`Music`} />
          <Genres name={`Musical`} />
          <Genres name={`Mystery`} />
          <Genres name={`News`} />
          <Genres name={`Reality-TV`} />
          <Genres name={`Romance`} />
          <Genres name={`Sci-Fi`} />
          <Genres name={`Short`} />
          <Genres name={`Sport`} />
          <Genres name={`Talk-Show`} />
          <Genres name={`Thriller`} />
          <Genres name={`War`} />
          <Genres name={`Western`} />{" "}
        </div>
      </div>
    </div>
  );
};
