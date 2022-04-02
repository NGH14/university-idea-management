import "./style.css";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextareaAutosize, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { DropzoneArea } from "@pandemicode/material-ui-dropzone";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import useDrivePicker from "react-google-drive-picker";
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

const ApiGoogleDrive = {
	CLIENT_ID:
		"284247270990-gdn3hpqk4c4fjckvmd45k4ajeeov4msb.apps.googleusercontent.com",
	CLIENT_SECRET: "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",
	REDIRECT_URL: "https://developers.google.com/oauthplayground/",

	REFRESH_TOKEN:
		"1//04euMhZM3kPsbCgYIARAAGAQSNwF-L9IrYsB6QdWy_R04LH2kHVOF7K2sJLqOKTVrPHAhrG2tuPyVZjflqNTH4CdZ1Zc0jt0B-48",
};

function CreateIdeaForm(props) {
	const [openPicker, data, authResponse] = useDrivePicker();
	const [secondary, setSecondary] = React.useState(false);
	const [arrayFile, setArrayFile] = useState([]);
	const { onClose, onCreate, submissionTitle } = props;

	const formik = useFormik({
		initialValues: {},
		onSubmit: (values) => {
			// const newValue = {...values, initial_date: dataDateRangePicker[0], final_date: dataDateRangePicker[1]}
			// onCreate(newValue)
			console.log(values, 98975);
		},
	});

	// const customViewsArray = [new google.picker.DocsView()]; // custom view
	const handleOpenPicker = () => {
		openPicker({
			clientId: "xxxxxxxxxxxxxxxxx",
			developerKey: "xxxxxxxxxxxx",
			viewId: "DOCS",

			token: "token", // pass oauth token in case you already have one
			showUploadView: true,
			showUploadFolders: true,
			supportDrives: true,
			multiselect: true,

			// customViews: customViewsArray, // custom view
		});
	};

	const onUploadFile = async (file) => {
		const newArrayFile = arrayFile;
		_.map(file, (x) => {
			newArrayFile.push({
				path: x?.path,
				name: x?.name,
				type: x?.type,
			});
		});
		setArrayFile(newArrayFile);
		formik.resetForm();
	};

	const renderUploadFile = () => {
		console.log(arrayFile, "arrayFile");
		return (
			<>
				<DropzoneArea
					dropzoneText={
						<div style={{ marginTop: 20, marginBottom: 15 }}>
							<h1 style={{ fontSize: 22, fontWeight: 15 }}>
								Drag and drop file upload
							</h1>
							<div>( Image, file, word, excel, pdf, etc. )</div>
						</div>
					}
					showPreviewsInDropzone={false}
					onDrop={(file) => onUploadFile(file)}
					showAlerts={false}
					clearOnUnmount={false}
				/>
				<div style={{ marginTop: 15 }}>
					<h1 style={{ fontWeight: "bold", fontSize: "24px !important" }}>
						File uploaded
					</h1>
					<List>
						{_.map(arrayFile, (item) => {
							return (
								<ListItem
									secondaryAction={
										<IconButton edge="end" aria-label="delete">
											<DeleteIcon />
										</IconButton>
									}
								>
									<ListItemAvatar>
										<Avatar>
											<AttachFileIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={item?.name}
										secondary={secondary ? "Secondary text" : null}
									/>
								</ListItem>
							);
						})}
					</List>
				</div>
			</>
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
						<InputLabel htmlFor="full_name">Title Submission</InputLabel>
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
							// error={formik.touched.title && Boolean(formik.errors.title)}
							// helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
				</div>
				<div className="form_group">
					<div className="form_content">
						<InputLabel required={true} htmlFor="full_name">
							Title Idea
						</InputLabel>
						<CssTextField
							fullWidth
							margin="normal"
							id="title"
							name="title"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							// error={formik.touched.title && Boolean(formik.errors.title)}
							// helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
					<div className="form_content">
						<InputLabel required={true} htmlFor="full_name">
							Content Idea
						</InputLabel>
						<CssTextField
							fullWidth
							margin="normal"
							id="content"
							name="content"
							value={formik.values.content}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							// error={formik.touched.title && Boolean(formik.errors.title)}
							// helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
				</div>

				<div className="form_group">
					<div className="form_content">
						<div>
							<TextareaAutosize
								className="description-field"
								aria-label="minimum height"
								id="description"
								name="description"
								minRows={6}
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
				</div>
				<div className="form_group">
					<div className="form_content edit-input-file">
						{renderUploadFile()}
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
