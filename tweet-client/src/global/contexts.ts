import { createContext } from 'react';
import UserInterface from '../models/UserInterface'

interface UserContextValue {
  isLogin: boolean,
  setIsLogin: any,
  user: UserInterface,
  setUser: any,
}

export const UserContext = createContext<UserContextValue>(
  {
    isLogin: false,
    setIsLogin: null,
    user: {
      id: 0,
      email: "",
      name: "",
    },
    setUser: null
  }
)