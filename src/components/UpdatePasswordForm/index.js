import "./style.css";

import Button from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { AuthRequest } from "../../common/AppUse";
import { API_PATHS, URL_PATHS } from "../../common/env";
import { Notification } from "../../common/Notification";

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
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

const initialValues = {
  password: "",
  confirm_password: "",
};

// ─── MAIN ───────────────────────────────────────────────────────────────────────
//
const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState({
    disable: false,
    loading: false,
  });

  const [notification, setNotification] = useState({
    visibleNotification: false,
    titleNotification: "Something went wrong!",
    typeNotification: "error",
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onCloseNotification = () => {
    setNotification({ ...notification, visibleNotification: false });
  };

  const onSubmit = async (value) => {
    await AuthRequest.post(API_PATHS.SHARED.AUTH.UPDATE_PWD, value).then(
      (res) => {
        if (res?.data?.succeeded) {
          setButtonState({ ...buttonState, loading: false, disable: false });
          setNotification({ ...notification, visibleNotification: true });
          navigate(URL_PATHS.HOME);
        }
      },
    );
  };

  return (
    <div className="updatepwdform">
      <div className="updatepwdform-textcontent">
        <h1 className="updatepwdform-heading">UIM</h1>
        <span className="updatepwdform-subtext">
          Please Update Your Password
        </span>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <CssTextField
          fullWidth
          id="password"
          label="Password"
          name="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <CssTextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          name="confirm_password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />

        <ColorButton
          variant="contained"
          type="submit"
          loading={buttonState?.loading}
          loadingPosition="end"
          disabled={buttonState.disable}
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

export default React.memo(UpdatePasswordForm);
