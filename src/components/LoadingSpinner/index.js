import './style.css';

import { CircularProgress } from '@mui/material';
import React from 'react';

import UniLogo from 'assets/images/logo-500.webp';

function LoadingSpinner(props) {
	const { inputHeight } = props;
	return (
		<div
			className='loading_page'
			style={{ height: inputHeight ? inputHeight : '100vh' }}
		>
			<div className='loading_content'>
				<CircularProgress
					size={100}
					sx={{
						position: 'absolute',
						// top: -6,
						// left: -10,
						// zIndex: 1,
					}}
				/>

				<img className='loading_logo' src={UniLogo} alt='' />
			</div>
		</div>
	);
}
export default React.memo(LoadingSpinner);
