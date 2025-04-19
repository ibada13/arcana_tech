'use client'
import { useParams } from "next/navigation"
import useSWR from "swr";
import { get } from "@/app/lib/utlis";
import Card from "@/app/components/ui/Card";
import Products from "@/app/components/ui/Products";
import Loading from "@/app/Loading";
import Error from "@/app/Error";
import  NoRes from "@/app/NoRes"
export default function ProductsFetcher({title , type , feed , limit  }: {title?:string ,type?:string , feed?:string , limit?:string}) { 
    const params = new URLSearchParams()
    if (type)
        params.append("type", type)
    if (feed)
        params.append("feed", feed)
    if (limit)
        params.append("limit", limit)
    
    const {data,error ,isLoading } = useSWR(`/products/search?${params.toString()}` , get)
    if (isLoading)
        return <Loading/>
    if (error)
        return <Error />
    if (!data?.products?.length)
        return <NoRes />
    
    return (
        <div className="min-h-screen w-full flex flex-col gap-y-8 mt-32 p-4">
            {/* <p className="text-3xl font-bold uppercase"></p> */}
            {title &&
                <p className="text-4xl font-bold uppercase">{ title}</p>
             }
            <Products products={data.products} />
        </div>
    )
}