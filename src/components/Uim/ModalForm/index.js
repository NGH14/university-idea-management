import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

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

export function UimModalForm({
	ClassName,
	onSubmit,
	onClose,
	title,
	showActionButton = false,
	children,
}) {
	return (
		<div className={ClassName}>
			<div className={`${ClassName}_title`}>
				<h2 style={{ textTransform: 'capitalize' }}>{title}</h2>
				<IconButton>
					<CloseIcon onClick={onClose} />
				</IconButton>
			</div>
			<br />

			<form className='form_grid' onSubmit={onSubmit}>
				{children}

				{showActionButton ? (
					<div className={`${ClassName}_footer`}>
						<ColorButton variant='outlined' onClick={() => onClose()}>
							Cancel
						</ColorButton>
						<ColorButton
							type='submit'
							variant='contained'
							style={{ textTransform: 'capitalize' }}
						>
							{title}
						</ColorButton>
					</div>
				) : (
					<></>
				)}
			</form>
		</div>
	);
}
