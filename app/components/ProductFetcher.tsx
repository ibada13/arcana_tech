'use client'
import { useParams } from "next/navigation"
import useSWR from "swr";
import { get } from "@/app/lib/utlis";
import Card from "@/app/components/ui/Card";
import Products from "@/app/components/ui/Products";
import Loading from "@/app/Loading";
import Error from "@/app/Error";
import  NoRes from "@/app/NoRes"
import { useMemo } from "react";
import { ProductsType } from "../(optional)/data/type";
interface ResponseType  { 
    products :ProductsType[]
}
export default function ProductsFetcher({title , type , feed , limit  }: {title?:string ,type?:string , feed?:string , limit?:string}) { 
    const query = useMemo(() => {
        const p = new URLSearchParams();
        if (type) p.append("product_type", type);
        if (feed) p.append("feed", feed);
        if (limit) p.append("limit", limit);
        return `/products/search?${p.toString()}`;
      }, [type, feed, limit]);
      
      const { data, error, isLoading } = useSWR<ResponseType>(query, get);
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