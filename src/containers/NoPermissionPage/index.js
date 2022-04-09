import './style.css';

import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon404 from 'assets/images/undraw_cancel_re_pkdm.svg';

export default function NotPermisstionPage() {
	const navigate = useNavigate();

	return (
		<div className='notpermisstion_page'>
			<img className='notpermisstion_logo' src={Icon404} alt='' />
			<h2 id='notpermisstion_header'>Sorry, you cannot view the page.</h2>
			<p id='notpermisstion_text'>
				You're not allow to access this page. Please contact the administrator if
				you need help
			</p>

			<section className='notpermisstion_buttonwrapper'>
				<Button variant='text' onClick={() => navigate(-1)}>
					Go back
				</Button>
			</section>
		</div>
	);
}
