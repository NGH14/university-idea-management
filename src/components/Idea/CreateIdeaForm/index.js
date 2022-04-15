/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
	Autocomplete,
	FormHelperText,
	MenuItem,
	OutlinedInput,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { axioc, getGuid, toReadableFileSize, API_PATHS } from 'common';
import { UimAutoComplete, UimModalForm, UimTextField } from 'components/Uim';

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

const ListItem = styled('li')(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

const toastMessages = {
	ERR_MAX_FILES_NUMBER: 'Maximum files is 4 !!',
	ERR_FILE_ADD_FAILED: 'Failed to add file !!',
	ERR_FILE_REJECTED: 'File is invalid !!',
	ERR_FILE_BIG: 'cannot be added !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

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

const validationSchema = yup.object({
	title: yup.string().required('Idea title is required'),
	content: yup.string().required('Please Provide content'),
	tags: yup.array().max(3, 'Only 3 tags per idea').nullable(),
	attachments: yup.array().nullable(),
	is_anonymous: yup.bool(),
	submission_id: yup.string().required('Please specify the submission for this idea'),
});

const initialValues = {
	title: '',
	content: '',
	tags: null,
	attachments: null,
	is_anonymous: true,
	submission_id: '',
};

function CreateIdeaForm(props) {
	const { onClose, onCreate, submission: externalSubData } = props;
	const [attachments, setAttachments] = useState([]);
	const [subOptions, setSubOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onCreate({
				...values,
				attachments: attachments.map((_) => {
					delete _.guid;
					delete _.size;
					return _;
				}),
			});
		},
	});

	useEffect(() => {
		(async () => {
			!externalSubData
				? await axioc
						.get(API_PATHS.ADMIN.MANAGE_SUB + '/list')
						.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR))
						.then((res) => setSubOptions(res?.data?.result))
				: formik.setFieldValue('submission_id', externalSubData.id);

			await axioc
				.get(API_PATHS.ADMIN.MANAGE_TAG + '/list')
				.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR))
				.then((res) => setTagOptions(res?.data?.result));
		})();
	}, []);

	const FILE_SIZE = 1e7;

	const handleDrop = (acceptedFiles) => {
		try {
			if (attachments?.length === 4) {
				toast.error(toastMessages.ERR_MAX_FILES_NUMBER);
				return;
			}

			for (const file of acceptedFiles) {
				if (
					attachments.reduce((a, b) => a + (b['size'] || 0), 0) + file.size >
					FILE_SIZE
				) {
					toast.error(`${file.name} ${toastMessages.ERR_FILE_BIG}`);
					return;
				}

				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					setAttachments((oldArr) => [
						...oldArr,
						{
							guid: `${getGuid()}_${file.name}`,
							size: file.size,
							data: reader.result.split(',')[1],
							name: file.name,
							description: file.name,
							mime: file.type,
						},
					]);
				};
			}
		} catch (err) {
			toast.error(toastMessages.ERR_FILE_ADD_FAILED);
		}
	};

	const handleDeleteAttachment = (attachmentToDelete) => () => {
		setAttachments((attachments) =>
			attachments.filter(
				(attachment) => attachment.guid !== attachmentToDelete.guid,
			),
		);
	};

	return (
		<UimModalForm
			title='Create Idea'
			onClose={() => onClose()}
			ClassName='createideaform'
			onSubmit={formik.handleSubmit}
			showActionButton={true}
		>
			<div className='createideaform_group'>
				<div className='createideaform_content'>
					{externalSubData ? (
						<UimTextField
							label='Submission'
							propName='submission_id'
							variant='standard'
							dynamic={{ value: externalSubData.title }}
							inputProps={{ disabled: true, readOnly: true }}
						/>
					) : (
						<UimAutoComplete.Select
							label='Submission'
							required={true}
							propName='submission_id'
							onBlur={formik.handleBlur}
							options={subOptions.map((option) => option.title)}
							onChange={(_, value) =>
								formik.setFieldValue('submission_id', value ?? '')
							}
							dynamic={{
								value: formik.values.submission_id,
								error: formik.errors.submission_id,
								touched: formik.touched.submission_id,
							}}
						/>
					)}
				</div>
			</div>
			<div className='createideaform_group'>
				<div className='createideaform_content'></div>
			</div>
			<div className='createideaform_group'>
				<div className='createideaform_content'></div>
			</div>
		</UimModalForm>
	);
}
/* <div className='createideaform'>
			<div className='createideaform_title'>
				<h2>Create Idea</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='createideaform_grid' onSubmit={formik.handleSubmit}>
				<div className='createideaform_group'>
					<div className='createideaform_content'>
						<InputLabel htmlFor='titleSub'>Title Submission</InputLabel>
						{externalSubData ? (
							<CssTextField
								fullWidth
								variant='standard'
								id='submission_id'
								name='submission_id'
								value={externalSubData.title}
								inputProps={{
									disabled: true,
									readOnly: true,
								}}
							/>
						) : (
							<>
								<Autocomplete
									freeSolo
									fullWidth
									id='submission_id'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									options={subOptions}
									defaultValue=''
									value={formik?.values?.submission_id || null}
									getOptionLabel={(option) =>
										option?.title?.length > 50
											? option?.title?.substr(0, 50 - 1) + '...'
											: option?.title
									}
									renderInput={(params) => <TextField {...params} />}
								/>
								<FormHelperText error>
									{formik.touched.submission_id &&
										formik.errors.submission_id}
								</FormHelperText>
							</>
						)}
					</div>
					<div className='createideaform_content'>
						<InputLabel required={true} htmlFor='title'>
							Title Idea
						</InputLabel>
						<CssTextField
							fullWidth
							id='title'
							name='title'
							value={formik.values?.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
						/>
					</div>
				</div>

				<div className='createideaform_group'>
					<div className='createideaform_content'>
						<InputLabel required={true} htmlFor='content'>
							Content
						</InputLabel>
						<TextareaAutosize
							className='description-field'
							aria-label='minimum height'
							id='content'
							name='content'
							minRows={8}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							style={{
								width: '100%',
								marginTop: 16,
								marginBottom: 8,
								borderRadius: '5px',
							}}
						/>
					</div>
				</div>

				<div className='createideaform_group'>
					<div className='createideaform_content'>
						<UimAutoComplete.Tag
							label='Tags'
							propName='tags'
							options={tagOptions}
							dynamic={{
								error: formik.errors.tags,
								touched: formik.touched.tags,
								value: formik?.values?.tags,
							}}
							onChange={(_, value) => formik.setFieldValue('tags', value)}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{attachments.length === 0 ? null : (
					<div className='createideaform_group'>
						<div className='createideaform_content'>
							<List
								sx={{
									display: 'flex',
									justifyContent: 'center',
									flexWrap: 'wrap',
									listStyle: 'none',
									p: 0.5,
									m: 0,
								}}
							>
								{attachments.map((file, index) => (
									<ListItem key={index}>
										<Chip
											clickable
											icon={<InsertDriveFileIcon />}
											onDelete={handleDeleteAttachment(file)}
											label={`${file.name} · ${toReadableFileSize(
												file.size,
											)}`}
											style={{ background: '#d2d2d2' }}
										/>
									</ListItem>
								))}
							</List>
						</div>
					</div>
				)}

				<div className='createideaform_group'>
					<div className='createideaform_content'>
						<Dropzone
							onDrop={handleDrop}
							onDropRejected={() =>
								toast.error(toastMessages.ERR_FILE_REJECTED)
							}
						>
							{({ getRootProps, getInputProps }) => (
								<div
									{...getRootProps({
										className: 'dropzone',
									})}
								>
									<input {...getInputProps()} />
									<p>Drag &#38; drop files, or click to select files</p>
								</div>
							)}
						</Dropzone>
					</div>
				</div>

				<div className='createideaform_footer'>
					<ColorButton variant='outlined' onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton variant='contained' type='submit'>
						Create
					</ColorButton>
				</div>
			</form>
		</div> */

export default React.memo(CreateIdeaForm);
