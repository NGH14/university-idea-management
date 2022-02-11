import RightSideLogin from "../../components/ButtonLogin";
import loginImg from "../../assets/images/Contact-CIC-Education-2-1024x858.jpg";
import logoBlack from "../../assets/images/2021-Greenwich-Black-Eng.png";

import "./style.css";
export default function Login() {
  return (
    <div className="loginpage-wrapper">
      <div className="loginpage-leftside">
        <img src={logoBlack} alt="" className="leftside_logo" />
      </div>
      <div className="loginpage-rightside">
        <RightSideLogin src={loginImg} />
        <p className="loginpage-rightside_textoverlay">
          UNIVERSITY IDEA MANAGEMENT <br></br>
          <span className="loginpage-rightside_smalltext">
            made by group 26 with passion
          </span>
        </p>
      </div>
    </div>
  );
}
