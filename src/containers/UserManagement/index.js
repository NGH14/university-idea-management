/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { ROLES } from 'common/env';
import UimTable from 'components/UimTable';
import UimActionButtons from 'components/UimTable/UimActionButtons';
import UimTableToolBar from 'components/UimTableTootBar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import { AuthRequest, sleep, toastMessages } from '../../common/AppUse';
import { API_PATHS, DEV_CONFIGS } from '../../common/env';
import { dataDemo } from './FakeData';
import ModalUserManagement from './modal/ModalUserManagement';
import { Columns } from './model/Column';

function UserManagement() {
	const [rowId, setRowId] = useState(null);
	const [tableToolBar, setTableToolBar] = useState(false);
	const [status, setStatus] = useState({ visibleModal: false, action: 'create' });

	const [data, setData] = useState({});
	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			setData(dataDemo);
			setRowId(null);
			return;
		}
		if (data) loadData();
	}, [pagination]);

	const loadData = async () =>
		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_USER + '/table/list', {
			params: {
				page: pagination.page,
				page_size: pagination.pageSize,
			},
		})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => {
				setData(res?.data?.result);
				setRowId(null);
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
			getActions: (params) =>
				UimActionButtons([
					{
						label: 'Detail',
						icon: <GoInfo color='#3f66da' style={{ fontSize: '20px' }} />,
						onClick: () => onOpenModal(params?.id, 'detail'),
					},
					{
						label: 'Update',
						icon: <BiPencil style={{ fontSize: '20px' }} />,
						disabled: params?.role === ROLES.ADMIN,
						onClick: () => onOpenModal(params?.id, 'update'),
					},
					{
						label: 'Delete',
						icon: (
							<MdOutlineDeleteOutline
								color='red'
								style={{ fontSize: '20px' }}
							/>
						),
						disabled: params?.role === ROLES.ADMIN,
						onClick: () => apiRequests.delete(params?.id),
					},
				]),
		},
	];

	const onCloseModal = () => {
		rowId && setRowId(null);
		setStatus({ ...status, visibleModal: false });
	};

	const onOpenModal = (id, action) => {
		id && setRowId(id);
		setStatus({ ...status, visibleModal: true, action });
	};

	const apiRequests = {
		create: (value) =>
			toast.promise(
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_USER, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.added('User'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.added('User');
						},
					},
				},
			),

		update: (id) =>
			toast.promise(
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.edited('User'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.edited('User');
						},
					},
				},
			),

		delete: (id) =>
			toast.promise(
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.deleted('User'),
					success: {
						render() {
							setStatus({ ...status, visibleModal: false });
							loadData();
							return toastMessages.succs.deleted('User');
						},
					},
				},
			),
	};

	return (
		<>
			<div className='managementuser_title'>
				<div className='managementuser_heading'>
					<h2>User Management</h2>
					{/* TODO: @Henry, Insert tooltip */}
					<IconButton onClick={() => setTableToolBar((pre) => !pre)}>
						<MoreVertIcon />
					</IconButton>
				</div>

				<Button
					variant='contained'
					endIcon={<AddCircleOutlineIcon />}
					onClick={() => onOpenModal(null, 'create')}
				>
					Create
				</Button>
			</div>

			<UimTable
				rows={data?.rows}
				columns={columns}
				tableToolBar={tableToolBar && UimTableToolBar()}
				totalItems={data?.total}
				classes={{
					tableClassNames: 'managementuser_table',
					paginationClassNames: 'usertable_footer',
				}}
				pagination={{
					page: pagination.page,
					pageSize: pagination.pageSize,
					onPageChange: (_, page) => setPagination({ ...pagination, page }),
					onPageSizeChange: (event) =>
						setPagination({
							...pagination,
							pageSize: event?.target?.value,
							page: 1,
						}),
				}}
			/>

			{status.visibleModal && (
				<ModalUserManagement
					visible={status.visibleModal}
					action={status.action}
					onClose={onCloseModal}
					rowId={rowId}
					onCreate={apiRequests.create}
					onUpdate={apiRequests.update}
				/>
			)}
		</>
	);
}

export default UserManagement;
