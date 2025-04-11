import Link from "next/link";
import Image from "next/image";
import { Pc } from "../data/pcsdata";

export default function Card({ pc }: { pc: Pc }) {
    return (
        <Link 
            href={`/pc/${pc.id}`} 
            className="flex flex-col w-64 h-auto border-2 border-transparent bg-gray-800 rounded-xl p-4 transition-all hover:shadow-xl hover:border-gray-600 transform hover:scale-105">
            <div className="relative h-48 w-full mb-2 rounded-lg overflow-hidden">
                <Image
                    src={pc.image} 
                    alt={`${pc.id} image`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 transform hover:scale-110"
                />
            </div>
            <p className="text-xl font-semibold text-white text-center truncate">{pc.id}</p>
        </Link>
    );
}
