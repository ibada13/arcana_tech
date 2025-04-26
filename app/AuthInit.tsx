import { useEffect } from "react"
import { useAuth } from "./hooks/auth"

const AuthInit = () => { 
    const { checkUser } = useAuth();

    useEffect(() => { 
        checkUser()
    }, [])

    return null
}

export default AuthInit
