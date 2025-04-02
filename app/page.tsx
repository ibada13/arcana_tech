'use client'
import Backgorund from "./components/Background";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div className="relative flex flex-col items-center">
      <Backgorund />
      <Navbar />
     </div>
    
  );
}
