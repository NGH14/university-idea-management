import './style.css';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import { AuthRequest, sleep } from 'common/AppUse';
import { API_PATHS, DEV_CONFIGS } from 'common/env';
import CustomNoRowsOverlay from 'components/Custom/CustomNoRowsOverlay';
import { dataDemo } from './FakeData';
import ModalDepartmentManagement from './modal/ModalDepartmentManagement';
import { Column } from './model/Column';

const toastMessages = {
	WAIT: 'Please wait...',
	SUC_DEP_ADDED: 'Create department successful !!',
	SUC_DEP_EDITED: 'Update department successful !!',
	SUC_DEP_DEL: 'Delete department successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

function DepartmentManagement() {
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);
	const [tableToolBar, setTableToolBar] = useState(false);
	const handleOnClickToolBar = () => setTableToolBar((pre) => !pre);

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'create',
	});

	const [pagination, setPagination] = useState({
		pageSize: 5,
		page: 0,
	});

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			setData(dataDemo);
			setRowId(null);
			return;
		}

		loadData();
	}, [pagination]);

	const columns = [
		...Column,
		{
			field: 'actions',
			headerName: 'Action',
			width: 75,
			type: 'actions',
			disableColumnMenu: true,
			sortable: false,
			getActions: (params) => [
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

	const loadData = async () => {
		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_DEP + '/table/list', {
			params: {
				page: pagination.page + 1,
				page_size: pagination.pageSize,
			},
		})
			.then((res) => {
				setData(res?.data?.result?.rows ?? []);
				setRowId(null);
			})
			.catch(() => toast.error(toastMessages.ERR_SERVER_ERROR));
	};

	const onOpenModal = (id, action) => {
		if (id) {
			setRowId(id);
		}
		setStatus({ ...status, visibleModal: true, action });
	};

	const onDelete = async (id) => {
		toast
			.promise(
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_DEP}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_DEP_DEL,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onUpdate = async (value) => {
		toast
			.promise(
				AuthRequest.put(`${API_PATHS.ADMIN.MANAGE_DEP}/${value?.id}`, {
					name: value?.name,
				}).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_DEP_EDITED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onCreate = async (value) => {
		toast
			.promise(
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_DEP, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_DEP_ADDED,
					error: toastMessages.ERR_SERVER_ERROR,
				},
			)
			.then(() => {
				setStatus({ ...status, visibleModal: false });
				loadData();
			});
	};

	const onCloseModal = () => {
		rowId && setRowId(null);

		setStatus({
			...status,
			visibleModal: false,
			action: 'create',
		});
	};

	const renderModal = () => {
		return (
			<ModalDepartmentManagement
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				rowId={rowId}
				onCreate={onCreate}
				onUpdate={onUpdate}
			/>
		);
	};

	const onChangePagination = (pageSize, page) => {
		setPagination({ page, pageSize });
	};

	const CustomToolbarDepartment = () => {
		return (
			<GridToolbarContainer sx={{ fontWeight: 700 }}>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				{/* <GridToolbarExport printOptions={{ disableToolbarButton: true }} /> */}
			</GridToolbarContainer>
		);
	};

	const renderTop = () => {
		return (
			<div className='managementdepartment_title'>
				<div className='managementdepartment_heading'>
					<h2>Department Management</h2>
					<Tooltip title='Table Tool Bar'>
						<IconButton onClick={handleOnClickToolBar}>
							<MoreVertIcon />
						</IconButton>
					</Tooltip>
				</div>

				<Button
					variant='contained'
					endIcon={<AddCircleOutlineIcon />}
					onClick={() => onOpenModal(null, 'create')}
				>
					Create
				</Button>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className='managementdepartment_table'>
				<DataGridPro
					components={{
						NoRowsOverlay: CustomNoRowsOverlay,
						ColumnSortedDescendingIcon: () => (
							<ExpandMoreIcon className='icon' />
						),
						ColumnSortedAscendingIcon: () => (
							<ExpandLessIcon className='icon' />
						),
						Toolbar: tableToolBar && CustomToolbarDepartment,
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
	};

	return (
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
	);
}
export default DepartmentManagement;
