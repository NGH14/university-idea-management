/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Grid } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputBase, Typography } from '@mui/material';
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

function CommentIdea({ idea }) {
	const [commentsList, setCommentsList] = useState([]);
	const [commentsTotal, setCommentsTotal] = useState(0);
	const [showMore, setShowMore] = useState(false);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => handleSubmitComment(values.content),
	});

	useEffect(() => loadData(false), [showMore]);

	const loadData = async (reload) => {
		await axioc
			.get(`${API_PATHS.SHARED.COMMENT}/list/${idea?.id}`, {
				params: { is_initial: !showMore },
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => {
				const newComments = reload
					? res?.data?.result?.rows
					: [...commentsList, ...res?.data?.result?.rows];

				setCommentsTotal(res?.data?.result?.total);
				setCommentsList(newComments);
			});
	};

	const handleSubmitComment = async (values) =>
		await axioc
			.post(`${API_PATHS.SHARED.COMMENT}`, {
				content: values,
				idea_id: idea?.id,
			})
			.catch(() => {
				toast.error(toastMessages.errs.UNEXPECTED);
				return;
			})
			.then(() => {
				formik.resetForm();
				loadData(true);
			});

	const renderContent = () => (
		<div>
			{_.map(commentsList, (item) => (
				<Paper
					style={{
						padding: 5,
						boxShadow: 'none',
					}}>
					<Grid container wrap='nowrap' spacing={1}>
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
								}}>
								<div
									style={{
										display: 'flex',
										justifyItems: 'center',
										lineHeight: '20px',
									}}>
									<p
										style={{
											textAlign: 'left',
											fontWeight: 'bold',
											fontSize: 13,
											fontFamily: 'Helvetica',
											color: 'rgba(0, 0, 0, 0.87)',
										}}>
										{item?.user?.full_name ?? '[anonymous]'}
									</p>
									<p
										style={{
											fontFamily: 'Helvetica',
											textAlign: 'left',
											marginLeft: 10,
											color: 'rgba(0,0,0,.4)',
											fontSize: 10,
										}}>
										{moment(item?.created_date).fromNow()}
									</p>
								</div>
								<p
									style={{
										textAlign: 'left',
										fontSize: 14,
										color: 'rgba(0, 0, 0, 0.6)',
										fontFamily: 'Helvetica',
										lineHeight: '20px',
									}}>
									{item?.content}
								</p>
							</div>
						</Grid>
					</Grid>
				</Paper>
			))}

			{commentsTotal > 3 ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '10px',
					}}>
					<Typography
						onClick={handleOnClickShowMore}
						sx={{
							cursor: 'pointer',
							fontWeight: '600',
							fontSize: '0.8em',
							opacity: '0.5',
							'&:hover': { textDecoration: 'underline' },
						}}>
						{showMore ? 'View less' : 'View more'}
					</Typography>
					<Typography
						sx={{
							fontSize: '0.9em',
							opacity: '0.7',
						}}>
						{commentsList?.length} of {commentsTotal}
					</Typography>
				</div>
			) : (
				<></>
			)}
		</div>
	);

	const handleOnClickShowMore = () => {
		if (showMore) {
			setCommentsList([]);
			setShowMore(false);
		} else {
			setShowMore(true);
		}
	};

	return (
		<>
			<div>
				<Paper
					component='form'
					onSubmit={formik.handleSubmit}
					sx={{
						p: '2px 4px',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						border: '0.5px solid rgba(0,0,0,0.1)',
						marginBottom: '10px',
					}}>
					<InputBase
						fullWidth
						id='content'
						name='content'
						sx={{ ml: 1, flex: 1 }}
						value={formik.values.content}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder='Write a comment ...'
						helperText={
							formik.touched.content && formik.errors.content
						}
						error={
							formik.touched.content &&
							Boolean(formik.errors.content)
						}
					/>
					<Divider
						sx={{ height: 28, m: 0.5 }}
						orientation='vertical'
					/>
					<IconButton
						type='submit'
						sx={{
							p: '10px',
							color: '#9ba6e0',
							'&:hover': {
								backgroundColor: 'rgb(240, 242, 245)',
							},
						}}
						aria-label='post new comment'
						component='button'>
						<SendIcon />
					</IconButton>
				</Paper>
			</div>

			{renderContent()}
		</>
	);
}
export default React.memo(CommentIdea);
