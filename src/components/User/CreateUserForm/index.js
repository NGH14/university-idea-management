import "./style.css";

import CloseIcon from "@mui/icons-material/Close";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import enLocale from "date-fns/locale/en-GB";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

import { AuthRequest } from "../../../common/AppUse";
import { API_PATHS, DEV_CONFIGS } from "../../../common/env";

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

const toastMessages = {
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

const ColorButton = styled(Button)(() => ({
	fontFamily: 'Poppins',
	fontSize: '13px',
	fontWeight: 'bold',
	textTransform: 'none',
	minWidth: 200,
	display: 'inline-block',

	margin: '10px 0',
	padding: '10px',

	'&:disabled ': { cursor: 'not-allowed', pointerEvents: 'all !important' },
}));

const validationSchema = yup.object({
	full_name: yup.string().required('Full Name is required'),
	phone: yup.string().nullable(),
	email: yup.string().email('Email is invalid').required('Email is required'),
	role: yup.string().required('Role is required'),
	department: yup.string().required('Department is required'),
	date_of_birth: yup.date('Date invalid').nullable(),
});

const initialValues = {
	email: '',
	full_name: '',
	role: '',
	phone: '',
	department: '',
	gender: '',
	date_of_birth: null,
};

function CreateUserForm(prop) {
	const { onClose, onCreate } = prop;
	const [depOptions, setDepartments] = useState([]);
	const [roleOptions, setRoles] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onCreate(values);
		},
	});

	useEffect(() => {
		getDepartments();
		getRoles();
	}, []);

	const getDepartments = async () => {
		if (DEV_CONFIGS.IS_DEV) {
			setDepartments(DEV_CONFIGS.FAKE_DEPS);
			return;
		}

		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_DEP + '/list')
			.then((res) => setDepartments(res?.data?.result))
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const getRoles = async () => {
		if (DEV_CONFIGS.IS_DEV) {
			setRoles(DEV_CONFIGS.FAKE_ROLES);
			return;
		}

		await AuthRequest.get(API_PATHS.SHARED.ROLE + '/list')
			.then((res) => setRoles(res?.data?.result))
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	return (
		<div className='createuserform'>
			<div className='createuserform_title'>
				<h2>Create New User</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='form_grid' onSubmit={formik.handleSubmit}>
				<div className='form_group'>
					<div className='form_content'>
						<InputLabel required htmlFor='full_name'>
							Full Name
						</InputLabel>
						<CssTextField
							fullWidth
							margin='normal'
							id='full_name'
							name='full_name'
							value={formik.values.full_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.full_name &&
								Boolean(formik.errors.full_name)
							}
							helperText={
								formik.touched.full_name && formik.errors.full_name
							}
						/>
					</div>
					<div className='form_content'>
						<InputLabel required htmlFor='email'>
							Email
						</InputLabel>
						<CssTextField
							fullWidth
							variant='outlined'
							id='email'
							name='email'
							margin='normal'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
					</div>
				</div>

				<div className='form_group'>
					<div className='form_content'>
						<InputLabel required htmlFor='phone'>
							Phone
						</InputLabel>
						<CssTextField
							fullWidth
							variant='outlined'
							id='phone'
							name='phone'
							margin='normal'
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
						/>
					</div>
					<div className='form_content'>
						<InputLabel htmlFor='gender'>Gender</InputLabel>

						<Select
							select
							fullWidth
							displayEmpty
							margin='normal'
							labelId='gender'
							id='gender'
							name='gender'
							value={formik.values.gender}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							style={{ textTransform: 'capitalize' }}
							renderValue={
								formik.values.gender !== ''
									? undefined
									: () => (
											<placeholder>
												<em
													style={{
														opacity: 0.6,
														fontSize: 14,
													}}
												>
													-- gender --
												</em>
											</placeholder>
									  )
							}
							error={formik.touched.gender && Boolean(formik.errors.gender)}
						>
							<MenuItem
								style={{ textTransform: 'capitalize' }}
								value='male'
							>
								male
							</MenuItem>
							<MenuItem
								style={{ textTransform: 'capitalize' }}
								value='female'
							>
								female
							</MenuItem>
						</Select>
					</div>
					<div className='form_content'>
						<InputLabel htmlFor='date_of_birth'>Date of Birth</InputLabel>

						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							locale={enLocale}
						>
							<DatePicker
								fullWidth
								disableFuture
								margin='normal'
								name='date_of_birth'
								id='date_of_birth'
								onChange={(val) => {
									formik.setFieldValue('date_of_birth', val);
								}}
								value={formik.values.date_of_birth}
								error={
									formik.errors.date_of_birth &&
									formik.touched.date_of_birth
								}
								helperText={
									formik.errors.date_of_birth &&
									formik.touched.date_of_birth
								}
								renderInput={(params) => (
									<TextField fullWidth {...params} />
								)}
							/>
						</LocalizationProvider>
					</div>
				</div>

				<div className='form_group'>
					<div className='form_content'>
						<InputLabel required htmlFor='department'>
							Department
						</InputLabel>
						<Select
							select
							fullWidth
							displayEmpty
							labelId='department'
							id='department'
							name='department'
							value={formik.values.department}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							style={{ textTransform: 'capitalize' }}
							renderValue={
								formik.values.department !== ''
									? undefined
									: () => (
											<placeholder>
												<em
													style={{
														opacity: 0.6,
														fontSize: 14,
													}}
												>
													-- department --
												</em>
											</placeholder>
									  )
							}
							error={
								formik.touched.department &&
								Boolean(formik.errors.department)
							}
						>
							{depOptions.map((dep) => (
								<MenuItem
									style={{ textTransform: 'capitalize' }}
									value={dep.name}
								>
									{dep.name}
								</MenuItem>
							))}
						</Select>
						<FormHelperText error>
							{formik.touched.department && formik.errors.department}
						</FormHelperText>
					</div>

					<div className='form_content'>
						<InputLabel required htmlFor='role'>
							Role
						</InputLabel>
						<Select
							select
							fullWidth
							displayEmpty
							labelId='role'
							id='role'
							name='role'
							value={formik.values.role}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							style={{ textTransform: 'capitalize' }}
							renderValue={
								formik.values.role !== ''
									? undefined
									: () => (
											<placeholder>
												<em
													style={{
														opacity: 0.6,
														fontSize: 14,
													}}
												>
													-- role --
												</em>
											</placeholder>
									  )
							}
							error={formik.touched.role && Boolean(formik.errors.role)}
						>
							{roleOptions.map((role) => (
								<MenuItem
									style={{ textTransform: 'capitalize' }}
									value={role.name}
								>
									{role.name}
								</MenuItem>
							))}
						</Select>
						<FormHelperText error>
							{formik.touched.role && formik.errors.role}
						</FormHelperText>
					</div>
				</div>
				<div className='createuserform_footer'>
					<ColorButton variant='outlined' onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton variant='contained' type='submit'>
						Create User
					</ColorButton>
				</div>
			</form>
		</div>
	);
}

export default React.memo(CreateUserForm);
