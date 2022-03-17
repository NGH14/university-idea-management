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

import "../User/EditUserForm/style.css";

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
    name: yup.string().required("Full Name is required"),
});

function EditForm(props) {
    const { onClose, onUpdate, initialValue } = props;
    const formik = useFormik({
        initialValues: initialValue || [],
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onUpdate(values);
        },
    });

    return (
        <div className="createuserform">
            <div className="createuserform_title">
                <h2>Update Category</h2>
                <IconButton>
                    <CloseIcon onClick={() => onClose()} />
                </IconButton>
            </div>
            <br />

            <form className="form_grid" onSubmit={formik.handleSubmit}>
                <div className="form_group">
                    <div className="form_content">
                        <InputLabel required htmlFor="full_name">
                            Category Name
                        </InputLabel>
                        <CssTextField
                            fullWidth
                            margin="normal"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.full_name && Boolean(formik.errors.name)
                            }
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </div>
                </div>
                <div className="createuserform_footer">
                    <ColorButton variant="outlined" onClick={() => onClose()}>
                        Cancel
                    </ColorButton>
                    <ColorButton variant="contained" type="submit">
                        Update
                    </ColorButton>
                </div>
            </form>
        </div>
    );
}

export default React.memo(EditForm);
