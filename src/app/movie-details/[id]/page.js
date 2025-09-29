"use client";

import { Footer } from "../../_features/Footer";
import { Header } from "../../_features/Header";
import { MovieDetails } from "./_component/MovieDetails";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto h-[1500px]">
      <Header />
      <MovieDetails />
      <Footer />
    </div>
  );
}
