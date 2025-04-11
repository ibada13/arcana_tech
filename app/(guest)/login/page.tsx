'use client'
import { useAuth } from "@/app/hooks/auth"
import { FormEvent } from "react"
const LoginPage = () => {
    const { login, loading } = useAuth({redirectIfAuthenticated:"/"})

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
        await login(
            (event.currentTarget.email as HTMLInputElement).value,
            (event.currentTarget.password as HTMLInputElement).value
          )
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-y-15">
      <input  name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" className="bg-red-500 hover:bg-red-900">Login</button>
    </form>
  )
}
export default LoginPage