"use client";
import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { UpcomingMovieList } from "./_component/UpcomingMovieList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <UpcomingMovieList />
      <Footer />
    </div>
  );
}
