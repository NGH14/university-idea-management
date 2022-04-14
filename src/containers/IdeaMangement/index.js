/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';

import { API_PATHS, axiocRequests, sleep, toastMessages, URL_PATHS } from 'common';
import ContentHeader from 'components/ContentHeader';
import ModalIdea from 'components/Idea/ModalIdea';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Columns } from './model/Columns';
import { UimActionButtons, UimTable } from 'components/Uim';

export default function IdeaManagement() {
	const navigate = useNavigate();
	const [data, setData] = useState();
	const [rowId, setRowId] = useState(null);

	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const [tableToolBar, setTableToolBar] = useState(false);
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	useEffect(() => loadData(), [pagination]);

	const loadData = async () => {
		await axiocRequests
			.get(API_PATHS.ADMIN.MANAGE_IDEA + '/table/list', {
				params: {
					page: pagination.page,
					page_size: pagination.pageSize,
				},
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => setData(res?.data?.result));
	};

	const onOpenModal = (id, action) => {
		id && setRowId(id);
		setStatus({ ...status, visibleModal: true, action });
	};

	const onCloseModal = () => {
		rowId && setRowId(null);
		setStatus({ ...status, visibleModal: false, action: 'create' });
	};

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
				UimActionButtons(params, {
					detailAction: () => navigate(`${URL_PATHS.IDEA}/${params.id}`),
					updateAction: () => onOpenModal(params?.id, 'update'),
					deleteAction: () => requests.delete(params?.id),
				}),
		},
	];

	const requests = {
		create: (value) =>
			toast.promise(
				axiocRequests
					.post(API_PATHS.ADMIN.MANAGE_IDEA, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.added('Idea'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.added('Idea');
						},
					},
				},
			),
		update: (value) =>
			toast.promise(
				axiocRequests
					.put(`${API_PATHS.ADMIN.MANAGE_IDEA}/${value?.id}`, value)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.edited('Idea'),
					success: {
						render() {
							loadData();
							setStatus({ ...status, visibleModal: false });
							return toastMessages.succs.edited('Idea');
						},
					},
				},
			),
		delete: (id) =>
			toast.promise(
				axiocRequests
					.delete(`${API_PATHS.ADMIN.MANAGE_IDEA}/${id}`)
					.then(() => sleep(700)),
				{
					pending: toastMessages.WAIT,
					error: toastMessages.errs.deleted('Idea'),
					success: {
						render() {
							setStatus({ ...status, visibleModal: false });
							loadData();
							return toastMessages.succs.deleted('Idea');
						},
					},
				},
			),
	};

	return (
		<>
			<ContentHeader
				title='Idea Management'
				tooltipContent='Create new idea'
				onOpenModal={() => onOpenModal(null, 'create')}
				onClickAction={() => setTableToolBar((pre) => !pre)}
				classes={{
					headingClassNames: 'managementidea_heading',
					titleClassNames: 'managementidea_title',
				}}
			/>

			<UimTable
				rows={data?.rows}
				columns={columns}
				totalItems={data?.total}
				showTableToolBar={tableToolBar}
				classes={{ tableClassNames: 'managementidea_table' }}
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
				<ModalIdea
					visible={status.visibleModal}
					action={status.action}
					onClose={onCloseModal}
					onCreate={requests.create}
					onUpdate={requests.update}
				/>
			)}
		</>
	);
}
