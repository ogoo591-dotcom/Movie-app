"use client";
import "./index.css";

import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";

import { AllMovieList } from "./_features/AllMovieList";
import { HeroSection } from "./_features/HeroSection";

export default function Home() {
  return (
    <div className="w-full 2xl:w-[1440px] m-auto">
      <Header />
      <HeroSection />
      <AllMovieList
        title="Upcoming"
        url="https://api.themoviedb.org/3/movie/upcoming?language=en-US"
        isShow={false}
        seeMoreHref="/upcoming"
      />
      <AllMovieList
        title="Popular"
        url="https://api.themoviedb.org/3/movie/popular?language=en-US"
        isShow={false}
        seeMoreHref="/popular"
      />
      <AllMovieList
        title="Top-Rated"
        url="https://api.themoviedb.org/3/movie/top_rated?language=en-US"
        isShow={false}
        seeMoreHref="/top-rated"
      />
      <Footer />
    </div>
  );
}
