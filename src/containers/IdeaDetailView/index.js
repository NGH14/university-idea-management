import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { axioc, sleep } from 'common';
import { API_PATHS, ROLES } from 'common/env';
import CommentIdea from 'components/Idea/CommentIdea';
import { UserContext } from 'context/AppContext';
import ModalIdeaDetailView from './ModalIdeaDetailView';

const toastMessages = {
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
	ERR_USER_NOT_FOUND: 'User not found !!',
	WAIT: 'Please wait...',
	SUC_IDEA_ADDED: 'Create idea successful !!',
	SUC_IDEA_EDITED: 'Update idea successful !!',
	SUC_IDEA_DEL: 'Delete idea successful !!',
};
function IdeaDetailView() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [data, setData] = useState();
	const { state } = useContext(UserContext);
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => {
		LoadData();
	}, []);

	const LoadData = async () => {
		await axioc
			.get(`${API_PATHS.SHARED.IDEA}/${id}`)
			.then((res) => {
				if (res?.data?.successed) {
					setData(res?.data?.result ?? {});
				}
			})
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const renderCardContent = () => {
		return (
			<CardContent>
				<div style={{ display: 'flex' }}>
					<h3 style={{ marginRight: 10, fontWeight: 'bold' }}>Submission: </h3>
					<Tooltip title={'Detail submission'}>
						<label
							onClick={() => {
								navigate(
									`/submission/${
										data.submissionId ||
										'NDM3YzBiMzktMDBlNy00ZDk3LTgzMTctOTE3NzIwYzJkMzlh'
									}`,
								);
							}}
							style={{
								textDecoration: 'underline',
								textDecorationColor: '#1976d2',
								color: '#1976d2',
								cursor: 'pointer',
							}}
						>
							{/*{data?.submissionName}*/}Submission name
						</label>
					</Tooltip>
				</div>
				<br></br>
				<div style={{ display: 'flex' }}>
					<h3 style={{ marginRight: 10, fontWeight: 'bold' }}>Title: </h3>
					<label>{/*{data?.title}*/} Title Idea</label>
				</div>
				<br></br>
				<div>
					<h3 style={{ fontWeight: 'bold' }}>Content</h3>
					<Typography variant='body2' color='text.secondary'>
						{/*{data?.content}*/}
						This impressive paella is a perfect party dish and a fun meal to
						cook together with your guests. Add 1 cup of frozen peas along
						with the mussels, if you like.
					</Typography>
				</div>
			</CardContent>
		);
	};
	const renderCardHeader = (data) => {
		return (
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'gray' }} aria-label='recipe'>
						P
					</Avatar>
				}
				// action={renderActionIdea(data?.id, data?.createBy)}
				title='People Private'
				subheader={
					data?.createTime
						? moment(data?.createTime).format('LLL')
						: 'September 14, 2016'
				}
			/>
		);
	};
	const renderTop = () => {
		if (
			data?.create_by !== state?.dataUser?.email &&
			state?.dataUser?.role !== ROLES.ADMIN &&
			state?.dataUser?.role !== ROLES.MANAGER
		) {
			return null;
		}
		return (
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'right',
					marginBottom: 10,
				}}
			>
				<Button
					startIcon={<EditIcon />}
					variant={'contained'}
					size={'small'}
					onClick={() => onOpenModal()}
				>
					Update idea
				</Button>
				{/*{ data?.create_by !== state.dataUser.email && <Button startIcon={<DeleteIcon />} variant={"contained"} style={{marginLeft: 10, background:"darkred"}} size={"small"}>*/}
				{/*    Delete idea*/}
				{/*</Button>}*/}
			</div>
		);
	};
	const renderComment = () => {
		return <CommentIdea data={data} ideaId={data?.id} />;
	};
	const onUpdate = (value) => {
		toast
			.promise(
				axioc
					.put(`${API_PATHS.SHARED.IDEA}/${value?.id}`, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_EDITED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then((res) => {
				if (value?.exitFile && value?.file && !_.isEmpty(value?.file)) {
					// delete file API
				}
				setStatus({ ...status, visibleModal: false });
				toast.success(toastMessages.SUC_IDEA_DEL);
				LoadData();
			});
	};
	const onCloseModal = () => {
		setStatus({ ...status, visibleModal: false });
	};
	const onOpenModal = () => {
		setStatus({ ...status, visibleModal: true });
	};
	const renderModal = () => {
		return (
			<ModalIdeaDetailView
				visible={status.visibleModal}
				initialValue={data}
				onClose={onCloseModal}
				onUpdate={onUpdate}
			/>
		);
	};
	const renderActionButton = (item) => {
		return (
			<CardActions disableSpacing style={{ paddingRight: 15, paddingLeft: 15 }}>
				<Button
					aria-label='add to favorites'
					startIcon={<ThumbUpIcon />}
					color={'inherit'}
					variant='contained'
					size={'small'}
				>
					Like (0)
				</Button>
				<Button
					aria-label='add to favorites'
					style={{ marginRight: 20, marginLeft: 20 }}
					startIcon={<ThumbDownIcon />}
					color={'inherit'}
					variant='contained'
					size={'small'}
				>
					Dislike (0)
				</Button>
				{/*<ExpandMore*/}
				{/*    expand={expanded[item.id]}*/}
				{/*    onClick={() => handleExpandClick(item.id)}*/}
				{/*    aria-expanded={expanded[item.id]}*/}
				{/*    aria-label="show more"*/}
				{/*>*/}
				{/*    <Tooltip title={"Show comment"}>*/}
				{/*        <ExpandMoreIcon />*/}
				{/*    </Tooltip>*/}
				{/*</ExpandMore>*/}
			</CardActions>
		);
	};
	const renderListFile = () => {
		if (data?.file || !_.isEmpty(data?.file)) {
			return (
				<Card style={{ marginLeft: 15, marginRight: 15 }}>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<a href={`${data?.file?.name}`}>{data?.file?.name}</a>
				</Card>
			);
		} else {
			return <div></div>;
		}
	};

	return (
		<>
			{renderTop()}
			<Card
				style={
					_.size(data) === 1
						? { border: '1px solid #90a4ae' }
						: { border: '1px solid #90a4ae', marginTop: 30 }
				}
			>
				{renderCardHeader()}
				{renderCardContent()}
				{renderListFile()}
				{renderActionButton()}
				{renderComment()}
			</Card>
			{status.visibleModal && renderModal()}
		</>
	);
}
export default IdeaDetailView;
