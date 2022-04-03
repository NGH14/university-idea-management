import "./style.css";

import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { AUTH } from "../../../common/env";

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
	title: yup.string().required("Title is required"),
	content: yup.string().required("Please Provide content"),
	is_anonymous: yup.bool(),
	tags: yup.array(),
	attachments: yup.array(),
});

const initialValues = {
	title: "",
	content: "",
	is_anonymous: true,
	tags: [],
	attachments: [],
};

function CreateIdeaForm(props) {
	const { onClose, onCreate, submissionTitle } = props;
	const [fileNames, setFileNames] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			if (values.file && !_.isEmpty(values.file)) {
				onSubmitForm(values);
			} else {
				onCreate(values);
			}
		},
	});

	const onSubmitForm = (values) => {
		const file = values.file[0]; //the file
		const reader = new FileReader(); //this for convert to Base64
		reader.readAsDataURL(values.file[0]); //start conversion...
		reader.onload = function () {
			//.. once finished..
			const rawLog = reader.result.split(",")[1]; //extract only thee file data part
			const dataSend = {
				dataReq: { data: rawLog, name: file.name, type: file.type },
				fname: "uploadFilesToGoogleDrive",
			}; //preapre info to send to API
			fetch(
				"https://script.google.com/macros/s/AKfycbzOsDnvlUIHyq6y2dpzWevLym82dPqM9ZVTbvpB2KpoFN9GHoiodwvMMNpRDeupSeFO/exec", //your AppsScript URL
				{ method: "POST", body: JSON.stringify(dataSend) },
			) //send to Api
				.then((res) => res.json())
				.then((infoFile) => {
					onCreate({
						...values,
						fileRequest: {
							id: infoFile.id,
							url: infoFile.url,
							name: file.name,
							type: file.type,
						},
					}); //See response
				})
				.catch((e) => console.log(e)); // Or Error in console // Or Error in console
		};
	};

	return (
		<div className="createuserform">
			<div className="createuserform_title">
				<h2>Create Idea</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className="form_grid" onSubmit={formik.handleSubmit}>
				<div className="form_group">
					<div className="form_content">
						<InputLabel htmlFor="titleSub">Title Submission</InputLabel>
						{submissionTitle ? (
							<CssTextField
								fullWidth
								margin="normal"
								id="titleSub"
								name="titleSub"
								value={submissionTitle}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								inputProps={{
									readOnly: true,
								}}
							/>
						) : (
							<>{/* selection Sub mission */}</>
						)}
					</div>
				</div>
				<div className="form_group">
					<div className="form_content">
						<InputLabel required={true} htmlFor="title">
							Title Idea
						</InputLabel>
						<CssTextField
							fullWidth
							margin="normal"
							id="title"
							name="title"
							value={formik.values?.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
				</div>

				<div className="form_group">
					<div className="form_content">
						<InputLabel required={true} htmlFor="full_name">
							Content
						</InputLabel>
						<TextareaAutosize
							className="description-field"
							aria-label="minimum height"
							id="content"
							name="content"
							minRows={8}
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
				<div className="form_group">
					<div className="form_content" style={{ display: "flex" }}>
						<Dropzone
							onDrop={(file) => {
								setFileNames([...fileNames, file]);
							}}
						>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps({ className: "dropzone" })}>
									<input {...getInputProps()} />
									<p>Drag'n'drop files, or click to select files</p>
								</div>
							)}
						</Dropzone>
						<div>
							<strong>Files:</strong>
							<ul>
								{fileNames?.map((file) => (
									<li key={file?.name}>{file?.name}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="createuserform_footer">
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

export default React.memo(CreateIdeaForm);
