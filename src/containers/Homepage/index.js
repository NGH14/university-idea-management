import './style.css';

import { Add } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, CircularProgress, Link, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dataDemo } from '../IdeaMangement/FakeData';

import { AuthRequest, sleep } from 'common/AppUse';
import { API_PATHS, URL_PATHS } from 'common/env';
import FloatingButton from 'components/Custom/FloatingButton';
import CommentIdea from 'components/Idea/CommentIdea';
import ModalIdea from 'components/Idea/ModalIdea';
import { UserContext } from 'context/AppContext';
import { DEV_CONFIGS } from 'common/env';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <Button {...other} />;
})(({ theme, expand }) => ({
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const toastMessages = {
	WAIT: 'Please wait...',
	SUC_IDEA_ADDED: 'Create idea successful !!',
	SUC_IDEA_EDITED: 'Update idea successful !!',
	SUC_IDEA_DEL: 'Delete idea successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

export default function Homepage() {
	const navigate = useNavigate();
	const { state } = useContext(UserContext);
	const [data, setData] = useState([]);
	const [postTotal, setPostTotal] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [expanded, setExpanded] = useState([]);

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	const [pagination, setPagination] = useState({
		pageSize: 5,
		page: 1,
	});

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			setData(dataDemo);
			return;
		}
		loadData();
	}, []);

	const loadData = async () => {
		await AuthRequest.get(API_PATHS.SHARED.IDEA + '/table/list', {
			params: { ...pagination },
		})
			.then((res) => {
				setData((oldData) => [...oldData, ...res?.data?.result?.rows]);
				setPostTotal(res?.data?.result?.total);
			})
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleExpandClick = (id) => {
		let newExpanded = [...expanded];
		newExpanded[id] = !newExpanded[id];
		setExpanded(newExpanded);
	};

	// TODO: At BE, return entity after created
	const apiRequests = {
		create: (value) =>
			toast.promise(
				AuthRequest.post(API_PATHS.SHARED.IDEA, value).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.ERR_SERVER_ERROR,
					success: {
						render({ data: res }) {
							return (
								<Link
									onClick={() =>
										navigate(
											`${URL_PATHS.IDEA}/${res?.data?.result?.id}`,
										)
									}
								>
									{data?.result?.title}
								</Link>
							);
						},
					},
				},
			),

		delete: (id) =>
			toast.promise(
				AuthRequest.delete(`${API_PATHS.SHARED.IDEA}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.ERR_SERVER_ERROR,
					success: {
						render() {
							const indexData = data.findIndex((_) => _.id === id);
							data.splice(indexData, 1);
							setData((oldData) => [...oldData, data]);
							loadData();
							return toastMessages.SUC_IDEA_DEL;
						},
					},
				},
			),

		update: (value) =>
			toast.promise(
				AuthRequest.put(`${API_PATHS.SHARED.IDEA}/${value?.id}`, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.ERR_SERVER_ERROR,
					success: {
						render({ data: res }) {
							setStatus({ ...status, visibleModal: false });
							const indexData = data.findIndex((x) => x.id === value.id);
							data[indexData] = res?.data?.result;
							setData((oldData) => [...oldData, data]);
							return toastMessages.SUC_IDEA_EDITED;
						},
					},
				},
			),
	};

	const renderTop = () => (
		<div style={{ marginInline: 'auto' }}>
			<div className='homepage_title'>
				<div className='homepage_heading'>
					<h2>Hi, {state.dataUser.full_name} </h2>
					<i
						style={{
							fontWeight: 600,
							fontSize: 14,
							color: '#999',
							opacity: '0.7',
						}}
					>
						Welcome to the UIM &#10084;&#65039;
					</i>
				</div>
			</div>
		</div>
	);

	const renderModal = () => {
		return (
			<ModalIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={() => setStatus({ ...status, visibleModal: false })}
				onUpdate={apiRequests.update}
				onCreate={apiRequests.create}
			/>
		);
	};

	const renderActionIdea = (id, createBy) => {
		// NOTE: What is this
		/* if (
			createBy !== state.dataUser.id &&
			state.dataUser.role !== ROLES.ADMIN &&
			state.dataUser.role !== ROLES.MANAGER
		) {
			return null;
		}
		return (
			<div>
				<IconButton
					style={{ fontSize: 10 }}
					aria-label='more'
					id='long-button'
					aria-controls={open ? 'long-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='true'
					onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id='long-menu'
					MenuListProps={{
						'aria-labelledby': 'long-button',
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						},
					}}>
					{actionButtonIdea.map((option, index) => (
						<ListItemButton
							key={option}
							selected={option === 'Pyxis'}
							onClick={() => {
								handleClose();
								index === 0
									? onOpenModal('update', id)
									: onDelete(id);
							}}>
							{option}
						</ListItemButton>
					))}
				</Menu>
			</div>
		); */
	};

	const renderCardHeader = (item) => {
		const hex = Math.floor(Math.random() * 0xffffff);
		const color = '#' + hex.toString(16);
		return (
			<CardHeader
				avatar={
					<Avatar
						style={{
							backgroundColor: color,
							filter: 'grayscale(80%)',
						}}
						aria-label='avatar'
					>
						P
					</Avatar>
				}
				className='idea_header'
				action={renderActionIdea(item?.id, item?.create_by)}
				title='People Private'
				subheader={
					item?.create_at
						? moment(item?.create_at).format('LLL')
						: 'September 14, 2016'
				}
			/>
		);
	};

	const renderCardContent = (item) => {
		return (
			<CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
				<div>
					<Typography variant='body2' color='text.secondary'>
						This impressive paella is a perfect party dish and a fun meal to
						cook together with your guests. Add 1 cup of frozen peas along
						with the mussels, if you like.
					</Typography>
				</div>

				<div
					style={{
						display: 'flex',
						fontSize: '0.8em',
						padding: '0 5',
						marginTop: 30,
						color: '#888',
					}}
				>
					<Tooltip title={'Detail submission'}>
						<Link
							onClick={() =>
								navigate(`${URL_PATHS.SUB}/${item.submissionId}`)
							}
							style={{
								textDecoration: 'underline',
								textDecorationColor: '#1976d2',
								color: '#1976d2',
								cursor: 'pointer',
							}}
						>
							{item?.submissionName}
						</Link>
					</Tooltip>
					<span style={{ marginInline: 5 }}>with title is</span>
					<Tooltip title={'Detail submission'}>
						<label
							onClick={() => {
								navigate(`/idea/${item.id}`);
							}}
							style={{
								textDecoration: 'underline',
								textDecorationColor: '#1976d2',
								color: '#1976d2',
								cursor: 'pointer',
							}}
						>
							{item?.title}
						</label>
					</Tooltip>
				</div>
			</CardContent>
		);
	};

	const renderActionButton = (item) => {
		return (
			<CardActions
				style={{
					margin: '5px 5px 2px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
					fontSize: 12,
				}}
			>
				<Button
					className='idea_action'
					fullWidth
					aria-label='up vote'
					startIcon={<IoMdArrowRoundUp />}
					color={'inherit'}
					size={'large'}
				>
					(0)
				</Button>
				<Button
					className='idea_action'
					fullWidth
					aria-label='down vote'
					style={{ marginRight: 20, marginLeft: 20 }}
					startIcon={<IoMdArrowRoundDown />}
					color={'inherit'}
					size={'large'}
				>
					(0)
				</Button>
				<ExpandMore
					className='idea_action'
					fullWidth
					expand={expanded[item.id]}
					onClick={() => handleExpandClick(item.id)}
					style={{ marginRight: 20, marginLeft: 20 }}
					aria-expanded={expanded[item.id]}
					color={'inherit'}
					size={'large'}
					startIcon={<BiCommentDetail />}
					aria-label='show more'
				></ExpandMore>
			</CardActions>
		);
	};

	const renderListFile = (item) =>
		item?.file && !item?.file?.isEmpty() ? (
			<Card style={{ marginLeft: 15, marginRight: 15 }}>
				<IconButton>
					<AttachFileIcon />
				</IconButton>
				<a href={`${item?.file?.name}`}>{item?.file?.name}</a>
			</Card>
		) : (
			<></>
		);

	const renderComment = (item) => (
		<Collapse in={expanded[item.id]} timeout='auto' unmountOnExit>
			<CommentIdea data={item} ideaId={item?.id} />
		</Collapse>
	);

	const renderContentIdea = () =>
		!status.loading ? (
			data?.map((item, index) => (
				<Card
					key={index}
					style={{
						borderRadius: '5px',
						boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
						padding: '5px',
						marginTop: 30,
						maxWidth: '70rem',
						marginInline: 'auto',
					}}
				>
					{renderCardHeader(item)}
					{renderCardContent(item)}
					{renderListFile(item)}
					{renderActionButton(item)}
					{renderComment(item)}
				</Card>
			))
		) : (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		);

	const onShowMore = () => {
		setPagination({ ...pagination, page: pagination?.page + 1 });
		loadData();
	};

	const renderFooter = () =>
		!(_.size(data) === postTotal || _.size(data) > postTotal) ? (
			<div style={{ marginTop: 15, textAlign: 'center' }}>
				<Button size='small' variant='outlined' onClick={() => onShowMore()}>
					More
				</Button>
			</div>
		) : (
			<></>
		);

	return (
		<div style={{ marginInline: '100px' }}>
			{renderTop()}
			{renderContentIdea()}
			{renderFooter()}

			<Tooltip arrow placement='left' title='Submit a new idea'>
				<FloatingButton
					onClick={() =>
						setStatus({ ...status, visibleModal: true, action: 'create' })
					}
					size='medium'
					color='primary'
					ariaLabel='submit new idea'
					icon={<Add />}
				/>
			</Tooltip>

			{status.visibleModal && renderModal()}
		</div>
	);
}
