import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextareaAutosize, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
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
	name: yup.string().required("Full Name is required"),
});

function CreateSubmissionForm(props) {
	const { onClose, onCreate } = props;
	const [dataDateRangePicker, setDataDateRangePicker] = useState([null, null]);
	const formik = useFormik({
		initialValues: {},
		onSubmit: (values) => {
			const newValue = {
				...values,
				initial_date: dataDateRangePicker[0],
				final_date: dataDateRangePicker[1],
			};
			onCreate(newValue);
		},
	});

	const renderFormDate = (startProps, endProps) => {
		return (
			<React.Fragment>
				<div className="form_content" style={{ width: "100%" }}>
					<InputLabel required htmlFor="initial_date">
						Initial Date
					</InputLabel>
					<TextField
						fullWidth
						{...startProps}
						required={true}
						label={null}
						type={"date"}
						margin="normal"
						id="initial_date"
						name="initial_date"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				<Box
					sx={{ mx: 3 }}
					style={{
						marginBottom: 8,
						marginTop: "auto",
						height: 56,
						paddingBottom: 15,
						paddingTop: 15,
					}}
				>
					{" "}
					to{" "}
				</Box>
				<div className="form_content" style={{ width: "100%" }}>
					<InputLabel required htmlFor="final_date">
						Final Date
					</InputLabel>
					<TextField
						fullWidth
						{...endProps}
						label={null}
						required={true}
						type={"date"}
						margin="normal"
						id="final_date"
						name="final_date"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
			</React.Fragment>
		);
	};

	return (
		<div className="createsubmissionform">
			<div className="createsubmissionform_title">
				<h2>Create Submission</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className="form_grid" onSubmit={formik.handleSubmit}>
				<div className="form_group">
					<div className="form_content">
						<InputLabel required htmlFor="full_name">
							Title
						</InputLabel>
						<CssTextField
							fullWidth
							margin="normal"
							id="title"
							name="title"
							value={formik.values.title}
							required={true}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							// error={formik.touched.title && Boolean(formik.errors.title)}
							// helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
				</div>
				<div className="form_group">
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateRangePicker
							startText="Initial Date "
							endText="Final Date"
							id="titles"
							name="titles"
							calendars={2}
							value={dataDateRangePicker}
							onChange={(newValue) => {
								setDataDateRangePicker(newValue);
							}}
							onBlur={formik.handleBlur}
							renderInput={(startProps, endProps) =>
								renderFormDate(startProps, endProps)
							}
						/>
					</LocalizationProvider>
				</div>
				<div className="form_group">
					<div className="form_content">
						<InputLabel htmlFor="description">Description</InputLabel>
						<TextareaAutosize
							className="description-field"
							aria-label="minimum height"
							id="description"
							name="description"
							minRows={10}
							placeholder="Minimum 3 rows"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							style={{
								width: "100%",
								marginTop: 16,
								marginBottom: 8,
								borderRadius: "5px",
							}}
						/>
					</div>
				</div>
				<div className="createsubmissionform_footer">
					<ColorButton variant="outlined" onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton variant="contained" type="submit">
						Create
					</ColorButton>
				</div>
			</form>
		</div>
	);
}

export default React.memo(CreateSubmissionForm);
