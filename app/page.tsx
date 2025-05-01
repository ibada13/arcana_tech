'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Backgorund from "./components/Background";
import Welcome from "./components/subcomponents/Welcome";
import ProductsFetcherSection from "./components/ProductsFetcherSection";
import DivBackground from "./components/DivBackground";
import { useAppSelector } from './state/store';
import { CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';
export default function Home() {
  const [status, setStatus] = useState<"out" | "in" | "">('');
  const searchParams = useSearchParams();
  const hasItems = useAppSelector((state) => state.cart.items.length > 0);
  useEffect(() => {
    const action = searchParams.get('action');

    if (action === 'loggedin') {
      setStatus('in');
    } else if (action === 'loggedout') {
      setStatus('out');
    } else {
      setStatus('');
    }

    setTimeout(() => {
      window.history.replaceState(null, '', '/');
    }, 5000);
  }, [searchParams]);

  return (
    <div className="  flex flex-col min-h-screen gap-y-25">
      <Backgorund />
      <Welcome />
      {status === "in" ? (
        <div
            onClick={() => setStatus("")}
            className="fixed bottom-1/12 right-0 mr-8 h-1/5 w-1/4 flex justify-center items-center rounded-xl bg-green-400/90 p-4 hover:bg-green-700 cursor-pointer transform transition-all  duration-300 ease-out active:scale-95 active:bg-green-800"
        >
            <p className="uppercase text-xl font-bold tracking-wider">welcome admin</p>
        </div>
      ) : status === "out" ? (
        <div
          onClick={() => setStatus("")}
          className="fixed bottom-1/12 right-0 mr-8 h-1/5 w-1/4 flex justify-center items-center rounded-xl bg-red-400/90 p-4 hover:bg-red-700 cursor-pointer transform transition-all duration-300 ease-out active:scale-95 active:bg-red-800"
        >
          <p className="uppercase text-xl font-bold tracking-wider">Logged out</p>
          </div>

      ) : null}

      {hasItems &&
          <Link className='fixed bottom-1/14 right-1/20 z-50 flex justify-center items-center  h-18 w-18 rounded-full bg-green-400 hover:bg-black hover:text-green-400 hover:border-2 hover:border-green-400 transition-colors duration-300' href={"/cart"}><CiShoppingCart size={45}/></Link>
       }
      <ProductsFetcherSection feed="best" link={"/feed/best"} limit={6} title="our best sellers" />
      <ProductsFetcherSection feed="new" limit={3} title="New Arrivals" link="/feed/new" />
      <DivBackground src="/divbackground3.jpg" />
    </div>
  );
}
