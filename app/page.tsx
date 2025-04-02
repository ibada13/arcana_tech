'use client'
import Backgorund from "./components/Background";
import Navbar from "./components/Navbar";
import Button from "./components/subcomponents/Welcome";
export default function Home() {
  return (
    <div className="relative flex flex-col items-center  min-h-screen">
      <Backgorund />
      <Navbar />
      <Button/>
     </div>
    
  );
}
