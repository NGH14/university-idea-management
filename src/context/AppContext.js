import {createContext, useEffect, useState} from "react";
import AppUse from "../common/AppUse";

export const UserContext = createContext();
export const AppContext = (props) => {
    const [state, setState] = useState({
        isLogin: false,
        loading: true,
        dataUser: {}
    })
    // useEffect(()=>{
    //     checkLogin()
    // }, [state.isLogin])
    // const checkLogin = async () =>{
    //     const res = await AppUse.postApi("/auth/info",{
    //         accessToken: localStorage.getItem("accessToken")
    //     })
    //     if(res?.data?.success){
    //         setState({...state,
    //             loading: false,
    //             isLogin: true,
    //             dataUser: res?.data?.result
    //         })
    //     } else {
    //         setState({...state,
    //             loading: false,
    //             isLogin: false
    //         })
    //     }
    // }

    return (
        <UserContext.Provider value={{state, setState}}>
            {props.children}
        </UserContext.Provider>
    );
}