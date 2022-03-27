import "./style.css";

import Button from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { AuthRequest } from "../../common/AppUse";
import { API_PATHS, URL_PATHS } from "../../common/env";

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
	old_password: yup
		.string("Enter your password")
		.min(4, "Password should be of minimum 4 characters length")
		.required("Password is required"),
	new_password: yup
		.string("Enter your new password")
		.min(4, "Password should be of minimum 4 characters length")
		.required("Password is required"),
	confirm_new_password: yup
		.string()
		.oneOf([yup.ref("new_password"), null], "Passwords must match")
		.required("Password is required"),
});

const initialValues = {
	old_password: "",
	new_password: "",
	confirm_new_password: "",
};

// ─── MAIN ───────────────────────────────────────────────────────────────────────
//
const UpdatePasswordForm = () => {
	const navigate = useNavigate();
	const [buttonState, setButtonState] = useState({
		disable: false,
		loading: false,
	});

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await AuthRequest.post(API_PATHS.SHARED.AUTH.UPDATE_PWD, values)
				.catch(() => toast.error("Failed to update password!!"))
				.finally(() => {
					setButtonState({ ...buttonState, loading: false, disable: false });
					navigate(URL_PATHS.HOME);
				});
		},
	});

	return (
		<div className="updatepwdform">
			<div className="updatepwdform-textcontent">
				<h1 className="updatepwdform-heading">UIM</h1>
				<span className="updatepwdform-subtext">Please Update Your Password</span>
			</div>

			<form onSubmit={formik.handleSubmit}>
				<CssTextField
					fullWidth
					id="old_password"
					label="Old Password"
					name="old_password"
					margin="normal"
					type="password"
					value={formik.values.old_password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.old_password && Boolean(formik.errors.old_password)}
					helperText={formik.touched.old_password && formik.errors.old_password}
				/>
				<CssTextField
					fullWidth
					id="new_password"
					margin="normal"
					label="New Password"
					type="password"
					name="new_password"
					value={formik.values.new_password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.new_password && Boolean(formik.errors.new_password)}
					helperText={formik.touched.new_password && formik.errors.new_password}
				/>
				<CssTextField
					fullWidth
					id="confirm_new_password"
					margin="normal"
					label="Confirm New Password"
					type="password"
					name="confirm_new_password"
					value={formik.values.confirm_new_password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.confirm_new_password && Boolean(formik.errors.confirm_new_password)
					}
					helperText={
						formik.touched.confirm_new_password && formik.errors.confirm_new_password
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
		</div>
	);
};

export default React.memo(UpdatePasswordForm);
