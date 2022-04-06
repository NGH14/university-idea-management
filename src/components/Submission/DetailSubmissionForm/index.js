import "./style.css";

import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import moment from "moment";
import React, { useContext } from "react";

import { UserContext } from "../../../context/AppContext";

function DetailSubmissionForm({ initialValue }) {
	const formik = useFormik({ initialValues: initialValue });
	const { state } = useContext(UserContext);
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='form_group' style={{ marginBottom: 12 }}>
				<div className='form_content' style={{ display: 'flex' }}>
					<InputLabel
						style={{ width: 110, marginBottom: 'auto', marginTop: 'auto' }}
					>
						Title{' '}
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name={'title'}
						value={formik.values.title}
					/>
				</div>
			</div>

			{
				<div className='form_group' style={{ marginBottom: 12, display: 'flex' }}>
					<div
						className='form_content'
						style={{ display: 'flex', width: '100%' }}
					>
						<InputLabel
							style={{
								width: 150,
								marginBottom: 'auto',
								marginTop: 'auto',
							}}
						>
							Create By
						</InputLabel>
						<TextField
							inputProps={{ readOnly: true }}
							style={{ width: '100%', pointerEvents: 'none' }}
							variant='standard'
							name={'initial_date'}
							value={formik.values.created_by}
						/>
					</div>
					<div
						className='form_content'
						style={{ display: 'flex', width: '100%' }}
					>
						<InputLabel
							style={{
								width: 150,
								marginBottom: 'auto',
								marginTop: 'auto',
								marginLeft: 10,
							}}
						>
							Modified By
						</InputLabel>
						<TextField
							inputProps={{ readOnly: true }}
							style={{ width: '100%', pointerEvents: 'none' }}
							variant='standard'
							name={'final_date'}
							value={formik.values.modified_by}
						/>
					</div>
				</div>
			}

			<div className='form_group' style={{ marginBottom: 12, display: 'flex' }}>
				<div className='form_content' style={{ display: 'flex', width: '100%' }}>
					<InputLabel
						style={{ width: 150, marginBottom: 'auto', marginTop: 'auto' }}
					>
						Initial Deadline
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name={'initial_date'}
						value={moment(formik.values.initial_date).format('DD/MM/YYYY')}
					/>
				</div>
				<div className='form_content' style={{ display: 'flex', width: '100%' }}>
					<InputLabel
						style={{
							width: 150,
							marginBottom: 'auto',
							marginTop: 'auto',
							marginLeft: 10,
						}}
					>
						Final Deadline
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name={'final_date'}
						value={moment(formik.values.final_date).format('DD/MM/YYYY')}
					/>
				</div>
			</div>

			<div className='form_group' style={{ marginBottom: 12 }}>
				<div className='form_content' style={{ display: 'flex' }}>
					<InputLabel
						style={{ width: 110, marginBottom: 'auto', marginTop: 'auto' }}
					>
						Description
					</InputLabel>
					<TextField
						inputProps={{ readOnly: true }}
						style={{ width: '100%', pointerEvents: 'none' }}
						variant='standard'
						name={'description'}
						value={formik.values.description}
					/>
				</div>
			</div>
		</form>
	);
}
export default DetailSubmissionForm;
