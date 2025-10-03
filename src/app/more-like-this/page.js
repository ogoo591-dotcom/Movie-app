"use client";

import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { AllMoreLike } from "./_component/AllMoreLike";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto">
      <Header />
      <AllMoreLike isMoreLike={true} />
      <Footer />
    </div>
  );
}
