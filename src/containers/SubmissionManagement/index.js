/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { axioc, sleep, toastMessages } from 'common';
import { API_PATHS, URL_PATHS } from 'common/env';
import ContentHeader from 'components/ContentHeader';
import { UimActionButtons, UimTable } from 'components/Uim';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ModalSubmissionManagement from './modal/ModalSubmissionManagement';
import { Column } from './model/Column';

function SubmissionManagement() {
	const [data, setData] = useState();
	const [rowId, setRowId] = useState(null);

	const [status, setStatus] = useState({ visibleModal: false, action: 'create' });
	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const [showTableTool, setShowTableTool] = useState(false);
	const navigate = useNavigate();

	useEffect(() => loadData(), [pagination]);

	const loadData = async () =>
		await axioc
			.get(API_PATHS.ADMIN.MANAGE_SUB + '/table/list', {
				params: {
					page: pagination.page,
					page_size: pagination.pageSize,
				},
			})
			.then((res) => {
				setData(res?.data?.result);
				setRowId(null);
			});

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
					detailAction: () => navigate(`${URL_PATHS.MANAGE_SUB}/${params.id}`),
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
				axioc.post(API_PATHS.ADMIN.MANAGE_SUB, value).then(() => sleep(700)),
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
					.put(`${API_PATHS.ADMIN.MANAGE_SUB}/${value?.id}`, value)
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
					.delete(`${API_PATHS.ADMIN.MANAGE_SUB}/${id}`)
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
				title='Submission Management'
				tooltipContent='Add submission'
				onOpenModal={() => onOpenModal(null, 'create')}
				onClickAction={() => setShowTableTool((pre) => !pre)}
				classes={{
					headingClassNames: 'managementsubmission_heading',
					titleClassNames: 'managementsubmission_title',
				}}
			/>

			<UimTable
				rows={data?.rows}
				columns={columns}
				totalItems={data?.total}
				showTableToolBar={showTableTool}
				classes={{ tableClassNames: 'managementsubmission_table' }}
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
				<ModalSubmissionManagement
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
export default SubmissionManagement;
