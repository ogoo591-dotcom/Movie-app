"use client";
import { AllMovieList } from "../_features/AllMovieList";
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <AllMovieList
        title="Top-Rated"
        url="https://api.themoviedb.org/3/movie/top_rated?language=en-US"
        isShow={true}
        seeMoreHref="/top-rated"
      />
      <Footer />
    </div>
  );
}
