/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TagIcon from '@mui/icons-material/Tag';
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
import { stringToSvg } from 'common/DiceBear';
import { API_PATHS, URL_PATHS } from 'common/env';
import FloatButton from 'components/Custom/FloatButton';
import CommentIdea from 'components/Idea/CommentIdea';
import ModalIdea from 'components/Idea/ModalIdea';
import { UserContext } from 'context/AppContext';
import _ from 'lodash';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Submission from './../Submission/index';

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
	const [showMore, setShowMore] = useState([]);
	const [postTotal, setPostTotal] = useState(0);
	const [comments, setComments] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => loadData(), []);

	const onShowMoreContent = (index) => {
		const newShowMore = [...showMore];
		newShowMore[index] = !newShowMore[index];
		setShowMore(newShowMore);
	};

	const loadData = async () =>
		await axioc
			.get(API_PATHS.SHARED.IDEA + '/table/list', {
				params: { ...pagination },
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => {
				const newData = [...data, ...res?.data?.result?.rows];
				let newComment = [];
				_.map(newData, (x) => {
					const id = x.id;
					newComment[id] = false;
				});

				setData((oldData) => [...oldData, ...res?.data?.result?.rows]);
				setPostTotal(res?.data?.result?.total);
			});
	// const handleClick = (event) => setAnchorEl(event.currentTarget);
	// const handleClose = () => setAnchorEl(null);

	const handleExpandClick = (index) => {
		let newExpanded = [...comments];
		newExpanded[index] = !newExpanded[index];
		setComments(newExpanded);
	};

	const requests = {
		create: (value) =>
			toast.promise(
				axioc
					.post(API_PATHS.SHARED.IDEA, value)
					.then(() => sleep(700))
					.then((res) => {
						setStatus({ ...status, visibleModal: false });
						toast.info(
							<RouterLink
								to={`${URL_PATHS.IDEA}/${res?.data?.result?.id}`}>
								Idea details:{' '}
								{() => {
									const title = res?.data?.result?.title;
									return title?.length > 50
										? title?.substr(0, 49) + '...'
										: title;
								}}
							</RouterLink>,
						);
					}),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.UNEXPECTED,
				},
			),
		update: (value) =>
			toast.promise(
				axioc
					.put(`${API_PATHS.SHARED.IDEA}/${value?.id}`, value)
					.then(() => sleep(700))
					.then((res) => {
						setStatus({ ...status, visibleModal: false });
						const indexData = data.findIndex(
							(x) => x.id === value.id,
						);
						data[indexData] = res?.data?.result;
						setData((oldData) => [...oldData, data]);

						toast.info(
							<RouterLink
								to={`${URL_PATHS.IDEA}/${res?.data?.result?.id}`}>
								Idea details:{' '}
								{() => {
									const title = res?.data?.result?.title;
									return title?.length > 50
										? title?.substr(0, 49) + '...'
										: title;
								}}
							</RouterLink>,
						);
					}),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.UNEXPECTED,
				},
			),
		delete: (id) =>
			toast.promise(
				axioc
					.delete(`${API_PATHS.SHARED.IDEA}/${id}`)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.UNEXPECTED,
					success: {
						render() {
							const indexData = data.findIndex(
								(_) => _.id === id,
							);
							data.splice(indexData, 1);
							setData((oldData) => [...oldData, data]);
							loadData();
							return toastMessages.succs.deleted('idea');
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

	const renderCardHeader = (item) => (
		<CardHeader
			className='idea_header'
			action={renderActionIdea(item?.id, item?.create_by)}
			title={item?.user?.full_name}
			avatar={
				<Avatar aria-label='avatar'>
					{item?.is_anonymous || item?.user?.avatar
						? stringToSvg(item?.user?.avatar)
						: 'R'}
				</Avatar>
			}
			subheader={
				item?.created_date ? (
					<>
						{moment(item?.created_date).fromNow()}&nbsp;
						<Tippy content={'Detail submission'}>
							<label
								style={{
									textDecoration: 'none',
									color: 'initial',
									cursor: 'pointer',
								}}>
								<RouterLink
									to={`/idea/${item.id}`}
									style={{
										textDecoration: 'none',
										cursor: 'pointer',
										color: 'initial',
									}}>
									<span
										style={{
											textDecoration: 'none',
											color: 'initial',
											fontSize: '12px',
										}}>
										in&nbsp;{item?.submission?.title}
										&nbsp;submission
									</span>
								</RouterLink>
							</label>
						</Tippy>
					</>
				) : (
					'September 14, 2016'
				)
			}></CardHeader>
	);

	const renderIdeaTags = (item) => (
		<Stack
			direction='row'
			spacing={1}
			sx={{
				margin: '0px 15px',
				opacity: '0.8',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
				gap: 1,
			}}>
			{item?.tags?.map((tag, index) => (
				<Chip
					sx={{
						fontSize: '0.8em',
						color: '#333',
					}}
					key={item.title + tag.name + index}
					icon={<TagIcon />}
					label={tag}
					size='small'
					variant='outlined'
				/>
			))}
		</Stack>
	);

	const renderCardContent = (item, index) => {
		return (
			<CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
				<Tippy content={'Detail submission'}>
					<RouterLink
						to={`${URL_PATHS.IDEA}/${item.id}`}
						style={{
							textDecoration: 'none',
							color: 'rgba(0, 1, 17, 0.8)',
							fontSize: '1.2rem',
							lineHeight: '44px',
							fontWeight: '600',
							cursor: 'pointer',
						}}>
						{item?.title}
					</RouterLink>
				</Tippy>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}>
					<div className={showMore[index] || 'maxWidth300'}>
						<Typography
							variant='body2'
							color='text.secondary'
							className={showMore[index] || 'multiLineEllipsis'}>
							{item?.content}
						</Typography>
					</div>
					<Button
						variant='text'
						onClick={() => onShowMoreContent(index)}
						disableFocusRipple
						disableTouchRipple
						sx={{
							textTransform: 'capitalize',
							fontSize: '0.80em',
							color: '#888',
							'&:hover': {
								backgroundColor: '#fff',
								color: '#333',
							},
						}}>
						{showMore[index] ? 'Show less' : 'Show more'}
					</Button>
				</div>
			</CardContent>
		);
	};

	const renderActionButton = (item, index) => {
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
					expand={comments[index]}
					onClick={() => handleExpandClick(index)}
					style={{ marginRight: 20, marginLeft: 20 }}
					aria-expanded={comments[item.id]}
					color={'inherit'}
					size={'large'}
					startIcon={<BiCommentDetail />}
					aria-label='show more'>
					{item.comments_count}
				</ExpandMore>
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

	const renderComment = (item, index) => (
		<Collapse in={comments[index]} timeout='auto' unmountOnExit>
			<CommentIdea data={item} ideaId={item?.id} />
		</Collapse>
	);

	const renderContentIdea = () =>
		!status.loading ? (
			data.map((item, index) => (
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
					{renderCardContent(item, index)}
					{renderIdeaTags(item)}
					{renderListFile(item)}
					{renderActionButton(item, index)}
					{renderComment(item, index)}
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

			<FloatButton
				onClick={() =>
					setStatus({
						...status,
						visibleModal: true,
						action: 'create',
					})
				}
				tippy={{ placement: 'left' }}
				size='medium'
				color='primary'
				ariaLabel='submit new idea'
				icon={<Add />}
			/>

			{status.visibleModal && renderModal()}
		</div>
	);
}
