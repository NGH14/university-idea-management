/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { API_PATHS, axioc, sleep, toastMessages } from 'common';
import ContentHeader from 'components/ContentHeader';
import { UimActionButtons, UimTable } from 'components/Uim';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ModalUserManagement from './modal/ModalUserManagement';
import { Columns } from './model/Column';

function UserManagement() {
	const [data, setData] = useState({});
	const [rowId, setRowId] = useState(null);
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'create',
	});
	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const [showTableTool, setShowTableTool] = useState(false);

	useEffect(() => loadData(), [pagination]);

	const loadData = async () =>
		await axioc
			.get(API_PATHS.ADMIN.MANAGE_USER + '/table/list', {
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
		{
			field: 'no',
			headerName: '#',
			disableColumnMenu: true,
			sortable: false,
			filter: false,
			filterable: false,
			width: 80,
			align: 'center',
			headerAlign: 'center',
			renderCell: (value) => (
				<span>
					{(pagination.page - 1) * pagination.pageSize +
						(value.api.getRowIndex(value.id) + 1)}
				</span>
			),
		},
		...Columns,
		{
			field: 'actions',
			headerName: 'Action',
			width: 75,
			type: 'actions',
			disableColumnMenu: true,
			sortable: false,
			getActions: (params) =>
				UimActionButtons(params?.row, {
					detailAction: () => onOpenModal(params?.id, 'detail'),
					updateAction: () => onOpenModal(params?.id, 'update'),
					deleteAction: () => requests.delete(params?.id),
				}),
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

	const requests = {
		create: (value) =>
			toast.promise(
				axioc.post(API_PATHS.ADMIN.MANAGE_USER, value).then(() => sleep(700)),
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
		update: (value) =>
			toast.promise(
				axioc
					.put(`${API_PATHS.ADMIN.MANAGE_USER}/${value?.id}`, value)
					.then(() => sleep(700)),
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
				axioc
					.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`)
					.then(() => sleep(700)),
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
			<ContentHeader
				title='User Management'
				tooltipContent='Add user'
				onOpenModal={() => onOpenModal(null, 'create')}
				onClickAction={() => setShowTableTool((pre) => !pre)}
				classes={{
					headingClassNames: 'managementuser_heading',
					titleClassNames: 'managementuser_title',
				}}
			/>

			<UimTable
				rows={data?.rows}
				columns={columns}
				totalItems={data?.total}
				showTableToolBar={showTableTool}
				classes={{ tableClassNames: 'managementuser_table' }}
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
					onCreate={requests.create}
					onUpdate={requests.update}
				/>
			)}
		</>
	);
}

export default UserManagement;
