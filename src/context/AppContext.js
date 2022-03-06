import { createContext, useEffect, useState } from "react"
import AppUse from "../common/AppUse"
import { API_PATHS, STORAGE_VARS } from "../common/env"
import {CircularProgress} from "@mui/material";

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
    const res = await AppUse.getApi(API_PATHS.AUTH_INFO, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`
      }
    })

    if (res?.data?.succeeded) {
      setState({
        ...state,
        loading: false,
        isLogin: true,
        dataUser: res?.data?.result
      })
    } else {
      setState({
        ...state,
        loading: false,
        isLogin: false
      })
    }
  }
  if(state.loading){
    return  <CircularProgress />
  }
  return (
    <UserContext.Provider value={{ state, setState }}>
      {props.children}
    </UserContext.Provider>
  )
}
