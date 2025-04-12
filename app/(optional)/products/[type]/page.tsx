'use client'
import { useParams } from "next/navigation"
import useSWR from "swr";
import { get } from "@/app/lib/utlis";
import Card from "@/app/components/ui/Card";
import Products from "@/app/components/Products";
export default function page() { 
    const params = useParams();
    const type = params.type
    const {data,error ,isLoading } = useSWR(`/products/search?product_type=${type}` , get)
    if (isLoading)
        return <div>loading.....</div>
    return (
        <div className="min-h-screen w-full mt-32">
            {/* <p className="text-3xl font-bold uppercase"></p> */}
         <Products title={type as string} products={data.data}/>
        </div>
    )
}