import { FaChevronDown } from "react-icons/fa";

export default function Button() { 
    return (
        <div className=" absolute top-6/12 flex flex-col font-light items-center justify-around h-3/4  w-full  p-6 text-center">
            <div className="flex flex-col justify-around gap-y-8">
                <p className="text-6xl text-red-800 uppercase font-bold">Arcana Tech,
                    Made Easy.</p>
                <p className="text-xl text-red-300">Discover the Best Products.</p>
            </div>
            <a href="">

            <FaChevronDown className="font-light text-red-200"  size={80}/>
            </a>
        </div>
    );
}