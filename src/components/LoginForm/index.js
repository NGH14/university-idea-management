import React from "react";

import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';
import "./style.css";
import GoogleLogin from "react-google-login";

const CssTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    fontFamily: "Poppins",
    color: "#000",
  },

  "& .MuiFormLabel-root": {
    color: "#999",
    fontFamily: "Poppins",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
    },
    "&:hover fieldset": {
      border: "1px solid #000000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #000000",
    },
  },
});

const ColorButton = styled(Button)(() => ({
  marginTop: "3rem",
  backgroundColor: "#333",
  padding: "10px",
  "&:hover": { backgroundColor: "#000" },
}));
const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const responseGoogle = (response) => {
    console.log(response, 123);
  }

  return (
    <div className="loginform">
      <Box component="form" noValidate autoComplete="off">
        <div className="loginform-textcontent">
          <h1 className="loginform-heading">UIM Login</h1>
          <span className="loginform-subtext">
            Welcome to university idea management
          </span>
        </div>

        <CssTextField
          id="Email"
          label="Email"
          placeholder="E.g. vuhuua@gmail.com"
          value={email}
          onChange={handleChangeEmail}
          margin="normal"
          fullWidth
        />
        <CssTextField
          id="Password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          margin="normal"
          onChange={handleChangePassword}
          fullWidth
          type="password"
        />
        <div style={{width: "100%"}}>
          <div style={{float:"right"}}>
            <span className="loginform-subtext">Login account with  </span>
            <GoogleLogin
                buttonText={"Google"}
                clientId="149599602064-503d6jfus46t0o24gik0eeinpmj6si33.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
          </div>

        </div>
        <ColorButton variant="contained" fullWidth>
          Sign in
        </ColorButton>

      </Box>
    </div>
  );
};

export default React.memo(LoginForm);
