import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { AUTH } from "../../../common/env";
import _ from "lodash";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { toast } from "react-toastify";

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

const toastMessages = {
	UPLOAD_WAIT_DRIVE: "Uploading attachments...",
	SUC_IDEA_ADDED: "Create idea successful !!",
	ERR_DRIVE_FAILED: "Create idea successful !!",
	ERR_SERVER_ERROR: "Something went wrong, please try again !!",
};

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
	tags: [],
	attachments: [],
	is_anonymous: true,
};

function CreateIdeaForm(props) {
	const { onClose, onCreate, submissionTitle } = props;
	const [fileArray, setFileArray] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			fileArray && !_.isEmpty(fileArray)
				? onSubmitForm(values)
				: onCreate(values);
		},
	});

	const handleDrop = (acceptedFiles) => {
		setFileArray([...fileArray, ...acceptedFiles]);
	};

	const onSubmitForm = (values) => {
		const files = fileArray;
		const reader = new FileReader();
		let attachments = [];

		toast.promise(
			new Promise(() => {
				files.forEach((file) => {
					reader.readAsDataURL(file);
					reader.onload = () => {
						const rawLog = reader.result.split(",")[1];
						const dataSend = {
							dataReq: {
								data: rawLog,
								name: file.name,
								type: file.type,
							},
							fname: "uploadFilesToGoogleDrive",
						};

						fetch(AUTH.GAPI_REFRESH_INFO, {
							method: "POST",
							body: JSON.stringify(dataSend),
						})
							.then((res) => {
								console.log(res);
								attachments.push({
									id: res.id,
									url: res.url,
									name: file.name,
									type: file.type,
								});
							})
							.catch(() => toast.warn(toastMessages.ERR_DRIVE_FAILED));
					};
				});
			}),
			{
				pending: toastMessages.UPLOAD_WAIT_DRIVE,
				error: toastMessages.ERR_SERVER_ERROR,
			},
		);
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
					<div className="form_content">
						<Dropzone onDrop={handleDrop}>
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
								{_.map(fileArray, (files) => (
									<li key={files.name}>{files.name}</li>
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
