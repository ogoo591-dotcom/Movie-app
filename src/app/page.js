"use client";
import "./index.css";

import { Header } from "./_features/Header";
import { Footer } from "./_features/Footer";
import { HeroSection } from "./_features/HeroSection";
import { FoodList } from "./_features/FoodList";
import { CategoryList } from "./_features/CategoryList";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto bg-neutral-700">
      <Header />
      <HeroSection />
      <CategoryList />
      <FoodList />
      <Footer />
    </div>
  );
}
