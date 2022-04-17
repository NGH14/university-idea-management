/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { Checkbox, FormControlLabel, FormGroup, ListItem } from '@mui/material';
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
				attachments: attachments?.map((_) => {
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
			if (acceptedFiles?.length > 5) {
				toast.error('Too many files, limit at 5');
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
				if (attachments?.length > 5) {
					toast.error('Too manasdasdasdy files, limit at 5');
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
			});
		} catch (err) {
			toast.error(toastMessages.ERR_FILE_ADD_FAILED);
		}
	};

	const handleDeleteAttachment = (attachmentToDelete) => () => {
		setAttachments((attachments) =>
			attachments?.filter(
				(attachment) => attachment.guid !== attachmentToDelete.guid,
			),
		);
	};

	return (
		<UimModalForm
			entity='idea'
			action='create'
			onClose={() => onClose()}
			ClassName='createideaform'
			onSubmit={formik?.handleSubmit}
			showActionButton={true}
			dirty={formik?.values.agree}
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
								formik?.setFieldValue('submission_id', value.id ?? '');
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
								<p>Drag &#38; drop files, or click to select files</p>
							</div>
						)}
					</Dropzone>
					<span style={{ padding: '5px', color: '#888' }}>
						{attachments?.length !== 0 && <span> Attach files size: </span>}
						{attachments?.length !== 0 &&
							toReadableFileSize(
								attachments?.reduce((n, { size }) => n + size, 0),
							)}
						{attachments?.length !== 0 && <span> &nbsp;/&nbsp;10 MB</span>}
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
													onClick={handleDeleteAttachment(file)}
												>
													<RiDeleteBack2Fill id='attach_delete-icon' />
												</IconButton>
											}
										>
											<ListItemAvatar>
												<Avatar>
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
													{toReadableFileSize(file.size)}
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
	);
}

export default React.memo(CreateIdeaForm);
