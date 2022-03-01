import {useContext, useEffect} from "react";
import {UserContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";

function PublicRoute({children}){
    const navigate = useNavigate();
    const {state, setState} = useContext(UserContext)
    useEffect(()=>{
        if(!state?.isLogin){
            navigate('/login')
        }
    })
    return children
}
export default PublicRoute;