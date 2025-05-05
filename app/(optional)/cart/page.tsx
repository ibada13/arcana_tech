'use client';

import { useAppSelector } from "@/app/state/store";
import type { Item } from "@/app/state/cart/cartSlice";
import Link from "next/link";
import PayButton from "@/app/components/ui/PayButton";

export default function Cart() {
  const items: Item[] = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
 



  return (
    <div className="mt-32 mb-32 w-screen gap-y-20 min-h-screen flex flex-col">
      <div className="flex justify-center items-start">
        <div className="w-5/6 flex gap-6">
          <div className="flex-1 border-r-2 border-r-green-300 pr-6">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-100 hover:text-black transition-colors duration-300"
                >
                  <p className="w-1/3 truncate">{item.name}</p>
                  <p className="w-1/3 text-center">x{item.quantity}</p>
                  <p className="w-1/3 text-right text-green-400">{item.price}$</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-1/3 flex flex-col items-center justify-start self-center pt-4">
            <p className="text-2xl font-semibold">Total</p>
            <p className="text-4xl font-bold text-green-600 mt-2">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
        <PayButton items={items}/>
    </div>
  );
}
