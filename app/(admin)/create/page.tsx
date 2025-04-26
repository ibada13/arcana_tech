'use client';
import { useEffect } from "react";
import { useAuth } from "@/app/hooks/auth";
import { useRouter } from "next/navigation";
export default function Create() {
    const { isAuth } = useAuth()
    const router = useRouter()
    useEffect(() => { 
        if(!isAuth)
            router.push("/")
    },[isAuth])
    return (
        <div>
            
        </div>
    )
}