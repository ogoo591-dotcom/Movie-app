"use client";

import { Footer } from "../../_features/Footer";
import { Header } from "../../_features/Header";
import { MoreLikeThis } from "./_component/MoreLikeThis";
import { MovieDetails } from "./_component/MovieDetails";

export default function Home() {
  return (
    <div className="w-full 2xl:w-[1440px] m-auto">
      <Header />
      <MovieDetails />
      <MoreLikeThis />
      <Footer />
    </div>
  );
}
