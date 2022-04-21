/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { Add } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
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
	Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tippy from '@tippyjs/react';
import { axioc, sleep, toastMessages } from 'common';
import { stringToSvg } from 'common/DiceBear';
import { API_PATHS, URL_PATHS } from 'common/env';
import FloatButton from 'components/Custom/FloatButton';
import CommentIdea from 'components/Idea/CommentIdea';
import ModalIdea from 'components/Idea/ModalIdea';
import { UimImage } from 'components/Uim';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function IdeaDetailView() {
	const navigate = useNavigate();
	const [data, setData] = useState();
	const [comments] = useState([]);
	const { id } = useParams();

	const [reload, setReload] = useState(false);

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => {
		view();
		loadData();
	}, []);

	const view = async () => {
		console.log('hello');
		await axioc.post(`${API_PATHS.SHARED.VIEW}/${id}`).catch(() => {});
	};

	const loadData = async () => {
		setStatus({ ...data, loading: true });
		await axioc
			.get(`${API_PATHS.SHARED.IDEA}/${id}`)
			.then((res) => {
				setStatus({ ...data, loading: false });
				setData(res?.data?.result);
			})
			.catch(() => {
				setStatus({ ...data, loading: false });
				toast.error(toastMessages.errs.UNEXPECTED);
			});
	};

	const handleOnLikeness = async (isLike) => {
		if (data?.requester_is_like == null)
			await axioc
				.post(`${API_PATHS.SHARED.LIKE}/${data?.id}`, {
					is_like: isLike,
				})
				.then((res) => {
					const newData = data;
					newData.requester_is_like = isLike;
					newData.likes = res?.data?.result?.likes;
					newData.dislikes = res?.data?.result?.dislikes;
					setData(newData);
					setReload(!reload);
				})
				.catch(() => {});

		if (data?.requester_is_like !== isLike)
			await axioc
				.put(`${API_PATHS.SHARED.LIKE}/${data?.id}`, {
					is_like: isLike,
				})
				.then(async (res) => {
					const newData = data;
					newData.requester_is_like = isLike;
					newData.likes = res?.data?.result?.likes;
					newData.dislikes = res?.data?.result?.dislikes;
					setData(newData);
					setReload(!reload);
				})
				.catch(() => {});
	};

	const requests = {
		update: (value) =>
			toast.promise(
				axioc
					.put(`${API_PATHS.SHARED.IDEA}/${value?.id}`, value)
					.then(() => sleep(700))
					.then((res) => {
						setStatus({ ...status, visibleModal: false });
						const indexData = data?.findIndex((x) => x?.id === value?.id);
						data[indexData] = res?.data?.result;
						setData((oldData) => [...oldData, data]);

						toast.info(
							<RouterLink to={`${URL_PATHS.IDEA}/${res?.data?.result?.id}`}>
								Idea details:' '
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
				axioc.delete(`${API_PATHS.SHARED.IDEA}/${id}`).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.UNEXPECTED,
					success: {
						render() {
							const indexData = data?.findIndex((_) => _?.id === id);
							data?.splice(indexData, 1);
							setData((oldData) => [...oldData, data]);
							loadData();
							return toastMessages.succs.deleted('idea');
						},
					},
				},
			),
	};

	const renderModal = () => (
		<ModalIdea
			visible={status.visibleModal}
			action={status.action}
			onClose={() => setStatus({ ...status, visibleModal: false })}
			onUpdate={requests.update}
			onCreate={requests.create}
		/>
	);

	const renderCardHeader = () => (
		<CardHeader
			className='idea_header'
			title={
				data?.user?.full_name && !data?.is_anonymous
					? data?.user?.full_name
					: '[anonymous]'
			}
			avatar={
				<Avatar aria-label='avatar'>
					{data?.user?.avatar && !data?.is_anonymous
						? stringToSvg(data?.user?.avatar)
						: 'A'}
				</Avatar>
			}
			subheader={
				data?.created_date ? (
					<>
						{moment(data?.created_date).fromNow()}&nbsp;
						<Tippy content='Detail submission'>
							<label
								style={{
									textDecoration: 'none',
									color: 'initial',
									cursor: 'pointer',
								}}
							>
								<RouterLink
									to={`${URL_PATHS.SUB}/${data?.submission?.id}`}
									style={{
										textDecoration: 'none',
										cursor: 'pointer',
										color: 'initial',
									}}
								>
									<span
										style={{
											textDecoration: 'none',
											color: 'rgba(0, 0, 0, 0.6)',
											fontSize: '12px',
										}}
									>
										in&nbsp;{data?.submission?.title}
									</span>
								</RouterLink>
							</label>
						</Tippy>
					</>
				) : (
					'September 14, 2016'
				)
			}
		></CardHeader>
	);

	const renderIdeaTags = () => (
		<Stack
			direction='row'
			spacing={1}
			sx={{
				margin: '10px 15px',
				opacity: '0.8',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
				gap: 1,
			}}
		>
			{data?.tags?.map((tag, index) => (
				<Chip
					sx={{
						fontSize: '0.8em',
						color: '#333',
					}}
					key={data?.title + tag.name + index}
					icon={<TagIcon />}
					label={tag}
					size='small'
					variant='outlined'
				/>
			))}
		</Stack>
	);

	const renderCardContent = () => {
		return (
			<CardContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
				<span
					style={{
						textDecoration: 'none',
						color: 'rgba(0, 1, 17, 0.8)',
						fontSize: '1.2rem',
						lineHeight: '44px',
						fontWeight: '600',
					}}
				>
					{data?.title}
				</span>

				<Typography
					variant='body2'
					color='text.secondary '
					style={{ whiteSpace: 'pre-line' }}
				>
					{data?.content}
				</Typography>
			</CardContent>
		);
	};

	const ActionButton = () => {
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
					onClick={() =>
						handleOnLikeness(data?.requester_is_like === true ? null : true)
					}
					startIcon={
						<IoMdArrowRoundUp
							style={{
								color: data?.requester_is_like === true ? '#626ef0' : '',
							}}
						/>
					}
					color='inherit'
					size='large'
				>
					{`${data?.likes}`}
				</Button>
				<Button
					fullWidth
					size='large'
					color='inherit'
					className='idea_action'
					aria-label='down vote'
					style={{ marginRight: 20, marginLeft: 20 }}
					onClick={() =>
						handleOnLikeness(data?.requester_is_like === false ? null : false)
					}
					startIcon={
						<IoMdArrowRoundDown
							style={{
								color: data?.requester_is_like === false ? '#626ef0' : '',
							}}
						/>
					}
				>
					{`${data?.dislikes}`}
				</Button>
			</CardActions>
		);
	};

	const renderAttachImg = () => {
		return (
			<div
				className='gridimg-collection_attach'
				style={{
					gridTemplateColumns: `repeat(${
						data?.attachments?.length >= 3 ? 2 : 1
					}, 1fr)`,
				}}
			>
				{data?.attachments?.map((_) => {
					const fileEx = _.name.split('.');
					const exs = ['jpg', 'png', 'gif'];

					if (!exs.includes(fileEx[fileEx?.length - 1])) return <></>;
					return (
						<UimImage
							alt={_.name}
							src={`https://drive.google.com//uc?export=view&id=${_.file_id}`}
							className='idea-attachment_img'
						/>
					);
				})}
			</div>
		);
	};

	const renderViewIdea = () => (
		<div className='view-idea'>
			<span className='view-idea_count'>
				{data?.views} {data?.views > 1 ? 'views' : 'view'}
			</span>
		</div>
	);

	const ContentIdea = () =>
		!status.loading ? (
			<Card
				style={{
					borderRadius: '5px',
					boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
					padding: '5px',
					marginTop: 30,
					maxWidth: '70rem',
					marginInline: 'auto',
				}}
			>
				{renderCardHeader()}
				{renderCardContent()}

				{data?.attachments && data?.attachments?.length !== 0 ? (
					data?.attachments?.map((file) => (
						<Card sx={{ fontSize: '0.75em' }} elevation={0}>
							<IconButton>
								<AttachFileIcon />
							</IconButton>
							<a href={`${file?.url}`}>{file?.name}</a>
						</Card>
					))
				) : (
					<></>
				)}

				{renderIdeaTags()}
				{renderAttachImg()}
				{renderViewIdea()}

				<ActionButton />

				<Collapse in={comments}>
					<CommentIdea idea={data} />
				</Collapse>
			</Card>
		) : (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		);

	if (status.loading || !data)
		return (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		);

	return (
		<div className='homepage_wrapper'>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button
					variant='text'
					style={{ marginRight: 15 }}
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
			</div>

			<ContentIdea />

			{status.visibleModal && renderModal()}
		</div>
	);
}
