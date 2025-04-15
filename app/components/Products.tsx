import Card from "./ui/Card";
import useSWR from "swr";
import {get} from "@/app/lib/utlis"
import NotFound from "../NotFound";
import Error from "../Error";
import NoRes from "../NoRes";
import Link from "next/link";
import Loading from "../Loading";
import { useSearchParams } from "next/navigation";
export default function Products({ title, type ,limit  ,link}: {title:string , type?  :string ,limit?:number , link?:string }) { 
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
        <div id="pcs" className="w-full self-center  min-h-screen place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15 ">

            {data.products.map((item:any, index:number) => (
                <Card product={item} key={`pc-${index}`}/>
            ))}
        </div>
            </div>
    );
}