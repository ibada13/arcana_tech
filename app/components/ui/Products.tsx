import Card from "./Card";
import useSWR from "swr";
import {get} from "@/app/lib/utlis"

import Link from "next/link";

import { useSearchParams } from "next/navigation";
export default function Products({ products }: {products:any[]}) { 

    return (


        <div id="pcs" className="w-full self-center   place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15 ">

            {products.map((item:any, index:number) => (
                <Card product={item} key={`pc-${index}`}/>
            ))}
        </div>
            
    );
}