'use client'
import { get } from "@/app/lib/utlis"
import { useParams } from "next/navigation"
import Error from "@/app/Error"
import Loading from "@/app/Loading"
import useSWR from "swr"
import NoRes from "@/app/NoRes"
import { ProductType } from "../../data/type"
interface ResponseType { 
    product:ProductType
}
export default function Product() { 
    const { id } = useParams() as {id:string}
    const {data , isLoading ,error } = useSWR<ResponseType>(`/product?id=${id}`,get)
    if (isLoading)
            return <Loading />
    if (error)
            return <Error/>
    if (!data?.product)
        return <NoRes />
    
    console.log(data?.product)
    
    const { name  ,price, id:prid , description ,...product} = data.product
    return (
        <div className="mt-32 flex flex-col gap-y-4  p-4">
            <div>
                <p className="text-4xl text-white font-bold text-center">
                    {name}
                </p>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-x-3">

            <div className="flex flex-col w-[50vw] gap-y-4">

            {Object.entries(product as any).map(([key, value]) => (
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
                    <div className="h-screen flex-grow  bg-red-400">alo</div>
                    <div className="h-screen w-[10vw]  bg-blue-400">test</div>
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