"use client";
import "./index.css";

import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { HeroSection } from "./_features/HeroSection";
import { UpcomingMovieList } from "./_features/UpcomingMovieList";
import { PopularMovieList } from "./_features/PopularMovieList";
import { TopRateMovieList } from "./_features/TopRateMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <HeroSection />
      <UpcomingMovieList />
      <PopularMovieList />
      <TopRateMovieList />
      <Footer />
    </div>
  );
}
