import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Button, CircularProgress, Menu, MenuItem, Pagination, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthRequest, sleep } from "../../../common/AppUse";
import { API_PATHS } from "../../../common/env";
import CommentIdea from "../../Idea/CommentIdea";
import ModalIdea from "../../Idea/ModalIdea";

const toastMessages = {
	WAIT: 'Please wait...',
	WAIT_IDEA: 'Creating idea...',
	SUC_IDEA_ADDED: 'Create idea successful !!',
	SUC_IDEA_EDITED: 'Update idea successful !!',
	SUC_IDEA_DEL: 'Delete idea successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

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

const Item = styled(Paper)(({ theme }) => ({
	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	border: 'none',
	...theme.typography.body2,
	padding: theme.spacing(1),
	// textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const fakeData = [
	{
		name: '000',
		id: 1,
		comment: [
			{
				id: 1,
				user: { name: 'Data Fake 01 _01' },
				content: 'Data fake demo 01',
				modified_date: '2022-03-15T13:45:30',
			},
			{
				id: 1,
				user: { name: 'Data Fake 01 _01' },
				content: 'Data fake demo 01',
				modified_date: '2022-03-15T13:45:30',
			},
			{
				id: 2,
				user: { name: 'Data Fake 01 _01' },
				content: 'Data fake demo 01',
				modified_date: '2022-03-15T13:45:30',
			},
			{
				id: 2,
				user: { name: 'Data Fake 01 _01' },
				content: 'Data fake demo 01',
				modified_date: '2022-03-15T13:45:30',
			},
		],
	},
	{
		name: '000',
		id: 2,
		comment: [
			{
				id: 1,
				user: { name: 'Data Fake 01 _02' },
				content: 'Data fake demo 02',
				modified_date: '2022-03-15T13:45:30',
			},
			{
				id: 1,
				user: { name: 'Data Fake 01 _02' },
				content: 'Data fake demo 02',
				modified_date: '2022-03-15T13:45:30',
			},
			{
				id: 2,
				user: { name: 'Data Fake 01 _02' },
				content: 'Data fake demo 02',
				modified_date: '2022-03-15T13:45:30',
			},
			{
				id: 2,
				user: { name: 'Data Fake 01 _02' },
				content: 'Data fake demo 02',
				modified_date: '2022-03-15T13:45:30',
			},
		],
	},
];

const ITEM_HEIGHT = 48;

function IdeaSubView({ ideaData, subData }) {
	const navigate = useNavigate();
	const [ideaList, setIdealist] = useState(ideaData);
	const [rowId, setRowId] = useState(null);

	const [pagination, setPagination] = useState({
		pageSize: 5,
		page: 0,
	});

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	const [ideaId, setIdeaId] = useState(null);
	const [expanded, setExpanded] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	useEffect(() => {
		if (pagination?.page) {
			loadDataIdea();
		}
	}, [pagination]);

	useEffect(() => {
		if (fakeData && !_.isEmpty(fakeData)) {
			let newExpanded = [];
			_.map(fakeData, (x) => {
				const id = x.id;
				newExpanded[id] = false;
			});
			setExpanded(newExpanded);
		}
	}, []);

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleExpandClick = (id) => {
		let newExpanded = [...expanded];
		newExpanded[id] = !newExpanded[id];
		setExpanded(newExpanded);
	};

	const loadDataIdea = async () => {
		setStatus({ ...status, loading: true });

		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_IDEA + '/table/list', {
			params: {
				page: pagination.page + 1,
				page_size: pagination.pageSize,
			},
		})
			.then((res) => {
				setStatus({ ...status, loading: false });
				setIdealist(res?.data?.result?.rows ?? []);
				setRowId(null);
			})
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	//#region action button API IDEA
	const onDelete = (id) => {
		toast
			.promise(
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_DEL,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				loadDataIdea();
			});
	};

	const onUpdate = (value) => {
		toast
			.promise(
				AuthRequest.put(
					`${API_PATHS.ADMIN.MANAGE_USER}/${value?.id}`,
					value,
				).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_EDITED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				if (value?.exitFile && value?.file && !_.isEmpty(value?.file)) {
					// TODO: delete drive file API
				}
				setStatus({ ...status, visibleModal: false });
				loadDataIdea();
			});
	};

	const onCreate = (value) => {
		// console.log(123, value);
		toast
			.promise(
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_IDEA, { ...value }).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT_IDEA,
					success: toastMessages.SUC_IDEA_ADDED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadDataIdea();
			});
	};
	//#endregion

	const renderCardHeader = (item) => {
		return (
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'gray' }} aria-label='recipe'>
						P
					</Avatar>
				}
				action={renderActionIdea(item.id)}
				title='People Private'
				subheader={
					item?.createTime
						? moment(item?.createTime).format('LLL')
						: 'September 14, 2016'
				}
			/>
		);
	};

	const actionButtonIdea = [
		<Button
			startIcon={<BiPencil style={{ fontSize: '20px' }} />}
			style={{ backgroundColor: '#4caf50' }}
			variant={'contained'}
		>
			Update Idea
		</Button>,
		<Button
			startIcon={
				<MdOutlineDeleteOutline style={{ fontSize: '20px' }} color='red' />
			}
			style={{ backgroundColor: '#ba000d' }}
			variant={'contained'}
		>
			Delete Idea
		</Button>,
	];
	const renderActionIdea = (id) => {
		return (
			<div>
				<IconButton
					aria-label='more'
					id='long-button'
					aria-controls={open ? 'long-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='true'
					onClick={handleClick}
				>
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
					}}
				>
					{actionButtonIdea.map((option, index) => (
						<MenuItem
							key={option}
							selected={option === 'Pyxis'}
							onClick={() => {
								handleClose();
								index === 0 ? onOpenModal('update', id) : onDelete(id);
							}}
						>
							{option}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	};
	const renderCardContent = (item) => {
		return (
			<CardContent>
				<div style={{ display: 'flex' }}>
					<h3 style={{ marginRight: 10, fontWeight: 'bold' }}>
						{/*{item?.title}*/} Title:{' '}
					</h3>
					<Tooltip title={'Detail submission'}>
						<label
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
							}}
						>
							{/*{data?.submissionName}*/}Submission name
						</label>
					</Tooltip>
				</div>
				<br></br>
				<div>
					<h3 style={{ fontWeight: 'bold' }}>Content</h3>
					<Typography variant='body2' color='text.secondary'>
						{/*{item?.content}*/}
						This impressive paella is a perfect party dish and a fun meal to
						cook together with your guests. Add 1 cup of frozen peas along
						with the mussels, if you like.
					</Typography>
				</div>
			</CardContent>
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
				<ExpandMore
					expand={expanded[item.id]}
					onClick={() => handleExpandClick(item.id)}
					aria-expanded={expanded[item.id]}
					aria-label='show more'
				>
					<Tooltip title={'Show comment'}>
						<ExpandMoreIcon />
					</Tooltip>
				</ExpandMore>
			</CardActions>
		);
	};

	const renderComment = (item) => {
		return (
			<Collapse in={expanded[item.id]} timeout='auto' unmountOnExit>
				<CommentIdea data={item} ideaId={item.id} />
			</Collapse>
		);
	};
	const renderListFile = (item) => {
		if (item?.file || !_.isEmpty(item?.file)) {
			return (
				<Card style={{ marginLeft: 15, marginRight: 15 }}>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<a href='#/'>demo.doc</a>
				</Card>
			);
		} else {
			return <div></div>;
		}
	};
	const onCloseModal = () => {
		setStatus({ ...status, visibleModal: false });
	};
	const onOpenModal = (action, id) => {
		id && setIdeaId(id);
		setStatus({ ...status, visibleModal: true, action: action });
	};
	const renderModal = () => {
		return (
			<ModalIdea
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				idIdea={ideaId}
				submission={subData}
				onUpdate={onUpdate}
				onCreate={onCreate}
			/>
		);
	};
	const renderTop = () => {
		return (
			<div style={{ width: '100%', textAlign: 'right', marginBottom: 15 }}>
				<Button
					size={'small'}
					variant='contained'
					endIcon={<AddIcon />}
					onClick={() => onOpenModal('create')}
				>
					Create Idea
				</Button>
			</div>
		);
	};
	const onChangePage = async (page) => {
		setPagination({ ...pagination, page });
	};
	const renderContent = () => {
		const result = _.map(fakeData, (item, index) => {
			return (
				<Card
					style={
						index === 0
							? { border: '1px solid #90a4ae' }
							: { border: '1px solid #90a4ae', marginTop: 30 }
					}
				>
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
	const renderFooter = () => {
		return (
			<div style={{ marginTop: 15, float: 'right' }}>
				<Pagination
					count={10}
					onChange={(value) =>
						onChangePage(_.toNumber(_.get(value.target, 'innerText')))
					}
					// rowsPerPage={(value)=>console.log(value, 1)}
					// onRowsPerPageChange={(value)=>console.log(value, 2)}
				/>
			</div>
		);
	};
	return (
		<>
			{renderTop()}
			{renderContent()}
			{renderFooter()}
			{status.visibleModal && renderModal()}
		</>
	);
}
export default IdeaSubView;
