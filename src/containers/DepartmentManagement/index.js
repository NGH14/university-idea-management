/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { API_PATHS, axiocRequests, sleep, toastMessages } from 'common';
import ContentHeader from 'components/ContentHeader';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ModalDepartmentManagement from './modal/ModalDepartmentManagement';
import { Column } from './model/Column';
import { UimActionButtons, UimTable } from 'components/Uim';

function DepartmentManagement() {
	const [data, setData] = useState();
	const [rowId, setRowId] = useState(null);

	const [status, setStatus] = useState({ visibleModal: false, action: 'create' });
	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const [tableToolBar, setTableToolBar] = useState(false);

	useEffect(() => loadData(), [pagination]);

	const loadData = async () => {
		await axiocRequests
			.get(API_PATHS.ADMIN.MANAGE_DEP + '/table/list', {
				params: {
					page: pagination.page + 1,
					page_size: pagination.pageSize,
				},
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => {
				setData(res?.data?.result);
				setRowId(null);
			});
	};

	const columns = [
		...Column,
		{
			field: 'actions',
			headerName: 'Action',
			width: 75,
			type: 'actions',
			disableColumnMenu: true,
			sortable: false,
			getActions: (params) =>
				UimActionButtons(params, {
					updateAction: () => onOpenModal(params?.id, 'update'),
					deleteAction: () => requests.delete(params?.id),
				}),
		},
	];

	const onOpenModal = (id, action) => {
		id && setRowId(id);
		setStatus({ ...status, visibleModal: true, action });
	};

	const onCloseModal = () => {
		rowId && setRowId(null);
		setStatus({ ...status, visibleModal: false, action: 'create' });
	};

	const requests = {
		create: (value) =>
			toast.promise(
				axiocRequests
					.post(API_PATHS.ADMIN.MANAGE_DEP, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.added('Department'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.added('Department');
						},
					},
				},
			),
		update: (value) =>
			toast.promise(
				axiocRequests
					.put(`${API_PATHS.ADMIN.MANAGE_DEP}/${value?.id}`, {
						name: value?.name,
					})
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.edited('Department'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.edited('Department');
						},
					},
				},
			),
		delete: (id) =>
			toast.promise(
				axiocRequests
					.put(`${API_PATHS.ADMIN.MANAGE_DEP}/${id}`)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.added('Department'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.added('Department');
						},
					},
				},
			),
	};

	return (
		<>
			<ContentHeader
				title='Department Management'
				tooltipContent='Create new department'
				onOpenModal={() => onOpenModal(null, 'create')}
				onClickAction={() => setTableToolBar((pre) => !pre)}
				classes={{
					headingClassNames: 'managementdepartment_heading',
					titleClassNames: 'managementdepartment_title',
				}}
			/>

			<UimTable
				rows={data?.rows}
				columns={columns}
				totalItems={data?.total}
				showTableToolBar={tableToolBar}
				classes={{ tableClassNames: 'managementdepartment_table' }}
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
				<ModalDepartmentManagement
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
export default DepartmentManagement;
