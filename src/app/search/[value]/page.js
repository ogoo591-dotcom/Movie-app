"use client";
import { Footer } from "../../_features/Footer";
import { Header } from "../../_features/Header";
import SearchPage from "../_component/SearchPage";

export default function Home() {
  return (
    <div className="w-full 2xl:w-[1440px] m-auto">
      <Header />
      <SearchPage />
      <Footer />
    </div>
  );
}
