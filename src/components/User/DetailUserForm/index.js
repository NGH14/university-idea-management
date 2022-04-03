import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
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

function DetailUserForm(props) {
	const { onClose, initialValue } = props;

	const formik = useFormik({
		initialValues: initialValue,
	});

	return (
		<div className="detailuserform">
			<div className="detailuserform_title">
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
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
						/>
					</div>
					<div className="form_content">
						<InputLabel htmlFor="email">Email</InputLabel>
						<CssTextField
							fullWidth
							variant="standard"
							id="email"
							name="email"
							margin="normal"
							value={formik.values.email}
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
						/>
					</div>
					<div className="form_content">
						<InputLabel required htmlFor="phone">
							Phone
						</InputLabel>
						<CssTextField
							fullWidth
							id="phone"
							name="phone"
							variant="standard"
							margin="normal"
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
						/>
					</div>
				</div>
				<div className="form_group">
					<div className="form_content">
						<InputLabel htmlFor="department">Department</InputLabel>
						<CssTextField
							fullWidth
							variant="standard"
							id="department"
							name="department"
							margin="normal"
							value={formik.values.department}
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
						/>
					</div>

					<div className="form_content">
						<InputLabel htmlFor="role">Role</InputLabel>
						<CssTextField
							fullWidth
							variant="standard"
							id="role"
							name="role"
							margin="normal"
							value={formik.values.role}
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
						/>
					</div>
					<div className="form_content">
						<InputLabel htmlFor="date_of_birth">Date of Birth</InputLabel>
						<CssTextField
							fullWidth
							variant="standard"
							name="date_of_birth"
							margin="normal"
							id="date_of_birth"
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
							value={formik.values.date_of_birth}
						/>
					</div>

					<div className="form_content">
						<InputLabel required htmlFor="gender">
							Gender
						</InputLabel>
						<CssTextField
							fullWidth
							id="gender"
							name="gender"
							margin="normal"
							variant="standard"
							inputProps={{
								disabled: true,
								readOnly: true,
							}}
							value={formik.values.gender}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.gender && Boolean(formik.errors.gender)}
							helperText={formik.touched.gender && formik.errors.gender}
						/>
					</div>
				</div>
				<div className="detailuserform_footer"></div>
			</form>
		</div>
	);
}

export default React.memo(DetailUserForm);
