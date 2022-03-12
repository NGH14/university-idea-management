import { createContext, useEffect, useState } from "react"
import { API_PATHS, STORAGE_VARS } from "../common/env"
import LoadingSpinner from "../components/LoadingSpinner"
import {RequestApi} from "../common/AppUse";

export const UserContext = createContext()
export const AppContext = (props) => {
  const [state, setState] = useState({
    isLogin: false,
    loading: true,
    dataUser: {},
  })

  useEffect(() => {
    checkAuth()
  }, [localStorage.getItem(STORAGE_VARS.JWT)])

  const checkAuth = async () => {
    try {
      const res = await RequestApi.getApi(API_PATHS.AUTH_INFO)
      if (res?.data?.succeeded) {
        setState({
          ...state,
          loading: false,
          isLogin: true,
          dataUser: res?.data?.result,
        })
      } else {
        setState({
          ...state,
          loading: false,
          isLogin: false,
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

  if (state.loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <UserContext.Provider value={{ state, setState }}>
      {props.children}
    </UserContext.Provider>
  )
}
