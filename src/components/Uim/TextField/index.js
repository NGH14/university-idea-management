import { FormHelperText, TextField as MuiTextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import React from 'react';

const CssTextField = styled(MuiTextField)({
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

export function UimTextField({
	dynamic: { value, touched, error },
	required = false,
	autoSize = false,
	minRows,
	maxRows,
	capitalize,
	propName,
	variant,
	inputProps,
	onChange,
	onBlur,
	placeholder,
	label,
}) {
	return (
		<>
			<InputLabel required={required} htmlFor={propName}>
				{label}
			</InputLabel>
			<CssTextField
				fullWidth
				id={propName}
				multiline={autoSize}
				rows={!minRows ?? minRows}
				minRows={minRows}
				maxRows={maxRows}
				name={propName}
				value={value ?? ''}
				placeholder={placeholder}
				variant={variant}
				onBlur={onBlur}
				onChange={onChange}
				helperText={touched && error}
				error={touched && Boolean(error)}
				inputProps={{
					...inputProps,
					style: capitalize ? { textTransform: 'capitalize' } : {},
				}}
			/>
		</>
	);
}
