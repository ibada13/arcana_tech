'use client'
import { useParams } from "next/navigation"
import useSWR from "swr";
import { get } from "@/app/lib/utlis";
import Card from "@/app/components/ui/Card";
import Products from "@/app/components/ui/Products";
import ProductsFetcher from "@/app/components/ProductsFetcherSection";
import Loading from "@/app/Loading";
import Error from "@/app/Error";
import  NoRes from "@/app/NoRes"
export default function page() { 
    const {type} = useParams() as {type:string};
    const {data,error ,isLoading } = useSWR(`/products/search?product_type=${type}` , get)

    return (
        <div className="min-h-screen w-full mt-32">
            {/* <p className="text-3xl font-bold uppercase"></p> */}
            <Products products={data.products} />
        </div>
    )
}