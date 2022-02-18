import "./style.css"

<<<<<<< Updated upstream
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import axios from "axios"
import React from "react"
import GoogleLogin from "react-google-login"
import ApiPath from "../../common"
=======
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import GoogleLogin from "react-google-login";
import { CLIENT, API_PATH } from "../../common/API_PATH";
import AppUse from "../../common/AppUse"
>>>>>>> Stashed changes

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
})

const ColorButton = styled(Button)(() => ({
  marginTop: "3rem",
  backgroundColor: "#333",
  padding: "10px",
  "&:hover": { backgroundColor: "#000" },
}))
const LoginForm = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const responseGoogle = async (res) => {
<<<<<<< Updated upstream
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}${ApiPath.EXTERNAL_LOGIN}`
    let params = {
      provider: "google",
      idToken: res.tokenId
    }
    const postRes = await axios.post(apiUrl, params)
    console.log({ response: postRes })
  }
=======
    const postRes = await AppUse.PostAPi(API_PATH, {
      provider: "google",
      idToken: res.tokenId
    })
    console.log({ response: postRes });
  };
>>>>>>> Stashed changes

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
          placeholder="E.g., vuhuua@gmail.com"
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

        <GoogleLogin
          buttonText="Google"
          render={renderProps => (
            <ColorButton onClick={renderProps.onClick} variant="contained" fullWidth>
              Google
            </ColorButton>
          )}
<<<<<<< Updated upstream
          clientId={process.env.REACT_APP_CLIENT_ID}
=======
          clientId={CLIENT.GOOGLE_CLIENT_ID}
>>>>>>> Stashed changes
          onSuccess={(response) => responseGoogle(response)}
          onFailure={() => console.log("failed")}
          cookiePolicy={"single_host_origin"}
        />

        <ColorButton variant="contained" fullWidth>
          Sign in
        </ColorButton>

      </Box>
    </div>
  )
}

export default React.memo(LoginForm)
