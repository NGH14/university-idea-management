import "./style.css";
import CloseIcon from "@mui/icons-material/Close";
import { TextareaAutosize, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";

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


// ref 137 option submission

function CreateIdeaForm(props) {
	const { onClose, onCreate, submissionTitle } = props;

	const formik = useFormik({
		initialValues: {},
		onSubmit: (values) => {
			if(values.file && !_.isEmpty(values.file)){
				onSubmitForm(values)
			} else {
				onCreate(values)
			}
		},
	});
	const onSubmitForm = (values) => {
		console.log(values.file[0], 987)
		const file = values.file[0] //the file
		const reader = new FileReader() //this for convert to Base64
		reader.readAsDataURL(values.file[0]) //start conversion...
		reader.onload = function () { //.. once finished..
			const rawLog = reader.result.split(',')[1]; //extract only thee file data part
			const dataSend = {dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive"}; //preapre info to send to API
			fetch('https://script.google.com/macros/s/AKfycbzOsDnvlUIHyq6y2dpzWevLym82dPqM9ZVTbvpB2KpoFN9GHoiodwvMMNpRDeupSeFO/exec', //your AppsScript URL
				{ method: "POST", body: JSON.stringify(dataSend) },) //send to Api
				.then(res => res.json()).then((infoFile) => {
				onCreate({...values, fileRequest: {
						id: infoFile.id,
						url: infoFile.url,
						name: file.name,
						type: file.type
					}}) //See response
			}).catch(e => console.log(e)) // Or Error in console // Or Error in console
		}
	}
	return (
		<div className="createuserform">
			<div className="createuserform_title" >
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
						{submissionTitle ? <CssTextField
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
						/> : <>

							{/*option Sub mission*/}

						</>}
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
					<div className="form_content" style={{display: "flex"}}>
						<Dropzone
							onDrop={(value)=>formik.setFieldValue("file", [...value])}

							maxFiles={1}
							multiple={true}
						>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps({ className: "dropzone" })} style={{height: "100%"}}>
									<input {...getInputProps()} type={"file"}/>
									<Button variant={"contained"} style={{background: "darkgray"}}>Upload Image</Button>

								</div>
							)}
						</Dropzone>
						{/*<input  type={"file"} name={"file"} onChange={(e)=>{*/}
						{/*	console.log(e)*/}
						{/*}}/>*/}
						<div style={{marginTop: "auto", marginBottom: "auto", marginLeft: "15px", display: "flex"}}>
							<a style={{marginTop: "auto", marginBottom: "auto", marginRight: "15px"}} href={""}>Upload-Image.doc</a>
							<IconButton style={{ color: "darkred"}}><ClearIcon /></IconButton>
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
