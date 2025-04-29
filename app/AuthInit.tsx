import { useEffect } from "react"
import { useAuth } from "./hooks/auth"

const AuthInit = () => { 
    const { checkUser } = useAuth();

    useEffect(() => { 
        const  intervalId = setInterval(

           ()=> checkUser()
            ,13000
        )
        return () => clearInterval(intervalId);
    }, [])

    return null
}

export default AuthInit
