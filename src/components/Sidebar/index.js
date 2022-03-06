import React, {useContext} from "react";
import "./style.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {IconButton} from "@mui/material";
import {STORAGE_VARS} from "../../common/env";
import {UserContext} from "../../context/AppContext";
import LogoutIcon from '@mui/icons-material/Logout';
function Sidebar() {
  const {state, setState} = useContext(UserContext)

  const onLogout = () => {

    localStorage.removeItem(STORAGE_VARS.JWT)
    localStorage.removeItem(STORAGE_VARS.REFRESH)
    setState({...state, isLogin: false, loading: true})

  }

  return <div className="sidebar">
    <div >sidebar</div>;
    <IconButton onClick={() => onLogout()} >
      <LogoutIcon />
    </IconButton>
  </div>

}

export default React.memo(Sidebar);
