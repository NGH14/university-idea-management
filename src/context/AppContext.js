import { createContext, useEffect, useLayoutEffect, useState } from "react"
import {API_PATHS, STORAGE_VARS} from "../common/env"
import LoadingSpinner from "../components/LoadingSpinner"
import { AuthRequest } from "../common/AppUse"

export const UserContext = createContext()
export const AppContext = (props) => {
  const [state, setState] = useState({
    isLogin: false,
    loading: true,
    dataUser: {},
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await AuthRequest.get(API_PATHS.AUTH_INFO)
      if (res?.data?.succeeded) {
        setState({
          ...state,
          loading: false,
          isLogin: true,
          dataUser: res?.data?.result,
        })
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        isLogin: false,
      })
    }
  }


  return (
    <UserContext.Provider value={{ state, setState }}>
      {props.children}
    </UserContext.Provider>
  )
}
