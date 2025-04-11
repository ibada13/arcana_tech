'use client'
import Backgorund from "./components/Background";
import Navbar from "./components/Navbar";
import Welcome from "./components/subcomponents/Welcome";
import Pcs from "./components/Pcs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Backgorund />
      <Navbar />
      <Welcome />

    <Pcs/>
    </div>
  );
}
