'use client'
import { get } from "@/app/lib/utlis"
import { useParams } from "next/navigation"
import Error from "@/app/Error"
import Loading from "@/app/Loading"
import useSWR from "swr"
import NoRes from "@/app/NoRes"
export default function Product() { 
    const { id } = useParams() as {id:string}
    const {data , isLoading ,error } = useSWR(`/products/search?id=${id}`,get)
    if (isLoading)
            return <Loading />
    if (error)
            return <Error/>
    if (!data?.products?.length)
        return <NoRes />
    
    console.log(data?.products)
    return (
        <div className="mt-32 flex gap-x-3 p-4">
            <div className="flex flex-col w-[50vw] gap-y-4">

            {Object.entries(data.products[0] as any).map(([key, value]) => (
                <div className="flex gap-x-2">

                    <p className="text-gray-500 font-bold text-lg border-l-2 border-l-red-500 px-2 rounded-sm">
                        { key}
                </p>
                <p className="text-red-600">:</p>
                    <p className="text-white font-semibold text-lg">
                        {String(value)}
                </p>
                </div>
            ))
        }
        </div>
            <p className="text-white text-lg"> 
                
            </p>
            <div>
                <div></div>
                <div></div>
            </div>
            <div>
                
            </div>
        </div>
    )
}