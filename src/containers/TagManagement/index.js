/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { API_PATHS, axioc, sleep, toastMessages } from 'common';
import ContentHeader from 'components/ContentHeader';
import { UimActionButtons, UimTable } from 'components/Uim';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ModalTagManagement from './modal/ModalTagManagement';
import { Column } from './model/Column';

function TagManagement() {
	const [data, setData] = useState([]);
	const [rowId, setRowId] = useState(null);

	const [status, setStatus] = useState({ visibleModal: false, action: 'create' });
	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const [tableToolBar, setTableToolBar] = useState(false);

	useEffect(() => loadData(), [pagination]);

	const loadData = async () => {
		await axioc
			.get(API_PATHS.ADMIN.MANAGE_TAG + '/table/list', {
				params: {
					page_size: pagination.pageSize,
					page: pagination.page,
				},
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => {
				setData(res?.data?.result);
				setRowId(null);
			});
	};

	const onCloseModal = () => {
		rowId && setRowId(null);
		setStatus({ ...status, visibleModal: false });
	};

	const onOpenModal = (id, action) => {
		id && setRowId(id);
		setStatus({ ...status, visibleModal: true, action });
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
				UimActionButtons(params?.row, {
					detailAction: () => onOpenModal(params?.id, 'detail'),
					updateAction: () => onOpenModal(params?.id, 'update'),
					deleteAction: () => requests.delete(params?.id),
				}),
		},
	];

	const requests = {
		create: (value) =>
			toast.promise(
				axioc.post(API_PATHS.ADMIN.MANAGE_TAG, value).then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.added('Tag'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.added('Tag');
						},
					},
				},
			),
		update: (value) =>
			toast.promise(
				axioc
					.put(`${API_PATHS.ADMIN.MANAGE_TAG}/${value?.id}`, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.edited('Tag'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.edited('Tag');
						},
					},
				},
			),
		delete: (id) =>
			toast.promise(
				axioc
					.delete(`${API_PATHS.ADMIN.MANAGE_TAG}/${id}`)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.deleted('Tag'),
					success: {
						render() {
							setStatus({ ...status, visibleModal: false });
							loadData();
							return toastMessages.succs.deleted('Tag');
						},
					},
				},
			),
	};

	return (
		<>
			<ContentHeader
				title='Tag Management'
				tooltipContent='Add tag'
				onOpenModal={() => onOpenModal(null, 'create')}
				onClickAction={() => setTableToolBar((pre) => !pre)}
				classes={{
					headingClassNames: 'managementtag_heading',
					titleClassNames: 'managementtag_title',
				}}
			/>

			<UimTable
				rows={data?.rows}
				columns={columns}
				totalItems={data?.total}
				showTableToolBar={tableToolBar}
				classes={{ tableClassNames: 'managementtag_table' }}
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
				<ModalTagManagement
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
export default TagManagement;
