`use client`;

import "./index.css";
import { MovieList } from "./_features/MovieList";
import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { HeroSection } from "./_features/HeroSection";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <HeroSection />
      <MovieList />
      <Footer />
    </div>
  );
}
