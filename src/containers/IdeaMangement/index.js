import './style.css';

import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import { AuthRequest, sleep } from '../../common/AppUse';
import { API_PATHS, URL_PATHS } from '../../common/env';
import CustomNoRowsOverlay from '../../components/Custom/CustomNoRowsOverlay';
import ModalIdea from '../../components/Idea/ModalIdea';
import { Columns } from './model/Columns';
import { useNavigate } from 'react-router-dom';

const toastMessages = {
	WAIT: 'Please wait...',
	SUC_IDEA_ADDED: 'Create comment successful !!',
	SUC_IDEA_EDITED: 'Update comment successful !!',
	SUC_IDEA_DEL: 'Delete comment successful !!',
	SUC_COMMENT_ADDED: 'Create comment successful !!',
	SUC_COMMENT_EDITED: 'Update comment successful !!',
	SUC_COMMENT_DEL: 'Delete comment successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

function IdeaManagement() {
	const navigate = useNavigate();
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});
	const [tableToolBar, setTableToolBar] = useState(false);

	const [pagination, setPagination] = useState({
		pageSize: 5,
		page: 0,
	});

	const [data, setData] = useState([]);

	useEffect(() => {
		loadData();
	}, [pagination]);

	const handleOnClickToolBar = () => setTableToolBar((pre) => !pre);

	const loadData = async () => {
		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_IDEA + '/table/list', {
			params: {
				page: pagination.page + 1,
				page_size: pagination.pageSize,
			},
		})
			.then((res) => setData(res?.data?.result?.rows ?? []))
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

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

	const onChangePagination = (pageSize, page) => setPagination({ page, pageSize });

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
					onClick={() => navigate(`${URL_PATHS.IDEA}/${params.id}`)}
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
				loadData();
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
					// delete file API
				}
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onCreate = (value) => {
		toast
			.promise(
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_IDEA, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_IDEA_ADDED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onCloseModal = () => setStatus({ ...status, visibleModal: false });
	const onOpenModal = (action, id) =>
		setStatus({ ...status, visibleModal: true, action: action });

	const renderTop = () => (
		<div className='managementidea_title'>
			<div className='managementidea_heading'>
				<h2>Idea Management</h2>
				<Tooltip title='Table Tool Bar'>
					<IconButton onClick={handleOnClickToolBar}>
						<MoreVertIcon />
					</IconButton>
				</Tooltip>
			</div>

			<Button
				size={'small'}
				variant='contained'
				endIcon={<AddIcon />}
				onClick={() => onOpenModal('create')}
			>
				Create
			</Button>
		</div>
	);

	const renderModal = () => (
		<ModalIdea
			visible={status.visibleModal}
			action={status.action}
			onClose={onCloseModal}
			onUpdate={onUpdate}
			onCreate={onCreate}
		/>
	);

	const renderContent = () => (
		<div className='managementidea_table'>
			<DataGridPro
				components={{
					NoRowsOverlay: CustomNoRowsOverlay,
					ColumnSortedDescendingIcon: () => <ExpandMoreIcon className='icon' />,
					ColumnSortedAscendingIcon: () => <ExpandLessIcon className='icon' />,
					Toolbar: tableToolBar && CustomToolbarSubmission,
				}}
				rows={data}
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

	if (!data) return;

	return (
		<>
			<div
				style={{
					minHeight: '700px',
					width: '100%',
					padding: '0 5px',
					fontFamily: 'Poppins',
				}}
			>
				{renderTop()}
				{renderContent()}
				{status.visibleModal && renderModal()}
			</div>
		</>
	);
}

export default IdeaManagement;
