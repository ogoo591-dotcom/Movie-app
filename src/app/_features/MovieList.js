import { MovieCard } from "../_component/MovieCard";
import { Title } from "./Title";

export const MovieList = () => {
  return (
    <div className="w-ful bg-white relative p-8 ">
      <div>
        <Title name={`Upcoming `} />
        <div className="flex flex-wrap gap-8 justify-center ">
          <MovieCard src="Santa.jpg" name={`Dear Santa`} />
          <MovieCard
            src="Dragon.jpg"
            name={`How To Train Your Dragon Live Action`}
          />
          <MovieCard src="Alien Romulus.jpg" name={`Alien Romulus`} />
          <MovieCard src="From Ashes.jpg" name={`From the Ashes`} />
          <MovieCard src="Space Dogg.jpg" name={`Space Dogg`} />
          <MovieCard src="The Order.jpg" name={`The Order`} />
          <MovieCard src="Y2k.jpg" name={`Y2K`} />
          <MovieCard
            src="Solo Leveling.jpg"
            name={`Solo Leveling: ReAwakening`}
          />
          <MovieCard src="Get Away.jpg" name={`Get Away`} />
          <MovieCard src="Sonic.png" name={`Sonic the Hedgehog 3`} />
        </div>
      </div>
      <div>
        <Title name={`Popular `} />
        <div className="flex flex-wrap gap-8 justify-center ">
          <MovieCard src="Shawshank.jpg" name={`The Shawshank Redemption`} />
          <MovieCard src="Godfather.jpg" name={`The Godfather`} />
          <MovieCard src="The Dark.jpg" name={`The Dark Knight`} />
          <MovieCard src="Angry Men.jpg" name={`12 Angry Men`} />
          <MovieCard
            src="Lord Rings.jpg"
            name={`The Lord of the Rings: The  Return of the King`}
          />
          <MovieCard src="Internstellar.png" name={`Internstellar`} />
          <MovieCard src="Se7en.png" name={`Se7en`} />
          <MovieCard src="Wonderful.png" name={`It’s a Wonderful life`} />
          <MovieCard src="Seven samurai.png" name={`Seven samurai`} />
          <MovieCard src="The Silence.png" name={`The Silence of the Lambs`} />
        </div>
      </div>
      <div>
        <Title name={`Top Rated `} />
        <div className="flex flex-wrap gap-8 justify-center ">
          <MovieCard src="Pulp Fiction.jpg" name={`Pulp Fiction`} />
          <MovieCard
            src="Lord Rings.jpg"
            name={`The Lord of the Rings: Fellowship of the Kings`}
          />
          <MovieCard
            src="The Good.png"
            name={`The Good, the Bad and the Ugly`}
          />
          <MovieCard src="Forrest Gump.jpg" name={`Forrest Gump`} />
          <MovieCard src="Fight Club.jpg" name={`Fight Club`} />
          <MovieCard src="Saving Ryan.png" name={`Saving Private Ryan`} />
          <MovieCard src="City God.png" name={`City of God`} />
          <MovieCard src="The Green.png" name={`The Green Mile`} />
          <MovieCard src="Life Beautiful.png" name={`Life is Beautiful`} />
          <MovieCard
            src="Terminator.png"
            name={`Terminator 2: Judgement Day`}
          />
        </div>
      </div>
    </div>
  );
};
