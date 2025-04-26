import { useEffect } from "react"
import { useAuth } from "./hooks/auth"

const AuthInit = () => { 
    const { checkUser, getUser } = useAuth();

    useEffect(() => { 
        checkUser()
        getUser()
    }, [])

    return null
}

export default AuthInit
