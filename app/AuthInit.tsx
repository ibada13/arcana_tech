import { useEffect } from "react"
import { useAuth } from "./hooks/auth"
const AuthInit = () => { 
    const { checkUser, getUser } = useAuth();
    useEffect(() => { 
        checkUser()
        getUser()
    },[getUser , checkUser])

    return null
}




export default AuthInit