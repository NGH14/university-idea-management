import './style.css';

import { Add } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Collapse,
	IconButton,
	styled,
	Typography,
} from '@mui/material';
import Tippy from '@tippyjs/react';
import { axioc, sleep, toastMessages } from 'common';
import { API_PATHS, URL_PATHS } from 'common/env';
import FloatButton from 'components/Custom/FloatButton';
import CommentIdea from 'components/Idea/CommentIdea';
import ModalIdea from 'components/Idea/ModalIdea';
import { UserContext } from 'context/AppContext';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { stringToSvg } from 'common/DiceBear';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <Button {...other} />;
})(({ theme }) => ({
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function Homepage() {
	const [data, setData] = useState([]);
	const { state } = useContext(UserContext);

	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const [postTotal, setPostTotal] = useState(0);
	const [expanded, setExpanded] = useState([]);
	const [, setAnchorEl] = useState(null);
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => loadData(), []);

	const loadData = async () =>
		await axioc
			.get(API_PATHS.SHARED.IDEA + '/table/list', {
				params: { ...pagination },
			})
			.then((res) => {
				setData((oldData) => [...oldData, ...res?.data?.result?.rows]);
				setPostTotal(res?.data?.result?.total);
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED));

	// const handleClick = (event) => setAnchorEl(event.currentTarget);
	// const handleClose = () => setAnchorEl(null);

	const handleExpandClick = (id) => {
		let newExpanded = [...expanded];
		newExpanded[id] = !newExpanded[id];
		setExpanded(newExpanded);
	};

	// TODO: @Henry, return entity after created
	const requests = {
		create: (value) =>
			toast.promise(
				axioc.post(API_PATHS.SHARED.IDEA, value).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.UNEXPECTED,
					success: {
						render({ data: res }) {
							return (
								<Link
									to={`${URL_PATHS.IDEA}/${res?.data?.result?.id}`}>
									{data?.result?.title}
								</Link>
							);
						},
					},
				},
			),
		update: (value) =>
			toast.promise(
				axioc
					.put(`${API_PATHS.SHARED.IDEA}/${value?.id}`, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.ERR_SERVER_ERROR,
					success: {
						render({ data: res }) {
							setStatus({ ...status, visibleModal: false });
							const indexData = data.findIndex(
								(x) => x.id === value.id,
							);
							data[indexData] = res?.data?.result;
							setData((oldData) => [...oldData, data]);
							return toastMessages.SUC_IDEA_EDITED;
						},
					},
				},
			),
		delete: (id) =>
			toast.promise(
				axioc
					.delete(`${API_PATHS.SHARED.IDEA}/${id}`)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.ERR_SERVER_ERROR,
					success: {
						render() {
							const indexData = data.findIndex(
								(_) => _.id === id,
							);
							data.splice(indexData, 1);
							setData((oldData) => [...oldData, data]);
							loadData();
							return toastMessages.SUC_IDEA_DEL;
						},
					},
				},
			),
	};

	const renderTop = () => (
		<div className='homepage_title'>
			<div className='homepage_heading'>
				<h2>Hi, {state.dataUser.full_name} </h2>
				<i
					style={{
						fontWeight: 600,
						fontSize: '0.5em',
						color: '#999',
						opacity: '0.7',
					}}>
					Welcome to the UIM &#10084;&#65039;
				</i>
			</div>
		</div>
	);

	const renderModal = () => {
		return (
			<ModalIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={() => setStatus({ ...status, visibleModal: false })}
				onUpdate={requests.update}
				onCreate={requests.create}
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
		return (
			<CardHeader
				avatar={
					<Avatar aria-label='avatar'>
						{item?.user?.avatar
							? stringToSvg(item?.user?.avatar)
							: 'R'}
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
						This impressive paella is a perfect party dish and a fun
						meal to cook together with your guests. Add 1 cup of
						frozen peas along with the mussels, if you like.
					</Typography>
				</div>

				<div
					style={{
						display: 'flex',
						fontSize: '0.8em',
						padding: '0 5',
						marginTop: 30,
						color: '#888',
					}}>
					<Tippy content={'Detail submission'}>
						<Link
							to={`${URL_PATHS.SUB}/${item.submissionId}`}
							style={{
								textDecoration: 'underline',
								textDecorationColor: '#1976d2',
								color: '#1976d2',
								cursor: 'pointer',
							}}>
							{item?.submissionName}
						</Link>
					</Tippy>
					<span style={{ marginInline: 5 }}>with title is</span>
					<Tippy content={'Detail submission'}>
						<label
							style={{
								textDecoration: 'underline',
								textDecorationColor: '#1976d2',
								color: '#1976d2',
								cursor: 'pointer',
							}}>
							<Link to={`/idea/${item.id}`}>{item?.title}</Link>
						</label>
					</Tippy>
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
					className='idea_action'
					fullWidth
					aria-label='up vote'
					startIcon={<IoMdArrowRoundUp />}
					color={'inherit'}
					size={'large'}>
					(0)
				</Button>
				<Button
					className='idea_action'
					fullWidth
					aria-label='down vote'
					style={{ marginRight: 20, marginLeft: 20 }}
					startIcon={<IoMdArrowRoundDown />}
					color={'inherit'}
					size={'large'}>
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
					aria-label='show more'></ExpandMore>
			</CardActions>
		);
	};

	const renderListFile = (item) =>
		item?.file && !item?.file?.length === 0 ? (
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
					}}>
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
				<Button
					size='small'
					variant='outlined'
					onClick={() => onShowMore()}>
					More
				</Button>
			</div>
		) : (
			<></>
		);

	return (
		<div className='homepage_wrapper'>
			{renderTop()}
			{renderContentIdea()}
			{renderFooter()}

			<Tippy placement='left' content='Submit a new idea'>
				<FloatButton
					onClick={() =>
						setStatus({
							...status,
							visibleModal: true,
							action: 'create',
						})
					}
					size='medium'
					color='primary'
					ariaLabel='submit new idea'
					icon={<Add />}
				/>
			</Tippy>

			{status.visibleModal && renderModal()}
		</div>
	);
}
