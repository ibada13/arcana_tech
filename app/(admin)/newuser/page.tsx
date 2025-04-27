'use client'
import { useAuth } from "@/app/hooks/auth"
import { FormEvent, useEffect, useState } from "react"
import { GiCpuShot } from "react-icons/gi";
import Loading from "@/app/Loading";
import { useRouter } from "next/navigation";
const NewUser = () => {
  const { isAuth, loading, register } = useAuth()
  const [UserCreatedSuc ,SetUserCreatedSuc] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => { 
    if (!isAuth) { 
      router.push("/")
    }
  },[isAuth ,router])
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await register(
        (event.currentTarget.username as HTMLInputElement).value,
        (event.currentTarget.email as HTMLInputElement).value,
        (event.currentTarget.password as HTMLInputElement).value
      )
      SetUserCreatedSuc(true)


    } catch (error) {
      console.error(error)
    } finally { 
      setTimeout(() => { 
        SetUserCreatedSuc(false)
      },3000)
    }
  }

  if (loading)
    return <Loading/>


  return (
    <div className="relative w-screen min-h-screen p-4 bg-gray-900 flex items-center justify-center">

    <form onSubmit={handleLogin} className="flex flex-col items-center bg-black gap-y-8 min-h-2/3 w-2/5 shadow-2xl mt-32 rounded-lg p-4">
    <GiCpuShot color="#f00"  size={90}/>
    <p className="text-2xl uppercase">register new user</p>
        <div className="flex flex-col gap-y-3 w-full">
          <label className="text-xl  font-bold" htmlFor="">Username</label>
      <input className="focus:ring-0 focus:outline-0 bg-gray-800 p-2 rounded-lg"  name="username" placeholder="Enter Your Username" required />
        </div>
        <div className="flex flex-col gap-y-3 w-full">
          <label className="text-xl  font-bold" htmlFor="">Email</label>
      <input className="focus:ring-0 focus:outline-0 bg-gray-800 p-2 rounded-lg"  name="email" placeholder="Enter Your Email" required />
      </div>
        <div className="flex flex-col gap-y-3 w-full">
         <label className="text-xl  font-bold" htmlFor="">Password</label> 
      <input className="focus:ring-0 focus:outline-0 bg-gray-800 p-2 rounded-lg" type="password" name="password" placeholder="Enter Your Password" required />
        </div>
        
      <button type="submit" className="bg-red-500 uppercase hover:bg-red-900 transition-all duration-300 p-4 rounded-lg">submit</button>
      </form>
      {UserCreatedSuc &&
        <div onClick={()=>SetUserCreatedSuc(false)} className="fixed bg-green-500 rounded-xl bottom-1/12 right-1/15 p-8">
          <p className="uppercase text-3xl font-bold ">User Created</p>
        </div>
      }
    </div>
  )
}
export default NewUser