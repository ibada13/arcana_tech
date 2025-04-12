import Link from "next/link";
import Image from "next/image";
import { Pc } from "../data/data";

export default function Card({ product }: { product: any }) {
    return (
        <Link
            href={`/pc/${product.id}`}
            className="group relative w-64 rounded-2xl overflow-hidden border border-gray-700 bg-black/60 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
            <div className="relative h-44 w-full mb-12">
                <Image
                    src={product.image}
                    alt={`${product.name}`}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-105"
                />
                <Image
                    src={product.alternate_images[0]}
                    alt={`${product.name} alt`}
                    fill
                    className="object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-105"
                />
            </div>

            <div className=" p-4 flex justify-between items-center">
                <p className="text-white text-center text-lg font-semibold truncate">{product.name}</p>
                <p className="text-center text-lg font-bold  text-gray-500 underline group-hover:text-green-400 group-hover:no-underline transition-all duration-300">99.99$</p>
            </div>

            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gray-500/80 transition-all duration-300 pointer-events-none" />
        </Link>
    );
}
