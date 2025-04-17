import Card from "./ui/Card";
import useSWR from "swr";
import {get} from "@/app/lib/utlis"
import NotFound from "../NotFound";
import Error from "../Error";
import NoRes from "../NoRes";
import Link from "next/link";
import Loading from "../Loading";
import Products from "./ui/Products";
import { useSearchParams } from "next/navigation";
export default function ProductsFetcher({ title, type ,limit  ,link}: {title:string , type?  :string ,limit?:number , link?:string }) { 
    const params = new URLSearchParams() 
    if (type)
        params.append("product_type", type)
    if (limit != undefined)
        params.append("limit" , String(limit))
    const {data , error , isLoading } = useSWR(`/products/search?${params.toString()}` , get)
    if (isLoading)
        return <Loading />
    if (error)
        return <Error/>
    if(!data?.products?.length)
        return <NoRes/>
    return (

        <div className="flex flex-col gap-y-12 px-8 mb-18">
            { 
            link&&
            <Link href={link} className="text-white  font-bold uppercase text-4xl">{ title}</Link>
            }
            <Products products={data.products}/>
            </div>
    );
}