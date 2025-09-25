"use client";

import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { PopularMovieList } from "./_component/PopularMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <PopularMovieList />
      <Footer />
    </div>
  );
}
