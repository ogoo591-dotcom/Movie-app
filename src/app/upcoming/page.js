"use client";
import { AllMovieList } from "../_features/AllMovieList";
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";

export default function Home() {
  return (
    <div className="w-full 2xl:w-[1440px] m-auto">
      <Header />
      <AllMovieList
        title="Upcoming"
        url="https://api.themoviedb.org/3/movie/upcoming?language=en-US"
        isShow={true}
      />
      <Footer />
    </div>
  );
}
