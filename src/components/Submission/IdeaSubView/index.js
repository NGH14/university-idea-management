import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
	Box,
	Button,
	CircularProgress,
	Menu,
	MenuItem,
	Pagination,
	Tooltip,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthRequest, sleep } from '../../../common/AppUse';
import { API_PATHS, DEV_CONFIGS, URL_PATHS } from '../../../common/env';
import CommentIdea from '../../Idea/CommentIdea';
import ModalIdea from '../../Idea/ModalIdea';
import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import CustomNoRowsOverlay from '../../Custom/CustomNoRowsOverlay';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { dataDemo } from '../../../containers/SubmissionManagement/FakeData';
import { Column } from '../../../containers/SubmissionManagement/model/Column';
import { GoInfo } from 'react-icons/go';
import { Columns } from '../../../containers/IdeaMangement/model/Columns';

const toastMessages = {
	WAIT: 'Please wait...',
	WAIT_IDEA: 'Creating idea...',
	SUC_IDEA_ADDED: 'Create idea successful !!',
	SUC_IDEA_EDITED: 'Update idea successful !!',
	SUC_IDEA_DEL: 'Delete idea successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

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
const CustomToolbarSubmission = () => {
	return (
		<GridToolbarContainer sx={{ fontWeight: 700 }}>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
			<GridToolbarExport printOptions={{ disableToolbarButton: true }} />
		</GridToolbarContainer>
	);
};

const ITEM_HEIGHT = 48;

function IdeaSubView({ ideaData, subData }) {
	const [tableToolBar, setTableToolBar] = useState(false);
	const navigate = useNavigate();
	const [ideaList, setIdealist] = useState(ideaData);
	const [rowId, setRowId] = useState(null);

	const [pagination, setPagination] = useState({
		pageSize: 5,
		page: 0,
	});

	const columns = [
		...Columns,
		{
			field: 'actions',
			headerName: 'Action',
			width: 75,
			type: 'actions',
			disableColumnMenu: true,
			sortable: false,
			getActions: (params) => [
				<GridActionsCellItem
					icon={<GoInfo color='#3f66da' style={{ fontSize: '20px' }} />}
					label='Detail'
					onClick={() => navigate(`${URL_PATHS.MANAGE_SUB}/${params.id}`)}
					showInMenu
				/>,

				<GridActionsCellItem
					icon={<BiPencil style={{ fontSize: '20px' }} />}
					label='Update'
					onClick={() => onOpenModal(params.id, 'update')}
					showInMenu
				/>,

				<GridActionsCellItem
					icon={
						<MdOutlineDeleteOutline
							color='red'
							style={{ fontSize: '20px' }}
						/>
					}
					label='Delete'
					onClick={() => onDelete(params.id)}
					showInMenu
				/>,
			],
		},
	];

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	const [ideaId, setIdeaId] = useState(null);

	useEffect(() => {
		console.log(subData);
		loadDataIdea();
	}, [pagination]);

	const loadDataIdea = async () => {
		setStatus({ ...status, loading: true });

		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_IDEA + '/table/list', {
			params: {
				page: pagination.page + 1,
				page_size: pagination.pageSize,
				submission_id: subData.id,
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
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_IDEA}/${id}`).then(() =>
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
	const onCloseModal = () => {
		if (rowId) {
			setRowId(null);
		}

		setStatus({
			...status,
			visibleModal: false,
		});
	};
	const onChangePagination = (pageSize, page) => {
		setPagination({ page, pageSize });
	};
	const handleOnClickToolBar = () => setTableToolBar((pre) => !pre);
	const renderContent = () => {
		return (
			<div className='managementsubmission_table'>
				<DataGridPro
					components={{
						NoRowsOverlay: CustomNoRowsOverlay,
						ColumnSortedDescendingIcon: () => (
							<ExpandMoreIcon className='icon' />
						),
						ColumnSortedAscendingIcon: () => (
							<ExpandLessIcon className='icon' />
						),
						Toolbar: tableToolBar && CustomToolbarSubmission,
					}}
					rows={ideaList}
					columns={columns}
					pagination={true}
					cell--textCenter
					pageSize={pagination.pageSize}
					page={pagination.page}
					initialState={{ pinnedColumns: { right: ['actions'] } }}
					onPageSizeChange={(pageSize) =>
						onChangePagination(pageSize, pagination.page)
					}
					onPageChange={(page) => onChangePagination(pagination.pageSize, page)}
					style={{ minHeight: '600px' }}
					rowsPerPageOptions={[5, 10, 25, 50]}
				/>
			</div>
		);
	};
	return (
		<>
			{renderTop()}
			{renderContent()}
			{/*{renderFooter()}*/}
			{status.visibleModal && renderModal()}
		</>
	);
}
export default IdeaSubView;
