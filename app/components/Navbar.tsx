import { GiCpuShot } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import {   useState } from "react";
import { navLinks } from "./data/linksdata";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../hooks/auth";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const {isAuth ,user ,logout} = useAuth()
    // const { logout} = useAuth({})
    
    // Open/close the dropdown on hover
    const handleDropdownToggle = (title: string) => {
        if (dropdownOpen === title) {
            setDropdownOpen(null); // Close dropdown if it's already open
        } else {
            setDropdownOpen(title); // Open dropdown if not already open
        }
    };

    return (
        <>
            <div className="bg-gradient-to-r from-black via-black/60 to-red-900 z-50 fixed top-0 left-1/2 transform -translate-x-1/2 w-[95%] mt-8 rounded-lg font-light backdrop-blur-md flex justify-between md:justify-normal md:gap-x-25 items-center p-4 ">
                
                    
                <GiCpuShot size={50} />
     

                <div className="hidden md:flex  md:justify-around flex-1 ">
                    {navLinks.map((nav) => (
                        <div 
                            key={nav.title} 
                            className="relative group"
                            onMouseEnter={() => setDropdownOpen(nav.title)}  // Open dropdown on hover
                            onMouseLeave={() => setDropdownOpen(null)}  // Close dropdown on mouse leave
                        >
                            <div className="flex items-center gap-1 text-white hover:text-gray-300 cursor-pointer">
                                {nav.title} 
                                <FaChevronDown className="transition-transform duration-300 group-hover:rotate-180 text-red-800  " />
                            </div>
                            {dropdownOpen === nav.title && (
                                <div 
                                    className="absolute left-0 mt-2 bg-black/90 text-white p-2 rounded shadow-lg opacity-100 transition-all duration-500 ease-in-out transform scale-95 group-hover:scale-100"
                                >
                                    {nav.sublinks.map((sublink) => (
                                        <Link 
                                            key={sublink.title} 
                                            href={sublink.link} 
                                            className="block px-4 py-2 hover:border-l-2 hover:border-l-red-900 transition-colors duration-300"
                                        >
                                            {sublink.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {isAuth&&
                <button  onClick={()=>logout()} className="hover:text-black transition-colors duration-300">

<IoLogOutOutline size={50}  />
</button>
                }
                <HiMenu size={30} className="cursor-pointer md:hidden" onClick={() => setIsOpen(true)} />
            </div>

            {/* Mobile menu */}
            <div className={`fixed top-0 right-0 h-full w-80 sm:w-110 bg-gradient-to-r mt-8 from-black/50 via-black/80 to-black text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 p-6 flex flex-col z-50 md:hidden`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-x-4">
                        <GiCpuShot size={40} />
                        <h1 className="text-lg sm:text-3xl font-bold uppercase">Arcana</h1>
                    </div>
                    <HiX size={30} className="cursor-pointer" onClick={() => setIsOpen(false)} />
                </div>
                <div className="flex-1 overflow-y-auto space-y-4">
                    {navLinks.map((nav) => (
                        <div key={nav.title}>
                            <button 
                                className="w-full text-left p-2 hover:bg-gray-700 hover:border-l-2 hover:border-l-red-900 flex justify-between items-center transition-colors duration-300" 
                                onClick={() => handleDropdownToggle(nav.title)} // Toggle dropdown on click for mobile
                            >
                                {nav.title} 
                                <FaChevronDown className={`transition-transform duration-300 ${dropdownOpen === nav.title ? "rotate-180" : ""}`} />
                            </button>
                            {dropdownOpen === nav.title && (
                                <div className="ml-4 border-l border-gray-600 pl-4">
                                    {nav.sublinks.map((sublink) => (
                                        <Link 
                                            key={sublink.title} 
                                            href={sublink.link} 
                                            className="block py-1 text-gray-300 hover:text-white transition-colors duration-300"
                                        >
                                            {sublink.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
