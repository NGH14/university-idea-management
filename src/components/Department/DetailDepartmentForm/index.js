import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { textTransform } from "@mui/system";
import { useFormik } from "formik";
import React from "react";

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

function DetailDepartmentForm(props) {
  const { onClose, initialValue } = props;

  const formik = useFormik({
    initialValues: initialValue || [],
  });

  return (
    <div className="detaildepartmentform">
      <div className="detaildepartmentform_title">
        <h2>Detail Department</h2>
        <IconButton>
          <CloseIcon onClick={() => onClose()} />
        </IconButton>
      </div>
      <br />

      <form
        className="detaildepartmentform_grid"
        onSubmit={formik.handleSubmit}
      >
        <div className="detaildepartmentform_group">
          <div className="detaildepartmentform_content">
            <InputLabel required htmlFor="full_name">
              Department Name
            </InputLabel>
            <CssTextField
              fullWidth
              margin="normal"
              id="name"
              name="name"
              value={formik.values.name}
              variant="standard"
              inputProps={{
                readOnly: true,
                style: {
                  textTransform: "capitalize",
                },
              }}
            />
          </div>
        </div>
        <div className="detaildepartmentform_footer"></div>
      </form>
    </div>
  );
}

export default React.memo(DetailDepartmentForm);
