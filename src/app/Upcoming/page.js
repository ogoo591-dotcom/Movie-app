"use client";
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { NextPrevious } from "../_features/NextPrevious";
import { AllUpcomingMovieList } from "./_component/AllUpcomingMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <AllUpcomingMovieList />
      <NextPrevious />
      <Footer />
    </div>
  );
}
