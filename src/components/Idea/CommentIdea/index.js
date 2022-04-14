import { Divider, Grid } from '@material-ui/core';
import { Button, InputBase } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { axiocRequests, API_PATHS } from 'common';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useState } from 'react';

function CommentIdea({ data, ideaId }) {
	const [dataComment, setDataComment] = useState(data?.comment);

	const [totalComment, setTotalComment] = useState(data?.comment.total || 10);
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 5,
	});

	// NOTE: @Henry, fix param show more
	const loadData = async () => {
		axiocRequests
			.get(`${API_PATHS.ADMIN.MANAGE_COMMENT}`, {
				params: {
					ideaId,
					page: pagination?.page,
				},
			})
			.then((res) => {
				setDataComment([...dataComment, res?.data?.result?.row]);
			})
			.catch(() => {});
	};
	// ref 80 condition display button show more
	const onShowMoreComment = async () => {
		setPagination(pagination?.page + 1);
		loadData();
	};

	const onCreateComment = async (value) => {
		// api create Comment
		const newValue = { ...value, ideaId };
		await axiocRequests
			.post(`${API_PATHS.ADMIN.MANAGE_COMMENT}`, newValue)
			.then((res) => {
				setDataComment([{ ...res?.data?.result }, ...dataComment]);
				setTotalComment(totalComment + 1);
			})
			.catch(() => {});
	};

	const renderContent = () => {
		const comments = _.map(dataComment, (item) => {
			return (
				<Paper
					style={{
						padding: 15,
						boxShadow: 'none',
					}}
				>
					<Grid container wrap='nowrap' spacing={2}>
						<Grid item>
							<Avatar alt='Remy Sharp' />
						</Grid>
						<Grid justifyContent='left' item xs zeroMinWidth>
							<div
								style={{
									borderRadius: 15,
									padding: 10,
									background: '#F0F2F5',
									lineHeight: '20px',
								}}
							>
								<p
									style={{
										marginBottom: 10,
										textAlign: 'left',
										fontWeight: 'bold',
										fontSize: 13,
										fontFamily: 'Helvetica',
										color: 'rgba(0, 0, 0, 0.87)',
										lineHeight: '20px',
									}}
								>
									{item?.user?.name}
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
								Commented {moment(item.createAt, 'YYYYMMDD').fromNow()}
							</p>
						</Grid>
					</Grid>
				</Paper>
			);
		});

		return (
			<div>
				{comments}
				{_.size(dataComment) === totalComment || totalComment === 0 ? (
					<div></div>
				) : (
					<div
						style={{
							textAlign: 'center',
							marginTop: 15,
							marginBottom: 15,
						}}
						onClick={() => {
							onShowMoreComment();
						}}
					>
						<Button variant={'outlined  '}>View More</Button>
					</div>
				)}
			</div>
		);
	};
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
						borderTop: '0.5px solid rgba(0,0,0,0.1)',
					}}
				>
					<InputBase
						fullWidth
						sx={{ ml: 1, flex: 1 }}
						placeholder='Write a comment ...'
						onClick={() => {
							console.log(123);
						}}
					/>
					<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
					<Button
						sx={{ p: '10px' }}
						aria-label='directions'
						onClick={() => {
							onCreateComment();
						}}
					>
						Post
					</Button>
				</Paper>
			</div>
			<div
				style={{
					paddingRight: 15,
					paddingLeft: 15,
					marginTop: 15,
					fontSize: 14,
				}}
			>
				<strong>Comment ({totalComment || 10})</strong>
			</div>
			{renderContent()}
		</>
	);
}
export default React.memo(CommentIdea);
