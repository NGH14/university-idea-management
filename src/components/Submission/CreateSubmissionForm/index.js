import './style.css';

import CloseIcon from '@mui/icons-material/Close';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextareaAutosize, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { UimTextField } from 'components/Uim';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
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

const initialValues = {
	title: '',
	description: '',
	initial_date: null,
	final_date: null,
	is_active: true,
};

const validationSchema = yup.object({
	title: yup.string().required('Submission title is required'),
	description: yup.string().nullable(),
	initial_date: yup.date('Initial date invalid').nullable().default(undefined),
	final_date: yup.date('Final date invalid').nullable().default(undefined),
	is_active: yup.bool().default(true),
});

function CreateSubmissionForm(props) {
	const { onClose, onCreate } = props;
	const [dataDateRangePicker, setDataDateRangePicker] = useState([null, null]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onCreate({
				...values,
				initial_date: dataDateRangePicker[0],
				final_date: dataDateRangePicker[1],
			});
		},
	});

	const renderFormDate = (startProps, endProps) => {
		return (
			<React.Fragment>
				<div className='form_content' style={{ width: '100%' }}>
					<InputLabel required htmlFor='initial_date'>
						Initial Deadline
					</InputLabel>
					<TextField
						fullWidth
						{...startProps}
						label={null}
						required={true}
						type='date'
						id='initial_date'
						name='initial_date'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.initial_date &&
							Boolean(formik.errors.initial_date)
						}
						helperText={
							formik.touched.initial_date && formik.errors.initial_date
						}
					/>
				</div>
				<Box
					sx={{ mx: 3 }}
					style={{
						marginBottom: 8,
						marginTop: 'auto',
						height: 56,
						paddingBottom: 15,
						paddingTop: 15,
					}}
				>
					to
				</Box>
				<div className='form_content' style={{ width: '100%' }}>
					<InputLabel required htmlFor='final_date'>
						Final Deadline
					</InputLabel>
					<TextField
						fullWidth
						{...endProps}
						required={true}
						label={null}
						type='date'
						id='final_date'
						name='final_date'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.final_date && Boolean(formik.errors.final_date)
						}
						helperText={formik.touched.final_date && formik.errors.final_date}
					/>
				</div>
			</React.Fragment>
		);
	};

	return (
		<div className='createsubmissionform'>
			<div className='createsubmissionform_title'>
				<h2>Create Submission</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='form_grid' onSubmit={formik.handleSubmit}>
				<div className='form_group'>
					<div className='form_content'>
						<InputLabel required htmlFor='full_name'>
							Title
						</InputLabel>
						<CssTextField
							fullWidth
							id='title'
							name='title'
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
				</div>
				<div className='form_group'>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateRangePicker
							disablePast
							startText='Initial Deadline'
							endText='Final Deadline'
							id='titles'
							name='titles'
							calendars={2}
							inputFormat='dd/MM/yyyy'
							onBlur={formik.handleBlur}
							value={dataDateRangePicker}
							onChange={(newValue) => setDataDateRangePicker(newValue)}
							renderInput={(startProps, endProps) => (
								<React.Fragment>
									{renderFormDate(startProps, endProps)}
								</React.Fragment>
							)}
						/>
					</LocalizationProvider>
				</div>
				<div className='form_group'>
					<div className='form_content'>
						<UimTextField
							label='Description'
							placeholder={'Add some description...'}
							autoSize={true}
							minRows={2}
							propName='description'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							dynamic={{
								value: formik.values.description,
								error: formik.errors.description,
								touched: formik.touched.description,
							}}
						/>
					</div>
				</div>
				<div className='createsubmissionform_footer'>
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

export default React.memo(CreateSubmissionForm);
