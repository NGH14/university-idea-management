import React from "react";
import LoginForm from "../LoginForm";
import "./style.css";

const LeftSideLogin = ({ src }) => {
  return (
    <>
      <div className="loginpage-leftside">
        <img src={src} alt="" className="leftside_logo" />

        <div className="leftside_content">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default React.memo(LeftSideLogin);
