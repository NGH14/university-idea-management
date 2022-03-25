import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

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

function DetailUserForm(props) {
	const { onClose, initialValue } = props;
	const formik = useFormik({
		initialValues: initialValue || [],
		// validationSchema: validationSchema,
	});

	return (
		<div className="createuserform">
			<div className="createuserform_title">
				<h2>Detail User</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className="form_grid" onSubmit={formik.handleSubmit}>
				<div className="form_group">
					<div className="form_content">
						<InputLabel htmlFor="full_name">Full Name</InputLabel>
						<CssTextField
							fullWidth
							margin="normal"
							id="full_name"
							name="full_name"
							value={formik.values.full_name}
							variant="standard"
							InputProps={{
								readOnly: true,
							}}
						/>
					</div>
					<div className="form_content">
						<InputLabel htmlFor="email">Email</InputLabel>
						<CssTextField
							fullWidth
							variant="outlined"
							id="email"
							name="email"
							margin="normal"
							value={formik.values.email}
							InputProps={{
								readOnly: true,
							}}
						/>
					</div>
				</div>
				<div className="form_group">
					<div className="form_content">
						<InputLabel htmlFor="department">Department</InputLabel>
						<CssTextField
							fullWidth
							variant="outlined"
							id="department"
							name="department"
							margin="normal"
							value={formik.values.department}
							InputProps={{
								readOnly: true,
							}}
						/>
					</div>

					<div className="form_content">
						<InputLabel htmlFor="role">Role</InputLabel>
						<CssTextField
							fullWidth
							variant="outlined"
							id="role"
							name="role"
							margin="normal"
							value={formik.values.role}
							InputProps={{
								readOnly: true,
							}}
						/>
					</div>
					<div className="form_content">
						<InputLabel htmlFor="date_of_birth">Date of Birth</InputLabel>
						<CssTextField
							fullWidth
							variant="outlined"
							name="date_of_birth"
							id="date_of_birth"
							margin="normal"
							value={formik.values.date_of_birth}
							InputProps={{
								readOnly: true,
							}}
						/>
					</div>
				</div>
				<div className="createuserform_footer">
					<ColorButton variant="outlined" onClick={() => onClose()}>
						Close
					</ColorButton>
				</div>
			</form>
		</div>
	);
}

export default React.memo(DetailUserForm);
