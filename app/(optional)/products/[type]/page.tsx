'use client'
import { useParams } from "next/navigation"
import useSWR from "swr";
import { get } from "@/app/lib/utlis";
import ProductsFetcher from "@/app/components/ProductFetcher";
export default function page() { 
    const {type} = useParams() as {type:string};

    return (
        <ProductsFetcher type={type} title={type} />
    )
}