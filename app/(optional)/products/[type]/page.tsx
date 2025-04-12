'use client'
import { useParams } from "next/navigation"
export default function Products() { 
    const params = useParams();
    const type = params.type
    return (
        <div className="min-h-screen w-full px-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <p className="text-3xl font-bold uppercase">{type}</p>
        </div>
    )
}