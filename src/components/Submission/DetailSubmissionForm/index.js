import "./style.css"

import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import React from "react";

function DetailSubmissionForm({ initialValue }) {
	const formik = useFormik({
		initialValues: initialValue || [],
	});

	// if(_.isEmpty(initialValue)) ;
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="form_group" style={{ marginBottom: 12 }}>
				<div className="form_content" style={{ display: "flex" }}>
					<InputLabel
						style={{ width: 110, marginBottom: "auto", marginTop: "auto" }}
					>
						Title{" "}
					</InputLabel>
					<TextField
						inputProps={{
							readOnly: true,
						}}
						style={{ width: "100%", pointerEvents: "none" }}
						variant="standard"
						name={"title"}
						value={formik.values.title}
					/>
				</div>
			</div>
			<div className="form_group" style={{ marginBottom: 12, display: "flex" }}>
				<div
					className="form_content"
					style={{ display: "flex", width: "100%" }}
				>
					<InputLabel
						style={{ width: 120, marginBottom: "auto", marginTop: "auto" }}
					>
						Initial Date
					</InputLabel>
					<TextField
						inputProps={{
							readOnly: true,
						}}
						style={{ width: "100%", pointerEvents: "none" }}
						variant="standard"
						name={"initial_date"}
						value={formik.values.initial_date_v}
					/>
				</div>
				<div
					className="form_content"
					style={{ display: "flex", width: "100%" }}
				>
					<InputLabel
						style={{
							width: 120,
							marginBottom: "auto",
							marginTop: "auto",
							marginLeft: 10,
						}}
					>
						Final Date
					</InputLabel>
					<TextField
						inputProps={{
							readOnly: true,
						}}
						style={{ width: "100%", pointerEvents: "none" }}
						variant="standard"
						name={"final_date"}
						value={formik.values.final_date_v}
					/>
				</div>
			</div>
			<div className="form_group" style={{ marginBottom: 12 }}>
				<div className="form_content" style={{ display: "flex" }}>
					<InputLabel
						style={{ width: 110, marginBottom: "auto", marginTop: "auto" }}
					>
						Description
					</InputLabel>
					<TextField
						inputProps={{
							readOnly: true,
						}}
						style={{ width: "100%", pointerEvents: "none" }}
						variant="standard"
						name={"description"}
						value={formik.values.description}
					/>
				</div>
			</div>
		</form>
	);
}
export default DetailSubmissionForm;
