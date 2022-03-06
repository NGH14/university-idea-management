import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { useFormik } from "formik";
import * as yup from "yup";

import AppUse from "../../common/AppUse";

import "./style.css";

const CssTextField = styled(TextField)({
  ".MuiFormHelperText-root": {
    fontFamily: "Poppins",
    fontSize: "12px",
  },
  "& .MuiInputBase-root": {
    fontFamily: "Poppins",
    color: "#000",
    fontSize: "14px",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
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
  display: "block",
  color: textcolor || "#fff",
  margin: "1rem 0 1.75rem auto",
  padding: "10px",
  backgroundColor: bgcolor || "#333",

  "&:hover": { backgroundColor: hoverbgcolor || "#000" },
  "&:disabled ": { cursor: "not-allowed", pointerEvents: "all !important" },
  "&:disabled:hover ": { backgroundColor: "rgba(0, 0, 0, 0.12)" },
}));

const initialValues = {
  user_name: "",
  full_name: "",
  department: "",
  email: "",
  role: "",
  password: "",
  confirm_password: "",
  date_of_birth: null,
};

const validationSchema = yup.object({
  user_name: yup.string().required("UserName is required"),
  full_name: yup.string().required("Full Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  // role: yup.string().required("Role is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
  department: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
  date_of_birth: yup.date("Date invalid").nullable(),
});

function CreateUserForm() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="createuserform">
      <h2 className="createuserform-tittle">Create New User</h2>
      <br />

      <form className="form_grid" onSubmit={formik.handleSubmit}>
        <div className="form_group">
          <div className="form_content">
            <InputLabel required htmlFor="full_name">
              Full Name
            </InputLabel>
            <CssTextField
              fullWidth
              margin="normal"
              id="full_name"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.full_name && Boolean(formik.errors.full_name)
              }
              helperText={formik.touched.full_name && formik.errors.full_name}
            />
          </div>
          <div className="form_content">
            <InputLabel required htmlFor="user_name">
              Username
            </InputLabel>
            <CssTextField
              fullWidth
              margin="normal"
              id="user_name"
              name="user_name"
              value={formik.values.user_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.user_name && Boolean(formik.errors.user_name)
              }
              helperText={formik.touched.user_name && formik.errors.user_name}
            />
          </div>
        </div>

        <div className="form_group">
          <div>
            <InputLabel required htmlFor="email">
              Email
            </InputLabel>
            <CssTextField
              fullWidth
              variant="outlined"
              id="email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
        </div>

        <div className="form_group">
          <div className="form_content">
            <InputLabel required htmlFor="password">
              Password
            </InputLabel>
            <CssTextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="form_content">
            <InputLabel required htmlFor="confirm_password">
              Confirm Password
            </InputLabel>
            <CssTextField
              fullWidth
              margin="normal"
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
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
            />
          </div>
        </div>

        <div className="form_group">
          <div className="form_content">
            <InputLabel htmlFor="department">Department</InputLabel>
            <Select
              fullWidth
              labelId="department"
              id="department"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              native
            >
              <option value={"IT"}>IT</option>
              <option value={"HR"}>HR</option>
            </Select>
          </div>

          <div className="form_content">
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              fullWidth
              labelId="role"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              native
            >
              <option value={"Admin"}>Admin</option>
              <option value={"HR"}>HR</option>
            </Select>
          </div>
          <div className="form_content">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <InputLabel htmlFor="date_of_birth">DoB</InputLabel>
              <KeyboardDatePicker
                inputVariant="outlined"
                name="date_of_birth"
                id="date_of_birth"
                fullWidth
                onChange={(val) => {
                  formik.setFieldValue("date_of_birth", val);
                }}
                value={formik.values.date_of_birth}
                format="dd/MM/yyyy"
                error={
                  formik.errors.date_of_birth && formik.touched.date_of_birth
                }
                helperText={
                  formik.errors.date_of_birth && formik.touched.date_of_birth
                }
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <ColorButton
          variant="contained"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Create
        </ColorButton>
      </form>
    </div>
  );
}

export default React.memo(CreateUserForm);
