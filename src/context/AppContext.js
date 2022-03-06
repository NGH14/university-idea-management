import {createContext, useEffect, useState} from "react";
import AppUse from "../common/AppUse";

export const AppProvider = createContext();
export const AppContext = (props) => {
    const [state, setState] = useState({
        login: null,
        loading: false,
        dataUser: {}
    })
    useEffect(()=>{
        checkLogin()
    }, [state.login])
    const checkLogin = async () =>{
        const res = await AppUse.postApi("/auth/info",
            localStorage.getItem("access_token"))
        if(res?.data?.success){
            setState({...state,
                loading: false,
                login: true,
                dataUser: res?.data?.result
            })
        } else {
            setState({...state,
                loading: false,
                login: false
            })
        }
    }

    return (
        <AppProvider.Provider value={{state, setState}}>
            {props.children}
        </AppProvider.Provider>
    );
}