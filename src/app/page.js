"use client";
import "./index.css";

import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { HeroSection } from "./_features/HeroSection";
import { TopRateMovieList } from "./Top-Rated/_component/TopRateMovieList";
import { GenresList } from "./_features/GenresList";
import { UpcomingMovieList } from "./Upcoming/_component/UpcomingMovieList";
import { PopularMovieList } from "./Popular/_component/PopularMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <HeroSection />
      <UpcomingMovieList />
      <PopularMovieList />
      <TopRateMovieList />
      <Footer />
      <GenresList />
    </div>
  );
}
