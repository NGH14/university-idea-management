import './style.css';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
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

const toastMessages = {
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

const validationSchema = yup.object({
	name: yup.string().required('Full Name is required'),
});

function EditTagForm(props) {
	const { onClose, onUpdate, initialValue } = props;

	const formik = useFormik({
		initialValues: initialValue,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onUpdate(values);
		},
	});

	useEffect(() => {
		if (formik?.values?.length < 1) {
			toast.error(toastMessages.ERR_SERVER_ERROR, {
				style: { width: 'auto' },
			});
		}
	}, []);

	return (
		<div className='edittagform'>
			<div className='edittagform_title'>
				<h2>Update Tag</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='edittagform_grid' onSubmit={formik.handleSubmit}>
				<div className='edittagform_group'>
					<div className='edittagform_content'>
						<InputLabel required htmlFor='full_name'>
							Tag Name
						</InputLabel>
						<CssTextField
							fullWidth
							id='name'
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.full_name &&
								Boolean(formik.errors.name)
							}
							helperText={
								formik.touched.name && formik.errors.name
							}
						/>
					</div>
				</div>
				<div className='edittagform_footer'>
					<ColorButton variant='outlined' onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton variant='contained' type='submit'>
						Update
					</ColorButton>
				</div>
			</form>
		</div>
	);
}

export default React.memo(EditTagForm);
