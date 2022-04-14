import './style.css';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const CssTextField = styled(TextField)({
	'.MuiFormHelperText-root': {
		fontSize: '14px',
		fontFamily: 'Poppins',
	},

	'& .MuiInputBase-root': {
		color: '#000',
		fontSize: '16px',
		fontFamily: 'Poppins',
	},
	'& label.Mui-focused': {
		color: '#000',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#000',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderRadius: '5px',
		},
		'&:hover fieldset': {
			border: '1px solid #000000',
		},
		'&.Mui-focused fieldset': {
			border: '1px solid #000000',
		},
	},
});

const ColorButton = styled(Button)(() => ({
	fontFamily: 'Poppins',
	fontSize: '13px',
	fontWeight: 'bold',
	textTransform: 'none',
	minWidth: 200,
	display: 'inline-block',

	margin: '10px',
	padding: '10px',

	'&:disabled ': { cursor: 'not-allowed', pointerEvents: 'all !important' },
}));

const validationSchema = yup.object({
	name: yup.string().required("Department's name is required"),
});

function CreateDepartmentForm(props) {
	const { onClose, onCreate } = props;

	const formik = useFormik({
		initialValues: {},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onCreate(values);
		},
	});

	return (
		<div className='createdepartmentform'>
			<div className='createdepartmentform_title'>
				<h2>Create Department</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='form_grid' onSubmit={formik.handleSubmit}>
				<div className='form_group'>
					<div className='form_content'>
						<InputLabel required htmlFor='full_name'>
							Department Name
						</InputLabel>
						<CssTextField
							fullWidth
							id='name'
							name='name'
							value={formik.values.name}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
					</div>
				</div>
				<div className='createdepartmentform_footer'>
					<ColorButton variant='outlined' onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton variant='contained' type='submit'>
						Create
					</ColorButton>
				</div>
			</form>
		</div>
	);
}

export default React.memo(CreateDepartmentForm);
