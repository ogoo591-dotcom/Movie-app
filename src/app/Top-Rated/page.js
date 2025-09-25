"use client";
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { TopRateMovieList } from "./_component/TopRateMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <TopRateMovieList />
      <Footer />
    </div>
  );
}
