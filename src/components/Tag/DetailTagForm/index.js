import './style.css';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React from 'react';

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

function DetailTagForm(props) {
	const { onClose, initialValue } = props;

	const formik = useFormik({
		initialValues: initialValue,
	});

	return (
		<div className='detailtagform'>
			<div className='detailtagform_title'>
				<h2>Tag Details</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='detailtagform_grid' onSubmit={formik.handleSubmit}>
				<div className='detailtagform_group'>
					<div className='detailtagform_content'>
						<InputLabel required htmlFor='name'>
							Tag Name
						</InputLabel>
						<CssTextField
							fullWidth
							id='name'
							name='name'
							value={formik.values.name}
							variant='standard'
							inputProps={{
								readOnly: true,
							}}
						/>
					</div>
				</div>

				<div className='detailtagform_group'>
					<div className='detailtagform_content'>
						<InputLabel required htmlFor='created_by'>
							Created By
						</InputLabel>
						<CssTextField
							fullWidth
							id='created_by'
							name='created_by'
							value={formik.values.created_by}
							variant='standard'
							inputProps={{
								readOnly: true,
							}}
						/>
					</div>
					<div className='detailtagform_content'>
						<InputLabel required htmlFor='modified_by'>
							Modified By
						</InputLabel>
						<CssTextField
							fullWidth
							id='modified_by'
							name='modified_by'
							value={formik.values.modified_by}
							variant='standard'
							inputProps={{
								readOnly: true,
							}}
						/>
					</div>
				</div>

				<div className='detailtagform_group'>
					<div className='detailtagform_content'>
						<InputLabel required htmlFor='created_at'>
							Created Date
						</InputLabel>
						<CssTextField
							fullWidth
							id='created_at'
							name='created_at'
							value={formik.values.created_at}
							variant='standard'
							inputProps={{
								readOnly: true,
							}}
						/>
					</div>
					<div className='detailtagform_content'>
						<InputLabel required htmlFor='modified_at'>
							Modified Date
						</InputLabel>
						<CssTextField
							fullWidth
							id='modified_at'
							name='modified_at'
							value={formik.values.modified_at}
							variant='standard'
							inputProps={{
								readOnly: true,
							}}
						/>
					</div>
				</div>

				<div className='detailtagform_footer'></div>
			</form>
		</div>
	);
}

export default React.memo(DetailTagForm);
