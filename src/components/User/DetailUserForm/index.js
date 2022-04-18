import './style.css';

import { UimModalForm, UimTextField } from 'components/Uim';
import React from 'react';

export default function DetailUserForm({ onClose, initialValue: data }) {
	return (
		<UimModalForm
			entity='idea'
			action='detail'
			onClose={() => onClose()}
			ClassName='detailuserform'
		>
			<div className='form_group'>
				<div className='form_content'>
					<UimTextField
						label='Full Name'
						propName='full_name'
						variant='standard'
						dynamic={{ value: data?.full_name }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimTextField
						label='Email'
						propName='email'
						variant='standard'
						dynamic={{ value: data?.email }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
			</div>
			<div className='form_group'>
				<div className='form_content'>
					<UimTextField
						label='Phone'
						propName='phone'
						variant='standard'
						dynamic={{ value: data?.phone }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimTextField
						label='Gender'
						propName='gender'
						variant='standard'
						dynamic={{ value: data?.gender }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimTextField
						label='Date of Birth'
						propName='date_of_birth'
						variant='standard'
						dynamic={{ value: data?.date_of_birth }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
			</div>
			<div className='form_group'>
				<div className='form_content'>
					<UimTextField
						label='Department'
						capitalize={true}
						propName='department'
						variant='standard'
						dynamic={{ value: data?.department }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
				<div className='form_content'>
					<UimTextField
						label='Role'
						capitalize={true}
						propName='role'
						variant='standard'
						dynamic={{ value: data?.role }}
						inputProps={{
							disabled: true,
							readOnly: true,
						}}
					/>
				</div>
			</div>
		</UimModalForm>
	);
}
