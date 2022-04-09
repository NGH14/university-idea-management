import './style.css';
import {
	PlusCircleOutlined,
	MoreOutlined,
	LeftOutlined,
	RightOutlined,
} from '@ant-design/icons';
import { IconButton } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Button, Dropdown, Menu, Table } from 'antd';
import { AuthRequest, sleep } from 'common/AppUse';
import { API_PATHS, DEV_CONFIGS, ROLES } from 'common/env';
import { UserContext } from 'context/AppContext';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import { dataDemo } from './FakeData';
import ModalUserManagement from './modal/ModalUserManagement';
import { Columns } from './model/Column';

const toastMessages = {
	WAIT: 'Please wait...',
	SUC_USER_ADDED: 'Create user successful !!',
	SUC_USER_EDITED: 'Update user successful !!',
	SUC_USER_DEL: 'Delete user successful !!',
	ERR_SERVER_ERROR: 'Something went wrong, please try again !!',
};

function UserManagement() {
	const { state } = useContext(UserContext);
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);
	const [tableToolBar, setTableToolBar] = useState(false);

	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'create',
	});

	const [pagination, setPagination] = useState({
		pageSize: 5,
		page: 1,
	});

	useEffect(() => {
		if (DEV_CONFIGS.IS_OFFLINE_DEV) {
			setData(dataDemo);
			setRowId(null);
			return;
		}
		loadData();
	}, [pagination]);

	const handleOnClickToolBar = () => setTableToolBar((pre) => !pre);

	const columns = [
		...Columns,
		{
			title: 'Action',
			key: 'Action',
			align: 'center',
			width: '5%',
			render: (_text, record) => (
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item
								key={1}
								icon={
									<GoInfo
										color='#3f66da'
										style={{ fontSize: '20px' }}
									/>
								}
								onClick={() => onOpenModal(record.id, 'detail')}
							>
								Detail
							</Menu.Item>
							<Menu.Item
								key={2}
								icon={<BiPencil style={{ fontSize: '20px' }} />}
								disabled={record.role === ROLES.ADMIN}
								onClick={() => onOpenModal(record.id, 'update')}
							>
								Update
							</Menu.Item>
							<Menu.Item
								key={3}
								icon={
									<MdOutlineDeleteOutline
										color='red'
										style={{ fontSize: '20px' }}
									/>
								}
								disabled={record.role === ROLES.ADMIN}
								onClick={() => onDelete(record.id)}
							>
								Delete
							</Menu.Item>
						</Menu>
					}
					placement='bottomRight'
					trigger={['click']}
				>
					<Button icon={<MoreOutlined />} shape='circle' />
				</Dropdown>
			),
		},
	];

	const loadData = async () => {
		await AuthRequest.get(API_PATHS.ADMIN.MANAGE_USER + '/table/list', {
			params: {
				page: pagination.page,
				page_size: pagination.pageSize,
			},
		})
			.then((res) => {
				setData(res?.data?.result);
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
				AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_USER_DEL,
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
				AuthRequest.put(
					`${API_PATHS.ADMIN.MANAGE_USER}/${value?.id}`,
					value,
				).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_USER_EDITED,
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
				AuthRequest.post(API_PATHS.ADMIN.MANAGE_USER, value).then(() =>
					sleep(700),
				),
				{
					pending: toastMessages.WAIT,
					success: toastMessages.SUC_USER_ADDED,
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
		});
	};

	const CustomToolbarUser = () => {
		return (
			<GridToolbarContainer sx={{ fontWeight: 700 }}>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport printOptions={{ disableToolbarButton: true }} />
			</GridToolbarContainer>
		);
	};

	const renderModal = () => {
		return (
			<ModalUserManagement
				visible={status.visibleModal}
				action={status.action}
				onClose={onCloseModal}
				rowId={rowId}
				onCreate={onCreate}
				onUpdate={onUpdate}
			/>
		);
	};

	const renderTop = () => {
		return (
			<div className='managementuser_title' style={{}}>
				<div className='managementuser_heading'>
					<h2>User Management</h2>
					<IconButton onClick={handleOnClickToolBar}>
						<MoreOutlined />
					</IconButton>
				</div>

				<Button
					type='primary'
					onClick={() => onOpenModal(null, 'create')}
					style={{ borderRadius: '5px', fontSize: '18px', height: 'auto' }}
				>
					Create
					<PlusCircleOutlined />
				</Button>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className='managementuser_table'>
				<Table
					style={{ height: '40rem' }}
					columns={columns}
					dataSource={data?.rows}
					pagination={{
						showSizeChanger: true,
						current: pagination.page,
						pageSize: pagination.pageSize,
						total: data?.total,
						selectPrefixCls: '',
						pageSizeOptions: [5, 10, 25, 50],
						responsive: true,
						nextIcon: <RightOutlined />,
						prevIcon: <LeftOutlined />,
						onChange: (page, pageSize) =>
							setPagination({ ...pagination, page, pageSize }),
						onShowSizeChange: (_current, pageSize) =>
							setPagination({ ...pagination, page: 1, pageSize }),
					}}
				/>
			</div>
		);
	};

	return (
		<div
			style={{
				minHeight: '200px',
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
export default UserManagement;
