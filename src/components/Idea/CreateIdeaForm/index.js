/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import { API_PATHS, axioc, getGuid, toReadableFileSize } from 'common';
import { UimAutoComplete, UimModalForm, UimTextField } from 'components/Uim';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ListItem = styled('li')(({ theme }) => ({ margin: theme.spacing(0.5) }));

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
			entity='idea'
			action='create'
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
							dynamic={{ value: externalSubData.title }}
							inputProps={{ disabled: true, readOnly: true }}
						/>
					) : (
						<UimAutoComplete.Select
							label='Submission'
							required={true}
							propName='submission_id'
							onBlur={formik.handleBlur}
							options={subOptions}
							getOptionLabel={(option) => option?.title}
							onChange={(_, value) => {
								formik.setFieldValue('submission_id', value.id ?? '');
							}}
							dynamic={{
								value: formik.values.submission_id,
								error: formik.errors.submission_id,
								touched: formik.touched.submission_id,
							}}
						/>
					)}
				</div>

				<div className='createideaform_content'>
					<UimTextField
						label='Idea Title'
						required={true}
						propName='title'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						dynamic={{
							value: formik.values.title,
							error: formik.errors.title,
							touched: formik.touched.title,
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
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						dynamic={{
							value: formik.values.content,
							error: formik.errors.content,
							touched: formik.touched.content,
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
						onChange={(_, value) => formik.setFieldValue('tags', value ?? '')}
						onBlur={formik.handleBlur}
						dynamic={{
							error: formik.errors.tags,
							touched: formik.touched.tags,
							value: formik?.values?.tags,
						}}
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
		</UimModalForm>
	);
}

export default React.memo(CreateIdeaForm);
