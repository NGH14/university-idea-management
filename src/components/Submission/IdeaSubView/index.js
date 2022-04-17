/* eslint-disable react-hooks/exhaustive-deps */
import { Add } from '@mui/icons-material';
import { axioc, sleep, toastMessages } from 'common';
import { API_PATHS, URL_PATHS } from 'common/env';
import FloatButton from 'components/Custom/FloatButton';
import { UimActionButtons, UimTable } from 'components/Uim';
import { Columns } from 'containers/IdeaManagement/model/Columns';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ModalIdea from '../../Idea/ModalIdea';

function IdeaSubView({ submission: exSubData }) {
	const [data, setData] = useState({});
	const [rowData, setRowData] = useState(null);
	const [status, setStatus] = useState({
		visibleModal: false,
		action: 'update',
		loading: false,
	});

	const [pagination, setPagination] = useState({ pageSize: 5, page: 1 });
	const navigate = useNavigate();

	useEffect(() => loadData(), [pagination]);

	const loadData = async () => {
		setStatus({ ...status, loading: true });

		await axioc
			.get(API_PATHS.ADMIN.MANAGE_IDEA + '/table/list', {
				params: {
					page: pagination.page,
					page_size: pagination.pageSize,
					submission_id: exSubData.id,
				},
			})
			.catch(() => toast.error(toastMessages.errs.UNEXPECTED))
			.then((res) => {
				setStatus({ ...status, loading: false });
				setData(res?.data?.result);
				setRowData(null);
			});
	};

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
					detailAction: () => navigate(`${URL_PATHS.MANAGE_IDEA}/${params.id}`),
					updateAction: () => onOpenModal(params?.row, 'update'),
					deleteAction: () => requests.delete(params?.id),
				}),
		},
	];

	const onCloseModal = () => {
		rowData && setRowData(null);
		setStatus({ ...status, visibleModal: false });
	};

	const onOpenModal = (entity, action) => {
		entity && setRowData(entity);
		setStatus({ ...status, visibleModal: true, action });
	};

	const requests = {
		create: (value) =>
			toast.promise(
				axioc.post(API_PATHS.ADMIN.MANAGE_IDEA, value).then(() => sleep(700)),
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
				axioc
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
				axioc
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
			<UimTable
				autoHeight
				rows={data?.rows}
				columns={columns}
				totalItems={data?.total}
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

			<FloatButton
				onClick={() => onOpenModal(null, 'create')}
				tippy={{ placement: 'left' }}
				size='medium'
				color='primary'
				ariaLabel='submit new idea'
				icon={<Add />}
			/>

			{status.visibleModal && (
				<ModalIdea
					visible={status.visibleModal}
					action={status.action}
					onClose={onCloseModal}
					exIdeaData={rowData}
					specifySub={exSubData}
					onUpdate={requests.update}
					onCreate={requests.create}
				/>
			)}
		</>
	);
}
export default IdeaSubView;
