"use client";

import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import GenrePage from "./_component/GenrePage";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <GenrePage />
      <Footer />
    </div>
  );
}
