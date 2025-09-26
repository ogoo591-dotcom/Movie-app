"use client";

import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { NextPrevious } from "../_features/NextPrevious";
import { AllPopularMovieList } from "./_component/AllPopularMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <AllPopularMovieList />
      <NextPrevious />
      <Footer />
    </div>
  );
}
