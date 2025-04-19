'use client';
import { useParams ,useSearchParams} from "next/navigation";
import useSWR from "swr";
import Products from "@/app/components/ui/Products";
import {get } from "@/app/lib/utlis"
import ProductsFetcher from "@/app/components/ProductFetcher";
const allowedTitles: Record<string, string> = {
    best: "Our Best Sellers",
    new: "New Arrivals",
    sale: "On Sale",
  }

export default function Page() { 
    const searchparams = useSearchParams()

    const { feed } = useParams() as {feed:string}
        const title = allowedTitles[feed] ||feed

    return (
        <ProductsFetcher title={ title } feed={feed} />
    )
}