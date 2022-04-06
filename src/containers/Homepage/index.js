import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {
	IoArrowDownCircleOutline,
	IoArrowUpCircleOutline,
} from 'react-icons/io5';

import {
	Box,
	Button,
	CircularProgress,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthRequest, sleep } from '../../common/AppUse';
import { API_PATHS, ROLES } from '../../common/env';
import CommentIdea from '../../components/Idea/CommentIdea';
import ModalIdea from '../../components/Idea/ModalIdea';
import { UserContext } from '../../context/AppContext';
import { fakeData } from './FakeDate';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const ITEM_HEIGHT = 48;

const toastMessages = {
	WAIT: 'Please wait...',
	SUC_IDEA_ADDED: 'Create idea successful !!',
	SUC_IDEA_EDITED: 'Update idea successful !!',
	SUC_IDEA_DEL: 'Delete idea successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

function Homepage() {
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});
	const [data, setData] = useState(fakeData);
	const { state } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [expanded, setExpanded] = React.useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 5,
	});
	const [totalData, setTotalData] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		await AuthRequest.get(API_PATHS.SHARED.IDEA, {
			params: {
				page: pagination.page,
				page_size: pagination.pageSize,
			},
		})
			.then((res) => {
				if (res?.data?.successed) {
					setData({ ...data, ...res?.data?.result?.rows } ?? []);
					setPagination({
						page: res?.data?.result?.index,
					});
					setTotalData(res?.data?.result?.total);
				}
			})
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const actionButtonIdea = [
		<Button
			startIcon={<EditIcon />}
			style={{ backgroundColor: '#4caf50' }}
			variant={'contained'}>
			Update Idea
		</Button>,
		<Button
			startIcon={<DeleteIcon />}
			style={{ backgroundColor: '#ba000d' }}
			variant={'contained'}>
			Delete Idea
		</Button>,
	];

	const handleExpandClick = (id) => {
		let newExpanded = [...expanded];
		newExpanded[id] = !newExpanded[id];
		setExpanded(newExpanded);
	};

	const onCreate = (value) => {
		toast
			.promise(
				AuthRequest.post(API_PATHS.SHARED.IDEA, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_ADDED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then((res) => {
				navigate(`/submission/${res?.data?.result?.id}`);
			});
	};

	const onDelete = (id) => {
		toast
			.promise(
				AuthRequest.delete(`${API_PATHS.SHARED.IDEA}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_DEL,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				// loadDataAction();
				let newData = [...data];
				const indexData = _.findIndex(newData, (x) => x.id === id);
				newData.splice(indexData, 1);
				setData(newData);
				setPagination({
					...pagination,
					pageSize: pagination.pageSize - 1,
				});
				toast.success(toastMessages.SUC_IDEA_DEL);
			});
	};

	const onUpdate = (value) => {
		toast
			.promise(
				AuthRequest.put(
					`${API_PATHS.SHARED.IDEA}/${value?.id}`,
					value,
				).then(() => sleep(700)),
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
				let newData = [...data];
				const indexData = _.findIndex(
					newData,
					(x) => x.id === value.id,
				);
				newData[indexData] = res?.data?.result;
				setData(newData);
				toast.success(toastMessages.SUC_IDEA_EDITED);
			});
	};

	const onCloseModal = () => {
		setStatus({ ...status, visibleModal: false });
	};
	const onOpenModal = (action, id) => {
		setStatus({ ...status, visibleModal: true, action: action });
	};

	const renderTop = () => {
		return (
			<div
				style={{ width: '100%', textAlign: 'right', marginBottom: 15 }}>
				<Button
					size={'small'}
					variant='contained'
					endIcon={<AddIcon />}
					onClick={() => onOpenModal('create')}>
					Create Idea
				</Button>
			</div>
		);
	};
	const renderModal = () => {
		return (
			<ModalIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				onUpdate={onUpdate}
				onCreate={onCreate}
			/>
		);
	};

	const renderActionIdea = (id, createBy) => {
		if (
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
						<MenuItem
							key={option}
							selected={option === 'Pyxis'}
							onClick={() => {
								handleClose();
								index === 0
									? onOpenModal('update', id)
									: onDelete(id);
							}}>
							{option}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	};

	const renderCardHeader = (item) => {
		return (
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'gray' }} aria-label='recipe'>
						P
					</Avatar>
				}
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
			<CardContent sx={{ fontFamily: "'Poppins', sans-serif" }}>
				<div>
					<Typography variant='body2' color='text.secondary'>
						{/*{item?.content}*/}
						This impressive paella is a perfect party dish and a fun
						meal to cook together with your guests. Add 1 cup of
						frozen peas along with the mussels, if you like.
					</Typography>
				</div>
				<br></br>
				<div
					style={{
						display: 'flex',
						fontSize: '0.8em',
						padding: '0 5',
						marginTop: 5,
						color: '#888',
					}}>
					<span style={{ marginRight: 5 }}>in</span>
					<Tooltip title={'Detail submission'}>
						<a
							href='\'
							onClick={() => {
								navigate(
									`/submission/${
										item.submissionId ||
										'NDM3YzBiMzktMDBlNy00ZDk3LTgzMTctOTE3NzIwYzJkMzlh'
									}`,
								);
							}}
							style={{
								textDecoration: 'underline',
								textDecorationColor: '#1976d2',
								color: '#1976d2',
								cursor: 'pointer',
							}}>
							{/*{item?.submissionName}*/}Submission name
						</a>
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
							}}>
							{/*{item?.title}*/} Title Idea
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
				}}>
				<Button
					fullWidth
					aria-label='add to favorites'
					startIcon={<IoArrowUpCircleOutline />}
					color={'inherit'}
					size={'large'}>
					(0)
				</Button>
				<Button
					fullWidth
					aria-label='add to favorites'
					style={{ marginRight: 20, marginLeft: 20 }}
					startIcon={<IoArrowDownCircleOutline />}
					color={'inherit'}
					size={'large'}>
					(0)
				</Button>
				<ExpandMore
					expand={expanded[item.id]}
					onClick={() => handleExpandClick(item.id)}
					aria-expanded={expanded[item.id]}
					aria-label='show more'>
					<Tooltip title={'Show comment'}>
						<ExpandMoreIcon />
					</Tooltip>
				</ExpandMore>
			</CardActions>
		);
	};

	const renderListFile = (item) => {
		if (item?.file || !_.isEmpty(item?.file)) {
			return (
				<Card style={{ marginLeft: 15, marginRight: 15 }}>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<a href={`${item?.file?.name}`}>{item?.file?.name}</a>
				</Card>
			);
		} else {
			return <div></div>;
		}
	};

	const renderComment = (item) => {
		return (
			<Collapse in={expanded[item.id]} timeout='auto' unmountOnExit>
				<CommentIdea data={item} ideaId={item?.id} />
			</Collapse>
		);
	};

	const renderContentIdea = () => {
		const result = _.map(data, (item, index) => {
			return (
				<Card
					style={{
						borderRadius: '5px',
						boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
						padding: '5px',
						marginTop: 30,
					}}>
					{renderCardHeader(item)}
					{renderCardContent(item)}
					{renderListFile(item)}
					{renderActionButton(item)}
					{renderComment(item)}
				</Card>
			);
		});
		if (status.loading) {
			return (
				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			);
		}
		return result;
	};

	const onShowMore = () => {
		setPagination({ ...pagination, page: pagination?.page + 1 });
		loadData();
	};

	const renderFooter = () => {
		if (_.size(data) === totalData || _.size(data) > totalData) {
			return <div></div>;
		}
		return (
			<div style={{ marginTop: 15, textAlign: 'center' }}>
				<Button
					size={'small'}
					variant={'outlined'}
					onClick={() => {
						onShowMore();
					}}>
					More view
				</Button>
			</div>
		);
	};

	return (
		<>
			<>
				{renderTop()}
				{renderContentIdea()}
				{renderFooter()}
			</>
			{status.visibleModal && renderModal()}
		</>
	);
}
export default Homepage;
