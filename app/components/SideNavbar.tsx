'use client'
import Link from "next/link"
import { LuLayoutDashboard } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { useAuth } from "../hooks/auth";
import { IoLogOutOutline } from "react-icons/io5";
export default function SideNavbar() { 
    const {isAuth ,logout } = useAuth()
    if (!isAuth)
        return null
    return (
        <div className="fixed top-1/3 left-0 transform ml-4 rounded-xl bg-red-500/50 z-50 flex flex-col justify-around items-center h-1/2">
            <Link href={""} className="p-3 hover:text-black transition-colors duration-300"><LuLayoutDashboard size={35}/></Link>
            <Link href={""} className="p-3 hover:text-black transition-colors duration-300"><CiCirclePlus size={35}/></Link>
            <button  onClick={()=>logout()} className="hover:cursor-pointer hover:text-black transition-colors duration-300 p-3 text-center">
                <IoLogOutOutline size={35}  />
            </button>
                           
        </div>
    )
}