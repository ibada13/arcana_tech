'use client'
import Backgorund from "./components/Background";
import Navbar from "./components/Navbar";
import Welcome from "./components/subcomponents/Welcome";
import Products from "./components/Products";
import DivBackground from "./components/DivBackground";
import { pcs ,components } from "./components/data/data";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Backgorund />
      {/* <Navbar /> */}
      <Welcome />

    <Products link={"/"} type="gaming" title="our best sellers"/>
    <Products type="gaming" limit={3} title="added recently"/>
    <DivBackground src="/divbackground3.jpg"/>
    {/* <Products products={components} proucts_size={3} title="best components to build your pc"/> */}
    </div>
  );
}
