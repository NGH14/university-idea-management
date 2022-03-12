import RightSideLogin from "../../components/LoginRightSide";
import LeftSideLogin from "../../components/LoginLeftSide";

import loginImg from "../../assets/images/Contact-CIC-Education-2-1024x858.webp";
import logoBlack from "../../assets/images/2021-Greenwich-Black-Eng.webp";

import "./style.css";

export default function Login() {
  return (
    <div className="loginpage-wrapper">
      <LeftSideLogin src={logoBlack} />
      <RightSideLogin src={loginImg} />
    </div>
  );
}
