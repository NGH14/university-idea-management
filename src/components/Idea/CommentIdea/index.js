/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Grid } from '@material-ui/core';
import { Button, InputBase } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { API_PATHS, axioc, toastMessages } from 'common';
import { stringToSvg } from 'common/DiceBear';
import { useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const initialValues = { content: '' };
const validationSchema = yup.object({
	content: yup.string().required('PLease comment something before submit'),
});

// TODO: @Henry, catach on key ENTER event
function CommentIdea({ data, ideaId }) {
	const [commentsData, setCommentsData] = useState(data?.comment);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
	});

	useEffect(() => loadData(), []);
	const handleSubmitComment = async (values) =>
		await axioc
			.post(`${API_PATHS.SHARED.COMMENT}`, {
				content: values,
				idea_id: ideaId,
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then(() => {
				formik.resetForm();
				loadData();
			});

	const loadData = async (minItems) =>
		axioc
			.get(`${API_PATHS.SHARED.COMMENT}/list/${ideaId}`, {
				params: { minItems },
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => setCommentsData(res?.data?.result));

	const renderContent = () => (
		<div>
			{_.map(commentsData, (item) => (
				<Paper
					style={{
						padding: 15,
						boxShadow: 'none',
					}}
				>
					<Grid container wrap='nowrap' spacing={2}>
						<Grid item>
							<Avatar aria-label='avatar'>
								{item?.is_anonymous || item?.user?.avatar
									? stringToSvg(item?.user?.avatar)
									: 'A'}
							</Avatar>
						</Grid>
						<Grid justifyContent='left' item xs zeroMinWidth>
							<div
								style={{
									background: '#F0F2F5',
									lineHeight: '20px',
									borderRadius: 15,
									padding: 10,
								}}
							>
								<p
									style={{
										textAlign: 'left',
										fontWeight: 'bold',
										fontSize: 13,
										fontFamily: 'Helvetica',
										color: 'rgba(0, 0, 0, 0.87)',
										lineHeight: '20px',
									}}
								>
									{item?.user?.full_name}
								</p>
								<p
									style={{
										textAlign: 'left',
										fontSize: 14,
										color: 'rgba(0, 0, 0, 0.6)',
										fontFamily: 'Helvetica',
										lineHeight: '20px',
									}}
								>
									{item?.content}
								</p>
							</div>
							<p
								style={{
									textAlign: 'left',
									color: 'gray',
									marginTop: 8,
									marginLeft: 10,
									fontSize: 12,
									fontFamily: 'Helvetica',
								}}
							>
								{moment(item?.created_date).fromNow()}
							</p>
						</Grid>
					</Grid>
				</Paper>
			))}
		</div>
	);

	return (
		<>
			<div>
				<Paper
					component='form'
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						border: '0.5px solid rgba(0,0,0,0.1)',
					}}
				>
					<InputBase
						fullWidth
						id='content'
						name='content'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.content}
						sx={{ ml: 1, flex: 1 }}
						placeholder='Write a comment ...'
						helperText={formik.touched.content && formik.errors.content}
						error={formik.touched.content && Boolean(formik.errors.content)}
					/>
					<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
					<Button
						sx={{ p: '10px' }}
						aria-label='directions'
						onClick={() => handleSubmitComment(formik.values.content)}
					>
						Post
					</Button>
				</Paper>
			</div>

			{renderContent()}
		</>
	);
}
export default React.memo(CommentIdea);
