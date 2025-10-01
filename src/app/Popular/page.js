"use client";

import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { AllPopularMovieList } from "./_component/AllPopularMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <AllPopularMovieList />
      <Footer />
    </div>
  );
}
