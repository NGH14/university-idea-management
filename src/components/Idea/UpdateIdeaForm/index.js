import './style.css';

import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
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

function UpdateIdeaForm(props) {
	const { onClose, onUpdate, submission: externalSubData, initialValues } = props;
	const [attachments, setAttachments] = useState([]);
	const [subOptions, setSubOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onUpdate({
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
		if (!externalSubData) {
			loadSubmissions();
		} else {
			formik.setFieldValue('submission_id', externalSubData.id);
		}
		loadTags();
	}, []);

	const loadSubmissions = async () => {
		await axioc
			.get(API_PATHS.ADMIN.MANAGE_SUB + '/list')
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR))
			.then((res) => {
				setSubOptions(res?.data?.result);
			});
	};

	const loadTags = async () => {
		await axioc
			.get(API_PATHS.ADMIN.MANAGE_TAG + '/list')
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR))
			.then((res) => {
				setTagOptions(res?.data?.result);
			});
	};

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
		<div className='updateideaform'>
			<div className='updateideaform_title'>
				<h2>Create Idea</h2>
				<IconButton>
					<CloseIcon onClick={() => onClose()} />
				</IconButton>
			</div>
			<br />

			<form className='updateideaform_grid' onSubmit={formik.handleSubmit}>
				<div className='updateideaform_group'>
					<div className='updateideaform_content'>
						<InputLabel htmlFor='titleSub'>Title Submission</InputLabel>
						{externalSubData ? (
							<Select
								disabled={true}
								fullWidth
								labelId='submission_id'
								id='submission_id'
								name='submission_id'
								value={formik.values.submission_id}
								style={{ textTransform: 'capitalize' }}
							>
								<MenuItem value={formik.values.submission_id}>
									{externalSubData.title}
								</MenuItem>
							</Select>
						) : (
							<>
								<Select
									select
									fullWidth
									displayEmpty
									labelId='submission_id'
									id='submission_id'
									name='submission_id'
									defaultValue=''
									value={formik.values.submission_id}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									style={{ textTransform: 'capitalize' }}
									renderValue={
										formik.values.submission_id !== null
											? undefined
											: () => (
													<placeholder>
														<em
															style={{
																textTransform:
																	'lowercase',
																opacity: 0.6,
																fontSize: 14,
															}}
														>
															-- submission --
														</em>
													</placeholder>
											  )
									}
									error={
										formik.touched.submission_id &&
										Boolean(formik.errors.submission_id)
									}
								>
									{subOptions?.map((sub) => (
										<MenuItem
											style={{
												textTransform: 'capitalize',
											}}
											value={sub.id}
										>
											{sub.title}
										</MenuItem>
									))}
								</Select>
								<FormHelperText error>
									{formik.touched.submission_id &&
										formik.errors.submission_id}
								</FormHelperText>
							</>
						)}
					</div>
					<div className='updateideaform_content'>
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

				<div className='updateideaform_group'>
					<div className='updateideaform_content'>
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

				<div className='updateideaform_group'>
					<div className='updateideaform_content'>
						<InputLabel required={true} htmlFor='tags'>
							Tags
						</InputLabel>
						<Select
							select
							fullWidth
							multiple
							labelId='tags'
							id='tags'
							name='tags'
							input={<OutlinedInput label='Tag' />}
							value={formik?.values?.tags}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							MenuProps={{
								PaperProps: {
									style: { maxHeight: 224, width: 250 },
								},
							}}
							renderValue={(selected) =>
								formik.values.tags !== null ? (
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
										{selected.map((value, index) => (
											<ListItem key={index}>
												<Chip
													label={value}
													style={{
														background: '#d2d2d2',
													}}
												/>
											</ListItem>
										))}
									</List>
								) : (
									<placeholder>
										<em
											style={{
												opacity: 0.6,
												fontSize: 14,
											}}
										>
											-- tags --
										</em>
									</placeholder>
								)
							}
							error={formik.touched.tags && Boolean(formik.errors.tags)}
						>
							{tagOptions?.map((tag) => (
								<MenuItem
									style={{ textTransform: 'capitalize' }}
									value={tag.name}
								>
									<Checkbox
										checked={
											formik.values.tags?.indexOf(tag.name) > -1
										}
									/>
									<ListItemText primary={tag.name} />
								</MenuItem>
							))}
						</Select>
						<FormHelperText error>
							{formik.touched.tags && formik.errors.tags}
						</FormHelperText>
					</div>
				</div>

				{attachments.length === 0 ? null : (
					<div className='updateideaform_group'>
						<div className='updateideaform_content'>
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

				<div className='updateideaform_group'>
					<div className='updateideaform_content'>
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

				<div className='updateideaform_footer'>
					<ColorButton variant='outlined' onClick={() => onClose()}>
						Cancel
					</ColorButton>
					<ColorButton variant='contained' type='submit'>
						Update
					</ColorButton>
				</div>
			</form>
		</div>
	);
}

export default React.memo(UpdateIdeaForm);
