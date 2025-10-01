"use client";
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { AllTopRateMovieList } from "./_component/AllTopRatedMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <AllTopRateMovieList />
      <Footer />
    </div>
  );
}
