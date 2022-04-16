/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import loginImg from 'assets/images/Contact-CIC-Education-2-1024x858.webp';
import { axioc, toastMessages } from 'common';
import { stringToSvg } from 'common/DiceBear';
import { API_PATHS } from 'common/env';
import TabProfile from 'components/TabProfile';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UpdatePassword() {
	const [searchParams] = useSearchParams();
	const [user, setUser] = useState({});

	const email = searchParams.get('email');

	useEffect(() => loadData(), []);

	const loadData = async () => {
		await axioc
			.get(`${API_PATHS.SHARED.USER}/${email}`)
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => setUser(res?.data?.result));
	};

	return (
		<div className='profile_wrapper'>
			<div className='avatar_wrapper'>
				<img
					className='avatar_cover'
					src={loginImg}
					alt='avatar_cover'
				/>
				<Box
					className='avatar_content'
					sx={{ display: 'flex', gap: 1.5 }}>
					<Avatar alt={user.full_name ?? ''} className='avatar_img'>
						{stringToSvg(user.avatar)}
					</Avatar>
					<Stack>
						<Typography
							fontWeight={700}
							fontSize={30}
							sx={{ mt: -1 }}>
							{user.full_name ?? ''}
						</Typography>
						<Typography
							style={{ textTransform: 'capitalize' }}
							variant='body2'
							color='text.secondary'>
							{user.role ?? ''}
						</Typography>
					</Stack>
				</Box>
			</div>

			<TabProfile />
		</div>
	);
}
