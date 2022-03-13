import React from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormHelperText from "@mui/material/FormHelperText";
import enLocale from "date-fns/locale/en-GB";

import { useFormik } from "formik";
import * as yup from "yup";

import "./style.css";

const CssTextField = styled(TextField)({
  ".MuiFormHelperText-root": {
    fontSize: "14px",
    fontFamily: "Poppins",
  },

  "& .MuiInputBase-root": {
    color: "#000",
    fontSize: "16px",
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
  fontFamily: "Poppins",
  fontSize: "13px",
  fontWeight: "bold",
  textTransform: "none",
  minWidth: 200,
  display: "inline-block",

  margin: "10px",
  padding: "10px",

  "&:disabled ": { cursor: "not-allowed", pointerEvents: "all !important" },
}));

const validationSchema = yup.object({
  full_name: yup.string().required("Full Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  role: yup.string().required("Role is required"),
  department: yup.string().required("Department is required"),
  date_of_birth: yup.date("Date invalid").nullable(),
  user_name: yup.string().required("User Name is required"),
});

function EditUserForm(props) {
  const { onClose, onUpdate, initialValue } = props;
  const formik = useFormik({
    initialValues: initialValue || [],
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(123);
      onUpdate(values);
    },
  });

  return (
    <div className="createuserform">
      <div className="createuserform_title">
        <h2>Edit User</h2>
        <IconButton>
          <CloseIcon onClick={() => onClose()} />
        </IconButton>
      </div>
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
            <InputLabel required htmlFor="department">
              Department
            </InputLabel>
            <Select
              select
              fullWidth
              displayEmpty
              labelId="department"
              id="department"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              renderValue={
                formik.values.department !== ""
                  ? undefined
                  : () => (
                      <placeholder>
                        <em style={{ opacity: 0.6, fontSize: 14 }}>
                          -- department --
                        </em>
                      </placeholder>
                    )
              }
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
            </Select>
            <FormHelperText error>
              {formik.touched.department && formik.errors.department}
            </FormHelperText>
          </div>

          <div className="form_content">
            <InputLabel required htmlFor="role">
              Role
            </InputLabel>
            <Select
              select
              fullWidth
              displayEmpty
              labelId="role"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              renderValue={
                formik.values.role !== ""
                  ? undefined
                  : () => (
                      <placeholder>
                        <em style={{ opacity: 0.6, fontSize: 14 }}>
                          -- role --
                        </em>
                      </placeholder>
                    )
              }
              error={formik.touched.role && Boolean(formik.errors.role)}
              placeholder="E.g., vuhuua@gmail.com"
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
            </Select>
            <FormHelperText error>
              {formik.touched.role && formik.errors.role}
            </FormHelperText>
          </div>
          <div className="form_content">
            <InputLabel htmlFor="date_of_birth">Date of Birth</InputLabel>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={enLocale}
            >
              <DatePicker
                fullWidth
                disableFuture
                margin="normal"
                name="date_of_birth"
                id="date_of_birth"
                onChange={(val) => {
                  formik.setFieldValue("date_of_birth", val);
                }}
                value={formik.values.date_of_birth}
                error={
                  formik.errors.date_of_birth && formik.touched.date_of_birth
                }
                helperText={
                  formik.errors.date_of_birth && formik.touched.date_of_birth
                }
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="createuserform_footer">
          <ColorButton variant="outlined" onClick={() => onClose()}>
            Cancel
          </ColorButton>
          <ColorButton variant="contained" type="submit">
            Edit User
          </ColorButton>
        </div>
      </form>
    </div>
  );
}

export default React.memo(EditUserForm);
