import Link from "next/link";
import Image from "next/image";
export default function Card() { 
    return (
        <Link href={""} className="flex flex-col w-64 h-48 border-2">
            <div className=" w-full flex-1">
                {/* <Image fill src={""} alt="" /> */}
            </div>
            <div className="">
                <p>somgegeo title</p>
             </div>
        </Link>
    );
}