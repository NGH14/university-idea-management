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

    // <Box sx={{ display: "flex", alignItems: "center" }}>
    //   <Box sx={{ m: 1, position: "relative" }}>
    //     <Fab aria-label="save" color="primary">
    //       <img className="loadinglogo" src={UniLogo} alt="" />
    //     </Fab>

    //     <CircularProgress
    //       size={68}
    //       sx={{
    //         position: "absolute",
    //         top: -6,
    //         left: -6,
    //         zIndex: 1,
    //       }}
    //     />
    //   </Box>
    // </Box>
  );
}
export default React.memo(LoadingSpinner);
