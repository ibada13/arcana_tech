import Card from "./ui/Card";
import useSWR from "swr";
import {get} from "@/app/lib/utlis"
import NotFound from "../NotFound";
import Error from "../Error";
import NoRes from "../NoRes";
import Link from "next/link";
import Loading from "../Loading";
import Products from "./ui/Products";


const allowedTitles: Record<string, string> = {
    best: "Our Best Sellers",
    new: "New Arrivals",
    sale: "On Sale",
  }
type Feed = "best"|"new"
export default function ProductsFetcherSection({ title, type ,limit  ,link ,feed}: {title:string , type?  :string ,limit?:number , link?:string ,feed?:Feed }) { 
    const params = new URLSearchParams() 
    if (type)
        params.append("product_type", type)
    if (limit != undefined)
        params.append("limit" , String(limit))
    if (feed)
        params.append("feed", feed)
    
    const {data , error , isLoading } = useSWR(`/products/search?${params.toString()}` , get)
    if (isLoading)
        return <Loading />
    if (error)
        return <Error/>
    if(!data?.products?.length)
        return <NoRes/>
    return (

        <div className="flex flex-col gap-y-8 px-8 ">
            { 
            link&&
            <Link href={link} className="text-white  font-bold uppercase text-4xl hover:underline hover:tracking-wider w-1/2 transition-all duration-300">{ title}</Link>
            }
            <Products products={data.products}/>
            </div>
    );
}