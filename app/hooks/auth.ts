'use client'
import useSWR from 'swr'
import axios from '@/app/lib/axios'
//  import { AxiosError, AxiosResponse }  from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { headers } from 'next/headers'

interface AuthHookOptions {
    middleware?: 'auth' | 'guest'|"optional"
    redirectIfAuthenticated?: string
}
interface token { 
  access_token: string, 
  token_type :string,
}
// interface FormHandlers {
//     setErrors: (errors: Record<string, string[]>) => void
//     setStatus?: (status: string | null) => void
// }

// interface RegisterProps extends FormHandlers {
//     name: string
//     email: string
//     password: string
//     password_confirmation: string
// }

// interface LoginProps extends FormHandlers {
//     email: string
//     password: string
//     remember?: boolean
// }

// interface ForgotPasswordProps extends FormHandlers {
//     email: string
// }

// interface ResetPasswordProps extends FormHandlers {
//     email: string
//     password: string
//     password_confirmation: string
// }

// interface User {
//     id: number
//     name: string
//     email: string
//     email_verified_at: string | null
//     // add any other user fields here
// }

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthHookOptions = {}) => {

    const router = useRouter()
    const params = useParams<{ token: string }>()
    const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [User, SetUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Started fetching user..."); // Log to debug
  
      setLoading(true);  // Start loading
  
      try {
        const user = await checkUser(); // Call checkUser()
  
        console.log("User authenticated:", user); // Log user data (true or false)
  
        if (!user) {
          if (window.location.pathname !== "/login") {
            console.log("Redirecting to login...");
            router.push("/login");  // Redirect to login if not authenticated
          }
        } else {
          setIsAuth(true); // Set user as authenticated
          console.log("User is authenticated.");
  
          if (redirectIfAuthenticated) {
            console.log("Redirecting to:", redirectIfAuthenticated);
            router.push(redirectIfAuthenticated); // Redirect if authenticated
          }
        }
      } catch (err) {
        console.error("Error during auth check:", err); // Log error
        if (window.location.pathname !== "/login") {
          console.log("Redirecting to login due to error...");
          router.push("/login"); // Redirect to login if error occurs
        }
      } finally {
        console.log("Setting loading to false..."); // Log to debug
        setLoading(false); // Set loading to false when everything is done
      }
    };
  
    fetchUser();  // Start the user-fetching process
  
  }, []); // Ensure the effect runs when needed
  
  
  
    



    const login = async (email: string, password: string) => {
        try {const params = new URLSearchParams()
            params.append('username', email)
            params.append('password', password)
            const response = await axios.post('/auth/token', params, {

                headers: { "Content-Type": 'application/x-www-form-urlencoded' }
            }
            )
            console.log(response)
          const  token = (response.data as token).access_token
          localStorage.setItem('token', token)
          setIsAuth(true)
            router.push("/dashboard")
        } catch (error) {
          console.error('Login failed', error)
          throw new Error('Invalid credentials or server error')
        }
    }
    





    const register = async (username:string,email: string, password: string) => {
        try {
          const response = await axios.post('/auth/register', {username, email, password })
          const { token } = response.data.access_token
          localStorage.setItem('token', token)
          setIsAuth(true)
          router.push('/dashboard')
        } catch (error) {
          console.error('Registration failed', error)
          throw new Error('Registration failed')
        }
      }


      const logout = () => {
        localStorage.removeItem('token')
        setIsAuth(false)
        router.push('/login')  
      }
  const getUser = async () => {
    const token = localStorage.getItem("token")
    try { 
      const response  =await axios.get("/auth",
        {headers: {
          Authorization:`Bearer ${token}`,
          Accept:"application/json"
        }
        })
      return response.data
    }
    catch (error) {
      localStorage.removeItem("token")
      console.log(error)
      return null
     }
  }
  
  const checkUser = async () => {
    const token = localStorage.getItem("token")
    try { 
      await axios.get("/auth/check",
        {headers: {
          Authorization:`Bearer ${token}`,
          Accept:"application/json"
        }
        })
      return true
    }
    catch (error) {
      localStorage.removeItem("token")
      console.log(error)
      return false
     }
   }

    return {checkUser, getUser,isAuth, loading , login  , register ,logout}
    
}

//     const {
//         data: user,
//         error,
//         mutate,
//     } = useSWR<User, AxiosError>('/api/user', () =>
//         axios
//             .get<User>('/api/user')
//             .then((res: AxiosResponse<User>) => res.data)
//             .catch((error: AxiosError) => {
//                 if (error.response?.status !== 409) throw error
//                 router.push('/verify-email')
//             }),
//     )

//     const csrf = () => axios.get('/sanctum/csrf-cookie')

//     const register = async ({ setErrors, ...props }: RegisterProps) => {
//         await csrf()
//         setErrors({})

//         try {
//             const res = await axios.post('/register', props)
//             await mutate()
//         } catch (error: unknown) {
//             const axiosError = error as AxiosError
//             if (axiosError.response?.status !== 422) throw axiosError

//             setErrors(axiosError.response.data.errors)
//         }
//     }

//     const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
//         await csrf()
//         setErrors({})
//         setStatus?.(null)

//         try {
//             const res = await axios.post('/login', props)
//             await mutate()
//         } catch (error: unknown) {
//             const axiosError = error as AxiosError
//             if (axiosError.response?.status !== 422) throw axiosError

//             setErrors(axiosError.response.data.errors)
//         }
//     }

//     const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps) => {
//         await csrf()
//         setErrors({})
//         setStatus?.(null)

//         try {
//             const res = await axios.post<{ status: string }>('/forgot-password', { email })
//             setStatus?.(res.data.status)
//         } catch (error: unknown) {
//             const axiosError = error as AxiosError
//             if (axiosError.response?.status !== 422) throw axiosError

//             setErrors(axiosError.response.data.errors)
//         }
//     }

//     const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPasswordProps) => {
//         await csrf()
//         setErrors({})
//         setStatus?.(null)

//         try {
//             const res = await axios.post<{ status: string }>('/reset-password', {
//                 token: params.token,
//                 ...props,
//             })

//             router.push('/login?reset=' + btoa(res.data.status))
//         } catch (error: unknown) {
//             const axiosError = error as AxiosError
//             if (axiosError.response?.status !== 422) throw axiosError

//             setErrors(axiosError.response.data.errors)
//         }
//     }

//     const resendEmailVerification = async ({ setStatus }: { setStatus: (status: string) => void }) => {
//         const res = await axios.post<{ status: string }>('/email/verification-notification')
//         setStatus(res.data.status)
//     }

//     const logout = async () => {
//         if (!error) {
//             await axios.post('/logout')
//             await mutate()
//         }

//         window.location.pathname = '/login'
//     }

//     useEffect(() => {
//         if (middleware === 'guest' && redirectIfAuthenticated && user) {
//             router.push(redirectIfAuthenticated)
//         }

//         if (middleware === 'auth') {
//             if (user && !user.email_verified_at) {
//                 router.push('/verify-email')
//             } else if (error) {
//                 logout()
//             }
//         }

//         if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
//             router.push(redirectIfAuthenticated || '/')
//         }
//     }, [user, error])

//     return {
//         user,
//         register,
//         login,
//         forgotPassword,
//         resetPassword,
//         resendEmailVerification,
//         logout,
//     }
// }
// ``
