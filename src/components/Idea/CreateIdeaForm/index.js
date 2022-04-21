/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	ListItem,
	Modal,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { API_PATHS, axioc, getGuid, toReadableFileSize } from 'common';
import { UimAutoComplete, UimModalForm, UimTextField } from 'components/Uim';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { AiOutlineFile } from 'react-icons/ai';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const style = {
	position: 'relative',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '1000px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '5px',
	overflow: 'auto',
	maxHeight: '100%',

	' @media (max-width: 950px)': {
		width: '100%',
	},
};

const toastMessages = {
	ERR_MAX_FILES_NUMBER: 'Maximum files is 4 !!',
	ERR_FILE_ADD_FAILED: 'Failed to add file !!',
	ERR_FILE_REJECTED: 'File is invalid !!',
	ERR_FILE_BIG: 'cannot be added !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

const validationSchema = yup.object({
	title: yup.string().required('Idea title is required'),
	content: yup.string().required('Please Provide content'),
	tags: yup.array().max(3, 'Only 3 tags per idea').nullable(),
	attachments: yup.array().nullable(),
	is_anonymous: yup.bool(),
	submission_id: yup.string().required('Please specify the submission for this idea'),
	agree: yup.bool().required('You need you Agree'),
});

const initialValues = {
	title: '',
	content: '',
	tags: null,
	attachments: null,
	is_anonymous: false,
	submission_id: '',
	agree: false,
};

function CreateIdeaForm(props) {
	const { onClose, onCreate, visible, submission: externalSubData } = props;
	const [attachments, setAttachments] = useState([]);
	const [subOptions, setSubOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			onCreate({
				...values,
				attachments: attachments?.map((_) => {
					delete _.guid;
					delete _.size;
					delete _.preview;
					return _;
				}),
			});
		},
	});

	useEffect(() => {
		(async () => {
			!externalSubData
				? await axioc
						.get(API_PATHS.SHARED.SUB + '/list')
						.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR))
						.then((res) => setSubOptions(res?.data?.result))
				: formik?.setFieldValue('submission_id', externalSubData?.id);

			await axioc
				.get(API_PATHS.SHARED.TAG + '/list')
				.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR))
				.then((res) => setTagOptions(res?.data?.result));
		})();
	}, []);

	const FILE_SIZE = 1e7;

	const handleDrop = (acceptedFiles) => {
		try {
			if (
				acceptedFiles?.length > 3 ||
				attachments?.length + acceptedFiles?.length > 3
			) {
				toast.error('Too many files, limit at 3');
				return;
			}
			acceptedFiles.forEach((file) => {
				if (
					attachments?.reduce((a, b) => a + (b['size'] || 0), 0) + file.size >
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
							mime: file.type,
							size: file.size,
							name: file.name,
							description: file.name,
							data: reader.result.split(',')[1],
							guid: `${getGuid()}_${file.name}`,
							preview: URL.createObjectURL(file),
						},
					]);
				};
			});
		} catch (err) {
			toast.error(toastMessages.ERR_FILE_ADD_FAILED);
		}
	};

	const handleDeleteAttachment = (attachmentToDelete) => () => {
		attachments.forEach((_) => {
			if (_.preview === attachmentToDelete.preview) {
				URL.revokeObjectURL(_.preview);
				return;
			}
		});
		setAttachments((attachments) =>
			attachments?.filter(
				(attachment) => attachment.guid !== attachmentToDelete.guid,
			),
		);
	};

	const handleClose = () => {
		attachments.forEach((file) => URL.revokeObjectURL(file.preview));
		onClose();
	};

	return (
		<Modal
			open={visible}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<UimModalForm
					entity='idea'
					action='create'
					ClassName='createideaform'
					onSubmit={formik?.handleSubmit}
					showActionButton={true}
					dirty={formik?.values.agree}
					onClose={handleClose}
				>
					<div className='createideaform_group'>
						<div className='createideaform_content'>
							{externalSubData ? (
								<UimTextField
									label='Submission'
									propName='submission_id'
									dynamic={{ value: externalSubData?.title }}
									inputProps={{ disabled: true, readOnly: true }}
								/>
							) : (
								<UimAutoComplete.Select
									label='Submission'
									required={true}
									propName='submission_id'
									onBlur={formik?.handleBlur}
									options={subOptions ?? []}
									getOptionLabel={(option) => option?.title}
									onChange={(_, value) => {
										formik?.setFieldValue(
											'submission_id',
											value.id ?? '',
										);
									}}
									dynamic={{
										value: formik?.values.submission_id,
										error: formik?.errors?.submission_id,
										touched: formik?.touched?.submission_id,
									}}
								/>
							)}
						</div>

						<div className='createideaform_content'>
							<UimTextField
								label='Idea Title'
								required={true}
								propName='title'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								dynamic={{
									value: formik?.values.title,
									error: formik?.errors?.title,
									touched: formik?.touched?.title,
								}}
							/>
						</div>
					</div>
					<div className='createideaform_group'>
						<div className='createideaform_content'>
							<UimTextField
								label='Content'
								required={true}
								autoSize={true}
								minRows={5}
								propName='content'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								dynamic={{
									value: formik?.values.content,
									error: formik?.errors?.content,
									touched: formik?.touched?.content,
								}}
							/>
						</div>
					</div>

					<div className='createideaform_group'>
						<div className='createideaform_content'>
							<UimAutoComplete.Tag
								label='Tags'
								propName='tags'
								options={tagOptions ?? []}
								onChange={(_, value) =>
									formik?.setFieldValue('tags', value ?? '')
								}
								onBlur={formik?.handleBlur}
								dynamic={{
									error: formik?.errors?.tags,
									touched: formik?.touched?.tags,
									value: formik?.values?.tags,
								}}
							/>
						</div>
					</div>

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
										<MdOutlineDriveFolderUpload className='dropzone_icon' />
										<p>
											Drag &#38; drop files, or click to select
											files
										</p>
									</div>
								)}
							</Dropzone>
							<span style={{ padding: '5px', color: '#888' }}>
								{attachments?.length !== 0 && (
									<span> Attach files size: </span>
								)}
								{attachments?.length !== 0 &&
									toReadableFileSize(
										attachments?.reduce((n, { size }) => n + size, 0),
									)}
								{attachments?.length !== 0 && (
									<span> &nbsp;/&nbsp;10 MB</span>
								)}
							</span>
							{attachments?.length === 0 ? null : (
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
											{attachments?.map((file, index) => (
												<ListItem
													key={index}
													secondaryAction={
														<IconButton
															edge='end'
															aria-label='delete'
															onClick={handleDeleteAttachment(
																file,
															)}
														>
															<RiDeleteBack2Fill id='attach_delete-icon' />
														</IconButton>
													}
												>
													<ListItemAvatar>
														<Avatar src={file.preview}>
															<AiOutlineFile />
														</Avatar>
													</ListItemAvatar>
													<ListItemText
														sx={{
															display: 'flex',
															flexDirection: 'column',
															justifyContent: 'center',
														}}
													>
														<p
															style={{
																fontFamily: 'Poppins',
																fontSize: '1em',
															}}
														>
															{file.name}
														</p>
														<p
															style={{
																fontSize: '0.8em',
																color: '#333',
															}}
														>
															{toReadableFileSize(
																file.size,
															)}
														</p>
													</ListItemText>
												</ListItem>
											))}
										</List>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='createideaform_group'>
						<div className='createideaform_content'>
							<FormGroup>
								<FormControlLabel
									label={<p>Display as anonymous</p>}
									required={true}
									id='is_anonymous'
									name='is_anonymous'
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									value={formik?.values?.is_anonymous}
									control={<Checkbox />}
								/>
							</FormGroup>
						</div>
					</div>

					<div className='createideaform_group'>
						<div className='createideaform_content'>
							<FormGroup>
								<FormControlLabel
									label={
										<p>
											By clicking here, I state that I have read and
											understood the&nbsp;
											<a
												target='_blank'
												rel='noopener noreferrer'
												href='../term-condition'
											>
												the Term &amp; Conditions.
											</a>
										</p>
									}
									required={true}
									name='agree'
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									control={<Checkbox />}
								/>
							</FormGroup>
						</div>
					</div>
				</UimModalForm>
			</Box>
		</Modal>
	);
}

export default React.memo(CreateIdeaForm);
