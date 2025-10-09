"use client";
import "./index.css";

import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { HeroSection } from "./_features/HeroSection";
import { AllMovieList } from "./_features/AllMovieList";

export default function Home() {
  return (
    <div className="w-full 2xl:w-[1440px] m-auto">
      <Header />
      <HeroSection />
      <AllMovieList
        title="Upcoming"
        url="https://api.themoviedb.org/3/movie/upcoming?language=en-US"
        isShow={false}
      />
      <AllMovieList
        title="Popular"
        url="https://api.themoviedb.org/3/movie/popular?language=en-US"
        isShow={false}
      />
      <AllMovieList
        title="Top-Rated"
        url="https://api.themoviedb.org/3/movie/top_rated?language=en-US"
        isShow={false}
      />
      <Footer />
    </div>
  );
}
