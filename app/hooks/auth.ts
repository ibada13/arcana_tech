import { useDispatch, useSelector } from 'react-redux'
import { login, register, logout, checkUser, getUser } from '@/app/state/authSlice'
import { RootState, AppDispatch } from '@/app/state/store'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuth, user, loading } = useSelector((state: RootState) => state.auth)

  return {
    isAuth,
    user,
    loading,
    login: (email: string, password: string) => dispatch(login({ email, password })),
    register: (username: string, email: string, password: string) => dispatch(register({ username, email, password })),
    logout: () => dispatch(logout()),
    checkUser: () => dispatch(checkUser()),
    getUser: () => dispatch(getUser()),
  }
}
