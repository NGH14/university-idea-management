import { TextField } from "@mui/material"

import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import * as yup from "yup";

import { AUTH, URL_PATHS, STORAGE_VARS, API_PATHS } from "../../common/env"
import { AnonRequest } from "../../common/AppUse"

import "./style.css"
import { UserContext } from "../../context/AppContext"
import { Notification } from "../../common/Notification"
import {useNavigate} from "react-router-dom";

const CssTextField = styled(TextField)({
  ".MuiFormHelperText-root": {
    fontFamily: "Poppins",
    fontSize: "14px",
  },
  "& .MuiInputBase-root": {
    fontFamily: "Poppins",
    color: "#000",
    fontSize: "16px",
  },

  "& .MuiFormLabel-root": {
    color: "#999",
    fontFamily: "Poppins",
    fontSize: "16px",
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

const ColorButton = styled(Button)(({ bgcolor, hoverbgcolor, textcolor }) => ({
  fontFamily: "Poppins",
  fontSize: "13px",
  fontWeight: "600",
  textTransform: "none",
  lineHeight: "30px",

  color: textcolor || "#fff",
  margin: "1rem auto 1.75rem",
  padding: "10px",
  backgroundColor: bgcolor || "#333",

  "&:hover": { backgroundColor: hoverbgcolor || "#000" },
  "&:disabled ": { cursor: "not-allowed", pointerEvents: "all !important" },
  "&:disabled:hover ": { backgroundColor: "rgba(0, 0, 0, 0.12)" },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(UserContext);
  const [buttonState, setButtonState] = useState({
    disable: false,
    loading: false,
  });

  const [notification, setNotification] = useState({
    visibleNotification: false,
    titleNotification: "Email or password is invalid, Please try again",
    typeNotification: "error", //error or success
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setButtonState({ ...buttonState, loading: true, disable: true });
      onLogin(values);
    },
  });
  const onCloseNotification = () => {
    setNotification({ ...notification, visibleNotification: false });
  };
  const onLogin = async (value) => {
    try {
      const res = await AnonRequest.post(API_PATHS.LOGIN, value);
      if (res?.data?.succeeded) {
        localStorage.setItem(
          STORAGE_VARS.JWT,
          res?.data?.result?.access_token?.token
        );
        localStorage.setItem(
          STORAGE_VARS.REFRESH,
          res?.data?.result?.refresh_token
        );
        setButtonState({ ...buttonState, loading: false, disable: false });
        setState({ ...state, isLogin: true});
        navigate("/")
      }
    } catch {
      setButtonState({ ...buttonState, loading: false, disable: false });
      setNotification({ ...notification, visibleNotification: true });
    }
  };

  const responseGoogle = async (googleResponse) => {
    try {
      const res = await AnonRequest.post(API_PATHS.EXTERNAL_LOGIN, {
        provider: "google",
        id_token: googleResponse.tokenId,
      });
      if (res?.data?.succeeded) {
        localStorage.setItem(
          STORAGE_VARS.JWT,
          res?.data?.result?.access_token?.token
        );
        localStorage.setItem(
          STORAGE_VARS.REFRESH,
          res?.data?.result?.refresh_token
        );
        setButtonState({ ...buttonState, loading: false, disable: false });
        setState({ ...state, isLogin: true});
      }
    } catch {
      setButtonState({ ...buttonState, loading: false, disable: false });
      setNotification({ ...notification, visibleNotification: true });
    }
  };

  return (
    <div className="loginform">
      <div className="loginform-textcontent">
        <h1 className="loginform-heading">UIM Login</h1>
        <span className="loginform-subtext">
          Welcome to university idea management
        </span>
      </div>
      <GoogleLogin
        buttonText="Google"
        render={(renderProps) => (
          <ColorButton
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={renderProps.onClick}
            variant="contained"
            bgcolor={"#fff"}
            textcolor={"#444"}
            hoverbgcolor={"#fff"}
          >
            Sign in with Google
          </ColorButton>
        )}
        clientId={AUTH.GOOGLE_CLIENT_ID}
        onSuccess={(response) => responseGoogle(response)}
        cookiePolicy={"single_host_origin"}
      />
      <div className="loginform-loginby">
        <span className="textwithline">or Sign in with Email</span>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <CssTextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          placeholder="E.g., vuhuua@gmail.com"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <CssTextField
          fullWidth
          margin="normal"
          placeholder="Enter your password"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <ColorButton
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
          loading={buttonState?.loading}
          loadingPosition="end"
          disabled={!(formik.isValid && !buttonState.disable)}
          fullWidth
        >
          Sign in
        </ColorButton>
      </form>
      {notification.visibleNotification && (
        <Notification
          visible={notification.visibleNotification}
          message={notification.titleNotification}
          type={notification.typeNotification}
          onClose={onCloseNotification}
        />
      )}
    </div>
  );
};

export default React.memo(LoginForm);
