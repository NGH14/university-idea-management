import './style.css';

import axios from 'axios';
import { toastMessages } from 'common';
import axioc from 'common/AxiosClient';
import { API_PATHS } from 'common/env';
import {
	UimAutoComplete,
	UimDatePicker,
	UimModalForm,
	UimTextField,
} from 'components/Uim';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

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
	role: '',
	full_name: '',
	gender: '',
	phone: '',
	department: '',
	date_of_birth: null,
};

function CreateUserForm({ onClose, onCreate }) {
	const [depOptions, setDepartments] = useState([]);
	const [roleOptions, setRoles] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => onCreate(values),
	});

	useEffect(
		() =>
			(async () => {
				await axios
					.all([
						axioc.get(API_PATHS.ADMIN.MANAGE_DEP + '/list'),
						axioc.get(API_PATHS.SHARED.ROLE + '/list'),
					])
					.then(
						axios.spread((resDeps, resRoles) => {
							setDepartments(resDeps?.data?.result);
							setRoles(resRoles?.data?.result);
						}),
					)
					.catch(() => toast.error(toastMessages.errs.UNEXPECTED));
			})(),
		[],
	);

	return (
		<UimModalForm
			title='Create User'
			onClose={() => onClose()}
			ClassName='createuserform'
			onSubmit={formik.handleSubmit}
			showActionButton={true}
		>
			<div className='form_group'>
				<div className='form_content'>
					<UimTextField
						label='Full Name'
						required={true}
						propName='full_name'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						dynamic={{
							value: formik.values.full_name,
							error: formik.errors.full_name,
							touched: formik.touched.full_name,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimTextField
						label='Email'
						required={true}
						propName='email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						dynamic={{
							value: formik.values.email,
							error: formik.errors.email,
							touched: formik.touched.email,
						}}
					/>
				</div>
			</div>
			<div className='form_group'>
				<div className='form_content'>
					<UimTextField
						label='Phone'
						required={true}
						propName='phone'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						dynamic={{
							value: formik.values.phone,
							error: formik.errors.phone,
							touched: formik.touched.phone,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimAutoComplete.DropDown
						label='Gender'
						required={true}
						propName='gender'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						options={[{ name: 'male' }, { name: 'female' }]}
						dynamic={{
							value: formik.values.gender,
							error: formik.errors.gender,
							touched: formik.touched.gender,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimDatePicker
						label='Date of Birth'
						required={true}
						propName='date_of_birth'
						onChange={(val) => formik.setFieldValue('date_of_birth', val)}
						onBlur={formik.handleBlur}
						renderInput={(params) => <UimTextField fullWidth {...params} />}
						dynamic={{
							value: formik.values.date_of_birth,
							error: formik.errors.date_of_birth,
							touched: formik.touched.date_of_birth,
						}}
					/>
				</div>
			</div>
			<div className='form_group'>
				<div className='form_content'>
					<UimAutoComplete.Select
						label='Department'
						required={true}
						propName='department'
						onChange={(_, value) => formik.setFieldValue('department', value)}
						onBlur={formik.handleBlur}
						options={depOptions}
						dynamic={{
							value: formik.values.department,
							error: formik.errors.department,
							touched: formik.touched.department,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimAutoComplete.DropDown
						label='Role'
						required={true}
						propName='role'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						options={roleOptions}
						dynamic={{
							value: formik.values.role,
							error: formik.errors.role,
							touched: formik.touched.role,
						}}
					/>
				</div>
			</div>
		</UimModalForm>
	);
}

export default React.memo(CreateUserForm);
