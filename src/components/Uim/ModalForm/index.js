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

/* const SwitchFields = ({ type, field }) => {
	switch (type) {
		case 'text':
			return (
				<UimTextField
					required={field?.required}
					propName={field?.propName}
					onChange={field?.onChange}
					onBlur={field?.onBlur}
					label={field?.label}
					dynamic={
						value: field?.value,
						error: field?.error,
						touched: field?.touched,
					}}
				/>
			);
		case 'dropdown':
			return (
				<UimAutoComplete.DropDown
					onEvents={{
						onBlur: field?.onBlur,
						onChange: field?.onChange,
					}}
					props={{
						options: field?.options ?? [],
						required: field?.required,
						propName: field?.propName,
						variant: field?.variant,
						label: field?.label,
					}}
					formiks={{
						touched: field?.touched,
						value: field?.value,
						error: field?.error,
					}}
				/>
			);
		case 'tag':
			return (
				<UimAutoComplete.Tag
					onEvents={{
						onBlur: field?.onBlur,
						onChange: field?.onChange,
					}}
					props={{
						options: field?.options ?? [],
						required: field?.required,
						propName: field?.propName,
						variant: field?.variant,
						label: field?.label,
					}}
					formiks={{
						touched: field?.touched,
						value: field?.value,
						error: field?.error,
					}}
				/>
			);
		case 'select':
			return (
				<UimAutoComplete.Select
					onEvents={{
						onBlur: field?.onBlur,
						onChange: field?.onChange,
					}}
					props={{
						options: field?.options ?? [],
						required: field?.required,
						propName: field?.propName,
						variant: field?.variant,
						label: field?.label,
					}}
					formiks={{
						touched: field?.touched,
						value: field?.value,
						error: field?.error,
					}}
				/>
			);
		case 'date':
			return (
				<UimDatePicker
					renderInput={field?.renderInput}
					required={field?.required}
					onChange={field?.onChange}
					variant={field?.variant}
					propName={field?.propName}
					onBlur={field?.onBlur}
					label={field?.label}
					dynamic={
						value: field?.value,
						error: field?.error,
						touched: field?.touched,
					}}
				/>
			);
		default:
			return;
	}
}; */
