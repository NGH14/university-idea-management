import React from "react";
import { CircularProgress } from "@mui/material";
import UniLogo from "../../assets/images/logo-500.webp";
import "./style.css";

function LoadingSpinner() {
  return (
    <div className="loading_page">
      <div className="loading_content">
        <CircularProgress
          size={100}
          sx={{
            position: "absolute",
            // top: -6,
            // left: -10,
            // zIndex: 1,
          }}
        />

        <img className="loading_logo" src={UniLogo} alt="" />
      </div>
    </div>
  );
}
export default React.memo(LoadingSpinner);
