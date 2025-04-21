'use client'
import Backgorund from "./components/Background";
import Navbar from "./components/Navbar";
import Welcome from "./components/subcomponents/Welcome";
import ProductsFetcherSection from "./components/ProductsFetcherSection";
import DivBackground from "./components/DivBackground";
import { pcs ,components } from "./components/data/data";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-y-25">
      <Backgorund />
      {/* <Navbar /> */}
      <Welcome />

    <ProductsFetcherSection feed="best" link={"/feed/best"} limit={6}  title="our best sellers"/>
    <ProductsFetcherSection feed="new"  limit={3} title="New Arrivals" link="/feed/new"/>
    <DivBackground src="/divbackground3.jpg"/>
    {/* <Products products={components} proucts_size={3} title="best components to build your pc"/> */}
    </div>
  );
}
