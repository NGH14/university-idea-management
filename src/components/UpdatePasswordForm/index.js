import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
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

const ColorButton = styled(Button)(() => ({
	fontFamily: "Poppins",
	fontSize: "13px",
	fontWeight: "bold",
	textTransform: "none",
	minWidth: 200,
	display: "inline-block",

	margin: "10px 0",
	padding: "10px",

	"&:disabled ": { cursor: "not-allowed", pointerEvents: "all !important" },
}));

const validationSchema = yup.object({
	old_password: yup
		.string("Enter your password")
		.min(4, "Password should be of minimum 4 characters length")
		.required("Password is required"),
	new_password: yup
		.string("Enter your new password")
		.min(4, "Password should be of minimum 4 characters length")
		.required("New password is required"),
	confirm_new_password: yup
		.string()
		.oneOf([yup.ref("new_password"), null], "Passwords must match")
		.required("Confirm password is required"),
});

const initialValues = {
	old_password: "",
	new_password: "",
	confirm_new_password: "",
};

// ─── MAIN ───────────────────────────────────────────────────────────────────────
//
const UpdatePasswordForm = (props) => {
	const navigate = useNavigate();
	const [buttonState, setButtonState] = useState({
		disable: false,
		loading: false,
	});
	const { onClose } = props;

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await AuthRequest.post(API_PATHS.SHARED.AUTH.UPDATE_PWD, values)
				.catch(() => toast.error("Failed to update password !!"))
				.finally(() => {
					setButtonState({ ...buttonState, loading: false, disable: false });
					navigate(URL_PATHS.HOME);
				});
		},
	});

	return (
		<div className="updatepwdform">
			<div className="updatepwdform_title">
				<h2>Update Password</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form onSubmit={formik.handleSubmit}>
				<div className="updatepwdform_element">
					<InputLabel htmlFor="old_password" required>
						Old Password:
					</InputLabel>
					<CssTextField
						fullWidth
						variant="standard"
						id="old_password"
						name="old_password"
						margin="normal"
						type="password"
						value={formik.values.old_password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.old_password && Boolean(formik.errors.old_password)
						}
						helperText={
							formik.touched.old_password && formik.errors.old_password
						}
					/>
				</div>
				<div className="updatepwdform_element">
					<InputLabel htmlFor="new_password" required>
						New Password
					</InputLabel>
					<CssTextField
						variant="standard"
						fullWidth
						id="new_password"
						margin="normal"
						type="password"
						name="new_password"
						value={formik.values.new_password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.new_password && Boolean(formik.errors.new_password)
						}
						helperText={
							formik.touched.new_password && formik.errors.new_password
						}
					/>
				</div>
				<div className="updatepwdform_element">
					<InputLabel htmlFor="confirm_new_password" required>
						Confirm Password
					</InputLabel>
					<CssTextField
						variant="standard"
						fullWidth
						id="confirm_new_password"
						margin="normal"
						type="password"
						name="confirm_new_password"
						value={formik.values.confirm_new_password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.confirm_new_password &&
							Boolean(formik.errors.confirm_new_password)
						}
						helperText={
							formik.touched.confirm_new_password &&
							formik.errors.confirm_new_password
						}
					/>
				</div>

				<div className="updatepwdform_footer">
					<ColorButton variant="outlined" onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton
						variant="contained"
						type="submit"
						loading={buttonState?.loading}
						disabled={buttonState.disable}
					>
						Update password
					</ColorButton>
				</div>
			</form>
		</div>
	);
};

export default React.memo(UpdatePasswordForm);
